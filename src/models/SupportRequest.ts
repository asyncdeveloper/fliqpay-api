import { Document, Model, model, Schema } from 'mongoose';
import { IUser } from "./User";

/**
 * Interface to model the Request Schema for TypeScript.
 * @param name:string
 * @param status:string
 * @param user:IUser
 */
export interface IRequest extends Document {
    name: string;
    status: string;
    user: IUser;
}

export const Status = [ 'created', 'in_progress', 'closed' ];

const requestSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        minlength:[5]
    },
    status: {
        type: String,
        enum : Status,
        default: Status[0]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},{ versionKey: false, timestamps: true });

const SupportRequest: Model<IRequest> = model("SupportRequest", requestSchema);

export default SupportRequest;
