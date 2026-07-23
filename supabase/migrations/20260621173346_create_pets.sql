create extension if not exists pgcrypto with schema extensions;

create table if not exists public.pets (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null check (char_length(trim(name)) > 0),
  species text not null check (species in ('dog', 'cat', 'other')),
  breed text,
  gender text check (gender is null or gender in ('female', 'male', 'unknown')),
  birthday date,
  weight numeric(6, 2) check (weight is null or weight > 0),
  colour text,
  photo_url text,
  sterilised boolean,
  microchip_number text,
  personality text[] not null default '{}',
  medical_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists pets_owner_id_idx on public.pets(owner_id);
create index if not exists pets_created_at_idx on public.pets(created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_pets_updated_at on public.pets;

create trigger set_pets_updated_at
before update on public.pets
for each row
execute function public.set_updated_at();

alter table public.pets enable row level security;

grant select, insert, update, delete on public.pets to authenticated;

drop policy if exists "Pet owners can view their pets" on public.pets;
drop policy if exists "Pet owners can create pets" on public.pets;
drop policy if exists "Pet owners can update their pets" on public.pets;
drop policy if exists "Pet owners can delete their pets" on public.pets;

create policy "Pet owners can view their pets"
on public.pets
for select
to authenticated
using ((select auth.uid()) is not null and owner_id = (select auth.uid()));

create policy "Pet owners can create pets"
on public.pets
for insert
to authenticated
with check ((select auth.uid()) is not null and owner_id = (select auth.uid()));

create policy "Pet owners can update their pets"
on public.pets
for update
to authenticated
using ((select auth.uid()) is not null and owner_id = (select auth.uid()))
with check ((select auth.uid()) is not null and owner_id = (select auth.uid()));

create policy "Pet owners can delete their pets"
on public.pets
for delete
to authenticated
using ((select auth.uid()) is not null and owner_id = (select auth.uid()));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'pet-photos',
  'pet-photos',
  false,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Pet owners can read their pet photos" on storage.objects;
drop policy if exists "Pet owners can upload their pet photos" on storage.objects;
drop policy if exists "Pet owners can update their pet photos" on storage.objects;
drop policy if exists "Pet owners can delete their pet photos" on storage.objects;

create policy "Pet owners can read their pet photos"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'pet-photos'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

create policy "Pet owners can upload their pet photos"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'pet-photos'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

create policy "Pet owners can update their pet photos"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'pet-photos'
  and (storage.foldername(name))[1] = (select auth.uid())::text
)
with check (
  bucket_id = 'pet-photos'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

create policy "Pet owners can delete their pet photos"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'pet-photos'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);
