import { linksData, profileData } from './links.js';

function renderLinks() {
  const container = document.getElementById('links-container');
  
  linksData.forEach((item, index) => {
    if (item.type === 'heading') {
      const headingElement = document.createElement('h3');
      headingElement.className = 'section-heading';
      headingElement.id = `section-${index}`;
      headingElement.textContent = item.title;
      container.appendChild(headingElement);
      
      if (item.description) {
        const descriptionElement = document.createElement('p');
        descriptionElement.className = 'section-description';
        descriptionElement.setAttribute('aria-describedby', `section-${index}`);
        descriptionElement.textContent = item.description;
        container.appendChild(descriptionElement);
      }
    } else if (item.type === 'link') {
      const linkElement = document.createElement('a');
      linkElement.className = 'link-item';
      linkElement.href = item.url;
      linkElement.target = '_blank';
      linkElement.rel = 'noopener noreferrer';
      linkElement.setAttribute('aria-label', `${item.title}${item.description ? ': ' + item.description : ''} (opens in new tab)`);
      
      const linkContent = `
        <div class="link-content">
          <div class="link-header">
            <span class="link-title"><span class="link-icon" aria-hidden="true">${item.icon}</span> ${item.title}</span>
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