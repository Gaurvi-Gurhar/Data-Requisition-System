// const itemName = document.getElementById('item-name');
//         const customItemDiv = document.getElementById('custom-item');
//         const customItemName = document.getElementById('custom-item-name');
//         const addCustomItem = document.getElementById('add-custom-item');
//         const itemsList = document.getElementById('items-list');
//         const form = document.getElementById('new-request-form');

//         // Display custom item input if "Other" is selected
//         itemName.addEventListener('change', () => {
//             if (itemName.value === 'other') {
//                 customItemDiv.style.display = 'block';
//             } else if (itemName.value) {
//                 // Allow only one selected item
//                 clearItemsList();
//                 addItemToList(itemName.options[itemName.selectedIndex].text);
//                 itemName.value = ""; // Reset dropdown after selection
//             }
//         });

//         // Add a custom item to the list
//         addCustomItem.addEventListener('click', () => {
//             const customValue = customItemName.value.trim();
//             if (customValue) {
//                 // Allow only one selected item
//                 clearItemsList();
//                 addItemToList(customValue);
//                 customItemName.value = '';
//                 customItemDiv.style.display = 'none';
//             }
//         });

//         // Function to add items to the list
//         function addItemToList(item) {
//             // Create item div
//             const itemDiv = document.createElement('div');
//             itemDiv.classList.add('item');
//             itemDiv.textContent = item;

//             // Add remove button
//             const removeButton = document.createElement('span');
//             removeButton.classList.add('remove');
//             removeButton.textContent = '×';
//             removeButton.addEventListener('click', () => {
//                 itemsList.removeChild(itemDiv);
//             });

//             itemDiv.appendChild(removeButton);
//             itemsList.appendChild(itemDiv);
//         }

//         // Function to clear all items
//         function clearItemsList() {
//             itemsList.innerHTML = '';
//         }


// ------------------- changes made by Farman

const itemName = document.getElementById('item-name');
const customItemDiv = document.getElementById('custom-item');
const customItemName = document.getElementById('custom-item-name');
const addCustomItem = document.getElementById('add-custom-item');
const itemsList = document.getElementById('items-list');
const form = document.getElementById('new-request-form');


itemName.addEventListener('change', () => {
    const selectedValue = itemName.value;

    if (selectedValue === 'other') {
        customItemDiv.style.display = 'block';
    } else if (selectedValue) {
        clearItemsList();
        const selectedText = itemName.options[itemName.selectedIndex].text;
        addItemToList(selectedText);
    }
});


addCustomItem.addEventListener('click', () => {
    const customValue = customItemName.value.trim();
console.log(customValue, "------------------value")

    if (customValue) {
        clearItemsList();
        addItemToList(customValue);
        // customItemName.value = '';
        customItemDiv.style.display = 'none';
    }
});


function addItemToList(item) {
    clearItemsList(); 
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item');
    itemDiv.textContent = item;


    const removeButton = document.createElement('span');
    removeButton.classList.add('remove');
    removeButton.textContent = '×';
    removeButton.addEventListener('click', () => {
        itemsList.removeChild(itemDiv);
    });

    itemDiv.appendChild(removeButton);
    itemsList.appendChild(itemDiv);
}


function clearItemsList() {
    itemsList.innerHTML = '';
}


form.addEventListener('submit', async(e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const selectedItemElement = itemsList.querySelector('.item');
    const selectedItem = selectedItemElement ? selectedItemElement.textContent.replace('×', '').trim() : 'None';

    const requestData = {
        username: formData.get('user-name'),
        group_name: formData.get('group'),
        selected_item: selectedItem,
        quantity: formData.get('quantity'),
        past_purchase: formData.get('quantity-last2years')
    };

    console.log('Form Data:', requestData);

    try {
        const response = await fetch("http://localhost:3000/user/create-new-request", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error(`Server Error: ${response.status} - ${response.statusText}`);
        }

        const responseData = await response.json();
        console.log('Response Data:', responseData);
        alert('Request submitted successfully! ✅');
        
        form.reset();
        clearItemsList();
    } catch (error) {
        console.error('Error submitting form:', error);
        alert(`Failed to submit request: ${error.message} ❌`);
    }
});

const itemNameDropdown = document.getElementById('item-name');

async function fetchItems() {
    try {
        const response = await fetch("http://localhost:3000/user/get-items");
        if (!response.ok) {
            throw new Error('Failed to fetch items');
        }
        const items = await response.json();
        console.log(items.data)
        populateDropdown(items?.data);
    } catch (error) {
        console.error('Error fetching items:', error);
        alert('Error fetching items. Please try again later.');
    }
}

function populateDropdown(items) {
    itemNameDropdown.innerHTML = '<option value="" disabled selected>Select an item</option>';
    items?.forEach(item => {
        const option = document.createElement('option');
        option.value = item?.item_name?.toLowerCase();
        option.textContent = item?.item_name;
        itemNameDropdown.appendChild(option);
    });
    const otherOption = document.createElement('option');
    otherOption.value = 'other';
    otherOption.textContent = 'Other';
    itemNameDropdown.appendChild(otherOption);
}

// Call fetchItems on page load
document.addEventListener('DOMContentLoaded', fetchItems);


addCustomItem.addEventListener('click', async () => {
    const item_name = customItemName.value.trim();
console.log(item_name, "------------------value")

    if (item_name) {
        try {
            const response = await fetch("http://localhost:3000/user/insert-items", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ item_name: item_name }),
            });

            if (!response.ok) {
                throw new Error('Failed to add custom item');
            }

            // await fetchItems();
            // addItemToList(item_name);
            customItemName.value = '';
            customItemDiv.style.display = 'none';
        } catch (error) {
            console.error('Error adding custom item:', error);
            alert('Failed to add custom item. Please try again.');
        }
    }
});
