import { Router } from 'express';

import auth from './auth';

const routes = Router();

routes.use('/api/auth', auth);

export default routes;
