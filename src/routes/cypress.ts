import { Request, Response, Router } from 'express';
import app from '../app';
import { Mongoose } from "mongoose";

const router = Router();

router.get('/clear-db', async (req: Request, res: Response) => {
    const con : Mongoose = await app.connection;
    await con.connection.db.dropDatabase();
    return res.json({ status : true });
});

export default router;
