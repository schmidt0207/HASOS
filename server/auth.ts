import { createHmac, timingSafeEqual } from 'node:crypto'
import type { VercelRequest, VercelResponse } from '@vercel/node'

const COOKIE = 'hasos_admin'
const OITO_HORAS = 60 * 60 * 8

function secret(): string {
  const value = process.env.SESSION_SECRET
  if (!value || value.length < 32) throw new Error('SESSION_SECRET ausente ou muito curta')
  return value
}

function assinatura(payload: string): string {
  return createHmac('sha256', secret()).update(payload).digest('base64url')
}

function lerCookie(req: VercelRequest): string | null {
  const header = req.headers.cookie
  if (!header) return null
  const item = header.split(';').map((parte) => parte.trim()).find((parte) => parte.startsWith(COOKIE + '='))
  return item ? decodeURIComponent(item.slice(COOKIE.length + 1)) : null
}

export function criarCookie(usuario: string): string {
  const expiracao = Math.floor(Date.now() / 1000) + OITO_HORAS
  const payload = Buffer.from(JSON.stringify({ usuario, expiracao })).toString('base64url')
  const token = payload + '.' + assinatura(payload)
  const secure = process.env.VERCEL === '1' ? '; Secure' : ''
  return `${COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${OITO_HORAS}${secure}`
}

export function apagarCookie(): string {
  const secure = process.env.VERCEL === '1' ? '; Secure' : ''
  return `${COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${secure}`
}

export function usuarioDaSessao(req: VercelRequest): string | null {
  try {
    const token = lerCookie(req)
    if (!token) return null
    const [payload, recebido] = token.split('.')
    if (!payload || !recebido) return null
    const esperado = assinatura(payload)
    const a = Buffer.from(recebido)
    const b = Buffer.from(esperado)
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null
    const dados = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as {
      usuario?: unknown
      expiracao?: unknown
    }
    if (typeof dados.usuario !== 'string' || typeof dados.expiracao !== 'number' || dados.expiracao <= Date.now() / 1000) {
      return null
    }
    return dados.usuario
  } catch {
    return null
  }
}

export function exigirAdmin(req: VercelRequest, res: VercelResponse): string | null {
  if (!credenciaisConfiguradas()) {
    res.status(503).json({ erro: 'O login ainda não foi configurado na Vercel.' })
    return null
  }
  const usuario = usuarioDaSessao(req)
  if (!usuario) res.status(401).json({ erro: 'A sessão terminou. Entre novamente.' })
  return usuario
}

export function credenciaisConfiguradas(): boolean {
  return Boolean(process.env.GREMIO_LOGIN && process.env.GREMIO_PASSWORD && (process.env.SESSION_SECRET?.length ?? 0) >= 32)
}
