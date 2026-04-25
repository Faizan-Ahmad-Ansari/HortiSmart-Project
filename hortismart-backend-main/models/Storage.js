import mongoose from 'mongoose';

const storageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  capacity: { type: Number, required: true }, // in Tons
  pricePerDay: { type: Number, required: true },
  lat: { type: Number },
  lng: { type: Number }
}, { timestamps: true });

const Storage = mongoose.model('Storage', storageSchema);
export default Storage;
