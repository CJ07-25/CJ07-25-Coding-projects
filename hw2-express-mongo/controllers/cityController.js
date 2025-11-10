import City from '../models/City.js';

export const createCity = async (req, res) => {
  try {
    const doc = await City.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getCities = async (_req, res) => {
  const docs = await City.find().sort({ city: 1 });
  res.json(docs);
};

export const getCity = async (req, res) => {
  const doc = await City.findById(req.params.id);
  if (!doc) return res.status(404).json({ error: 'Not found' });
  res.json(doc);
};

export const updateCity = async (req, res) => {
  try {
    const doc = await City.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteCity = async (req, res) => {
  const doc = await City.findByIdAndDelete(req.params.id);
  if (!doc) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true });
};
