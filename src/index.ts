import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.ts';
import authRoutes from './routes/authRoutes.ts';

dotenv.config();
connectDB();

const app = express();
// app.use(cors());
const allowedOrigins = [
    'https://admin-5611e.web.app',
    /^http:\/\/localhost:\d+$/, // allow any localhost port
];
app.use(cors({
    origin: allowedOrigins,
    credentials: true, // only if needed
}));
app.use(express.json());

// Auth routes
app.use('/api/auth', authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
