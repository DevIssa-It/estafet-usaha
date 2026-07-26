import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getUserProfile } from "@/lib/supabase/getProfile";
import { DocumentGeneratorView } from "@/features/documents/components/DocumentGeneratorView";

export const metadata = {
  title: "Dokumen Suksesi — Estafet Usaha",
};

export default async function DocumentsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth");

  const profile = await getUserProfile(supabase, user.id);

  if (!profile?.business_id) redirect("/onboarding");

  const business = (profile as any).businesses;

  return (
    <DocumentGeneratorView
      profile={profile}
      business={business}
    />
  );
}
