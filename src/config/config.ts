require('custom-env').env(process.env.NODE_ENV || true);

export default {
    MONGO_URI: process.env.MONGO_URI || `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    APP_URL : process.env.APP_URL || 'localhost',
    APP_PORT: process.env.APP_PORT || 3001
}
