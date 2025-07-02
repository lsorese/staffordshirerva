# Staffordshire RVA

A community website for the Staffordshire neighborhood in Richmond, Virginia, built with Astro.

## About

Staffordshire is a neighborhood of Richmond, Virginia, just south of the James River, near Bon Air. This website serves as a central hub for community links, resources, and information for neighborhood residents.

## Built With

- **[Astro](https://astro.build/)** - Static site generator
- **Sass** - CSS preprocessing
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
├── pages/
│   └── index.astro       # Homepage
└── links.js              # Community links data
```

## Deployment

The site is configured for static deployment and can be deployed to any static hosting service like Vercel, Netlify, or GitHub Pages.

## Contributing

To add or update community links, modify the `src/links.js` file and submit a pull request.