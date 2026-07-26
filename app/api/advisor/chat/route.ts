import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getUserProfile } from "@/lib/supabase/getProfile";
import { generateAdvisorResponse } from "@/lib/gemini";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { message, history } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const profile = await getUserProfile(supabase, user.id);

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const businessName = (profile as any).businesses?.name || "bisnis Anda";
    const userRole = profile.role;

    const geminiHistory = (history || []).map((msg: { role: string; content: string }) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    let aiResponse = "";
    try {
      aiResponse = await generateAdvisorResponse(
        geminiHistory,
        message,
        userRole,
        businessName
      );
    } catch (genError: any) {
      console.error("Gemini Generation Error:", genError);
      aiResponse = "⚠️ Kendala Koneksi Gemini AI: Kuota gratis API Key dari Google AI Studio sedang mencapai batas (429 Rate Limit) atau API Key memerlukan waktu aktivasi. Silakan coba kirim ulang dalam 1-2 menit.";
    }

    // Save user message to DB if business_id exists
    if (profile.business_id) {
      await supabase.from("chat_messages").insert({
        business_id: profile.business_id,
        user_id: user.id,
        role: "user",
        content: message,
      });

      await supabase.from("chat_messages").insert({
        business_id: profile.business_id,
        user_id: user.id,
        role: "assistant",
        content: aiResponse,
      });
    }

    return NextResponse.json({ response: aiResponse });
  } catch (error: any) {
    console.error("Advisor API error:", error);
    return NextResponse.json({
      response: "⚠️ Terjadi kendala saat memproses permintaan AI. Silakan coba beberapa saat lagi.",
    });
  }
}
