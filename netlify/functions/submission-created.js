import nodemailer from 'nodemailer';

export const handler = async function(event, context) {
  const { payload } = JSON.parse(event.body || '{}');
  const { data = {} } = payload || {};

  // Basic header sanitization helpers
  function cleanHeader(s, max = 200) {
    return String(s || '').replace(/[\r\n]+/g, ' ').trim().slice(0, max);
  }
  function clip(text, max = 5000) {
    return String(text || '').toString().slice(0, max);
  }

  const replyTo = cleanHeader(data.email, 254);
  const subject = cleanHeader(data.subject || 'Website Contact');

  // Create a transporter object using Maileroo SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.MAILEROO_HOST,
    port: process.env.MAILEROO_PORT,
    secure: process.env.MAILEROO_PORT == 465, // true for 465, false for other ports
    auth: {
      user: process.env.MAILEROO_USER,
      pass: process.env.MAILEROO_PASS,
    },
  });

  // Format the email body (apply length limits)
  const emailBody = `
    Name: ${cleanHeader(data.firstname, 100)} ${cleanHeader(data.lastname, 100)}
    Email: ${replyTo || 'N/A'}
    Organization: ${cleanHeader(data.organization, 150) || 'N/A'}
    Phone: ${cleanHeader(data.phone, 32) || 'N/A'}

    Message:
    ${clip(data.message, 5000) || 'N/A'}
  `;

  // Setup email data
  let mailOptions = {
    from: `"Website Contact Form" <${process.env.MAILEROO_USER}>`,
    to: process.env.MAIL_TO,
    replyTo: replyTo || undefined,
    subject,
    text: emailBody,
  };

  // Simple in-memory rate limit per warm container (best-effort): 1 request per 30s per email
  if (!global.__contact_rate_map) global.__contact_rate_map = new Map();
  const now = Date.now();
  const key = replyTo || (data.firstname ? cleanHeader(data.firstname, 50) : 'anonymous');
  const last = global.__contact_rate_map.get(key) || 0;
  if (now - last < 30000) {
    return { statusCode: 429, body: 'Too many requests. Please wait and try again.' };
  }
  global.__contact_rate_map.set(key, now);

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: 'Email sent successfully!',
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: 'Failed to send email.',
    };
  }
};
