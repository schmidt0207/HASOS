import { ROTULO_STATUS, type Status } from '../../lib/types'

const cores: Record<Status, string> = {
  nova: 'bg-profundo text-white',
  visualizada: 'bg-lilas-claro text-profundo',
  em_analise: 'bg-amber-100 text-amber-900',
  encaminhada: 'bg-sky-100 text-sky-900',
  resolvida: 'bg-emerald-100 text-emerald-900',
}

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${cores[status]}`}>
      {ROTULO_STATUS[status]}
    </span>
  )
}
