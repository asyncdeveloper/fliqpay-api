import { Request, Response } from 'express';
import * as HttpStatusCodes from 'http-status-codes';

class AuthController {
    public register = async (req: Request, res: Response): Promise<Response> => {
        return res
            .status(HttpStatusCodes.ACCEPTED)
            .json({ message: 'Hello World' });
    };
}

export default new AuthController();
