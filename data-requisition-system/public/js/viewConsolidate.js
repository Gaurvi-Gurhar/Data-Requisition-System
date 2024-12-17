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


// const tbody = document.querySelector("tbody");
// const prevButton = document.getElementById("prev");
// const nextButton = document.getElementById("next");
// const pageInfo = document.getElementById("page-info");

// let requests = [];
// let currentPage = 1;
// const itemsPerPage = 10;

// async function fetchRequests() {
//     try {
//         const response = await fetch('http://localhost:3000/admin/view-all-requests', {
//             method: 'GET',
//             headers: { 'Content-Type': 'application/json' }
//         });
//         const data = await response.json();

//         if (response.ok) {
//             requests = data.data;
//             console.log(requests)
//             renderTable(currentPage);
//         } else {
//             tbody.innerHTML = `<tr><td colspan="5">${data.error}</td></tr>`;
//         }
//     } catch (error) {
//         console.error("Error fetching requests:", error);
//         tbody.innerHTML = `<tr><td colspan="5">Failed to fetch data. Please try again later.</td></tr>`;
//     }
// }

// function renderTable(page) {
//     tbody.innerHTML = ""; // clear existing table rows
//     const start = (page - 1) * itemsPerPage;
//     const end = start + itemsPerPage;
//     const pageRequests = requests.slice(start, end);

//     if (pageRequests.length === 0) {
//         tbody.innerHTML = `<tr><td colspan="5">No data available.</td></tr>`;
//         return;
//     }

//     pageRequests.forEach(request => {
//         const row = document.createElement("tr");
//         row.innerHTML = `
//             <td>${request.request_id}</td>
//             <td>${request.username}</td>
//             <td>${request.group_name}</td>
//             <td>${request.selected_item}</td>
//             <td>${request.quantity}</td>
//             <td>${request.past_purchase}</td>
//             <td>${request.status}</td>
//             <td>${request.date_of_request}</td>
//         `;
//         tbody.appendChild(row);
//     });

//     pageInfo.textContent = `Page ${page} of ${Math.ceil(requests.length / itemsPerPage)}`;

//     prevButton.disabled = page === 1;
//     nextButton.disabled = page >= Math.ceil(requests.length / itemsPerPage);
// }

// prevButton.addEventListener("click", () => {
//     if (currentPage > 1) {
//         currentPage--;
//         renderTable(currentPage);
//     }
// });

// nextButton.addEventListener("click", () => {
//     if (currentPage < Math.ceil(requests.length / itemsPerPage)) {
//         currentPage++;
//         renderTable(currentPage);
//     }
// });

// fetchRequests();


// async function fetchItems() {
//     try {
//         const response = await fetch("http://localhost:3000/user/get-items");
//         if (!response.ok) {
//             throw new Error('Failed to fetch items');
//         }
//         const items = await response.json();
//         console.log(items.data)
//         populateDropdown(items?.data);
//     } catch (error) {
//         console.error('Error fetching items:', error);
//         alert('Error fetching items. Please try again later.');
//     }
// }

// document.addEventListener('DOMContentLoaded', fetchItems);


// async function applyFilters() {
//     const requestDate = document.getElementById("request-date").value;
//     const itemName = document.getElementById("item-name").value;
//     const status = document.getElementById("status").value;

//     // Build query string
//     const params = new URLSearchParams({
//         requestDate,
//         itemName,
//         status
//     });

//     try {
//         // Fetch data from the backend
//         const response = await fetch(`http://localhost:3000/admin/view-consolidate-request?${params.toString()}`);
//         if (!response.ok) {
//             throw new Error("Failed to fetch data from the server.");
//         }
//         const data = await response.json();

//         // Populate table with new data
//         const tableBody = document.getElementById("requests-table-body");
//         tableBody.innerHTML = ""; // Clear existing rows

//         data.forEach(row => {
//             const tableRow = `
//                 <tr>
//                     <td>${row.request_id}</td>
//                     <td>${row.username}</td>
//                     <td>${row.group_name}</td>
//                     <td>${row.selected_item}</td>
//                     <td>${row.quantity}</td>
//                     <td>${row.status}</td>
//                     <td>${row.date_of_request}</td>
//                 </tr>
//             `;
//             tableBody.innerHTML += tableRow;
//         });
//     } catch (error) {
//         console.error("Error:", error);
//         alert("Failed to apply filters. Please try again.");
//     }
// }


const tbody = document.getElementById("requests-table-body");
let requests = []; // Stores all requests
let filteredRequests = []; // Stores filtered requests
let currentPage = 1;
const itemsPerPage = 10;

// Fetch and display all requests initially
async function fetchRequests() {
    try {
        const response = await fetch('http://localhost:3000/admin/view-all-requests', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();

        if (response.ok) {
            requests = data.data; // Store the fetched data
            filteredRequests = [...requests]; // Initialize filtered data
            renderTable(currentPage); // Render the table
        } else {
            tbody.innerHTML = `<tr><td colspan="7">${data.error}</td></tr>`;
        }
    } catch (error) {
        console.error("Error fetching requests:", error);
        tbody.innerHTML = `<tr><td colspan="7">Failed to fetch data. Please try again later.</td></tr>`;
    }
}

// Render table based on data and pagination
function renderTable(page) {
    tbody.innerHTML = ""; // Clear existing table rows
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageRequests = filteredRequests.slice(start, end); // Paginate filtered data

    if (pageRequests.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7">No data available.</td></tr>`;
        return;
    }

    pageRequests.forEach(request => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${request.request_id}</td>
            <td>${request.username}</td>
            <td>${request.group_name}</td>
            <td>${request.selected_item}</td>
            <td>${request.quantity}</td>
            <td>${request.status}</td>
            <td>${request.date_of_request}</td>
        `;
        tbody.appendChild(row);
    });
}

async function fetchItems() {
    try {
        const response = await fetch("http://localhost:3000/user/get-items");
        if (!response.ok) {
            throw new Error("Failed to fetch items");
        }
        const data = await response.json();
        console.log(data.data);

        const uniqueItems = Array.from(
            new Set(data.data.map(request => request.selected_item))
        );

        populateDropdown(uniqueItems);
    } catch (error) {
        console.error("Error fetching items:", error);
        alert("Error fetching items. Please try again later.");
    }
}

function populateDropdown(items) {
    const itemNameDropdown = document.getElementById("item-name");
    itemNameDropdown.innerHTML = `<option value="all">All</option>`;

    items.forEach(item => {
        const option = document.createElement("option");
        option.value = item;
        option.textContent = item;
        itemNameDropdown.appendChild(option);
    });
}


function applyFilters() {
    const requestDate = document.getElementById("request-date").value;
    const itemName = document.getElementById("item-name").value;
    const status = document.getElementById("status").value;

    filteredRequests = requests.filter(request => {
        const matchesDate = !requestDate || request.date_of_request === requestDate;
        const matchesItem = itemName === "all" || request.selected_item === itemName;
        const matchesStatus = status === "all" || request.status === status;

        return matchesDate && matchesItem && matchesStatus;
    });

    currentPage = 1; 
    renderTable(currentPage);
}

document.getElementById("prev")?.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        renderTable(currentPage);
    }
});

document.getElementById("next")?.addEventListener("click", () => {
    if (currentPage < Math.ceil(filteredRequests.length / itemsPerPage)) {
        currentPage++;
        renderTable(currentPage);
    }
});


document.addEventListener('DOMContentLoaded', fetchRequests, fetchItems);
