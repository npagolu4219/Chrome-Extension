// content.js

const highlightElement = (element) => {
    element.style.border = '2px solid green';
  
    element.addEventListener('click', () => {
      chrome.runtime.sendMessage({ action: 'highlightElement', element: element.outerHTML });
    });
  };
  
  const traverseShadowDOM = (node) => {
    if (!node) return;
  
    if (node.shadowRoot) {
      const shadowRoot = node.shadowRoot;
      const elements = shadowRoot.querySelectorAll('*');
  
      elements.forEach((element) => {
        highlightElement(element);
        traverseShadowDOM(element);
      });
    } else {
      node.childNodes.forEach((child) => {
        traverseShadowDOM(child);
      });
    }
  };
  
  traverseShadowDOM(document);
