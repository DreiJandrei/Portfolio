
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


// ---------- Top nav ----------
const topnav = document.querySelector('.topnav');
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.getElementById('nav-links');

function setMenu(open) {
    navLinks.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', open);
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}

menuBtn.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenu(false);
});

function updateNav() {
    topnav.classList.toggle('scrolled', window.scrollY > 8);
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();


// ---------- Scroll reveal ----------
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


// ---------- Lightbox ----------
const lightbox = document.getElementById('lightbox');

if (lightbox) {
    const lightboxImg = lightbox.querySelector('img');

    document.querySelectorAll('[data-image]').forEach(trigger => {
        trigger.addEventListener('click', () => {
            lightboxImg.src = trigger.dataset.image;
            lightboxImg.alt = trigger.getAttribute('aria-label') || '';
            lightbox.showModal();
        });
    });

    lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) lightbox.close();
    });
}


// ---------- Background: slow wave lines ----------
const canvas = document.getElementById('waves');
const ctx = canvas.getContext('2d');
const LINES = 9;
let width = 0;
let height = 0;
let running = true;

function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function draw(time) {
    const t = reduceMotion ? 0 : time / 1000;
    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 1;

    for (let i = 0; i < LINES; i++) {
        const baseY = height * (0.18 + i * 0.075);
        const amp = 18 + i * 3;
        const highlight = i === 3 || i === 6;

        ctx.strokeStyle = highlight ? 'rgba(255, 143, 90, 0.22)' : 'rgba(255, 255, 255, 0.055)';
        ctx.beginPath();

        for (let x = 0; x <= width + 10; x += 10) {
            const y = baseY
                + Math.sin(x * 0.0026 + t * 0.35 + i * 0.6) * amp
                + Math.sin(x * 0.0058 - t * 0.22 + i * 1.3) * amp * 0.45;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();
    }

    if (running && !reduceMotion) requestAnimationFrame(draw);
}

resize();
requestAnimationFrame(draw);

window.addEventListener('resize', () => {
    resize();
    if (reduceMotion) draw(0);
});

// Pause while the tab is hidden
document.addEventListener('visibilitychange', () => {
    const wasRunning = running;
    running = !document.hidden;
    if (running && !wasRunning && !reduceMotion) requestAnimationFrame(draw);
});
