import { NextFunction, Request, Response } from 'express';
import * as HttpStatusCodes from 'http-status-codes';
import User, { IUser } from '../models/User';
import * as bcrypt from "bcryptjs";

class AuthController {
    public register = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        let { email, password , name, role } = req.body;
        try {
            password = await bcrypt.hash(password, await bcrypt.genSalt(10));

            let user: IUser = await new User({name, email, password, role}).save();

            return res.status(HttpStatusCodes.CREATED)
                .json({
                    data: {
                        "_id": user._id,
                        "name": user.name,
                        "email": user.email,
                        "role": user.role
                    },
                    message: "User registered successfully."
                });
        } catch (e) {
            next();
        }
    };
}

export default new AuthController();
