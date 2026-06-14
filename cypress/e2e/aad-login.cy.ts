describe('Pruebas de ejemplo', () => {
  context('Las siguientes pruebas sirven como ejemplo para utilizar en un nuevo proyecto', () => {
    beforeEach(() => {
      cy.env(['AAD_USERNAME', 'AAD_PASSWORD']).then(({ AAD_USERNAME, AAD_PASSWORD }) => {
        cy.loginToAAD(AAD_USERNAME, AAD_PASSWORD);
      });
      cy.visit('https://m365.cloud.microsoft/');
    });

    it('Login con Microsoft AAD', () => {
      cy.wait(2000);
    });

    it('caso de prueba 2', () => {
      cy.wait(2000);
    });
  });
});
