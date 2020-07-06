import { Request, Response, Router } from 'express';

import auth from './auth';
import cypress from './cypress';

const routes = Router();

routes.use('/api/auth', auth);
routes.use('/cypress', cypress);

routes.get('/',( req: Request, res: Response) => {
    res.json({ message: 'Hello World' })
});

export default routes;
