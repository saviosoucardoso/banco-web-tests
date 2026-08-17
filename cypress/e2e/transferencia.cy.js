describe("Transferências", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.fixture("credenciais").then((credenciais) => {
      cy.get("#username").click().type(credenciais.valida.usuario);
      cy.get("#senha").click().type(credenciais.valida.senha);
    });

    cy.contains("button", "Entrar").click();
  });

  it("Deve transferir quando os dados forem válidos", () => {
    /**
    cy.get('label[for="conta-origem"]').parent().as("campo-conta-origem");
    cy.get("@campo-conta-origem").click();
    cy.get("@campo-conta-origem").contains("Ana Pereira").click();

    cy.get('label[for="conta-destino"]').parent().as("campo-conta-destino");
    cy.get("@campo-conta-destino").click();
    cy.get("@campo-conta-destino").contains("Carlos Mendes").click();
*/

    //act
    cy.realizarTransferencia("Ana Pereira", "Carlos Mendes", "100");
    //assert
    cy.verificarMensagemNoToast("Transferência realizada!");
  });

  it.only("Deve apresentar erro quando transferi mais de 5 mil sem token", () => {
    //act
    cy.realizarTransferencia("Ana Pereira", "Carlos Mendes", "6000");
    //assert
    cy.verificarMensagemNoToast("Autenticação necessária para transferências acima de R$5.000,00.");
  });
});
