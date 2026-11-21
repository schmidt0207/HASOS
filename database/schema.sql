create table if not exists public.mensagens (
  id uuid primary key default gen_random_uuid(),
  tipo text not null check (tipo in ('sugestao', 'reclamacao', 'denuncia', 'solicitacao', 'elogio', 'outro')),
  conteudo text not null check (char_length(btrim(conteudo)) between 10 and 3000),
  anonima boolean not null default true,
  nome text check (nome is null or char_length(btrim(nome)) between 2 and 120),
  turma text check (turma is null or char_length(btrim(turma)) between 1 and 40),
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
