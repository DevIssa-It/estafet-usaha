import { SupabaseClient } from "@supabase/supabase-js";
import { getUserProfile } from "./getProfile";
import { redirect } from "next/navigation";

/**
 * Fetches the authenticated user's profile AND their business data.
 * Handles both pendiri (business embedded via JOIN) and penerus
 * (business fetched directly by business_id, since RLS may block the JOIN).
 * Redirects to /auth if unauthenticated, or /onboarding if no business found.
 */
export async function getProfileAndBusiness(supabase: SupabaseClient, userId: string) {
  const profile = await getUserProfile(supabase, userId);

  if (!profile?.business_id) redirect("/onboarding");

  // Try embedded JOIN first (works for pendiri)
  let business = (profile as any).businesses ?? null;

  // Fallback: fetch directly (needed for penerus due to RLS on JOIN)
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
