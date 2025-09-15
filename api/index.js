// api/index.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';
import tutorialRoutes from './routes/tutorial.route.js';
import quizRoutes from './routes/quiz.route.js';
import adminRoutes from './routes/admin.route.js';
import codeSnippetRoutes from './routes/codeSnippet.route.js';
import cppRoutes from './routes/cpp.route.js';
import pythonRoutes from './routes/python.route.js';
import executeRoutes from './routes/execute.route.js';

import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import { verifyToken } from './utils/verifyUser.js';
import { verifyAdmin } from './utils/verifyAdmin.js';

dotenv.config();

// Destructure environment variables with sensible defaults for non-critical ones.
// Only JWT_SECRET is required for the server to run.
const {
    MONGO_URI = 'mongodb://0.0.0.0:27017/myappp',
    CORS_ORIGIN = 'http://localhost:5173',
    PORT = 3000,
    JWT_SECRET,
} = process.env;

if (!JWT_SECRET) {
    console.error('JWT_SECRET is not set. Exiting.');
    process.exit(1);
}

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log(err);
    });

// Resolve the directory name of this module in an ESM-compatible way
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(
    cors({
        origin: CORS_ORIGIN,
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/tutorial', tutorialRoutes);
app.use('/api/admin', verifyToken, verifyAdmin, adminRoutes);
app.use('/api/code-snippet', codeSnippetRoutes);
app.use('/api', quizRoutes);
app.use('/api/code', cppRoutes); // NEW: Use the new C++ route
app.use('/api/code', pythonRoutes); // NEW: Use the new Python route
app.use('/api', executeRoutes); // NEW: Unified execution route for JS/Python

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

app.use((err, req, res, next) => {
    // ==========================================================
    // UPDATED: Log the full stack trace to the server console
    // ==========================================================
    console.error('SERVER ERROR:', err.stack);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}!`);
    });
}

export default app;