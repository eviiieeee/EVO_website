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