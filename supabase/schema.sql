-- NusaWork Control - PostgreSQL / Supabase schema
-- Jalankan melalui Supabase SQL Editor pada project baru.

create extension if not exists pgcrypto;

create type public.user_role as enum ('owner', 'hr_admin', 'warehouse_admin', 'viewer');
create type public.employee_status as enum ('active', 'inactive');
create type public.attendance_status as enum ('present', 'late', 'permission', 'sick', 'absent', 'holiday');
create type public.item_condition as enum ('good', 'needs_repair', 'damaged');
create type public.transaction_type as enum ('in', 'out', 'adjustment');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role public.user_role not null default 'viewer',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.company_settings (
  id uuid primary key default gen_random_uuid(),
  company_name text not null default 'Nama Perusahaan',
  app_name text not null default 'NusaWork Control',
  logo_url text,
  work_start time not null default '08:00',
  work_end time not null default '17:00',
  timezone text not null default 'Asia/Jakarta',
  updated_by uuid references public.profiles(id),
  updated_at timestamptz not null default now()
);

create table public.employees (
  id uuid primary key default gen_random_uuid(),
  employee_code text not null unique,
  full_name text not null,
  division text not null,
  position text not null,
  phone text,
  address text,
  join_date date not null,
  status public.employee_status not null default 'active',
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index employees_name_idx on public.employees using gin (to_tsvector('simple', full_name));
create index employees_division_idx on public.employees (division);

create table public.attendance (
  id uuid primary key default gen_random_uuid(),
  employee_id uuid not null references public.employees(id) on delete restrict,
  attendance_date date not null,
  check_in time,
  check_out time,
  status public.attendance_status not null,
  note text,
  recorded_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (employee_id, attendance_date)
);

create index attendance_date_idx on public.attendance (attendance_date desc);
create index attendance_employee_idx on public.attendance (employee_id, attendance_date desc);

create table public.inventory_items (
  id uuid primary key default gen_random_uuid(),
  item_code text not null unique,
  item_name text not null,
  category text not null,
  current_stock numeric(14,2) not null default 0 check (current_stock >= 0),
  minimum_stock numeric(14,2) not null default 0 check (minimum_stock >= 0),
  unit text not null,
  location text not null,
  condition public.item_condition not null default 'good',
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index inventory_category_idx on public.inventory_items (category);
create index inventory_low_stock_idx on public.inventory_items (current_stock, minimum_stock);

create table public.inventory_transactions (
  id uuid primary key default gen_random_uuid(),
  item_id uuid not null references public.inventory_items(id) on delete restrict,
  transaction_type public.transaction_type not null,
  quantity numeric(14,2) not null check (quantity > 0),
  stock_before numeric(14,2) not null,
  stock_after numeric(14,2) not null check (stock_after >= 0),
  note text,
  reference_number text,
  transacted_at timestamptz not null default now(),
  created_by uuid references public.profiles(id)
);

create index inventory_transactions_item_idx on public.inventory_transactions (item_id, transacted_at desc);

create table public.audit_logs (
  id bigint generated always as identity primary key,
  actor_id uuid references public.profiles(id),
  action text not null,
  table_name text not null,
  record_id text,
  old_data jsonb,
  new_data jsonb,
  created_at timestamptz not null default now()
);

create index audit_logs_created_idx on public.audit_logs (created_at desc);
create index audit_logs_actor_idx on public.audit_logs (actor_id, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at before update on public.profiles for each row execute function public.set_updated_at();
create trigger company_settings_set_updated_at before update on public.company_settings for each row execute function public.set_updated_at();
create trigger employees_set_updated_at before update on public.employees for each row execute function public.set_updated_at();
create trigger attendance_set_updated_at before update on public.attendance for each row execute function public.set_updated_at();
create trigger inventory_items_set_updated_at before update on public.inventory_items for each row execute function public.set_updated_at();

create or replace function public.current_user_role()
returns public.user_role
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid() and is_active = true;
$$;

create or replace function public.can_manage_hr()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.current_user_role() in ('owner', 'hr_admin'), false);
$$;

create or replace function public.can_manage_inventory()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.current_user_role() in ('owner', 'warehouse_admin'), false);
$$;

create or replace function public.apply_inventory_transaction()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  current_value numeric(14,2);
  next_value numeric(14,2);
begin
  select current_stock into current_value
  from public.inventory_items
  where id = new.item_id
  for update;

  if new.transaction_type = 'in' then
    next_value := current_value + new.quantity;
  elsif new.transaction_type = 'out' then
    next_value := current_value - new.quantity;
  else
    next_value := new.stock_after;
  end if;

  if next_value < 0 then
    raise exception 'Stok tidak boleh menjadi negatif';
  end if;

  new.stock_before := current_value;
  new.stock_after := next_value;

  update public.inventory_items
  set current_stock = next_value, updated_at = now()
  where id = new.item_id;

  return new;
end;
$$;

create trigger inventory_transaction_apply
before insert on public.inventory_transactions
for each row execute function public.apply_inventory_transaction();

alter table public.profiles enable row level security;
alter table public.company_settings enable row level security;
alter table public.employees enable row level security;
alter table public.attendance enable row level security;
alter table public.inventory_items enable row level security;
alter table public.inventory_transactions enable row level security;
alter table public.audit_logs enable row level security;

create policy "authenticated users read own profile"
on public.profiles for select to authenticated
using (id = auth.uid() or public.current_user_role() = 'owner');

create policy "owner manages profiles"
on public.profiles for all to authenticated
using (public.current_user_role() = 'owner')
with check (public.current_user_role() = 'owner');

create policy "authenticated users read settings"
on public.company_settings for select to authenticated
using (true);

create policy "owner updates settings"
on public.company_settings for all to authenticated
using (public.current_user_role() = 'owner')
with check (public.current_user_role() = 'owner');

create policy "authenticated users read employees"
on public.employees for select to authenticated
using (true);

create policy "hr manages employees"
on public.employees for all to authenticated
using (public.can_manage_hr())
with check (public.can_manage_hr());

create policy "authenticated users read attendance"
on public.attendance for select to authenticated
using (true);

create policy "hr manages attendance"
on public.attendance for all to authenticated
using (public.can_manage_hr())
with check (public.can_manage_hr());

create policy "authenticated users read inventory"
on public.inventory_items for select to authenticated
using (true);

create policy "warehouse manages inventory"
on public.inventory_items for all to authenticated
using (public.can_manage_inventory())
with check (public.can_manage_inventory());

create policy "authenticated users read stock movements"
on public.inventory_transactions for select to authenticated
using (true);

create policy "warehouse creates stock movements"
on public.inventory_transactions for insert to authenticated
with check (public.can_manage_inventory());

create policy "owner reads audit logs"
on public.audit_logs for select to authenticated
using (public.current_user_role() = 'owner');

create view public.low_stock_items
with (security_invoker = true)
as
select * from public.inventory_items where current_stock <= minimum_stock;

insert into public.company_settings (company_name, app_name)
values ('Nama Perusahaan', 'NusaWork Control');
