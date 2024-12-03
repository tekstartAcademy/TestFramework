/// <reference types="cypress" />

import loginData from '../fixtures/testData/loginData.json';
import loginSelector from '../fixtures/selectors/loginSelectors.json';

describe('Testing login', () => {
  const { incorrectUserOne, incorrectUserTwo } = loginData;
  const { username: user, password: pass, loginButton } = loginSelector;

  beforeEach('setup', () => {
    cy.visit('/');
  });

  afterEach('TearDown', () => {
    cy.log('Test has completed');
  });

  it('Test login with correct username and password', () => {
    cy.url().should('contain', 'login');

    const { username } = Cypress.env();

    cy.get(loginSelector.username).type(username);
    cy.get(loginSelector.password).type(Cypress.env('password'));

    cy.get(loginSelector.loginButton).contains('Login').click();

    cy.url().should('contain', 'login');
  });

  it('Test login with incorrect username and correct password', () => {
    const { email, password } = incorrectUserOne;

    cy.url().should('contain', 'login');

    cy.get(user).type(email);
    cy.get(pass).type(password);

    cy.get(loginButton).contains('Login').click();

    cy.url().should('contain', 'login');
  });

  it('Test login with correct username and incorrect password', () => {
    cy.url().should('contain', 'login');

    cy.get(user).type(incorrectUserTwo.email);
    cy.get(pass).type(incorrectUserTwo.password);

    cy.get(loginButton).contains('Login').click();

    cy.url().should('contain', ' hhhh');
  });
});
