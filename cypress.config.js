const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    baseUrl: "https://cypress.vivifyscrum-stage.com/login",
    watchForFileChanges: false,
    env: {
      validEmail: "akimadafaki@hotmail.com",
      validPassword: "Emausla123",
    },
  },
});
