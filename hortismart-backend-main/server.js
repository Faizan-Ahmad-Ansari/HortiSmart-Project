// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import connectDB from './config/db.js';

// // Route imports
// import marketRoutes from './routes/marketRoutes.js';
// import storageRoutes from './routes/storageRoutes.js';
// import predictionRoutes from './routes/predictionRoutes.js';
// import userRoutes from './routes/userRoutes.js';
// import authRoutes from './routes/authRoutes.js';

// // Cron/Seed imports
// import { setupCronJobs } from './cron/marketCron.js';
// import { seedStorageData } from './controllers/storageController.js';

// // Load env vars
// dotenv.config();

// // Connect to Database
// connectDB().then(() => {
//   // Seed initial data if empty
//   seedStorageData();
// });

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/market', marketRoutes);
// app.use('/api/storage', storageRoutes);
// app.use('/api/predict', predictionRoutes);
// app.use('/api/user', userRoutes);
// app.use('/api/auth', authRoutes);

// // Basic health check
// app.get('/', (req, res) => {
//   res.send('HortiSmart API is running...');
// });

// // Setup Cron Jobs
// setupCronJobs();

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
// });

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';

// Routes
import marketRoutes from './routes/marketRoutes.js';
import storageRoutes from './routes/storageRoutes.js';
import predictionRoutes from './routes/predictionRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';

// Cron + Seed
import { setupCronJobs } from './cron/marketCron.js';
import { seedStorageData } from './controllers/storageController.js';

// 🔥 FIX ENV PATH (IMPORTANT)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

// 🔍 DEBUG ENV (REMOVE LATER)
console.log("ENV CHECK:");
console.log("RESOURCE ID:", process.env.DATA_GOV_RESOURCE_ID);
console.log("API KEY:", process.env.DATA_GOV_API_KEY);

// Connect DB
connectDB().then(() => {
  seedStorageData();
});

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/market', marketRoutes);
app.use('/api/storage', storageRoutes);
app.use('/api/predict', predictionRoutes);
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('HortiSmart API is running...');
});

// Cron jobs
setupCronJobs();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});