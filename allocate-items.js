document.addEventListener('DOMContentLoaded', function () {
    const approveButtons = document.querySelectorAll('.approve-btn');
    const rejectButtons = document.querySelectorAll('.reject-btn');

    approveButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            alert('Request Approved!');
            btn.parentElement.parentElement.querySelector('td:nth-child(5)').textContent = 'Approved';
        });
    });

    rejectButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            alert('Request Rejected!');
            btn.parentElement.parentElement.querySelector('td:nth-child(5)').textContent = 'Rejected';
        });
    });
});
