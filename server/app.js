import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';
import friendSuggestionsRoutes from './routes/friendSuggestions.routes.js';
import connectToMongoDB from './db/connectToMongoDB.js';
import friendDetailsRoutes from "./routes/friendDetails.routes.js";

const app = express();
const PORT = process.env.PORT || 3001;

dotenv.config();

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser()); // to parse the incoming cookies

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);
app.use('/api/suggest', friendSuggestionsRoutes);
app.use('/api/', [
    friendDetailsRoutes,
    messageRoutes
]);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// app.get('/', (req, res) => { 
//     // root route http://localhost:3000/
//     res.send('Hello World!!');
// });

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on port ${PORT}`);
});

