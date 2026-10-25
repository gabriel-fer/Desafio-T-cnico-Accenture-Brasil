# language: pt

Funcionalidade: Barra de progresso

  @smoke
  Cenário: Parar a barra antes de atingir 25%
    Dado que acesso a página Progress Bar
    Quando inicio a barra de progresso
    E paro a barra antes de atingir 25%
    Então o valor da barra deve ser menor ou igual a 25%

  Cenário: Reiniciar a barra após atingir 100%
    Dado que acesso a página Progress Bar
    Quando inicio a barra de progresso
    E aguardo a barra atingir 100%
    E a barra deve apresentar 100%
    E reinicio a barra de progresso
    Então a barra deve retornar a zero
