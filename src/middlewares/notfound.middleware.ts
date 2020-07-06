import { NextFunction, Request, Response } from 'express';
import * as HttpStatusCodes from "http-status-codes";

export const notFoundHandler = (request: Request, response: Response, next: NextFunction) => {
    response.status(HttpStatusCodes.NOT_FOUND).json({ message :'Resource not found' });
};
