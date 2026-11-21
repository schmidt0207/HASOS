import { Link } from 'react-router-dom'
import { Lock } from 'lucide-react'

const navegacao = [
  { para: '/', rotulo: 'Início' },
  { para: '/propostas', rotulo: 'Propostas' },
  { para: '/equipe', rotulo: 'Equipe' },
  { para: '/escuta-sd', rotulo: 'Escuta SD' },
]

export default function Footer() {
  return (
    <footer className="escuro bg-noite text-lilas">
      <div className="secao grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="flex items-start gap-6">
          <img src="/logo-branca.png" alt="Logotipo HASOS" className="h-32 w-auto" width={488} height={741} loading="lazy" />
          <div>
            <p className="font-display text-2xl italic text-white">A humildade vence o orgulho</p>
            <p className="mt-3 text-sm leading-relaxed">
              HASOS — Chapa Estudantil
              <br />
              Mandato 2027
            </p>
          </div>
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold text-white">Escola</h2>
          <p className="mt-3 text-sm leading-relaxed">
            Escola de Educação Básica Santos Dumont
            <br />
            Blumenau — Santa Catarina
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold text-white">Navegação</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {navegacao.map((l) => (
              <li key={l.para}>
                <Link to={l.para} className="transition-colors hover:text-white">
                  {l.rotulo}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/area-do-gremio"
                className="inline-flex items-center gap-1.5 text-lilas/70 transition-colors hover:text-white"
              >
                <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                Área do Grêmio
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="secao py-5 text-xs text-lilas/70">
          © 2027 Chapa HASOS — Grêmio Estudantil da Escola de Educação Básica Santos Dumont, Blumenau–SC.
        </p>
      </div>
    </footer>
  )
}
