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

    it('.should() - assert that user can login with valid credentials',() => {
        const userData  = {
            email : 'new@example.com',
            name :  'Oluwaseyi Samuel',
            password: 'pass123',
            role: 'customer'
        };

        cy.request('POST', 'cypress/seed-user', userData);

        cy.request({
            method: 'POST',
            url: '/api/auth/login',
            body: { email : userData.email , password: userData.password },
            failOnStatusCode: false
        }).its('body')
            .should('have.keys',['token', 'data', 'message']);
    });

    it('.should() - assert that user can not login with invalid credentials',() => {
        const userData  = {
            email : 'new@example.com',
            name :  'Oluwaseyi Samuel',
            password: 'pass123',
            role: 'customer'
        };

        cy.request('POST', 'cypress/seed-user', userData);

        cy.request({
            method: 'POST',
            url: '/api/auth/login',
            body: { email : 'x@x.com' , password: 'xxxxxxx' },
            failOnStatusCode: false
        }).its('body')
            .should('have.key','errors');
    });

});
