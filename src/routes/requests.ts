import { Router } from 'express';
import RequestsController from '../controllers/RequestsController';
import { verifyToken } from '../middlewares/auth.middleware';
import { requestsCreationRules, requestsShowRules, requestsUpdateRules } from '../validators/RequestsValidator';
import { validate } from '../middlewares/validate.middleware';
import {
    requestsCommentCreationRules,
    requestsCommentShowRules,
    requestsCommentViewRules
} from '../validators/RequestsCommentValidator';
import RequestsCommentController from '../controllers/RequestsCommentController';

const router = Router();

router.get('/report', verifyToken, RequestsController.report);
router.post('/', verifyToken, requestsCreationRules(), validate, RequestsController.create);
router.get('/:id', verifyToken, requestsShowRules(), validate, RequestsController.show);
router.get('/', verifyToken , RequestsController.index);
router.patch('/:id', verifyToken, requestsUpdateRules(), validate, RequestsController.update);

router.post('/:id/comments', requestsCommentCreationRules(), validate , RequestsCommentController.create);
router.get('/:id/comments', requestsCommentShowRules(), validate , RequestsCommentController.index);
router.get('/:id/comments/:commentId', requestsCommentViewRules(), validate , RequestsCommentController.show);

export default router;
