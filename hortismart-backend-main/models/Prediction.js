import mongoose from 'mongoose';

const predictionSchema = new mongoose.Schema({
  crop: { type: String, required: true, unique: true },
  predictions: [{
    month: { type: String, required: true },
    price: { type: Number, required: true }
  }]
}, { timestamps: true });

const Prediction = mongoose.model('Prediction', predictionSchema);
export default Prediction;
