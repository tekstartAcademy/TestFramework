/// <reference types="cypress" />

import { interceptLogin, interceptUserAvatar } from '../support/intercepts';
import homePageSelectors from '../fixtures/selectors/homeSelectors.json';
import { clickUpdateProfileImage, homePage } from '../POM/homePage';

describe('Profile image', () => {
  beforeEach('setup', () => {
    interceptLogin().as('login');
    interceptUserAvatar().as('avatar');
  });

  it('removes user profile picture', () => {
    cy.login();
    cy.wait('@login');
    homePage.deleteProfileImage();
    cy.wait('@avatar');
    cy.get(homePageSelectors.profileImage).should('have.attr', 'src').and('not.contain', 'https');
  });

  it('upload user profile picture', () => {
    cy.login();
    cy.wait('@login');
    homePage.uploadProfileImage('cypress/fixtures/testFiles/code.jpg');
    cy.wait('@avatar');
    cy.get(homePageSelectors.profileImage).should('have.attr', 'src').and('contain', 'https');
  });

  it('download user profile picture', () => {
    cy.login();
    cy.wait('@login');
    homePage.downloadProfilePicture();
    cy.readFile('cypress/downloads/profile-Image.png');
  });
});
