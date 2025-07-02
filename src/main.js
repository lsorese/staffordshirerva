import { linksData, profileData } from './links.js';

function renderLinks() {
  const container = document.getElementById('links-container');
  
  linksData.forEach(item => {
    if (item.type === 'heading') {
      const headingElement = document.createElement('h3');
      headingElement.className = 'section-heading';
      headingElement.textContent = item.title;
      container.appendChild(headingElement);
      
      if (item.description) {
        const descriptionElement = document.createElement('p');
        descriptionElement.className = 'section-description';
        descriptionElement.textContent = item.description;
        container.appendChild(descriptionElement);
      }
    } else if (item.type === 'link') {
      const linkElement = document.createElement('a');
      linkElement.className = 'link-item';
      linkElement.href = item.url;
      linkElement.target = '_blank';
      linkElement.rel = 'noopener noreferrer';
      
      const linkContent = `
        <div class="link-content">
          <div class="link-header">
            <span class="link-icon">${item.icon}</span>
            <span class="link-title">${item.title}</span>
          </div>
          ${item.description ? `<div class="link-description">${item.description}</div>` : ''}
        </div>
      `;
      
      linkElement.innerHTML = linkContent;
      
      container.appendChild(linkElement);
    }
  });
}

function init() {
  renderLinks();
}

document.addEventListener('DOMContentLoaded', init);