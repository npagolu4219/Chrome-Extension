
const highlightedElements = [];

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'highlightElement') {
    highlightedElements.push(request.element);
    chrome.runtime.sendMessage({ action: 'updateList', elements: highlightedElements });
  }
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
