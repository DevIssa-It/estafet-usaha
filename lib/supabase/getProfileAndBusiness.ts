import { SupabaseClient } from "@supabase/supabase-js";
import { getUserProfile } from "./getProfile";
import { redirect } from "next/navigation";

/**
 * Fetches the authenticated user's profile AND their business data.
 * Also checks `business_members` table to get the exact role for this specific business
 * (e.g., 'notaris', 'calon_penerus', 'advisor', 'pendiri', 'penerus').
 */
export async function getProfileAndBusiness(supabase: SupabaseClient, userId: string) {
  const profile = await getUserProfile(supabase, userId);

  if (!profile?.business_id) redirect("/onboarding");

  // Fetch exact role in business_members table if available
  const { data: memberRecord } = await supabase
    .from("business_members")
    .select("role")
    .eq("business_id", profile.business_id)
    .eq("user_id", userId)
    .maybeSingle();

  if (memberRecord?.role) {
    profile.role = memberRecord.role;
  }

  // Try embedded JOIN first (works for pendiri)
  let business = (profile as any).businesses ?? null;

  // Fallback: fetch directly (needed for penerus/members due to RLS on JOIN)
  if (!business) {
    const { data } = await supabase
      .from("businesses")
      .select("*")
      .eq("id", profile.business_id)
      .maybeSingle();
    business = data ?? null;
  }

  if (!business) redirect("/onboarding");

  return { profile, business };
}
