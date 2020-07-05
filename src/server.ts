import app from './app';
import config from "./config/config";

app.express.listen(config.APP_PORT, () => {
    console.log(`Server started on ${config.APP_URL}:${config.APP_PORT}`);
});
