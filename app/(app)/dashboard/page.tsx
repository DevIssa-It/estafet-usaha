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

  const business = (profile as any).businesses;

  const { data: milestones } = await supabase
    .from("milestones")
    .select("*")
    .eq("business_id", profile.business_id)
    .order("created_at");

  const { data: members } = await supabase
    .from("profiles")
    .select("id, full_name, role")
    .eq("business_id", profile.business_id);

  return (
    <DashboardView
      profile={profile}
      business={business}
      milestones={milestones || []}
      members={members || []}
    />
  );
}
