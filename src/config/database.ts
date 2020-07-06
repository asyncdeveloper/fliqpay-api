import config from '../config/config';
import { connect, ConnectionOptions } from 'mongoose';

const connectDB = async () => {
    try {
        const mongoURI: string = config.MONGO_URI;
        const options: ConnectionOptions = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        };
        console.log(`MongoDB Connected to ${mongoURI}`);
        return await connect(mongoURI, options);
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

export default connectDB;
