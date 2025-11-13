-- Profiles table with role column and RLS policies
-- Apply in Supabase SQL editor or migration tooling.

-- 1) Create profiles table linked to auth.users
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'member' check (role in ('super_admin','team_manager','member')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Maintain updated_at
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute procedure public.set_updated_at();

-- 2) Seed profile on new auth user
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, role) values (new.id, 'member');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- 3) Helper to read current user's role
create or replace function public.current_user_role()
returns text
language sql stable as $$
  select role from public.profiles where id = auth.uid();
$$;

-- 4) Enable RLS and define policies
alter table public.profiles enable row level security;

-- Users can read their own profile
create policy if not exists profiles_select_own
on public.profiles
for select
to authenticated
using (id = auth.uid());

-- Only super_admin can update any profile
create policy if not exists profiles_update_super_admin
on public.profiles
for update
to authenticated
using (public.current_user_role() = 'super_admin')
with check (true);

-- Only super_admin can insert/delete profiles (generally handled by trigger)
create policy if not exists profiles_insert_super_admin
on public.profiles
for insert
to authenticated
with check (public.current_user_role() = 'super_admin');

create policy if not exists profiles_delete_super_admin
on public.profiles
for delete
to authenticated
using (public.current_user_role() = 'super_admin');

-- NOTE: Extend RLS to other domain tables (e.g., attendance_events)
-- with policies that gate access based on role/team as needed.