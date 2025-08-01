fetch('nav_bar.html')
    .then(result => result.text())
    .then(data => {
        document.getElementById('nav_bar').innerHTML = data;

        // After nav is loaded, set up hash-based routing for single-page navigation
        window.onhashchange = () => {
            loadFromHash(); // Load the appropriate page when the hash changes
        };
        loadFromHash(); // On initial load, display the correct page based on the current hash
    });

/**
 * Loads the page content based on the current URL hash.
 * If no hash is present, defaults to 'home.html'.
 * Also updates the navigation highlighting.
 */
function loadFromHash() {
    let hash = window.location.hash.substr(1); // Extract the part after '#'
    if (!hash) {
        hash = 'home.html'; // Default to home page if hash is empty
        window.location.hash = '#home.html'; // Update the URL hash
    }

    // Find the navigation link that matches the current hash
    const link = document.querySelector(`a[href="#${hash}"]`);
    loadPage(hash, link); // Load the page and update nav highlighting
}

/**
 * Fetches the HTML content for the given page and inserts it into the #content element.
 * Also manages the 'active' class for navigation links.
 * @param {string} page - The HTML file to load (e.g., 'home.html')
 * @param {Element|null} link - The navigation link element to highlight
 */
function loadPage(page, link = null) {
    fetch(page)
        .then(result => result.text())
        .then(data => {
            document.getElementById('content').innerHTML = data; // Display the loaded page content
        });

    if (link) {
        // Remove 'active' class from all nav links, then add it to the current link
        document.querySelectorAll('nav ul li a').forEach(el => {
            el.classList.remove('active');
        });
        link.classList.add('active');
    }
}
