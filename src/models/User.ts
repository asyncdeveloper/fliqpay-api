import { Document, Model, model, Schema } from 'mongoose';

/**
 * Interface to model the User Schema for TypeScript.
 * @param email:string
 * @param password:string
 * @param name:string
 * @param role:string
 */
export interface IUser extends Document {
    email: string;
    password: string;
    name: string;
    role: string;
}

export const Roles = ['customer', 'admin', 'support'];

const userSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        minlength:[5]
    },
    role: {
        type: String,
        required: true,
        enum : Roles,
        default: Roles[0]
    },
});

const User: Model<IUser> = model("User", userSchema);

export default User;
