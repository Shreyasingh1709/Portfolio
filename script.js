// Make project cards clickable to open GitHub link
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.project-gallery .service-card').forEach(card => {
        const github = card.getAttribute('data-github');
        if (github) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', function (e) {
                // Prevent link click from firing twice
                if (e.target.tagName === 'A' || e.target.closest('a')) return;
                window.open(github, '_blank');
            });
        }
    });
});
// Dynamically update active class on nav links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
});
// script.js

document.addEventListener('DOMContentLoaded', function () {

    // ── THEME TOGGLE ──────────────────────────────────────────────
    const themeToggle = document.getElementById('theme-toggle');

    function setTheme(theme) {
        if (theme === 'bright') {
            document.body.classList.add('theme-bright');
            themeToggle.textContent = '🌙';
        } else {
            document.body.classList.remove('theme-bright');
            themeToggle.textContent = '☀️';
        }
        localStorage.setItem('theme', theme);
    }

    let savedTheme = localStorage.getItem('theme');
    if (!savedTheme) {
        savedTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'bright' : 'dark';
    }
    setTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            setTheme(document.body.classList.contains('theme-bright') ? 'dark' : 'bright');
        });
    }

    // ── SMOOTH SCROLL + ACTIVE NAV LINK ON CLICK ─────────────────
    const navLinks = document.querySelectorAll('.navbar .nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').replace('#', '');
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ── ACTIVE NAV LINK ON SCROLL (Intersection Observer) ────────
    const sections = document.querySelectorAll('section[id]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.toggle(
                        'active',
                        link.getAttribute('href') === '#' + entry.target.id
                    );
                });
            }
        });
    }, {
        rootMargin: '-40% 0px -55% 0px',  // triggers when section is near vertical center
        threshold: 0
    });

    sections.forEach(sec => observer.observe(sec));

    // ── GLITTER BACKGROUND ────────────────────────────────────────
    const glitterBg = document.getElementById('glitter-bg');

    function randomBetween(a, b) {
        return Math.random() * (b - a) + a;
    }

    function createGlitter() {
        const glitter = document.createElement('div');
        glitter.className = 'glitter';
        glitter.style.left = `${randomBetween(0, window.innerWidth)}px`;
        glitter.style.top  = `${randomBetween(0, window.innerHeight)}px`;
        glitter.style.animationDuration = `${randomBetween(2, 4)}s`;
        glitterBg.appendChild(glitter);
        setTimeout(() => glitter.remove(), 4000);
    }

    for (let i = 0; i < 300; i++) {
        setTimeout(createGlitter, i * 10);
    }

    setInterval(() => {
        for (let i = 0; i < 12; i++) createGlitter();
    }, 300);

    // ── CALL BUTTON ───────────────────────────────────────────────
    const callBtn = document.getElementById('call-btn');
    if (callBtn) {
        callBtn.addEventListener('click', function () {
            const phoneNumber = '+917991151247';
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            if (isMobile) {
                window.location.href = `tel:${phoneNumber}`;
            } else {
                alert(`Please call: ${phoneNumber}`);
            }
        });
    }

});
