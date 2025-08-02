// Load the navigation bar from an external HTML file
fetch('nav_bar.html')
    .then(result => result.text())
    .then(data => {
        document.getElementById('nav_bar').innerHTML = data;

        // Set up navigation so the page changes when the URL hash changes (e.g., #menu)
        window.onhashchange = () => {
            loadFromHash(); // Load the right page when the hash changes
        };
        loadFromHash(); // Load the correct page when the site first opens
    });

/**
 * This function checks the URL hash (the part after #).
 * If there is no hash, it shows the home page by default.
 * It also highlights the correct link in the navigation bar.
 */
function loadFromHash() {
    let hash = window.location.hash.substr(1); // Get what's after '#'
    if (!hash) {
        hash = 'home.html'; // If nothing is there, show the home page
        window.location.hash = '#home.html'; // Update the URL to include the hash
    }

    // Find the navigation link that matches the current hash
    const link = document.querySelector(`a[href="#${hash}"]`);
    loadPage(hash, link); // Show the page and highlight the link
}

/**
 * This function loads the HTML for the given page and puts it in the #content area.
 * It also makes sure the correct navigation link is highlighted.
 * @param {string} page - The HTML file to load (like 'home.html')
 * @param {Element|null} link - The navigation link to highlight
 */
function loadPage(page, link = null) {
    fetch(page)
        .then(result => result.text())
        .then(data => {
            document.getElementById('content').innerHTML = data; // Show the page content
        });

    if (link) {
        // Remove the 'active' class from all links, then add it to the current link
        document.querySelectorAll('nav ul li a').forEach(el => {
            el.classList.remove('active');
        });
        link.classList.add('active');
    }
}
