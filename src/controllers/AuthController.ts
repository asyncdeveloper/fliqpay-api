import { Request, Response } from 'express';
import * as HttpStatusCodes from 'http-status-codes';
import User, { IUser } from '../models/User';
import * as bcrypt from 'bcryptjs';
import * as  jwt from 'jsonwebtoken';
import config from '../config/config';

class AuthController {
    public register = async (req: Request, res: Response): Promise<Response> => {
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
            return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: "Something went wrong. It's not your fault and we apologize for this"
            });
        }
    };

    public login = async (req: Request, res: Response): Promise<Response> => {
        const { email, password } = req.body;

        try {
            let user: IUser = await User.findOne({ email });

            if (! user) {
                return res.status(HttpStatusCodes.UNAUTHORIZED).json({
                    errors: [{ message: "Invalid Credentials" }]
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(HttpStatusCodes.UNAUTHORIZED).json({
                    errors: [{ message: "Invalid Credentials" }]
                });
            }

            const payload = { userId: user._id, role: user.role };

            const token: string = await jwt.sign(
                payload,
                config.JWT_SECRET,
                { expiresIn: config.JWT_EXPIRATION
            });

            return res.status(HttpStatusCodes.OK).json({
                data : {
                    "_id": user._id,
                    "name": user.name,
                    "email": user.email,
                    "role": user.role
                },
                message: "User signed in successfully.",
                token,
            });
        } catch (e) {
            return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: "Something went wrong. It's not your fault and we apologize for this"
            });
        }
    };
}

export default new AuthController();
