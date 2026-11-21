import {
  Drama,
  HeartHandshake,
  HeartPulse,
  Hammer,
  Lightbulb,
  MessageSquareText,
  Radio,
  Sparkles,
  Trophy,
  Users,
  type LucideIcon,
} from 'lucide-react'

export interface Proposta {
  titulo: string
  descricao: string
  detalhes?: string[]
  responsavel?: string
  aviso?: string
  link?: { para: string; rotulo: string }
}

export interface Categoria {
  id: string
  titulo: string
  resumo: string
  icone: LucideIcon
  itens: Proposta[]
  calendario?: boolean
}

export const campanhasMensais: { mes: string; tema: string }[] = [
  { mes: 'Fevereiro', tema: 'Volta às aulas, acolhimento e combate ao bullying' },
  { mes: 'Março', tema: 'Mulheres, igualdade de gênero e combate à violência' },
  { mes: 'Abril', tema: 'Conscientização sobre o autismo e inclusão' },
  { mes: 'Maio', tema: 'Combate ao abuso e à exploração sexual de crianças e adolescentes' },
  { mes: 'Junho', tema: 'Orgulho LGBTQIA+ e respeito à diversidade' },
  { mes: 'Julho', tema: 'Valorização da amizade, saúde mental e prevenção ao isolamento' },
  { mes: 'Agosto', tema: 'Combate à violência contra a mulher' },
  { mes: 'Setembro', tema: 'Prevenção ao suicídio e valorização da vida' },
  { mes: 'Outubro', tema: 'Saúde, bem-estar e direitos das crianças e adolescentes' },
  { mes: 'Novembro', tema: 'Consciência Negra, igualdade racial e valorização da cultura afro-brasileira' },
]

export const categorias: Categoria[] = [
  {
    id: 'representacao',
    titulo: 'Representação e participação estudantil',
    resumo: 'Uma relação contínua entre o Grêmio e as turmas, para que sugestões, críticas e reivindicações sejam ouvidas e encaminhadas.',
    icone: Users,
    itens: [
      {
        titulo: 'Dois representantes por turma',
        descricao: 'Os representantes ligam a turma ao Grêmio: ouvem demandas, compartilham informações, incentivam a participação e ajudam na aplicação de consultas.',
        aviso: 'A forma de escolha e de substituição respeita as orientações da escola.',
      },
      {
        titulo: 'Canal digital de sugestões e reivindicações',
        descricao: 'As demandas chegam pelo canal digital (Escuta SD), pelos representantes de turma e por uma caixa física de sugestões.',
        link: { para: '/escuta-sd', rotulo: 'Enviar uma mensagem' },
      },
      {
        titulo: 'Consultas e enquetes estudantis',
        descricao: 'Momentos de escuta para que as decisões do Grêmio considerem o que os estudantes pensam.',
      },
      {
        titulo: 'Acompanhamento das demandas',
        descricao: 'As demandas são organizadas por tema, urgência e possibilidade de encaminhamento. Os estudantes recebem retorno sobre providências, respostas e limites encontrados.',
      },
    ],
  },
  {
    id: 'cultura',
    titulo: 'Cultura e eventos',
    resumo: 'Ampliar o acesso à cultura e criar espaços para expressão artística, criatividade e convivência.',
    icone: Drama,
    itens: [
      {
        titulo: 'Festival Respawn',
        descricao: 'Festival cultural dedicado à cultura geek, pop e nerd, com atividades que valorizam criatividade, expressão artística, jogos e convivência.',
        detalhes: [
          'Concurso de cosplay, com regulamento e critérios divulgados previamente',
          'Espaço de vendas ou exposição para participantes e empreendedores, mediante autorização',
          'Área de troca de livros, mangás, histórias em quadrinhos e cartas colecionáveis',
          'Apresentações e atividades de dança, incluindo K-pop e Just Dance',
          'Torneios de jogos, como Mortal Kombat, Fifa e Street Fighter',
          'Convidados, artistas, cosplayers ou criadores de conteúdo, conforme disponibilidade',
        ],
        responsavel: 'Diretoria de Cultura · Khadyne Coelho',
        aviso: 'Formato, horários, público, segurança, acessibilidade e custos serão definidos com a escola. A participação de público externo depende de autorização.',
      },
      {
        titulo: 'Apresentações culturais',
        descricao: 'Palco para estudantes que queiram participar como artistas, expositores, apresentadores e organizadores.',
      },
      {
        titulo: 'Oficinas e mostras artísticas',
        descricao: 'Oficinas, mostras e atividades culturais articuladas com a Diretoria de Projetos e as demais diretorias.',
      },
    ],
  },
  {
    id: 'esportes',
    titulo: 'Esportes e lazer',
    resumo: 'Estimular a prática esportiva, a integração entre turmas e a participação em atividades recreativas.',
    icone: Trophy,
    itens: [
      {
        titulo: 'Interclasses — 1º semestre',
        descricao: 'Competição esportiva e recreativa entre turmas, com inscrições por turma, regulamento e tabela de jogos.',
        detalhes: [
          'Modalidades possíveis: futsal, voleibol, basquete, queimada, tênis de mesa e xadrez',
          'Reconhecimento de participação, respeito, cooperação e espírito esportivo',
        ],
        responsavel: 'Diretoria de Esportes · Pyetra Pedroso',
        aviso: 'As modalidades dependem de estrutura, materiais, horários e autorizações.',
      },
      {
        titulo: 'Interclasses — 2º semestre',
        descricao: 'Segunda edição do ano, com avaliação da experiência anterior, revisão de modalidades e regulamento e mais variedade de atividades, quando viável.',
        responsavel: 'Diretoria de Esportes · Pyetra Pedroso',
      },
      {
        titulo: 'Outras modalidades sugeridas pelos estudantes',
        descricao: 'Os estudantes são consultados para definir as modalidades conforme o interesse e a estrutura disponível.',
      },
    ],
  },
  {
    id: 'projetos',
    titulo: 'Projetos sociais e educacionais',
    resumo: 'Experiências de aprendizagem, pesquisa, criatividade e participação social para além das atividades habituais.',
    icone: Lightbulb,
    itens: [
      {
        titulo: 'Mostra Estudantil: Feira de Artes + Ciências',
        descricao: 'Mostra de trabalhos autorais e produções estudantis nas áreas artística, científica e intelectual.',
        detalhes: [
          'Artes visuais: desenhos, pinturas, ilustrações, fotografia e trabalhos manuais',
          'Audiovisual, literatura, poesia, escrita criativa e projetos autorais',
          'Experimentos, demonstrações, pesquisas, maquetes e protótipos científicos',
          'Apresentações e momentos de reconhecimento das produções participantes',
        ],
        responsavel: 'Diretoria de Projetos · Maria Alice, com a Diretoria de Cultura · Khadyne Coelho',
        aviso: 'A seleção e a avaliação seguem critérios transparentes e reconhecem o processo de criação e pesquisa.',
      },
      {
        titulo: 'Campanhas solidárias',
        descricao: 'Campanhas e ações de conscientização ligadas a objetivos e necessidades definidos previamente.',
      },
      {
        titulo: 'Palestras e oficinas',
        descricao: 'Busca de palestras, oficinas e atividades formativas, conforme disponibilidade e autorização da escola, além do incentivo a projetos interdisciplinares e produções autorais.',
      },
      {
        titulo: 'Campanhas de arrecadação e rifas',
        descricao: 'Ações para apoiar projetos, materiais e atividades do Grêmio, com registro de valores, despesas e comprovantes e divulgação da destinação dos recursos.',
        responsavel: 'Tesouraria · Guilherme Schmidt, com apoio da Presidência e das diretorias',
        aviso: 'Rifas e sorteios são submetidos à escola antes e só acontecem após a verificação das exigências legais.',
      },
    ],
  },
  {
    id: 'comunicacao',
    titulo: 'Comunicação e transparência',
    resumo: 'Manter os estudantes informados e facilitar o acesso às ações e decisões do Grêmio.',
    icone: Radio,
    itens: [
      {
        titulo: 'Jornal Escolar — Vozes do Santos Dumont',
        descricao: 'Jornal mensal construído pelos estudantes e integrado às aulas de Língua Portuguesa, para incentivar leitura, escrita, pesquisa e pensamento crítico.',
        detalhes: [
          'Cada turma produz uma matéria por mês, com orientação dos professores',
          'Pesquisa, entrevista, redação, revisão, fotografia e diagramação feitas por estudantes',
          'Edição mensal em formato digital e, quando possível, impressa',
        ],
        responsavel: 'Diretoria de Comunicação · Juliana Florencio',
      },
      {
        titulo: 'Rádio Escolar — Frequência Estudantil',
        descricao: 'Espaço de comunicação, entretenimento, informação e expressão estudantil, com oportunidades de apresentação, produção e edição de áudio.',
        detalhes: [
          'Músicas nos intervalos ou em horários definidos pela escola',
          'Notícias, avisos, comunicados e divulgação de eventos e resultados',
          'Entrevistas e quadros temáticos sobre cultura, música, esportes e educação',
        ],
        responsavel: 'Diretoria de Comunicação · Juliana Florencio',
        aviso: 'Programação, horários e equipamentos serão definidos com a escola, respeitando direitos autorais.',
      },
      {
        titulo: 'Prestação de contas',
        descricao: 'Divulgação de calendário, inscrições, resultados e oportunidades, com sínteses periódicas das atividades e informações financeiras em linguagem compreensível.',
      },
    ],
  },
  {
    id: 'diversidade',
    titulo: 'Diversidade e conscientização',
    resumo: 'Um ambiente escolar acolhedor, seguro, inclusivo e respeitoso para todos.',
    icone: HeartHandshake,
    calendario: true,
    itens: [
      {
        titulo: 'Semana da Consciência Negra — Cultura, Vozes e Representatividade',
        descricao: 'Atividades culturais, educativas e formativas que valorizam a história, a cultura, a identidade e o protagonismo da população negra e combatem o racismo.',
        detalhes: [
          'Batalhas de rima, apresentações de poesia, slam, música e dança',
          'Palestras, rodas de conversa e debates com convidados ligados à causa racial',
          'Valorização de personalidades negras na história, na ciência, na educação e nas artes',
          'Exposições de trabalhos dos estudantes e divulgação de obras afro-brasileiras e africanas',
        ],
        responsavel: 'Diretoria de Cultura · Khadyne Coelho, com Maria Alice e Juliana Florencio',
        aviso: 'A proposta busca ir além de uma celebração pontual, incentivando a educação antirracista durante todo o ano letivo.',
      },
      {
        titulo: 'Campanhas mensais de conscientização',
        descricao: 'De fevereiro a novembro, um tema por mês sobre assuntos sociais, educacionais, culturais e de saúde. Veja o calendário abaixo.',
      },
      {
        titulo: 'Combate ao racismo, bullying e discriminação',
        descricao: 'Campanhas de respeito, empatia e prevenção ao bullying, e ações contra o racismo, a LGBTfobia e todas as formas de preconceito.',
      },
      {
        titulo: 'Apoio à diversidade e inclusão',
        descricao: 'Ações de conscientização e acolhimento às comunidades negra e LGBTQIA+, para um ambiente seguro, inclusivo e respeitoso. Inclui o acolhimento de novos estudantes e a integração entre turmas e turnos.',
      },
    ],
  },
  {
    id: 'melhorias',
    titulo: 'Melhorias na escola',
    resumo: 'Identificar necessidades relatadas pelos estudantes e acompanhar o encaminhamento aos setores responsáveis.',
    icone: Hammer,
    itens: [
      {
        titulo: 'Levantamento de problemas de infraestrutura',
        descricao: 'Escuta dos estudantes sobre salas, banheiros, mobiliário, iluminação, ventilação e espaços comuns, com registros objetivos que evitam expor pessoas.',
      },
      {
        titulo: 'Encaminhamento de reivindicações',
        descricao: 'Solicitações levadas à direção, com acompanhamento das respostas e providências e retorno aos estudantes sobre o andamento.',
      },
      {
        titulo: 'Observatório Estudantil da Educação',
        descricao: 'Consultas periódicas sobre aprendizagem, materiais, comunicação, apoio pedagógico e condições de estudo, com sínteses e propostas objetivas para a direção e a coordenação pedagógica.',
        aviso: 'O Observatório não substitui a avaliação pedagógica oficial nem os canais formais de reclamação. O foco são as condições de ensino e aprendizagem, nunca ataques ou julgamentos individuais.',
      },
      {
        titulo: 'Programa de Reconhecimento Estudantil',
        descricao: 'Valorização de atitudes positivas, como respeito, solidariedade, cooperação e responsabilidade, com critérios claros, inclusivos e divulgados antes.',
        aviso: 'O reconhecimento não se baseia em popularidade, favorecimento pessoal ou apenas em desempenho acadêmico.',
      },
    ],
  },
  {
    id: 'saude',
    titulo: 'Saúde e bem-estar',
    resumo: 'Hábitos saudáveis, informação confiável e cuidado coletivo.',
    icone: HeartPulse,
    itens: [
      {
        titulo: 'Campanhas educativas',
        descricao: 'Campanhas sobre sono, alimentação, higiene, saúde mental, educação sexual e atividade física.',
      },
      {
        titulo: 'Ações de conscientização',
        descricao: 'Conversas e oficinas com parcerias e convidados qualificados, em linguagem acolhedora.',
      },
      {
        titulo: 'Divulgação de canais de apoio',
        descricao: 'Divulgação dos canais de apoio existentes na escola e na rede pública. As ações não substituem o atendimento profissional.',
      },
    ],
  },
  {
    id: 'clubes',
    titulo: 'Clubes estudantis',
    resumo: 'Espaços de interesse, convivência, criação e protagonismo juvenil. Os estudantes organizam os encontros de cada clube.',
    icone: Sparkles,
    itens: [
      {
        titulo: 'Clube de Debate',
        descricao: 'Discussões sobre temas sociais, culturais, filosóficos, científicos e atuais, com argumentação e respeito a diferentes opiniões.',
      },
      {
        titulo: 'Clube de Leitura',
        descricao: 'Leitura individual e coletiva, rodas de conversa, recomendações literárias e troca de experiências sobre obras.',
      },
      {
        titulo: 'Clube de Desenho e Artes',
        descricao: 'Práticas artísticas, experimentação de técnicas, desafios criativos e compartilhamento de produções.',
      },
      {
        titulo: 'Clube de RPG',
        descricao: 'Campanhas, personagens e narrativas colaborativas que estimulam criatividade, escrita, interpretação e estratégia.',
      },
      {
        titulo: 'Clube de Dança',
        descricao: 'Aprendizagem de estilos variados, criação de coreografias, ensaios e possíveis apresentações culturais.',
      },
      {
        titulo: 'Clube de Música',
        descricao: 'Prática musical, aprendizado de instrumentos, canto, composição e apresentações culturais na escola.',
      },
      {
        titulo: 'Como os clubes funcionam',
        descricao: 'Cada grupo tem estudantes responsáveis pela organização e pela comunicação, e define a frequência conforme horários e espaços. O Grêmio apoia a divulgação e leva solicitações à direção. Novos clubes podem ser propostos durante o mandato.',
        aviso: 'A criação e o funcionamento dependem da viabilidade das atividades e da autorização da escola.',
      },
    ],
  },
  {
    id: 'escuta',
    titulo: 'Escuta SD — Ouvidoria Estudantil',
    resumo: 'Plataforma digital para registrar denúncias, relatar problemas, enviar sugestões e compartilhar preocupações sobre o ambiente escolar.',
    icone: MessageSquareText,
    itens: [
      {
        titulo: 'Escuta SD',
        descricao: 'Canal para denúncias e situações de desrespeito, além de sugestões, críticas e solicitações, com possibilidade de manifestação anônima, sigilo e proteção das informações dos estudantes.',
        detalhes: [
          'As manifestações são encaminhadas aos responsáveis pela gestão escolar',
          'As demandas são acompanhadas e as melhorias realizadas são divulgadas',
        ],
        link: { para: '/escuta-sd', rotulo: 'Abrir a Escuta SD' },
      },
    ],
  },
]
