import { useState, type FormEvent } from 'react'
import { CircleAlert, CircleCheck, LoaderCircle, Lock, Send, ShieldCheck, UserRound, UserX } from 'lucide-react'
import CabecalhoPagina from '../components/CabecalhoPagina'
import { requisicaoApi } from '../lib/api'
import { ROTULO_TIPO, TIPOS, type TipoManifestacao } from '../lib/types'

const LIMITE = 3000

export default function EscutaSD() {
  const [tipo, setTipo] = useState<TipoManifestacao | ''>('')
  const [conteudo, setConteudo] = useState('')
  const [anonima, setAnonima] = useState(true)
  const [nome, setNome] = useState('')
  const [turma, setTurma] = useState('')
  const [armadilha, setArmadilha] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState<string | null>(null)
  const [enviado, setEnviado] = useState(false)

  function limpar() {
    setTipo('')
    setConteudo('')
    setAnonima(true)
    setNome('')
    setTurma('')
    setArmadilha('')
  }

  function escolherIdentificacao(anonimo: boolean) {
    setAnonima(anonimo)
    if (anonimo) {
      setNome('')
      setTurma('')
    }
  }

  async function enviar(e: FormEvent) {
    e.preventDefault()
    setErro(null)

    if (!tipo) return setErro('Escolha o tipo de manifestação.')
    const texto = conteudo.trim()
    if (texto.length < 10) return setErro('Escreva sua mensagem com pelo menos 10 caracteres.')
    if (texto.length > LIMITE) return setErro(`A mensagem pode ter no máximo ${LIMITE} caracteres.`)
    if (!anonima) {
      if (nome.trim().length < 2) return setErro('Informe seu nome ou escolha enviar de forma anônima.')
      if (turma.trim().length < 1) return setErro('Informe sua turma ou escolha enviar de forma anônima.')
    }

    if (armadilha) {
      limpar()
      setEnviado(true)
      return
    }

    setEnviando(true)
    try {
      await requisicaoApi('/api/messages', {
        method: 'POST',
        body: JSON.stringify({
          tipo,
          conteudo: texto,
          anonima,
          nome: anonima ? null : nome.trim(),
          turma: anonima ? null : turma.trim(),
        }),
      })
    } catch {
      setEnviando(false)
      return setErro('Não foi possível enviar agora. Confira sua conexão e tente de novo em instantes.')
    }
    setEnviando(false)

    limpar()
    setEnviado(true)
  }

  return (
    <>
      <CabecalhoPagina
        titulo="Escuta SD — Sua voz importa"
        texto="Envie sugestões, elogios, solicitações, reclamações ou denúncias direto para o Grêmio. Você escolhe se quer se identificar ou ficar anônimo."
      />

      <section className="bg-nevoa py-14">
        <div className="secao grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div className="cartao p-6 sm:p-8">
            {enviado ? (
              <div className="py-6 text-center" role="status">
                <CircleCheck className="mx-auto h-14 w-14 text-roxo" aria-hidden="true" />
                <h2 className="mt-4 text-4xl font-semibold text-profundo">Mensagem enviada</h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-tinta/80">
                  O Grêmio recebeu sua manifestação. Só quem faz parte da equipe autorizada pode lê-la.
                </p>
                <button type="button" className="botao-roxo mt-8" onClick={() => setEnviado(false)}>
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={enviar} noValidate className="space-y-7">
<fieldset>
                  <legend className="rotulo">Tipo de manifestação</legend>
                  <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {TIPOS.map((t) => (
                      <label key={t} className="cursor-pointer">
                        <input
                          type="radio"
                          name="tipo"
                          value={t}
                          checked={tipo === t}
                          onChange={() => setTipo(t)}
                          className="peer sr-only"
                        />
                        <span className="block rounded-xl border border-lilas px-4 py-3 text-center text-sm font-medium text-profundo transition-colors peer-checked:border-profundo peer-checked:bg-profundo peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-roxo hover:bg-lilas-claro peer-checked:hover:bg-profundo">
                          {ROTULO_TIPO[t]}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div>
                  <label htmlFor="mensagem" className="rotulo">
                    Sua mensagem
                  </label>
                  <textarea
                    id="mensagem"
                    rows={7}
                    maxLength={LIMITE}
                    value={conteudo}
                    onChange={(e) => setConteudo(e.target.value)}
                    placeholder="Conte o que aconteceu ou o que você gostaria de propor."
                    className="campo resize-y"
                  />
                  <p className="mt-1 text-right text-xs text-tinta/60">
                    {conteudo.length} / {LIMITE}
                  </p>
                </div>

                <fieldset>
                  <legend className="rotulo">Como você quer enviar?</legend>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        name="identificacao"
                        checked={anonima}
                        onChange={() => escolherIdentificacao(true)}
                        className="peer sr-only"
                      />
                      <span className="flex items-center gap-3 rounded-xl border border-lilas p-4 transition-colors peer-checked:border-profundo peer-checked:bg-lilas-claro peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-roxo">
                        <UserX className="h-5 w-5 shrink-0 text-profundo" aria-hidden="true" />
                        <span className="text-sm font-semibold text-profundo">Anônima</span>
                      </span>
                    </label>
                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        name="identificacao"
                        checked={!anonima}
                        onChange={() => escolherIdentificacao(false)}
                        className="peer sr-only"
                      />
                      <span className="flex items-center gap-3 rounded-xl border border-lilas p-4 transition-colors peer-checked:border-profundo peer-checked:bg-lilas-claro peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-roxo">
                        <UserRound className="h-5 w-5 shrink-0 text-profundo" aria-hidden="true" />
                        <span className="text-sm font-semibold text-profundo">Identificada</span>
                      </span>
                    </label>
                  </div>
                </fieldset>

                {anonima ? (
                  <p className="flex gap-3 rounded-xl bg-lilas-claro p-4 text-sm leading-relaxed text-profundo" role="status">
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                    Sua mensagem será recebida sem identificação. Não pedimos nome nem turma e não guardamos dados
                    que identifiquem você.
                  </p>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="nome" className="rotulo">
                        Nome
                      </label>
                      <input
                        id="nome"
                        type="text"
                        autoComplete="name"
                        maxLength={120}
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className="campo"
                      />
                    </div>
                    <div>
                      <label htmlFor="turma" className="rotulo">
                        Turma
                      </label>
                      <input
                        id="turma"
                        type="text"
                        maxLength={40}
                        value={turma}
                        onChange={(e) => setTurma(e.target.value)}
                        placeholder="Ex.: 2º ano B"
                        className="campo"
                      />
                    </div>
                  </div>
                )}

                <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                  <label htmlFor="site">Não preencha este campo</label>
                  <input
                    id="site"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={armadilha}
                    onChange={(e) => setArmadilha(e.target.value)}
                  />
                </div>

                {erro && (
                  <p className="flex gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-800" role="alert">
                    <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    {erro}
                  </p>
                )}

                <button type="submit" disabled={enviando} className="botao-roxo w-full sm:w-auto">
                  {enviando ? (
                    <>
                      <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
                      Enviando
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" aria-hidden="true" />
                      Enviar mensagem
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          <aside className="space-y-6">
            <div className="cartao p-6">
              <h2 className="flex items-center gap-2 text-3xl font-semibold text-profundo">
                <Lock className="h-5 w-5" aria-hidden="true" />
                Privacidade
              </h2>
              <ul className="mt-3 space-y-3 text-sm leading-relaxed text-tinta/85">
                <li>As mensagens não aparecem publicamente. Só os integrantes autorizados do Grêmio têm acesso, por meio de login.</li>
                <li>Usamos o conteúdo apenas para ler, analisar e encaminhar sua manifestação aos responsáveis pela gestão escolar.</li>
                <li>No envio anônimo não guardamos nome nem turma. No envio identificado guardamos o nome e a turma que você informar.</li>
                <li>Mesmo no envio anônimo, o que você escrever na mensagem pode revelar quem é você. Evite incluir dados pessoais se quiser ficar anônimo.</li>
                <li>As informações podem ser compartilhadas com a direção quando necessário para resolver a situação.</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-profundo p-6 text-white">
              <h2 className="text-3xl font-semibold">Precisa de ajuda agora?</h2>
              <p className="mt-2 text-sm leading-relaxed text-lilas-claro">
                A Escuta SD não é um serviço de emergência e as mensagens não são lidas na hora. Se você ou alguém
                está em perigo ou sofrendo, procure um adulto de confiança ou ligue:
              </p>
              <ul className="mt-3 space-y-1.5 text-sm">
                <li>
                  <strong>190</strong> — Polícia Militar
                </li>
                <li>
                  <strong>192</strong> — SAMU
                </li>
                <li>
                  <strong>188</strong> — Centro de Valorização da Vida (CVV), apoio emocional
                </li>
                <li>
                  <strong>100</strong> — Disque Direitos Humanos, violações contra crianças e adolescentes
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
