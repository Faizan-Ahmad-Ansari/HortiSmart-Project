import axios from 'axios';
import Market from '../models/Market.js';

/**
 * Fetches market data from data.gov.in and stores it in MongoDB.
 * Handles field name variations and connection issues.
 */
export const fetchAndStoreMarketData = async () => {
  try {
    const apiKey = process.env.DATA_GOV_API_KEY;
    
    // 2. Cleanup old data before sync (Delete anything before 2024)
    const cutoffDate = new Date('2024-01-01');
    await Market.deleteMany({ date: { $lt: cutoffDate } });

    if (!apiKey) {
      console.warn('⚠️ DATA_GOV_API_KEY is missing. Using dummy data only.');
      return await Market.find().sort({ date: -1 });
    }
    
    const resourceId = process.env.DATA_GOV_RESOURCE_ID || '35985678-0d79-46b4-9ed6-6f13308a1d24';
    const fallbackResourceId = '9ef273ef-a641-4de2-a2a1-3a90ff7d573e';

    // Attempt fetch with primary resource ID
    let records = await fetchFromAPI(resourceId, apiKey);

    // Fallback if primary returns no data
    if (!records || records.length === 0) {
      records = await fetchFromAPI(fallbackResourceId, apiKey);
    }

    if (!records || records.length === 0) {
      console.log('⚠️ No data found from any API resource.');
      return await Market.find().sort({ date: -1 });
    }

    // 4. Normalize and Deduplicate API records in-memory before saving
    const uniqueBatch = new Map();
    
    records.forEach(record => {
      const crop = (record.commodity || record.Commodity || '').trim();
      const price = record.modal_price || record.Modal_Price;
      const market = (record.market || record.Market || record.mandi || '').trim();
      const arrivalDate = record.arrival_date || record.Arrival_Date;

      if (crop && price && market) {
        const key = `${crop}-${market}`;
        
        let date = new Date();
        if (arrivalDate) {
          const parts = arrivalDate.split('/');
          if (parts.length === 3) {
            date = new Date(parts[2], parts[1] - 1, parts[0]);
          }
        }

        if (date < cutoffDate) return;

        if (!uniqueBatch.has(key)) {
          uniqueBatch.set(key, {
            crop,
            price: Number(price) / 100, 
            location: market,
            date,
            type: crop.toLowerCase().includes('fruit') || ['Mango', 'Apple', 'Banana'].includes(crop) ? 'Fruit' : 'Vegetable'
          });
        }
      }
    });

    // 5. Upsert unique batch
    for (const data of uniqueBatch.values()) {
      await Market.findOneAndUpdate(
        { crop: data.crop, location: data.location },
        data,
        { upsert: true }
      );
    }

    console.log(`✅ Successfully synced ${uniqueBatch.size} unique records.`);
    return await Market.find().sort({ date: -1 });

  } catch (error) {
    console.error('❌ Market Data Sync Error:', error.message);
    return await Market.find().sort({ date: -1 });
  }
};

/**
 * Helper to fetch data from data.gov.in with appropriate headers
 */
const fetchFromAPI = async (resourceId, apiKey) => {
  const url = `https://api.data.gov.in/resource/${resourceId}?api-key=${apiKey}&format=json&limit=500`;
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'HortiSmart-App/1.0 (AgriTech Platform)'
      },
      timeout: 15000
    });
    return response.data?.records || [];
  } catch (error) {
    console.error(`API Fetch Error for ${resourceId}:`, error.message);
    return [];
  }
};

/**
 * Fallback to dummy data for local development/testing
 */
const storeDummyData = async () => {
  const dummy = [
    { crop: 'Tomato', price: 20, location: 'Jaipur Mandi', type: 'Vegetable', date: new Date() },
    { crop: 'Potato', price: 15, location: 'Alwar Mandi', type: 'Vegetable', date: new Date() },
    { crop: 'Onion', price: 25, location: 'Sikar Mandi', type: 'Vegetable', date: new Date() },
    { crop: 'Mango', price: 40, location: 'Ratnagiri', type: 'Fruit', date: new Date() },
    { crop: 'Apple', price: 120, location: 'Kashmir Mandi', type: 'Fruit', date: new Date() },
    { crop: 'Banana', price: 30, location: 'Solapur Mandi', type: 'Fruit', date: new Date() },
    { crop: 'Chilli', price: 80, location: 'Guntur Mandi', type: 'Vegetable', date: new Date() },
    { crop: 'Carrot', price: 25, location: 'Ooty Mandi', type: 'Vegetable', date: new Date() }
  ];

  for (const data of dummy) {
    await Market.findOneAndUpdate(
      { crop: data.crop, location: data.location },
      data,
      { upsert: true }
    );
  }

  console.log(`⚠️ Fallback: ${dummy.length} dummy records inserted/updated.`);
  return dummy;
};