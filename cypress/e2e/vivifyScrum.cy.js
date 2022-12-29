/// <reference types="cypress" />

import { login } from "../page_objects/login";
import { createBoard } from "../page_objects/createBoard";
import { editBoard } from "../page_objects/editBoard";
import { logout } from "../page_objects/logout";

var boardID;
var token;

describe("Vivify scrum tests", () => {
  before("visit home page", () => {
    cy.visit("");
  });

  it("Valid login", () => {
    cy.intercept(
      "POST",
      "https://cypress-api.vivifyscrum-stage.com/api/v2/login"
    ).as("token");
    cy.visit("");
    login.login();
    login.loginButton.should("not.exist");
    cy.url().should("contain", "/my-organizations");
    cy.wait("@token").then((intercept) => {
      token = intercept.response.body.token;
    });
  });

  it("Create board", () => {
    cy.intercept(
      "POST",
      "https://cypress-api.vivifyscrum-stage.com/api/v2/boards"
    ).as("createBoard");
    createBoard.createBoard();
    cy.url().should("contain", "/boards");
    cy.wait("@createBoard").then((intercept) => {
      // console.log(intercept)
      boardID = intercept.response.body.id;
      expect(intercept.response.statusCode).to.eq(201);
      expect(intercept.response.statusMessage).to.eq("Created");
    });
  });

  it("Edit Board", () => {
    cy.intercept(
      "PUT",
      `https://cypress-api.vivifyscrum-stage.com/api/v2/boards/${boardID}`
    ).as("editBoard");
    editBoard.editBoard();
    editBoard.popUp.should("be.visible");
    editBoard.popUpMessage.should(
      "contain",
      "Successfully updated the Board Basic Info."
    );

    cy.wait("@editBoard").then((intercept) => {
      // console.log(intercept)
      expect(intercept.request.body.name).to.eq(intercept.response.body.name);
      expect(intercept.request.body.name).to.eq(intercept.response.body.name);
      expect(intercept.response.statusCode).to.eq(200);
    });
  });

  it("Delete board via BE", () => {
    cy.request({
      method: "DELETE",
      url: `https://cypress-api.vivifyscrum-stage.com/api/v2/boards/${boardID}`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((intercept) => {
      console.log(intercept);
      expect(intercept.status).to.eq(200);
      expect(intercept.statusText).to.eq("OK");
    });
  });

  it("Logout with FE", () => {
    cy.intercept(
      "POST",
      "https://cypress-api.vivifyscrum-stage.com/api/v2/logout"
    ).as("logout");
    logout.logout();
    cy.url().should("contain", "/login");
    login.loginButton.should("be.visible");

    cy.wait("@logout").then((intercept) => {
      console.log(intercept);
      expect(intercept.response.statusCode).to.eq(201);
      expect(intercept.response.body.message).to.eq("Successfully logged out");
    });
  });
});
