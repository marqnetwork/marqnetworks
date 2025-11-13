-- Agent schema: devices, heartbeats, screenshots
-- Requires role helpers: is_super_admin(), is_team_manager()

CREATE TABLE IF NOT EXISTS public.agent_devices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  device_id text NOT NULL,
  os text,
  version text,
  last_seen_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, device_id)
);

CREATE TABLE IF NOT EXISTS public.app_heartbeats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  time_entry_id uuid REFERENCES public.time_entries(id) ON DELETE SET NULL,
  captured_at timestamptz NOT NULL DEFAULT now(),
  app_name text,
  window_title text,
  idle boolean DEFAULT false
);

CREATE TABLE IF NOT EXISTS public.desktop_screenshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  time_entry_id uuid REFERENCES public.time_entries(id) ON DELETE SET NULL,
  captured_at timestamptz NOT NULL DEFAULT now(),
  file_url text NOT NULL,
  blurred boolean DEFAULT false
);

ALTER TABLE public.agent_devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_heartbeats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.desktop_screenshots ENABLE ROW LEVEL SECURITY;

-- Devices: owner and admins/managers can view; owner can insert/update
DROP POLICY IF EXISTS agent_devices_select ON public.agent_devices;
CREATE POLICY agent_devices_select ON public.agent_devices
FOR SELECT USING (auth.uid() = user_id OR is_super_admin() OR is_team_manager());

DROP POLICY IF EXISTS agent_devices_write ON public.agent_devices;
CREATE POLICY agent_devices_write ON public.agent_devices
FOR INSERT WITH CHECK (auth.uid() = user_id OR is_super_admin() OR is_team_manager())
FOR UPDATE USING (auth.uid() = user_id OR is_super_admin() OR is_team_manager());

-- Heartbeats: owner can insert/select; managers/admins can select
DROP POLICY IF EXISTS app_heartbeats_select ON public.app_heartbeats;
CREATE POLICY app_heartbeats_select ON public.app_heartbeats
FOR SELECT USING (auth.uid() = user_id OR is_super_admin() OR is_team_manager());

DROP POLICY IF EXISTS app_heartbeats_insert ON public.app_heartbeats;
CREATE POLICY app_heartbeats_insert ON public.app_heartbeats
FOR INSERT WITH CHECK (auth.uid() = user_id OR is_super_admin() OR is_team_manager());

-- Screenshots: owner can insert/select; managers/admins can select
DROP POLICY IF EXISTS desktop_screenshots_select ON public.desktop_screenshots;
CREATE POLICY desktop_screenshots_select ON public.desktop_screenshots
FOR SELECT USING (auth.uid() = user_id OR is_super_admin() OR is_team_manager());

DROP POLICY IF EXISTS desktop_screenshots_insert ON public.desktop_screenshots;
CREATE POLICY desktop_screenshots_insert ON public.desktop_screenshots
FOR INSERT WITH CHECK (auth.uid() = user_id OR is_super_admin() OR is_team_manager());