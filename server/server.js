import http from 'http';
import app from './app.js';
import connectToMongoDB from './config/db.js';
import socketHandler from './socketHandler.js';
import { PORT } from './config/config.js';

// Connect to MongoDB
connectToMongoDB();

// Create HTTP server
const server = http.createServer(app);

// Initialize socket.io for real-time communication
// socketHandler(server);

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running in ${config.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
    console.log(`Unhandled Promise Rejection: ${error.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
    server.close(() => {
        process.exit(1);
    });
});