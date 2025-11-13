import { getSupabaseAdminClient } from "../lib/supabase";
import { resolveSupabaseUserBySession } from "./supabaseAuthBridge";

export async function auditLog(request: Request, action: string, entity: string, payload: any = null) {
  try {
    const supabase = getSupabaseAdminClient();
    const { user } = await resolveSupabaseUserBySession(request, supabase);
    await supabase.from("audit_logs").insert({
      actor_id: user.id,
      action,
      entity,
      payload_json: payload ? payload : null,
    });
  } catch (e) {
    // swallow audit errors to not block primary flow
    console.error("auditLog error", e);
  }
}