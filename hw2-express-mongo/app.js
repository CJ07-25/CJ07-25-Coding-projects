import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

import cityRoutes from './routes/cityRoutes.js';
import questionRoutes from './routes/questionRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (_req, res) => {
  res.json({ ok: true, service: 'HW2 API', version: '1.0.0' });
});

app.use('/api/cities', cityRoutes);
app.use('/questions', questionRoutes);

const PORT = process.env.PORT || 3000;
const URI  = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hw2';

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(URI).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  }).catch((err) => {
    console.error('Mongo connection error:', err.message);
    process.exit(1);
  });
}

export default app; // for testing
