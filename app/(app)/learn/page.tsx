import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getUserProfile } from "@/lib/supabase/getProfile";
import { LearningHubView } from "@/features/learn/components/LearningHubView";

export const metadata = {
  title: "Edukasi Suksesi — Estafet Usaha",
};

export default async function LearnPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth");

  const profile = await getUserProfile(supabase, user.id);

  if (!profile?.business_id) redirect("/onboarding");

  const business = (profile as any).businesses;

  return (
    <LearningHubView
      profile={profile}
      business={business}
    />
  );
}
