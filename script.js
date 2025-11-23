
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');


hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});


document.querySelectorAll('.nav-links li a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});



const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry) // Optional: for debugging
        if (entry.isIntersecting) {
            entry.target.classList.add('show'); // Add class to trigger CSS animation
        } else {
           
        }
    });
});


const hiddenElements = document.querySelectorAll('.hidden');

hiddenElements.forEach((el) => observer.observe(el));
