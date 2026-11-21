export interface UsuarioSessao {
  email: string
}

export async function requisicaoApi<T>(caminho: string, opcoes: RequestInit = {}): Promise<T> {
  const resposta = await fetch(caminho, {
    ...opcoes,
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json', ...opcoes.headers },
  })
  const corpo = await resposta.json().catch(() => ({}))
  if (!resposta.ok) {
    throw new Error(typeof corpo.erro === 'string' ? corpo.erro : 'Não foi possível conectar ao servidor.')
  }
  return corpo as T
}
