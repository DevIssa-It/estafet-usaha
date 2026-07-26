import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getUserProfile } from "@/lib/supabase/getProfile";
import { FinancialSimulatorView } from "@/features/simulator/components/FinancialSimulatorView";

export const metadata = {
  title: "Simulasi Finansial — Estafet Usaha",
};

export default async function SimulatorPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth");

  const profile = await getUserProfile(supabase, user.id);

  if (!profile?.business_id) redirect("/onboarding");

  const business = (profile as any).businesses;

  return (
    <FinancialSimulatorView
      profile={profile}
      business={business}
    />
  );
}
