"use server";

import { createClient } from "@/lib/supabase/server";
import { generateInviteCode } from "@/lib/utils";
import { DEFAULT_MILESTONES } from "@/types";
import { revalidatePath } from "next/cache";

export async function createBusiness(data: {
  name: string;
  description: string;
  industry: string;
  founded_year: number | null;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const inviteCode = generateInviteCode();

  const { data: business, error: bizError } = await supabase
    .from("businesses")
    .insert({ ...data, owner_id: user.id, invite_code: inviteCode })
    .select()
    .single();

  if (bizError) {
    console.error("createBusiness error:", bizError);
    throw new Error(bizError.message || "Gagal membuat bisnis");
  }

  // Link profile to business (upsert ensures profile exists even if trigger was delayed)
  const fullName = user.user_metadata?.full_name || user.email?.split("@")[0] || "Pengguna";
  const role = user.user_metadata?.role || "pendiri";

  const { error: profileErr } = await supabase
    .from("profiles")
    .upsert({
      id: user.id,
      full_name: fullName,
      role: role,
      business_id: business.id,
    });

  if (profileErr) console.warn("Profile upsert notice:", profileErr.message);

  // Create default milestones
  const milestones = DEFAULT_MILESTONES.map((m) => ({
    ...m,
    business_id: business.id,
  }));
  const { error: milestoneErr } = await supabase.from("milestones").insert(milestones);
  if (milestoneErr) console.warn("Milestone insert notice:", milestoneErr.message);

  revalidatePath("/dashboard");
  return business;
}

export async function joinBusiness(inviteCode: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { data: business, error } = await supabase
    .from("businesses")
    .select("*")
    .eq("invite_code", inviteCode.toUpperCase())
    .single();

  if (error || !business) throw new Error("Kode undangan tidak valid");

  const fullName = user.user_metadata?.full_name || user.email?.split("@")[0] || "Pengguna";
  const role = user.user_metadata?.role || "penerus";

  await supabase
    .from("profiles")
    .upsert({
      id: user.id,
      full_name: fullName,
      role: role,
      business_id: business.id,
    });

  // Add to business_members
  const { error: memberErr } = await supabase.from("business_members").upsert({
    business_id: business.id,
    user_id: user.id,
    role: role,
  }, { onConflict: "business_id,user_id" });

  if (memberErr) console.warn("Member insert notice:", memberErr.message);

  revalidatePath("/dashboard");
  return business;
}

export async function registerNotaryProfile(data: {
  sk_number: string;
  ini_number: string;
  city: string;
  office_address: string;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const fullName = user.user_metadata?.full_name || user.email?.split("@")[0] || "Notaris Partner";

  const { error } = await supabase
    .from("profiles")
    .upsert({
      id: user.id,
      full_name: fullName,
      role: "notaris",
    });

  if (error) throw new Error(error.message || "Gagal mendaftarkan profil Notaris");

  revalidatePath("/dashboard");
  revalidatePath("/notaries");
  return { success: true };
}

