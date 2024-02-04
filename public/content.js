
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
  addEventListener('message', function(event) {
    if (event.data && event.data.extensionMessage) {
        alert(event.data.extensionMessage);
    }
});
// Content script which injects the script:
chrome.extension.onMessage.addListener(function(message) {
    postMessage({extensionMessage: message}, '*');
});

  traverseShadowDOM(document);
  
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        traverseShadowDOM(node);
      });
    });
  });
  
  observer.observe(document, { childList: true, subtree: true });
  