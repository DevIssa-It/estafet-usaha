import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getProfileAndBusiness } from "@/lib/supabase/getProfileAndBusiness";
import { DocumentGeneratorView } from "@/features/documents/components/DocumentGeneratorView";

export const metadata = {
  title: "Dokumen Suksesi — Estafet Usaha",
};

export default async function DocumentsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth");

  const { profile, business } = await getProfileAndBusiness(supabase, user.id);

  const { data: members } = await supabase
    .from("profiles")
    .select("id, full_name, role")
    .eq("business_id", profile.business_id);

  return (
    <DocumentGeneratorView
      profile={profile}
      business={business}
      members={members || []}
    />
  );
}
