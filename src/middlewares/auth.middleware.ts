import { NextFunction, Response } from 'express';
import * as HttpStatusCodes from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';

export const verifyToken = (req: any, res: Response, next: NextFunction) => {
    const token: string = extractToken(req);

    if (! token) {
        return res.status(HttpStatusCodes.UNAUTHORIZED)
            .json({ message: 'No token, authorization denied' });
    }

    try {
        const payload: any = jwt.verify(token, config.JWT_SECRET);
        req.userId = payload.userId;
        req.userRole = payload.role;
        next();
    } catch (err) {
        res.status(HttpStatusCodes.UNAUTHORIZED)
            .json({ message: 'Invalid token.' });
    }
};

const extractToken = (req: any): string => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
        return req.query.token;
    }
    return null;
};

export default verifyToken;
