import { Router } from 'express';
import RequestsController from '../controllers/RequestsController';
import { verifyToken } from '../middlewares/auth.middleware';
import { requestsCreationRules } from '../validators/RequestsValidator';
import { validate } from '../middlewares/validate.middleware';

const router = Router();

router.post('/', verifyToken, requestsCreationRules(), validate, RequestsController.create);
router.get('/:id', verifyToken , RequestsController.show);

export default router;
