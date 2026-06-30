-- Run this once in your Supabase SQL editor (Project -> SQL Editor -> New query)
-- Adds an admin flag to users so the Admin dashboard can be gated.

alter table public.users
  add column if not exists is_admin boolean not null default false;

-- Promote yourself to admin manually after running this, e.g.:
-- update public.users set is_admin = true where email = 'you@example.com';
