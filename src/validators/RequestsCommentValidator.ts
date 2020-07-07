import { body, check, param } from 'express-validator';
import SupportRequest from '../models/SupportRequest';
import User from '../models/User';
import Comment from "../models/Comment";

export const requestsCommentCreationRules = () => {
    return [
        param('id').custom(requestId => {
            return SupportRequest.findById(requestId).then(request => {
                if (! request)
                    return Promise.reject('Request not found.');
            });
        }),
        body('content').trim().notEmpty().isLength({ min: 5, max: 255 }).withMessage('Content is required'),
        body('user').custom(userId => {
            return User.findById(userId).then(request => {
                if (! request)
                    return Promise.reject('User not found.');
            })
        }),
        check(['id']).custom(async (id, { req}) => {
            return Comment.find({ request: id }).populate('user', 'role').then(async (comments) => {
                const user = await User.findById(req.body.user);

                if(comments.length === 0 && user.role === 'customer') {
                    return Promise.reject('Cannot post comment before support agent.');
                }

                let hasSupportAgentCommented = comments.some((comment: any) => comment.user.role === 'support');
                if(! hasSupportAgentCommented && user.role === 'customer' ) {
                    return Promise.reject('Cannot post comment before support agent.');
                }
            });
        })
    ]
};
