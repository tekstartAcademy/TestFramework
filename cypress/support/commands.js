// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
import loginSelectors from '../fixtures/selectors/loginSelectors.json';

const { username: validUserName, password: validPassword } = Cypress.env();

// -- This is a parent command --
Cypress.Commands.add('login', (username = validUserName, password = validPassword) => {
  cy.visit('/');
  cy.get(loginSelectors.username).type(username);
  cy.get(loginSelectors.password).type(password);
  cy.get(loginSelectors.loginButton).click();
});
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
