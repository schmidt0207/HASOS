# Site oficial da Chapa HASOS — Grêmio Estudantil 2027

Portal institucional da Chapa HASOS com páginas públicas, Escuta SD e Área do Grêmio protegida por login. O site é hospedado na Vercel; os dados ficam no Neon Postgres.

## Configuração inicial

1. Conecte o banco Neon ao projeto Vercel. A integração deve criar a variável privada `DATABASE_URL`.
2. No Neon, abra o SQL Editor, copie `database/schema.sql` deste repositório e execute para criar a tabela de mensagens.
3. Na Vercel, abra o projeto **hasos → Settings → Environment Variables** e crie estas variáveis para Production (e Preview, se quiser testar previews):

   | Nome | Valor |
   | --- | --- |
   | `GREMIO_LOGIN` | Nome de usuário do Grêmio, por exemplo `gremio` |
   | `GREMIO_PASSWORD` | Uma senha longa e exclusiva, compartilhada somente com a equipe autorizada |
   | `SESSION_SECRET` | Chave aleatória privada com pelo menos 32 caracteres |

   A integração Neon fornece `DATABASE_URL`. Mantenha os valores privados; nunca os coloque no código do site ou no GitHub.

4. Abra **Deployments** e faça redeploy do projeto para carregar as variáveis.
5. Acesse `/area-do-gremio` e entre com o usuário e senha configurados.

Para gerar um valor aleatório para `SESSION_SECRET`, no Windows PowerShell execute:

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

O login usa uma conta compartilhada definida na Vercel. A sessão fica em cookie protegido, expira após 8 horas e pode ser encerrada pelo botão **Sair**. A senha e a chave de sessão nunca são enviadas ao navegador. Após alterar uma variável, faça redeploy. Trocar a chave de sessão encerra as sessões atuais; sessões existentes podem continuar válidas por até 8 horas após a troca da senha.

## Desenvolvimento local

```bash
npm install
```

Copie `.env.example` para `.env.local` e preencha as variáveis com valores privados. No Windows PowerShell, use `Copy-Item .env.example .env.local`. Para rodar a interface e as funções de servidor localmente, instale a Vercel CLI e execute `vercel dev`; o servidor Vite simples (`npm run dev`) serve apenas a interface e não executa as rotas `/api`.

## Como os dados são protegidos

- O formulário público só pode criar mensagens. O servidor valida os campos e sempre define o status inicial como **nova**.
- Só uma sessão autenticada pode listar, atualizar ou excluir mensagens.
- O login e os dados do banco são processados por rotas da Vercel. `DATABASE_URL` nunca é incluída no código entregue ao navegador.
- O painel usa uma conta compartilhada. Escolham uma senha longa, mantenham o acesso restrito à equipe autorizada e troquem a senha quando alguém sair.
- Mensagens anônimas não guardam nome nem turma no banco. A hospedagem pode manter registros técnicos de acesso, e o texto escrito pode revelar a identidade da pessoa.
- A Escuta SD não é um serviço de emergência e as mensagens não são lidas na hora. Combinem com a escola quem acompanha a caixa e o que fazer em situações urgentes. Em perigo imediato, procure um adulto de confiança ou ligue para 190 (Polícia), 192 (SAMU), 188 (CVV) ou 100 (Direitos Humanos).

## Personalizar o conteúdo

| O que mudar | Onde |
| --- | --- |
| Fotos e informações da equipe | `public/equipe/` e `src/data/equipe.ts` |
| Propostas e calendário | `src/data/propostas.ts` |
| Página inicial | `src/pages/Home.tsx` |
| Logotipos e favicon | arquivos de imagem dentro de `public/` |
| Cores e estilos | `tailwind.config.js` e `src/index.css` |

Publique fotos de estudantes somente com autorização deles e dos responsáveis, quando forem menores.

## Problemas comuns

| Sintoma | O que conferir |
| --- | --- |
| O formulário não envia | Confirme que `DATABASE_URL` está ativa na Vercel e que `database/schema.sql` foi executado no Neon. |
| O painel não aceita login | Confira `GREMIO_LOGIN`, `GREMIO_PASSWORD` e `SESSION_SECRET` nas variáveis da Vercel e faça redeploy. |
| A caixa não carrega | Confira a variável `DATABASE_URL` e se o banco contém a tabela `mensagens`. |

## Publicação

A branch `main` continua ligada à Vercel. Ao integrar uma mudança nela, a Vercel gera um novo deploy. As rotas de servidor ficam em `api/` e o aplicativo React em `src/`.
