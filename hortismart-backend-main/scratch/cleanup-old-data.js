import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Market from '../models/Market.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const cleanupData = async () => {
  try {
    const uri = 'mongodb://localhost:27017/hortismart';
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
    
    const cutoffDate = new Date('2024-01-01');
    console.log(`Deleting data before ${cutoffDate.toISOString()}...`);
    
    const result = await Market.deleteMany({ date: { $lt: cutoffDate } });
    console.log(`Successfully deleted ${result.deletedCount} old records.`);

    // Also check for any remaining records
    const remaining = await Market.countDocuments();
    console.log(`Total records remaining: ${remaining}`);

  } catch (error) {
    console.error('Error during cleanup:', error);
  } finally {
    await mongoose.disconnect();
  }
};

cleanupData();
