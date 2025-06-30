export default async (req: Request) => {
  try {
    // Since we removed Blobs storage, let's check what we can access
    return new Response(
      JSON.stringify({ 
        message: 'Subscribers are stored in Netlify Forms',
        instructions: 'Check Netlify Dashboard → Forms → Newsletter submissions',
        note: 'Function method was simplified for debugging - no database storage currently',
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