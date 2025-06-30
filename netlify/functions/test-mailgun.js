const formData = require('form-data');
const Mailgun = require('mailgun.js');

exports.handler = async (event, context) => {
  try {
    const mailgunDomain = process.env.MAILGUN_DOMAIN;
    const mailgunApiKey = process.env.MAILGUN_API_KEY;
    
    console.log('Environment check:');
    console.log('MAILGUN_DOMAIN:', mailgunDomain);
    console.log('MAILGUN_API_KEY exists:', !!mailgunApiKey);
    console.log('MAILGUN_API_KEY length:', mailgunApiKey ? mailgunApiKey.length : 0);
    console.log('MAILGUN_API_KEY starts with key-:', mailgunApiKey ? mailgunApiKey.startsWith('key-') : false);
    
    if (!mailgunDomain || !mailgunApiKey) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          error: 'Missing Mailgun configuration',
          domain: !!mailgunDomain,
          apiKey: !!mailgunApiKey
        })
      };
    }
    
    const mailgun = new Mailgun(formData);
    const mg = mailgun.client({
      username: 'api',
      key: mailgunApiKey
    });
    
    console.log('Attempting to send test email...');
    
    // For sandbox domains, you need to send to authorized recipients
    // Try sending to your own email first
    const data = await mg.messages.create(mailgunDomain, {
      from: `Test <mailgun@${mailgunDomain}>`,
      to: ['mr.alex.petrov@gmail.com'], // Use your email for sandbox testing
      subject: 'Test Email',
      text: 'This is a test email from Netlify function'
    });
    
    console.log('Mailgun response:', data);
    
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        success: true,
        message: 'Test email sent',
        mailgunResponse: data
      })
    };
    
  } catch (error) {
    console.error('Test function error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        error: 'Test failed',
        details: error.message,
        stack: error.stack
      })
    };
  }
};