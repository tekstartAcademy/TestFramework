/// <reference types="cypress" />

import { normalizeWhitespace } from '../support/helper';

const text =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

describe('PDF', () => {
  it('Download PDF compare 2 documents', () => {
    cy.visit('/downloads');
    cy.get('.download-page-btn').click();
    cy.fixture('testFiles/Lorem-ipsum.pdf').then((fixture) => {
      cy.readFile('cypress/downloads/Lorem-ipsum.pdf').then((download) => {
        expect(fixture).to.equal(download);
      });
    });
  });

  it('Download PDF read text', () => {
    cy.visit('/downloads');
    cy.get('.download-page-btn').click();

    const downloadsFolder = Cypress.config('downloadsFolder');
    const pdfName = 'Lorem-ipsum.pdf';

    cy.task('getPdfContent', { pdfName, dir: downloadsFolder }).then((content) => {
      expect(normalizeWhitespace(content.text)).to.include(text);
    });
  });
});
