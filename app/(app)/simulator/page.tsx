import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getProfileAndBusiness } from "@/lib/supabase/getProfileAndBusiness";
import { FinancialSimulatorView } from "@/features/simulator/components/FinancialSimulatorView";

export const metadata = {
  title: "Simulasi Finansial — Estafet Usaha",
};

export default async function SimulatorPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth");

  const { profile, business } = await getProfileAndBusiness(supabase, user.id);

  return (
    <FinancialSimulatorView
      profile={profile}
      business={business}
    />
  );
}
