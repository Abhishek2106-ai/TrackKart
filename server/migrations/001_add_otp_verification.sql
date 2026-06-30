-- Run this once in your Supabase SQL editor (Project -> SQL Editor -> New query)
-- Adds the columns needed for OTP email verification on registration.

alter table public.users
  add column if not exists is_verified boolean not null default false,
  add column if not exists otp_code text,
  add column if not exists otp_expires_at timestamptz;

-- IMPORTANT: if you already have existing users created before this change,
-- mark them as verified so they aren't locked out of login:
update public.users set is_verified = true where is_verified is distinct from true;
