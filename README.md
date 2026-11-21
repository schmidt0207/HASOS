# Site oficial da Chapa HASOS — Grêmio Estudantil 2027

Portal institucional da Chapa HASOS (Escola de Educação Básica Santos Dumont, Blumenau–SC) com:

- páginas públicas: início, propostas do Plano de Gestão 2027, equipe e **Escuta SD** (envio de mensagens anônimas ou identificadas);
- **Área do Grêmio**: login real (Supabase Auth) e painel administrativo com dashboard e caixa de mensagens;
- banco de dados real (Supabase / PostgreSQL) protegido por RLS;
- hospedagem gratuita no Cloudflare Pages (site estático gerado em `dist`).

Tecnologias: React + Vite, TypeScript, Tailwind CSS, Supabase, Lucide.

---

## 1. O que você precisa

- Conta gratuita no [GitHub](https://github.com), no [Supabase](https://supabase.com) e no [Cloudflare](https://dash.cloudflare.com/sign-up).
- [Node.js 20 ou mais novo](https://nodejs.org) e [Git](https://git-scm.com) instalados no computador.

## 2. Instalar e rodar no computador

```bash
npm install
cp .env.example .env
npm run dev
```

No Windows, no lugar de `cp`, use `copy .env.example .env`. O site abre em `http://localhost:5173`. Ele já aparece, mas o envio de mensagens e o login só funcionam depois do passo 3.

O `npm install` cria o arquivo `package-lock.json`. Guarde esse arquivo no repositório (passo 5): ele garante que o site seja gerado sempre com as mesmas versões.

Outros comandos:

| Comando | O que faz |
| --- | --- |
| `npm run build` | gera o site pronto para publicar na pasta `dist` |
| `npm run preview` | abre no navegador o resultado do build |
| `npm run typecheck` | confere os tipos do TypeScript |

## 3. Configurar o Supabase

### 3.1 Criar o projeto

1. No painel do Supabase, clique em **New project**.
2. Escolha um nome (por exemplo `hasos-site`), crie uma senha forte para o banco (guarde-a) e escolha a região **South America (São Paulo)**.
3. Espere o projeto terminar de ser criado.

### 3.2 Criar as tabelas e as regras de segurança

1. No menu lateral, abra **SQL Editor** e crie uma consulta nova.
2. Copie todo o conteúdo do arquivo `supabase/schema.sql`, cole no editor e clique em **Run**.

Isso cria:

- a tabela `mensagens`, com tipo, conteúdo, anônima ou não, nome, turma, status e datas;
- a tabela `admins`, com a lista de pessoas autorizadas a entrar no painel;
- a função `is_admin()` e as políticas RLS (Row Level Security).

Como a segurança funciona:

- **Qualquer pessoa** (sem login) só consegue **enviar** uma mensagem. Ela não consegue ler, alterar nem apagar nada.
- Só quem está na tabela `admins` consegue **ler, mudar o status e excluir** mensagens.
- As permissões são aplicadas por coluna. Quem envia só pode preencher tipo, conteúdo, anônima, nome e turma. O status começa sempre como "nova".
- Uma regra do banco impede mensagem anônima com nome ou turma, e mensagem identificada sem nome ou turma.

### 3.3 Fechar o cadastro de novos usuários

Como o login é só para a equipe, ninguém deve poder criar conta sozinho.

1. Abra **Authentication** e procure as configurações de acesso (em geral **Sign In / Providers**).
2. Desative a opção **Allow new users to sign up** (permitir novos cadastros) e salve.

Mesmo sem esse passo, uma conta que não esteja na tabela `admins` não enxerga nenhuma mensagem. Mas deixe fechado.

### 3.4 Criar o primeiro administrador

O login do site é por **usuário e senha**. Por dentro, o Supabase Auth identifica cada conta por um e-mail, então o site converte o usuário em um e-mail interno: o usuário `gremio` vira `gremio@hasos.example.com`. A pessoa nunca digita esse e-mail. Quem digitar um e-mail completo no campo também consegue entrar.

1. Em **Authentication → Users**, clique em **Add user → Create new user**.
2. No campo de e-mail, escreva `usuario@hasos.example.com`, trocando `usuario` pelo nome de usuário escolhido, em letras minúsculas e sem espaços (por exemplo `arthur` ou `gremio`). Defina uma senha forte e marque **Auto Confirm User**.
3. Abra o **SQL Editor** e rode o conteúdo de `supabase/criar_admin.sql`, trocando o nome e o e-mail pelos mesmos que você criou:

```sql
insert into public.admins (user_id, nome)
select id, 'NOME DA PESSOA'
from auth.users
where email = 'usuario@hasos.example.com';
```

Se o Supabase recusar o domínio `hasos.example.com`, use outro domínio no lugar dele (um que vocês tenham, por exemplo). Coloque o mesmo domínio na variável `VITE_LOGIN_DOMINIO`, tanto no `.env` quanto no Cloudflare, e use esse domínio ao criar os usuários.

**Um usuário para todos ou um por pessoa?** Os dois funcionam. Recomendamos um usuário por integrante: assim, quando alguém sair da equipe, você remove só o acesso dessa pessoa sem trocar a senha de todo mundo. Se preferirem um único usuário compartilhado, a senha precisa ser forte e ser trocada sempre que alguém sair. Em nenhum caso a senha fica escrita no código: ela existe só dentro do Supabase.

Para **remover** o acesso de alguém:

```sql
delete from public.admins
where user_id = (select id from auth.users where email = 'usuario@hasos.example.com');
```

Para trocar uma senha, use **Authentication → Users**, no menu da pessoa.

### 3.5 Copiar as chaves para o site

1. Abra **Project Settings → API** (ou **API Keys**).
2. Copie a **Project URL** e a chave **anon / public**.
3. Cole no arquivo `.env`:

```
VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
VITE_LOGIN_DOMINIO=hasos.example.com
```

A chave `anon` é pública por natureza e quem protege os dados são as políticas RLS. **Nunca** coloque a chave `service_role` no site nem no GitHub: ela ignora todas as regras de segurança. O arquivo `.env` já está no `.gitignore`.

## 4. Testar tudo (checklist)

Rode `npm run dev` e confira:

1. Abra `/escuta-sd`, envie uma mensagem **anônima** e depois uma **identificada**. Depois de cada envio deve aparecer a confirmação e os campos devem ficar limpos.
2. No Supabase, em **Table Editor → mensagens**, confira se as duas linhas existem. Na anônima, `nome` e `turma` devem estar vazios.
3. Abra uma janela anônima do navegador e tente acessar `/admin`. Deve voltar para o login.
4. Entre em `/area-do-gremio` com o usuário e a senha do administrador criado.
5. No painel, confira os números do dashboard e abra as mensagens na caixa.
6. Teste: abrir (marca como visualizada), mudar para Em análise, Encaminhada e Resolvida, filtrar por categoria e status, pesquisar, marcar "Somente anônimas" e excluir uma mensagem.
7. Clique em **Sair**, entre de novo e confira se as mensagens continuam lá. Elas ficam no banco, não no navegador.
8. Crie uma conta de teste em **Authentication → Users** **sem** colocá-la em `admins`, tente entrar no site e confirme que o acesso é negado.

## 5. Colocar o projeto no GitHub

1. Crie um repositório novo no GitHub (pode ser privado).
2. No terminal, dentro da pasta do projeto:

```bash
git init
git add .
git commit -m "Site HASOS"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/NOME-DO-REPOSITORIO.git
git push -u origin main
```

Antes do `git add .`, confirme que o `.env` não aparece em `git status`.

## 6. Publicar no Cloudflare Pages (gratuito)

1. No painel do Cloudflare, abra **Workers & Pages** e clique em **Create**, escolhendo **Pages** e depois **Connect to Git**. Autorize o GitHub e escolha o repositório. A tela do Cloudflare muda de vez em quando, então se algum nome estiver diferente, procure a opção de criar um projeto Pages ligado ao Git.
2. Configure o build:
   - **Framework preset**: None (ou Vite)
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
3. Em **Environment variables**, adicione:
   - `VITE_SUPABASE_URL` com a URL do projeto
   - `VITE_SUPABASE_ANON_KEY` com a chave anon
   - `VITE_LOGIN_DOMINIO` com o mesmo domínio usado nos usuários
   - `NODE_VERSION` com o valor `20`
4. Clique em **Save and Deploy**. Ao terminar, o site fica em um endereço `xxxx.pages.dev`.

Os arquivos `public/_redirects` (faz as páginas internas funcionarem ao recarregar) e `public/_headers` (cabeçalhos de segurança) já estão prontos. Se um dia você usar outro endereço de Supabase além de `*.supabase.co`, ajuste a linha `connect-src` do `_headers`.

Todo `git push` na branch `main` publica uma versão nova automaticamente. As variáveis `VITE_*` entram no site na hora do build, então se você mudá-las no Cloudflare, faça um novo deploy.

Para usar um domínio próprio, abra o projeto no Cloudflare Pages, vá em **Custom domains** e siga as instruções.

## 7. Manter o banco ativo (importante)

No plano gratuito, o Supabase **pausa o projeto quando fica uma semana com pouca atividade**. Isso pode acontecer nas férias escolares, e com o projeto pausado o envio de mensagens e o login param de funcionar. Quando é pausado, dá para retomar pelo painel do Supabase (**Resume project**).

Para evitar a pausa, o projeto inclui `.github/workflows/keepalive.yml`, que chama o banco a cada 3 dias:

1. No GitHub, abra o repositório e vá em **Settings → Secrets and variables → Actions**.
2. Crie dois secrets: `SUPABASE_URL` (a URL do projeto) e `SUPABASE_ANON_KEY` (a chave anon).
3. Na aba **Actions**, rode o workflow **Manter Supabase ativo** uma vez, em **Run workflow**, para testar.

Confira também as regras atuais do Supabase, porque os planos gratuitos mudam com o tempo.

## 8. Personalizar o conteúdo

| O que mudar | Onde |
| --- | --- |
| Fotos da equipe | coloque os arquivos em `public/equipe/` (por exemplo `arthur.jpg`) e, em `src/data/equipe.ts`, adicione `foto: '/equipe/arthur.jpg'` ao integrante |
| Textos de cargos e responsabilidades | `src/data/equipe.ts` |
| Propostas, calendário de campanhas e clubes | `src/data/propostas.ts` |
| Projetos em destaque e textos da página inicial | `src/pages/Home.tsx` |
| Logotipo | `public/logo-branca.png` e `public/logo-roxa.png` (fundo transparente) e `public/favicon.svg` |
| Cores | `tailwind.config.js` |

Use fotos leves (até uns 300 KB) para o site carregar rápido, e só publique fotos de estudantes com a autorização deles e dos responsáveis, no caso de menores de idade.

## 9. Segurança, privacidade e uso responsável

- **Envio anônimo**: o banco não guarda nome, turma nem qualquer identificador de quem enviou. Mesmo assim, o Supabase e o Cloudflare mantêm os registros técnicos normais de qualquer site, e o texto escrito na mensagem pode revelar a identidade. O aviso de privacidade da Escuta SD explica isso aos estudantes.
- **Quem lê**: somente as pessoas listadas em `admins`. Mantenha a lista curta, use senhas fortes e ative a verificação em duas etapas nas contas do GitHub, do Supabase e do Cloudflare.
- **Spam**: o formulário tem limite de tamanho, validação no banco e um campo escondido contra robôs simples. Como qualquer pessoa pode enviar sem login, o banco não impede alguém de mandar muitas mensagens falsas. Se isso acontecer, apague as mensagens no painel e avise o Grêmio para avaliar uma proteção extra (por exemplo, Cloudflare Turnstile).
- **Denúncias graves**: a Escuta SD não é um serviço de emergência. A página lista os telefones de emergência e apoio. Combinem com a direção da escola quem vai ler as denúncias, em quanto tempo e o que fazer em casos graves, como violência, abuso ou risco de vida.
- **LGPD**: o site recebe dados de estudantes, muitos menores de idade. Conversem com a direção sobre a base legal, por quanto tempo as mensagens serão guardadas e como serão apagadas. Este README não substitui orientação jurídica.

## 10. Problemas comuns

| Sintoma | O que verificar |
| --- | --- |
| Aparece "O banco de dados ainda não foi conectado" | as variáveis `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` estão no `.env` (local) ou no Cloudflare (produção)? Depois de mudar, reinicie o `npm run dev` ou faça novo deploy |
| "Não foi possível enviar agora" | o `schema.sql` foi executado por inteiro? O projeto Supabase está pausado? |
| Login diz "usuário ou senha incorretos" | o usuário foi criado no Supabase com o e-mail `usuario@dominio` e o mesmo domínio está em `VITE_LOGIN_DOMINIO`? |
| Login diz que não tem permissão | o e-mail foi inserido na tabela `admins` pelo `criar_admin.sql`? |
| Painel abre mas a caixa fica vazia com erro | o `schema.sql` foi executado por inteiro (policies e permissões)? |
| Página em branco após o deploy | veja o console do navegador. Pode ser a política de segurança em `public/_headers` bloqueando algo que você adicionou |
| Erro de build no Cloudflare | confirme `NODE_VERSION=20`, comando `npm run build` e pasta `dist` |
| Páginas internas dão 404 ao recarregar | confirme que `public/_redirects` existe e que não há um arquivo `404.html` na raiz |

## 11. Estrutura do projeto

```
public/            logos, favicon, fotos da equipe, _redirects e _headers
supabase/          schema.sql (tabelas + RLS) e criar_admin.sql
.github/workflows/ keepalive.yml
src/
  components/      navegação, rodapé, layout, rota protegida
  context/         autenticação
  data/            equipe e propostas (conteúdo editável)
  lib/             cliente Supabase e tipos
  pages/           Home, Propostas, Equipe, EscutaSD, Login
  pages/admin/     painel: layout, dashboard e caixa de mensagens
```
