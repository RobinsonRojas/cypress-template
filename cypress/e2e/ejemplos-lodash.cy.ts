describe('Pruebas de ejemplo', () => {
  context('Las siguientes pruebas sirven como ejemplo para utilizar en un nuevo proyecto', () => {
    it('Login con Microsoft AAD', () => {});

    it('caso de prueba 2', () => {});

    const statuses = ['active', 'inactive', 'pending'];
    const random = Cypress._.sample(statuses); //

    const start = new Date('2025-01-01').getTime();
    const end = new Date('2026-12-31').getTime();
    const randomDate = new Date(Cypress._.random(start, end));
  });
});
