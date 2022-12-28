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
    return cy.get('a[href="/organizations/24361/team"]');
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

  get firstDate() {
    return cy.get(
      ".el-date-range-picker__content.is-left:nth-child(1) table.el-date-table tbody:nth-child(1) tr.el-date-table__row:nth-child(6) > td.available:nth-child(7)"
    );
  }

  get secondDate() {
    return cy.get(
      ".el-date-range-picker__content.is-right:nth-child(2) table.el-date-table tbody:nth-child(1) tr.el-date-table__row:nth-child(4) > td.available:nth-child(3)"
    );
  }

  get addButton() {
    return cy.get("button[type=button]").contains("Add");
  }

  get yesButton() {
    return cy.get('button[name="save-btn"]');
  }

  get vacDuration() {
    return cy.get("span.vs-c-time-off__time-text_span:nth-child(4)");
  }
  get otherName() {
    return cy.get('input[placeholder="Name"]');
  }
  visitTimeOff() {
    this.myOrganisation.click();

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
    this.firstDate.click();
    this.secondDate.click();
    this.addButton.click();
  }

  useParental() {
    this.addEvent.click();
    this.dropDown.click();
    this.parentalLeave.click();
    this.calendar.click();
    this.firstDate.click();
    this.secondDate.click();
    this.addButton.click();
  }
  useSickLeave() {
    this.addEvent.click();
    this.dropDown.click();
    this.sickLeave.click();
    this.calendar.click();
    this.firstDate.click();
    this.secondDate.click();
    this.addButton.click();
  }
  usePaid() {
    this.addEvent.click();
    this.dropDown.click();
    this.paidTime.click();
    this.calendar.click();
    this.firstDate.click();
    this.secondDate.click();
    this.addButton.click();
  }
  useUnpaid() {
    this.addEvent.click();
    this.dropDown.click();
    this.unpaidTime.click();
    this.calendar.click();
    this.firstDate.click();
    this.secondDate.click();
    this.addButton.click();
  }

  useOther() {
    this.addEvent.click();
    this.dropDown.click();
    this.other.click();
    this.otherName.type("Jebigica");
    this.calendar.click();
    this.firstDate.click();
    this.secondDate.click();
    this.addButton.click();
  }

  deleteVac() {
    cy.get(".el-button--mini.el-tooltip:nth-child(2)").click({ force: true });
    this.yesButton.click();
  }
}

export const timeOffManagement = new TimeOffManagement();
