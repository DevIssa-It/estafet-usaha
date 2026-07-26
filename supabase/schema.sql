-- ============================================================
-- Estafet Usaha — Production Supabase Schema & Setup
-- Run this ONCE in Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- Enable required extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ──────────────────────────────────────────────────────────────
-- 1. TABLES DEFINITION
-- ──────────────────────────────────────────────────────────────

-- TABLE: profiles
create table if not exists public.profiles (
  id          uuid references auth.users on delete cascade primary key,
  full_name   text not null,
  role        text not null default 'pendiri',
  business_id uuid,
  created_at  timestamp with time zone default now()
);

-- Ensure check constraint on profiles allows all roles or alter it
alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles add constraint profiles_role_check check (role in ('pendiri', 'penerus', 'calon_penerus', 'notaris', 'advisor'));

-- TABLE: businesses
create table if not exists public.businesses (
  id           uuid default uuid_generate_v4() primary key,
  name         text not null,
  description  text,
  industry     text not null,
  founded_year integer,
  owner_id     uuid references public.profiles(id) on delete set null,
  invite_code  text unique not null,
  created_at   timestamp with time zone default now()
);

-- FK from profiles to businesses
alter table public.profiles
  drop constraint if exists fk_profiles_business,
  add constraint fk_profiles_business
  foreign key (business_id) references public.businesses(id) on delete set null;

-- TABLE: business_members
create table if not exists public.business_members (
  id          uuid default uuid_generate_v4() primary key,
  business_id uuid references public.businesses(id) on delete cascade not null,
  user_id     uuid references public.profiles(id) on delete cascade not null,
  role        text not null default 'penerus',
  joined_at   timestamp with time zone default now(),
  unique(business_id, user_id)
);

-- TABLE: milestones
create table if not exists public.milestones (
  id           uuid default uuid_generate_v4() primary key,
  business_id  uuid references public.businesses(id) on delete cascade not null,
  title        text not null,
  description  text,
  category     text not null check (category in ('legal', 'financial', 'operational', 'relational')),
  status       text not null default 'pending' check (status in ('pending', 'in_progress', 'completed')),
  due_date     date,
  completed_at timestamp with time zone,
  created_at   timestamp with time zone default now()
);

-- TABLE: chat_messages
create table if not exists public.chat_messages (
  id          uuid default uuid_generate_v4() primary key,
  business_id uuid references public.businesses(id) on delete cascade,
  user_id     uuid references public.profiles(id) on delete cascade not null,
  role        text not null check (role in ('user', 'assistant')),
  content     text not null,
  created_at  timestamp with time zone default now()
);

-- TABLE: vault_documents
create table if not exists public.vault_documents (
  id           uuid default uuid_generate_v4() primary key,
  business_id  uuid references public.businesses(id) on delete cascade not null,
  uploaded_by  uuid references public.profiles(id) on delete cascade not null,
  title        text not null,
  category     text not null check (category in ('legal', 'financial', 'operational', 'relational')),
  file_url     text not null,
  file_name    text not null,
  file_size    integer default 0,
  created_at   timestamp with time zone default now()
);

-- TABLE: notary_invitations
create table if not exists public.notary_invitations (
  id           uuid default uuid_generate_v4() primary key,
  business_id  uuid references public.businesses(id) on delete cascade not null,
  notary_id    uuid references public.profiles(id) on delete cascade not null,
  status       text not null default 'pending' check (status in ('pending', 'accepted', 'rejected')),
  created_at   timestamp with time zone default now()
);

-- ──────────────────────────────────────────────────────────────
-- 2. ROW LEVEL SECURITY (RLS) POLICIES
-- ──────────────────────────────────────────────────────────────

alter table public.profiles enable row level security;
alter table public.businesses enable row level security;
alter table public.business_members enable row level security;
alter table public.milestones enable row level security;
alter table public.chat_messages enable row level security;
alter table public.vault_documents enable row level security;
alter table public.notary_invitations enable row level security;

-- Drop existing policies if re-running script
drop policy if exists "Users can view profiles" on public.profiles;
drop policy if exists "Users can view own profile" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;
drop policy if exists "Users can insert own profile" on public.profiles;

drop policy if exists "Users can view businesses" on public.businesses;
drop policy if exists "Users can view their business" on public.businesses;
drop policy if exists "Pendiri can create business" on public.businesses;
drop policy if exists "Pendiri can update their business" on public.businesses;

drop policy if exists "Members can view business members" on public.business_members;
drop policy if exists "Members can view their business members" on public.business_members;
drop policy if exists "Users can join business" on public.business_members;

drop policy if exists "Members can view milestones" on public.milestones;
drop policy if exists "Members can update milestones" on public.milestones;
drop policy if exists "System can insert milestones" on public.milestones;

drop policy if exists "Members can view chat messages" on public.chat_messages;
drop policy if exists "Members can insert chat messages" on public.chat_messages;

drop policy if exists "Members can view vault documents" on public.vault_documents;
drop policy if exists "Members can insert vault documents" on public.vault_documents;

drop policy if exists "Users can view notary invitations" on public.notary_invitations;
drop policy if exists "Users can insert notary invitations" on public.notary_invitations;
drop policy if exists "Users can update notary invitations" on public.notary_invitations;

-- Create policies
create policy "Users can view profiles" on public.profiles for select using (auth.role() = 'authenticated');
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);

create policy "Users can view businesses" on public.businesses for select using (auth.role() = 'authenticated');
create policy "Pendiri can create business" on public.businesses for insert with check (owner_id = auth.uid());
create policy "Pendiri can update their business" on public.businesses for update using (owner_id = auth.uid());

create policy "Members can view business members" on public.business_members for select using (auth.role() = 'authenticated');
create policy "Users can join business" on public.business_members for insert with check (user_id = auth.uid());

create policy "Members can view milestones" on public.milestones for select using (auth.role() = 'authenticated');
create policy "Members can update milestones" on public.milestones for update using (auth.role() = 'authenticated');
create policy "System can insert milestones" on public.milestones for insert with check (auth.role() = 'authenticated');

create policy "Members can view chat messages" on public.chat_messages for select using (auth.role() = 'authenticated');
create policy "Members can insert chat messages" on public.chat_messages for insert with check (user_id = auth.uid());

create policy "Members can view vault documents" on public.vault_documents for select using (auth.role() = 'authenticated');
create policy "Members can insert vault documents" on public.vault_documents for insert with check (uploaded_by = auth.uid());

create policy "Users can view notary invitations" on public.notary_invitations for select using (auth.role() = 'authenticated');
create policy "Users can insert notary invitations" on public.notary_invitations for insert with check (auth.role() = 'authenticated');
create policy "Users can update notary invitations" on public.notary_invitations for update using (auth.role() = 'authenticated');

-- ──────────────────────────────────────────────────────────────
-- 3. INDEXES
-- ──────────────────────────────────────────────────────────────
create index if not exists idx_profiles_business_id on public.profiles(business_id);
create index if not exists idx_milestones_business_id on public.milestones(business_id);
create index if not exists idx_milestones_status on public.milestones(status);
create index if not exists idx_chat_messages_business_id on public.chat_messages(business_id);
create index if not exists idx_businesses_invite_code on public.businesses(invite_code);
create index if not exists idx_vault_documents_business_id on public.vault_documents(business_id);

-- ──────────────────────────────────────────────────────────────
-- 4. AUTOMATIC PROFILE CREATION TRIGGER
-- ──────────────────────────────────────────────────────────────
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', 'Pengguna Baru'),
    coalesce(new.raw_user_meta_data->>'role', 'pendiri')
  )
  on conflict (id) do update set
    full_name = excluded.full_name,
    role = excluded.role;
  return new;
end;
$$ language plpgsql security definer;

-- Trigger on auth.users insertion
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ──────────────────────────────────────────────────────────────
-- 5. AUTOMATED DUMMY SEEDER QUERY (ALL ROLES INCLUDED)
-- ──────────────────────────────────────────────────────────────

DO $$
BEGIN
  CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;

  -- Delete old dummy seeds if re-running
  DELETE FROM auth.users WHERE email IN ('budi@contoh.com', 'andi@contoh.com', 'citra@contoh.com', 'dewi@contoh.com');

  -- 1. Budi Santoso (Role: Pendiri / Business Owner)
  INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
    confirmation_token, email_change, email_change_token_new, recovery_token
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    'a1111111-1111-1111-1111-111111111111',
    'authenticated', 'authenticated',
    'budi@contoh.com',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"full_name":"Budi Santoso","role":"pendiri"}',
    now(), now(), '', '', '', ''
  );

  INSERT INTO auth.identities (
    id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at
  ) VALUES (
    'a1111111-1111-1111-1111-111111111111',
    'a1111111-1111-1111-1111-111111111111',
    format('{"sub":"%s","email":"%s"}', 'a1111111-1111-1111-1111-111111111111', 'budi@contoh.com')::jsonb,
    'email', 'a1111111-1111-1111-1111-111111111111', now(), now(), now()
  );

  -- 2. Andi Santoso (Role: Penerus Utama)
  INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
    confirmation_token, email_change, email_change_token_new, recovery_token
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    'b2222222-2222-2222-2222-222222222222',
    'authenticated', 'authenticated',
    'andi@contoh.com',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"full_name":"Andi Santoso","role":"penerus"}',
    now(), now(), '', '', '', ''
  );

  INSERT INTO auth.identities (
    id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at
  ) VALUES (
    'b2222222-2222-2222-2222-222222222222',
    'b2222222-2222-2222-2222-222222222222',
    format('{"sub":"%s","email":"%s"}', 'b2222222-2222-2222-2222-222222222222', 'andi@contoh.com')::jsonb,
    'email', 'b2222222-2222-2222-2222-222222222222', now(), now(), now()
  );

  -- 3. Citra Santoso (Role: Calon Penerus)
  INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
    confirmation_token, email_change, email_change_token_new, recovery_token
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    'c4444444-4444-4444-4444-444444444444',
    'authenticated', 'authenticated',
    'citra@contoh.com',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"full_name":"Citra Santoso","role":"penerus"}',
    now(), now(), '', '', '', ''
  );

  INSERT INTO auth.identities (
    id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at
  ) VALUES (
    'c4444444-4444-4444-4444-444444444444',
    'c4444444-4444-4444-4444-444444444444',
    format('{"sub":"%s","email":"%s"}', 'c4444444-4444-4444-4444-444444444444', 'citra@contoh.com')::jsonb,
    'email', 'c4444444-4444-4444-4444-444444444444', now(), now(), now()
  );

  -- 4. Dewi Rahmawati (Role: Notaris Partner)
  INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
    confirmation_token, email_change, email_change_token_new, recovery_token
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    'd5555555-5555-5555-5555-555555555555',
    'authenticated', 'authenticated',
    'dewi@contoh.com',
    extensions.crypt('password123', extensions.gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"full_name":"Dewi Rahmawati, S.H., M.Kn.","role":"penerus"}',
    now(), now(), '', '', '', ''
  );

  INSERT INTO auth.identities (
    id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at
  ) VALUES (
    'd5555555-5555-5555-5555-555555555555',
    'd5555555-5555-5555-5555-555555555555',
    format('{"sub":"%s","email":"%s"}', 'd5555555-5555-5555-5555-555555555555', 'dewi@contoh.com')::jsonb,
    'email', 'd5555555-5555-5555-5555-555555555555', now(), now(), now()
  );

  -- Seed Business for Budi
  INSERT INTO public.businesses (id, name, description, industry, founded_year, owner_id, invite_code)
  VALUES (
    'c3333333-3333-3333-3333-333333333333',
    'Toko Batik Santoso Nusantara',
    'Usaha keluarga produsen dan retail batik tulis tradisional sejak 1998.',
    'Perdagangan / Retail', 1998,
    'a1111111-1111-1111-1111-111111111111',
    'ESTAF1'
  ) ON CONFLICT DO NOTHING;

  -- Update Business ID for profiles
  UPDATE public.profiles
  SET business_id = 'c3333333-3333-3333-3333-333333333333'
  WHERE id IN (
    'a1111111-1111-1111-1111-111111111111',
    'b2222222-2222-2222-2222-222222222222',
    'c4444444-4444-4444-4444-444444444444',
    'd5555555-5555-5555-5555-555555555555'
  );

  -- Add Members to Business with detailed roles
  INSERT INTO public.business_members (business_id, user_id, role) VALUES
    ('c3333333-3333-3333-3333-333333333333', 'b2222222-2222-2222-2222-222222222222', 'penerus'),
    ('c3333333-3333-3333-3333-333333333333', 'c4444444-4444-4444-4444-444444444444', 'calon_penerus'),
    ('c3333333-3333-3333-3333-333333333333', 'd5555555-5555-5555-5555-555555555555', 'notaris')
  ON CONFLICT DO NOTHING;

  -- Seed Default 12 Milestones
  INSERT INTO public.milestones (business_id, title, description, category, status, completed_at) VALUES
  ('c3333333-3333-3333-3333-333333333333', 'Inventarisasi Dokumen Legal Bisnis', 'Kumpulkan semua dokumen legal: akta pendirian, SIUP, NPWP, sertifikat merek, kontrak vendor.', 'legal', 'completed', now() - interval '5 days'),
  ('c3333333-3333-3333-3333-333333333333', 'Konsultasi Notaris untuk Suksesi', 'Konsultasikan rencana transfer kepemilikan dengan notaris terpercaya.', 'legal', 'in_progress', null),
  ('c3333333-3333-3333-3333-333333333333', 'Pembaruan Struktur Kepemilikan', 'Proses pembaruan akta dan struktur kepemilikan sesuai rencana suksesi.', 'legal', 'pending', null),
  ('c3333333-3333-3333-3333-333333333333', 'Valuasi Bisnis', 'Lakukan penilaian nilai bisnis secara objektif bersama konsultan keuangan.', 'financial', 'completed', now() - interval '3 days'),
  ('c3333333-3333-3333-3333-333333333333', 'Perencanaan Pajak Suksesi', 'Rencanakan implikasi pajak dari proses transfer kepemilikan.', 'financial', 'in_progress', null),
  ('c3333333-3333-3333-3333-333333333333', 'Audit Keuangan Independen', 'Lakukan audit keuangan untuk memastikan kesehatan bisnis sebelum transfer.', 'financial', 'pending', null),
  ('c3333333-3333-3333-3333-333333333333', 'Dokumentasi SOP Bisnis', 'Dokumentasikan semua Standard Operating Procedure yang ada di bisnis.', 'operational', 'completed', now() - interval '2 days'),
  ('c3333333-3333-3333-3333-333333333333', 'Pemetaan Hubungan Stakeholder Kunci', 'Identifikasi dan dokumentasikan relasi dengan vendor, klien, dan mitra utama.', 'operational', 'in_progress', null),
  ('c3333333-3333-3333-3333-333333333333', 'Program Pelatihan Penerus', 'Jalankan program mentoring/pelatihan terstruktur untuk penerus bisnis.', 'operational', 'pending', null),
  ('c3333333-3333-3333-3333-333333333333', 'Diskusi Terbuka Keluarga tentang Suksesi', 'Lakukan pertemuan keluarga untuk mendiskusikan ekspektasi dan rencana suksesi secara terbuka.', 'relational', 'completed', now() - interval '1 day'),
  ('c3333333-3333-3333-3333-333333333333', 'Perkenalan Penerus ke Stakeholder', 'Perkenalkan calon penerus secara formal kepada vendor, klien, dan karyawan kunci.', 'relational', 'in_progress', null),
  ('c3333333-3333-3333-3333-333333333333', 'Perjanjian Keluarga (Family Charter)', 'Susun dokumen kesepakatan keluarga tentang nilai, peran, dan tata kelola bisnis keluarga.', 'relational', 'pending', null)
  ON CONFLICT DO NOTHING;

END $$;
