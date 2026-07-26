// Describe la funcionalidad de los casos de prueba
describe('Descripción de la suite de pruebas', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  // Agrega más contexto a un grupo de casos de prueba; úsalo solo si tienes diferentes grupos en un mismo archivo.
  context('Contexto de los casos de prueba ejemplo A', () => {
    // .skip() sirve para saltar un caso de prueba; útil para depuración.
    it.skip('Caso de prueba A1', () => {
      cy.contains('type').click();
      cy.log('soy un test fallido');
      cy.wrap(false).should('be.true');
    });

    it('Caso de prueba A2', () => {
      cy.contains('type').click();
      cy.log('soy un test exitoso');
      cy.wrap(true).should('be.true');
    });
  });

  context('Contexto de los casos de prueba ejemplo B', () => {
    it('Caso de prueba B1', () => {
      cy.contains('type').click();
      cy.log('soy un test fallido');
      cy.wrap(false).should('be.true');
    });

    // .only() sirve para ejecutar solo un caso de prueba; útil para depuración.
    it.only('Caso de prueba B2', () => {
      cy.contains('type').click();
      cy.log('soy un test exitoso');
      cy.wrap(true).should('be.true');
    });
  });
});
