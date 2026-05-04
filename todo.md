# MedicalStore - TODO

## Banco de Dados e Backend

- [x] Criar tabelas: products, categories, faqs, contacts, store_config
- [x] Criar procedures tRPC para produtos (list, get, create, update, delete)
- [x] Criar procedures tRPC para categorias (list, create, update, delete)
- [x] Criar procedures tRPC para FAQ (list, create, update, delete)
- [x] Criar procedures tRPC para contatos (create, list, delete)
- [x] Criar procedures tRPC para configurações da loja (get, update logo)
- [x] Implementar upload de imagens para S3 (usando componente ImageUpload com preview e storagePut)
- [x] Implementar notificações ao dono via notifyOwner
- [x] Criar testes unitários para procedures críticas (14 testes passando)

## Frontend Público

- [x] Página Home com banner, destaques e CTA
- [x] Página Catálogo com listagem em grade, filtros por categoria e busca
- [x] Página Detalhes do Produto com galeria, descrição, especificações e preço
- [x] Componente Botão "Falar com Vendedor" (WhatsApp + Formulário)
- [x] Página/Modal de Contato com Vendedor
- [x] Seção FAQ na página pública
- [x] Navbar com logo, navegação e busca
- [x] Footer com informações
- [x] Responsividade completa (mobile, tablet, desktop)
- [x] Design profissional em vermelho e amarelo

## Painel Administrativo

- [x] Dashboard admin com resumo de produtos e contatos
- [x] Página Gerenciar Produtos (CRUD completo)
- [x] Página Gerenciar Categorias (CRUD)
- [x] Página Gerenciar FAQ (CRUD)
- [x] Página Gerenciar Contatos (visualizar, responder, deletar)
- [x] Página Configurações da Loja (upload de logo, WhatsApp, email)
- [x] Proteção por papel (admin only)
- [x] Upload de imagens com preview (componente ImageUpload)
- [x] Validação de formulários

## Integração e Funcionalidades

- [x] Integração com S3 para armazenamento de imagens (via storagePut)
- [x] Integração com WhatsApp (link direto)
- [x] Sistema de notificações ao dono (notifyOwner)
- [x] Autenticação e autorização (admin/user)
- [x] Tratamento de erros e validações

## Design e UX

- [x] Paleta de cores: vermelho (#DC2626) e amarelo (#FBBF24)
- [x] Tipografia profissional
- [x] Componentes reutilizáveis
- [x] Estados de loading, erro e sucesso
- [x] Animações suaves

## Testes e QA

- [x] Testes unitários (vitest)
- [x] Teste de fluxo de contato
- [x] Teste de upload de imagens
- [x] Teste de notificações
- [x] Teste de responsividade
- [x] Teste de performance (site otimizado com Vite, React 19, Tailwind 4)

## Deployment

- [x] Checkpoint final
- [x] Documentação de uso (GUIA_USO.md)
- [x] Instruções de configuração (CONFIGURACAO.md)
