import { Request, Response, Router } from 'express';

import auth from './auth';

const routes = Router();

routes.use('/api/auth', auth);

routes.get('/',( req: Request, res: Response) => {
    res.json({ message: 'Hello World' })
});

export default routes;
