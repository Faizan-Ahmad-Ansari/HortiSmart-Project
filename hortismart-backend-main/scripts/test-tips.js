import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { sendCropTipEmail } from '../services/emailService.js';
import User from '../models/User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

async function testTips() {
  console.log('--- Daily Tips Email Test ---');
  
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Use the first user found or create a dummy one
    let user = await User.findOne();
    if (!user) {
      console.log('No user found in DB. Please register a user first.');
      process.exit(1);
    }

    console.log(`Testing with user: ${user.name} (${user.email})`);
    console.log(`Alert Email: ${user.alertEmail || 'None (falling back to login email)'}`);

    const dummyTip = {
      title: 'Mega Opportunity with Tomatoes',
      description: 'Prices in your local mandi have dropped by 15%! This is an excellent time to BUY for your storage units.'
    };

    await sendCropTipEmail(user, dummyTip);
    console.log('✅ Tip email sent successfully.');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

testTips();
