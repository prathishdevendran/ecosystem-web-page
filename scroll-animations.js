/* scroll-animations.js — shared across all pages */

/* ── 1. SCROLL PROGRESS BAR ────────────── */
(function() {
  const bar = document.createElement('div');
  bar.id = 'scroll-progress';
  document.body.prepend(bar);

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (max > 0 ? (scrolled / max) * 100 : 0) + '%';
  }, { passive: true });
})();

/* ── 2. NAV SCROLL STYLE ───────────────── */
(function() {
  const nav = document.querySelector('.nav-bar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
})();

/* ── 3. INTERSECTION OBSERVER REVEALS ──── */
(function() {
  const selectors = '.reveal, .reveal-left, .reveal-right, .reveal-scale';
  const els = document.querySelectorAll(selectors);
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => io.observe(el));
})();

/* ── 4. PARALLAX ON HERO BG ────────────── */
(function() {
  const bg = document.querySelector('.hero-bg, .parallax-bg');
  if (!bg) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    bg.style.transform = `scale(1.06) translateY(${y * 0.3}px)`;
  }, { passive: true });
})();

/* ── 5. COUNTER ANIMATION ──────────────── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1200;
  const start = performance.now();
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString() + (el.dataset.suffix || '');
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

(function() {
  const counters = document.querySelectorAll('[data-target]');
  if (!counters.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => io.observe(c));
})();

/* ── 6. HORIZONTAL SCROLL INDICATOR ───── */
(function() {
  const scroller = document.querySelector('.cont-box, .gallery-scroll');
  const dots = document.querySelectorAll('.scroll-dot');
  if (!scroller || !dots.length) return;

  scroller.addEventListener('scroll', () => {
    const index = Math.round(scroller.scrollLeft / scroller.clientWidth);
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
  }, { passive: true });
})();
