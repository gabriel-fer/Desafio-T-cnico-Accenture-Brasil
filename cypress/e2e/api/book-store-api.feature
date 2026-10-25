# language: pt


Funcionalidade: Fluxo integrado da API Book Store
  @api
  @smoke
  Cenário: Criar um usuário autorizado e alugar dois livros
    Dado que preparo credenciais exclusivas para a API Book Store
    Quando crio o usuário pela API
    E gero um token de acesso para esse usuário
    E confirmo que o usuário está autorizado pela API
    E consulto os livros disponíveis pela API
    E seleciono dois livros disponíveis
    E alugo os livros selecionados para esse usuário pela API
    Então os detalhes do usuário devem conter os livros alugados
