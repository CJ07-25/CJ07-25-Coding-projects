import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../app.js';
import City from '../models/City.js';

let mongo;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

beforeEach(async () => {
  await City.deleteMany({});
  await City.insertMany([
    { city: 'Springfield', population: 150000, growthRate: 2.5, density: 1200, averageAge: 35.6 },
    { city: 'Metropolis',  population: 900000, growthRate: 1.2, density: 4500, averageAge: 37.1 }
  ]);
});

test('POST /api/cities creates a city', async () => {
  const res = await request(app).post('/api/cities').send({
    city: 'Gotham', population: 1100000, growthRate: 3.1, density: 5200, averageAge: 34.2
  });
  expect(res.status).toBe(201);
  expect(res.body.city).toBe('Gotham');
});

test('GET /questions/q1-fastest-growing returns fastest growing city', async () => {
  const res = await request(app).get('/questions/q1-fastest-growing');
  expect(res.status).toBe(200);
  expect(res.body.question).toMatch(/fastest/);
  expect(['Springfield','Metropolis']).toContain(res.body.answer);
});
