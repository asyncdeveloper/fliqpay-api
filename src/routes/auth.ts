import { Router } from 'express'
import AuthController from '../controllers/AuthController';

const router = Router();

router.get('/register', AuthController.register);

export default router;
