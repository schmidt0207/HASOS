export const TIPOS = ['sugestao', 'reclamacao', 'denuncia', 'solicitacao', 'elogio', 'outro'] as const
export type TipoManifestacao = (typeof TIPOS)[number]

export const ROTULO_TIPO: Record<TipoManifestacao, string> = {
  sugestao: 'Sugestão',
  reclamacao: 'Reclamação',
  denuncia: 'Denúncia',
  solicitacao: 'Solicitação',
  elogio: 'Elogio',
  outro: 'Outro',
}

export const STATUS = ['nova', 'visualizada', 'em_analise', 'encaminhada', 'resolvida'] as const
export type Status = (typeof STATUS)[number]

export const ROTULO_STATUS: Record<Status, string> = {
  nova: 'Nova',
  visualizada: 'Visualizada',
  em_analise: 'Em análise',
  encaminhada: 'Encaminhada',
  resolvida: 'Resolvida',
}

export interface Mensagem {
  id: string
  tipo: TipoManifestacao
  conteudo: string
  anonima: boolean
  nome: string | null
  turma: string | null
  status: Status
  criado_em: string
  visualizada_em: string | null
}

export function formatarData(iso: string): string {
  return new Date(iso).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
