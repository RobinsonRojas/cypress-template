// Doc: https://filiphric.com/cypress-basics-selecting-elements

// <h1>Shapes:</h1>
// <div class="square"></div>
// <div id="circle"></div>
// <div shape="triangle"></div>

describe('Ejemplos de selectores en Cypress', () => {
  it('Selectores CSS basicos', () => {
    cy.contains('Shapes:'); // select by text
    cy.contains('h1', 'Shapes:'); // select by text and css selector
    cy.get('h1'); // select by tag
    cy.get('.square'); // select by class
    cy.get('#circle'); // select by id
    cy.get('[shape="triangle"]'); // select by attribute
  });

  it('Selectores CSS + comandos de Cypress de jQuery', () => {
    cy.get('.list')
      .find('li') // returns 7 li elements
      .contains('violet'); // returns a single element

    cy.get('li').first(); // select "red"

    cy.get('li').last(); // select "violet"

    cy.get('li').eq(2); // select "yellow"

    cy.get('.green').next(); // will select the element .blue
    cy.get('.green').prev(); // will select the element .yellow

    cy.get('li').filter('.primary'); // select all elements with the class .primary

    cy.get('.list').find('.violet'); // finds an element with class .violet inside .list element

    cy.get('.violet').parent('.list'); // finds an element with class .list that is above our .violet element
  });

  it('Selectores con un custom command', () => {
    cy.dataCy('square'); // select by data-cy attribute
  });
});
