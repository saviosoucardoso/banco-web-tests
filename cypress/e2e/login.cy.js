describe("Login", () => {
  it("Login com dados válidos deve permitir acesso ao sistema", () => {
    //arrange
    cy.visit("http://localhost:4000");

    //act
    cy.get("#username").click().type("julio.lima");
    cy.get("#senha").click().type("123456");
    cy.get("#login-section > .btn").click();

    //assert

    cy.contains("h4", "Realizar Transferência").should("be.visible");
  });
});
