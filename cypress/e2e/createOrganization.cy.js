/// <reference types="cypress" />

import data from "../fixtures/data.json";
import { login } from "../page_objects/login";
import { faker } from "@faker-js/faker";

var token;
var orgId;
describe("Vivify scrum", () => {
  before("Valid login", () => {
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
      window.localStorage.setItem("token", token);
    });
  });

  beforeEach("Create New Organization", () => {
    cy.request({
      method: "POST",
      url: "https://cypress-api.vivifyscrum-stage.com/api/v2/organizations",
      form: true,
      body: {
        name: faker.company.name(),
        avatar_crop_cords: {},
      },
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      console.log(response);
      orgId = response.body.id;
    });
  });

  it("Delete Organization", () => {
    cy.request({
      method: "POST",
      url: `https://cypress-api.vivifyscrum-stage.com/api/v2/organizations/${orgId}`,
      body: { passwordOrEmail: data.validCredentials.password },
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  });
});
