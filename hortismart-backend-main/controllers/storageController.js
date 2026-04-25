import Storage from '../models/Storage.js';

export const getStorageLocations = async (req, res) => {
  try {
    const data = await Storage.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Helper to seed dummy storage data if empty
export const seedStorageData = async () => {
  const count = await Storage.countDocuments();
  if (count === 0) {
    await Storage.create([
      { name: 'Jaipur Cold Storage', location: 'Mansarovar, Jaipur', capacity: 500, pricePerDay: 50 },
      { name: 'AgriSafe Warehouse', location: 'Sitapura, Jaipur', capacity: 1200, pricePerDay: 35 },
      { name: 'FreshGuard Rentals', location: 'Chomu, Rajasthan', capacity: 800, pricePerDay: 45 }
    ]);
  }
};
