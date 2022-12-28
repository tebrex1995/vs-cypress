import data from "../fixtures/data.json";

class Boards {
  get boards() {
    return cy.get('a[href="/organizations/24361/boards"]').eq(1);
  }
  get okButton() {
    return cy.get(".vs-c-modal--features-confirm-button");
  }
  get addToBoard() {
    return cy.get(
      "div.vs-c-organization-boards__item:nth-child(1) div.vs-c-boards-item__header div.vs-c-boards-item__actions.vs-u-display--flex > span.el-tooltip:nth-child(2)"
    );
  }
  get memberInput() {
    return cy.get('input[type="text"]');
  }

  get inviteButton() {
    return cy.get('button[name="save-btn"]');
  }
  get teamMember() {
    return cy.get(".vs-c-team-member");
  }
  get teamMemberName() {
    return cy.get(".vs-c-team-member__name");
  }
  get teamMembersGrid() {
    return cy.get(".vs-l-team-members");
  }

  get teamMembers() {
    return cy.get('a[href="/boards/13568/team"]');
  }

  get firstBoard() {
    return cy.get(".vs-c-organization-boards__item").eq(0);
  }
  //   get deleteMember() {
  //     return cy.get(
  //       '[class="el-button el-button--text el-button--default el-button--large vs-u-pull--right"]'
  //     );
  //   }

  get yesButton() {
    return cy.get('button[name="save-btn"]');
  }
  addTeamMemberToBoard(email) {
    this.boards.click();
    this.okButton.click();
    this.addToBoard.click({ force: true });
    this.memberInput.type(email);
    this.inviteButton.click();
    this.firstBoard.click();
    this.teamMembers.click();
  }

  deleteMember() {
    cy.get(
      '[class="el-button el-button--text el-button--default el-button--large vs-u-pull--right"]'
    ).click({ force: true });
    // this.deleteMember.click({ force: true });
    this.yesButton.click();
  }
}

export const boards = new Boards();
