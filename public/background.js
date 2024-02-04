chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'addElement') {
      addElementToList(message.element);
    } else if (message.action === 'deleteItem') {
      deleteItemFromWebpage(message.itemId, sender.tab.id);
    }
  });
  