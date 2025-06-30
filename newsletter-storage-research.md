# Newsletter Storage Solutions Research

## Summary of Options for Newsletter Email Storage

After researching various storage solutions to replace Supabase for your TypeScript/Astro newsletter subscription system, here are the best free tier options:

## 1. Vercel KV (Redis) - Powered by Upstash

### Pricing & Limits
- **Free Tier**: 30,000 requests/month, 256MB storage, 256MB data transfer
- **Paid**: $0.2 per 100K commands after free tier
- Built on Upstash Redis infrastructure

### Pros
- Native Vercel integration
- TypeScript support out of the box
- Global edge locations for low latency
- Auto-scaling
- Works seamlessly with Astro on Vercel

### Cons
- More expensive than direct Upstash usage
- Limited free tier compared to alternatives

### Implementation Example
```typescript
// Install: npm install @vercel/kv
import { kv } from '@vercel/kv';

// Store email subscription
async function subscribeEmail(email: string) {
  const timestamp = new Date().toISOString();
  const subscriptionData = {
    email,
    subscribedAt: timestamp,
    status: 'active'
  };
  
  // Store in a set for uniqueness and easy management
  await kv.sadd('newsletter_emails', email);
  
  // Store detailed subscription data
  await kv.hset(`subscriber:${email}`, subscriptionData);
  
  return subscriptionData;
}

// Get all subscribers
async function getAllSubscribers() {
  const emails = await kv.smembers('newsletter_emails');
  const subscribers = [];
  
  for (const email of emails) {
    const data = await kv.hgetall(`subscriber:${email}`);
    subscribers.push(data);
  }
  
  return subscribers;
}

// Check if email exists
async function isSubscribed(email: string) {
  return await kv.sismember('newsletter_emails', email);
}

// Unsubscribe
async function unsubscribeEmail(email: string) {
  await kv.srem('newsletter_emails', email);
  await kv.del(`subscriber:${email}`);
}
```

## 2. Upstash Redis (Direct) - Better Free Tier

### Pricing & Limits
- **Free Tier**: 500K commands/month, 256MB storage, 10GB bandwidth
- **Pay-as-you-go**: $0.2 per 100K commands
- **Fixed Plan**: $10/month for 250MB storage, 50GB bandwidth

### Pros
- Much more generous free tier than Vercel KV
- Can be used with any hosting provider
- 1.67x more commands than Vercel KV free tier
- Same Redis API as Vercel KV

### Cons
- Requires separate setup outside Vercel ecosystem
- Need to manage connection manually

### Implementation Example
```typescript
// Install: npm install @upstash/redis
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Same API as Vercel KV examples above
async function subscribeEmail(email: string) {
  const timestamp = new Date().toISOString();
  const subscriptionData = {
    email,
    subscribedAt: timestamp,
    status: 'active'
  };
  
  await redis.sadd('newsletter_emails', email);
  await redis.hset(`subscriber:${email}`, subscriptionData);
  
  return subscriptionData;
}
```

## 3. Cloudflare Workers KV - Most Generous Free Tier

### Pricing & Limits
- **Free Tier**: 100K reads/day, 1K writes/day, 1K deletes/day, 1GB storage
- **Paid**: $0.50/million reads, $5/million writes after limits

### Pros
- Most generous free storage (1GB vs 256MB)
- Global edge distribution
- No egress charges
- Works well with Astro if deployed to Cloudflare Pages

### Cons
- Limited writes per day on free tier (1K/day)
- Different API than Redis
- Requires Cloudflare ecosystem for best integration

### Implementation Example
```typescript
// For Cloudflare Workers/Pages
interface Env {
  NEWSLETTER_KV: KVNamespace;
}

// Store email subscription
async function subscribeEmail(email: string, env: Env) {
  const timestamp = new Date().toISOString();
  const subscriptionData = {
    email,
    subscribedAt: timestamp,
    status: 'active'
  };
  
  // Store subscription data
  await env.NEWSLETTER_KV.put(`subscriber:${email}`, JSON.stringify(subscriptionData));
  
  // Maintain a list of all emails (for easy retrieval)
  const existingList = await env.NEWSLETTER_KV.get('all_emails', 'json') || [];
  if (!existingList.includes(email)) {
    existingList.push(email);
    await env.NEWSLETTER_KV.put('all_emails', JSON.stringify(existingList));
  }
  
  return subscriptionData;
}

// Get all subscribers
async function getAllSubscribers(env: Env) {
  const emails = await env.NEWSLETTER_KV.get('all_emails', 'json') || [];
  const subscribers = [];
  
  for (const email of emails) {
    const data = await env.NEWSLETTER_KV.get(`subscriber:${email}`, 'json');
    if (data) subscribers.push(data);
  }
  
  return subscribers;
}
```

## 4. Alternative: Simple JSON File Storage (Completely Free)

### For very small newsletters, consider storing emails in a simple JSON file:

```typescript
// api/newsletter.ts - Astro API endpoint
import fs from 'fs/promises';
import path from 'path';

const SUBSCRIBERS_FILE = path.join(process.cwd(), 'data', 'subscribers.json');

interface Subscriber {
  email: string;
  subscribedAt: string;
  status: 'active' | 'unsubscribed';
}

async function loadSubscribers(): Promise<Subscriber[]> {
  try {
    const data = await fs.readFile(SUBSCRIBERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveSubscribers(subscribers: Subscriber[]) {
  await fs.mkdir(path.dirname(SUBSCRIBERS_FILE), { recursive: true });
  await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2));
}

export async function subscribeEmail(email: string) {
  const subscribers = await loadSubscribers();
  
  if (subscribers.find(s => s.email === email && s.status === 'active')) {
    throw new Error('Email already subscribed');
  }
  
  subscribers.push({
    email,
    subscribedAt: new Date().toISOString(),
    status: 'active'
  });
  
  await saveSubscribers(subscribers);
  return { success: true };
}
```

## Recommendation

**For your use case, I recommend:**

1. **Upstash Redis Direct** - Best value with 500K commands/month free
2. **Cloudflare Workers KV** - If you're open to using Cloudflare Pages for hosting
3. **Vercel KV** - If you want the tightest Vercel integration and don't mind the smaller free tier

The Upstash direct option gives you the best free tier while maintaining the Redis API compatibility, and you can always migrate to Vercel KV later if needed.

## Migration Path from Supabase

```typescript
// Migration script example
import { createClient } from '@supabase/supabase-js';
import { Redis } from '@upstash/redis';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

async function migrateSubscribers() {
  // Get all subscribers from Supabase
  const { data: subscribers } = await supabase
    .from('newsletter_subscribers')
    .select('*');
  
  // Migrate to Redis
  for (const subscriber of subscribers) {
    await redis.sadd('newsletter_emails', subscriber.email);
    await redis.hset(`subscriber:${subscriber.email}`, {
      email: subscriber.email,
      subscribedAt: subscriber.created_at,
      status: subscriber.status || 'active'
    });
  }
  
  console.log(`Migrated ${subscribers.length} subscribers`);
}
```

All these solutions will handle simple email storage efficiently and cost-effectively for a newsletter subscription system.