Cypress.Commands.add("enterShippingPostalCode", (cep) => {
  cy.get(".caixa-sombreada").should("be.visible");

  cy.get("#calcularFrete")
    .clear()
    .type(`${cep}`)
    .should("have.value", `${cep}`);
  cy.get("#btn-frete").click();
});

Cypress.Commands.add("selectShippingMethod", (typeShipping) => {
  cy.get(`input[name="formaEnvio"][value=${typeShipping}]`).check();
});

Cypress.Commands.add("applyCouponCode", (couponName) => {
  cy.get("#usarCupom")
    .clear()
    .type(couponName)
    .should("have.value", couponName);
  cy.get("#btn-cupom").click();
});

Cypress.Commands.add("verifyCouponIsAppliedSuccessfully",
  (couponName, couponNameCheck) => {
    cy.get(".cupom-sucesso")
      .should("be.visible")
      .children()
      .contains(couponName);

    cy.get(".cupom-valor").children().contains(couponNameCheck);
  }
);

Cypress.Commands.add("verifyOrderTotalAmount", (orderValue) => {
  cy.get(".titulo.valor-total")
    .invoke("attr", "data-total-valor")
    .should("eq", orderValue.toString());
});
