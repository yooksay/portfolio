// Portfolio Website JavaScript
// Senior UX Designer - Interactive Elements
//
// Performance Notes:
// - Total size: ~4KB (unminified), ~2KB (minified)
// - No external dependencies
// - Efficient Intersection Observer for animations
// - LocalStorage for language persistence
//
// Production: Minify with terser or similar
// Command: npx terser script.js -o script.min.js -c -m

// ===================================
// LANGUAGE SWITCHER
// ===================================

function initLanguageSwitcher() {
  const langButtons = document.querySelectorAll('.lang-btn');
  const htmlElement = document.documentElement;

  // Get saved language preference or default to German
  let currentLang = localStorage.getItem('preferredLanguage') || 'de';

  // Set initial language
  setLanguage(currentLang);

  // Add click listeners to language buttons
  langButtons.forEach(button => {
    button.addEventListener('click', () => {
      const newLang = button.getAttribute('data-lang');
      if (newLang !== currentLang) {
        currentLang = newLang;
        setLanguage(newLang);
        localStorage.setItem('preferredLanguage', newLang);
      }
    });
  });

  function setLanguage(lang) {
    // Update HTML lang attribute
    htmlElement.setAttribute('lang', lang);

    // Update active button state
    langButtons.forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });

    // Update all translatable elements
    const translatableElements = document.querySelectorAll('[data-de], [data-en]');

    translatableElements.forEach(element => {
      const translation = element.getAttribute(`data-${lang}`);

      if (translation) {
        // Add fade effect
        element.style.opacity = '0';

        setTimeout(() => {
          // Check if element contains HTML (like the tagline with gradient spans)
          if (element.querySelector('.highlight')) {
            // Skip parent elements that contain .highlight children
            // Their children will be updated individually
            return;
          }

          // Update element content
          element.textContent = translation;
          element.style.opacity = '1';
        }, 100);
      }
    });
  }
}

// ===================================
// SMOOTH SCROLL & INTERSECTION OBSERVER
// ===================================

// Smooth scroll behavior (already handled by CSS, this is fallback)
function initSmoothScroll() {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));

      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Fade-in animations on scroll using Intersection Observer
function initScrollAnimations() {
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    return; // Skip animations if user prefers reduced motion
  }

  // Add fade-in class to elements we want to animate
  const animatedElements = document.querySelectorAll('.experience-entry, #philosophy, #contact');

  // Add initial state
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  // Create Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Observe all animated elements
  animatedElements.forEach(el => observer.observe(el));
}

// ===================================
// INITIALIZE ALL FEATURES
// ===================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initLanguageSwitcher();
  initSmoothScroll();
  initScrollAnimations();
});
