import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import tasksRouter from './routes/tasks.js';
import journalRouter from './routes/journal.js';

dotenv.config();


const app = express();
const allowedOrigins = [
  "http://localhost:8080",
  "http://localhost:3000",
  "https://amirtask.vercel.app"
];
app.use(cors({
  origin: allowedOrigins
}));
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/tasks', tasksRouter);
app.use('/api/journal', journalRouter);

app.get('/', (req, res) => {
  res.send('Liquid Taskflow Backend Running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
