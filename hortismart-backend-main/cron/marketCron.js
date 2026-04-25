import cron from 'node-cron';
import { fetchAndStoreMarketData } from '../services/marketService.js';
import { sendDailyUpdates, sendCropTipEmail } from '../services/emailService.js';
import User from '../models/User.js';
import Market from '../models/Market.js';

// Run daily at 5 AM
export const setupCronJobs = () => {
  cron.schedule('0 5 * * *', async () => {
    console.log('Running daily market data update...');
    try {
      // 1. Fetch and store new market data
      const marketUpdates = await fetchAndStoreMarketData();
      
      // 2. Fetch all users and send them updates
      const users = await User.find();
      for (const user of users) {
        // Filter updates for user's preferred crops
        const userUpdates = marketUpdates.filter(update => 
          user.preferredCrops.some(crop => crop.toLowerCase() === update.crop.toLowerCase())
        );

        if (userUpdates.length > 0) {
          await sendDailyUpdates(user, userUpdates);
        }
      }
      
      console.log('Daily cron job completed successfully');
    } catch (error) {
      console.error('Error in daily cron job:', error.message);
    }
  });

  // Run daily at 6 AM for Buy/Sell Tips
  cron.schedule('0 6 * * *', async () => {
    console.log('Running daily crop tips job...');
    try {
      // 1. Get latest market data to find "Most Valuable"
      const latestData = await Market.find().sort({ date: -1 }).limit(50);
      if (latestData.length === 0) return;

      // Logic: Find highest price crop (potential sell tip) and lowest price (potential buy tip)
      const sortedByPrice = [...latestData].sort((a, b) => b.price - a.price);
      const topCrop = sortedByPrice[0];
      const budgetCrop = sortedByPrice[sortedByPrice.length - 1];

      const tip = {
        title: `Opportunity with ${topCrop.crop}`,
        description: `Market prices for ${topCrop.crop} are currently high at ${topCrop.location} (₹${topCrop.price}/kg). This might be a great time to sell your stock for maximum profit!`
      };

      // 2. Fetch users with tips enabled
      const users = await User.find({ dailyTipsEnabled: true });
      for (const user of users) {
        // Customize tip if they have preferred crops
        let userTip = tip;
        if (user.preferredCrops.length > 0) {
          const preferredData = latestData.filter(d => 
            user.preferredCrops.includes(d.crop)
          ).sort((a, b) => b.price - a.price);
          
          if (preferredData.length > 0) {
            const crop = preferredData[0];
            userTip = {
              title: `High Demand for ${crop.crop}`,
              description: `Great news! ${crop.crop} is trading at ₹${crop.price}/kg in ${crop.location}. Consider selling today to capitalize on these rates.`
            };
          }
        }
        
        await sendCropTipEmail(user, userTip);
      }
      
      console.log('Daily tips job completed successfully');
    } catch (error) {
      console.error('Error in daily tips job:', error.message);
    }
  });
};
