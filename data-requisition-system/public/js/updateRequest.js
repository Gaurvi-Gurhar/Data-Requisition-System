document.getElementById("update-request-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    console.log("working")

    const request_id = document.getElementById("request-id").value;
    const item_name = document.getElementById("item-name").value;
    const quantity = document.getElementById("quantity").value;
    const past_purchase = document.getElementById("past-purchase").value;

    const formData = { request_id, item_name, quantity, past_purchase };

    console.log("Form Data:", formData);

    try {
        const response = await fetch("http://localhost:3000/user/update-request", {
            method: "PUT", // Use the correct HTTP method (PUT in your backend code)
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData), // Use formData here
        });

        const result = await response.json(); // Parse the JSON response
        console.log("Response:", result);

        if (response.ok) {
            alert(result.message);
        } else {
            alert("Update Failed: " + (result.error || "Unknown error occurred."));
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while updating the request. Please try again.");
    }
});
