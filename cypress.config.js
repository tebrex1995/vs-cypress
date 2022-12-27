const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    baseUrl: "https://app.vivifyscrum.com/login",
    watchForFileChanges: false,
    env: {
      validEmail: "akimadafaki@hotmail.com",
      validPassword: "emausla123",
    },
  },
});
