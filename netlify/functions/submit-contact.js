export const handler = async function (event, context) {
    // Only allow POST
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const params = new URLSearchParams(event.body);
    const hCaptchaToken = params.get('h-captcha-response');

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

        // 2. Proxy to Netlify Forms
        // We post the same body back to the site URL. 
        // Netlify intercepts POSTs to the site and processes them as form submissions.
        const siteUrl = process.env.URL || 'http://localhost:8888';

        // We must ensure 'form-name' is present (it should be in event.body already)
        await fetch(`${siteUrl}/contact/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: event.body
        });

        // 3. Redirect to success page
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
