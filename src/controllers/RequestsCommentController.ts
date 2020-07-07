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
    };

    public index = async (req: Request, res: Response): Promise<Response> => {
        try {
            const comments: IComment[] = await Comment.find({
                request: req.params.id,
            }).populate('user', '_id name role email');

            return res.status(HttpStatusCodes.OK).json({
                message: 'Request comments retrieved successfully.',
                data: comments
            });

        } catch (e) {
            return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: "Something went wrong. It's not your fault and we apologize for this"
            });
        }
    };

    public show = async (req: Request, res: Response): Promise<Response> => {
        try {
            const comments: IComment = await Comment.findOne({
                _id: req.params.commentId,
            }).populate('user', '_id name role email');

            return res.status(HttpStatusCodes.OK).json({
                message: 'Request comment retrieved successfully.',
                data: comments
            });

        } catch (e) {
            return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: "Something went wrong. It's not your fault and we apologize for this"
            });
        }
    };

}

export default new RequestsCommentController();
