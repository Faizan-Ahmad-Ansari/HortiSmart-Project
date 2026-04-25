import express from 'express';
import { getMarketData, updateMarketData, getUniqueCrops } from '../controllers/marketController.js';

const router = express.Router();

router.get('/', getMarketData);
router.get('/crops', getUniqueCrops);
router.post('/update', updateMarketData);

export default router;
