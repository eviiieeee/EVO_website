// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

// Secret page keyboard shortcut
let keySequence = '';
let lastKeyTime = Date.now();
const TIMEOUT = 1000; // Reset sequence after 1 second of inactivity

document.addEventListener('keydown', (e) => {
    // Only track keyboard input on credentials.html
    if (!window.location.pathname.includes('credentials.html')) {
        return;
    }

    const currentTime = Date.now();
    if (currentTime - lastKeyTime > TIMEOUT) {
        keySequence = ''; // Reset sequence if too much time has passed
    }
    lastKeyTime = currentTime;
    
    keySequence += e.key.toLowerCase();
    
    if (keySequence.includes('sigmaboy')) {
        window.location.href = 'main.min.html';
    }
});

// Toggle menu
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking a link
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Scroll Animation for nav background
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrolled / maxHeight) * 100;
    document.documentElement.style.setProperty('--scroll-width', `${scrollPercent}%`);
});

// Reveal animations on scroll
const reveals = document.querySelectorAll('.reveal');

function revealOnScroll() {
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Array of possible jumpscare images and their corresponding sounds
const scaryContent = {
    'assets_bundle.min.jpg': 'soundEffect1',
    'interface_module.min.jpg': 'soundEffect2'
};

const scaryImages = Object.keys(scaryContent);

// Handle social link clicks
const socialLinks = document.querySelectorAll('.social-links a');
const overlay = document.getElementById('overlay');
const overlayImage = overlay.querySelector('img');
const soundEffects = {
    soundEffect1: document.getElementById('soundEffect1'),
    soundEffect2: document.getElementById('soundEffect2')
};

let currentSound = null;

socialLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        // Randomly select an image
        const randomImage = scaryImages[Math.floor(Math.random() * scaryImages.length)];
        overlayImage.src = randomImage;
        
        // Stop any currently playing sound
        if (currentSound) {
            currentSound.pause();
            currentSound.currentTime = 0;
        }
        
        // Play the corresponding sound effect
        currentSound = soundEffects[scaryContent[randomImage]];
        currentSound.currentTime = 0;
        currentSound.play();
        
        overlay.classList.add('active');
        
        // Remove overlay after sound ends
        currentSound.onended = () => {
            overlay.classList.remove('active');
        };
    });
});

// Allow clicking overlay to dismiss it
overlay.addEventListener('click', () => {
    overlay.classList.remove('active');
    if (currentSound) {
        currentSound.pause();
        currentSound.currentTime = 0;
    }
});