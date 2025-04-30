import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';

import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import messageRoutes from './routes/message.routes.js';
import interestRoutes from './routes/interest.routes.js';
import friendSuggestionsRoutes from './routes/friendSuggestions.routes.js';
import connectToMongoDB from './db/connectToMongoDB.js';

const app = express();
// connectToMongoDB();

dotenv.config();

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser()); // to parse the incoming cookies

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/interests', interestRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/friend_suggest', friendSuggestionsRoutes);

export default app;

