// popup.js

const updateList = (elements) => {
    const container = document.getElementById('highlightedElements');
    container.innerHTML = '';
  
    elements.forEach((element) => {
      const div = document.createElement('div');
      div.className = 'highlighted-element';
  
      const span = document.createElement('span');
      span.textContent = element;
  
      const deleteIcon = document.createElement('span');
      deleteIcon.className = 'delete-icon';
      deleteIcon.textContent = '❌';
      deleteIcon.addEventListener('click', () => {
        chrome.runtime.sendMessage({ action: 'deleteElement', element });
      });
  
      div.appendChild(span);
      div.appendChild(deleteIcon);
      container.appendChild(div);
    });
  };
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'updateList') {
      updateList(request.elements);
    }
  });
  
  // Initial update on popup open
  chrome.runtime.sendMessage({ action: 'updateList', elements: [] });
  