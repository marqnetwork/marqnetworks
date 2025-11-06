import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * Returns a Supabase client configured from environment variables.
 * Uses `SUPABASE_URL` and `SUPABASE_KEY` (service role or anon).
 * If envs are missing, returns undefined so callers can gracefully fallback.
 */
export function getSupabaseServerClient(): SupabaseClient | undefined {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return undefined;
  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export type AttendanceEventRow = {
  id: string;
  user_name: string;
  type: 'check_in' | 'check_out' | 'break_start' | 'break_end' | 'activity_ping' | 'snapshot';
  timestamp: number; // ms epoch
  metadata?: Record<string, any> | null;
};