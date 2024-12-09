document.addEventListener('DOMContentLoaded', function() {
    // Example of static data for a request (you can later fetch this data from the backend)
    const requestData = {
        id: "REQ12345",
        itemName: "Laptop",
        quantity: 1,
        priority: "Low",
        deadline: "2024-12-31"
    };

    // Populate the form with the request details
    document.getElementById('request-id').value = requestData.id;
    document.getElementById('item-name').value = requestData.itemName;
    document.getElementById('quantity').value = requestData.quantity;
    document.getElementById('priority').value = requestData.priority;
    document.getElementById('deadline').value = requestData.deadline;

    // Handle cancel request
    document.getElementById('cancel-btn').addEventListener('click', function() {
        alert(`Request ${requestData.id} has been canceled!`);
        // Here you would send a request to your backend to delete the request
    });
});
