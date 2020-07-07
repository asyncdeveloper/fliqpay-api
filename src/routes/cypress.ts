import { Request, Response, Router } from 'express';
import app from '../app';
import { Mongoose } from "mongoose";
import * as bcrypt from "bcryptjs";

const router = Router();

router.get('/clear-db', async (req: Request, res: Response) => {
    const con : Mongoose = await app.connection;
    await con.connection.db.dropDatabase();
    return res.json({ status : true });
});

router.post('/seed-user', async (req: Request, res: Response) => {
    const mongoose : Mongoose = await app.connection;

    let { email, password , name, role } = req.body;

    password = await bcrypt.hash(password, await bcrypt.genSalt(10));

    await mongoose.connection.db.collection('users').insertOne({
        email, password, name, role
    });

    return res.json({ status : true });
});

router.post('/seed-request', async (req: Request, res: Response) => {
    const mongoose : Mongoose = await app.connection;

    const { name } = req.body;

    const user = await mongoose.connection.db.collection('users').insertOne({
        name: 'Test', email: 'Assss'
    });

    await mongoose.connection.db.collection('requests').insertOne({ name, user });

    return res.json({ status : true });
});

router.get('/get-request', async (req: Request, res: Response) => {
    const mongoose : Mongoose = await app.connection;
    const data =  await mongoose.connection.db.collection('requests').findOne({});

    return res.json({ status : true, data });
});

export default router;
