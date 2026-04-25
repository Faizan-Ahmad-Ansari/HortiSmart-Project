import Market from '../models/Market.js';
import { fetchAndStoreMarketData } from '../services/marketService.js';

export const getMarketData = async (req, res) => {
  try {
    const data = await Market.find().sort({ date: -1 }).limit(100);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUniqueCrops = async (req, res) => {
  try {
    const crops = await Market.distinct('crop');
    res.status(200).json(crops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateMarketData = async (req, res) => {
  try {
    const data = await fetchAndStoreMarketData();
    res.status(200).json({ message: 'Market data updated successfully', count: data.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
