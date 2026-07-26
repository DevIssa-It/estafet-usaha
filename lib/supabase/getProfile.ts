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

  // Check if user is member of a business
  if (!bizId) {
    const { data: memberBiz } = await supabase
      .from("business_members")
      .select("business_id")
      .eq("user_id", userId)
      .order("joined_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    bizId = memberBiz?.business_id || null;
  }

  // Determine ideal role: if ownedBiz exists or metadata says pendiri -> 'pendiri', else profile.role or 'penerus'
  const expectedRole = (ownedBiz || metaRole === "pendiri") ? "pendiri" : (profile?.role || metaRole || "penerus");

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
