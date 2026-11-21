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

   A integração Neon fornece `DATABASE_URL`. Mantenha todas essas variáveis como **Sensitive** e nunca as coloque em arquivos do site ou no GitHub.

4. Abra **Deployments** e faça redeploy do projeto para carregar as variáveis.
5. Acesse `/area-do-gremio` e entre com o usuário e senha configurados.

Para gerar um valor aleatório para `SESSION_SECRET`, no Windows PowerShell execute:

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

O login usa uma conta compartilhada definida na Vercel. A sessão fica em cookie protegido, expira após 8 horas e pode ser encerrada pelo botão **Sair**. A senha e a chave de sessão nunca são enviadas ao navegador. Se trocar a senha ou a chave, faça redeploy; trocar a chave também encerra as sessões atuais.

## Desenvolvimento local

```bash
npm install
```

Copie `.env.example` para `.env.local` e preencha as variáveis com valores privados. Para rodar a interface e as funções de servidor localmente, use a Vercel CLI com `vercel dev`; o servidor Vite simples (`npm run dev`) serve apenas a interface e não executa as rotas `/api`.

## Como os dados são protegidos

- O formulário público só pode criar mensagens. O servidor valida os campos e sempre define o status inicial como **nova**.
- Só uma sessão autenticada pode listar, atualizar ou excluir mensagens.
- O login e os dados do banco são processados por rotas da Vercel. `DATABASE_URL` nunca é incluída no código entregue ao navegador.
- Mensagens anônimas não guardam nome nem turma. O conteúdo que a pessoa escrever ainda pode revelar sua identidade.
- A Área do Grêmio não é um serviço de emergência; combine com a escola quem acompanha as mensagens e como encaminhar situações urgentes.

## Publicação

A branch `main` continua ligada à Vercel. Ao integrar uma mudança nela, a Vercel gera um novo deploy. As rotas de servidor ficam em `api/` e o aplicativo React em `src/`.
