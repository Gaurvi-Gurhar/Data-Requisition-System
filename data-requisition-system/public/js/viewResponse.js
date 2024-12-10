/**
         * Navigates to a specific page with the `requestId` as a query parameter.
         * @param {string} page - The page to navigate to (update-request or cancel-request).
         * @param {string} requestId - The ID of the request to pass to the page.
         */
function navigateToPage(page, requestId) {
    const url = `${page}?requestId=${encodeURIComponent(requestId)}`;
    window.location.href = url;
}