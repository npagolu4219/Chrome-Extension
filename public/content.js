function highlightElement(element) {
    element.style.border = '2px solid green';
    element.addEventListener('click', () => {
      chrome.runtime.sendMessage({ action: 'addElement', element: element.outerHTML });
    });
  }
  
  function traverseShadowDOM(node) {
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
  }
  
  // Initial traversal and mutation observer
  traverseShadowDOM(document);
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        traverseShadowDOM(node);
      });
    });
  });
  observer.observe(document, { childList: true, subtree: true });
  