import { faker } from "@faker-js/faker";

class CreateBoard {
  get addBoardButton() {
    return cy.get(".vs-c-organization-boards__item--add-new");
  }

  get boardName() {
    return cy.get('input[name="name"]');
  }

  get checkScrumBoard() {
    return cy.get('input[value="scrum_board"]');
  }

  get nextButton() {
    return cy.get('button[name="next_btn"]');
  }

  createBoard() {
    this.addBoardButton.click();
    this.boardName.type(faker.name.jobArea());
    this.nextButton.click();
    this.checkScrumBoard.click({ force: true });
    this.nextButton.click();
    this.nextButton.click();
    this.nextButton.click();
    this.nextButton.click();
  }
}

export const createBoard = new CreateBoard();
