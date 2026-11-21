import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { ExternalLink, Inbox, LayoutDashboard, LogOut } from 'lucide-react'
import StarMark from '../../components/StarMark'
import { useAuth } from '../../context/AuthContext'
import { requisicaoApi } from '../../lib/api'
import type { Mensagem, Status } from '../../lib/types'

export interface AdminCtx {
  mensagens: Mensagem[]
  carregando: boolean
  erro: string | null
  recarregar: () => Promise<void>
  alterarStatus: (id: string, status: Status) => Promise<string | null>
  excluir: (id: string) => Promise<string | null>
}

export default function AdminLayout() {
  const { session, sair } = useAuth()
  const navegar = useNavigate()
  const [mensagens, setMensagens] = useState<Mensagem[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState<string | null>(null)

  const recarregar = useCallback(async () => {
    setCarregando(true)
    try {
      const { mensagens: recebidas } = await requisicaoApi<{ mensagens: Mensagem[] }>('/api/messages')
      setErro(null)
      setMensagens(recebidas)
    } catch {
      setErro('Não foi possível carregar as mensagens. Verifique a conexão e a configuração do servidor.')
    } finally {
      setCarregando(false)
    }
  }, [])

  useEffect(() => {
    recarregar()
  }, [recarregar])

  const alterarStatus = useCallback(async (id: string, status: Status): Promise<string | null> => {
    try {
      const { mensagem } = await requisicaoApi<{ mensagem: { status: Status; visualizada_em: string | null } }>(`/api/messages/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      })
      setMensagens((atual) =>
        atual.map((m) => m.id === id ? { ...m, status: mensagem.status, visualizada_em: mensagem.visualizada_em } : m),
      )
      return null
    } catch (erro) {
      return erro instanceof Error ? erro.message : 'Não foi possível atualizar o status.'
    }
  }, [])

  const excluir = useCallback(async (id: string): Promise<string | null> => {
    try {
      await requisicaoApi(`/api/messages/${id}`, { method: 'DELETE' })
      setMensagens((atual) => atual.filter((m) => m.id !== id))
      return null
    } catch (erro) {
      return erro instanceof Error ? erro.message : 'Não foi possível excluir a mensagem.'
    }
  }, [])

  const novas = useMemo(() => mensagens.filter((m) => m.status === 'nova').length, [mensagens])

  async function aoSair() {
    await sair()
    navegar('/', { replace: true })
  }

  const classeAba = ({ isActive }: { isActive: boolean }) =>
    `inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
      isActive ? 'bg-white/10 text-white' : 'text-lilas hover:text-white'
    }`

  const contexto: AdminCtx = { mensagens, carregando, erro, recarregar, alterarStatus, excluir }

  return (
    <div className="min-h-screen bg-nevoa">
      <header className="escuro bg-noite text-white">
        <div className="secao flex flex-wrap items-center justify-between gap-3 py-3">
          <div className="flex items-center gap-3">
            <StarMark className="h-7 w-7 text-lilas" />
            <span className="font-display text-2xl font-semibold tracking-[0.2em]">HASOS</span>
            <span className="hidden text-sm text-lilas sm:inline">Painel do Grêmio</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-lilas hover:text-white sm:inline-flex">
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              Ver site
            </Link>
            <span className="hidden max-w-[14rem] truncate text-xs text-lilas/70 md:inline">{session?.user.email}</span>
            <button
              type="button"
              onClick={aoSair}
              className="inline-flex items-center gap-1.5 rounded-full border border-lilas/40 px-3 py-2 text-lilas hover:bg-white/10 hover:text-white"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Sair
            </button>
          </div>
        </div>
        <nav className="secao flex gap-1 pb-3" aria-label="Painel">
          <NavLink to="/admin" end className={classeAba}>
            <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
            Dashboard
          </NavLink>
          <NavLink to="/admin/mensagens" className={classeAba}>
            <Inbox className="h-4 w-4" aria-hidden="true" />
            Caixa de mensagens
            {novas > 0 && (
              <span className="rounded-full bg-lilas px-2 py-0.5 text-xs font-bold text-noite">{novas}</span>
            )}
          </NavLink>
        </nav>
      </header>
      <main className="secao py-8">
        <Outlet context={contexto} />
      </main>
    </div>
  )
}
