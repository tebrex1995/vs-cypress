/// <reference types="cypress" />

import { createBoard } from "../page_objects/createBoard";
import { boards } from "../page_objects/boards";
import data from "../fixtures/data.json";

describe("Vivify scrum", () => {
  before("Valid login through BE", () => {
    cy.login();
    cy.visit("/my-organizations");
    cy.url("/my-organizations").should("contain", "/my-organizations");
    // ne redirectuje se na home nakon logina preko BE, morao preko FE//
  });

  beforeEach("Create New Organization", () => {
    cy.createOrg();
  });

  it("org", () => {
    cy.visit(`/organizations/${Cypress.env("orgId")}/boards`);
    cy.get("h3").contains("Boards").should("exist");
    boards.addTeamMemberToBoard(data.member.email);
  });

  afterEach("Delete Organization", () => {
    cy.deleteOrg();
  });
});
