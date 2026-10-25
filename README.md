# Desafio QA --- DemoQA

## Sobre o projeto

Projeto de automação de testes end-to-end utilizando Cypress, JavaScript
e Cucumber (BDD), com organização por funcionalidade e uso do padrão
Page Object Model.

O projeto contempla cenários para: - Practice Form - Browser Windows -
Web Tables

## Observações e limitações encontradas durante os testes

Durante a execução dos testes no site [DemoQA](https://demoqa.com/),
foram observados comportamentos na interface que dificultaram a
automação de algumas ações. Os pontos abaixo foram registrados como
limitações encontradas durante a execução e podem depender do estado da
página, de elementos sobrepostos ou de mudanças na aplicação.

### 1. Web Tables --- ações de editar e excluir

Ao tentar clicar nos botões de ação **Edit** e **Delete** de um
registro, o Cypress apresentou erro de interação informando que o
elemento estava coberto por outro elemento da página.

Exemplo do erro observado:

> `cy.click() failed because this element is being covered by another element`

O elemento de ação era localizado corretamente no HTML, dentro da linha
(`<tr>`) correspondente ao registro, mas a interação era bloqueada pela
sobreposição reportada pelo Cypress. Por esse motivo, os cenários de
edição e exclusão podem falhar mesmo quando o registro é encontrado na
tabela.

### 2. Practice Form --- botão Close do formulário/modal

Em uma etapa anterior, o botão **Close** do modal também apresentou
comportamento inconsistente durante a automação. O fechamento não
ocorreu de forma confiável por meio do botão, exigindo investigação de
uma forma alternativa de encerrar o modal.

Esse comportamento foi registrado como uma limitação observada durante a
execução automatizada.

## Status das limitações

-   **Cadastro em Web Tables:** o registro aparentou ser inserido
    corretamente; a validação foi ajustada para localizar o e-mail na
    célula (`td`) e a linha correspondente (`tr`).
-   **Editar/Excluir em Web Tables:** interação bloqueada em algumas
    execuções porque os botões foram reportados como cobertos por outro
    elemento.
-   **Close no Practice Form:** comportamento inconsistente ao tentar
    fechar o modal pelo botão.

> **Nota:** estas observações descrevem o comportamento encontrado
> durante a execução dos testes. Não constituem confirmação definitiva
> de defeito no site; a causa pode estar relacionada à interface, a
> elementos sobrepostos, a anúncios ou ao estado da página no momento da
> execução.


### 1. Browser Windows --- abrir uma nova janela

Na pasta `cypress/e2e/browser-windows`, o cenario solicita a abertura de
uma nova janela, valida a mensagem exibida na pagina aberta e retorna a
pagina Browser Windows.

### 4. Sortable --- ordenar elementos

Na pasta `cypress/e2e/sortable`, os cenários organizam os elementos da
lista em ordem crescente e decrescente e validam a ordem apresentada na
página.

### 5. Progress Bar --- controlar a barra de progresso

Na pasta `cypress/e2e/progress-bar`, um cenário para a barra antes de
25% e valida o percentual atingido. Outro aguarda a conclusão em 100%,
reinicia a barra e verifica se ela retorna a zero.

## Integração dos testes de API

Os testes de API foram incluídos no mesmo projeto Cypress dos cenários de
interface. Dessa forma, o desafio técnico fica centralizado em um só
repositório e pode ser executado e acompanhado junto aos demais testes.

### 6. Book Store API --- fluxo integrado

Na pasta `cypress/e2e/api`, o cenário integrado cria um usuário com
credenciais exclusivas, gera um token, confirma a autorização, consulta
os livros disponíveis, aluga dois livros e valida os livros associados
nos detalhes do usuário. As requisições ficam centralizadas no Page
Object `cypress/pages/api/book-store-api.page.js` e usam `cy.request()`.

## Tecnologias

-   Cypress
-   JavaScript
-   Cucumber / Gherkin
-   Page Object Model

## Como executar

Instale as dependências:

``` bash
npm install
```

Para executar somente o primeiro cenário de cada arquivo `.feature`,
marcado com a tag `@smoke`, rode:

```bash
npm run test:smoke
```

Para executar os cenários de API do arquivo
`cypress/e2e/api/book-store-api.feature`, rode:

```bash
npm run test:api
```

Abra o Cypress:

``` bash
npx cypress open
```

Ou execute os testes em modo headless:

``` bash
npx cypress run
```

## Relatorios de execucao

Ao executar os testes com `cypress run` (incluindo `npm run test:smoke` e `npm run test:api`), o preprocessor gera relatorios com resultado por cenario, passos executados e detalhes dos erros:

- HTML: `cypress/reports/cucumber-report.html`
- JSON: `cypress/reports/cucumber-report.json`

O relatorio HTML inclui screenshots dos cenarios que falharem. Abra o arquivo HTML no navegador para consultar os cenarios, passos e erros.
## Objetivo

Documentar os cenários automatizados, os resultados observados e as
limitações de interação encontradas durante a execução, mantendo
transparência sobre os pontos que precisam de investigação adicional.
