// document.addEventListener('DOMContentLoaded', function() {
//     // Example of static data for a request (you can later fetch this data from the backend)
//     const requestData = {
//         id: "REQ12345",
//         itemName: "Laptop",
//         quantity: 1,
//         priority: "Low",
//         deadline: "2024-12-31"
//     };

//     // Populate the form with the request details
//     document.getElementById('request-id').value = requestData.id;
//     document.getElementById('item-name').value = requestData.itemName;
//     document.getElementById('quantity').value = requestData.quantity;
//     document.getElementById('priority').value = requestData.priority;
//     document.getElementById('deadline').value = requestData.deadline;

//     // Handle cancel request
//     document.getElementById('cancel-btn').addEventListener('click', function() {
//         alert(`Request ${requestData.id} has been canceled!`);
//         // Here you would send a request to your backend to delete the request
//     });
// });


document.getElementById("cancel-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    console.log("working")

    const request_id = document.getElementById("request-id").value;

    const formData = { request_id };

    console.log("Form Data:", formData);

    try {
        const response = await fetch("http://localhost:3000/user/cancel-request", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();
        console.log("Response:", result);

        if (response.ok) {
            alert(result.message);
        } else {
            alert("Update Failed: " + (result.error || "Unknown error occurred."));
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while cancelling the request. Please try again.");
    }
});
