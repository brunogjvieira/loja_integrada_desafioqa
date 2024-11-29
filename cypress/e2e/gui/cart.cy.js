describe("Cart Coupons", () => {
  const productId = "118475062";
  const postalCode = "88330-010";
  const sedexShippingMethod = "156583";

  beforeEach(() => {
    cy.addProductToCart(productId);
    cy.visit("https://qastoredesafio.lojaintegrada.com.br/carrinho/index");
    cy.url().should(
      "eq",
      "https://qastoredesafio.lojaintegrada.com.br/carrinho/index"
    );
    cy.intercept(
      "GET",
      "https://qastoredesafio.lojaintegrada.com.br/carrinho/valor/**"
    ).as("totalOrderValue");
  });

  it("Should apply a coupon called FRETEGRATIS successfully", () => {
    let productValue = 0;
    const couponCode = "FRETEGRATIS";

    cy.enterShippingPostalCode(postalCode);
    cy.selectShippingMethod(sedexShippingMethod);
    cy.wait("@totalOrderValue").then((response) => {
      productValue += response.response.body.valor_items;

      cy.applyCouponCode(couponCode);
      cy.verifyCouponIsAppliedSuccessfully(couponCode, "Frete Grátis");
      cy.verifyOrderTotalAmount(productValue);
    });
  });

  it("Should apply a coupon called 10OFF successfully", () => {
    let productValue = 0;
    let orderTotalAmount = 0;
    const couponCode = "10OFF";

    cy.enterShippingPostalCode(postalCode);
    cy.selectShippingMethod(sedexShippingMethod);
    cy.wait("@totalOrderValue").then((response) => {
      productValue +=
        response.response.body.valor_items -
        response.response.body.valor_items * 0.1;
      orderTotalAmount += productValue + response.response.body.valor_frete;
      cy.applyCouponCode(couponCode);
      cy.verifyCouponIsAppliedSuccessfully(couponCode, "10%");
      cy.verifyOrderTotalAmount(orderTotalAmount);
    });
  });
});
