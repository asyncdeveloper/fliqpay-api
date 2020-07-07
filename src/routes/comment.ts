import { Router } from 'express';
import { validate } from '../middlewares/validate.middleware';
import { requestsCommentCreationRules } from '../validators/RequestsCommentValidator';
import RequestsCommentController from '../controllers/RequestsCommentController';

const router = Router();

router.post('/', requestsCommentCreationRules(), validate , RequestsCommentController.create);

export default router;
