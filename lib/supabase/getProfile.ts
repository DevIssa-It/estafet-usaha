import { SupabaseClient } from "@supabase/supabase-js";

export async function getUserProfile(supabase: SupabaseClient, userId: string) {
  const { data: { user } } = await supabase.auth.getUser();

  let { data: profile } = await supabase
    .from("profiles")
    .select("*, businesses(*)")
    .eq("id", userId)
    .maybeSingle();

  // Determine correct metadata & role
  const metaRole = user?.user_metadata?.role;
  const metaName = user?.user_metadata?.full_name;
  const fullName = profile?.full_name || metaName || user?.email?.split("@")[0] || "Pengguna";

  // Check if user is owner of a business
  const { data: ownedBiz } = await supabase
    .from("businesses")
    .select("*")
    .eq("owner_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  let bizId = profile?.business_id || ownedBiz?.id;

  // Check if user is member of a business and get exact role in business_members
  let memberRole: string | null = null;
  if (bizId) {
    const { data: memberRecord } = await supabase
      .from("business_members")
      .select("role")
      .eq("business_id", bizId)
      .eq("user_id", userId)
      .maybeSingle();
    if (memberRecord?.role) {
      memberRole = memberRecord.role;
    }
  } else {
    const { data: memberBiz } = await supabase
      .from("business_members")
      .select("business_id, role")
      .eq("user_id", userId)
      .order("joined_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (memberBiz) {
      bizId = memberBiz.business_id;
      memberRole = memberBiz.role;
    }
  }

  // Determine ideal role: if ownedBiz exists -> 'pendiri', else memberRole or profile.role or metaRole or 'penerus'
  const expectedRole = ownedBiz ? "pendiri" : (memberRole || profile?.role || metaRole || "penerus");

  // Always ensure profile exists and has up-to-date name, role, and business_id
  if (!profile || (bizId && !profile.business_id) || profile.role !== expectedRole || profile.full_name !== fullName) {
    try {
      await supabase.from("profiles").upsert({
        id: userId,
        full_name: fullName,
        role: expectedRole,
        business_id: bizId,
      });
    } catch {}

    // Refetch updated profile with business relation
    const { data: updatedProfile } = await supabase
      .from("profiles")
      .select("*, businesses(*)")
      .eq("id", userId)
      .maybeSingle();

    if (updatedProfile) {
      profile = updatedProfile;
    } else {
      // Fallback in-memory profile if database read RLS blocks before business insert
      profile = {
        id: userId,
        full_name: fullName,
        role: expectedRole,
        business_id: bizId,
        businesses: ownedBiz || null,
      } as any;
    }
  }

  return profile;
}
