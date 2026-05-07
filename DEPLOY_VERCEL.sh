#!/bin/bash

# ============================================================================
# Medical Store - Vercel Deployment Script
# ============================================================================
# Este script automatiza o processo de deployment no Vercel
# Uso: bash DEPLOY_VERCEL.sh
# ============================================================================

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Funções auxiliares
print_header() {
    echo -e "\n${BLUE}═══════════════════════════════════════════════════════════${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}\n"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

# Verificações iniciais
print_header "PASSO 1: Verificações Iniciais"

# Verificar se está no diretório correto
if [ ! -f "vercel.json" ]; then
    print_error "vercel.json não encontrado. Execute este script na raiz do projeto."
    exit 1
fi
print_success "Arquivo vercel.json encontrado"

# Verificar se git está configurado
if ! git config user.name > /dev/null 2>&1; then
    print_warning "Git não está configurado. Configurando..."
    git config user.name "Medical Store Bot"
    git config user.email "bot@medicalstore.local"
fi
print_success "Git configurado"

# Verificar se há mudanças não commitadas
if ! git diff-index --quiet HEAD --; then
    print_warning "Existem mudanças não commitadas"
    echo "Arquivos modificados:"
    git status --short
    read -p "Deseja fazer commit dessas mudanças? (s/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Ss]$ ]]; then
        git add .
        git commit -m "chore: Pre-deployment updates"
        print_success "Mudanças commitadas"
    else
        print_error "Abortando deployment"
        exit 1
    fi
fi
print_success "Repositório limpo"

# Verificar conexão com GitHub
print_header "PASSO 2: Verificar Conexão com GitHub"

if git ls-remote origin > /dev/null 2>&1; then
    print_success "Conexão com GitHub OK"
else
    print_error "Não conseguiu conectar ao GitHub"
    print_info "Verifique sua conexão de internet e credenciais do GitHub"
    exit 1
fi

# Fazer push para GitHub
print_header "PASSO 3: Fazer Push para GitHub"

print_info "Fazendo push da branch main..."
if git push origin main; then
    print_success "Push realizado com sucesso"
else
    print_error "Erro ao fazer push"
    print_info "Verifique suas credenciais do GitHub"
    exit 1
fi

# Verificar arquivos de configuração
print_header "PASSO 4: Verificar Arquivos de Configuração"

files_to_check=("vercel.json" ".env.example" "DEPLOYMENT.md" "package.json" "vite.config.ts")

for file in "${files_to_check[@]}"; do
    if [ -f "$file" ]; then
        print_success "✓ $file"
    else
        print_error "✗ $file não encontrado"
    fi
done

# Verificar variáveis de ambiente
print_header "PASSO 5: Verificar Variáveis de Ambiente"

print_info "Variáveis obrigatórias que você precisa configurar no Vercel:"
echo ""
echo "  DATABASE_URL                    - URL de conexão MySQL"
echo "  VITE_APP_ID                     - ID da aplicação Manus"
echo "  OAUTH_SERVER_URL                - URL do servidor OAuth"
echo "  JWT_SECRET                      - Chave secreta JWT"
echo "  OWNER_OPEN_ID                   - ID do proprietário"
echo "  OWNER_NAME                      - Nome do proprietário"
echo "  VITE_FRONTEND_FORGE_API_KEY     - Chave API Frontend"
echo "  BUILT_IN_FORGE_API_KEY          - Chave API Backend"
echo ""

# Revisar configuração
print_header "PASSO 6: Revisar Configuração"

echo "Arquivo vercel.json:"
echo "────────────────────────────────────────────────────────────"
cat vercel.json | head -20
echo "..."
echo "────────────────────────────────────────────────────────────"
echo ""

echo "Variáveis de ambiente (.env.example):"
echo "────────────────────────────────────────────────────────────"
cat .env.example | head -15
echo "..."
echo "────────────────────────────────────────────────────────────"
echo ""

# Confirmação final
print_header "PASSO 7: Confirmação Final"

echo -e "${YELLOW}Antes de continuar, verifique:${NC}"
echo ""
echo "  [ ] Arquivo vercel.json está correto"
echo "  [ ] Arquivo .env.example contém todas as variáveis necessárias"
echo "  [ ] Você tem uma conta no Vercel"
echo "  [ ] Você tem acesso ao repositório no GitHub"
echo ""

read -p "Tudo está correto? (s/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Ss]$ ]]; then
    print_error "Abortando deployment"
    exit 1
fi

# Instruções finais
print_header "PRÓXIMOS PASSOS NO VERCEL"

echo -e "${GREEN}✓ Código enviado para GitHub com sucesso!${NC}"
echo ""
echo "Agora você precisa fazer no Vercel Dashboard:"
echo ""
echo "1. Acesse https://vercel.com/dashboard"
echo "2. Clique em 'Add New' → 'Project'"
echo "3. Selecione o repositório 'medical-store-v2'"
echo "4. Configure as variáveis de ambiente:"
echo ""
echo "   DATABASE_URL = sua_url_mysql"
echo "   VITE_APP_ID = seu_app_id"
echo "   OAUTH_SERVER_URL = https://api.manus.im"
echo "   JWT_SECRET = sua_chave_jwt"
echo "   OWNER_OPEN_ID = seu_owner_id"
echo "   OWNER_NAME = Seu Nome"
echo "   VITE_FRONTEND_FORGE_API_KEY = sua_chave"
echo "   BUILT_IN_FORGE_API_KEY = sua_chave"
echo ""
echo "5. Clique em 'Deploy'"
echo ""
echo "Para mais informações, veja: DEPLOYMENT.md"
echo ""

print_success "Script de deployment concluído!"
print_info "Agora acesse o Vercel Dashboard para completar o deployment"
