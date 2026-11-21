import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { CircleAlert, Eye, EyeOff, LoaderCircle, LogIn } from 'lucide-react'
import StarMark from '../components/StarMark'
import { useAuth } from '../context/AuthContext'
import { supabaseConfigurado } from '../lib/supabase'

export default function Login() {
  const { session, admin, carregando, entrar, sair } = useAuth()
  const navegar = useNavigate()
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [mostrar, setMostrar] = useState(false)
  const [erro, setErro] = useState<string | null>(null)
  const [enviando, setEnviando] = useState(false)

  useEffect(() => {
    if (admin) navegar('/admin', { replace: true })
  }, [admin, navegar])

  async function enviar(e: FormEvent) {
    e.preventDefault()
    setErro(null)
    if (!usuario.trim() || !senha) return setErro('Preencha o usuário e a senha.')
    setEnviando(true)
    const resultado = await entrar(usuario, senha)
    setEnviando(false)
    if (resultado) setErro(resultado)
  }

  const semPermissao = !carregando && session && admin === false

  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-nevoa px-5 py-16">
      <div className="cartao w-full max-w-md p-8">
        <div className="flex flex-col items-center text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-noite text-lilas">
            <StarMark className="h-8 w-8" />
          </span>
          <h1 className="mt-4 text-4xl font-semibold text-profundo">Área do Grêmio</h1>
          <p className="mt-1 text-sm text-tinta/70">Acesso exclusivo para integrantes autorizados.</p>
        </div>

        {!supabaseConfigurado && (
          <p className="mt-6 rounded-xl bg-lilas-claro p-4 text-sm text-profundo" role="alert">
            O Supabase ainda não foi configurado. Siga o README antes de usar o login.
          </p>
        )}

        {semPermissao && (
          <div className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-800" role="alert">
            Esta conta não tem permissão para acessar o painel.
            <button type="button" onClick={sair} className="mt-2 block font-semibold underline">
              Sair desta conta
            </button>
          </div>
        )}

        <form onSubmit={enviar} noValidate className="mt-6 space-y-5">
          <div>
            <label htmlFor="usuario" className="rotulo">
              Usuário
            </label>
            <input
              id="usuario"
              type="text"
              autoComplete="username"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="campo"
            />
          </div>
          <div>
            <label htmlFor="senha" className="rotulo">
              Senha
            </label>
            <div className="relative">
              <input
                id="senha"
                type={mostrar ? 'text' : 'password'}
                autoComplete="current-password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="campo pr-12"
              />
              <button
                type="button"
                onClick={() => setMostrar((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-profundo hover:bg-lilas-claro"
                aria-label={mostrar ? 'Ocultar senha' : 'Mostrar senha'}
                aria-pressed={mostrar}
              >
                {mostrar ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {erro && (
            <p className="flex gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-800" role="alert">
              <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              {erro}
            </p>
          )}

          <button type="submit" disabled={enviando || !supabaseConfigurado} className="botao-roxo w-full">
            {enviando ? (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
                Entrando
              </>
            ) : (
              <>
                <LogIn className="h-4 w-4" aria-hidden="true" />
                Entrar
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  )
}
