# Desafio QA — DemoQA

## Sobre o projeto

Projeto de automação de testes end-to-end e de API para o site [DemoQA](https://demoqa.com/), desenvolvido com Cypress, JavaScript e Cucumber (BDD). Os cenários são escritos em Gherkin, separados por funcionalidade em `cypress/e2e` e implementados com Page Objects em `cypress/pages`.

O projeto cobre formulários, navegação entre janelas, gerenciamento de registros em tabela, ordenação de elementos, barra de progresso e operações da API Book Store. Os dados usados no formulário ficam em fixtures; os registros das tabelas e as credenciais da API são gerados dinamicamente para reduzir conflitos entre execuções.

## Cenários automatizados

### Practice Form

- Navega da página inicial até o formulário e verifica que ele foi exibido.
- Preenche o formulário com dados da fixture `cypress/fixtures/form-data.json`, incluindo gênero, telefone, data de nascimento, matéria, hobby, arquivo, endereço, estado e cidade.
- Envia o formulário, valida a confirmação e os dados apresentados e fecha o popup clicando fora do modal.

### Browser Windows

- Intercepta a chamada a `window.open` ao clicar em **New Window**.
- Abre a URL solicitada no contexto do Cypress, valida a mensagem **This is a sample page** e retorna à página Browser Windows.

### Web Tables

- Cria um registro com dados únicos e valida nome, sobrenome e departamento na linha correspondente.
- Cria e edita um registro, validando os dados atualizados.
- Cria e exclui um registro, validando que ele deixou de aparecer na tabela.
- Em um cenário de regressão, cria 12 registros dinâmicos, amplia a paginação para exibi-los e exclui todos, verificando que nenhum permanece.

### Sortable

- Arrasta os seis itens da lista para ordem crescente e valida a sequência completa.
- Repete a interação para ordem decrescente e valida a sequência.

### Progress Bar

- Inicia a barra, interrompe a execução ao atingir 24% e verifica que o valor não ultrapassa 25%.
- Aguarda a barra chegar a 100%, reinicia e verifica que retorna a zero.

### Book Store API

- Executa um fluxo integrado usando `cy.request()`: cria um usuário com credenciais exclusivas, gera token, verifica a autorização, consulta os livros disponíveis, seleciona dois títulos e os adiciona à coleção do usuário.
- Valida os status e respostas das operações e confirma, ao consultar os detalhes do usuário, que os dois livros alugados estão associados à conta.

## Organização

```text
cypress/
├── e2e/       # Features Gherkin e definições de passos por funcionalidade
├── fixtures/  # Dados de teste e arquivo usado no upload
├── pages/     # Page Objects da interface e da API
└── support/   # Configuração e comandos de suporte do Cypress
```

## Tecnologias

- Cypress
- JavaScript
- Cucumber / Gherkin (`@badeball/cypress-cucumber-preprocessor`)
- Page Object Model
- `@4tw/cypress-drag-drop` para as interações de arrastar e soltar

## Como executar

Instale as dependências:

```bash
npm install
```

Execute o primeiro cenário marcado com `@smoke` em cada arquivo `.feature`:

```bash
npm run test:smoke
```

Execute o cenário da API marcado com `@api`:

```bash
npm run test:api
```

Abra a interface do Cypress:

```bash
npx cypress open
```

Execute todos os arquivos `.feature` em modo headless:

```bash
npx cypress run
```

## Relatórios

As execuções por `cypress run` geram relatórios Cucumber com o resultado por cenário, os passos e detalhes de falhas:

- HTML: `cypress/reports/cucumber-report.html`
- JSON: `cypress/reports/cucumber-report.json`

O Cypress também captura screenshots quando um teste falha; elas são anexadas ao relatório HTML conforme a configuração do preprocessor.

## Observações

Os testes de interface e API usam o DemoQA público e dependem da disponibilidade e do comportamento atual desse serviço. Mudanças no site ou instabilidade da aplicação podem afetar os resultados. O fluxo de API cria usuários e associa livros durante a execução; as credenciais são geradas dinamicamente.

### Problemas de interação observados no site

Em execuções anteriores, algumas ações foram impedidas por comportamentos da interface do DemoQA. Esses relatos registram o que foi observado durante a automação e não confirmam, por si só, a causa ou a existência de um defeito permanente no site.

- **Web Tables — edição e exclusão:** os botões **Edit** e **Delete** eram encontrados na linha do registro, mas o Cypress reportava que estavam cobertos por outro elemento (`cy.click() failed because this element is being covered by another element`). Isso impedia a interação e podia fazer os cenários falharem mesmo com o registro localizado.
- **Practice Form — fechamento da confirmação:** o botão **Close** do modal apresentou comportamento inconsistente e não fechava a confirmação de forma confiável. O código atual tenta encerrar o modal clicando no backdrop; essa implementação não elimina o registro da falha anterior nem garante que o problema do site tenha sido resolvido.

Os cenários de edição e exclusão em Web Tables e de fechamento do popup permanecem documentados e implementados. A execução pode continuar sujeita a essas limitações de interação, além de mudanças ou instabilidade no site.

## Próximos passos

Integrar a execução a uma pipeline de CI para rodar os testes automaticamente nas branches de release e armazenar relatórios e screenshots como artefatos.
