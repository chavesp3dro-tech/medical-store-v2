# MedicalStore - Guia de Uso

Bem-vindo à **MedicalStore**, sua loja virtual profissional de produtos médicos e hospitalares!

## 📋 Índice

1. [Acesso ao Site](#acesso-ao-site)
2. [Painel Administrativo](#painel-administrativo)
3. [Gerenciamento de Produtos](#gerenciamento-de-produtos)
4. [Gerenciamento de Categorias](#gerenciamento-de-categorias)
5. [Gerenciamento de FAQ](#gerenciamento-de-faq)
6. [Configurações da Loja](#configurações-da-loja)
7. [Contatos e Notificações](#contatos-e-notificações)
8. [Frontend Público](#frontend-público)

---

## Acesso ao Site

### URL Principal
O site está disponível em: `https://3000-iod20mwacqx3b8y8uxn7b-e6638b74.us1.manus.computer`

### Autenticação
- **Usuários Públicos**: Podem navegar no catálogo, ver produtos e enviar contatos sem login
- **Administradores**: Devem fazer login para acessar o painel administrativo
- Acesse o painel admin em: `/admin`

---

## Painel Administrativo

### Acesso
1. Clique em **"Admin"** na navbar
2. Faça login com suas credenciais Manus
3. Você será redirecionado para o dashboard administrativo

### Dashboard
O dashboard mostra:
- **Total de Produtos**: Quantidade de produtos cadastrados
- **Contatos Não Lidos**: Notificações de novos contatos
- **Total de Contatos**: Histórico completo de contatos recebidos
- **Status**: Indicador de disponibilidade do sistema

---

## Gerenciamento de Produtos

### Adicionar Novo Produto
1. No painel admin, clique na aba **"Produtos"**
2. Clique em **"Novo Produto"**
3. Preencha os campos:
   - **Categoria**: Selecione uma categoria existente
   - **Nome do Produto**: Nome exato do produto
   - **Slug (URL)**: Identificador único (ex: `oximetro-digital`)
   - **Descrição**: Descrição detalhada do produto
   - **Preço**: Valor em reais (ex: 150.00)
   - **Imagens**: Faça upload de até 5 imagens
   - **Especificações Técnicas**: Adicione características do produto

4. Clique em **"Criar Produto"**

### Editar Produto
1. Na lista de produtos, clique em **"Editar"** no produto desejado
2. Modifique os campos necessários
3. Clique em **"Atualizar Produto"**

### Deletar Produto
1. Na lista de produtos, clique em **"Deletar"**
2. Confirme a exclusão
3. O produto será removido do catálogo

### Upload de Imagens
- Clique na área de upload ou arraste imagens
- Formatos aceitos: JPG, PNG, GIF
- Tamanho máximo: 5MB por imagem
- Máximo de 5 imagens por produto
- Clique no **X** para remover uma imagem

---

## Gerenciamento de Categorias

### Adicionar Categoria
1. Clique na aba **"Categorias"**
2. Clique em **"Nova Categoria"**
3. Preencha:
   - **Nome**: Nome da categoria (ex: "Oximetria")
   - **Slug**: Identificador único (ex: "oximetria")
   - **Descrição**: Descrição breve (opcional)
4. Clique em **"Criar"**

### Editar Categoria
1. Clique em **"Editar"** na categoria
2. Modifique os campos
3. Clique em **"Atualizar"**

### Deletar Categoria
1. Clique em **"Deletar"** na categoria
2. Confirme a exclusão

---

## Gerenciamento de FAQ

### Adicionar Pergunta Frequente
1. Clique na aba **"FAQ"**
2. Clique em **"Novo FAQ"**
3. Preencha:
   - **Pergunta**: Pergunta do cliente
   - **Resposta**: Resposta detalhada
   - **Ordem**: Posição na lista (0 = primeira)
4. Clique em **"Criar"**

### Editar FAQ
1. Clique em **"Editar"** no FAQ
2. Modifique os campos
3. Clique em **"Atualizar"**

### Deletar FAQ
1. Clique em **"Deletar"** no FAQ
2. Confirme a exclusão

---

## Configurações da Loja

### Acessar Configurações
1. Clique na aba **"Config"** no painel admin
2. Preencha os campos:

### Campos Disponíveis

| Campo | Descrição | Exemplo |
|-------|-----------|---------|
| **Nome da Loja** | Nome exibido no site | MedicalStore |
| **Número WhatsApp** | Para contato direto | +55 11 99999-9999 |
| **Email de Contato** | Email para receber notificações | contato@medicalstore.com |
| **Descrição da Loja** | Breve descrição do negócio | Produtos médicos de qualidade |
| **URL da Logo** | Link para a imagem da logo | https://... |

### Salvar Configurações
1. Após preencher os campos, clique em **"Salvar Configurações"**
2. Uma mensagem de sucesso aparecerá

---

## Contatos e Notificações

### Visualizar Contatos
1. Clique na aba **"Contatos"** no painel admin
2. A lista de contatos aparecerá à esquerda
3. Clique em um contato para ver os detalhes completos

### Contatos Não Lidos
- Contatos não lidos têm um indicador amarelo
- O número de contatos não lidos aparece na aba

### Marcar como Lido
1. Selecione um contato não lido
2. Clique em **"Marcar como Lido"**

### Responder Contato
Os contatos incluem:
- **Email**: Clique para enviar email
- **Telefone**: Clique para ligar
- **Tipo**: Indica se é "Dúvida Geral" ou "Pedido de Vendedor"

### Notificações Automáticas
Você receberá notificações automáticas quando:
- Um cliente enviar um contato
- Um cliente solicitar falar com vendedor
- Novas mensagens forem recebidas

---

## Frontend Público

### Página Inicial (Home)
- **Banner**: Apresentação da loja com chamada para ação
- **Destaques**: Produtos em destaque
- **Botões CTA**: "Ver Catálogo" e "Falar com Vendedor"

### Catálogo de Produtos
1. Clique em **"Catálogo"** na navbar
2. Veja todos os produtos em grade
3. **Filtrar por Categoria**: Selecione uma categoria no filtro
4. **Buscar Produto**: Use a barra de busca

### Detalhes do Produto
1. Clique em um produto no catálogo
2. Veja:
   - Galeria de imagens
   - Descrição completa
   - Preço
   - Especificações técnicas
3. **Botão "Falar com Vendedor"**: Abre opções de contato

### Contato com Vendedor
Duas opções disponíveis:
1. **WhatsApp**: Abre conversa direta no WhatsApp
2. **Formulário**: Preencha dados e envie mensagem

### FAQ Público
1. Clique em **"FAQ"** na navbar
2. Veja perguntas frequentes
3. Clique para expandir resposta

### Página de Contato
1. Clique em **"Contato"** na navbar
2. Escolha entre:
   - **WhatsApp**: Contato direto
   - **Email**: Enviar email
   - **Formulário**: Enviar mensagem

---

## Design e Cores

### Paleta de Cores
- **Vermelho Primário**: #DC2626 (botões, destaques)
- **Amarelo Secundário**: #FBBF24 (gradientes, acentos)
- **Branco**: #FFFFFF (fundo)
- **Cinza**: #6B7280 (texto secundário)

### Responsividade
O site é totalmente responsivo:
- **Desktop**: Experiência completa
- **Tablet**: Layout adaptado
- **Mobile**: Otimizado para telas pequenas

---

## Dicas e Boas Práticas

### Produtos
- ✅ Use nomes descritivos e claros
- ✅ Adicione especificações técnicas relevantes
- ✅ Faça upload de imagens de alta qualidade
- ✅ Mantenha preços atualizados

### FAQ
- ✅ Responda perguntas comuns dos clientes
- ✅ Use linguagem clara e profissional
- ✅ Organize por ordem de importância

### Configurações
- ✅ Mantenha WhatsApp e email atualizados
- ✅ Atualize a logo regularmente
- ✅ Revise a descrição da loja periodicamente

### Contatos
- ✅ Responda contatos rapidamente
- ✅ Marque como lido após responder
- ✅ Mantenha histórico de contatos

---

## Suporte e Troubleshooting

### Problemas Comuns

**Problema**: Não consigo fazer login
- **Solução**: Verifique suas credenciais Manus e tente novamente

**Problema**: Imagens não carregam
- **Solução**: Verifique o formato (JPG, PNG, GIF) e tamanho (<5MB)

**Problema**: Não recebo notificações
- **Solução**: Verifique se o email está correto nas configurações

**Problema**: Produto não aparece no catálogo
- **Solução**: Verifique se o produto está marcado como ativo

---

## Contato e Suporte

Para dúvidas ou problemas técnicos:
- 📧 **Email**: suporte@medicalstore.com
- 💬 **WhatsApp**: +55 11 99999-9999
- 🌐 **Website**: https://medicalstore.manus.space

---

**Última atualização**: Maio de 2026

Obrigado por usar MedicalStore! 🏥
