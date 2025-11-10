import City from '../models/City.js';

function pearson(xs, ys) {
  const n = Math.min(xs.length, ys.length);
  if (n === 0) return null;
  const x = xs.slice(0, n), y = ys.slice(0, n);
  const sx = x.reduce((a,b)=>a+b,0), sy = y.reduce((a,b)=>a+b,0);
  const sxx = x.reduce((a,b)=>a+b*b,0), syy = y.reduce((a,b)=>a+b*b,0);
  const sxy = x.reduce((a,b,i)=>a+b*y[i],0);
  const cov = sxy - (sx*sy/n);
  const vx  = sxx - (sx*sx/n);
  const vy  = syy - (sy*sy/n);
  return cov / Math.sqrt(vx * vy);
}

export const q1_fastestGrowing = async (_req, res) => {
  const doc = await City.findOne().sort({ growthRate: -1 });
  res.json({ question: 'What is the fastest growing city?', answer: doc?.city ?? null, value: doc?.growthRate ?? null });
};

export const q2_largestPopulation = async (_req, res) => {
  const doc = await City.findOne().sort({ population: -1 });
  res.json({ question: 'Which city has the largest population?', answer: doc?.city ?? null, value: doc?.population ?? null });
};

export const q3_highestDensity = async (_req, res) => {
  const doc = await City.findOne().sort({ density: -1 });
  res.json({ question: 'Which city has the highest population density?', answer: doc?.city ?? null, value: doc?.density ?? null });
};

export const q4_youngestCity = async (_req, res) => {
  const doc = await City.findOne().sort({ averageAge: 1 });
  res.json({ question: 'Which city has the youngest average age?', answer: doc?.city ?? null, value: doc?.averageAge ?? null });
};

export const q5_oldestCity = async (_req, res) => {
  const doc = await City.findOne().sort({ averageAge: -1 });
  res.json({ question: 'Which city has the oldest average age?', answer: doc?.city ?? null, value: doc?.averageAge ?? null });
};

export const q6_top5Densest = async (_req, res) => {
  const docs = await City.find().sort({ density: -1 }).limit(5);
  res.json({ question: 'Top 5 most dense cities', answer: docs.map(d => d.city), items: docs });
};

export const q7_weightedAvgAge = async (_req, res) => {
  const docs = await City.find();
  const popSum = docs.reduce((a,b)=>a + b.population, 0);
  const wAvg   = popSum ? docs.reduce((a,b)=>a + (b.population * b.averageAge), 0) / popSum : null;
  res.json({ question: 'Population-weighted average age across all cities', answer: wAvg });
};

export const q8_densityGrowthCorrelation = async (_req, res) => {
  const docs = await City.find();
  const xs = docs.map(d=>d.density);
  const ys = docs.map(d=>d.growthRate);
  res.json({ question: 'Correlation between density and growth rate', answer: pearson(xs, ys) });
};
