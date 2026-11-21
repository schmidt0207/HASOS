import { timingSafeEqual } from 'node:crypto'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { criarCookie, credenciaisConfiguradas } from '../../server/auth'

function igualSeguro(entrada: string, esperado: string): boolean {
  const a = Buffer.from(entrada)
  const b = Buffer.from(esperado)
  return a.length === b.length && timingSafeEqual(a, b)
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store, private')
  if (req.method !== 'POST') return res.status(405).setHeader('Allow', 'POST').end()
  if (!credenciaisConfiguradas()) {
    return res.status(503).json({ erro: 'O login ainda não foi configurado na Vercel.' })
  }
  let body: any
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
  } catch {
    return res.status(400).json({ erro: 'Confira os dados de login.' })
  }
  const usuario = typeof body?.usuario === 'string' ? body.usuario.trim() : ''
  const senha = typeof body?.senha === 'string' ? body.senha : ''
  const login = process.env.GREMIO_LOGIN!
  const senhaCorreta = process.env.GREMIO_PASSWORD!
  if (!igualSeguro(usuario.toLowerCase(), login.trim().toLowerCase()) || !igualSeguro(senha, senhaCorreta)) {
    return res.status(401).json({ erro: 'Usuário ou senha incorretos.' })
  }
  res.setHeader('Set-Cookie', criarCookie(login.trim()))
  return res.status(200).json({ usuario: login.trim() })
}
