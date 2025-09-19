const process = require('process');
const https = require('https');

exports.handler = async function(event) {
  const { payload } = JSON.parse(event.body);
  const { data } = payload;

  // Stop the function if this is not the form we want to process
  if (data.form_name !== 'contact') {
    return {
      statusCode: 200,
      body: 'Not a contact form submission.',
    };
  }

  // Format the email body for clarity
  const emailBody = `
Name: ${data.fullname}
Email: ${data.email}
Organization: ${data.organization || 'N/A'}
Phone: ${data.phone || 'N/A'}
---
Message:
${data.message}
  `.trim();

  // Prepare the email data for Maileroo API
  const mailerooData = {
    from: {
      email: process.env.FROM_EMAIL_ADDRESS,
      name: "Contact Form"
    },
    to: [
      {
        email: process.env.TO_EMAIL_ADDRESS,
        name: "Website Admin"
      }
    ],
    subject: data.subject,
    text: emailBody,
  };

  // Send the email using Maileroo's API
  const requestOptions = {
    hostname: 'smtp.maileroo.com',
    path: '/v1/sender/send',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.MAILEROO_API_KEY}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    await new Promise((resolve, reject) => {
      const req = https.request(requestOptions, (res) => {
        let responseBody = '';
        res.on('data', (chunk) => {
          responseBody += chunk;
        });
        res.on('end', () => {
          if (res.statusCode < 200 || res.statusCode >= 300) {
            return reject(new Error(`Status Code: ${res.statusCode}, Body: ${responseBody}`));
          }
          resolve(responseBody);
        });
      });

      req.on('error', (e) => {
        reject(e);
      });

      req.write(JSON.stringify(mailerooData));
      req.end();
    });

    return {
      statusCode: 200,
      body: 'Email sent successfully via Maileroo.',
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: `Error: ${error.message}`,
    };
  }
};
