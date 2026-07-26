import { createClient } from "@/lib/supabase/server";
import { getUserProfile } from "@/lib/supabase/getProfile";
import { redirect } from "next/navigation";
import { NotariesView } from "@/features/notaries/components/NotariesView";

export default async function NotariesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/auth");

  const profile = await getUserProfile(supabase, user.id);

  let inviteCode = "ESTAFET";
  if (profile?.business_id) {
    const { data: biz } = await supabase.from("businesses").select("invite_code").eq("id", profile.business_id).single();
    if (biz?.invite_code) inviteCode = biz.invite_code;
  }

  return <NotariesView businessInviteCode={inviteCode} />;
}
