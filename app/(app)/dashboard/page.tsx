import { createClient } from "@/lib/supabase/server";
import { getUserProfile } from "@/lib/supabase/getProfile";
import { redirect } from "next/navigation";
import { DashboardView } from "@/features/dashboard/components/DashboardView";

export const metadata = {
  title: "Dashboard — Estafet Usaha",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth");

  const profile = await getUserProfile(supabase, user.id);

  if (!profile?.business_id) redirect("/onboarding");

  // For pendiri: business is embedded via JOIN in profile
  // For penerus: business may not be embedded (RLS blocks foreign key join),
  //              so we fetch it directly by business_id
  let business = (profile as any).businesses ?? null;

  if (!business && profile.business_id) {
    const { data: fetchedBusiness } = await supabase
      .from("businesses")
      .select("*")
      .eq("id", profile.business_id)
      .maybeSingle();
    business = fetchedBusiness ?? null;
  }

  // Still null → penerus has business_id but business lookup failed;
  // redirect to onboarding so they can join via invite code
  if (!business) redirect("/onboarding");

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
