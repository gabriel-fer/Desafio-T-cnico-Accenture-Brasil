
# language: pt

Funcionalidade: Gerenciamento de registros em Web Tables

  Como usuário do DemoQA
  Quero cadastrar, editar e excluir registros
  Para validar o gerenciamento da tabela

  @smoke
  Cenário: Criar um registro
    Dado que acesso a página Web Tables
    Quando cadastro um novo registro
    Então o registro deve aparecer na tabela

  Cenário: Editar um registro existente
    Dado que existe um registro para edição
    Quando altero os dados desse registro
    Então os dados atualizados devem aparecer na tabela

  Cenário: Excluir um registro existente
    Dado que existe um registro para exclusão
    Quando excluo esse registro
    Então o registro não deve aparecer na tabela

  @regression
  Cenário: Criar 12 registros dinâmicos e excluir todos
    Dado que acesso a página Web Tables
    Quando cadastro 12 registros com dados dinâmicos
    Então os 12 registros devem aparecer na tabela
    Quando excluo todos os 12 registros criados
    Então nenhum dos registros criados deve permanecer na tabela
