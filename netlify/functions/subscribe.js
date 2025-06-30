const { neon } = require('@netlify/neon');

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
    
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        success: true, 
        message: 'Subscription saved successfully',
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