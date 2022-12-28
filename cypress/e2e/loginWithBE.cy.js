/// <reference types="cypress" />
import { login } from "../page_objects/login";
var token;

describe("Login with Backend", () => {
  before("Login", () => {
    cy.visit("/");
    cy.loginThroughBackend();
  });

  it("Check for login", () => {
    cy.visit("/");
    cy.url().should("contain", "/my-organizations");
  });
});
