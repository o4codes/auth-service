require('dotenv').config();

const config = {
    app: {
        port: Number.parseInt(process.env.PORT) || 3000
    },
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: Number.parseInt(process.env.DB_PORT) || 27017,
        name: process.env.DB_NAME || 'node-auth-api'
    },
    mail: {
        username: process.env.MAIL_USERNAME,
        password: process.env.MAIL_PASSWORD,
        oauth_client_id: process.env.OAUTH_CLIENT_ID,
        oauth_client_secret: process.env.OAUTH_CLIENT_SECRET,
        oauth_refresh_token: process.env.OAUTH_REFRESH_TOKEN,
    }
}

module.exports = config;