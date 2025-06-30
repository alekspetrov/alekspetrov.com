const { neon } = require('@netlify/neon');
const formData = require('form-data');
const Mailgun = require('mailgun.js');

exports.handler = async (event, context) => {
  const req = {
    method: event.httpMethod,
    text: () => Promise.resolve(event.body || '{}')
  };
  if (req.method !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const body = await req.text();
    let email;
    
    try {
      const parsed = JSON.parse(body);
      email = parsed.email;
    } catch (parseError) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Invalid JSON' })
      };
    }
    
    if (!email || !email.includes('@')) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Valid email required' })
      };
    }

    // Initialize Neon database
    const sql = neon(process.env.DATABASE_URL);
    
    // Create table if not exists
    await sql`
      CREATE TABLE IF NOT EXISTS subscribers (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    // Insert subscriber
    try {
      await sql`
        INSERT INTO subscribers (email) VALUES (${email})
      `;
    } catch (dbError) {
      if (dbError.code === '23505') { // Unique constraint violation
        return {
          statusCode: 409,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: 'Already subscribed' })
        };
      }
      throw dbError;
    }
    
    // Send welcome email via Mailgun SDK
    try {
      // Try both Netlify Email variables and manual variables
      const mailgunDomain = process.env.NETLIFY_EMAILS_MAILGUN_DOMAIN || process.env.MAILGUN_DOMAIN;
      const mailgunApiKey = process.env.NETLIFY_EMAILS_PROVIDER_API_KEY || process.env.MAILGUN_API_KEY;
      
      console.log('Mailgun domain:', mailgunDomain);
      console.log('Mailgun API key exists:', !!mailgunApiKey);
      
      if (!mailgunDomain || !mailgunApiKey) {
        throw new Error('Missing Mailgun configuration');
      }
      
      const mailgun = new Mailgun(formData);
      const mg = mailgun.client({
        username: 'api',
        key: mailgunApiKey
      });

      const emailHtml = `<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to the Newsletter</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
    <h1 style="color: white; margin: 0; font-size: 28px;">Welcome aboard! 🎉</h1>
    <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Thanks for subscribing to the newsletter</p>
  </div>
  
  <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
    <h2 style="color: #333; margin-top: 0;">What to expect:</h2>
    <ul style="padding-left: 20px;">
      <li style="margin-bottom: 8px;">🚀 Latest tech insights and tutorials</li>
      <li style="margin-bottom: 8px;">💡 Development tips and best practices</li>
      <li style="margin-bottom: 8px;">🔧 Tool recommendations and workflows</li>
      <li style="margin-bottom: 8px;">📚 Curated content from around the web</li>
    </ul>
  </div>
  
  <p style="font-size: 16px; margin-bottom: 20px;">
    I'm excited to share valuable content with you. If you have any questions or topics you'd like me to cover, 
    just reply to this email!
  </p>
  
  <div style="text-align: center; margin: 30px 0;">
    <a href="https://alekspetrov.com" style="background: #667eea; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">
      Visit the Blog
    </a>
  </div>
  
  <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px; text-align: center; color: #666; font-size: 14px;">
    <p>Best regards,<br>Aleks Petrov</p>
    <p>
      <a href="https://alekspetrov.com" style="color: #667eea;">alekspetrov.com</a>
    </p>
  </div>
</body>
</html>`;

      const data = await mg.messages.create(mailgunDomain, {
        from: `Aleks Petrov <mailgun@${mailgunDomain}>`,
        to: [email],
        subject: 'Welcome to the Newsletter! 🎉',
        text: 'Welcome to the newsletter! Thanks for subscribing.',
        html: emailHtml
      });

      console.log('Welcome email sent:', data);
      console.log('Mailgun response status:', data.status || 'unknown');
    } catch (emailError) {
      console.error('Email error:', emailError);
      // Don't fail the subscription if email fails
    }
    
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        success: true, 
        message: 'Subscription saved and welcome email sent',
        email: email
      })
    };

  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        error: 'Server error', 
        details: error.message
      })
    };
  }
};