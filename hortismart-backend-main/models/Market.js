import mongoose from 'mongoose';

const marketSchema = new mongoose.Schema({
  crop: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  type: { type: String, default: 'Vegetable' }, // Default to Vegetable
  date: { type: Date, required: true, default: Date.now }
}, { timestamps: true });

const Market = mongoose.model('Market', marketSchema);
export default Market;
