/// <reference types ='cypress'/>

import { homePage } from '../POM/homePage';
import homeSelectors from '../fixtures/selectors/homeSelectors.json';

describe('POSTS', () => {
  context('create post', () => {
    beforeEach('setup', () => {
      cy.intercept('/posts').as('posts');
    });

    afterEach('Tear down', () => {
      homePage.deletePost();
      cy.get('.Toastify').should('contain', 'Post deleted successfully!');
    });

    it('Creates new use posts', () => {
      const postText = 'Our Very First PostOur Very First Post';

      cy.login();

      homePage.createPost(postText);
      cy.wait('@posts');

      cy.get(homeSelectors.createdPost).should('contain', postText);
    });
  });
});
