import User from '../models/User.js';

export const subscribeUser = async (req, res) => {
  try {
    const { name, email, location, preferredCrops } = req.body;
    
    // Simple validation
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    const user = await User.findOneAndUpdate(
      { email },
      { name, email, location, preferredCrops },
      { upsert: true, new: true }
    );

    res.status(201).json({ message: 'User subscribed successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
