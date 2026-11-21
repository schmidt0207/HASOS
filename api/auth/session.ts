import type { VercelRequest, VercelResponse } from '@vercel/node'
import { credenciaisConfiguradas, usuarioDaSessao } from '../_lib/auth'

export default function handler(_req: VercelRequest, res: VercelResponse) {
  if (!credenciaisConfiguradas()) return res.status(503).json({ erro: 'O login ainda não foi configurado na Vercel.' })
  const usuario = usuarioDaSessao(_req)
  if (!usuario) return res.status(401).json({ erro: 'Sem sessão ativa.' })
  return res.status(200).json({ usuario })
}
