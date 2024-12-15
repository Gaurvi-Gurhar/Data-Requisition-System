// function applyFilters() {
//     const requestDate = document.getElementById("request-date").value;
//     const itemName = document.getElementById("item-name").value;
//     const status = document.getElementById("status").value;
//     const rows = document.querySelectorAll(".request-row");

//     rows.forEach(row => {
//         const rowStatus = row.getAttribute("data-status");
//         const rowItem = row.getAttribute("data-item");
//         const rowRequestDate = row.cells[5].textContent;

//         // simple date filter logic (convert date strings to Date objects)
//         const showByRequestDate = (requestDate === "" || new Date(rowRequestDate) >= new Date(requestDate));

//         // filter by status and item name
//         const showByStatus = (status === "all" || status === rowStatus);
//         const showByItem = (itemName === "all" || itemName === rowItem);

//         // show or hide rows based on filters
//         if (showByRequestDate && showByStatus && showByItem) {
//             row.style.display = "";
//         } else {
//             row.style.display = "none";
//         }
//     });
// }


async function applyFilters() {
    const requestDate = document.getElementById("request-date").value;
    const itemName = document.getElementById("item-name").value;
    const status = document.getElementById("status").value;

    // Build query string
    const params = new URLSearchParams({
        requestDate,
        itemName,
        status
    });

    try {
        // Fetch data from the backend
        const response = await fetch(`http://localhost:3000/admin/view-consolidate-request?${params.toString()}`);
        if (!response.ok) {
            throw new Error("Failed to fetch data from the server.");
        }
        const data = await response.json();

        // Populate table with new data
        const tableBody = document.getElementById("requests-table-body");
        tableBody.innerHTML = ""; // Clear existing rows

        data.forEach(row => {
            const tableRow = `
                <tr>
                    <td>${row.request_id}</td>
                    <td>${row.username}</td>
                    <td>${row.group_name}</td>
                    <td>${row.item_name}</td>
                    <td>${row.quantity}</td>
                    <td>${row.status}</td>
                    <td>${row.date_of_request}</td>
                </tr>
            `;
            tableBody.innerHTML += tableRow;
        });
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to apply filters. Please try again.");
    }
}
