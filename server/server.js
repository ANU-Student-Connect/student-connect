import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';
import connectToMongoDB from './db/connectToMongoDB.js';

const app = express();
const PORT = process.env.PORT || 3001;

dotenv.config();

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser()); // to parse the incoming cookies

// 启用 CORS 允许前端地址请求
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true  // 允许携带 cookie（JWT）
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

// app.get('/', (req, res) => {
//     // root route http://localhost:3000/
//     res.send('Hello World!!');
// });

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on port ${PORT}`);
});