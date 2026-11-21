import type { ReactNode } from 'react'
import StarMark from './StarMark'

interface Props {
  titulo: string
  texto: string
  children?: ReactNode
}

export default function CabecalhoPagina({ titulo, texto, children }: Props) {
  return (
    <section className="escuro relative overflow-hidden bg-noite text-white">
      <StarMark className="pointer-events-none absolute -right-10 -top-10 h-72 w-72 text-white/[0.05] sm:h-96 sm:w-96" />
      <div className="secao relative py-14 sm:py-20">
        <h1 className="max-w-3xl text-4xl font-semibold leading-tight sm:text-6xl">{titulo}</h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-lilas sm:text-lg">{texto}</p>
        {children}
      </div>
    </section>
  )
}
