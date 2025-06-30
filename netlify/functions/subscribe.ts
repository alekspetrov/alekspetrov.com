import { neon } from '@netlify/neon';
import { sendEmail } from '@netlify/emails';

export default async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }), 
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const body = await req.text();
    let email;
    
    try {
      const parsed = JSON.parse(body);
      email = parsed.email;
    } catch (parseError) {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON' }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    if (!email || !email.includes('@')) {
      return new Response(
        JSON.stringify({ error: 'Valid email required' }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Neon database
    const sql = neon(process.env.DATABASE_URL!);
    
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
        return new Response(
          JSON.stringify({ error: 'Already subscribed' }), 
          { status: 409, headers: { 'Content-Type': 'application/json' } }
        );
      }
      throw dbError;
    }
    
    // Send welcome email
    try {
      await sendEmail({
        template: 'welcome',
        to: email,
        from: 'hello@alekspetrov.com',
        subject: 'Welcome to the Newsletter! 🎉',
        parameters: {}
      });
    } catch (emailError) {
      console.error('Email error:', emailError);
      // Don't fail the subscription if email fails
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Subscription saved and welcome email sent',
        email: email
      }), 
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Function error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Server error', 
        details: error.message
      }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};