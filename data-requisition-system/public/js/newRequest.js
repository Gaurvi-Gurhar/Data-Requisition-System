const itemName = document.getElementById('item-name');
        const customItemDiv = document.getElementById('custom-item');
        const customItemName = document.getElementById('custom-item-name');
        const addCustomItem = document.getElementById('add-custom-item');
        const itemsList = document.getElementById('items-list');
        const form = document.getElementById('new-request-form');

        // Display custom item input if "Other" is selected
        itemName.addEventListener('change', () => {
            if (itemName.value === 'other') {
                customItemDiv.style.display = 'block';
            } else if (itemName.value) {
                // Allow only one selected item
                clearItemsList();
                addItemToList(itemName.options[itemName.selectedIndex].text);
                itemName.value = ""; // Reset dropdown after selection
            }
        });

        // Add a custom item to the list
        addCustomItem.addEventListener('click', () => {
            const customValue = customItemName.value.trim();
            if (customValue) {
                // Allow only one selected item
                clearItemsList();
                addItemToList(customValue);
                customItemName.value = '';
                customItemDiv.style.display = 'none';
            }
        });

        // Function to add items to the list
        function addItemToList(item) {
            // Create item div
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('item');
            itemDiv.textContent = item;

            // Add remove button
            const removeButton = document.createElement('span');
            removeButton.classList.add('remove');
            removeButton.textContent = '×';
            removeButton.addEventListener('click', () => {
                itemsList.removeChild(itemDiv);
            });

            itemDiv.appendChild(removeButton);
            itemsList.appendChild(itemDiv);
        }

        // Function to clear all items
        function clearItemsList() {
            itemsList.innerHTML = '';
        }