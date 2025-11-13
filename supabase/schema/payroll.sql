-- Payroll schema for salary-based calculations, reports, and admin settings
-- Assumes existing roles in profiles.role: 'super_admin', 'team_manager', 'employee'
-- Helper functions for role checks (if not already present in the schema):
-- CREATE OR REPLACE FUNCTION is_super_admin() RETURNS BOOLEAN LANGUAGE sql AS $$
--   SELECT (auth.jwt() ->> 'role') = 'super_admin' $$;
-- CREATE OR REPLACE FUNCTION is_team_manager() RETURNS BOOLEAN LANGUAGE sql AS $$
--   SELECT (auth.jwt() ->> 'role') = 'team_manager' $$;
-- CREATE OR REPLACE FUNCTION is_employee() RETURNS BOOLEAN LANGUAGE sql AS $$
--   SELECT (auth.jwt() ->> 'role') = 'employee' $$;

-- Table: payroll_settings (per-user payroll configuration)
CREATE TABLE IF NOT EXISTS public.payroll_settings (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  salary_type text NOT NULL CHECK (salary_type IN ('monthly','hourly')),
  monthly_salary numeric(12,2) NOT NULL,
  salary_currency text NOT NULL,
  hours_per_day numeric(6,2) NOT NULL,
  workdays smallint[] NOT NULL, -- array of dow numbers 0=Sun..6=Sat
  effective_from date NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE OR REPLACE FUNCTION public.payroll_settings_touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END; $$;

DROP TRIGGER IF EXISTS payroll_settings_set_updated_at ON public.payroll_settings;
CREATE TRIGGER payroll_settings_set_updated_at
BEFORE UPDATE ON public.payroll_settings
FOR EACH ROW EXECUTE FUNCTION public.payroll_settings_touch_updated_at();

-- Table: pay_periods (computed per pay run)
CREATE TABLE IF NOT EXISTS public.pay_periods (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  period_start date NOT NULL,
  period_end date NOT NULL,
  scheduled_hours numeric(10,2) NOT NULL DEFAULT 0,
  actual_hours numeric(10,2) NOT NULL DEFAULT 0,
  hourly_rate numeric(12,4) NOT NULL DEFAULT 0,
  eligible_amount numeric(12,2) NOT NULL DEFAULT 0,
  override_amount numeric(12,2),
  final_payable numeric(12,2) NOT NULL DEFAULT 0,
  status text NOT NULL CHECK (status IN ('pending','approved','paid')) DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, period_start, period_end)
);

CREATE OR REPLACE FUNCTION public.pay_periods_touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END; $$;

DROP TRIGGER IF EXISTS pay_periods_set_updated_at ON public.pay_periods;
CREATE TRIGGER pay_periods_set_updated_at
BEFORE UPDATE ON public.pay_periods
FOR EACH ROW EXECUTE FUNCTION public.pay_periods_touch_updated_at();

-- Table: salary_overrides (manager/super_admin overrides)
CREATE TABLE IF NOT EXISTS public.salary_overrides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pay_period_id uuid NOT NULL REFERENCES public.pay_periods(id) ON DELETE CASCADE,
  decider_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE SET NULL,
  amount numeric(12,2) NOT NULL,
  reason text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Table: settings (key-value)
CREATE TABLE IF NOT EXISTS public.settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE OR REPLACE FUNCTION public.settings_touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END; $$;

DROP TRIGGER IF EXISTS settings_set_updated_at ON public.settings;
CREATE TRIGGER settings_set_updated_at
BEFORE UPDATE ON public.settings
FOR EACH ROW EXECUTE FUNCTION public.settings_touch_updated_at();

-- Table: audit_logs (critical actions)
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  action text NOT NULL,
  entity text NOT NULL,
  payload_json jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- RLS policies
ALTER TABLE public.payroll_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pay_periods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.salary_overrides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- payroll_settings: user can view/update own; super_admin/team_manager can view for team members
DROP POLICY IF EXISTS payroll_settings_owner_select ON public.payroll_settings;
CREATE POLICY payroll_settings_owner_select ON public.payroll_settings
FOR SELECT USING (auth.uid() = user_id OR is_super_admin() OR is_team_manager());

DROP POLICY IF EXISTS payroll_settings_owner_upsert ON public.payroll_settings;
CREATE POLICY payroll_settings_owner_upsert ON public.payroll_settings
FOR INSERT WITH CHECK (auth.uid() = user_id OR is_super_admin() OR is_team_manager())
FOR UPDATE USING (auth.uid() = user_id OR is_super_admin() OR is_team_manager());

-- pay_periods: user can read own; managers and super_admin can read/update for team members
DROP POLICY IF EXISTS pay_periods_owner_select ON public.pay_periods;
CREATE POLICY pay_periods_owner_select ON public.pay_periods
FOR SELECT USING (auth.uid() = user_id OR is_super_admin() OR is_team_manager());

DROP POLICY IF EXISTS pay_periods_manager_update ON public.pay_periods;
CREATE POLICY pay_periods_manager_update ON public.pay_periods
FOR UPDATE USING (is_super_admin() OR is_team_manager());

DROP POLICY IF EXISTS pay_periods_manager_insert ON public.pay_periods;
CREATE POLICY pay_periods_manager_insert ON public.pay_periods
FOR INSERT WITH CHECK (is_super_admin() OR is_team_manager() OR auth.uid() = user_id);

-- salary_overrides: only managers/super_admin can insert/select; owners can read overrides tied to their pay_period
DROP POLICY IF EXISTS salary_overrides_select ON public.salary_overrides;
CREATE POLICY salary_overrides_select ON public.salary_overrides
FOR SELECT USING (
  is_super_admin() OR is_team_manager() OR EXISTS (
    SELECT 1 FROM public.pay_periods p WHERE p.id = salary_overrides.pay_period_id AND p.user_id = auth.uid()
  )
);

DROP POLICY IF EXISTS salary_overrides_insert ON public.salary_overrides;
CREATE POLICY salary_overrides_insert ON public.salary_overrides
FOR INSERT WITH CHECK (is_super_admin() OR is_team_manager());

-- settings: super_admin full access; team_manager read-only
DROP POLICY IF EXISTS settings_select ON public.settings;
CREATE POLICY settings_select ON public.settings
FOR SELECT USING (is_super_admin() OR is_team_manager());

DROP POLICY IF EXISTS settings_update ON public.settings;
CREATE POLICY settings_update ON public.settings
FOR UPDATE USING (is_super_admin())
WITH CHECK (is_super_admin());

DROP POLICY IF EXISTS settings_insert ON public.settings;
CREATE POLICY settings_insert ON public.settings
FOR INSERT WITH CHECK (is_super_admin());

-- audit_logs: super_admin only
DROP POLICY IF EXISTS audit_logs_select ON public.audit_logs;
CREATE POLICY audit_logs_select ON public.audit_logs
FOR SELECT USING (is_super_admin());

DROP POLICY IF EXISTS audit_logs_insert ON public.audit_logs;
CREATE POLICY audit_logs_insert ON public.audit_logs
FOR INSERT WITH CHECK (is_super_admin() OR is_team_manager());

-- Utility function: business days count within period by workdays array
CREATE OR REPLACE FUNCTION public.count_workdays_between(start_date date, end_date date, allowed_dows smallint[])
RETURNS INTEGER LANGUAGE plpgsql AS $$
DECLARE
  d date;
  cnt integer := 0;
BEGIN
  IF start_date > end_date THEN RETURN 0; END IF;
  d := start_date;
  WHILE d <= end_date LOOP
    IF extract(dow from d)::int = ANY(allowed_dows) THEN cnt := cnt + 1; END IF;
    d := d + 1;
  END LOOP;
  RETURN cnt;
END; $$;