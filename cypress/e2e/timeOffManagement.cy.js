/// <reference types="cypress" />

import { login } from "../page_objects/login";
import { timeOffManagement } from "../page_objects/timeOffManagement";
import { faker } from "@faker-js/faker";

var token;
var vacNumber = faker.random.numeric();
describe("Time off management tests", () => {
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

  it("Visit Time Off Tab", () => {
    timeOffManagement.visitTimeOff();
    timeOffManagement.vacationDaysCounter.should(
      "contain",
      "Total number of unused vacation days:"
    );
  });

  it("Add vacation days manualy", () => {
    timeOffManagement.addVacDays(vacNumber);
    timeOffManagement.vacDayCount.should("contain", vacNumber + "d");
  });

  it("Add Vacation Days", () => {
    timeOffManagement.useVac();
  });
});