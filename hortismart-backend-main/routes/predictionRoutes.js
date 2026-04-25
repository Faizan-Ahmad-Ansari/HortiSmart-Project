import express from 'express';
import { getCropPrediction } from '../controllers/predictionController.js';

const router = express.Router();

router.get('/:crop', getCropPrediction);

export default router;
