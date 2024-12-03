const { defineConfig } = require('cypress');
const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

function readPdf(pdfPath) {
  let dataBuffer = fs.readFileSync(pdfPath);
  return pdf(dataBuffer);
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        getPdfContent({ pdfName, dir }) {
          const pdfPath = path.join(dir, pdfName);
          return readPdf(pdfPath);
        },
      });
    },
    defaultCommandTimeout: 15000,
    baseUrl: 'https://personal-media.vercel.app/',
    env: {
      username: 'test@test.com',
    },
    video: true,
  },
});
