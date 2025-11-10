import fs from 'fs';
import path from 'path';
import url from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import City from '../models/City.js';

dotenv.config();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const dataPath = path.join(__dirname, '..', 'data', 'data-1.json');

const run = async () => {
  const URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hw2';
  await mongoose.connect(URI);

  const raw = fs.readFileSync(dataPath, 'utf8');
  const json = JSON.parse(raw);
  const rows = Array.isArray(json) ? json : [json];

  await City.deleteMany({});
  await City.insertMany(rows);
  console.log(`Inserted ${rows.length} city record(s).`);
  await mongoose.disconnect();
};

run().catch((e)=>{
  console.error('Seed error:', e.message);
  process.exit(1);
});
