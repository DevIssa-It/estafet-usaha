"use server";

import { createClient } from "@/lib/supabase/server";
import { MilestoneStatus } from "@/types";
import { revalidatePath } from "next/cache";

export async function updateMilestoneStatus(
  milestoneId: string,
  status: MilestoneStatus
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("milestones")
    .update({
      status,
      completed_at: status === "completed" ? new Date().toISOString() : null,
    })
    .eq("id", milestoneId);

  if (error) throw error;
  revalidatePath("/milestones");
  revalidatePath("/dashboard");
}

export async function getMilestonesForBusiness(businessId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("milestones")
    .select("*")
    .eq("business_id", businessId)
    .order("category")
    .order("created_at");

  if (error) throw error;
  return data;
}
