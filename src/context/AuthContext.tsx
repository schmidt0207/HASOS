import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

interface AuthEstado {
  carregando: boolean
  session: Session | null
  admin: boolean | null
  entrar: (identificador: string, senha: string) => Promise<string | null>
  sair: () => Promise<void>
}

const AuthContext = createContext<AuthEstado | null>(null)

const DOMINIO_LOGIN = import.meta.env.VITE_LOGIN_DOMINIO || 'hasos.example.com'

function paraEmail(identificador: string): string {
  const valor = identificador.trim().toLowerCase()
  return valor.includes('@') ? valor : `${valor}@${DOMINIO_LOGIN}`
}

async function verificarAdmin(userId: string): Promise<boolean> {
  if (!supabase) return false
  const { data, error } = await supabase
    .from('admins')
    .select('user_id')
    .eq('user_id', userId)
    .maybeSingle()
  return !error && Boolean(data)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [carregando, setCarregando] = useState(true)
  const [session, setSession] = useState<Session | null>(null)
  const [admin, setAdmin] = useState<boolean | null>(null)

  useEffect(() => {
    if (!supabase) {
      setCarregando(false)
      return
    }
    const cliente = supabase
    let ativo = true

    cliente.auth.getSession().then(async ({ data }) => {
      if (!ativo) return
      const atual = data.session
      setSession(atual)
      if (atual) {
        const ok = await verificarAdmin(atual.user.id)
        if (ativo) setAdmin(ok)
      } else {
        setAdmin(false)
      }
      if (ativo) setCarregando(false)
    })

    const { data: assinatura } = cliente.auth.onAuthStateChange((_evento, nova) => {
      setSession(nova)
      if (!nova) {
        setAdmin(false)
        return
      }
      setAdmin(null)
      setTimeout(() => {
        verificarAdmin(nova.user.id).then((ok) => {
          if (ativo) setAdmin(ok)
        })
      }, 0)
    })

    return () => {
      ativo = false
      assinatura.subscription.unsubscribe()
    }
  }, [])

  async function entrar(identificador: string, senha: string): Promise<string | null> {
    if (!supabase) return 'O sistema ainda não foi configurado. Verifique as variáveis do Supabase.'
    const { data, error } = await supabase.auth.signInWithPassword({
      email: paraEmail(identificador),
      password: senha,
    })
    if (error || !data.user) {
      if (error && error.status === 400) return 'Usuário ou senha incorretos.'
      return 'Não foi possível entrar agora. Verifique sua conexão e tente de novo.'
    }
    const ok = await verificarAdmin(data.user.id)
    if (!ok) {
      await supabase.auth.signOut()
      return 'Este usuário não tem permissão para acessar a Área do Grêmio.'
    }
    setSession(data.session)
    setAdmin(true)
    return null
  }

  async function sair() {
    if (supabase) await supabase.auth.signOut()
    setSession(null)
    setAdmin(false)
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
