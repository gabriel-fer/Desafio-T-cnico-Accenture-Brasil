
# language: pt

Funcionalidade: Formulário de cadastro DemoQA

  Como usuário do DemoQA
  Quero preencher o formulário de cadastro
  Para validar o envio dos dados

  @smoke
  Cenário: Navegar até o formulário
    Dado que acesso o site DemoQA
    Quando abro a página Practice Form
    Então o formulário deve ser exibido

  Cenário: Enviar formulário com dados válidos
    Dado que acesso a página Practice Form
    Quando preencho o formulário com dados válidos
    E envio o formulário
    E devo visualizar a confirmação do envio
    E os dados enviados devem estar corretos
    E fecho o popup
    Então o popup não deve mais ser exibido
