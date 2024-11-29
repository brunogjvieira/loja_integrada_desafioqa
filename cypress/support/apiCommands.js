Cypress.Commands.add('addProductToCart', (idProduct) => {
  cy.request({
    url: `https://qastoredesafio.lojaintegrada.com.br/carrinho/produto/${idProduct}/adicionar`,
    method: 'GET',
  })
})