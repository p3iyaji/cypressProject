const { defineConfig } = require("cypress");

module.exports = defineConfig({
  "defaultCommandTimeout": 20000,
  "pageLoadTimeout": 20000,
  reporter: 'cypress-mochawesome-reporter',
  video: true,
  retries: 1,
  env: {
    'appUrl': "https://staging.engineer.ai"
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);

    },
  },
});
