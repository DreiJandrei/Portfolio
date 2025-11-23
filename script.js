// --- HAMBURGER MENU FUNCTIONALITY ---
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Toggle menu when clicking the hamburger icon
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking a link (optional but recommended for mobile)
document.querySelectorAll('.nav-links li a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// --- SCROLL ANIMATION (Intersection Observer) ---
// This looks for elements with the class 'hidden' and adds 'show' when they appear on screen

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry) // Optional: for debugging
        if (entry.isIntersecting) {
            entry.target.classList.add('show'); // Add class to trigger CSS animation
        } else {
            // Optional: Remove this else block if you want the animation to happen only once
            // entry.target.classList.remove('show'); 
        }
    });
});

// Select all elements with the 'hidden' class to observe
const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));