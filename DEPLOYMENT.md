# Guia de Deployment - Medical Store

## Deployment no Vercel

### Pré-requisitos

1. Conta no Vercel (https://vercel.com)
2. Repositório no GitHub com o código do projeto
3. Variáveis de ambiente configuradas

### Passo 1: Preparar Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env.local` e preencha com seus valores:

```bash
cp .env.example .env.local
```

Variáveis obrigatórias:
- `DATABASE_URL` - URL de conexão com o banco de dados MySQL
- `VITE_APP_ID` - ID da aplicação Manus OAuth
- `JWT_SECRET` - Chave secreta para JWT
- `OWNER_OPEN_ID` - ID do proprietário
- `OWNER_NAME` - Nome do proprietário

### Passo 2: Fazer Push para GitHub

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### Passo 3: Deploy no Vercel

1. Acesse https://vercel.com/dashboard
2. Clique em "Add New..." → "Project"
3. Selecione seu repositório `medical-store-v2`
4. Configure as variáveis de ambiente:
   - Vá para "Environment Variables"
   - Adicione todas as variáveis do `.env.example`
5. Clique em "Deploy"

### Passo 4: Configurar Banco de Dados

Após o deploy, você precisa:

1. Executar as migrações do banco de dados
2. Configurar a conexão com o banco MySQL

```bash
# Localmente, antes de fazer push
pnpm db:push
```

### Variáveis de Ambiente no Vercel

No painel do Vercel, adicione as seguintes variáveis:

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `DATABASE_URL` | URL MySQL | `mysql://user:pass@host/db` |
| `VITE_APP_ID` | App ID Manus | `your_app_id` |
| `OAUTH_SERVER_URL` | URL OAuth | `https://api.manus.im` |
| `JWT_SECRET` | Chave JWT | `seu_secret_aqui` |
| `OWNER_OPEN_ID` | ID do owner | `owner_id` |
| `OWNER_NAME` | Nome do owner | `Seu Nome` |
| `VITE_FRONTEND_FORGE_API_KEY` | API Key | `sua_chave` |
| `BUILT_IN_FORGE_API_KEY` | API Key | `sua_chave` |

### Troubleshooting

#### Erro 404 ao acessar a página

- Verifique se o build foi bem-sucedido
- Confira os logs no Vercel Dashboard
- Certifique-se de que `vercel.json` está configurado corretamente

#### Erro de conexão com banco de dados

- Verifique se `DATABASE_URL` está correto
- Certifique-se de que o banco está acessível
- Confira firewall/regras de segurança

#### Erro de autenticação OAuth

- Verifique `VITE_APP_ID`
- Confira `OAUTH_SERVER_URL`
- Certifique-se de que a aplicação está registrada no Manus

### Monitoramento

Após o deploy:

1. Acesse seu site em `https://seu-projeto.vercel.app`
2. Monitore os logs em "Deployments" → "Logs"
3. Configure alertas no Vercel Dashboard

### Atualizações Futuras

Para atualizar o site:

```bash
git add .
git commit -m "Update: descrição das mudanças"
git push origin main
```

O Vercel fará o deploy automaticamente!

## Suporte

Para mais informações:
- Documentação Vercel: https://vercel.com/docs
- Documentação do Projeto: Ver `GUIA_USO.md` e `CONFIGURACAO.md`
