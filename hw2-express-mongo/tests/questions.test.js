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
    { city: 'A', population: 10, growthRate: 2, density: 100, averageAge: 30 },
    { city: 'B', population: 20, growthRate: 5, density: 200, averageAge: 40 },
    { city: 'C', population: 30, growthRate: -1, density: 300, averageAge: 25 }
  ]);
});

it('q6 top5 densest returns array', async () => {
  const res = await request(app).get('/questions/q6-top5-densest');
  expect(res.status).toBe(200);
  expect(Array.isArray(res.body.items)).toBe(true);
  expect(res.body.items.length).toBeGreaterThan(0);
});

it('q7 weighted average age returns a number', async () => {
  const res = await request(app).get('/questions/q7-weighted-average-age');
  expect(res.status).toBe(200);
  expect(typeof res.body.answer).toBe('number');
});
