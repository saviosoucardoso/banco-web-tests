Cypress.Commands.add("realizarTransferencia", (contaOrigem, contaDestino, valor) => {
  cy.selecionarOpcaoNaCombobox("conta-origem", contaOrigem);
  cy.selecionarOpcaoNaCombobox("conta-destino", contaDestino);
  cy.get("#valor").clear().type(valor);

  cy.contains("button", "Transferir").click();
});
