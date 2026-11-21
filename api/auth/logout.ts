import type { VercelRequest, VercelResponse } from '@vercel/node'
import { apagarCookie } from '../../server/auth'

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).setHeader('Allow', 'POST').end()
  res.setHeader('Set-Cookie', apagarCookie())
  return res.status(200).json({ ok: true })
}
