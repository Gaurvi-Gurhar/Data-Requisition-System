//login form handler 
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log('Email:', email);
    console.log('Password:', password);

    alert('Login functionality will be connected soon!');
});












// // regstratn form handler
// // Simulate sending an email and verify the user
// document.getElementById('register-form').addEventListener('submit', function(e) {
//     e.preventDefault();

//     const name = document.getElementById('name').value;
//     const email = document.getElementById('email').value;
//     const username = document.getElementById('user-name').value;
//     const password = document.getElementById('password').value;
//     const confirmPassword = document.getElementById('confirm-password').value;

//     // Simulate email verification flow
//     if (validateRegistration(username, email, password, confirmPassword)) {
//         // Simulate sending verification email
//         simulateEmailVerification(email);
//     }
// });

// function validateRegistration(username, email, password, confirmPassword) {
//     // Check username existence (Simulated)
//     const existingUsernames = ["user1", "admin", "john_doe"];
//     if (existingUsernames.includes(username)) {
//         alert('Username already taken. Please choose another one.');
//         return false;
//     }

//     // Check if password matches
//     if (password !== confirmPassword) {
//         alert('Passwords do not match!');
//         return false;
//     }

//     // Password strength check (basic check for demo)
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
//     if (!passwordRegex.test(password)) {
//         alert('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
//         return false;
//     }

//     return true;
// }

// function simulateEmailVerification(email) {
//     // Simulate sending a verification email (this is just a placeholder for demo purposes)
//     console.log(`Verification email sent to ${email}`);
    
//     // Hide the registration form and show the verification message
//     document.getElementById('register').style.display = 'none';
//     document.getElementById('email-verification').style.display = 'block';
    
//     // In a real-world scenario, you'd send the email using a backend service.
//     // The backend would send a unique link to verify the email.
// }
















// For "View Existing Requests" functionalty
document.addEventListener('DOMContentLoaded', function() {
    const requestsData = [
        { request_id: 'REQ001', item_name: 'Laptop', description: 'Dell XPS 15', quantity_requested: 5, purchased_quantity: 10, deadline: '2024-12-01', status: 'Pending', submission_date: '2024-11-01' },
        { request_id: 'REQ002', item_name: 'Projector', description: 'Epson 3LCD', quantity_requested: 3, purchased_quantity: 2, deadline: '2024-12-10', status: 'Approved', submission_date: '2024-11-05' },
        { request_id: 'REQ003', item_name: 'Monitor', description: 'Samsung Curved', quantity_requested: 8, purchased_quantity: 5, deadline: '2024-12-15', status: 'Rejected', submission_date: '2024-11-10' },
        { request_id: 'REQ004', item_name: 'Keyboard', description: 'Logitech K780', quantity_requested: 4, purchased_quantity: 10, deadline: '2024-12-20', status: 'Pending', submission_date: '2024-11-15' },
        { request_id: 'REQ005', item_name: 'Mouse', description: 'Logitech MX Master 3', quantity_requested: 7, purchased_quantity: 3, deadline: '2024-12-25', status: 'Approved', submission_date: '2024-11-20' },
        { request_id: 'REQ006', item_name: 'External Hard Drive', description: 'Seagate 1TB', quantity_requested: 5, purchased_quantity: 2, deadline: '2024-12-30', status: 'Pending', submission_date: '2024-11-25' },
        { request_id: 'REQ007', item_name: 'Laptop Stand', description: 'ErgoStand Pro', quantity_requested: 2, purchased_quantity: 6, deadline: '2024-12-05', status: 'Approved', submission_date: '2024-11-28' },
    ];
    

    // Populated the table with the requests data
    const requestsBody = document.getElementById('requests-body');
    requestsData.forEach(request => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${request.request_id}</td>
            <td>${request.item_name}</td>
            <td>${request.description}</td>
            <td>${request.quantity_requested}</td>
            <td>${request.purchased_quantity}</td>
            <td>${request.deadline}</td>
            <td class="status-${request.status.toLowerCase()}">${request.status}</td>
            <td>${request.submission_date}</td>
        `;
        requestsBody.appendChild(row);
    });

    // Search and status filter handel
    const searchBar = document.getElementById('search-bar');
    const statusFilter = document.getElementById('status-filter');

    searchBar.addEventListener('input', filterRequests);
    statusFilter.addEventListener('change', filterRequests);

    function filterRequests() {
        const searchValue = searchBar.value.toLowerCase();
        const statusValue = statusFilter.value.toLowerCase();

        const filteredRequests = requestsData.filter(request => {
            const matchesSearch = request.item_name.toLowerCase().includes(searchValue) || request.description.toLowerCase().includes(searchValue);
            const matchesStatus = statusValue ? request.status.toLowerCase() === statusValue : true;
            return matchesSearch && matchesStatus;
        });

        // for clearin the table and repopulating with filtered req.s
        requestsBody.innerHTML = '';
        filteredRequests.forEach(request => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${request.request_id}</td>
                <td>${request.item_name}</td>
                <td>${request.description}</td>
                <td>${request.quantity_requested}</td>
                <td>${request.purchased_quantity}</td>
                <td>${request.deadline}</td>
                <td class="status-${request.status.toLowerCase()}">${request.status}</td>
                <td>${request.submission_date}</td>
            `;
            requestsBody.appendChild(row);
        });
    }

    // pagination funtnlty
    let currentPage = 1;
    const rowsPerPage = 5;
    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');

    function paginateRequests() {
        const start = (currentPage - 1) * rowsPerPage;
        const end = currentPage * rowsPerPage;
        const paginatedRequests = requestsData.slice(start, end);

        // for clearing the table and repopulate with paginated data
        requestsBody.innerHTML = '';
        paginatedRequests.forEach(request => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${request.request_id}</td>
                <td>${request.item_name}</td>
                <td>${request.description}</td>
                <td>${request.quantity_requested}</td>
                <td>${request.purchased_quantity}</td>
                <td>${request.deadline}</td>
                <td class="status-${request.status.toLowerCase()}">${request.status}</td>
                <td>${request.submission_date}</td>
            `;
            requestsBody.appendChild(row);
        });

        // to disable or enable the pagination buttons
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage * rowsPerPage >= requestsData.length;
    }

    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            paginateRequests();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentPage * rowsPerPage < requestsData.length) {
            currentPage++;
            paginateRequests();
        }
    });

    // Initial population of table and pagination
    paginateRequests();
});
