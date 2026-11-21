import type { VercelRequest, VercelResponse } from '@vercel/node'
import { banco } from '../server/db.js'
import { exigirAdmin } from '../server/auth.js'

const TIPOS = ['sugestao', 'reclamacao', 'denuncia', 'solicitacao', 'elogio', 'outro'] as const

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store, private')
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).setHeader('Allow', 'GET, POST').end()
  }
  if (req.method === 'GET' && !exigirAdmin(req, res)) return
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
    return res.status(405).setHeader('Allow', 'GET, POST').end()
  } catch {
    return res.status(500).json({ erro: 'Não foi possível concluir a operação. Confira a configuração do banco.' })
  }
}
