import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LoaderCircle } from 'lucide-react'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Propostas from './pages/Propostas'
import Equipe from './pages/Equipe'
import EscutaSD from './pages/EscutaSD'
import Login from './pages/Login'
import NaoEncontrada from './pages/NaoEncontrada'

const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'))
const Dashboard = lazy(() => import('./pages/admin/Dashboard'))
const Caixa = lazy(() => import('./pages/admin/Caixa'))

function Carregando() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-nevoa text-profundo" role="status">
      <LoaderCircle className="h-8 w-8 animate-spin" aria-hidden="true" />
      <span className="sr-only">Carregando</span>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<Carregando />}>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="propostas" element={<Propostas />} />
              <Route path="equipe" element={<Equipe />} />
              <Route path="escuta-sd" element={<EscutaSD />} />
              <Route path="area-do-gremio" element={<Login />} />
            </Route>
            <Route
              path="admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="mensagens" element={<Caixa />} />
            </Route>
            <Route path="*" element={<NaoEncontrada />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  )
}
