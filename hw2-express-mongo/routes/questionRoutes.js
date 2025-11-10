import { Router } from 'express';
import {
  q1_fastestGrowing,
  q2_largestPopulation,
  q3_highestDensity,
  q4_youngestCity,
  q5_oldestCity,
  q6_top5Densest,
  q7_weightedAvgAge,
  q8_densityGrowthCorrelation
} from '../controllers/questionController.js';

const router = Router();

router.get('/q1-fastest-growing', q1_fastestGrowing);
router.get('/q2-largest-population', q2_largestPopulation);
router.get('/q3-highest-density', q3_highestDensity);
router.get('/q4-youngest-city', q4_youngestCity);
router.get('/q5-oldest-city', q5_oldestCity);
router.get('/q6-top5-densest', q6_top5Densest);
router.get('/q7-weighted-average-age', q7_weightedAvgAge);
router.get('/q8-density-growth-corr', q8_densityGrowthCorrelation);

export default router;
