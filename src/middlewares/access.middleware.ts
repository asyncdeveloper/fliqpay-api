import { NextFunction, Response } from 'express';
import * as HttpStatusCodes from 'http-status-codes';
import SupportRequest, { IRequest } from "../models/SupportRequest";

export const isCustomerOnly = (req: any, res: Response, next: NextFunction) => {
    if(req.userRole === 'support') {
        return res.status(HttpStatusCodes.FORBIDDEN)
            .json({ message: 'Authorization denied.' });
    }

    next();
};

export const isSupportOnly = (req: any, res: Response, next: NextFunction) => {
    if(req.userRole === 'customer') {
        return res.status(HttpStatusCodes.FORBIDDEN)
            .json({ message: 'Authorization denied.' });
    }

    next();
};

export const isCustomerRequestOnly = async (req: any, res: Response, next: NextFunction) => {
    if(req.userRole === 'customer') {
        const request: IRequest = await SupportRequest.findOne({
            _id: req.params.id,
            user: req.userId
        });

        if(! request) {
            return res.status(HttpStatusCodes.FORBIDDEN)
                .json({ message: 'Authorization denied.' });
        }
    }

    next();
};
