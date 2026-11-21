import type { VercelRequest, VercelResponse } from '@vercel/node'
import { banco } from '../server/db.js'
import { exigirAdmin } from '../server/auth.js'

const TIPOS = ['sugestao', 'reclamacao', 'denuncia', 'solicitacao', 'elogio', 'outro'] as const
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const STATUS = ['nova', 'visualizada', 'em_analise', 'encaminhada', 'resolvida'] as const

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store, private')
  if (!['POST', 'GET', 'PATCH', 'DELETE'].includes(req.method ?? '')) {
    return res.status(405).setHeader('Allow', 'GET, POST, PATCH, DELETE').end()
  }
  if (req.method !== 'POST' && !exigirAdmin(req, res)) return

  try {
    const sql = banco()
    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
      const tipo = body?.tipo
      const conteudo = typeof body?.conteudo === 'string' ? body.conteudo.trim() : ''
      const anonima = body?.anonima
      const nome = typeof body?.nome === 'string' ? body.nome.trim() : null
      const turma = typeof body?.turma === 'string' ? body.turma.trim() : null
      if (!TIPOS.includes(tipo) || conteudo.length < 10 || conteudo.length > 3000 ||
          typeof anonima !== 'boolean' ||
          (anonima && (nome !== null || turma !== null)) ||
          (!anonima && (!nome || nome.length < 2 || nome.length > 120 || !turma || turma.length < 1 || turma.length > 40))) {
        return res.status(400).json({ erro: 'Confira os campos da manifestação e tente novamente.' })
      }
      const rows = await sql`insert into mensagens (tipo, conteudo, anonima, nome, turma)
        values (${tipo}, ${conteudo}, ${anonima}, ${anonima ? null : nome}, ${anonima ? null : turma})
        returning id`
      return res.status(201).json({ id: rows[0].id })
    }
    if (req.method === 'GET') {
      const rows = await sql`select id, tipo, conteudo, anonima, nome, turma, status, criado_em, visualizada_em
        from mensagens order by criado_em desc limit 2000`
      return res.status(200).json({ mensagens: rows })
    }

    const id = req.query.id
    if (typeof id !== 'string' || !UUID.test(id)) {
      return res.status(400).json({ erro: 'Identificador inválido.' })
    }
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
    return res.status(405).setHeader('Allow', 'GET, POST, PATCH, DELETE').end()
  } catch {
    return res.status(500).json({ erro: 'Não foi possível concluir a operação. Confira a configuração do banco.' })
  }
}
