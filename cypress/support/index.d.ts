declare namespace Cypress {
    interface Chainable {

        /**
         * @example cy.login()
         */
        login(): void

        /**
         * @example cy.token()
         */

        token(): void

        /**
       * @example cy.realizarTweet(string) Necessário enviar string (texto a ser postado)
       */
        realizarTweet()
        /**
      * @example cy.checarPublicacao(string) Necessário enviar string (texto a ser comparado)
      */
        checarPublicacao()

    }
}