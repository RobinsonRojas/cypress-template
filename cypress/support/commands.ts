/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

function loginViaAAD(AAD_USERNAME: string, AAD_PASSWORD: string) {
  cy.visit('https://m365.cloud.microsoft/');
  cy.get('#mcm-hero-banner-signin').click();

  // Login to your AAD tenant.
  cy.origin(
    'login.microsoftonline.com',
    {
      args: {
        AAD_USERNAME
      }
    },
    ({ AAD_USERNAME }) => {
      cy.get('input[type="email"]').type(AAD_USERNAME, {
        log: false
      });
      cy.get('input[type="submit"]').click();
    }
  );

  // depending on the user and how they are registered with Microsoft, the origin may go to live.com
  cy.origin(
    'login.live.com',
    {
      args: {
        AAD_PASSWORD
      }
    },
    ({ AAD_PASSWORD }) => {
      cy.get('input[type="password"]').type(AAD_PASSWORD, {
        log: false
      });
      cy.get('[data-testid="primaryButton"]').click();
      cy.get('[data-testid="secondaryButton"]').click();
    }
  );
}

Cypress.Commands.add('loginToAAD', (AAD_USERNAME: string, AAD_PASSWORD: string) => {
  cy.session(
    `aad-${AAD_USERNAME}`,
    () => {
      const log = Cypress.log({
        displayName: 'Azure Active Directory Login',
        message: [`🔐 Authenticating | ${AAD_USERNAME}`],
        // @ts-ignore
        autoEnd: false
      });

      log.snapshot('before');

      loginViaAAD(AAD_USERNAME, AAD_PASSWORD);

      log.snapshot('after');
      log.end();
    },
    {
      validate: () => {
        cy.visit('https://m365.cloud.microsoft/search');
        cy.env(['USERNAME']).then(({ USERNAME }) => {
          cy.get('footer[role="none"]').should('contain', USERNAME);
        });
      },
      cacheAcrossSpecs: true
    }
  );
});

declare global {
  namespace Cypress {
    interface Chainable {
      loginToAAD(username: string, password: string): Chainable<void>;
    }
  }
}

export {};
