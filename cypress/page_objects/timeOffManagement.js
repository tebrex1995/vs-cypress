class TimeOffManagement {
  get myOrganisation() {
    return cy.get(".vs-c-my-organization__body");
  }

  get newBoardButton() {
    return cy.get('button[name="close-new-board-modal-btn"]');
  }

  get newModalButton() {
    return cy.get('button[name="close-new-board-modal-btn"]');
  }
  get teamMember() {
    return cy.get('a[href="/organizations/89113/team"]');
  }

  get openModal() {
    return cy.get('a[title="Edit Member"]');
  }

  get timeOff() {
    return cy.get(".el-tabs__item").eq(5);
  }

  get vacationDaysCounter() {
    return cy.get(".c-vacation-days");
  }

  get inputVacationDays() {
    return cy.get('input[placeholder="Member’s Vacation Days"]');
  }
  get updateButton() {
    return cy.get('button[type="button"]').contains("Update");
  }

  get vacDayCount() {
    return cy.get(".c-vacation-days__value");
  }

  get addEvent() {
    return cy.get('[class="vs-c-timeline__activity"]').eq(1);
  }

  get dropDown() {
    return cy.get('a[class="vs-c-btn vs-c-btn--link"]');
  }

  get vacation() {
    return cy.get(".el-dropdown-menu > :nth-child(1)");
  }

  get parentalLeave() {
    return cy.get(".el-dropdown-menu > :nth-child(2)");
  }
  get sickLeave() {
    return cy.get(".el-dropdown-menu > :nth-child(3)");
  }
  get paidTime() {
    return cy.get(".el-dropdown-menu > :nth-child(4)");
  }
  get unpaidTime() {
    return cy.get(".el-dropdown-menu > :nth-child(5)");
  }
  get other() {
    return cy.get(".el-dropdown-menu > :nth-child(6)");
  }

  get calendar() {
    return cy.get('input[class="el-input__inner"]').eq(1);
  }
  visitTimeOff() {
    this.myOrganisation.click();
    cy.wait(2000);
    this.newBoardButton.click();
    this.teamMember.click();
    this.newModalButton.click();
    this.openModal.click();
    this.timeOff.click();
  }

  addVacDays(vacDays) {
    this.inputVacationDays.click();
    this.inputVacationDays.clear().type(vacDays);
    this.updateButton.click();
  }

  useVac() {
    this.addEvent.click();
    this.dropDown.click();
    this.vacation.click();
    this.calendar.click();
  }
}

export const timeOffManagement = new TimeOffManagement();
