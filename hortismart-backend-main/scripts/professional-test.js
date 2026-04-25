import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { sendEmail } from '../services/emailService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const recipient = 'sidharthkumar8103@gmail.com';

const professionalHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #334155; margin: 0; padding: 0; background-color: #f8fafc; }
        .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 16px; overflow: hidden; shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); border: 1px solid #e2e8f0; }
        .header { background: linear-gradient(135deg, #059669 0%, #10b981 100%); padding: 40px 20px; text-align: center; color: white; }
        .header h1 { margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.025em; }
        .content { padding: 40px; }
        .tip-card { background-color: #f0fdf4; border-left: 4px solid #059669; padding: 24px; margin: 24px 0; border-radius: 0 12px 12px 0; }
        .tip-title { color: #065f46; font-size: 18px; font-weight: 700; margin-top: 0; margin-bottom: 8px; }
        .tip-desc { color: #047857; margin: 0; font-size: 15px; }
        .footer { background-color: #f1f5f9; padding: 24px; text-align: center; font-size: 12px; color: #64748b; }
        .btn { display: inline-block; background-color: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 700; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🌿 HortiSmart</h1>
            <p style="margin-top: 8px; opacity: 0.9;">Intelligence for Modern Agriculture</p>
        </div>
        <div class="content">
            <h2 style="color: #1e293b; margin-top: 0;">Market Intelligence Report</h2>
            <p>Hello Sidharth,</p>
            <p>Welcome to <strong>HortiSmart Premium Insights</strong>. Our system has analyzed the latest market trends across major mandis to bring you today's most valuable opportunity.</p>
            
            <div class="tip-card">
                <p class="tip-title">📈 Sell Opportunity: Onion (Nashik Mandi)</p>
                <p class="tip-desc">Prices have surged by 12% in the last 24 hours reaching ₹32/kg. Our predictive models suggest a price correction in the next 48 hours. We recommend liquidating current stock for maximum returns.</p>
            </div>

            <p>Stay ahead of the market with real-time alerts and AI-powered predictions tailored to your preferred crops.</p>
            
            <a href="#" class="btn">View Dashboard</a>
        </div>
        <div class="footer">
            <p>© 2026 HortiSmart AgriTech Solutions. All rights reserved.</p>
            <p>You are receiving this professional test email as per your request. To manage alert preferences, visit your Profile settings.</p>
        </div>
    </div>
</body>
</html>
`;

async function sendProfessionalTest() {
    console.log(`--- Sending Professional Test Email to ${recipient} ---`);
    try {
        await sendEmail({
            to: recipient,
            subject: '🌿 HortiSmart: Today\'s Market Intelligence Report',
            html: professionalHtml
        });
        console.log('✅ Professional email delivered successfully.');
    } catch (error) {
        console.error('❌ Failed to send professional email:', error.message);
    } finally {
        process.exit(0);
    }
}

sendProfessionalTest();
