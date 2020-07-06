import User, { Roles } from "../models/User";

import { body } from 'express-validator';

export const userRegisterationRules = () => {
    return [
        body('email').isEmail().custom(value => {
            return User.findOne({ email : value }).then( user => {
                if (user)
                    return Promise.reject('E-mail already in use');
            });
        }),
        body('password').trim().notEmpty().isLength({ min: 5, max: 255 }).withMessage('must be at least 5 chars long'),
        body('name').trim().notEmpty().isLength({ min: 5, max: 255 }).withMessage('must be at least 5 chars long'),
        body('role').trim().notEmpty().custom(value => {
            return  Roles.some(role => role === value)
        })
    ]
};

export const userLoginRules = () => {
    return [
        body('email').isEmail().withMessage('Email is required'),
        body('password').trim().notEmpty().isLength({ min: 5, max: 255 }).withMessage('Password is required'),
    ]
};
