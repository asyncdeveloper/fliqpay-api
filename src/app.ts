import * as express from 'express';
import * as cors from 'cors';
import * as helmet from 'helmet';
import routes from './routes/index';
import connectDB from "./config/database";
import { errorHandler } from './middlewares/error.middleware';
import { notFoundHandler } from './middlewares/notFound.middleware';
import { Mongoose } from "mongoose";

class App {
    public express: express.Application;
    public connection: any;

    public constructor () {
        this.express = express();

        this.setUpMiddlewares();

        this.setUpRoutes();

        this.connection = App.setUpDatabase();

        this.express.use(notFoundHandler);
        this.express.use(errorHandler);
    }

    private setUpMiddlewares(): void {
        this.express.use(cors());
        this.express.use(helmet());
        this.express.use(express.json());
    }

    private setUpRoutes(): void {
        this.express.use('/', routes);
    }

    private static async setUpDatabase(): Promise<Mongoose> {
        return await connectDB();
    }

}

export default new App();
