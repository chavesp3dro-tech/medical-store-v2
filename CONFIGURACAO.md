# MedicalStore - Instruções de Configuração

Este documento descreve como configurar e personalizar sua loja MedicalStore.

## 🚀 Configuração Inicial

### 1. Acesso ao Painel Admin

1. Navegue até: `/admin`
2. Faça login com suas credenciais Manus
3. Você verá o dashboard administrativo

### 2. Configurar Informações da Loja

1. Clique na aba **"Config"** no painel admin
2. Preencha os seguintes campos:

#### Nome da Loja
- Campo: "Nome da Loja"
- Exemplo: `MedicalStore`
- Exibição: Aparece na navbar e título do site

#### Número WhatsApp
- Campo: "Número WhatsApp"
- Formato: `+55 11 99999-9999` (com código do país)
- Uso: Botões de contato direto via WhatsApp

#### Email de Contato
- Campo: "Email de Contato"
- Exemplo: `contato@medicalstore.com`
- Uso: Receber notificações de novos contatos

#### Descrição da Loja
- Campo: "Descrição da Loja"
- Exemplo: `Produtos médicos e hospitalares de qualidade`
- Exibição: Página inicial e sobre

#### Logo da Loja
- Campo: "URL da Logo"
- Formato: URL completa (ex: `https://...`)
- Tamanho recomendado: 200x50px
- Exibição: Navbar (canto superior esquerdo)

3. Clique em **"Salvar Configurações"**

---

## 📁 Estrutura de Categorias

### Criar Categorias Base

Recomendamos criar as seguintes categorias:

1. **Oximetria**
   - Slug: `oximetria`
   - Descrição: Equipamentos para medição de oxigênio

2. **Pressão Arterial**
   - Slug: `pressao-arterial`
   - Descrição: Medidores de pressão

3. **Termometria**
   - Slug: `termometria`
   - Descrição: Termômetros digitais

4. **Consumíveis**
   - Slug: `consumiveis`
   - Descrição: Produtos descartáveis e consumíveis

5. **Equipamentos Hospitalares**
   - Slug: `equipamentos-hospitalares`
   - Descrição: Equipamentos para hospitais

---

## 🛍️ Adicionar Produtos

### Processo Passo a Passo

1. Acesse o painel admin → aba **"Produtos"**
2. Clique em **"Novo Produto"**
3. Preencha os campos:

#### Categoria
- Selecione uma categoria existente
- Se não existir, crie primeiro em "Categorias"

#### Nome do Produto
- Exemplo: `Oxímetro de Dedo Digital`
- Seja descritivo e claro

#### Slug (URL)
- Exemplo: `oximetro-dedo-digital`
- Regras:
  - Apenas letras minúsculas
  - Use hífens para separar palavras
  - Sem espaços ou caracteres especiais

#### Descrição
- Descreva o produto em detalhes
- Inclua benefícios e usos
- Máximo 500 caracteres recomendado

#### Preço
- Formato: `150.00` (com ponto decimal)
- Sem símbolo de moeda
- Será exibido como "R$ 150,00"

#### Imagens
- Clique para selecionar ou arraste imagens
- Formatos: JPG, PNG, GIF
- Tamanho máximo: 5MB por imagem
- Máximo: 5 imagens por produto
- Dica: Primeira imagem será a principal

#### Especificações Técnicas
- Clique em **"+ Adicionar Especificação"**
- Exemplo:
  - Especificação: `Precisão`
  - Valor: `±2%`
- Adicione quantas forem necessárias

4. Clique em **"Criar Produto"**

### Exemplo Completo

```
Categoria: Oximetria
Nome: Oxímetro de Dedo Digital com Bluetooth
Slug: oximetro-dedo-digital-bluetooth
Descrição: Oxímetro portátil com display OLED, conectividade Bluetooth e bateria de longa duração. Ideal para monitoramento contínuo de pacientes.
Preço: 299.90
Imagens: [imagem1.jpg, imagem2.jpg, imagem3.jpg]
Especificações:
  - Precisão: ±2%
  - Alcance SpO2: 70-100%
  - Bateria: 30 horas
  - Conectividade: Bluetooth 5.0
```

---

## ❓ Configurar FAQ

### Adicionar Perguntas Frequentes

1. Acesse o painel admin → aba **"FAQ"**
2. Clique em **"Novo FAQ"**
3. Preencha:

#### Pergunta
- Exemplo: `Como calibrar o oxímetro?`
- Seja conciso e claro

#### Resposta
- Forneça resposta completa e útil
- Use linguagem clara
- Máximo 1000 caracteres recomendado

#### Ordem
- Número para ordenação (0 = primeira)
- Use números sequenciais

4. Clique em **"Criar"**

### Exemplos de FAQ

1. **Pergunta**: Como usar o oxímetro?
   - **Ordem**: 0
   - **Resposta**: Coloque o dedo no sensor, aguarde 3-5 segundos para leitura...

2. **Pergunta**: Qual é a garantia?
   - **Ordem**: 1
   - **Resposta**: Todos os produtos têm garantia de 12 meses...

3. **Pergunta**: Como fazer pedidos?
   - **Ordem**: 2
   - **Resposta**: Clique em "Falar com Vendedor" para solicitar orçamento...

---

## 🎨 Personalização de Design

### Cores Padrão

A loja usa a seguinte paleta:

| Elemento | Cor | Código |
|----------|-----|--------|
| Primária | Vermelho | #DC2626 |
| Secundária | Amarelo | #FBBF24 |
| Fundo | Branco | #FFFFFF |
| Texto | Cinza Escuro | #1F2937 |

### Modificar Cores (Avançado)

Para modificar as cores, edite `client/src/index.css`:

```css
@layer base {
  :root {
    --primary: 220 13% 47%; /* Vermelho */
    --primary-foreground: 0 0% 100%;
    --secondary: 45 96% 56%; /* Amarelo */
    --secondary-foreground: 0 0% 0%;
    /* ... outras cores ... */
  }
}
```

---

## 📧 Configurar Notificações

### Receber Notificações de Contatos

1. Configure o email correto em **"Config"**
2. Você receberá notificações quando:
   - Um cliente enviar um contato
   - Um cliente solicitar falar com vendedor

### Tipos de Notificações

| Tipo | Gatilho |
|------|---------|
| Novo Contato | Cliente preenche formulário de contato |
| Pedido de Vendedor | Cliente clica em "Falar com Vendedor" |

---

## 🔐 Segurança

### Proteção de Dados

- ✅ Senhas são criptografadas
- ✅ Dados de contato são protegidos
- ✅ Apenas admins podem gerenciar produtos
- ✅ Acesso ao painel requer autenticação

### Boas Práticas

1. **Mude sua senha regularmente**
2. **Não compartilhe credenciais de admin**
3. **Revise contatos regularmente**
4. **Faça backup de dados importantes**

---

## 🚀 Otimizações

### Performance

- ✅ Imagens são otimizadas automaticamente
- ✅ Cache de produtos é atualizado em tempo real
- ✅ Banco de dados é indexado para buscas rápidas

### SEO (Search Engine Optimization)

- Use slugs descritivos
- Preencha descrições completas
- Mantenha FAQ atualizado
- Use palavras-chave relevantes

---

## 📱 Responsividade

O site é otimizado para:

- **Desktop**: 1920x1080 e maiores
- **Tablet**: 768x1024
- **Mobile**: 375x667 e maiores

Teste em diferentes dispositivos para melhor experiência.

---

## 🔧 Troubleshooting

### Problema: Produtos não aparecem

**Solução**:
1. Verifique se o produto foi criado com sucesso
2. Verifique se a categoria existe
3. Tente recarregar a página

### Problema: Imagens não carregam

**Solução**:
1. Verifique o formato (JPG, PNG, GIF)
2. Verifique o tamanho (<5MB)
3. Tente fazer upload novamente

### Problema: Não recebo notificações

**Solução**:
1. Verifique o email em "Config"
2. Verifique a pasta de spam
3. Tente enviar um contato de teste

---

## 📞 Suporte

Para dúvidas sobre configuração:

- 📧 Email: suporte@medicalstore.com
- 💬 WhatsApp: +55 11 99999-9999
- 🌐 Website: https://medicalstore.manus.space

---

**Última atualização**: Maio de 2026

Boa sorte com sua loja! 🏥
