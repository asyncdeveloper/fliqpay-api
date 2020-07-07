import { Request, Response } from 'express';
import * as HttpStatusCodes from 'http-status-codes';
import Comment, { IComment } from "../models/Comment";

class RequestsCommentController {

    public create = async (req: Request, res: Response): Promise<Response> => {
        const { content, user } = req.body;
        const requestId = req.params.id;

        try {
            let comment: IComment = await new Comment({ content, user, request: requestId }).save();
            return res.status(HttpStatusCodes.CREATED)
                .json({
                    data: comment,
                    message: "Comment added successfully."
                });
        } catch (e) {
            return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: "Something went wrong. It's not your fault and we apologize for this"
            });
        }
    }

}

export default new RequestsCommentController();
