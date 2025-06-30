import { neon } from '@netlify/neon';

export default async (req: Request) => {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    
    const subscribers = await sql`
      SELECT email, subscribed_at 
      FROM subscribers 
      ORDER BY subscribed_at DESC
    `;
    
    return new Response(
      JSON.stringify({ 
        subscribers,
        count: subscribers.length,
        timestamp: new Date().toISOString()
      }), 
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('List error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Server error', 
        details: error.message 
      }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};