/**
 * script.js
 * Typewriter effect, click burst, scroll reveals, click counter.
 */
(function () {

    // ── Typewriter ──
    const phrases = [
        "Welcome to the beginning of everything.",
        "Where every great program starts.",
        "The universal greeting.",
        "Your first line of code, forever."
    ];
    const typewriterEl = document.querySelector('.typewriter');
    let phraseIndex = 0, charIndex = 0, isDeleting = false, delay = 120;

    function typewriter() {
        const current = phrases[phraseIndex];

        if (!isDeleting && charIndex <= current.length) {
            typewriterEl.textContent = current.slice(0, charIndex++);
            delay = 80;
        } else {
            isDeleting = true;
            typewriterEl.textContent = current.slice(0, charIndex--);
            delay = 45;
        }

        if (charIndex < 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            charIndex = 0;
            delay = 1200; // pause before next phrase
        }

        setTimeout(typewriter, delay);
    }
    setTimeout(typewriter, 600);

    // ── Click Burst ──
    const burstColors = ['#a78bfa', '#60a5fa', '#f472b6', '#fbbf24', '#34d399'];
    let clickCount = 0;
    const counterEl = document.getElementById('clickCount');

    document.addEventListener('click', (e) => {
        clickCount++;
        counterEl.textContent = clickCount;

        // Bump animation
        counterEl.classList.remove('bump');
        void counterEl.offsetWidth; // force reflow
        counterEl.classList.add('bump');
        setTimeout(() => counterEl.classList.remove('bump'), 150);

        // Spawn burst particles
        const count = 12 + Math.floor(Math.random() * 8);
        for (let i = 0; i < count; i++) {
            const el = document.createElement('div');
            el.classList.add('burst-particle');

            const angle = (Math.PI * 2 / count) * i;
            const speed = 40 + Math.random() * 80;
            const dx = Math.cos(angle) * speed;
            const dy = Math.sin(angle) * speed;

            el.style.left = e.clientX - 4 + 'px';
            el.style.top = e.clientY - 4 + 'px';
            el.style.background = burstColors[Math.floor(Math.random() * burstColors.length)];
            el.style.setProperty('--dx', dx + 'px');
            el.style.setProperty('--dy', dy + 'px');
            el.style.width = (4 + Math.random() * 6) + 'px';
            el.style.height = el.style.width;

            document.body.appendChild(el);
            el.addEventListener('animationend', () => el.remove());
        }
    });

    // ── Scroll Reveal ──
    const revealEls = document.querySelectorAll('.reveal, .card');

    function checkReveal() {
        revealEls.forEach((el, i) => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85) {
                // Stagger cards slightly
                const delay = el.classList.contains('card') ? i * 120 : 0;
                setTimeout(() => el.classList.add('visible'), delay);
            }
        });
    }

    window.addEventListener('scroll', checkReveal);
    checkReveal(); // initial check

})();
