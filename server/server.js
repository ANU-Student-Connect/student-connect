import dotenv from 'dotenv';
import http from 'http';
import app from './app.js';
import connectToMongoDB from './db/connectToMongoDB.js';

const PORT = process.env.PORT || 3001;

const server = http.createServer(app);

dotenv.config();

server.listen(PORT, () => {
    // connectToMongoDB();
    console.log(`Server is running on port ${PORT}`);
});
