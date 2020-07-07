import { expect } from 'chai';

describe('Authentication',  () => {

    const loginUser = (user : object) => {
        return cy.request({
            method: 'POST',
            url: '/api/auth/login',
            body: { email : user.email, password: user.password },
            failOnStatusCode: false
        });
    };

    const registerUser = (body : object) => {
        return cy.request({
            method: 'POST',
            url: '/api/auth/register',
            body,
            failOnStatusCode: false
        });
    };

    beforeEach(() => {
        cy.request('cypress/clear-db')
    });

    after(() => {
        cy.request('cypress/clear-db')
    });

    it('.should() - assert that user can create account with correct credentials',(done) => {
        registerUser({
            email : 'me@example.com',
            name :  'Oluwaseyi Adeogun',
            password: 'pass123',
            role: 'admin'
        }).then(response => {
           expect(response.status).to.equal(201);
           expect(response.body).to.have.all.keys('data', 'message');
           done()
        });
    });

    it('.should() - assert that user can not create account with invalid credentials',(done) => {
        registerUser({
            email : 'example.com',
            name :  'n',
            password: '23',
            role: ''
        }).then( response => {
            expect(response.status).to.equal(422);
            expect(response.body).to.have.keys('errors');
            done();
        });
    });

    it('.should() - assert that user can login with valid credentials',(done) => {
        const userData  = {
            email : 'new@example.com',
            name :  'Oluwaseyi Samuel',
            password: 'pass123',
            role: 'admin'
        };

        cy.request('POST', 'cypress/seed-user', userData);

        loginUser({
            email: userData.email,
            password: userData.password
        }).then( response => {
            expect(response.status).to.equal(200);
            expect(response.body).to.have.all.keys('data', 'message', 'token');
            done();
        });
    });

    it('.should() - assert that user can not login with invalid credentials',(done) => {
        cy.request('POST', 'cypress/seed-user', {
            email : 'new@example.com',
            name :  'Oluwaseyi Samuel',
            password: 'pass123',
            role: 'admin'
        });

        loginUser({
            email: 'xjdq@ss.xom',
            password: '11ndn'
        }).then( response => {
            expect(response.status).to.equal(401);
            expect(response.body).to.have.key('errors');
            done();
        });
    });

});
