import HttpException from '../common/HttpException';
import { Request, Response } from 'express';
import * as HttpStatusCodes from "http-status-codes";

export const errorHandler = (error: HttpException, request: Request, response: Response) => {
    const status = error.statusCode || HttpStatusCodes.INTERNAL_SERVER_ERROR;
    const message = error.message || "It's not you. It's us. We are having some problems.";
    response.status(status).json({ message });
};
