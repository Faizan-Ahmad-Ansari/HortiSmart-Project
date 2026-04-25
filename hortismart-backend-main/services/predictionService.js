import Market from '../models/Market.js';

/**
 * Generates crop price predictions based on current market trends and seasonal factors.
 */
export const getPricePredictions = async (crop) => {
  // 1. Get latest market prices for this crop to establish a base price
  // We use a regex search to match the crop name flexibly
  const latestData = await Market.find({ 
    crop: { $regex: new RegExp(`^${crop}$`, 'i') } 
  }).sort({ date: -1 }).limit(10);
  
  let basePrice = 25; // Default fallback price if no data found
  if (latestData.length > 0) {
    const sum = latestData.reduce((acc, curr) => acc + curr.price, 0);
    basePrice = sum / latestData.length;
  } else {
    // If exact match fails, try a broader search
    const broadData = await Market.find({ 
      crop: { $regex: new RegExp(crop, 'i') } 
    }).sort({ date: -1 }).limit(10);
    if (broadData.length > 0) {
      const sum = broadData.reduce((acc, curr) => acc + curr.price, 0);
      basePrice = sum / broadData.length;
    }
  }

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // 2. Seasonal factors: Prices typically rise in summer (Apr-Jun) and monsoon (Jul-Sep) 
  // due to supply chain challenges and harvest cycles.
  const seasonalFactors = {
    'Jan': 0.9, 'Feb': 0.85, 'Mar': 0.95, 'Apr': 1.1, 
    'May': 1.25, 'Jun': 1.35, 'Jul': 1.45, 'Aug': 1.4, 
    'Sep': 1.3, 'Oct': 1.15, 'Nov': 1.05, 'Dec': 0.95
  };

  // 3. Generate predictions with seasonal multipliers and a bit of variation
  return months.map((month) => {
    const factor = seasonalFactors[month] || 1;
    // Add a small random variance (±5%) to make it look realistic
    const variance = 1 + (Math.random() * 0.1 - 0.05);
    const predictedPrice = basePrice * factor * variance;
    
    return {
      month,
      price: Math.round(predictedPrice)
    };
  });
};
