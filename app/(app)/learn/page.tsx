import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getProfileAndBusiness } from "@/lib/supabase/getProfileAndBusiness";
import { LearningHubView } from "@/features/learn/components/LearningHubView";

export const metadata = {
  title: "Edukasi Suksesi — Estafet Usaha",
};

export default async function LearnPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth");

  const { profile, business } = await getProfileAndBusiness(supabase, user.id);

  return (
    <LearningHubView
      profile={profile}
      business={business}
    />
  );
}
