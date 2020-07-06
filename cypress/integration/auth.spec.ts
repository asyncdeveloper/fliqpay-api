describe('Authentication',  () => {

    beforeEach(() => {
        cy.request('cypress/clear-db')
    });

    it('.should() - assert that user can create account with correct credentials',() => {
        cy.request('POST', '/api/auth/register',  {
            email : 'me@example.com',
            name :  'Oluwaseyi Adeogun',
            password: 'pass123',
            role: 'admin'
        }).its('body')
            .should('have.all.keys',['data', 'message'])
    });

    it('.should() - assert that user can not create account with invalid credentials',() => {
        cy.request({
            method: 'POST',
            url: '/api/auth/register',
            body: {
                email : 'example.com',
                name :  'n',
                password: '23',
                role: ''
            },
            failOnStatusCode: false
        }).its('body')
            .should('have.keys','errors');
    });

});
