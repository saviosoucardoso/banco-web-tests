describe("Login", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("Login com dados válidos deve permitir acesso ao sistema", () => {
    //act
    cy.fixture("credenciais").then((credenciais) => {
      cy.get("#username").click().type(credenciais.valida.usuario);
      cy.get("#senha").click().type(credenciais.valida.senha);
    });
    cy.get("#login-section > .btn").click();

    //assert

    cy.contains("h4", "Realizar Transferência").should("be.visible");
  });

  it("Login com dados invalidos não deve permitir acesso ao sistema", () => {
    //act
    cy.fixture("credenciais").then((credenciais) => {
      cy.get("#username").click().type(credenciais.invalida.usuario);
      cy.get("#senha").click().type(credenciais.invalida.senha);
    });
    cy.screenshot("senha-incorreta");
    //cy.get("#login-section > .btn").click();
    cy.contains("button", "Entrar").click();

    //assert

    //cy.get(".toast").should("have.text", "Erro no login. Tente novamente.");
    cy.verificarMensagemNoToast("Erro no login. Tente novamente.");
    cy.screenshot("login-falha");
  });
});
