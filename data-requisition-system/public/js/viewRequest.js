// const requests = Array.from({ length: 35 }, (_, i) => ({
//     id: `REQ${String(i + 1).padStart(3, '0')}`,
//     itemName: `Item ${i + 1}`,
//     quantity: Math.ceil(Math.random() * 10),
//     status: ["Approved", "Pending", "Rejected"][i % 3],
//     date: `2024-11-${(i % 30) + 1}`.padStart(10, '0'),
// }));

// const tbody = document.querySelector("tbody");
// const prevButton = document.getElementById("prev");
// const nextButton = document.getElementById("next");
// const pageInfo = document.getElementById("page-info");

// let currentPage = 1;
// const itemsPerPage = 10;

// function renderTable(page) {
//     tbody.innerHTML = ""; // clear existin table rows
//     const start = (page - 1) * itemsPerPage;
//     const end = start + itemsPerPage;
//     const pageRequests = requests.slice(start, end);

//     pageRequests.forEach(request => {
//         const row = document.createElement("tr");
//         row.innerHTML = `
//             <td>${request.id}</td>
//             <td>${request.itemName}</td>
//             <td>${request.quantity}</td>
//             <td>${request.status}</td>
//             <td>${request.date}</td>
//         `;
//         tbody.appendChild(row);
//     });

//     // update page info
//     pageInfo.textContent = `Page ${page} of ${Math.ceil(requests.length / itemsPerPage)}`;

//     // enable/disable buttons
//     prevButton.disabled = page === 1;
//     nextButton.disabled = page >= Math.ceil(requests.length / itemsPerPage);
// }

// // event listeners for pagination
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

// // initl render
// renderTable(currentPage);

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
        const group_name = localStorage.getItem("group_name");

        // const response = await fetch('http://localhost:3000/user/view-existing-requests', {
        //     method: 'GET',
        //     headers: { 'Content-Type': 'application/json' }
        // });
        const response = await fetch(`http://localhost:3000/user/view-existing-requests?group_name=${encodeURIComponent(group_name)}`, {
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
            <td>${request.selected_item}</td>
            <td>${request.quantity}</td>
            <td>${request.status}</td>
            <td>${request.username}</td>
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