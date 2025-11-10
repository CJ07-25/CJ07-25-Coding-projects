import mongoose from 'mongoose';

const CitySchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  population: {
    type: Number,
    required: true,
    min: 0
  },
  growthRate: { // % per year
    type: Number,
    required: true
  },
  density: { // people per sq km
    type: Number,
    required: true,
    min: 0
  },
  averageAge: {
    type: Number,
    required: true,
    min: 0
  }
}, { timestamps: true });

CitySchema.index({ density: -1 });
CitySchema.index({ population: -1 });

export default mongoose.model('City', CitySchema);
