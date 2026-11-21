import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Lock, Menu, X } from 'lucide-react'
import StarMark from './StarMark'

const links = [
  { para: '/', rotulo: 'Início', fim: true },
  { para: '/propostas', rotulo: 'Propostas', fim: false },
  { para: '/equipe', rotulo: 'Equipe', fim: false },
  { para: '/escuta-sd', rotulo: 'Escuta SD', fim: false },
]

export default function Navbar() {
  const [aberto, setAberto] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setAberto(false)
  }, [pathname])

  const classeLink = ({ isActive }: { isActive: boolean }) =>
    `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
      isActive ? 'bg-white/10 text-white' : 'text-lilas hover:text-white'
    }`

  return (
    <header className="escuro sticky top-0 z-50 border-b border-white/10 bg-noite/95 backdrop-blur">
      <div className="secao flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 text-white" aria-label="HASOS — página inicial">
          <StarMark className="h-7 w-7 text-lilas" />
          <span className="font-display text-2xl font-semibold tracking-[0.28em]">HASOS</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
          {links.map((l) => (
            <NavLink key={l.para} to={l.para} end={l.fim} className={classeLink}>
              {l.rotulo}
            </NavLink>
          ))}
          <Link
            to="/area-do-gremio"
            className="ml-3 inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs text-lilas/70 transition-colors hover:text-white"
          >
            <Lock className="h-3.5 w-3.5" aria-hidden="true" />
            Área do Grêmio
          </Link>
        </nav>

        <button
          type="button"
          className="rounded-full p-2 text-white md:hidden"
          aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={aberto}
          aria-controls="menu-mobile"
          onClick={() => setAberto((v) => !v)}
        >
          {aberto ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {aberto && (
        <nav id="menu-mobile" className="border-t border-white/10 bg-noite md:hidden" aria-label="Principal">
          <div className="secao flex flex-col gap-1 py-4">
            {links.map((l) => (
              <NavLink
                key={l.para}
                to={l.para}
                end={l.fim}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-base font-medium ${
                    isActive ? 'bg-white/10 text-white' : 'text-lilas'
                  }`
                }
              >
                {l.rotulo}
              </NavLink>
            ))}
            <Link
              to="/area-do-gremio"
              className="mt-2 inline-flex items-center gap-2 px-4 py-3 text-sm text-lilas/70"
            >
              <Lock className="h-4 w-4" aria-hidden="true" />
              Área do Grêmio
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
