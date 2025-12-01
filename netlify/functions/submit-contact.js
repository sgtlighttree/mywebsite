import nodemailer from 'nodemailer';

export const handler = async function (event, context) {
    // Only allow POST
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const params = new URLSearchParams(event.body);
    const hCaptchaToken = params.get('h-captcha-response');

    // Extract form data for email
    const data = Object.fromEntries(params.entries());

    // 1. Verify hCaptcha
    if (!hCaptchaToken) {
        return { statusCode: 400, body: 'Missing hCaptcha token' };
    }

    const verifyUrl = 'https://hcaptcha.com/siteverify';
    const secret = process.env.SITE_RECAPTCHA_SECRET; // Netlify uses this env var for the secret

    try {
        const verifyResponse = await fetch(verifyUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                secret: secret,
                response: hCaptchaToken
            })
        });

        const verifyData = await verifyResponse.json();

        if (!verifyData.success) {
            console.error('hCaptcha verification failed:', verifyData);
            return { statusCode: 400, body: 'Captcha verification failed' };
        }

        // 2. Send Email Directly (Maileroo)
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

        try {
            await transporter.sendMail(mailOptions);
            console.log('Email sent successfully via submit-contact');
        } catch (emailError) {
            console.error('Error sending email:', emailError);
            // We continue even if email fails, to try and save to Netlify Forms? 
            // Or should we fail hard? Let's fail hard so the user knows.
            return { statusCode: 500, body: 'Failed to send email' };
        }

        // 3. Proxy to Netlify Forms (Best Effort)
        // We post the same body back to the site URL. 
        // Netlify intercepts POSTs to the site and processes them as form submissions.
        const siteUrl = process.env.URL || 'http://localhost:8888';

        try {
            await fetch(`${siteUrl}/contact/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: event.body
            });
        } catch (proxyError) {
            console.error('Failed to proxy to Netlify Forms:', proxyError);
            // Ignore proxy error, as email was sent successfully
        }

        // 4. Redirect to success page
        return {
            statusCode: 302,
            headers: {
                Location: '/success/'
            }
        };

    } catch (error) {
        console.error('Error in submit-contact:', error);
        return { statusCode: 500, body: 'Internal Server Error' };
    }
};
