import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * Returns a Supabase client configured from environment variables.
 * Uses `SUPABASE_URL` and `SUPABASE_KEY` (service role or anon).
 * Throws an error if envs are missing to avoid `undefined` typing downstream.
 */
export function getSupabaseServerClient(): SupabaseClient {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error('Supabase server client not configured: missing URL or KEY');
  }
  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

/**
 * Returns a Supabase admin client using the Service Role key.
 * Required for administrative actions like inviting users and role management.
 * Throws an error if envs are missing to avoid `undefined` typing downstream.
 */
export function getSupabaseAdminClient(): SupabaseClient {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error('Supabase admin client not configured: missing URL or SERVICE_ROLE_KEY');
  }
  return createClient(url, serviceKey, {
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