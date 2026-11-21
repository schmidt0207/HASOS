import { useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { ArrowLeft, LoaderCircle, MailOpen, RefreshCw, Search, Trash2, UserRound, UserX } from 'lucide-react'
import {
  ROTULO_STATUS,
  ROTULO_TIPO,
  STATUS,
  TIPOS,
  formatarData,
  type Status,
  type TipoManifestacao,
} from '../../lib/types'
import type { AdminCtx } from './AdminLayout'
import StatusBadge from './StatusBadge'

export default function Caixa() {
  const { mensagens, carregando, erro, recarregar, alterarStatus, excluir } = useOutletContext<AdminCtx>()
  const [busca, setBusca] = useState('')
  const [tipo, setTipo] = useState<TipoManifestacao | 'todos'>('todos')
  const [status, setStatus] = useState<Status | 'todos'>('todos')
  const [soAnonimas, setSoAnonimas] = useState(false)
  const [selId, setSelId] = useState<string | null>(null)
  const [confirmando, setConfirmando] = useState(false)
  const [aviso, setAviso] = useState<string | null>(null)
  const [trabalhando, setTrabalhando] = useState(false)

  const filtradas = useMemo(() => {
    const termo = busca.trim().toLowerCase()
    return mensagens.filter((m) => {
      if (tipo !== 'todos' && m.tipo !== tipo) return false
      if (status !== 'todos' && m.status !== status) return false
      if (soAnonimas && !m.anonima) return false
      if (termo) {
        const alvo = `${m.conteudo} ${m.nome ?? ''} ${m.turma ?? ''} ${ROTULO_TIPO[m.tipo]}`.toLowerCase()
        if (!alvo.includes(termo)) return false
      }
      return true
    })
  }, [mensagens, busca, tipo, status, soAnonimas])

  const selecionada = mensagens.find((m) => m.id === selId) ?? null

  function abrir(id: string, statusAtual: Status) {
    setSelId(id)
    setConfirmando(false)
    setAviso(null)
    if (statusAtual === 'nova') {
      void alterarStatus(id, 'visualizada')
    }
  }

  async function mudarStatus(id: string, novo: Status) {
    setTrabalhando(true)
    setAviso(await alterarStatus(id, novo))
    setTrabalhando(false)
  }

  async function remover(id: string) {
    setTrabalhando(true)
    const resultado = await excluir(id)
    setTrabalhando(false)
    if (resultado) {
      setAviso(resultado)
    } else {
      setSelId(null)
      setConfirmando(false)
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-4xl font-semibold text-profundo">Caixa de mensagens</h1>
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

      <div className="cartao grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_auto] lg:items-end">
        <div>
          <label htmlFor="busca" className="rotulo">
            Pesquisar
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-tinta/50" aria-hidden="true" />
            <input
              id="busca"
              type="search"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Texto, nome ou turma"
              className="campo pl-9"
            />
          </div>
        </div>
        <div>
          <label htmlFor="filtro-tipo" className="rotulo">
            Categoria
          </label>
          <select
            id="filtro-tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value as TipoManifestacao | 'todos')}
            className="campo"
          >
            <option value="todos">Todas</option>
            {TIPOS.map((t) => (
              <option key={t} value={t}>
                {ROTULO_TIPO[t]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="filtro-status" className="rotulo">
            Status
          </label>
          <select
            id="filtro-status"
            value={status}
            onChange={(e) => setStatus(e.target.value as Status | 'todos')}
            className="campo"
          >
            <option value="todos">Todos</option>
            {STATUS.map((s) => (
              <option key={s} value={s}>
                {ROTULO_STATUS[s]}
              </option>
            ))}
          </select>
        </div>
        <label className="flex cursor-pointer items-center gap-2 py-3 text-sm font-medium text-profundo">
          <input
            type="checkbox"
            checked={soAnonimas}
            onChange={(e) => setSoAnonimas(e.target.checked)}
            className="h-4 w-4 accent-profundo"
          />
          Somente anônimas
        </label>
      </div>

      <div className="grid gap-4 lg:grid-cols-[400px_1fr]">
        <div className={selecionada ? 'hidden lg:block' : ''}>
          <p className="mb-2 text-xs text-tinta/60">
            {filtradas.length} de {mensagens.length} mensagens
          </p>
          {filtradas.length === 0 ? (
            <div className="cartao p-8 text-center text-sm text-tinta/70">
              {carregando
                ? 'Carregando mensagens.'
                : mensagens.length === 0
                  ? 'Nenhuma mensagem recebida ainda. Quando alguém enviar pela Escuta SD, ela aparece aqui.'
                  : 'Nenhuma mensagem com esses filtros. Ajuste a busca ou limpe os filtros.'}
            </div>
          ) : (
            <ul className="cartao divide-y divide-lilas-claro overflow-hidden lg:max-h-[calc(100vh-22rem)] lg:overflow-y-auto">
              {filtradas.map((m) => (
                <li key={m.id}>
                  <button
                    type="button"
                    onClick={() => abrir(m.id, m.status)}
                    aria-current={selId === m.id}
                    className={`flex w-full gap-3 px-4 py-4 text-left transition-colors hover:bg-nevoa ${
                      selId === m.id ? 'bg-lilas-claro/60' : ''
                    }`}
                  >
                    <span
                      className={`mt-2 h-2 w-2 shrink-0 rounded-full ${m.status === 'nova' ? 'bg-roxo' : 'bg-transparent'}`}
                      aria-label={m.status === 'nova' ? 'Não visualizada' : undefined}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className={`text-sm text-profundo ${m.status === 'nova' ? 'font-bold' : 'font-semibold'}`}>
                          {ROTULO_TIPO[m.tipo]}
                        </span>
                        <span className="shrink-0 text-xs text-tinta/60">{formatarData(m.criado_em)}</span>
                      </span>
                      <span className="mt-1 line-clamp-2 block text-sm text-tinta/80">{m.conteudo}</span>
                      <span className="mt-2 flex items-center gap-2 text-xs text-tinta/65">
                        {m.anonima ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-lilas-claro px-2 py-0.5 text-profundo">
                            <UserX className="h-3 w-3" aria-hidden="true" />
                            Anônima
                          </span>
                        ) : (
                          <span className="truncate">
                            {m.nome} · {m.turma}
                          </span>
                        )}
                        <StatusBadge status={m.status} />
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={selecionada ? '' : 'hidden lg:block'}>
          {selecionada ? (
            <article className="cartao p-6 sm:p-8">
              <button
                type="button"
                onClick={() => setSelId(null)}
                className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-roxo lg:hidden"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Voltar à lista
              </button>

              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-4xl font-semibold text-profundo">{ROTULO_TIPO[selecionada.tipo]}</h2>
                <StatusBadge status={selecionada.status} />
              </div>
              <p className="mt-1 text-sm text-tinta/65">Recebida em {formatarData(selecionada.criado_em)}</p>

              <div className="mt-4 flex items-center gap-2 rounded-xl bg-nevoa p-3 text-sm text-profundo">
                {selecionada.anonima ? (
                  <>
                    <UserX className="h-4 w-4 shrink-0" aria-hidden="true" />
                    Mensagem anônima. Nenhuma identificação foi informada.
                  </>
                ) : (
                  <>
                    <UserRound className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {selecionada.nome} · Turma {selecionada.turma}
                  </>
                )}
              </div>

              <p className="mt-6 whitespace-pre-wrap break-words text-base leading-relaxed text-tinta">
                {selecionada.conteudo}
              </p>

              <div className="mt-8 border-t border-lilas-claro pt-6">
                <h3 className="text-2xl font-semibold text-profundo">Status da mensagem</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {STATUS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      disabled={trabalhando || selecionada.status === s}
                      aria-pressed={selecionada.status === s}
                      onClick={() => mudarStatus(selecionada.id, s)}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors disabled:cursor-default ${
                        selecionada.status === s
                          ? 'border-profundo bg-profundo text-white'
                          : 'border-lilas text-profundo hover:bg-lilas-claro disabled:opacity-60'
                      }`}
                    >
                      {s === 'nova' && <MailOpen className="h-4 w-4" aria-hidden="true" />}
                      {s === 'nova' ? 'Marcar como não visualizada' : ROTULO_STATUS[s]}
                    </button>
                  ))}
                </div>

                {aviso && (
                  <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-800" role="alert">
                    {aviso}
                  </p>
                )}

                <div className="mt-6">
                  {confirmando ? (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                      <p className="text-sm font-semibold text-red-900">
                        Excluir esta mensagem para sempre? Essa ação não pode ser desfeita.
                      </p>
                      <div className="mt-3 flex gap-2">
                        <button
                          type="button"
                          disabled={trabalhando}
                          onClick={() => remover(selecionada.id)}
                          className="botao bg-red-700 text-white hover:bg-red-800"
                        >
                          {trabalhando ? (
                            <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
                          ) : (
                            <Trash2 className="h-4 w-4" aria-hidden="true" />
                          )}
                          Excluir mensagem
                        </button>
                        <button type="button" onClick={() => setConfirmando(false)} className="botao-contorno">
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmando(true)}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-700 hover:underline"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                      Excluir mensagem
                    </button>
                  )}
                </div>
              </div>
            </article>
          ) : (
            <div className="cartao flex min-h-[320px] items-center justify-center p-8 text-center text-sm text-tinta/60">
              Selecione uma mensagem da lista para ler o conteúdo completo.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
