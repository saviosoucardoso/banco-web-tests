# Banco Web Tests

Suite de testes automatizados para a aplicação web bancária utilizando **Cypress** e **JavaScript**.

## 📋 Objetivo do Projeto

Este projeto implementa testes automatizados end-to-end (E2E) para validar as funcionalidades principais da aplicação web bancária, com foco em:

- ✅ Autenticação e login de usuários
- ✅ Realização de transferências entre contas
- ✅ Validação de regras de negócio (limite de transferência, autenticação)
- ✅ Tratamento de erros e mensagens de feedback

Os testes garantem a qualidade e a confiabilidade da aplicação através de automação robusta e relatórios detalhados.

---

## 🏗️ Componentes do Projeto

### Estrutura de Diretórios

```
banco-web-tests/
├── cypress/
│   ├── e2e/                    # Testes end-to-end
│   │   ├── login.cy.js         # Testes de autenticação
│   │   └── transferencia.cy.js # Testes de transferências
│   ├── fixtures/               # Dados de teste (fixtures)
│   │   ├── credenciais.json    # Credenciais para testes
│   │   └── example.json
│   ├── support/                # Configurações e commands
│   │   ├── e2e.js             # Configuração geral
│   │   └── commands/           # Custom commands reutilizáveis
│   │       ├── commands.js     # Commands genéricos
│   │       └── transferencia.js # Commands de transferência
│   └── reports/                # Relatórios gerados (HTML)
├── cypress.config.js           # Configuração do Cypress
├── package.json                # Dependências do projeto
└── README.md                   # Este arquivo

```

### Dependências Principais

- **Cypress** (^15.19.0) - Framework de testes E2E
- **cypress-mochawesome-reporter** (^5.0.0) - Gerador de relatórios em HTML

---

## 🚀 Instalação e Execução

### Pré-requisitos

Antes de executar os testes, você precisa ter em execução:

1. **API do Banco** - Repositório: https://github.com/juliodelimas/banco-api
2. **Aplicação Web** - Repositório: https://github.com/juliodelimas/banco-web

Ambas precisam estar rodando localmente para que os testes funcionem corretamente.

### Passo 1: Clonar o Repositório

```bash
git clone https://github.com/saviosoucardoso/banco-web-tests.git
cd banco-web-tests
```

### Passo 2: Instalar Dependências

```bash
npm install
```

### Passo 3: Iniciar a API e a Aplicação Web

Em terminais separados, execute:

```bash
# Terminal 1 - API
cd banco-api
npm start

# Terminal 2 - Aplicação Web
cd banco-web
npm start
```

A aplicação web deve estar disponível em `http://localhost:4000`

### Passo 4: Executar os Testes

#### Modo Headless (sem interface visual)

```bash
npm test
```

#### Modo Headed (com interface visual do navegador)

```bash
npm run test:headed
```

#### Abrir o Cypress Test Runner (interface interativa)

```bash
npm run cy:open
```

---

## 📊 Relatórios

Após a execução dos testes, um relatório HTML é gerado automaticamente em:

```
cypress/reports/html/index.html
```

Abra este arquivo em um navegador para visualizar:

- ✅ Testes passados/falhados
- 📸 Screenshots e vídeos
- 📈 Estatísticas de execução
- ⏱️ Tempo de execução

---

## 🧪 Documentação dos Testes

### 1. Login (login.cy.js)

**Suite de testes para autenticação de usuários**

#### Teste: "Login com dados válidos deve permitir acesso ao sistema"

- **Objetivo**: Validar que um usuário com credenciais corretas consegue acessar o sistema
- **Passos**:
  1. Acessar a página inicial
  2. Preenchera campos de usuário e senha com dados válidos
  3. Clicar no botão "Entrar"
- **Resultado esperado**: Deve visualizar a seção "Realizar Transferência"
- **Dados usados**: `credenciais.json` → `valida`

#### Teste: "Login com dados inválidos não deve permitir acesso ao sistema"

- **Objetivo**: Validar que o sistema rejeita credenciais inválidas
- **Passos**:
  1. Acessar a página inicial
  2. Preencher os campos com credenciais inválidas
  3. Clicar no botão "Entrar"
- **Resultado esperado**: Deve exibir a mensagem de erro "Erro no login. Tente novamente."
- **Dados usados**: `credenciais.json` → `invalida`

### 2. Transferências (transferencia.cy.js)

**Suite de testes para operações de transferência entre contas**

#### Setup (beforeEach)

Antes de cada teste:

- Acessa a página inicial
- Realiza login com dados válidos
- Garante que o usuário está autenticado

#### Teste: "Deve transferir quando os dados forem válidos"

- **Objetivo**: Validar que uma transferência com dados válidos é realizada com sucesso
- **Passos**:
  1. Autenticar (beforeEach)
  2. Selecionar conta de origem: "Ana Pereira"
  3. Selecionar conta de destino: "Carlos Mendes"
  4. Inserir valor: "100"
  5. Clicar em "Transferir"
- **Resultado esperado**: Mensagem "Transferência realizada!" é exibida

#### Teste: "Deve apresentar erro quando transferir mais de 5 mil sem token"

- **Objetivo**: Validar regra de negócio: transferências > R$5.000 requerem autenticação
- **Passos**:
  1. Autenticar (beforeEach)
  2. Selecionar conta de origem: "Ana Pereira"
  3. Selecionar conta de destino: "Carlos Mendes"
  4. Inserir valor: "6000"
  5. Clicar em "Transferir"
- **Resultado esperado**: Mensagem "Autenticação necessária para transferências acima de R$5.000,00."
- **Status**: ⚠️ Marcado como `it.only` (apenas este teste executa)

---

## ⚙️ Custom Commands

Custom commands são funções reutilizáveis que simplificam e padronizam as ações nos testes.

### Arquivo: commands.js

#### 1. `cy.verificarMensagemNoToast(mensagem)`

**Propósito**: Validar mensagens de feedback exibidas em toast notifications

**Sintaxe**:

```javascript
cy.verificarMensagemNoToast("Seu texto de mensagem");
```

**Exemplo de uso**:

```javascript
cy.verificarMensagemNoToast("Erro no login. Tente novamente.");
cy.verificarMensagemNoToast("Transferência realizada!");
```

**Como funciona**:

- Localiza o elemento com classe `.toast`
- Verifica se o texto corresponde exatamente à mensagem esperada

---

#### 2. `cy.selecionarOpcaoNaCombobox(labelDoCampo, opcao)`

**Propósito**: Selecionar uma opção em campos de seleção (combobox/dropdown)

**Sintaxe**:

```javascript
cy.selecionarOpcaoNaCombobox("id-do-campo", "Opção Desejada");
```

**Exemplo de uso**:

```javascript
cy.selecionarOpcaoNaCombobox("conta-origem", "Ana Pereira");
cy.selecionarOpcaoNaCombobox("conta-destino", "Carlos Mendes");
```

**Como funciona**:

1. Encontra o label correspondente ao campo usando `labelDoCampo`
2. Acessa o elemento pai do label
3. Clica para abrir o dropdown
4. Procura e clica na opção desejada

---

### Arquivo: transferencia.js

#### 3. `cy.realizarTransferencia(contaOrigem, contaDestino, valor)`

**Propósito**: Executar uma transferência completa entre contas

**Sintaxe**:

```javascript
cy.realizarTransferencia("Conta Origem", "Conta Destino", "Valor");
```

**Exemplo de uso**:

```javascript
cy.realizarTransferencia("Ana Pereira", "Carlos Mendes", "100");
cy.realizarTransferencia("Ana Pereira", "Carlos Mendes", "6000");
```

**Como funciona**:

1. Utiliza `cy.selecionarOpcaoNaCombobox()` para selecionar conta de origem
2. Utiliza `cy.selecionarOpcaoNaCombobox()` para selecionar conta de destino
3. Localiza o campo de valor (#valor) e insere o valor
4. Clica no botão "Transferir"

**Parâmetros**:

- `contaOrigem` (string): Nome da conta de origem
- `contaDestino` (string): Nome da conta de destino
- `valor` (string): Valor da transferência em formato numérico

---

## 📝 Dados de Teste (Fixtures)

### credenciais.json

Contém as credenciais usadas nos testes:

```json
{
  "valida": {
    "usuario": "seu_usuario",
    "senha": "sua_senha"
  },
  "invalida": {
    "usuario": "usuario_errado",
    "senha": "senha_errada"
  }
}
```

Atualize este arquivo com as credenciais corretas da sua aplicação de teste.

---

## 🔧 Configuração (cypress.config.js)

```javascript
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,
  e2e: {
    baseUrl: "http://localhost:4000", // URL base da aplicação
    reporter: "cypress-mochawesome-reporter", // Gerador de relatórios
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
    }
  }
});
```

---

## 📌 Dicas e Boas Práticas

1. **Sempre verifique se a API e a aplicação web estão rodando** antes de executar os testes
2. **Use fixtures** para dados dinâmicos - facilita a manutenção dos testes
3. **Custom commands reutilizáveis** reduzem duplicação e melhoram a legibilidade
4. **Consulte os relatórios HTML** para entender falhas ou gerar evidências
5. **Use `cy.screenshot()`** nos testes para capturar estados importantes
6. **Mantenha os testes independentes** - cada teste deve poder rodar isoladamente

---

## 🐛 Troubleshooting

### Testes não encontram elementos

- Verifique se os seletores CSS estão corretos
- Confirme que a aplicação web está rodando

### Mensagens de timeout

- Aumentar o timeout: `cy.get(".elemento", { timeout: 10000 })`
- Verificar se a API responde corretamente

### Relatórios não são gerados

- Verificar se `cypress-mochawesome-reporter` está instalado: `npm install`
- Confirmar que `cypress/reports/html/` existe

---

## 📚 Recursos Úteis

- [Documentação Cypress](https://docs.cypress.io)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Cypress Custom Commands](https://docs.cypress.io/api/cypress-api/custom-commands)

---

## 👥 Autor

Projeto desenvolvido para testes automatizados da aplicação bancária web.

**Repositório**: https://github.com/saviosoucardoso/banco-web-tests

---

## 📄 Licença

ISC
