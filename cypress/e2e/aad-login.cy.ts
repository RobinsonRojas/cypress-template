describe('Ejemplo de login con Microsoft AAD (Azure Active Directory)', () => {
  // Restaura la sesión activa o inicia sesión antes de cada prueba.
  beforeEach(() => {
    cy.env(['AAD_USERNAME', 'AAD_PASSWORD']).then(({ AAD_USERNAME, AAD_PASSWORD }) => {
      cy.loginToAAD(AAD_USERNAME, AAD_PASSWORD);
    });
    cy.visit('https://m365.cloud.microsoft/');
  });

  // Los casos ya inician con la sesión activa.
  it('Caso de prueba 1', () => {
    cy.wait(2000);
  });

  it('Caso de prueba 2', () => {
    cy.wait(2000);
  });
});
