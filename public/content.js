const highlightElement = (element) => {debugger
    element.style.border = '2px solid green';
  
    element.addEventListener('click', () => {
      chrome.runtime.sendMessage({ action: 'highlightElement', element: element.outerHTML });
    });
  };
  
  const traverseShadowDOM = (node) => {debugger
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
  
  // Initial traversal for the main page
  traverseShadowDOM(document);
  
  // Watch for mutations in the document and traverse Shadow DOMs as they are added dynamically
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        traverseShadowDOM(node);
      });
    });
  });
  
  observer.observe(document, { childList: true, subtree: true });
  