document.addEventListener('DOMContentLoaded', function () {
    const generateButton = document.getElementById('generate-report-btn');
    const reportOutput = document.getElementById('report-output');

    // Dummy data
    const mockData = [
        { id: 'REQ112233', user: 'Alex Johnson', item: 'Monitor', quantity: 3, status: 'Approved', date: '2024-11-20' },
        { id: 'REQ223344', user: 'Mary Jane', item: 'Keyboard', quantity: 5, status: 'Pending', date: '2024-11-18' },
        { id: 'REQ334455', user: 'John Smith', item: 'Mouse', quantity: 2, status: 'Rejected', date: '2024-11-17' },
        { id: 'REQ445566', user: 'Sarah Lee', item: 'Laptop', quantity: 1, status: 'Approved', date: '2024-11-19' },
        { id: 'REQ556677', user: 'Jake Peralta', item: 'Monitor', quantity: 2, status: 'Pending', date: '2024-11-21' },
        { id: 'REQ667788', user: 'Amy Santiago', item: 'Mouse', quantity: 3, status: 'Approved', date: '2024-11-22' },
        { id: 'REQ778899', user: 'Terry Jeffords', item: 'Keyboard', quantity: 4, status: 'Rejected', date: '2024-11-23' },
        { id: 'REQ889900', user: 'Rosa Diaz', item: 'Desk Chair', quantity: 1, status: 'Approved', date: '2024-11-24' },
        { id: 'REQ990011', user: 'Holt Captain', item: 'Printer', quantity: 2, status: 'Pending', date: '2024-11-25' },
        { id: 'REQ101112', user: 'Gina Linetti', item: 'Whiteboard', quantity: 6, status: 'Approved', date: '2024-11-26' },
    ];

    generateButton.addEventListener('click', () => {
        const startDate = document.getElementById('start-date').value;
        const endDate = document.getElementById('end-date').value;
        const status = document.getElementById('status').value;
        const reportType = document.getElementById('report-type').value;
        const reportView = document.getElementById('report-view').value;

        const filteredData = mockData.filter((entry) => {
            const entryDate = new Date(entry.date);
            const isWithinDateRange =
                (!startDate || new Date(startDate) <= entryDate) &&
                (!endDate || new Date(endDate) >= entryDate);
            const isStatusMatch = status === 'all' || entry.status.toLowerCase() === status.toLowerCase();

            return isWithinDateRange && isStatusMatch;
        });

        reportOutput.innerHTML = ''; // Clear previous output

        if (filteredData.length > 0) {
            // Handle different Report Views
            let reportHTML = `<h3>Report View: ${reportView}</h3><table>`;
            reportHTML += `<thead><tr><th>Request ID</th><th>User Name</th><th>Item Name</th><th>Quantity</th><th>Status</th><th>Date</th></tr></thead><tbody>`;

            filteredData.forEach((entry) => {
                reportHTML += `<tr><td>${entry.id}</td><td>${entry.user}</td><td>${entry.item}</td><td>${entry.quantity}</td><td>${entry.status}</td><td>${entry.date}</td></tr>`;
            });

            reportHTML += `</tbody></table>`;

            // Handling different Report Types (e.g., Pie Chart, Bar Chart, Excel)
            if (reportType === 'pie-chart') {
                reportHTML += `<p><strong>Generated Pie Chart </strong></p>`; 
            } else if (reportType === 'bar-chart') {
                reportHTML += `<p><strong>Generated Bar Chart </strong></p>`; 
            } else if (reportType === 'excel-sheet') {
                reportHTML += `<p><strong>Generated Excel Sheet </strong></p>`;
            } else if (reportType === 'pdf') {
                reportHTML += `<p><strong>Generated PDF Report /strong></p>`; 
            }

            reportOutput.innerHTML = reportHTML;
        } else {
            reportOutput.innerHTML = '<p>No data found for the selected filters.</p>';
        }
    });
});
