import { Router } from 'express'
import AuthController from '../controllers/AuthController';
import { userLoginRules, userRegisterationRules } from '../validators/UserValidator';
import { validate } from "../middlewares/validate.middleware";

const router = Router();

router.post('/register', userRegisterationRules(), validate , AuthController.register);
router.post('/login', userLoginRules(), validate , AuthController.login);

export default router;
