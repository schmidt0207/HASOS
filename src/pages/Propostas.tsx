import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, Info } from 'lucide-react'
import CabecalhoPagina from '../components/CabecalhoPagina'
import { campanhasMensais, categorias, type Categoria, type Proposta } from '../data/propostas'

function CartaoProposta({ item }: { item: Proposta }) {
  return (
    <article className="flex flex-col rounded-2xl bg-nevoa p-5">
      <h4 className="text-2xl font-semibold leading-snug text-profundo">{item.titulo}</h4>
      {item.responsavel && <p className="mt-1 text-xs text-roxo">{item.responsavel}</p>}
      <p className="mt-2 text-sm leading-relaxed text-tinta/85">{item.descricao}</p>

      {item.detalhes && (
        <details className="group mt-3">
          <summary className="inline-flex cursor-pointer list-none items-center gap-1 text-sm font-semibold text-roxo [&::-webkit-details-marker]:hidden">
            Ver o que está previsto
            <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" />
          </summary>
          <ul className="mt-3 space-y-2 border-l-2 border-lilas pl-4 text-sm leading-relaxed text-tinta/85">
            {item.detalhes.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </details>
      )}

      {item.aviso && (
        <p className="mt-3 flex gap-2 text-xs leading-relaxed text-tinta/70">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-roxo" aria-hidden="true" />
          <span>{item.aviso}</span>
        </p>
      )}

      {item.link && (
        <Link to={item.link.para} className="botao-roxo mt-4 self-start">
          {item.link.rotulo}
        </Link>
      )}
    </article>
  )
}

function Calendario() {
  return (
    <div className="mt-5 rounded-2xl border border-lilas-claro p-5">
      <h4 className="text-2xl font-semibold text-profundo">Calendário das campanhas mensais</h4>
      <ol className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
        {campanhasMensais.map((c) => (
          <li key={c.mes} className="flex gap-3 text-sm leading-relaxed">
            <span className="w-24 shrink-0 font-display text-xl font-semibold text-roxo">{c.mes}</span>
            <span className="text-tinta/85">{c.tema}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

function Bloco({ categoria, aberta, alternar }: { categoria: Categoria; aberta: boolean; alternar: () => void }) {
  const Icone = categoria.icone
  return (
    <section id={categoria.id} className="cartao overflow-hidden">
      <h3>
        <button
          type="button"
          onClick={alternar}
          aria-expanded={aberta}
          aria-controls={`painel-${categoria.id}`}
          className="flex w-full items-center gap-4 p-5 text-left sm:p-6"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-lilas-claro text-profundo">
            <Icone className="h-6 w-6" aria-hidden="true" />
          </span>
          <span className="flex-1">
            <span className="block font-display text-2xl font-semibold leading-snug text-profundo sm:text-3xl">
              {categoria.titulo}
            </span>
            <span className="mt-1 block text-sm font-normal leading-relaxed text-tinta/75">{categoria.resumo}</span>
          </span>
          <ChevronDown
            className={`h-6 w-6 shrink-0 text-roxo transition-transform duration-300 ${aberta ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>
      </h3>
      <div
        id={`painel-${categoria.id}`}
        className={`grid transition-[grid-template-rows,visibility] duration-300 ${
          aberta ? 'visible grid-rows-[1fr]' : 'invisible grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-6 sm:px-6">
            <div className="grid gap-4 md:grid-cols-2">
              {categoria.itens.map((item) => (
                <CartaoProposta key={item.titulo} item={item} />
              ))}
            </div>
            {categoria.calendario && <Calendario />}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Propostas() {
  const { hash } = useLocation()
  const [abertas, setAbertas] = useState<Set<string>>(new Set([categorias[0].id]))

  useEffect(() => {
    const id = hash.replace('#', '')
    if (id && categorias.some((c) => c.id === id)) {
      setAbertas((atual) => new Set(atual).add(id))
    }
  }, [hash])

  function alternar(id: string) {
    setAbertas((atual) => {
      const novo = new Set(atual)
      if (novo.has(id)) novo.delete(id)
      else novo.add(id)
      return novo
    })
  }

  function irPara(id: string) {
    setAbertas((atual) => new Set(atual).add(id))
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 60)
  }

  const todasAbertas = abertas.size === categorias.length

  return (
    <>
      <CabecalhoPagina
        titulo="Propostas para 2027"
        texto="O que a Chapa HASOS pretende fazer, organizado por tema. Toque em uma categoria para ver as propostas e o que está previsto em cada uma."
      >
        <nav className="mt-8 flex flex-wrap gap-2" aria-label="Categorias de propostas">
          {categorias.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => irPara(c.id)}
              className="rounded-full border border-lilas/40 px-4 py-2 text-sm text-lilas-claro transition-colors hover:bg-white/10 hover:text-white"
            >
              {c.titulo}
            </button>
          ))}
        </nav>
      </CabecalhoPagina>

      <section className="bg-white py-14">
        <div className="secao">
          <div className="mb-6 flex justify-end">
            <button
              type="button"
              className="botao-contorno"
              onClick={() => setAbertas(todasAbertas ? new Set() : new Set(categorias.map((c) => c.id)))}
            >
              {todasAbertas ? 'Recolher tudo' : 'Expandir tudo'}
            </button>
          </div>
          <div className="space-y-4">
            {categorias.map((c) => (
              <Bloco key={c.id} categoria={c} aberta={abertas.has(c.id)} alternar={() => alternar(c.id)} />
            ))}
          </div>
          <p className="mt-10 max-w-3xl text-sm leading-relaxed text-tinta/70">
            Este plano é orientador e pode ser ajustado ao calendário letivo, aos recursos disponíveis, às necessidades
            dos estudantes e às autorizações necessárias para cada atividade. Quando uma ação não puder ser realizada,
            o Grêmio explica os motivos e, sempre que possível, apresenta alternativas.
          </p>
        </div>
      </section>
    </>
  )
}
