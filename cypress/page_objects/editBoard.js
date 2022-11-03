import { faker } from '@faker-js/faker';



class EditBoard {

    

   get boardEditButton(){
    return cy.get('[data-cy="board-configuration"]')
   }

   get newBoardTitle(){
    return cy.get('input[name="name"]')
   }

   get newBoardDescription(){
    return cy.get('textarea[name="description"]')
   }

   get updateButton(){
        return cy.get('button[type="submit"]').eq(0)
   }

   get popUp(){
      return cy.get('.el-message')
   }

   get popUpMessage(){
      return cy.get('.el-message__group')
   }
   
   editBoard(){

    this.boardEditButton.click()
    this.newBoardTitle.type(faker.address.buildingNumber())
    this.newBoardDescription.type(faker.color.human())
    this.updateButton.click()


   }
    
}

export const editBoard = new EditBoard()