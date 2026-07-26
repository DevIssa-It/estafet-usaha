import { createClient } from "@/lib/supabase/server";
import { getUserProfile } from "@/lib/supabase/getProfile";
import { redirect } from "next/navigation";
import { MilestonesView } from "@/features/milestones/components/MilestonesView";

export const metadata = { title: "Milestone Suksesi — Estafet Usaha" };

export default async function MilestonesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth");

  const profile = await getUserProfile(supabase, user.id);

  if (!profile?.business_id) redirect("/onboarding");

  const { data: milestones } = await supabase
    .from("milestones")
    .select("*")
    .eq("business_id", profile.business_id)
    .order("category")
    .order("created_at");

  return <MilestonesView profile={profile} milestones={milestones || []} />;
}
