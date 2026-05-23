create extension if not exists "pgcrypto";

create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  will_attend boolean not null,
  adults integer default 0,
  children integer default 0,
  created_at timestamp default now()
);

create unique index if not exists rsvps_phone_unique on public.rsvps (phone);

alter table public.rsvps enable row level security;
