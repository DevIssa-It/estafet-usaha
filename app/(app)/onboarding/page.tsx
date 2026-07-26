import { createClient } from "@/lib/supabase/server";
import { getUserProfile } from "@/lib/supabase/getProfile";
import { redirect } from "next/navigation";
import { OnboardingClientView } from "@/features/onboarding/components/OnboardingClientView";

export default async function OnboardingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/auth");

  const profile = await getUserProfile(supabase, user.id);

  // If profile is already linked to a business or is a registered notary profile, redirect to dashboard
  if (profile?.business_id) {
    redirect("/dashboard");
  }

  const userRole = profile?.role || "pendiri";

  return <OnboardingClientView userRole={userRole} />;
}
