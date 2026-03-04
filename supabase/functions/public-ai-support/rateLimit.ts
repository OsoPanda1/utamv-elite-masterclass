import { supabaseAdmin } from "../lib/supabaseAdmin.ts";

export async function getRateLimit(userId: string): Promise<boolean> {
  if (!userId) return false;

  const today = new Date().toISOString().slice(0, 10);
  const { data } = await supabaseAdmin
    .from("rate_limits")
    .select("count")
    .eq("user_id", userId)
    .eq("endpoint", "public-ai-support")
    .gte("window_start", `${today}T00:00:00Z`)
    .maybeSingle();

  return !data || data.count < 10;
}
