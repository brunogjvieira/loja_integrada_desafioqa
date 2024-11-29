describe("Tests for applying coupons in the cart page", () => {
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
      `https://qastoredesafio.lojaintegrada.com.br/carrinho/valor/?envio_id=${sedexShippingMethod}**`
    ).as("totalOrderValue");
  });

  it("Should apply FRETEGRATIS coupon for free shipping on cart page", () => {
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

  it("Should apply 10OFF coupon for 10% discount on cart page", () => {
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

  it("Should apply 30REAIS coupon for a R$30 discount on cart page", () => {
    let productValue = 0;
    let orderTotalAmount = 0;
    const couponCode = "30REAIS";

    cy.enterShippingPostalCode(postalCode);
    cy.selectShippingMethod(sedexShippingMethod);
    cy.wait("@totalOrderValue").then((response) => {
      productValue += response.response.body.valor_items - 30;
      orderTotalAmount += productValue + response.response.body.valor_frete;
      cy.applyCouponCode(couponCode);
      cy.verifyCouponIsAppliedSuccessfully(couponCode, "R$ 30,00");
      cy.verifyOrderTotalAmount(orderTotalAmount);
    });
  });

  // Esse teste vai falhar, tendo em vista que o cupom não está funcionando
  it("Should fail to apply invalid coupon 20LIMITADO on cart page", () => {
    let productValue = 0;
    let orderTotalAmount = 0;
    const couponCode = "20LIMITADO";
    const messageFailCoupon = "Cupom não encontrado.";

    cy.enterShippingPostalCode(postalCode);
    cy.selectShippingMethod(sedexShippingMethod);
    cy.wait("@totalOrderValue").then((response) => {
      productValue += response.response.body.valor_items - 30;
      orderTotalAmount += productValue + response.response.body.valor_frete;
      cy.applyCouponCode(couponCode);
      cy.failMessageCupom(messageFailCoupon);
    });
  });

  it("Should apply AJJFLWBHH coupon for a 5% discount on cart page", () => {
    let discountAppliedOnProduct = 0;
    let orderTotalAmount = 0;
    const couponCode = "AJJFLWBHH";

    cy.enterShippingPostalCode(postalCode);
    cy.selectShippingMethod(sedexShippingMethod);
    cy.wait("@totalOrderValue").then((response) => {
      discountAppliedOnProduct +=
        (response.response.body.valor_items +
          response.response.body.valor_frete) *
        0.05;
      orderTotalAmount +=
        response.response.body.valor_items +
        response.response.body.valor_frete -
        discountAppliedOnProduct;
      cy.applyCouponCode(couponCode);
      cy.verifyCouponIsAppliedSuccessfully(couponCode, "5%");
      cy.verifyOrderTotalAmount(orderTotalAmount);
    });
  });

  // Esse teste vai falhar, tendo em vista que o cupom não está funcionando
  it("Should fail to apply expired coupon CUPOMVENCIDO on cart page", () => {
    let productValue = 0;
    let orderTotalAmount = 0;
    const couponCode = "CUPOMVENCIDO";
    const messageFailCoupon = "O cupom não é válido.";

    cy.enterShippingPostalCode(postalCode);
    cy.selectShippingMethod(sedexShippingMethod);
    cy.wait("@totalOrderValue").then((response) => {
      productValue += response.response.body.valor_items - 30;
      orderTotalAmount += productValue + response.response.body.valor_frete;
      cy.applyCouponCode(couponCode);
      cy.failMessageCupom(messageFailCoupon);
    });
  });
});

describe("Tests for applying coupons via cart popup modal", () => {
  const productId = "118475062";
  const postalCode = "88330-010";
  const sedexShippingMethod = "156583";

  beforeEach(() => {
    cy.addProductToCart(productId);
    cy.visit(`https://qastoredesafio.lojaintegrada.com.br/carrinho/mini`);
    cy.intercept(
      "GET",
      `https://qastoredesafio.lojaintegrada.com.br/carrinho/valor/?envio_id=${sedexShippingMethod}**`
    ).as("totalOrderValue");
  });

  it("Should apply FRETEGRATIS coupon for free shipping on popup cart", () => {
    const couponCode = "FRETEGRATIS";
    let productValue = 0;

    cy.applyCouponCodeOnPopupCart(couponCode);

    cy.enterShippingPostalCode(postalCode);
    cy.selectShippingMethod(sedexShippingMethod);
    cy.wait("@totalOrderValue").then((response) => {
      productValue += response.response.body.valor_items;
      cy.verifyCouponIsAppliedSuccessfully(couponCode, "Frete Grátis");
      cy.verifyOrderTotalAmount(productValue);
    });
  });

  it("Should apply 10OFF coupon for 10% discount on popup cart", () => {
    const couponCode = "10OFF";
    let productValue = 0;
    let orderTotalAmount = 0;

    cy.applyCouponCodeOnPopupCart(couponCode);

    cy.enterShippingPostalCode(postalCode);
    cy.selectShippingMethod(sedexShippingMethod);
    cy.wait("@totalOrderValue").then((response) => {
      productValue +=
        response.response.body.valor_items -
        response.response.body.valor_items * 0.1;
      orderTotalAmount += productValue + response.response.body.valor_frete;
      cy.verifyCouponIsAppliedSuccessfully(couponCode, "10%");
      cy.verifyOrderTotalAmount(orderTotalAmount);
    });
  });

  it("Should apply 30REAIS coupon for a R$30 discount on popup cart", () => {
    let productValue = 0;
    let orderTotalAmount = 0;
    const couponCode = "30REAIS";

    cy.applyCouponCodeOnPopupCart(couponCode);
    cy.enterShippingPostalCode(postalCode);
    cy.selectShippingMethod(sedexShippingMethod);
    cy.wait("@totalOrderValue").then((response) => {
      productValue += response.response.body.valor_items - 30;
      orderTotalAmount += productValue + response.response.body.valor_frete;
      cy.verifyCouponIsAppliedSuccessfully(couponCode, "R$ 30,00");
      cy.verifyOrderTotalAmount(orderTotalAmount);
    });
  });

  // Esse teste vai falhar, tendo em vista que o cupom não está funcionando
  it("Should fail to apply invalid coupon 20LIMITADO on popup cart", () => {
    let productValue = 0;
    let orderTotalAmount = 0;
    const couponCode = "20LIMITADO";
    const messageFailCoupon = "Cupom não encontrado.";

    cy.applyCouponCodeOnPopupCart(couponCode);
    cy.enterShippingPostalCode(postalCode);
    cy.selectShippingMethod(sedexShippingMethod);
    cy.wait("@totalOrderValue").then((response) => {
      productValue += response.response.body.valor_items - 30;
      orderTotalAmount += productValue + response.response.body.valor_frete;
      cy.failMessageCupom(messageFailCoupon);
    });
  });

  it("Should apply AJJFLWBHH coupon for a 5% discount on popup cart", () => {
    let discountAppliedOnProduct = 0;
    let orderTotalAmount = 0;
    const couponCode = "AJJFLWBHH";

    cy.applyCouponCodeOnPopupCart(couponCode);
    cy.enterShippingPostalCode(postalCode);
    cy.selectShippingMethod(sedexShippingMethod);
    cy.wait("@totalOrderValue").then((response) => {
      discountAppliedOnProduct +=
        (response.response.body.valor_items +
          response.response.body.valor_frete) *
        0.05;
      orderTotalAmount +=
        response.response.body.valor_items +
        response.response.body.valor_frete -
        discountAppliedOnProduct;
      cy.verifyCouponIsAppliedSuccessfully(couponCode, "5%");
      cy.verifyOrderTotalAmount(orderTotalAmount);
    });
  });

  // Esse teste vai falhar, tendo em vista que o cupom não está funcionando
  it("Should fail to apply expired coupon CUPOMVENCIDO on popup cart", () => {
    let productValue = 0;
    let orderTotalAmount = 0;
    const couponCode = "CUPOMVENCIDO";
    const messageFailCoupon = "O cupom não é válido.";

    cy.applyCouponCodeOnPopupCart(couponCode);
    cy.enterShippingPostalCode(postalCode);
    cy.selectShippingMethod(sedexShippingMethod);
    cy.wait("@totalOrderValue").then((response) => {
      productValue += response.response.body.valor_items - 30;
      orderTotalAmount += productValue + response.response.body.valor_frete;
      cy.failMessageCupom(messageFailCoupon);
    });
  });
});

describe("Test for applying coupon via API", () => {
  const productId = "118475062";
  const sedexShippingMethod = "156583";

  beforeEach(() => {
    cy.addProductToCart(productId);
    cy.intercept(
      "GET",
      `https://qastoredesafio.lojaintegrada.com.br/carrinho/valor/?envio_id=${sedexShippingMethod}**`
    ).as("totalOrderValue");
  });

  it("Should apply 10OFF coupon via API", () => {
    const couponCode = "10OFF";

    cy.addCouponAPI(sedexShippingMethod, couponCode).then((response) => {
      const descontoCalculado = parseFloat(
        (response.body.valor_items * 0.1).toFixed(2)
      );
      expect(response.body.desconto_cupom).to.be.equal(descontoCalculado);
      expect(response.body.desconto).to.be.equal(descontoCalculado);
      expect(response.body.tipo_desconto).to.be.equal('porcentagem')
      expect(response.body.total).to.be.equal(response.body.valor_items + response.body.valor_frete - descontoCalculado);
    });
  });

  it("Should apply 30REAIS coupon via API", () => {
    const couponCode = "30REAIS";

    cy.addCouponAPI(sedexShippingMethod, couponCode).then((response) => {
      const descontoCalculado = 30
      expect(response.body.desconto_cupom).to.be.equal(descontoCalculado);
      expect(response.body.desconto).to.be.equal(descontoCalculado);
      expect(response.body.tipo_desconto).to.be.equal('fixo')
      expect(response.body.total).to.be.equal(response.body.valor_items + response.body.valor_frete - descontoCalculado);
    });
  });

  it("Should apply AJJFLWBHH coupon via API", () => {
    const couponCode = "AJJFLWBHH";

    cy.addCouponAPI(sedexShippingMethod, couponCode).then((response) => {
      const descontoCalculado = parseFloat(
        (response.body.valor_items * 0.05).toFixed(2)
      );
      expect(response.body.desconto_cupom).to.be.equal(descontoCalculado);
      expect(response.body.desconto).to.be.equal(descontoCalculado);
      expect(response.body.tipo_desconto).to.be.equal('porcentagem')
      expect(response.body.total).to.be.equal(response.body.valor_items + response.body.valor_frete - descontoCalculado);
    });
  });
});
