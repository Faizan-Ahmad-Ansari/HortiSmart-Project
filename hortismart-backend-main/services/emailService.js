import nodemailer from 'nodemailer';

let transporter;

const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_PORT == 465, // Use true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }
  return transporter;
};

export const verifyConnection = async () => {
  try {
    const t = getTransporter();
    await t.verify();
    console.log('SMTP Connection verified successfully');
    return true;
  } catch (error) {
    console.error('SMTP Connection failed:', error.message);
    return false;
  }
};

export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const t = getTransporter();
    const mailOptions = {
      from: `"HortiSmart" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      html
    };

    const info = await t.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error.message);
    throw error;
  }
};

export const sendDailyUpdates = async (user, marketUpdates) => {
  try {
    const html = `
        <h1>Hello ${user.name},</h1>
        <p>Here are the latest price updates for your preferred crops:</p>
        <ul>
          ${marketUpdates.map(update => `<li><strong>${update.crop}</strong>: ₹${update.price}/kg at ${update.location}</li>`).join('')}
        </ul>
        <p>Best regards,<br>The HortiSmart Team</p>
      `;

    await sendEmail({
      to: user.email,
      subject: 'Daily Horticultural Market Update',
      html
    });
    console.log(`Update email sent to ${user.email}`);
  } catch (error) {
    console.error(`Error sending email to ${user.email}:`, error.message);
  }
};

export const sendCropTipEmail = async (user, tip) => {
  try {
    const targetEmail = user.alertEmail || user.email;
    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
        <h1 style="color: #059669;">🌿 HortiSmart Daily Tip</h1>
        <p>Hello ${user.name},</p>
        <div style="background-color: #f0fdf4; border-left: 4px solid #059669; padding: 15px; margin: 20px 0;">
          <h2 style="margin-top: 0; color: #065f46;">Today's Market Insight</h2>
          <p style="font-size: 18px; font-weight: bold; color: #047857;">${tip.title}</p>
          <p>${tip.description}</p>
        </div>
        <p style="font-size: 14px; color: #6b7280;">Tip based on the latest market data analyses.</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 12px; color: #9ca3af;">You received this because you enabled Daily Buy/Sell Tips in your profile.</p>
      </div>
    `;

    await sendEmail({
      to: targetEmail,
      subject: `HortiSmart Tip: ${tip.title}`,
      html
    });
    console.log(`Tip email sent to ${targetEmail}`);
  } catch (error) {
    console.error(`Error sending tip email to ${user.email}:`, error.message);
  }
};
