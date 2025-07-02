import { linksData, profileData } from './src/links.js';
import { readFileSync, writeFileSync } from 'fs';

function generateLinksHTML() {
  return linksData.map(link => 
    `<a class="link-item" href="${link.url}" target="_blank" rel="noopener noreferrer">
      <span style="margin-right: 8px;">${link.icon}</span>
      ${link.title}
    </a>`
  ).join('\n      ');
}

// Read the template HTML
const template = readFileSync('./src/index.html', 'utf-8');

// Replace placeholders with actual content
const html = template
  .replace('<!-- Links will be dynamically inserted here -->', generateLinksHTML())
  .replace('Your Name', profileData.name)
  .replace('Your bio goes here', profileData.bio)

// Write the generated HTML
writeFileSync('./dist/index.html', html);
console.log('HTML generated with server-side rendered content');