// Doc: https://lodash.com/docs/4.18.1

describe('Ejemplos de uso de la librería Lodash', () => {
  it('Generar un número aleatorio en un rango', () => {
    const randomNumber = Cypress._.random(0, 10);
    cy.log(`Número aleatorio: ${randomNumber}`);
  });

  it('Tomar una palabra aleatoria de un array de datos', () => {
    const statuses = ['active', 'inactive', 'pending'];
    const random = Cypress._.sample(statuses);
    cy.log(`Palabra aleatoria: ${random}`);
  });

  it('Generar una fecha aleatoria en un rango', () => {
    const start = new Date('2025-01-01').getTime();
    const end = new Date('2026-12-31').getTime();
    const randomDate = new Date(Cypress._.random(start, end));
    cy.log(`Fecha aleatoria: ${randomDate}`);
  });
});
