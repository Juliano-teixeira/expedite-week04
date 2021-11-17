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


Cypress.Commands.add('login', () => {

  cy.token().then(response => {
    const { token, user } = response.body.data.login

    window.localStorage.setItem('token', token)
    window.localStorage.setItem('user', JSON.stringify(user))
  })

})

Cypress.Commands.add('token', () => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}`,
    body: {
      "operationName": "login",
      "variables": {
        "email": "semana04@gmail.com",
        "password": "semana04@gmail.com"
      },
      "query": "mutation login($email: String!, $password: String!) {\n  login(email: $email, password: $password) {\n    token\n    user {\n      id\n      handle\n      avatar\n      fullname\n      __typename\n    }\n    __typename\n  }\n}\n"
    }
  })
})

Cypress.Commands.add('realizarTweet', (inputTweet) => {
  cy.get('form div textarea')
    .should('be.visible')
    .type(inputTweet)
    .get('.sc-fzplWN.pDAkO')
    .should('have.text', 'Tweet')
    .click({ force: true })
})

Cypress.Commands.add('checarPublicacao', (inputTweet) => {
  cy.wait('@postFeed')
    .its('response.statusCode').should('eq', 200)
  cy.get('.sc-fzozJi.dyKSwO a p')
    .should('be.visible')
    .contains(inputTweet)
})

Cypress.Commands.add('excluirPublicacao', () => {
  cy.get('.sc-fzozJi.dyKSwO').then(lengthFeed => {
    if (lengthFeed.length >= 1) {
      for (let i = 0; i < lengthFeed.length - 1; i++) {
        cy.log('valor', i)
        cy.get('.sc-fzozJi.dyKSwO').eq(i)
          .find('.sc-AxiKw.fUsLpG').eq(3).click({ force: true })
        cy.contains('Your tweet has been deleted')
      }
    }
  })
})