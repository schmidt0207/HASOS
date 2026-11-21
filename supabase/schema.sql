create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  nome text,
  criado_em timestamptz not null default now()
);

create table if not exists public.mensagens (
  id uuid primary key default gen_random_uuid(),
  tipo text not null
    check (tipo in ('sugestao', 'reclamacao', 'denuncia', 'solicitacao', 'elogio', 'outro')),
  conteudo text not null
    check (char_length(btrim(conteudo)) between 10 and 3000),
  anonima boolean not null default true,
  nome text
    check (nome is null or char_length(btrim(nome)) between 2 and 120),
  turma text
    check (turma is null or char_length(btrim(turma)) between 1 and 40),
  status text not null default 'nova'
    check (status in ('nova', 'visualizada', 'em_analise', 'encaminhada', 'resolvida')),
  criado_em timestamptz not null default now(),
  visualizada_em timestamptz,
  constraint identificacao_coerente check (
    (anonima and nome is null and turma is null)
    or (not anonima and nome is not null and turma is not null)
  )
);

create index if not exists mensagens_criado_em_idx on public.mensagens (criado_em desc);
create index if not exists mensagens_status_idx on public.mensagens (status);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

create or replace function public.marcar_visualizacao()
returns trigger
language plpgsql
as $$
begin
  if new.status = 'nova' then
    new.visualizada_em := null;
  elsif old.visualizada_em is null then
    new.visualizada_em := now();
  else
    new.visualizada_em := old.visualizada_em;
  end if;
  return new;
end;
$$;

drop trigger if exists mensagens_marcar_visualizacao on public.mensagens;
create trigger mensagens_marcar_visualizacao
  before update on public.mensagens
  for each row execute function public.marcar_visualizacao();

create or replace function public.ping()
returns integer
language sql
stable
as $$
  select 1;
$$;

grant execute on function public.ping() to anon, authenticated;

alter table public.admins enable row level security;
alter table public.mensagens enable row level security;

drop policy if exists "admin le a propria linha" on public.admins;
create policy "admin le a propria linha"
  on public.admins for select
  to authenticated
  using (user_id = auth.uid());

drop policy if exists "qualquer pessoa envia mensagem" on public.mensagens;
create policy "qualquer pessoa envia mensagem"
  on public.mensagens for insert
  to anon, authenticated
  with check (status = 'nova' and visualizada_em is null);

drop policy if exists "admins leem mensagens" on public.mensagens;
create policy "admins leem mensagens"
  on public.mensagens for select
  to authenticated
  using (public.is_admin());

drop policy if exists "admins atualizam mensagens" on public.mensagens;
create policy "admins atualizam mensagens"
  on public.mensagens for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "admins excluem mensagens" on public.mensagens;
create policy "admins excluem mensagens"
  on public.mensagens for delete
  to authenticated
  using (public.is_admin());

revoke all on table public.mensagens from anon, authenticated;
revoke all on table public.admins from anon, authenticated;

grant insert (tipo, conteudo, anonima, nome, turma) on public.mensagens to anon, authenticated;
grant select, delete on public.mensagens to authenticated;
grant update (status) on public.mensagens to authenticated;
grant select on public.admins to authenticated;
