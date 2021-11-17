/// <reference types= "cypress" /> 

describe('Twitter clone - LOGIN', () => {
    before(() => {
        cy.intercept({
            method: 'GET',
            hostname: 'res.cloudinary.com'
        }, {
            statusCode: 200,
            fixture: 'logo-feed'
        }).as('cloudinary')
    });
    it('Ao autenticar com credenciais válidas, deve ser direcionado o feed', () => {
        cy.login()
            .visit('/')
        cy.get('nav ul li')
            .should('be.visible')
            .and('have.length', 6)
            .get('.sc-fznKkj >span')
            .should('have.text', 'Home')
            .get('.sc-fznyAO.dLpyHG')
            .should('be.visible')
    });
});