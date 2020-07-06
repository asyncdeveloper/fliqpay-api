import { Router } from 'express'
import AuthController from '../controllers/AuthController';
import { userValidationRules } from '../validators/UserValidator';
import { validate } from "../middlewares/validate.middleware";

const router = Router();

router.post('/register', userValidationRules(), validate , AuthController.register);

export default router;
