import { Document, Model, model, Schema } from 'mongoose';

/**
 * Interface to model the Comment Schema for TypeScript.
 * @param content:string
 * @param user:string
 * @param request:string
 */
export interface IComment extends Document {
    content: string;
    user: string;
    request: string;
}

const commentSchema: Schema = new Schema({
    content: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    request: {
        type: Schema.Types.ObjectId,
        ref: 'SupportRequest'
    }
},{ versionKey: false, timestamps: true });

const Comment: Model<IComment> = model("Comment", commentSchema);

export default Comment;
