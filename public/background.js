// background.js (for Manifest V3)

const highlightedElements = [];

chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener((msg) => {
    if (msg.action === 'highlightElement') {
      highlightedElements.push(msg.element);
      chrome.runtime.sendMessage({ action: 'updateList', elements: highlightedElements });
    }
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'deleteElement') {
    const index = highlightedElements.indexOf(request.element);
    if (index !== -1) {
      highlightedElements.splice(index, 1);
      chrome.runtime.sendMessage({ action: 'updateList', elements: highlightedElements });
    }
  }
});
