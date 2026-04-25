import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Storage from '../models/Storage.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const storages = [
  { name: 'Punjab Agro Cold Chain', location: 'Amritsar, Punjab', phone: '+91 98123 45678', email: 'amritsar@agrostore.com', capacity: 2500, pricePerDay: 40, lat: 31.6340, lng: 74.8723 },
  { name: 'Nasik Onion Hub', location: 'Nashik, Maharashtra', phone: '+91 98234 56789', email: 'nashik@onionhub.com', capacity: 5000, pricePerDay: 30, lat: 19.9975, lng: 73.7898 },
  { name: 'Himachal Apple Care', location: 'Shimla, Himachal Pradesh', phone: '+91 98345 67890', email: 'shimla@applecare.com', capacity: 1500, pricePerDay: 55, lat: 31.1048, lng: 77.1734 },
  { name: 'Nagpur Orange Storage', location: 'Nagpur, Maharashtra', phone: '+91 98456 78901', email: 'nagpur@orange.com', capacity: 3000, pricePerDay: 45, lat: 21.1458, lng: 79.0882 },
  { name: 'Bangalore Veggie Safe', location: 'Whitefield, Bangalore', phone: '+91 98567 89012', email: 'blr@veggiesafe.com', capacity: 2000, pricePerDay: 60, lat: 12.9698, lng: 77.7500 },
  { name: 'Hyderabad Spice Cold', location: 'Gachibowli, Hyderabad', phone: '+91 98678 90123', email: 'hyd@spicestore.com', capacity: 4000, pricePerDay: 35, lat: 17.4401, lng: 78.3489 },
  { name: 'Kolkata Potato Depot', location: 'Howrah, West Bengal', phone: '+91 98789 01234', email: 'kol@potatodepot.com', capacity: 6000, pricePerDay: 25, lat: 22.5822, lng: 88.3299 },
  { name: 'Chennai Marine Cold', location: 'Ennore, Chennai', phone: '+91 98890 12345', email: 'chn@marinecold.com', capacity: 3500, pricePerDay: 50, lat: 13.2162, lng: 80.3229 },
  { name: 'Gujarat Cotton & Seed', location: 'Ahmedabad, Gujarat', phone: '+91 98901 23456', email: 'ahd@cottonseed.com', capacity: 4500, pricePerDay: 38, lat: 23.0225, lng: 72.5714 },
  { name: 'Bihar Grain Guard', location: 'Patna, Bihar', phone: '+91 99012 34567', email: 'patna@grainguard.com', capacity: 5500, pricePerDay: 28, lat: 25.5941, lng: 85.1376 },
  { name: 'UP Mango Mansion', location: 'Lucknow, Uttar Pradesh', phone: '+91 99123 45678', email: 'lko@mangomansion.com', capacity: 2000, pricePerDay: 42, lat: 26.8467, lng: 80.9462 },
  { name: 'Kerala Spice Kingdom', location: 'Kochi, Kerala', phone: '+91 99234 56789', email: 'kochi@spicekingdom.com', capacity: 1800, pricePerDay: 65, lat: 9.9312, lng: 76.2673 },
  { name: 'MP Wheat Warehouse', location: 'Indore, MP', phone: '+91 99345 67890', email: 'indore@wheat.com', capacity: 7000, pricePerDay: 22, lat: 22.7196, lng: 75.8577 },
  { name: 'Assam Tea Cold Storage', location: 'Guwahati, Assam', phone: '+91 99456 78901', email: 'ghy@teacold.com', capacity: 1200, pricePerDay: 70, lat: 26.1445, lng: 91.7362 },
  { name: 'Jaipur Pink Storage', location: 'Vaishali, Jaipur', phone: '+91 99567 89012', email: 'jpr@pinkstorage.com', capacity: 1000, pricePerDay: 48, lat: 26.9039, lng: 75.7423 },
  { name: 'Surat Textile & Agri', location: 'Surat, Gujarat', phone: '+91 99678 90123', email: 'surat@textileagri.com', capacity: 3200, pricePerDay: 44, lat: 21.1702, lng: 72.8311 },
  { name: 'Pune Pomegranate Point', location: 'Hadapsar, Pune', phone: '+91 99789 01234', email: 'pune@pompoint.com', capacity: 2200, pricePerDay: 52, lat: 18.5089, lng: 73.9259 },
  { name: 'Ranchi Forest Fresh', location: 'Ranchi, Jharkhand', phone: '+91 99890 12345', email: 'ranchi@forestfresh.com', capacity: 1400, pricePerDay: 46, lat: 23.3441, lng: 85.3094 },
  { name: 'Bhopal Lakeview Storage', location: 'Bhopal, MP', phone: '+91 99901 23456', email: 'bhopal@lakeview.com', capacity: 2800, pricePerDay: 34, lat: 23.2599, lng: 77.4126 },
  { name: 'Dehradun Basmati Bliss', location: 'Dehradun, Uttarakhand', phone: '+91 91012 34567', email: 'ddn@basmatibliss.com', capacity: 1600, pricePerDay: 58, lat: 30.3165, lng: 78.0322 }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Add 20 more locations
    await Storage.insertMany(storages);
    console.log('✅ 20 more storage locations seeded successfully');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seed();
