import { redis } from './redis.js';
import { linksData as seedLinks } from '../links.js';

const KEY = 'links';
const MAX_ITEMS = 100;

// Stored links, or src/links.js if nothing is stored yet or Redis is unavailable.
export async function getLinks() {
  try {
    const stored = redis ? await redis.get(KEY) : null;
    if (Array.isArray(stored)) return stored;
  } catch (err) {
    console.error('Could not read links from Redis', err);
  }
  return seedLinks;
}

// Returns the stored list, writing src/links.js into Redis first if it is empty.
export async function getLinksForAdmin() {
  if (!redis) return seedLinks;
  const stored = await redis.get(KEY);
  if (Array.isArray(stored)) return stored;
  await redis.set(KEY, seedLinks);
  return seedLinks;
}

// Validates untrusted input. Returns { links } or { error }.
export function parseLinks(json) {
  let raw;
  try {
    raw = JSON.parse(json);
  } catch {
    return { error: 'Could not read the links list.' };
  }
  if (!Array.isArray(raw) || raw.length > MAX_ITEMS) return { error: `Use at most ${MAX_ITEMS} items.` };

  const text = (v, max) => String(v ?? '').trim().slice(0, max);
  const links = [];
  for (const item of raw) {
    const title = text(item?.title, 150);
    const description = text(item?.description, 300);
    if (!title) return { error: 'Every item needs a title.' };

    if (item.type === 'heading') {
      links.push({ type: 'heading', title, ...(description && { description }) });
    } else if (item.type === 'link') {
      let url;
      try {
        url = new URL(text(item.url, 2000));
      } catch {
        return { error: `"${title}" needs a valid web address.` };
      }
      if (url.protocol !== 'http:' && url.protocol !== 'https:') {
        return { error: `"${title}" must start with http:// or https://.` };
      }
      const icon = text(item.icon, 8);
      links.push({
        type: 'link',
        title,
        url: url.href,
        ...(description && { description }),
        ...(icon && { icon }),
        ...(item.highlight === true && { highlight: true })
      });
    } else {
      return { error: 'Unknown item type.' };
    }
  }
  return { links };
}

export async function saveLinks(links) {
  await redis.set(KEY, links);
}
