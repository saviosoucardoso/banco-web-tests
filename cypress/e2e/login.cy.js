describe("Login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4000");
  });
  it("Login com dados válidos deve permitir acesso ao sistema", () => {
    //act
    cy.get("#username").click().type("julio.lima");
    cy.get("#senha").click().type("123456");
    cy.get("#login-section > .btn").click();

    //assert

    cy.contains("h4", "Realizar Transferência").should("be.visible");
  });

  it("Login com dados invalidos não deve permitir acesso ao sistema", () => {
    //act
    cy.get("#username").click().type("julio.lima");
    cy.get("#senha").click().type("654321");
    //cy.get("#login-section > .btn").click();
    cy.contains("button", "Entrar").click();

    //assert
    cy.get(".toast").should("have.text", "Erro no login. Tente novamente.");
  });
});
