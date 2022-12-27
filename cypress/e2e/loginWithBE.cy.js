/// <reference types="cypress" />

var token;

describe("Login with Backend", () => {
  beforeEach("Login", () => {
    cy.request("POST", "https://www.vivifyscrum.com/api/v2/login", {
      email: "akimadafaki@hotmail.com ",
      password: "emausla123",
    })
      .its("body")
      .then((response) => {
        token = response.token;
      });
  });
  beforeEach("Set token in window storage", () => {
    window.localStorage.setItem("token", token);
  });

  it("Check for login", () => {
    cy.request;
  });
});
