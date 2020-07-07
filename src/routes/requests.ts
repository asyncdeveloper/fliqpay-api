import { Router } from 'express';
import RequestsController from '../controllers/RequestsController';
import { verifyToken } from '../middlewares/auth.middleware';
import { requestsCreationRules, requestsShowRules, requestsUpdateRules } from '../validators/RequestsValidator';
import { validate } from '../middlewares/validate.middleware';
import { requestsCommentCreationRules } from '../validators/RequestsCommentValidator';
import RequestsCommentController from '../controllers/RequestsCommentController';

const router = Router();

router.post('/', verifyToken, requestsCreationRules(), validate, RequestsController.create);
router.get('/:id', verifyToken, requestsShowRules(), validate, RequestsController.show);
router.get('/', verifyToken , RequestsController.index);
router.patch('/:id', verifyToken, requestsUpdateRules(), validate, RequestsController.update);

router.post('/:id/comments', requestsCommentCreationRules(), validate , RequestsCommentController.create);

export default router;
