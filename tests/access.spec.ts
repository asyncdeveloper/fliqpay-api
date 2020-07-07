import {isCustomerOnly, isSupportOnly} from '../src/middlewares/access.middleware'

describe('Access Middleware', () => {

    let req;

    let res;

    let next = jest.fn();

    beforeEach(() => {
        res = {
            status: jest.fn(status => ({
                json : jest.fn()
            })),

        };

        next.mockReset();
    });

    it('isCustomerOnly Middleware () - should not continue with request if user has support role', async done => {
        req = { userRole: 'support' };

        await isCustomerOnly(req, res, next);

        expect(res.status).toHaveBeenCalled();

        done();
    });

    it('isCustomerOnly Middleware () - should continue with request if user has customer role', async done => {
        req = { userRole: 'customer' };

        await isCustomerOnly(req, res, next);

        expect(next).toHaveBeenCalled();

        done();
    });

    it('isSupportOnly Middleware () - should not continue with request if user has customer role', async done => {
        req = { userRole: 'customer' };

        await isSupportOnly(req, res, next);

        expect(res.status).toHaveBeenCalled();

        done();
    });

    it('isSupportOnly Middleware () - should continue with request if user has support role', async done => {
        req = { userRole: 'support' };

        await isSupportOnly(req, res, next);

        expect(next).toHaveBeenCalled();

        done();
    });


});
