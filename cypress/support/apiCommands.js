Cypress.Commands.add('addProductToCart', (idProduct) => {
  cy.request({
    url: `https://qastoredesafio.lojaintegrada.com.br/carrinho/produto/${idProduct}/adicionar`,
    method: 'GET',
  })
})

Cypress.Commands.add('addCouponAPI', (typeShipping, nameCoupon) => {
  cy.api('GET',
    `https://qastoredesafio.lojaintegrada.com.br/carrinho/valor/?envio_id=${typeShipping}&envio_code=SEDEX&valor_frete=0&valor_subtotal=58&cupom=${nameCoupon}`
  )
})