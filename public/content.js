document.addEventListener('DOMContentLoaded', () => {
    const highlightElement = (element) => {
      element.style.border = '2px solid green';
  
      element.addEventListener('click', () => {
        const port = chrome.runtime.connect({ name: 'content-script' });
        port.postMessage({ action: 'highlightElement', element: element.outerHTML });
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
  });
  