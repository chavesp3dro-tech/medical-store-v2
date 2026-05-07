# Prompt para Agente - Deploy Vercel Medical Store

## Objetivo
Automatizar o deployment do projeto medical-store-v2 no Vercel, incluindo importação do repositório, configuração de variáveis de ambiente e execução do deploy.

---

## Instruções Detalhadas para o Agente

### FASE 1: Preparação e Verificação

1. **Verificar o Vercel Dashboard**
   - Confirmar que o Vercel Dashboard está aberto em https://vercel.com/dashboard
   - Verificar que o usuário está logado
   - Capturar screenshot do estado atual

2. **Verificar o Repositório GitHub**
   - Confirmar que o repositório `chavesp3dro-tech/medical-store-v2` existe
   - Verificar que contém os arquivos: `vercel.json`, `.env.example`, `package.json`
   - Confirmar que o código foi atualizado com as correções

### FASE 2: Importar Repositório no Vercel

3. **Acessar Importação de Projeto**
   - No Vercel Dashboard, clique em "Add New" (botão no topo)
   - Selecione "Project"
   - Procure por "medical-store-v2" ou selecione o repositório manualmente

4. **Conectar Repositório**
   - Selecione o repositório: `chavesp3dro-tech/medical-store-v2`
   - Clique em "Import"
   - Aguarde a página de configuração carregar

5. **Configurar Projeto**
   - Nome do Projeto: `medical-store-v2` (ou deixar padrão)
   - Framework: Vercel deve detectar como "Vite"
   - Root Directory: `.` (raiz)
   - Build Command: `pnpm build`
   - Output Directory: `dist`

### FASE 3: Configurar Variáveis de Ambiente

6. **Acessar Environment Variables**
   - Na página de configuração do projeto, localize a seção "Environment Variables"
   - Clique em "Add" ou "New Variable"

7. **Adicionar Variáveis Obrigatórias**
   
   Adicione as seguintes variáveis (em ordem):

   **Variável 1: DATABASE_URL**
   - Nome: `DATABASE_URL`
   - Valor: `mysql://user:password@host:3306/medical_store`
   - Nota: Substitua com sua URL MySQL real
   - Clique em "Add"

   **Variável 2: VITE_APP_ID**
   - Nome: `VITE_APP_ID`
   - Valor: `your_manus_app_id`
   - Nota: Substitua com seu ID da aplicação Manus
   - Clique em "Add"

   **Variável 3: OAUTH_SERVER_URL**
   - Nome: `OAUTH_SERVER_URL`
   - Valor: `https://api.manus.im`
   - Clique em "Add"

   **Variável 4: JWT_SECRET**
   - Nome: `JWT_SECRET`
   - Valor: `your_jwt_secret_key_here`
   - Nota: Substitua com uma chave secreta segura
   - Clique em "Add"

   **Variável 5: OWNER_OPEN_ID**
   - Nome: `OWNER_OPEN_ID`
   - Valor: `owner_open_id`
   - Nota: Substitua com o ID do proprietário
   - Clique em "Add"

   **Variável 6: OWNER_NAME**
   - Nome: `OWNER_NAME`
   - Valor: `Owner Name`
   - Nota: Substitua com o nome do proprietário
   - Clique em "Add"

   **Variável 7: VITE_FRONTEND_FORGE_API_KEY**
   - Nome: `VITE_FRONTEND_FORGE_API_KEY`
   - Valor: `your_frontend_forge_api_key`
   - Nota: Substitua com a chave API do frontend
   - Clique em "Add"

   **Variável 8: BUILT_IN_FORGE_API_KEY**
   - Nome: `BUILT_IN_FORGE_API_KEY`
   - Valor: `your_forge_api_key`
   - Nota: Substitua com a chave API do backend
   - Clique em "Add"

8. **Verificar Variáveis**
   - Confirmar que todas as 8 variáveis foram adicionadas
   - Capturar screenshot da lista de variáveis
   - Verificar que não há erros de validação

### FASE 4: Executar Deploy

9. **Iniciar Deploy**
   - Localize o botão "Deploy" (geralmente no final da página)
   - Clique em "Deploy"
   - Aguarde o início do processo de build

10. **Monitorar Build**
    - Acompanhe o progresso do build na página de logs
    - Procure por mensagens de sucesso/erro
    - Aguarde até que o status mude para "Ready" ou "Deployed"

11. **Verificar Deploy**
    - Quando o deploy terminar, você verá uma URL como: `https://medical-store-v2.vercel.app`
    - Clique na URL para abrir o site
    - Verifique se a página carrega corretamente (não deve ser 404)

### FASE 5: Validação Final

12. **Testar Funcionalidades Básicas**
    - Acesse a página inicial do site
    - Verifique se o layout carrega corretamente
    - Teste a navegação básica
    - Verifique o console do navegador (F12) para erros

13. **Capturar Evidências**
    - Screenshot da URL do site deployado
    - Screenshot da página inicial funcionando
    - Screenshot do Vercel Dashboard mostrando "Deployed"

14. **Documentar Resultado**
    - URL do site: `https://medical-store-v2.vercel.app` (ou similar)
    - Status: "Deployed Successfully"
    - Data/Hora do deployment
    - Qualquer erro ou aviso encontrado

---

## Checklist de Conclusão

- [ ] Repositório importado no Vercel
- [ ] 8 variáveis de ambiente configuradas
- [ ] Build iniciado com sucesso
- [ ] Deploy concluído (status "Ready")
- [ ] Site acessível via URL
- [ ] Página inicial carrega sem erros 404
- [ ] Console do navegador sem erros críticos
- [ ] Screenshots capturadas
- [ ] Resultado documentado

---

## Possíveis Erros e Soluções

### Erro: "Repository not found"
- **Solução:** Verifique se o repositório é público e se o nome está correto
- **Ação:** Tente conectar a conta GitHub novamente

### Erro: "Build failed"
- **Solução:** Verifique os logs de build no Vercel
- **Ação:** Procure por erros de dependências ou configuração

### Erro: "404 Not Found"
- **Solução:** Verifique se `vercel.json` está configurado corretamente
- **Ação:** Revise as rewrite rules em `vercel.json`

### Erro: "Missing environment variable"
- **Solução:** Verifique se todas as 8 variáveis foram adicionadas
- **Ação:** Adicione as variáveis faltantes

---

## Informações de Contato

Se encontrar problemas:
1. Verifique os logs do Vercel Dashboard
2. Consulte o arquivo `DEPLOYMENT.md` no repositório
3. Revise o arquivo `.env.example` para variáveis necessárias

---

## Resultado Esperado

Após completar todos os passos:
- ✅ Site deployado e acessível
- ✅ URL: `https://medical-store-v2.vercel.app` (ou domínio customizado)
- ✅ Página inicial carregando corretamente
- ✅ Sem erros 404 ou 500
- ✅ Todas as variáveis de ambiente configuradas

**Status Final: DEPLOYMENT CONCLUÍDO COM SUCESSO** ✅
