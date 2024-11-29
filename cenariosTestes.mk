Objetivo do Documento
Este documento tem como objetivo descrever os cenários de teste para a nova feature de cupons de desconto no carrinho de compras.

O carrinho de compras é um componente essencial para o funcionamento de um Ecommerce, permitindo que os clientes selecionem e adicionem produtos para finalizar suas compras. A implementação de cupons de desconto busca aumentar a taxa de conversão, permitindo que os clientes obtenham benefícios nos preços dos produtos. Essa funcionalidade, apesar de adicional, é crítica, pois erros em sua aplicação podem gerar prejuízos financeiros e reclamações dos clientes.

Cenários de testes mapeados:

Cenário 1: Aplicação do cupom FRETEGRATIS no produto adicionado ao carrinho
  - Objetivo: Verificar se o cupom FRETEGRATIS é aplicado corretamente e o frete é removido.
  - Passos do teste:
      1. Dado que um produto foi adicionado ao carrinho de compras.
      2. E o cliente acessou a página do carrinho.
      3. Quando o cliente inserir o cupom "FRETEGRATIS" no campo "Cupom de desconto".
      4. E clicar no botão "Aplicar cupom".
      5. Então, o valor do frete deve ser atualizado para zero.
      6. E o sistema deve exibir uma mensagem confirmando que o frete grátis foi aplicado com sucesso.

Cenário 2: Aplicação do cupom 10OFF no produto adicionado ao carrinho
  - Objetivo: Verificar se o cupom 10OFF é aplicado corretamente e se o valor do desconto e do frete são atualizados.
  - Passos do teste:
      1. Dado que o cliente adicionou um produto com valor inteiro (sem centavos) ao carrinho.
      2. E o cliente acessou a página do carrinho.
      3. Quando o cliente inserir o cupom "10OFF" no campo "Cupom de desconto".
      4. E clicar no botão "Aplicar cupom".
      5. Então, o valor do produto deve ser reduzido em 10%.
      6. E o sistema deve exibir o preço do produto com o desconto aplicado, juntamente com o valor do frete.

Cenário 3: [Erro] no cupom 10OFF ao aplicar em produtos com valor com centavos
    - Objetivo: Verificar que o cupom 10OFF está aplicando o desconto incorretamente em produtos com valor com centavos.
    - Passos do teste:
        1. Dado que um produto com valor em centavos foi adicionado ao carrinho.
        2. Quando o cliente inserir o cupom "10OFF" no campo "Cupom de desconto".
        3. E clicar em "Aplicar cupom".
        3. Então, o desconto aplicado não deve estar correto, pois o valor do produto com centavos está sendo calculado de forma errada.
  
Cenário 4: Aplicação do cupom 30REAIS no produto adicionado ao carrinho
  - Objetivo: Verificar se o cupom 30REAIS é aplicado corretamente no valor do produto.
  - Passos do teste:
      1. Dado que o cliente adicionou um produto ao carrinho.
      2. E entrou na página do carrinho.
      3. Quando o cliente inserir o cupom "30REAIS" no campo "Cupom de desconto".
      4. E clicar em "Aplicar cupom".
      5. Então, o valor do produto deve ser reduzido em 30 reais.
      6. E o cliente deve visualizar o preço do produto com o desconto, incluindo o valor do frete.

Cenário 5: Aplicação do cupom 20LIMITADO no produto adicionado ao carrinho
  - Objetivo: Verificar se o cupom 20LIMITADO é aplicado corretamente, considerando a restrição de uso.
  - Passos do teste:
      1. Dado que o cliente adicionou um produto ao carrinho.
      2. E entrou na pagina do carrinho.
      3. Quando o cliente inserir o cupom "20LIMITADO" no campo "Cupom de desconto".
      4. E clicar em "Aplicar cupom".
      5. Então, o valor do produto deve ser reduzido em 20 reais ou 20% (dependendo da regra do cupom).
      6. Se o cupom não puder ser aplicado (excedido o limite), o sistema deve exibir a mensagem "Uso excedido, por favor tente outro cupom".
      
Cenário 6: Adicionar o cupom AJJFLWBHH no produto adicionado ao carrinho
  - Objetivo: Verificar se o cupom AJJFLWBHH é aplicado corretamente ao pedido.
  - Observação: O nome do cupom "AJJFLWBHH" não especifica claramente qual benefício ele deve proporcionar (exemplo: desconto em valor fixo ou percentual, ou algum outro benefício). A descrição do comportamento esperado deve ser validada.
  - Passos do teste:
      1. Dado que o cliente adicionou um produto ao carrinho.
      2. E entrou na pagina do carrinho.
      3. Quando o cliente inserir o cupom "AJJFLWBHH" no campo "Cupom de desconto".
      4. E clicar em "Usar cupom".
      5. Então, o valor do pedido deve receber um desconto de 5% sobre o total do pedido (incluindo o valor do frete).
      6. E o sistema deve mostrar o preço final do pedido com o desconto aplicado, destacando o valor do desconto e o novo total, para que o cliente veja o preço final.

Cenário 7: Adicionar o cupom CUPOMVENCIDO no produto adicionado ao carrinho
  - Objetivo: Verificar se o cupom "CUPOMVENCIDO" retorna corretamente a mensagem de erro para o cliente.
  - Passos do teste:
      1. Dado que o cliente adicionou um produto ao carrinho.
      2. E entrou na página do carrinho.
      3. Quando o cliente inserir o cupom "CUPOMVENCIDO" no campo "Cupom de desconto".
      4. E clicar em "Aplicar cupom".
      5. Então, o sistema deve exibir a mensagem "Esse cupom já excedeu o seu tempo de uso, insira outro" para o cliente.
      6. E o preço do produto deve permanecer inalterado, com o valor do frete sendo exibido separadamente.

Cenário 8: Adicionar os cupons com dois produtos iguais no carrinho
  - Objetivo: Verificar se os resultados serão iguais aos cenários em que somente um produto é adicionado ao carrinho.
  - Passos do teste:
      1. Dado que o cliente adicionou dois produtos iguais ao carrinho.
      2. E entrou na página do carrinho.
      3. Quando o cliente inserir um dos cupons válidos no campo "Cupom de desconto".
      4. E clicar em "Usar cupom".
      5. Então, o resultado do desconto aplicado deve ser o mesmo do que ocorre quando apenas um produto é adicionado ao carrinho.

Cenário 9: Adicionar os cupons com dois produtos diferentes no carrinho
  - Objetivo: Verificar se os resultados serão iguais aos cenários em que somente um produto é adicionado ao carrinho.
  - Passos do teste:
      1. Dado que o cliente adicionou dois produtos diferentes ao carrinho.
      2. E entrou na pagina do carrinho.
      3. Quando o cliente inserir um dos cupons válidos no campo "Cupom de desconto".
      4. E clicar em "Usar cupom".
      5. Então, o resultado do desconto aplicado deve ser o mesmo do que ocorre quando apenas um produto é adicionado ao carrinho.

Cenário 10: Adicionar os cupons com um produto existente no carrinho e depois adicionar outro produto no carrinho
  - Objetivo: Verificar se os cupons aplicam o desconto corretamente no pop-up do carrinho.
  - Passos do teste:
      1. Dado que o cliente tenha um produto adicionado ao carrinho.
      2. Quando o cliente inserir um dos cupons válidos no campo "Cupom de desconto".
      3. E adicionar outro produto ao carrinho.
      4. E abrir o pop-up de visualização do carrinho.
      5. Então o desconto deve ser aplicado corretamente no pop-up do carrinho (o desconto não está calculado no subtotal).

Cenário 11: Adicionar um produto de 7,74 reais e utilizar o cupom de 30 reais
  - Objetivo: Verificar se o cupom de 30 reais é aplicado corretamente, sem deixar o valor do produto negativo.
  - Passos do teste:
      1. Dado que o cliente adicionou um produto de 7,74 reais ao carrinho.
      2. Quando o cliente inserir o cupom de 30 reais no campo de "Cupom de desconto".
      3. Então o desconto não deve permitir que o valor do produto fique negativo.

Cenário 12: Adicionar um produto com preço promocional e utilizar os cupons
  - Objetivo: Verificar se os cupons são aplicados corretamente em produtos com preço promocional.
  - Passos do teste:
      1. Dado que o cliente adicionou um produto com preço promocional ao carrinho.
      2. Quando o cliente inserir os cupons existentes no campo de "Cupom de desconto".
      3. Então os cupons devem ser aplicados corretamente, de acordo com as regras definidas (seja um desconto fixo ou percentual).

Cenário 13: Tentando adicionar dois cupons via API
    - Objetivo: Verificar que não é permitido adicionar dois cupons ao carrinho via API.
    - Passos do teste:
        1. Dado que um produto foi adicionado ao carrinho.
        2. Quando a API for chamada para adicionar dois cupons diferentes (fazendo duas requisições GET de cupons).
        3. Então, apenas o último cupom aplicado na requisição deve ser mantido, e o primeiro deve ser descartado.

Cenário 14: Validando o Cupom FRETEGRATIS no Checkout
    - Objetivo: Verificar se o cupom "FRETEGRATIS" está sendo aplicado corretamente, mostrando o frete grátis no checkout.
    - Passos do teste:
        1. Dado que um produto foi adicionado ao carrinho.
        2. E o cliente inseriu o cupom "FRETEGRATIS" no campo de cupons.
        3. Quando o cliente clicar em "Finalizar Compra".
        4. E for redirecionado para a página de checkout.
        5. Então o cupom de Frete Grátis deve ser exibido na página de checkout.
        6. E o valor do frete deve aparecer como zero.

Cenário 15: Validando o Cupom 10OFF no Checkout
    - Objetivo: Verificar se o cupom "10OFF" aplica corretamente o desconto de 10% no produto durante o checkout.
    - Passos do teste:
        1. Dado que um produto foi adicionado ao carrinho.
        2. E o cliente inseriu o cupom "10OFF" no campo de cupons.
        3. Quando o cliente clicar em "Finalizar Compra".
        4. E for redirecionado para a página de checkout.
        5. Então o cupom "10OFF" deve ser aplicado corretamente, descontando 10% do valor do produto no checkout.

Cenário 16: Validando o Cupom AJJFLWBHH no Checkout
    - Objetivo: Verificar se o cupom "AJJFLWBHH" aplica corretamente o desconto de 5% no produto durante o checkout.
    - Passos do teste:
        1. Dado que um produto foi adicionado ao carrinho.
        2. E o cliente inseriu o cupom "AJJFLWBHH" no campo de cupons.
        3. Quando o cliente clicar em "Finalizar Compra".
        4. E for redirecionado para a página de checkout.
        5. Então o cupom "AJJFLWBHH" deve ser aplicado corretamente, descontando 5% do valor do produto no checkout.

Cenário 17: Adicionar o cupom limitado por categoria de produto
    Objetivo: Verificar se o cupom é aplicado apenas a produtos de categorias específicas no carrinho.
    Passos do Teste:
      1. Dado que o cliente adicionou produtos de diferentes categorias no carrinho.
      2. Quando o cliente inserir o cupom.
      3. Então verificar se o cupom funciona para diferentes categorias no carrinho.

Cenário 18: Verificando se o cupom tem um valor mínimo de compra
    Objetivo: Verificar se o cupom é aplicado apenas quando o valor total do carrinho atende ao valor mínimo exigido.
    Passos do Teste:
      1. Dado que o cliente adicionou produtos no carrinho com um valor total abaixo do valor mínimo exigido pelo cupom.
      2. Quando o cliente tentar aplicar o cupom.
      3. Então o sistema não tem um valor mínimo de compra.

Cenário 19: Verificando se o cupom é somente para novos clientes
    Objetivo: Verificar se o sistema impede o uso do cupom para clientes antigos.
    Passos do Teste:
      1. Dado que um cliente já realizou compras anteriormente.
      2. Quando o cliente tentar usar um cupom exclusivo para novos clientes.
      3. Então uma mensagem de erro deve ser exibida.

Cenário 20: Inserir um cupom inválido e depois um válido
    Objetivo: Verificar se o cupom válido é aceito após uma tentativa frustrada com um cupom inválido.
    Passos do teste:
      1. Dado que o cliente adicionou produtos ao carrinho.
      2. Quando o cliente inserir um cupom inválido.
      3. E depois inserir um cupom válido.
      4. Então o desconto do cupom válido deve ser aplicado corretamente.

Cenário 21: Validando os payloads dos cupons inseridos no carrinho 
    Objetivo: Verificar os campos de desconto, tipo_desconto e desconto_cupom no payload da requisição.
    Passos do teste:
        1. Dado que um cupom foi adicionado ao carrinho.
        2. Quando verificar o payload da requisição que processa a adição do cupom no carrinho.
        3. Então o payload deve conter os seguintes campos:
            - DESCONTO
            - TIPO_DESCONTO
            - DESCONTO_CUPOM