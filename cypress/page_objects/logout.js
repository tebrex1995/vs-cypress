class Logout {

get accountButton(){
    return cy.get('a[href="/account"]')
}

get accountSettings(){
    return cy.get('a[href="/account/settings"]')
}

get logoutButton(){
    return cy.get('.vs-c-logout')
}

logout(){
    this.accountButton.click()
    this.accountSettings.click()
    this.logoutButton.click()
}

}

export const logout = new Logout()