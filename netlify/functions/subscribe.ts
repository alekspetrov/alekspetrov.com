import { getStore } from '@netlify/blobs';
import type { Context } from '@netlify/functions';

export default async (req: Request, context: Context) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { email } = await req.json();
    
    if (!email || !email.includes('@')) {
      return new Response(
        JSON.stringify({ error: 'Valid email required' }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const store = getStore('subscribers');
    
    // Check if email already exists
    const existing = await store.get(email);
    if (existing) {
      return new Response(
        JSON.stringify({ error: 'Already subscribed', status: 409 }), 
        { status: 409, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Store the subscriber
    const subscriber = {
      email,
      subscribedAt: new Date().toISOString(),
      id: crypto.randomUUID()
    };

    await store.set(email, JSON.stringify(subscriber));

    // Also maintain a list for easy retrieval
    const allSubs = await store.get('_all_subscribers');
    const subsList = allSubs ? JSON.parse(allSubs) : [];
    subsList.push(email);
    await store.set('_all_subscribers', JSON.stringify(subsList));

    return new Response(
      JSON.stringify({ success: true }), 
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Subscription error:', error);
    return new Response(
      JSON.stringify({ error: 'Server error' }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};