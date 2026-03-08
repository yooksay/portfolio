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

  let currentLang = 'de';
  try {
    currentLang = localStorage.getItem('preferredLanguage') || 'de';
  } catch (e) {
    console.warn("localStorage not available, defaulting to 'de'");
  }

  // Set initial language
  setLanguage(currentLang);

  // Add click listeners to language buttons
  langButtons.forEach(button => {
    button.addEventListener('click', () => {
      const newLang = button.getAttribute('data-lang');
      if (newLang !== currentLang) {
        currentLang = newLang;
        setLanguage(newLang);
        try {
          localStorage.setItem('preferredLanguage', newLang);
        } catch (e) {
          console.warn("Could not save language preference");
        }
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
// NOW PLAYING FEATURE
// ===================================
function initNowPlaying() {
    const feedContainer = document.getElementById('playlist-feed');
    if (!feedContainer) return; // Only run on the Now Playing page

    fetch('playlist.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            renderTracks(data.tracks);
        })
        .catch(error => {
            console.error('Error fetching playlist:', error);
            feedContainer.innerHTML = `<div class="loading-state">Failed to load playlist.</div>`;
        });

    function renderTracks(tracks) {
        if (!tracks || tracks.length === 0) {
            feedContainer.innerHTML = `<div class="loading-state">No tracks added yet.</div>`;
            return;
        }

        feedContainer.innerHTML = ''; // Clear loading state

        tracks.forEach((track, index) => {
            const trackEl = document.createElement('div');
            trackEl.className = 'track-item';
            trackEl.setAttribute('role', 'listitem');

            const albumName = track.album ? escapeHtml(track.album) : '';
            const urlLink = track.url || '#';

            trackEl.innerHTML = `
                <div class="track-status">
                    <span>${index + 1}</span>
                </div>
                <div class="track-info">
                    <div class="track-artist">${escapeHtml(track.artist)}</div>
                    <div class="track-title">${escapeHtml(track.title)}</div>
                </div>
                <div class="track-meta" aria-label="Album: ${albumName}">${albumName}</div>
                <div class="track-date">${track.addedAt ? formatRelativeDate(track.addedAt) : ''}</div>
                <a href="${urlLink}" target="_blank" rel="noopener noreferrer" class="track-link" aria-label="Listen on Spotify">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.84.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.02.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                    </svg>
                </a>
            `;
            feedContainer.appendChild(trackEl);
        });
    }

    function escapeHtml(unsafe) {
        if (!unsafe) return "";
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function formatRelativeDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays}d ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;

        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
}

// ===================================
// INITIALIZE ALL FEATURES
// ===================================

function initAll() {
    initLanguageSwitcher();
    initSmoothScroll();
    initScrollAnimations();
    initNowPlaying();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
} else {
    initAll();
}
