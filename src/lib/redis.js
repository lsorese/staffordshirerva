import { Redis } from '@upstash/redis';

// Vercel's Upstash integration sets KV_REST_API_*; the Upstash dashboard sets UPSTASH_REDIS_REST_*.
const url = import.meta.env.KV_REST_API_URL ?? import.meta.env.UPSTASH_REDIS_REST_URL;
const token = import.meta.env.KV_REST_API_TOKEN ?? import.meta.env.UPSTASH_REDIS_REST_TOKEN;

export const redis = url && token ? new Redis({ url, token }) : null;
export const hasDatabase = Boolean(redis);
