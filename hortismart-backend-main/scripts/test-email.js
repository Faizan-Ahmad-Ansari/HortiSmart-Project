import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { verifyConnection, sendEmail } from '../services/emailService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the root folder
dotenv.config({ path: path.join(__dirname, '../.env') });

async function runTest() {
  console.log('--- SMTP Connection Test ---');
  console.log(`Host: ${process.env.SMTP_HOST}`);
  console.log(`Port: ${process.env.SMTP_PORT}`);
  console.log(`User: ${process.env.SMTP_USER}`);
  console.log(`Pass: ${process.env.SMTP_PASS ? '********' : 'MISSING'}`);
  
  const connected = await verifyConnection();
  
  if (connected) {
    console.log('\n--- Sending Test Email ---');
    try {
      await sendEmail({
        to: process.env.SMTP_USER, // Send to self for testing
        subject: 'HortiSmart Email Service Test',
        text: 'This is a test email from HortiSmart to verify SMTP settings.',
        html: '<h1>HortiSmart Test</h1><p>The email service is now <strong>active</strong> and working correctly!</p>'
      });
      console.log('✅ Test email delivered to queue.');
    } catch (error) {
      console.log('❌ Failed to send test email.');
    }
  } else {
    console.log('❌ Connection failed. Please check your .env credentials.');
  }
}

runTest();
