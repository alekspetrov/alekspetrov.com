export default async (req: Request) => {
  // Add detailed logging
  console.log('Function called:', {
    method: req.method,
    url: req.url,
    headers: Object.fromEntries(req.headers.entries())
  });

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }), 
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const body = await req.text();
    console.log('Request body:', body);
    
    let email;
    try {
      const parsed = JSON.parse(body);
      email = parsed.email;
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return new Response(
        JSON.stringify({ error: 'Invalid JSON' }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    if (!email || !email.includes('@')) {
      console.log('Invalid email:', email);
      return new Response(
        JSON.stringify({ error: 'Valid email required' }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Simple success response for now (no Blobs dependency)
    console.log('Email received:', email);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Subscription received',
        email: email,
        timestamp: new Date().toISOString()
      }), 
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Function error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Server error', 
        details: error.message,
        stack: error.stack 
      }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};