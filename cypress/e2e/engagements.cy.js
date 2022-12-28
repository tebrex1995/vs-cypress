/// <reference types="cypress" />

import { login } from "../page_objects/login";
import { timeOffManagement } from "../page_objects/timeOffManagement";

describe("Testing engagements functionality", () => {
  before("Visit home page", () => {
    cy.visit("/");
  });

  it("Valid login", () => {
    login.login();
    login.loginButton.should("not.exist");
    cy.url().should("contain", "/my-organizations");
  });

  it("Check for login", () => {
    cy.url().should("contain", "/my-organizations");
  });

  it("Visit team", () => {
    timeOffManagement.visitTeam();
    cy.get(".el-tabs__item").should("contain", "Members");
    cy.get(".vs-u-text--uppercase").should("contain", "Team Management");
  });
});
