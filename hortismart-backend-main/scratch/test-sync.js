import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { fetchAndStoreMarketData } from '../services/marketService.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const testSync = async () => {
  try {
    console.log('Using API Key:', process.env.DATA_GOV_API_KEY);
    console.log('Using Resource ID:', process.env.DATA_GOV_RESOURCE_ID);

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    console.log('Starting Market Data Sync...');
    const data = await fetchAndStoreMarketData();
    console.log(`Sync completed. Fetched ${data.length} records.`);
    
    if (data.length > 0) {
        const sample = data[0];
        console.log(`Sample: Crop: ${sample.crop}, Price: ${sample.price}, Date: ${sample.date}, Location: ${sample.location}`);
    }

  } catch (error) {
    console.error('Error during sync test:', error);
  } finally {
    await mongoose.disconnect();
  }
};

testSync();
