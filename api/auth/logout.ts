import type { VercelRequest, VercelResponse } from '@vercel/node'
import { apagarCookie } from '../../server/auth'

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store, private')
  if (req.method !== 'POST') return res.status(405).setHeader('Allow', 'POST').end()
  res.setHeader('Set-Cookie', apagarCookie())
  return res.status(200).json({ ok: true })
}
