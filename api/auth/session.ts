import type { VercelRequest, VercelResponse } from '@vercel/node'
import { credenciaisConfiguradas, usuarioDaSessao } from '../../server/auth.js'

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store, private')
  if (!credenciaisConfiguradas()) return res.status(503).json({ erro: 'O login ainda não foi configurado na Vercel.' })
  const usuario = usuarioDaSessao(_req)
  if (!usuario) return res.status(401).json({ erro: 'Sem sessão ativa.' })
  return res.status(200).json({ usuario })
}
