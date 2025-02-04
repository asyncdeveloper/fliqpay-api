import { expect } from 'chai';

describe('Requests',  () => {

    const customerData: object = {
        email : 'new@example.com',
        name :  'Oluwaseyi Samuel',
        password: 'pass123',
        role: 'admin'
    };

    const loginUser = (user : object) => {
        return cy.request({
            method: 'POST',
            url: '/api/auth/login',
            body: { email : user.email, password: user.password },
            failOnStatusCode: false
        });
    };

    const createRequest = (request : object, token: string = '') => {
        return cy.request({
            method: 'POST',
            url: '/api/requests',
            headers: { Authorization: `Bearer ${token}` },
            body: { name: request.name, user: request.user },
            failOnStatusCode: false
        });
    };

    const visitRequest = (request : object, token: string = '') => {
        return cy.request({
            method: 'GET',
            url: `/api/requests/${request.id}`,
            headers: { Authorization: `Bearer ${token}` },
            failOnStatusCode: false
        });
    };

    beforeEach(() => {
        cy.request('cypress/clear-db');
        cy.request('POST', 'cypress/seed-user', customerData);
        cy.request('POST', 'cypress/seed-request', { name: 'Test Request I', email: 'newuser@e.com' });
        cy.request('POST', 'cypress/seed-request', { name: 'Test Request II', email: 'newuser1@e.com' });
    });

    after(() => {
        cy.request('cypress/clear-db')
    });

    it('.should() - assert that customer can create a support request with valid body',(done) => {
        loginUser(customerData).then( data => {
            createRequest({ name: 'Test Support', user: data.body.data._id }, data.body.token)
                .then( response => {
                    expect(response.status).to.be.eq(201);
                    expect(response.body).to.have.all.keys('data', 'message');

                    done();
                });
        });
    });

    it('.should() - assert that customer can not create a support request with invalid body',( done) => {
        loginUser(customerData).then( (data) => {
            createRequest({ name: 'Test Support', user: 'dqwhjdqwhjd' }, data.body.token)
                .then( response => {
                    expect(response.status).to.be.eq(422);
                    expect(response.body).to.have.key('errors');

                    done();
                });
        });
    });

    it('.should() - assert can view an existing created request',( done) => {
        cy.request({
            method: 'GET',
            url: '/cypress/get-request'
        }).then(res => {
            loginUser(customerData).then( (data) => {
                visitRequest({ id : res.body.data._id }, data.body.token).then( response => {
                    expect(response.status).to.be.eq(200);
                    expect(response.body).to.have.keys('data', 'message');

                    done();
                });
            });
        });
    });

    it('.should() - assert can view all created requests',( done) => {
        loginUser(customerData).then( (data) => {
            cy.request({
                method: 'GET',
                url: '/api/requests',
                headers: { Authorization: `Bearer ${data.body.token}` },
                failOnStatusCode: false
            }).then( response => {
                expect(response.status).to.be.eq(200);
                expect(response.body).to.have.keys('data', 'message');
                expect(response.body.data).to.have.length(2);

                done();
            });
        });
    });

    it('.should() - assert can update an existing request',( done) => {
        cy.request({
            method: 'GET',
            url: '/cypress/get-request'
        }).then(res => {
            loginUser(customerData).then( (data) => {
                cy.request({
                    method: 'PATCH',
                    url: `/api/requests/${res.body.data._id}`,
                    body: { status: 'closed' },
                    headers: { Authorization: `Bearer ${data.body.token}` },
                    failOnStatusCode: false
                }).then( response => {
                    expect(response.status).to.be.eq(200);
                    expect(response.body).to.have.keys('data', 'message');

                    done();
                });
            });
        });
    });

});
