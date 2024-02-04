// content.js (for Manifest V3)

const highlightElement = (element) => {debugger
    element.style.border = '2px solid green';
    element.addEventListener('click', () => {
      const port = chrome.runtime.connect({ name: 'content-script' });
      port.postMessage({ action: 'highlightElement', element: element.outerHTML });
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
  
  traverseShadowDOM(document);
  
  const observer = new MutationObserver((mutations) => {debugger
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        traverseShadowDOM(node);
      });
    });
  });
  
  chrome.runtime.sendMessage({  childList: true, subtree: true  });
  