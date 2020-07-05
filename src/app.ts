import * as express from 'express';
import * as cors from 'cors';
import * as helmet from 'helmet';
import routes from './routes/index';
import connectDB from "./config/database";

class App {
    public express: express.Application;
    public connection: any;

    public constructor () {
        this.express = express();

        this.setUpMiddlewares();

        this.setUpRoutes();

        this.connection = App.setUpDatabase();
    }

    private setUpMiddlewares(): void {
        this.express.use(cors());
        this.express.use(helmet());
        this.express.use(express.json());
    }

    private setUpRoutes(): void {
        this.express.use('/', routes);
    }

    private static async setUpDatabase(): Promise<void> {
        return await connectDB();
    }

}

export default new App();
