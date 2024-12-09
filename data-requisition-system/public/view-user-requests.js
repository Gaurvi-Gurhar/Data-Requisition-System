document.addEventListener('DOMContentLoaded', function () {
    const requests = [
        {
            requestId: "REQ12345",
            userName: "Gaurvi Gurhar",
            group: "Para-09",
            itemName: "Laptop",
            quantity: 2,
            status: "Pending"
        },
        {
            requestId: "REQ67890",
            userName: "Simran Rathore",
            group: "HRD",
            itemName: "Projector",
            quantity: 1,
            status: "Approved"
        }
    ];

    const tbody = document.querySelector('tbody');
    requests.forEach(request => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${request.requestId}</td>
            <td>${request.userName}</td>
            <td>${request.group}</td>
            <td>${request.itemName}</td>
            <td>${request.quantity}</td>
            <td>${request.status}</td>
        `;
        tbody.appendChild(row);
    });
});
