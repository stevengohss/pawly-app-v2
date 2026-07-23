create table if not exists public.daily_check_ins (
  id uuid primary key default gen_random_uuid(),
  pet_id uuid not null references public.pets(id) on delete cascade,
  author_id uuid not null references auth.users(id) on delete cascade,
  check_in_date date not null,
  mood text,
  energy text,
  appetite text,
  activity text,
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (pet_id, check_in_date)
);

create index if not exists daily_check_ins_pet_id_idx on public.daily_check_ins(pet_id);
create index if not exists daily_check_ins_author_id_idx on public.daily_check_ins(author_id);
create index if not exists daily_check_ins_check_in_date_idx on public.daily_check_ins(check_in_date desc);

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

drop trigger if exists set_daily_check_ins_updated_at on public.daily_check_ins;

create trigger set_daily_check_ins_updated_at
before update on public.daily_check_ins
for each row
execute function public.set_updated_at();

alter table public.daily_check_ins enable row level security;

grant select, insert, update, delete on public.daily_check_ins to authenticated;

drop policy if exists "Pet owners can view their daily check-ins" on public.daily_check_ins;
drop policy if exists "Pet owners can create daily check-ins" on public.daily_check_ins;
drop policy if exists "Pet owners can update daily check-ins" on public.daily_check_ins;
drop policy if exists "Pet owners can delete daily check-ins" on public.daily_check_ins;

create policy "Pet owners can view their daily check-ins"
on public.daily_check_ins
for select
to authenticated
using (
  exists (
    select 1
    from public.pets
    where pets.id = daily_check_ins.pet_id
      and pets.owner_id = (select auth.uid())
  )
);

create policy "Pet owners can create daily check-ins"
on public.daily_check_ins
for insert
to authenticated
with check (
  author_id = (select auth.uid())
  and exists (
    select 1
    from public.pets
    where pets.id = daily_check_ins.pet_id
      and pets.owner_id = (select auth.uid())
  )
);

create policy "Pet owners can update daily check-ins"
on public.daily_check_ins
for update
to authenticated
using (
  author_id = (select auth.uid())
  and exists (
    select 1
    from public.pets
    where pets.id = daily_check_ins.pet_id
      and pets.owner_id = (select auth.uid())
  )
)
with check (
  author_id = (select auth.uid())
  and exists (
    select 1
    from public.pets
    where pets.id = daily_check_ins.pet_id
      and pets.owner_id = (select auth.uid())
  )
);

create policy "Pet owners can delete daily check-ins"
on public.daily_check_ins
for delete
to authenticated
using (
  author_id = (select auth.uid())
  and exists (
    select 1
    from public.pets
    where pets.id = daily_check_ins.pet_id
      and pets.owner_id = (select auth.uid())
  )
);
