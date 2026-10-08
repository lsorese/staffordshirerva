import { Redis } from '@upstash/redis';
import { events as seedEvents } from '../events.js';
import { easternToDate, endOfEasternDay } from './time.js';

const KEY = 'events';

// Vercel's Upstash integration sets KV_REST_API_*; the Upstash dashboard sets UPSTASH_REDIS_REST_*.
const url = import.meta.env.KV_REST_API_URL ?? import.meta.env.UPSTASH_REDIS_REST_URL;
const token = import.meta.env.KV_REST_API_TOKEN ?? import.meta.env.UPSTASH_REDIS_REST_TOKEN;
const redis = url && token ? new Redis({ url, token }) : null;

export const hasDatabase = Boolean(redis);

// Upcoming events, soonest first. Falls back to src/events.js if Redis is not configured.
export async function getEvents({ includeExpired = false } = {}) {
  let list;
  try {
    list = redis ? Object.values((await redis.hgetall(KEY)) ?? {}) : seedEvents;
  } catch (err) {
    console.error('Could not read events from Redis', err);
    list = seedEvents;
  }
  const now = new Date();
  return list
    .filter((e) => includeExpired || new Date(e.hideAfter) > now)
    .sort((a, b) => new Date(a.start) - new Date(b.start));
}

export async function addEvent({ title, date, time, location, description }) {
  const id = crypto.randomUUID();
  const event = {
    id,
    title,
    location,
    description,
    start: easternToDate(date, time).toISOString(),
    hideAfter: endOfEasternDay(date).toISOString()
  };
  await redis.hset(KEY, { [id]: event });
  return event;
}

export async function deleteEvent(id) {
  await redis.hdel(KEY, id);
}
