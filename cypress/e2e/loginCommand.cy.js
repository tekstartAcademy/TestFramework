/// <reference types ='cypress'/>

import loginData from '../fixtures/testData/loginData.json';

describe('Login CYpress Command', () => {
  beforeEach('intercept', () => {
    cy.intercept('users/login').as('login');
  });

  context('1st Context', () => {
    it('Tests with cypress custom login command real data', () => {
      cy.login();
      cy.wait('@login');
      cy.url().should('not.contain', 'login');
      cy.get('.Toastify').should('contain', 'Login successful');
      cy.get('#profileName').should('contain', 'Test');
    });

    it('Tests with cypress custom login command invalid login', () => {
      const { incorrectUserOne } = loginData;

      cy.login(incorrectUserOne.email, incorrectUserOne.password);
      cy.wait('@login');
      cy.url().should('contain', 'login');
      cy.get('.Toastify').should('contain', 'Username or Password Incorrect');
    });

    it('Tests with cypress custom login command mocked data', () => {
      cy.intercept('users/me', {
        age: 59,
        _id: '64b476809728f400109b0540',
        name: 'Mocking Test',
        email: 'test@test.com',
        secret: 'test',
        address: 'Germany, EU',
        dob: 'January 50, 2026',
        hobbies: 'Dancing',
        events: 'Wealth',
        createdAt: '2023-07-16T23:00:16.811Z',
        updatedAt: '2024-05-14T00:51:18.382Z',
        __v: 201,
      });

      cy.login();
      cy.wait('@login');
      cy.url().should('not.contain', 'login');
      cy.get('.Toastify').should('contain', 'Login successful');
      cy.get('#profileName').should('contain', 'Mocking Test');
    });
  });

  context('2nd Context', () => {
    it('Mocks user data', () => {
      cy.intercept('/users/me', (req) => {
        req.headers['authorization'] = 'fakee auth token';

        req.continue((res) => {
          res.statusCode = 500;
          res.body = '';
          expect(res.statusCode).eq(500);
        });
      });

      cy.login();

      cy.wait('@login');

      cy.get('#profileName').should('not.have.text');
    });
  });
});
