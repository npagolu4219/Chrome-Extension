chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {debugger
    if (request.action === 'highlightElement') {
      console.log('Received message:', request.element);
    }
});