import express from 'express';
import { getStorageLocations } from '../controllers/storageController.js';

const router = express.Router();

router.get('/', getStorageLocations);

export default router;
