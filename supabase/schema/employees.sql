create table if not exists public.employees (
  user_id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  department text,
  role text,
  role_title text,
  details jsonb,
  created_at timestamptz not null default now()
);

alter table public.employees enable row level security;

create policy if not exists employees_select_own
on public.employees for select
to authenticated
using (user_id = auth.uid());

create policy if not exists employees_update_own
on public.employees for update
to authenticated
using (user_id = auth.uid());

create policy if not exists employees_insert_super_admin
on public.employees for insert
to authenticated
with check (public.current_user_role() = 'super_admin');