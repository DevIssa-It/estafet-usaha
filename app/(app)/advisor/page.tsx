import { createClient } from "@/lib/supabase/server";
import { getProfileAndBusiness } from "@/lib/supabase/getProfileAndBusiness";
import { redirect } from "next/navigation";
import { AdvisorView } from "@/features/advisor/components/AdvisorView";

export const metadata = { title: "AI Advisor — Estafet Usaha" };

export default async function AdvisorPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth");

  const { profile, business } = await getProfileAndBusiness(supabase, user.id);

  const { data: history } = await supabase
    .from("chat_messages")
    .select("*")
    .eq("business_id", profile.business_id)
    .order("created_at", { ascending: true })
    .limit(20);

  return (
    <AdvisorView
      profile={profile}
      businessName={business?.name || "Bisnis Anda"}
      initialHistory={history || []}
    />
  );
}
