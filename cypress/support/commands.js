// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import { faker } from "@faker-js/faker";
import { login } from "../page_objects/login";
var token;

Cypress.Commands.add("login", () => {
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
    Cypress.env("myToken", token);
  });
});

Cypress.Commands.add("loginBE", () => {
  cy.request({
    method: "POST",
    url: "https://www.vivifyscrum.com/api/v2/login",
    body: {
      email: Cypress.env("validEmail"),
      password: Cypress.env("validPassword"),
    },
  })
    .its("body")
    .then((response) => {
      window.localStorage.setItem("token", response.token);
      // window.localStorage.setItem("user", JSON.stringify(response.user));
      // window.localStorage.setItem("user_id", response.user.id);
    });
});

Cypress.Commands.add("createOrg", () => {
  cy.request({
    method: "POST",
    url: "https://cypress-api.vivifyscrum-stage.com/api/v2/organizations",
    form: true,
    body: {
      name: faker.company.name(),
      avatar_crop_cords: {},
    },
    headers: {
      authorization: `Bearer ${Cypress.env("myToken")}`,
    },
  }).then((response) => {
    Cypress.env("orgId", response.body.id);
  });
});

Cypress.Commands.add("deleteOrg", () => {
  cy.request({
    method: "POST",
    url: `https://cypress-api.vivifyscrum-stage.com/api/v2/organizations/${Cypress.env(
      "orgId"
    )}`,
    body: { passwordOrEmail: Cypress.env("validPassword") },
    headers: {
      authorization: `Bearer ${Cypress.env("myToken")}`,
    },
  });
});
