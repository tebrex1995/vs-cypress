/// <reference types="cypress" />

import { login } from "../page_objects/login";
import { timeOffManagement } from "../page_objects/timeOffManagement";
import { faker } from "@faker-js/faker";

var token;
var vacNumber = 50;
describe("Time off management tests", () => {
  before("visit home page", () => {
    cy.visit("/");
  });

  it("Valid login", () => {
    cy.intercept(
      "POST",
      "https://cypress-api.vivifyscrum-stage.com/api/v2/login"
    ).as("token");
    login.login();
    login.loginButton.should("not.exist");
    cy.url().should("contain", "/my-organizations");
    cy.wait("@token").then((intercept) => {
      token = intercept.response.body.token;
    });
  });
  it("Check for login", () => {
    cy.url().should("contain", "/my-organizations");
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
    timeOffManagement.vacDuration.should("contain", "7d");
    timeOffManagement.vacDayCount.should("contain", vacNumber - 7 + "d");
    timeOffManagement.deleteVac();
  });
  //Puca test na Asertaciji i ne smanjuje se broj dana nakon drugog dodavanja//
  it("Add Parental Days", () => {
    cy.wait(2000);
    timeOffManagement.useParental();
    timeOffManagement.vacDuration.should("contain", "7d");
    timeOffManagement.vacDayCount.should("contain", vacNumber - 7 + "d");
    timeOffManagement.deleteVac();
  });
  it("Add Sick leave Days", () => {
    cy.wait(2000);

    timeOffManagement.useSickLeave();
    timeOffManagement.vacDuration.should("contain", "7d");
    timeOffManagement.vacDayCount.should("contain", vacNumber - 7 + "d");
    timeOffManagement.deleteVac();
  });
  it("Add Paid leave Days", () => {
    cy.wait(2000);

    timeOffManagement.usePaid();
    timeOffManagement.vacDuration.should("contain", "7d");
    timeOffManagement.vacDayCount.should("contain", vacNumber - 7 + "d");
    timeOffManagement.deleteVac();
  });
  it("Add Unpaid leave Days", () => {
    timeOffManagement.useUnpaid();
    timeOffManagement.vacDuration.should("contain", "7d");
    timeOffManagement.vacDayCount.should("contain", vacNumber - 7 + "d");
    timeOffManagement.deleteVac();
  });
  it("Add Other Days", () => {
    timeOffManagement.useOther();
    timeOffManagement.vacDuration.should("contain", "7d");
    timeOffManagement.vacDayCount.should("contain", vacNumber - 7 + "d");
    timeOffManagement.deleteVac();
  });
  // it("Delete Vacation", () => {
  //   timeOffManagement.deleteVac();
  // });
});
