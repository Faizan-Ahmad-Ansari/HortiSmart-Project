import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Market from '../models/Market.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const checkDB = async () => {
  try {
    const uri = 'mongodb://localhost:27017/hortismart';
    await mongoose.connect(uri);
    const data = await Market.find().sort({ date: -1 });
    console.log(`Total records in DB: ${data.length}`);
    data.slice(0, 20).forEach(d => {
        console.log(`Crop: ${d.crop}, Price: ${d.price}, Date: ${d.date}, Location: ${d.location}`);
    });
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.disconnect();
  }
};

checkDB();
