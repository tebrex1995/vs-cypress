/// <reference types="cypress" />
import data from "../fixtures/data.json";

import { boards } from "../page_objects/boards";
import { login } from "../page_objects/login";
import { timeOffManagement } from "../page_objects/timeOffManagement";

describe("Connect team member with board tests", () => {
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

  it("Add team member to board", () => {
    boards.addTeamMemberToBoard(data.member.email);
    boards.teamMember.eq(1).should("contain", data.member.name);
    boards.deleteMember();
    //kad dodam asertaciju za delete onda pukne
    boards.teamMembersGrid.should("not.contain", "Test").and("have.length", 1);
  });
});
