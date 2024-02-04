// content.js (for Manifest V2)

const highlightElement = (element) => {
    element.style.border = '2px solid green';
  
    element.addEventListener('click', () => {
      chrome.extension.sendMessage({ action: 'highlightElement', element: element.outerHTML });
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
  
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        traverseShadowDOM(node);
      });
    });
  });
  
  observer.observe(document, { childList: true, subtree: true });
  