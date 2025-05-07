import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import path from 'path';
import rateLimit from 'express-rate-limit';
import { errorHandler } from './middleware/errorHandler.js';
import { config } from './config/config.js';
import cookieParser from 'cookie-parser';

// Routes
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import interestRoutes from './routes/interest.routes.js';
import messageRoutes from './routes/message.routes.js';
import friendsRecommendationRoutes from './routes/friendsRecommendation.routes.js';

const app = express();

// Middleware
app.use(helmet()); 
app.use(cors());

// Request Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes.'
});
app.use(limiter);

if (config.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json({ limit: '10kb' })); // to parse the incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true, limit: '10kb' })); // to parse the incoming requests with URL-encoded payloads
// app.use(cookieParser()); // to parse the incoming cookies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/interests', interestRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/recommendations', friendsRecommendationRoutes);

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

app.get('/api', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Welcome to the Student Connect API',
        timestamp: new Date().toISOString()
    });
});

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

export default app;

