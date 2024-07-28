const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3001', // Set your base URL here
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  video: true, // Enable video recording
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',
});
