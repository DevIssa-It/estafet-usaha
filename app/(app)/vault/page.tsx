import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getProfileAndBusiness } from "@/lib/supabase/getProfileAndBusiness";
import { DocumentVaultView } from "@/features/vault/components/DocumentVaultView";

export const metadata = {
  title: "Bilik Dokumen — Estafet Usaha",
};

export default async function VaultPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth");

  const { profile, business } = await getProfileAndBusiness(supabase, user.id);

  return (
    <DocumentVaultView
      profile={profile}
      business={business}
    />
  );
}
