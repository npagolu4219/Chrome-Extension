chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'highlightElement') {
      console.log('Received message:', request.element);
    }
});