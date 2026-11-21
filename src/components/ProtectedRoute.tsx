import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { LoaderCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { carregando, session, admin } = useAuth()

  if (carregando || (session && admin === null)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-nevoa text-profundo" role="status">
        <LoaderCircle className="h-8 w-8 animate-spin" aria-hidden="true" />
        <span className="sr-only">Verificando acesso</span>
      </div>
    )
  }

  if (!session || !admin) {
    return <Navigate to="/area-do-gremio" replace />
  }

  return <>{children}</>
}
