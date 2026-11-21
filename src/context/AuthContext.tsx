import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { requisicaoApi } from '../lib/api'

interface AuthEstado {
  carregando: boolean
  session: { user: { email: string } } | null
  admin: boolean | null
  entrar: (identificador: string, senha: string) => Promise<string | null>
  sair: () => Promise<void>
}

const AuthContext = createContext<AuthEstado | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [carregando, setCarregando] = useState(true)
  const [session, setSession] = useState<AuthEstado['session']>(null)
  const [admin, setAdmin] = useState<boolean | null>(null)

  useEffect(() => {
    let ativo = true
    requisicaoApi<{ usuario: string }>('/api/auth/session')
      .then(({ usuario }) => {
        if (ativo) {
          setSession({ user: { email: usuario } })
          setAdmin(true)
        }
      })
      .catch(() => {
        if (ativo) {
          setSession(null)
          setAdmin(false)
        }
      })
      .finally(() => {
        if (ativo) setCarregando(false)
      })
    return () => { ativo = false }
  }, [])

  async function entrar(identificador: string, senha: string): Promise<string | null> {
    try {
      const { usuario } = await requisicaoApi<{ usuario: string }>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ usuario: identificador, senha }),
      })
      setSession({ user: { email: usuario } })
      setAdmin(true)
      return null
    } catch (erro) {
      return erro instanceof Error ? erro.message : 'Não foi possível entrar agora. Verifique sua conexão e tente de novo.'
    }
  }

  async function sair() {
    try {
      await requisicaoApi('/api/auth/logout', { method: 'POST' })
    } finally {
      setSession(null)
      setAdmin(false)
    }
  }

  return (
    <AuthContext.Provider value={{ carregando, session, admin, entrar, sair }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthEstado {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth precisa estar dentro de AuthProvider')
  return ctx
}
