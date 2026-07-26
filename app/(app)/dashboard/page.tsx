import { createClient } from "@/lib/supabase/server";
import { getProfileAndBusiness } from "@/lib/supabase/getProfileAndBusiness";
import { redirect } from "next/navigation";
import { DashboardView } from "@/features/dashboard/components/DashboardView";

export const metadata = {
  title: "Dashboard — Estafet Usaha",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth");

  const { profile, business } = await getProfileAndBusiness(supabase, user.id);

  const { data: milestones } = await supabase
    .from("milestones")
    .select("*")
    .eq("business_id", profile.business_id)
    .order("created_at");

  const { data: rawProfiles } = await supabase
    .from("profiles")
    .select("id, full_name, role")
    .eq("business_id", profile.business_id);

  const { data: memberRoles } = await supabase
    .from("business_members")
    .select("user_id, role")
    .eq("business_id", profile.business_id);

  const roleMap = new Map((memberRoles || []).map((r) => [r.user_id, r.role]));

  const members = (rawProfiles || []).map((p) => ({
    ...p,
    role: roleMap.get(p.id) || p.role,
  }));

  return (
    <DashboardView
      profile={profile}
      business={business}
      milestones={milestones || []}
      members={members}
    />
  );
}
