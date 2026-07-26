import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getUserProfile } from "@/lib/supabase/getProfile";
import { DocumentVaultView } from "@/features/vault/components/DocumentVaultView";

export const metadata = {
  title: "Bilik Dokumen — Estafet Usaha",
};

export default async function VaultPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth");

  const profile = await getUserProfile(supabase, user.id);

  if (!profile?.business_id) redirect("/onboarding");

  const business = (profile as any).businesses;

  return (
    <DocumentVaultView
      profile={profile}
      business={business}
    />
  );
}
