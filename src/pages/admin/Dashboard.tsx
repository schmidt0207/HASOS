import { Link, useOutletContext } from 'react-router-dom'
import { CircleCheck, Clock, Eye, Inbox, LoaderCircle, MailOpen, RefreshCw, Send, UserX } from 'lucide-react'
import { ROTULO_TIPO, TIPOS, formatarData } from '../../lib/types'
import type { AdminCtx } from './AdminLayout'
import StatusBadge from './StatusBadge'

export default function Dashboard() {
  const { mensagens, carregando, erro, recarregar } = useOutletContext<AdminCtx>()

  const total = mensagens.length
  const contar = (s: string) => mensagens.filter((m) => m.status === s).length
  const naoVisualizadas = contar('nova')
  const emAnalise = contar('em_analise')
  const resolvidas = contar('resolvida')
  const encaminhadas = contar('encaminhada')
  const anonimas = mensagens.filter((m) => m.anonima).length

  const principais = [
    { rotulo: 'Total recebidas', valor: total, icone: Inbox },
    { rotulo: 'Não visualizadas', valor: naoVisualizadas, icone: MailOpen },
    { rotulo: 'Em análise', valor: emAnalise, icone: Clock },
    { rotulo: 'Resolvidas', valor: resolvidas, icone: CircleCheck },
  ]

  const secundarias = [
    { rotulo: 'Encaminhadas', valor: encaminhadas, icone: Send },
    { rotulo: 'Anônimas', valor: anonimas, icone: UserX },
    { rotulo: 'Visualizadas', valor: contar('visualizada'), icone: Eye },
  ]

  const maiorTipo = Math.max(1, ...TIPOS.map((t) => mensagens.filter((m) => m.tipo === t).length))

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-4xl font-semibold text-profundo">Dashboard</h1>
        <button type="button" onClick={recarregar} disabled={carregando} className="botao-contorno">
          {carregando ? (
            <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
          )}
          Atualizar
        </button>
      </div>

      {erro && (
        <p className="rounded-xl bg-red-50 p-4 text-sm text-red-800" role="alert">
          {erro}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {principais.map((c) => (
          <div key={c.rotulo} className="cartao p-5">
            <c.icone className="h-5 w-5 text-roxo" aria-hidden="true" />
            <p className="mt-3 font-display text-5xl font-semibold text-profundo">{carregando && total === 0 ? '–' : c.valor}</p>
            <p className="mt-1 text-sm text-tinta/75">{c.rotulo}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {secundarias.map((c) => (
          <div key={c.rotulo} className="flex items-center gap-3 rounded-2xl bg-lilas-claro p-4">
            <c.icone className="h-5 w-5 text-profundo" aria-hidden="true" />
            <span className="font-display text-3xl font-semibold text-profundo">{c.valor}</span>
            <span className="text-sm text-profundo">{c.rotulo}</span>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="cartao p-6">
          <h2 className="text-3xl font-semibold text-profundo">Mensagens por tipo</h2>
          <ul className="mt-4 space-y-3">
            {TIPOS.map((t) => {
              const n = mensagens.filter((m) => m.tipo === t).length
              return (
                <li key={t} className="flex items-center gap-3 text-sm">
                  <span className="w-24 shrink-0 text-tinta/80">{ROTULO_TIPO[t]}</span>
                  <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-lilas-claro">
                    <span
                      className="block h-full rounded-full bg-roxo"
                      style={{ width: `${(n / maiorTipo) * 100}%` }}
                    />
                  </span>
                  <span className="w-6 text-right font-semibold text-profundo">{n}</span>
                </li>
              )
            })}
          </ul>
        </section>

        <section className="cartao p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold text-profundo">Mais recentes</h2>
            <Link to="/admin/mensagens" className="text-sm font-semibold text-roxo hover:underline">
              Abrir caixa de mensagens
            </Link>
          </div>
          {mensagens.length === 0 ? (
            <p className="mt-4 text-sm text-tinta/70">
              {carregando ? 'Carregando mensagens.' : 'Nenhuma mensagem recebida ainda.'}
            </p>
          ) : (
            <ul className="mt-4 divide-y divide-lilas-claro">
              {mensagens.slice(0, 5).map((m) => (
                <li key={m.id} className="flex items-start justify-between gap-3 py-3 first:pt-0 last:pb-0">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-profundo">
                      {ROTULO_TIPO[m.tipo]}
                      <span className="ml-2 font-normal text-tinta/60">{formatarData(m.criado_em)}</span>
                    </p>
                    <p className="mt-0.5 truncate text-sm text-tinta/80">{m.conteudo}</p>
                  </div>
                  <StatusBadge status={m.status} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}
