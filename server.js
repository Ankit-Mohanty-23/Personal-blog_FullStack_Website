import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from 'cors';
import postRoutes from './routes/postRoutes.js';
import authRoutes from './routes/authRoutes.js';
import connectdb from "./database/db.js";

const app = express();

const allowedOrigins = [process.env.FRONTEND_URL];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    connectdb()
    console.log(`Server is running in ${PORT}`);
});
