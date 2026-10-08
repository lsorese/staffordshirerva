// Shared-password admin login. The cookie holds a hash of the password, not the password.
const COOKIE = 'admin_session';
const password = () => import.meta.env.ADMIN_PASSWORD;

async function sha256(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function safeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export const isConfigured = () => Boolean(password());

export async function checkPassword(attempt) {
  if (!isConfigured()) return false;
  return safeEqual(await sha256(String(attempt)), await sha256(password()));
}

export async function isLoggedIn(cookies) {
  if (!isConfigured()) return false;
  const value = cookies.get(COOKIE)?.value;
  if (!value) return false;
  return safeEqual(value, await sha256('session:' + password()));
}

export async function logIn(cookies) {
  cookies.set(COOKIE, await sha256('session:' + password()), {
    path: '/', httpOnly: true, secure: import.meta.env.PROD, sameSite: 'strict', maxAge: 60 * 60 * 24 * 14
  });
}

export const logOut = (cookies) => cookies.delete(COOKIE, { path: '/' });
