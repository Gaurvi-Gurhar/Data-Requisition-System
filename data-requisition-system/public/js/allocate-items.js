// document.addEventListener('DOMContentLoaded', function () {
//     const approveButtons = document.querySelectorAll('.approve-btn');
//     const rejectButtons = document.querySelectorAll('.reject-btn');

//     approveButtons.forEach((btn) => {
//         btn.addEventListener('click', () => {
//             alert('Request Approved!');
//             btn.parentElement.parentElement.querySelector('td:nth-child(5)').textContent = 'Approved';
//         });
//     });

//     rejectButtons.forEach((btn) => {
//         btn.addEventListener('click', () => {
//             alert('Request Rejected!');
//             btn.parentElement.parentElement.querySelector('td:nth-child(5)').textContent = 'Rejected';
//         });
//     });
// });

// Global variables
let requests = []; // Store fetched requests globally
const tbody = document.getElementById("requests-table-body");

// Fetch and render all requests dynamically
async function fetchRequests() {
    try {
        const response = await fetch("http://localhost:3000/admin/view-all-requests", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();

        if (response.ok) {
            requests = data.data; // Assuming data.data contains the request array
            renderTable();
        } else {
            tbody.innerHTML = `<tr><td colspan="5">${data.error}</td></tr>`;
        }
    } catch (error) {
        console.error("Error fetching requests:", error);
        tbody.innerHTML = `<tr><td colspan="5">Failed to fetch data. Please try again later.</td></tr>`;
    }
}

// Render table rows dynamically
function renderTable() {
    tbody.innerHTML = ""; // Clear previous rows

    if (requests.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5">No pending requests found.</td></tr>`;
        return;
    }

    requests.forEach((request) => {
        const row = `
            <tr>
                <td>${request.request_id}</td>
                <td>${request.username}</td>
                <td>${request.item_id}</td>
                <td>${request.quantity}</td>
                <td>
                    <button class="approve-btn">Approve</button>
                    <button class="reject-btn">Reject</button>
                </td>
            </tr>
        `;
        tbody.insertAdjacentHTML("beforeend", row);
    });

    attachActionButtons(); // Attach event listeners to buttons
}

// Attach event listeners to buttons
function attachActionButtons() {
    const approveButtons = document.querySelectorAll(".approve-btn");
    const rejectButtons = document.querySelectorAll(".reject-btn");

    approveButtons.forEach((btn) => {
        btn.addEventListener("click", () => handleRequestAction(btn, "Approved"));
    });

    rejectButtons.forEach((btn) => {
        btn.addEventListener("click", () => handleRequestAction(btn, "Rejected"));
    });
}

// Handle Approve/Reject actions
async function handleRequestAction(button, status) {
    const row = button.closest("tr"); // Get the row of the clicked button
    const requestId = row.querySelector("td:nth-child(1)").textContent; // Extract Request ID

    try {
        const response = await fetch("http://localhost:3000/admin/allocate-request", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ request_id: requestId, status }),
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);
            // Optionally remove the row or update status
            row.querySelector("td:nth-child(5)").textContent = status;
            row.style.backgroundColor = status === "Approved" ? "#d4edda" : "#f8d7da"; // Green or red highlight
        } else {
            alert("Error: " + result.error);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to update request. Please try again later.");
    }
}

// Fetch all requests when the page loads
document.addEventListener("DOMContentLoaded", fetchRequests);

