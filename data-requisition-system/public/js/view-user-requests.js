// document.addEventListener('DOMContentLoaded', function () {
//     const requests = [
//         {
//             requestId: "REQ12345",
//             userName: "Gaurvi Gurhar",
//             group: "Para-09",
//             itemName: "Laptop",
//             quantity: 2,
//             status: "Pending"
//         },
//         {
//             requestId: "REQ67890",
//             userName: "Simran Rathore",
//             group: "HRD",
//             itemName: "Projector",
//             quantity: 1,
//             status: "Approved"
//         }
//     ];

//     const tbody = document.querySelector('tbody');
//     requests.forEach(request => {
//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <td>${request.requestId}</td>
//             <td>${request.userName}</td>
//             <td>${request.group}</td>
//             <td>${request.itemName}</td>
//             <td>${request.quantity}</td>
//             <td>${request.status}</td>
//         `;
//         tbody.appendChild(row);
//     });
// });


// ---------------- changes made by farman

const tbody = document.querySelector("tbody");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const pageInfo = document.getElementById("page-info");

let requests = [];
let currentPage = 1;
const itemsPerPage = 10;

async function fetchRequests() {
    try {
        const response = await fetch('http://localhost:3000/admin/view-all-requests', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();

        if (response.ok) {
            requests = data.data;
            console.log(requests)
            renderTable(currentPage);
        } else {
            tbody.innerHTML = `<tr><td colspan="5">${data.error}</td></tr>`;
        }
    } catch (error) {
        console.error("Error fetching requests:", error);
        tbody.innerHTML = `<tr><td colspan="5">Failed to fetch data. Please try again later.</td></tr>`;
    }
}

function renderTable(page) {
    tbody.innerHTML = ""; // clear existing table rows
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageRequests = requests.slice(start, end);

    if (pageRequests.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5">No data available.</td></tr>`;
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
            <td>${request.past_purchase}</td>
            <td>${request.status}</td>
            <td>${request.date_of_request}</td>
        `;
        tbody.appendChild(row);
    });

    pageInfo.textContent = `Page ${page} of ${Math.ceil(requests.length / itemsPerPage)}`;

    prevButton.disabled = page === 1;
    nextButton.disabled = page >= Math.ceil(requests.length / itemsPerPage);
}

prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        renderTable(currentPage);
    }
});

nextButton.addEventListener("click", () => {
    if (currentPage < Math.ceil(requests.length / itemsPerPage)) {
        currentPage++;
        renderTable(currentPage);
    }
});

fetchRequests();
