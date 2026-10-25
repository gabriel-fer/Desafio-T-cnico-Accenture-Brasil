# language: pt

Funcionalidade: Ordenação de elementos

  @smoke
  Cenário: Organizar elementos em ordem crescente
    Dado que acesso a página Sortable
    Quando organizo os elementos em ordem crescente
    Então os elementos devem estar em ordem crescente

  Cenário: Organizar elementos em ordem decrescente
    Dado que acesso a página Sortable
    Quando organizo os elementos em ordem decrescente
    Então os elementos devem estar em ordem decrescente
