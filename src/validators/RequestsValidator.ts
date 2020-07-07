import { body, param } from 'express-validator';
import User from '../models/User';
import SupportRequest, { Status } from "../models/SupportRequest";

export const requestsCreationRules = () => {
    return [
        body('name').trim().notEmpty().isLength({ min: 5, max: 255 }).withMessage('Name is required'),
        body('status').optional().custom(value => {
            return Status.some(status => status === value)
        }),
        body('user').custom(userId => {
            return User.findById(userId).then( user => {
                if (! user)
                    return Promise.reject('Invalid user.');
            });
        }),
    ]
};

export const requestsShowRules = () => {
    return [
        param('id').custom(requestId => {
            return SupportRequest.findById(requestId).then(request => {
                if (! request)
                    return Promise.reject('Request not found.');
            });
        }),
    ]
};

export const requestsUpdateRules = () => {
    return [
        param('id').custom(requestId => {
            return SupportRequest.findById(requestId).then(request => {
                if (! request)
                    return Promise.reject('Request not found.');
            });
        }),
        body('status').custom(value => {
            return Status.some(status => status === value)
        })
    ]
};
