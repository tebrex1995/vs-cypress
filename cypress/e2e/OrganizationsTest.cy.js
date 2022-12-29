/// <reference types="cypress" />

describe("Vivify scrum", () => {
  before("Valid login", () => {
    cy.login();
  });

  beforeEach("Create New Organization", () => {
    cy.createOrg();
  });

  it("org", () => {
    cy.visit(`/organizations/${Cypress.env("orgId")}/boards`);
    cy.get("h3").contains("Boards").should("exist");
  });

  afterEach("Delete Organization", () => {
    cy.deleteOrg();
  });
});
