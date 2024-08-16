require('dotenv').config();

module.exports = {
    DB_USER : process.env.DB_USER,
    DB_PASSWORD : process.env.DB_PASSWORD,
    DB_NAME : process.env.DB_NAME,
    DB_HOST : process.env.DB_HOST,
    DB_PORT : process.env.DB_PORT,
    PORT : process.env.PORT,
    DB_DEPLOY: process.env.DB_DEPLOY,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    YOUTUBE_API_KEY:process.env.YOUTUBE_API_KEY,
    CHANNEL_ID:process.env.CHANNEL_ID,
    GOOGLE_CLIENT_ID :process.env.GOOGLE_CLIENT_ID,
    CLIENT_SECRET : process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI : process.env.REDIRECT_URI
    
}  