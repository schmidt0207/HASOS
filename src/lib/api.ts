export async function requisicaoApi<T>(caminho: string, opcoes: RequestInit = {}): Promise<T> {
  const headers = new Headers(opcoes.headers)
  if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json')
  const resposta = await fetch(caminho, {
    ...opcoes,
    credentials: 'same-origin',
    headers,
  })
  const corpo = await resposta.json().catch(() => ({}))
  if (!resposta.ok) {
    throw new Error(typeof corpo.erro === 'string' ? corpo.erro : 'Não foi possível conectar ao servidor.')
  }
  return corpo as T
}
