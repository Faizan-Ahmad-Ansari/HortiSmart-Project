import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  location: { type: String, required: true },
  preferredCrops: [{ type: String }],
  alertEmail: { type: String },
  dailyTipsEnabled: { type: Boolean, default: false }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
