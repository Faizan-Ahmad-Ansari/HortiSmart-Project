import { getPricePredictions } from '../services/predictionService.js';

export const getCropPrediction = async (req, res) => {
  try {
    const { crop } = req.params;
    const predictions = await getPricePredictions(crop);
    res.status(200).json({ crop, predictions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
