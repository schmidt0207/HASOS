import { Link } from 'react-router-dom'
import { Handshake, Megaphone, MessageSquareText, Target, Users } from 'lucide-react'
import StarMark from '../components/StarMark'

const pilares = [
  { titulo: 'Representação', texto: 'Dar voz aos estudantes e manter diálogo com as turmas.', icone: Users },
  { titulo: 'Reivindicação', texto: 'Identificar problemas, encaminhar pedidos e acompanhar respostas.', icone: Megaphone },
  { titulo: 'Realização', texto: 'Transformar ideias em projetos, eventos e oportunidades.', icone: Target },
  { titulo: 'Integração', texto: 'Aproximar estudantes e fortalecer a comunidade escolar.', icone: Handshake },
]

const projetos = [
  {
    titulo: 'Mostra Estudantil: Feira de Artes + Ciências',
    texto: 'Trabalhos autorais e produções dos estudantes nas áreas artística, científica e intelectual.',
    quem: 'Diretoria de Projetos',
  },
  {
    titulo: 'Interclasses',
    texto: 'Duas edições, uma em cada semestre, com modalidades definidas junto com os estudantes.',
    quem: 'Diretoria de Esportes',
  },
  {
    titulo: 'Jornal Escolar — Vozes do Santos Dumont',
    texto: 'Um jornal mensal feito pelas turmas, junto com as aulas de Língua Portuguesa.',
    quem: 'Diretoria de Comunicação',
  },
  {
    titulo: 'Rádio Escolar — Frequência Estudantil',
    texto: 'Música, notícias, avisos e entrevistas feitos por estudantes.',
    quem: 'Diretoria de Comunicação',
  },
  {
    titulo: 'Semana da Consciência Negra',
    texto: 'Cultura, vozes e representatividade, com educação antirracista ao longo do ano.',
    quem: 'Diretoria de Cultura',
  },
  {
    titulo: 'Escuta SD — Ouvidoria Estudantil',
    texto: 'Canal para sugestões, denúncias e solicitações, com opção de envio anônimo.',
    quem: 'Todo o Grêmio',
  },
]

const valores = [
  ['Representatividade', 'ouvir diferentes turmas e realidades.'],
  ['Democracia', 'promover participação e decisões coletivas.'],
  ['Transparência', 'comunicar decisões e prestar contas.'],
  ['Inclusão', 'buscar atividades acessíveis e respeitosas.'],
  ['Responsabilidade', 'planejar com seriedade e cumprir compromissos.'],
  ['Cooperação', 'trabalhar em conjunto com estudantes e comunidade escolar.'],
]

export default function Home() {
  return (
    <>
      <section className="escuro relative overflow-hidden bg-noite text-white">
        <div className="secao grid items-center gap-8 py-14 lg:grid-cols-[1.25fr_1fr] lg:py-0">
          <div className="lg:py-28">
            <h1
              className="animate-subir text-5xl font-semibold leading-[1.05] sm:text-7xl"
              style={{ animationDelay: '0.15s' }}
            >
              HASOS — Chapa Estudantil
            </h1>
            <p
              className="animate-subir mt-5 font-display text-3xl italic text-lilas sm:text-4xl"
              style={{ animationDelay: '0.35s' }}
            >
              A humildade vence o orgulho
            </p>
            <p
              className="animate-subir mt-7 max-w-xl text-base leading-relaxed text-lilas-claro/90 sm:text-lg"
              style={{ animationDelay: '0.55s' }}
            >
              Somos o Grêmio Estudantil da Escola de Educação Básica Santos Dumont, em Blumenau, no mandato de 2027.
              Nosso Plano de Gestão organiza o trabalho em quatro frentes: representar os estudantes, encaminhar
              reivindicações, realizar projetos e integrar a comunidade escolar.
            </p>
            <div
              className="animate-subir mt-9 flex flex-col gap-3 sm:flex-row"
              style={{ animationDelay: '0.75s' }}
            >
              <Link to="/propostas" className="botao-claro">
                Conheça nossas propostas
              </Link>
              <Link to="/escuta-sd" className="botao-contorno-claro">
                Envie sua mensagem
              </Link>
            </div>
          </div>

          <div className="relative flex justify-center lg:h-full lg:min-h-[640px]">
            <div
              className="animate-agulha absolute bottom-0 top-0 left-1/2 hidden w-px origin-top bg-gradient-to-b from-transparent via-lilas/50 to-transparent lg:block"
              aria-hidden="true"
            />
            <img
              src="/logo-branca.png"
              alt="Logotipo HASOS"
              width={488}
              height={741}
              className="animate-brilho relative h-72 w-auto self-center sm:h-96 lg:h-[26rem]"
            />
          </div>
        </div>
      </section>

      <section id="pilares" className="bg-white py-20">
        <div className="secao">
          <h2 className="max-w-2xl text-4xl font-semibold text-profundo sm:text-5xl">Quatro pilares para a gestão de 2027</h2>
          <div className="mt-12 grid gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0">
            {pilares.map((p) => (
              <div key={p.titulo} className="border-lilas px-0 sm:px-6 lg:border-l lg:first:border-l-0 lg:first:pl-0">
                <p.icone className="h-7 w-7 text-roxo" aria-hidden="true" />
                <h3 className="mt-4 text-2xl font-semibold text-profundo">{p.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-tinta/80">{p.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projetos" className="bg-nevoa py-20">
        <div className="secao">
          <h2 className="max-w-2xl text-4xl font-semibold text-profundo sm:text-5xl">Principais projetos de 2027</h2>
          <div className="mt-12 grid gap-8 lg:grid-cols-5">
            <article className="escuro relative overflow-hidden rounded-3xl bg-profundo p-8 text-white shadow-elevada lg:col-span-2">
              <StarMark className="pointer-events-none absolute -bottom-12 -right-12 h-64 w-64 text-white/[0.07]" />
              <h3 className="relative text-4xl font-semibold">Festival Respawn</h3>
              <p className="relative mt-4 text-base leading-relaxed text-lilas-claro">
                Festival cultural dedicado à cultura geek, pop e nerd, com concurso de cosplay, torneios de jogos,
                troca de livros e mangás, apresentações de dança e convidados.
              </p>
              <p className="relative mt-6 text-sm text-lilas">Diretoria de Cultura</p>
              <Link to="/propostas#cultura" className="relative mt-8 inline-flex botao-claro">
                Ver detalhes
              </Link>
            </article>

            <ul className="divide-y divide-lilas lg:col-span-3">
              {projetos.map((p) => (
                <li key={p.titulo} className="py-5 first:pt-0 last:pb-0">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <h3 className="text-2xl font-semibold text-profundo">{p.titulo}</h3>
                    <span className="shrink-0 text-xs text-roxo">{p.quem}</span>
                  </div>
                  <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-tinta/80">{p.texto}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-12">
            <Link to="/propostas" className="botao-roxo">
              Ver todas as propostas
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="secao grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-4xl font-semibold text-profundo sm:text-5xl">O que significa HASOS?</h2>
            <p className="mt-6 max-w-xl leading-relaxed text-tinta/85">
              HASOS vem da inscrição “H-AS OS”, encontrada na espada de Davi na pintura{' '}
              <em>Davi com a Cabeça de Golias</em> (c. 1609–1610), de Caravaggio. A expressão é interpretada como uma
              abreviação em latim de “a humildade mata o orgulho”.
            </p>
            <p className="mt-4 max-w-xl leading-relaxed text-tinta/85">
              A obra representa a vitória sobre o próprio orgulho e sobre os aspectos destrutivos do ser humano. A
              humildade aparece como uma força capaz de superar a arrogância e os conflitos internos.
            </p>
            <p className="mt-4 max-w-xl leading-relaxed text-tinta/85">
              O símbolo de estrela da nossa identidade representa direção, propósito e movimento coletivo.
            </p>
          </div>

          <div className="rounded-3xl bg-lilas-claro p-8 sm:p-10">
            <h3 className="text-3xl font-semibold text-profundo">Missão</h3>
            <p className="mt-2 text-sm leading-relaxed text-tinta/85">
              Representar os estudantes, defender seus interesses e criar oportunidades de participação,
              aprendizagem, cultura, esporte e convivência.
            </p>
            <h3 className="mt-7 text-3xl font-semibold text-profundo">Visão</h3>
            <p className="mt-2 text-sm leading-relaxed text-tinta/85">
              Contribuir para que o Grêmio Estudantil seja atuante, acessível e reconhecido pela capacidade de ouvir,
              dialogar, propor soluções e transformar ideias em ações.
            </p>
            <h3 className="mt-7 text-3xl font-semibold text-profundo">Valores</h3>
            <dl className="mt-3 space-y-2 text-sm">
              {valores.map(([nome, desc]) => (
                <div key={nome} className="flex flex-col sm:flex-row sm:gap-2">
                  <dt className="font-semibold text-profundo sm:w-44 sm:shrink-0">{nome}</dt>
                  <dd className="text-tinta/85">{desc}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="escuro bg-profundo py-16 text-white">
        <div className="secao flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-xl">
            <MessageSquareText className="h-8 w-8 text-lilas" aria-hidden="true" />
            <h2 className="mt-4 text-4xl font-semibold">Escuta SD — sua voz importa</h2>
            <p className="mt-3 leading-relaxed text-lilas-claro/90">
              Mande sugestões, elogios, solicitações ou denúncias direto para o Grêmio. Você escolhe se quer se
              identificar ou enviar de forma anônima.
            </p>
          </div>
          <Link to="/escuta-sd" className="botao-claro shrink-0">
            Envie sua mensagem
          </Link>
        </div>
      </section>
    </>
  )
}
