# Staffordshire RVA

A community website for the Staffordshire neighborhood in Richmond, Virginia, built with Astro.

## About

Staffordshire is a neighborhood of Richmond, Virginia, just south of the James River, near Bon Air. This website serves as a central hub for community links, resources, and information for neighborhood residents.

## Built With

- **[Astro](https://astro.build/)** - Static site generator
- **Vercel** - Hosting, with server-rendered pages
- **Upstash Redis** - Stores events and links (via the Vercel Marketplace)
- **Node.js** - JavaScript runtime

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd staffordshire
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Project Structure

```
src/
├── components/
│   ├── LinkItem.astro    # Individual link component
│   └── Section.astro     # Section heading component
├── layouts/
│   └── Layout.astro      # Base layout template
├── lib/
│   ├── auth.js           # Shared-password admin login
│   ├── events.js         # Read/write events in Redis
│   ├── links.js          # Read/write/validate links in Redis
│   ├── redis.js          # Redis client
│   └── time.js           # Eastern-time helpers
├── pages/
│   ├── index.astro       # Homepage (server-rendered)
│   └── admin.astro       # Admin: manage events and links
├── events.js             # Fallback events if Redis is unavailable
└── links.js              # Fallback links, and the starting list if Redis is empty
```

## Deployment

Deployed on Vercel using the `@astrojs/vercel` adapter. The home page and `/admin` are server-rendered; everything else is static.

## Managing Content

Events and links are edited at `/admin` (shared password). They are stored in Redis, so changes show on the site within about a minute and no redeploy is needed. Events hide themselves after their date.

`src/links.js` and `src/events.js` are only fallbacks, so they go stale as the admin page is used.

### Environment Variables

- `ADMIN_PASSWORD` - password for `/admin`
- `KV_REST_API_URL`, `KV_REST_API_TOKEN` - set automatically by the Vercel Upstash integration (or `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`)

Locally, put these in `.env`. Without Redis, the site shows the fallback files and the admin page cannot save.
