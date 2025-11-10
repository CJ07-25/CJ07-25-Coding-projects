import { Router } from 'express';
import { createCity, getCities, getCity, updateCity, deleteCity } from '../controllers/cityController.js';

const router = Router();

router.post('/', createCity);
router.get('/', getCities);
router.get('/:id', getCity);
router.put('/:id', updateCity);
router.delete('/:id', deleteCity);

export default router;
