import CabecalhoPagina from '../components/CabecalhoPagina'
import StarMark from '../components/StarMark'
import { equipe, type Integrante } from '../data/equipe'

function iniciais(nome: string): string {
  return nome
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join('')
}

function Cartao({ pessoa }: { pessoa: Integrante }) {
  return (
    <article className="cartao flex flex-col overflow-hidden">
      <div className="relative aspect-[4/3] bg-gradient-to-br from-lilas-claro to-lilas/70">
        {pessoa.foto ? (
          <img src={pessoa.foto} alt={`Foto de ${pessoa.nome}`} className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <>
            <StarMark className="absolute right-3 top-3 h-16 w-16 text-white/50" />
            <span className="absolute bottom-3 left-5 font-display text-6xl font-semibold text-profundo/70">
              {iniciais(pessoa.nome)}
            </span>
            <span className="absolute bottom-3 right-4 text-xs text-profundo/60">Foto em breve</span>
          </>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm font-semibold text-roxo">{pessoa.cargo}</p>
        <h2 className="mt-1 text-3xl font-semibold text-profundo">{pessoa.nome}</h2>
        <p className="mt-3 text-sm leading-relaxed text-tinta/80">{pessoa.descricao}</p>
        {pessoa.projetos.length > 0 && (
          <div className="mt-4 border-t border-lilas-claro pt-4">
            <p className="text-xs font-semibold text-profundo">Projetos sob responsabilidade</p>
            <ul className="mt-2 space-y-1 text-sm text-tinta/80">
              {pessoa.projetos.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  )
}

export default function Equipe() {
  return (
    <>
      <CabecalhoPagina
        titulo="Nossa equipe"
        texto="Nove estudantes assumem a Diretoria Executiva do Grêmio em 2027. Cada um cuida de uma frente do Plano de Gestão e responde pelos projetos da sua área."
      />
      <section className="bg-nevoa py-16">
        <div className="secao grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {equipe.map((pessoa) => (
            <Cartao key={pessoa.nome} pessoa={pessoa} />
          ))}
        </div>
      </section>
    </>
  )
}
