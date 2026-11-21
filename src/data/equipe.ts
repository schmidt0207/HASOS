export interface Integrante {
  nome: string
  cargo: string
  descricao: string
  projetos: string[]
  foto?: string
}

export const equipe: Integrante[] = [
  {
    nome: 'Arthur Alves',
    cargo: 'Presidente',
    descricao: 'Coordena a gestão, representa o Grêmio, conduz as reuniões e acompanha o cumprimento do plano.',
    projetos: [],
  },
  {
    nome: 'Emili Baron',
    cargo: 'Vice-presidente',
    descricao: 'Apoia a Presidência e a substitui quando necessário, conforme o Estatuto.',
    projetos: [],
  },
  {
    nome: 'Ellen Rodrigues',
    cargo: 'Secretária-Geral',
    descricao: 'Registra atas e organiza documentos, correspondências, pautas e relatórios.',
    projetos: [],
  },
  {
    nome: 'Sophia Gouveia',
    cargo: 'Segunda Secretária',
    descricao: 'Apoia a Secretaria e mantém os registros do Grêmio organizados.',
    projetos: [],
  },
  {
    nome: 'Guilherme Schmidt',
    cargo: 'Tesoureiro',
    descricao: 'Controla receitas e despesas, guarda comprovantes e apresenta as prestações de contas.',
    projetos: ['Campanhas de arrecadação e rifas'],
  },
  {
    nome: 'Khadyne Coelho',
    cargo: 'Diretora de Cultura',
    descricao: 'Planeja as ações culturais e artísticas do Grêmio.',
    projetos: ['Festival Respawn', 'Semana da Consciência Negra', 'Mostra Estudantil (em colaboração)'],
  },
  {
    nome: 'Pyetra Pedroso',
    cargo: 'Diretora de Esportes',
    descricao: 'Organiza as atividades esportivas e as duas edições do Interclasses.',
    projetos: ['Interclasses — 1ª edição', 'Interclasses — 2ª edição'],
  },
  {
    nome: 'Juliana Florencio',
    cargo: 'Diretora de Comunicação',
    descricao: 'Gerencia comunicados, divulgação, registros e transparência.',
    projetos: ['Jornal Escolar — Vozes do Santos Dumont', 'Rádio Escolar — Frequência Estudantil'],
  },
  {
    nome: 'Maria Alice',
    cargo: 'Diretora de Projetos',
    descricao: 'Coordena os projetos educacionais e a Mostra Estudantil.',
    projetos: ['Mostra Estudantil: Feira de Artes + Ciências', 'Semana da Consciência Negra (em parceria)'],
  },
]
