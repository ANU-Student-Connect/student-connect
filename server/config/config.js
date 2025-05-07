import dotenv from 'dotenv';

dotenv.config();

export const config = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3001,
    CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
    MONGO_URI: process.env.MONGO_URI || 'mongodb+srv://studentconnectdatabase:studentconnect@cluster0.ct0mq.mongodb.net/studentconnect?retryWrites=true&w=majority&appName=Cluster0',
    JWT_SECRET: process.env.JWT_SECRET || 'A4Ox9lDzAsQRlpW3UKhzu+eYSnjnhXeauHv/IqfGS4s=',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
    JWT_COOKIE_EXPIRES_IN: process.env.JWT_COOKIE_EXPIRES_IN || 30,
    FILE_UPLOAD_PATH: process.env.FILE_UPLOAD_PATH || './uploads/',
    MAX_FILE_SIZE: process.env.MAX_FILE_SIZE || 1024 * 1024 * 5,
}