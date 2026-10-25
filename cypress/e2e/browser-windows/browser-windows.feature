
# language: pt

Funcionalidade: Browser Windows

  Como usuário do DemoQA
  Quero testar a abertura de novas janelas
  Para validar o comportamento do navegador

  @smoke
  Cenário: Abrir e validar uma nova janela
    Dado que acesso o site DemoQA
    Quando acesso a opção Browser Windows
    E clico no botão New Window
    Então uma nova janela deve ser solicitada
    E a página aberta deve exibir a mensagem "This is a sample page"
    Quando finalizo a validação da nova janela
    Então devo retornar à página Browser Windows
