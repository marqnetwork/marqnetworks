-- Teams & Members
create table if not exists public.teams (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_by uuid not null references auth.users(id) on delete restrict,
  created_at timestamptz not null default now()
);

create table if not exists public.team_members (
  team_id uuid not null references public.teams(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  is_manager boolean not null default false,
  added_at timestamptz not null default now(),
  primary key (team_id, user_id)
);

alter table public.teams enable row level security;
alter table public.team_members enable row level security;

-- Read policies
create policy if not exists teams_read_auth
on public.teams for select to authenticated using (true);

create policy if not exists team_members_read_auth
on public.team_members for select to authenticated using (
  -- user can read rows for teams they belong to
  user_id = auth.uid()
);

-- Write policies (managed via server role or super_admin)
create or replace function public.current_user_role()
returns text language sql stable as $$
  select role from public.profiles where id = auth.uid();
$$;

create policy if not exists teams_write_super_admin
on public.teams for insert to authenticated with check (public.current_user_role() = 'super_admin');

create policy if not exists team_members_write_manager
on public.team_members for insert to authenticated using (
  -- allow managers of the team or super_admin
  public.current_user_role() = 'super_admin'
) with check (
  public.current_user_role() = 'super_admin'
);

-- Managers can remove members via delete when super_admin (manager deletes handled by server role)
create policy if not exists team_members_delete_super_admin
on public.team_members for delete to authenticated using (public.current_user_role() = 'super_admin');

-- Attendance & Time Tracking
create table if not exists public.attendance (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  date date not null,
  clock_in_at timestamptz,
  clock_out_at timestamptz,
  status text not null default 'idle' check (status in ('idle','working','on_break')),
  created_at timestamptz not null default now(),
  unique (user_id, date)
);

create table if not exists public.time_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  start_time timestamptz not null,
  end_time timestamptz,
  duration integer,
  source text not null default 'timer' check (source in ('timer','manual')),
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.attendance enable row level security;
alter table public.time_entries enable row level security;

create policy if not exists attendance_read_own
on public.attendance for select to authenticated using (user_id = auth.uid());

create policy if not exists time_entries_read_own
on public.time_entries for select to authenticated using (user_id = auth.uid());

-- Writes are restricted; server role or policies can be expanded to managers
create policy if not exists attendance_write_own
on public.attendance for update to authenticated using (user_id = auth.uid());

create policy if not exists time_entries_write_own
on public.time_entries for insert to authenticated with check (user_id = auth.uid());