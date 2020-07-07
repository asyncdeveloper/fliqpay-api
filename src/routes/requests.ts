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
import { isCustomerOnly, isCustomerRequestOnly, isSupportOnly } from '../middlewares/access.middleware';

const router = Router();

router.get('/report', [ verifyToken, isSupportOnly ], RequestsController.report);

// Requests CRUD
router.post('/', [ verifyToken, isCustomerOnly ], requestsCreationRules(), validate, RequestsController.create);
router.get('/:id', [ verifyToken,isCustomerRequestOnly ], requestsShowRules(), validate, RequestsController.show);
router.get('/', [ verifyToken, isSupportOnly ] , RequestsController.index);
router.patch('/:id', [ verifyToken, isSupportOnly ], requestsUpdateRules(), validate, RequestsController.update);

//Comments
router.post('/:id/comments', verifyToken, requestsCommentCreationRules(), validate , RequestsCommentController.create);
router.get('/:id/comments', verifyToken , requestsCommentShowRules(), validate , RequestsCommentController.index);
router.get('/:id/comments/:commentId', verifyToken, requestsCommentViewRules(), validate , RequestsCommentController.show);

export default router;
