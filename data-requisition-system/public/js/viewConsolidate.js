function applyFilters() {
    const requestDate = document.getElementById("request-date").value;
    const itemName = document.getElementById("item-name").value;
    const status = document.getElementById("status").value;
    const rows = document.querySelectorAll(".request-row");

    rows.forEach(row => {
        const rowStatus = row.getAttribute("data-status");
        const rowItem = row.getAttribute("data-item");
        const rowRequestDate = row.cells[5].textContent;

        // simple date filter logic (convert date strings to Date objects)
        const showByRequestDate = (requestDate === "" || new Date(rowRequestDate) >= new Date(requestDate));

        // filter by status and item name
        const showByStatus = (status === "all" || status === rowStatus);
        const showByItem = (itemName === "all" || itemName === rowItem);

        // show or hide rows based on filters
        if (showByRequestDate && showByStatus && showByItem) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}