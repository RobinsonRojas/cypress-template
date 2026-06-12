describe('Descripción de la suite de pruebas', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  context('Contexto de los casos de prueba ejemplo positivos', () => {
    it.skip('Caso de prueba 1', () => {
      cy.contains('type').click();
      cy.log('soy un test fallido');
      cy.wrap(false).should('be.true');
    });

    it('Caso de prueba 2', () => {
      cy.contains('type').click();
      cy.log('soy un test exitoso');
      cy.wrap(true).should('be.true');
    });
  });

  context('Contexto de los casos de prueba ejemplo negativos', () => {
    it('Caso de prueba 1', () => {
      cy.contains('type').click();
      cy.log('soy un test fallido');
      cy.wrap(false).should('be.true');
    });

    it.only('Caso de prueba 2', () => {
      cy.contains('type').click();
      cy.log('soy un test exitoso');
      cy.wrap(true).should('be.true');
    });
  });
});
