-- ============================================================
-- Estafet Usaha — Dummy Data Seeder
-- Jalankan di Supabase SQL Editor setelah schema.sql
-- ============================================================

DO $$
BEGIN
  CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;

  -- ── Bersihkan data lama ──
  DELETE FROM auth.users
  WHERE email IN ('budi@contoh.com','andi@contoh.com','citra@contoh.com','dewi@contoh.com');

  -- ── 1. Budi Santoso (Pendiri) ──
  INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
    confirmation_token, email_change, email_change_token_new, recovery_token
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    'a1111111-1111-1111-1111-111111111111',
    'authenticated','authenticated','budi@contoh.com',
    extensions.crypt('password123', extensions.gen_salt('bf')), now(),
    '{"provider":"email","providers":["email"]}',
    '{"full_name":"Budi Santoso","role":"pendiri"}',
    now(), now(), '','','',''
  );
  INSERT INTO auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at)
  VALUES (
    'a1111111-1111-1111-1111-111111111111',
    'a1111111-1111-1111-1111-111111111111',
    format('{"sub":"%s","email":"%s"}','a1111111-1111-1111-1111-111111111111','budi@contoh.com')::jsonb,
    'email','a1111111-1111-1111-1111-111111111111', now(), now(), now()
  );

  -- ── 2. Andi Santoso (Penerus Utama) ──
  INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
    confirmation_token, email_change, email_change_token_new, recovery_token
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    'b2222222-2222-2222-2222-222222222222',
    'authenticated','authenticated','andi@contoh.com',
    extensions.crypt('password123', extensions.gen_salt('bf')), now(),
    '{"provider":"email","providers":["email"]}',
    '{"full_name":"Andi Santoso","role":"penerus"}',
    now(), now(), '','','',''
  );
  INSERT INTO auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at)
  VALUES (
    'b2222222-2222-2222-2222-222222222222',
    'b2222222-2222-2222-2222-222222222222',
    format('{"sub":"%s","email":"%s"}','b2222222-2222-2222-2222-222222222222','andi@contoh.com')::jsonb,
    'email','b2222222-2222-2222-2222-222222222222', now(), now(), now()
  );

  -- ── 3. Citra Santoso (Calon Penerus) ──
  INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
    confirmation_token, email_change, email_change_token_new, recovery_token
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    'c4444444-4444-4444-4444-444444444444',
    'authenticated','authenticated','citra@contoh.com',
    extensions.crypt('password123', extensions.gen_salt('bf')), now(),
    '{"provider":"email","providers":["email"]}',
    '{"full_name":"Citra Santoso","role":"penerus"}',
    now(), now(), '','','',''
  );
  INSERT INTO auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at)
  VALUES (
    'c4444444-4444-4444-4444-444444444444',
    'c4444444-4444-4444-4444-444444444444',
    format('{"sub":"%s","email":"%s"}','c4444444-4444-4444-4444-444444444444','citra@contoh.com')::jsonb,
    'email','c4444444-4444-4444-4444-444444444444', now(), now(), now()
  );

  -- ── 4. Dewi Rahmawati (Notaris Partner) ──
  INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
    confirmation_token, email_change, email_change_token_new, recovery_token
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    'd5555555-5555-5555-5555-555555555555',
    'authenticated','authenticated','dewi@contoh.com',
    extensions.crypt('password123', extensions.gen_salt('bf')), now(),
    '{"provider":"email","providers":["email"]}',
    '{"full_name":"Dewi Rahmawati, S.H., M.Kn.","role":"penerus"}',
    now(), now(), '','','',''
  );
  INSERT INTO auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at)
  VALUES (
    'd5555555-5555-5555-5555-555555555555',
    'd5555555-5555-5555-5555-555555555555',
    format('{"sub":"%s","email":"%s"}','d5555555-5555-5555-5555-555555555555','dewi@contoh.com')::jsonb,
    'email','d5555555-5555-5555-5555-555555555555', now(), now(), now()
  );

  -- ── Insert profiles secara eksplisit (jangan andalkan trigger saja) ──
  INSERT INTO public.profiles (id, full_name, role, business_id, created_at)
  VALUES
    ('a1111111-1111-1111-1111-111111111111', 'Budi Santoso',               'pendiri', NULL, now()),
    ('b2222222-2222-2222-2222-222222222222', 'Andi Santoso',               'penerus', NULL, now()),
    ('c4444444-4444-4444-4444-444444444444', 'Citra Santoso',              'penerus', NULL, now()),
    ('d5555555-5555-5555-5555-555555555555', 'Dewi Rahmawati, S.H., M.Kn.','penerus', NULL, now())
  ON CONFLICT (id) DO UPDATE SET
    full_name = excluded.full_name,
    role      = excluded.role;

  -- ── Insert business (owner_id = Budi) ──
  INSERT INTO public.businesses (id, name, description, industry, founded_year, owner_id, invite_code)
  VALUES (
    'c3333333-3333-3333-3333-333333333333',
    'Toko Batik Santoso Nusantara',
    'Usaha keluarga produsen dan retail batik tulis tradisional sejak 1998. Memiliki 12 pengrajin tetap dan jaringan reseller di 5 kota besar Indonesia.',
    'Perdagangan / Retail', 1998,
    'a1111111-1111-1111-1111-111111111111',
    'ESTAF1'
  ) ON CONFLICT (id) DO UPDATE SET
    owner_id   = 'a1111111-1111-1111-1111-111111111111',
    name       = excluded.name,
    industry   = excluded.industry;

  -- ── Update business_id semua profiles termasuk Budi ──
  UPDATE public.profiles
  SET business_id = 'c3333333-3333-3333-3333-333333333333'
  WHERE id IN (
    'a1111111-1111-1111-1111-111111111111',
    'b2222222-2222-2222-2222-222222222222',
    'c4444444-4444-4444-4444-444444444444',
    'd5555555-5555-5555-5555-555555555555'
  );

  -- ── Daftarkan semua anggota ke business_members (termasuk Budi sebagai pendiri) ──
  INSERT INTO public.business_members (business_id, user_id, role) VALUES
    ('c3333333-3333-3333-3333-333333333333', 'a1111111-1111-1111-1111-111111111111', 'pendiri'),
    ('c3333333-3333-3333-3333-333333333333', 'b2222222-2222-2222-2222-222222222222', 'penerus'),
    ('c3333333-3333-3333-3333-333333333333', 'c4444444-4444-4444-4444-444444444444', 'calon_penerus'),
    ('c3333333-3333-3333-3333-333333333333', 'd5555555-5555-5555-5555-555555555555', 'notaris')
  ON CONFLICT DO NOTHING;

  -- ── 12 Milestones dengan status bervariasi (Skor ~33%) ──
  INSERT INTO public.milestones (business_id, title, description, category, status, completed_at) VALUES
  -- LEGAL
  ('c3333333-3333-3333-3333-333333333333','Inventarisasi Dokumen Legal Bisnis',
   'Kumpulkan semua dokumen legal: akta pendirian, SIUP, NPWP, sertifikat merek, kontrak vendor.',
   'legal','completed', now() - interval '5 days'),
  ('c3333333-3333-3333-3333-333333333333','Konsultasi Notaris untuk Suksesi',
   'Konsultasikan rencana transfer kepemilikan dengan notaris terpercaya.',
   'legal','in_progress', null),
  ('c3333333-3333-3333-3333-333333333333','Pembaruan Struktur Kepemilikan',
   'Proses pembaruan akta dan struktur kepemilikan sesuai rencana suksesi.',
   'legal','pending', null),
  -- FINANCIAL
  ('c3333333-3333-3333-3333-333333333333','Valuasi Bisnis',
   'Lakukan penilaian nilai bisnis secara objektif bersama konsultan keuangan.',
   'financial','completed', now() - interval '3 days'),
  ('c3333333-3333-3333-3333-333333333333','Perencanaan Pajak Suksesi',
   'Rencanakan implikasi pajak dari proses transfer kepemilikan.',
   'financial','in_progress', null),
  ('c3333333-3333-3333-3333-333333333333','Audit Keuangan Independen',
   'Lakukan audit keuangan untuk memastikan kesehatan bisnis sebelum transfer.',
   'financial','pending', null),
  -- OPERATIONAL
  ('c3333333-3333-3333-3333-333333333333','Dokumentasi SOP Bisnis',
   'Dokumentasikan semua Standard Operating Procedure yang ada di bisnis.',
   'operational','completed', now() - interval '2 days'),
  ('c3333333-3333-3333-3333-333333333333','Pemetaan Hubungan Stakeholder Kunci',
   'Identifikasi dan dokumentasikan relasi dengan vendor, klien, dan mitra utama.',
   'operational','in_progress', null),
  ('c3333333-3333-3333-3333-333333333333','Program Pelatihan Penerus',
   'Jalankan program mentoring/pelatihan terstruktur untuk penerus bisnis.',
   'operational','pending', null),
  -- RELATIONAL
  ('c3333333-3333-3333-3333-333333333333','Diskusi Terbuka Keluarga tentang Suksesi',
   'Lakukan pertemuan keluarga untuk mendiskusikan ekspektasi dan rencana suksesi secara terbuka.',
   'relational','completed', now() - interval '1 day'),
  ('c3333333-3333-3333-3333-333333333333','Perkenalan Penerus ke Stakeholder',
   'Perkenalkan calon penerus secara formal kepada vendor, klien, dan karyawan kunci.',
   'relational','in_progress', null),
  ('c3333333-3333-3333-3333-333333333333','Perjanjian Keluarga (Family Charter)',
   'Susun dokumen kesepakatan keluarga tentang nilai, peran, dan tata kelola bisnis keluarga.',
   'relational','pending', null)
  ON CONFLICT DO NOTHING;

END $$;
