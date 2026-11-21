import { Link } from 'react-router-dom'

export default function NaoEncontrada() {
  return (
    <div className="escuro flex min-h-screen flex-col items-center justify-center bg-noite px-5 text-center text-white">
      <h1 className="text-6xl font-semibold">Página não encontrada</h1>
      <p className="mt-4 text-lilas">O endereço que você abriu não existe neste site.</p>
      <Link to="/" className="botao-claro mt-8">
        Voltar ao início
      </Link>
    </div>
  )
}
