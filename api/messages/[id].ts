import type { VercelRequest, VercelResponse } from '@vercel/node'
import { banco } from '../../server/db.js'
import { exigirAdmin } from '../../server/auth.js'

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const STATUS = ['nova', 'visualizada', 'em_analise', 'encaminhada', 'resolvida'] as const

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store, private')
  if (!exigirAdmin(req, res)) return
  const id = req.query.id
  if (typeof id !== 'string' || !UUID.test(id)) return res.status(400).json({ erro: 'Identificador inválido.' })
  try {
    const sql = banco()
    if (req.method === 'PATCH') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
      if (!STATUS.includes(body?.status)) return res.status(400).json({ erro: 'Status inválido.' })
      const rows = await sql`update mensagens
        set status = ${body.status},
            visualizada_em = case
              when ${body.status} = 'nova' then null
              when visualizada_em is null then now()
              else visualizada_em
            end
        where id = ${id}
        returning id, status, visualizada_em`
      if (!rows.length) return res.status(404).json({ erro: 'Mensagem não encontrada.' })
      return res.status(200).json({ mensagem: rows[0] })
    }
    if (req.method === 'DELETE') {
      const rows = await sql`delete from mensagens where id = ${id} returning id`
      if (!rows.length) return res.status(404).json({ erro: 'Mensagem não encontrada.' })
      return res.status(200).json({ ok: true })
    }
    return res.status(405).setHeader('Allow', 'PATCH, DELETE').end()
  } catch {
    return res.status(500).json({ erro: 'Não foi possível concluir a operação.' })
  }
}
