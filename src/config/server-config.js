const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    SALT: process.env.SALT,
    jwtKey: process.env.jwtKey,
    API_ID: process.env.API_ID,
    SECRET_KEY: process.env.SECRET_KEY,
    PASSWORD: process.env.PASSWORD,
    EMAIL_ID: process.env.EMAIL_ID,
    AWS_ACCESS_KEY:process.env.AWS_ACCESS_KEY,
    AWS_SECRET_KEY:process.env.AWS_SECRET_KEY
}