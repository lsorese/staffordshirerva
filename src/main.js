import { linksData, profileData } from './links.js';

function renderLinks() {
  const container = document.getElementById('links-container');
  
  if (!container) {
    console.error('Links container not found');
    return;
  }

  // Clear any existing content to prevent duplication
  container.innerHTML = '';
  
  linksData.forEach((item, index) => {
    if (!item.type) {
      console.warn(`Item at index ${index} missing type property:`, item);
      return;
    }

    if (item.type === 'heading') {
      const headingElement = document.createElement('h3');
      headingElement.className = 'section-heading';
      headingElement.id = `section-${index}`;
      headingElement.textContent = item.title || 'Untitled Section';
      container.appendChild(headingElement);
      
      if (item.description) {
        const descriptionElement = document.createElement('p');
        descriptionElement.className = 'section-description';
        descriptionElement.setAttribute('aria-describedby', `section-${index}`);
        descriptionElement.textContent = item.description;
        container.appendChild(descriptionElement);
      }
    } else if (item.type === 'link') {
      if (!item.url) {
        console.warn(`Link at index ${index} missing URL:`, item);
        return;
      }

      const linkElement = document.createElement('a');
      linkElement.className = 'link-item';
      linkElement.href = item.url;
      linkElement.target = '_blank';
      linkElement.rel = 'noopener noreferrer';
      linkElement.setAttribute('aria-label', `${item.title || 'Untitled Link'}${item.description ? ': ' + item.description : ''} (opens in new tab)`);
      
      const linkContent = `
        <div class="link-content">
          <div class="link-header">
            <span class="link-title"><span class="link-icon" aria-hidden="true">${item.icon || '🔗'}</span> ${item.title || 'Untitled Link'}</span>
          </div>
          ${item.description ? `<div class="link-description">${item.description}</div>` : ''}
        </div>
      `;
      
      linkElement.innerHTML = linkContent;
      container.appendChild(linkElement);
    } else {
      console.warn(`Unknown item type "${item.type}" at index ${index}:`, item);
    }
  });
}

function init() {
  try {
    renderLinks();
  } catch (error) {
    console.error('Error rendering links:', error);
  }
}

document.addEventListener('DOMContentLoaded', init);