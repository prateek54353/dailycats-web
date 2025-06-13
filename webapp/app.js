// DOM Elements
const catImage = document.getElementById('catImage');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const retryButton = document.getElementById('retryButton');

// Constants
const CAT_API_URL = 'https://cataas.com/cat';

// Fetch a new cat image (always random)
async function fetchCat() {
    try {
        loading.style.display = 'block';
        error.style.display = 'none';
        catImage.style.display = 'none';

        const response = await fetch(`${CAT_API_URL}?timestamp=${Date.now()}`);
        if (!response.ok) throw new Error('Failed to fetch cat');

        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);

        catImage.src = imageUrl;
        catImage.style.display = 'block';
        loading.style.display = 'none';
    } catch (err) {
        console.error('Error fetching cat:', err);
        loading.style.display = 'none';
        error.style.display = 'block';
    }
}

// Initialize the app – always load a fresh cat
function init() {
    fetchCat();
    retryButton.addEventListener('click', fetchCat);
}

// Start the app
init();