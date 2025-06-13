// DOM Elements
const catImage = document.getElementById('catImage');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const retryButton = document.getElementById('retryButton');
const notificationToggle = document.getElementById('notificationToggle');

// Constants
const CAT_API_URL = 'https://cataas.com/cat';
const STORAGE_KEY = 'dailyCat';
const NOTIFICATION_PERMISSION_KEY = 'notificationPermission';

// Check if we have a stored cat for today
function getStoredCat() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        const { date, imageUrl } = JSON.parse(stored);
        const today = new Date().toDateString();
        if (date === today) {
            return imageUrl;
        }
    }
    return null;
}

// Store the cat image URL
function storeCat(imageUrl) {
    const today = new Date().toDateString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
        date: today,
        imageUrl
    }));
}

// Fetch a new cat image
async function fetchCat() {
    try {
        loading.style.display = 'block';
        error.style.display = 'none';
        catImage.style.display = 'none';

        const response = await fetch(CAT_API_URL);
        if (!response.ok) throw new Error('Failed to fetch cat');
        
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        
        catImage.src = imageUrl;
        catImage.style.display = 'block';
        loading.style.display = 'none';
        
        storeCat(imageUrl);
    } catch (err) {
        console.error('Error fetching cat:', err);
        loading.style.display = 'none';
        error.style.display = 'block';
    }
}

// Handle notification permission
async function handleNotificationPermission() {
    if (!('Notification' in window)) {
        notificationToggle.style.display = 'none';
        return;
    }

    const permission = localStorage.getItem(NOTIFICATION_PERMISSION_KEY);
    if (permission === 'granted') {
        notificationToggle.querySelector('.status').textContent = 'Notifications Enabled';
        scheduleNotification();
    }

    notificationToggle.addEventListener('click', async () => {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            localStorage.setItem(NOTIFICATION_PERMISSION_KEY, 'granted');
            notificationToggle.querySelector('.status').textContent = 'Notifications Enabled';
            scheduleNotification();
        }
    });
}

// Schedule daily notification
function scheduleNotification() {
    if (!('serviceWorker' in navigator)) return;

    // Register service worker
    navigator.serviceWorker.register('service-worker.js')
        .then(registration => {
            // Schedule notification for random time between 6 AM and 12 PM
            const now = new Date();
            const scheduledTime = new Date();
            scheduledTime.setHours(6 + Math.floor(Math.random() * 6));
            scheduledTime.setMinutes(Math.floor(Math.random() * 60));

            if (scheduledTime < now) {
                scheduledTime.setDate(scheduledTime.getDate() + 1);
            }

            registration.showNotification('Your Daily Cat 🐱', {
                body: 'Time for your daily dose of feline joy!',
                icon: '../images/icon-192.png',
                badge: '../images/badge-72.png',
                tag: 'daily-cat'
            });
        })
        .catch(err => console.error('Service Worker registration failed:', err));
}

// Initialize the app
function init() {
    const storedCat = getStoredCat();
    if (storedCat) {
        catImage.src = storedCat;
        catImage.style.display = 'block';
        loading.style.display = 'none';
    } else {
        fetchCat();
    }

    retryButton.addEventListener('click', fetchCat);
    handleNotificationPermission();
}

// Start the app
init(); 