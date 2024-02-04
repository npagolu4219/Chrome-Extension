chrome.runtime.sendMessage({ action: 'getElementList' }, (response) => {
    const elementList = document.getElementById('element-list');
    response.elements.forEach((element) => {
      const listItem = document.createElement('li');
      listItem.textContent = element;
      // Add a delete icon with onclick handler to send delete message
      listItem.appendChild(createDeleteIcon(element.id)); // Implement createDeleteIcon function
      elementList.appendChild(listItem);
    });
  });
  