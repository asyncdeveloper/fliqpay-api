import { validationResult } from 'express-validator';
import * as HttpStatusCodes from 'http-status-codes';

export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    return res.status(HttpStatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
};
