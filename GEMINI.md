# GEMINI.md

## Project Overview

This project is a minimalist, single-page portfolio website for a Senior UX Designer. It is designed to showcase their work and design philosophy.

The key technologies used are:
*   **HTML5:** For the structure and content of the website.
*   **CSS3:** For styling, with a focus on a light theme, responsive design, and accessibility.
*   **Vanilla JavaScript:** For interactive elements, including a language switcher (German/English) and scroll-based animations.

The website is a static site, consisting of a main HTML file (`index.html`), a subpage (`now-playing.html`), stylesheets, and JavaScript files. It uses a local `playlist.json` file as a simple data layer for the "Now Playing" feature. It has no external dependencies or frameworks, and it is highly optimized for performance and accessibility, as documented in the extensive comments within the HTML files.

## Building and Running

This is a static website with no build process. To run the project, simply open the `index.html` file in a web browser.

## Development Conventions

The codebase follows several conventions:

*   **HTML:** The HTML is well-structured and semantic, using tags like `<main>`, `<section>`, and `<article>` appropriately. There is a strong emphasis on accessibility (WCAG 2.1 AA/AAA), with detailed ARIA implementation, keyboard navigation support, and screen reader optimization.
*   **CSS:** The CSS is organized and uses custom properties (variables) for colors, typography, and spacing. It follows a mobile-first approach and includes detailed comments on performance, accessibility, and responsive design considerations. A minimalist, typography-driven style is prioritized for side projects like the "Now Playing" page.
*   **JavaScript:** The JavaScript code is vanilla, modular, and unobtrusive. It handles the language switching functionality, scroll animations, and dynamic data fetching (e.g., retrieving tracks from `playlist.json`). It also respects user preferences for reduced motion.
*   **Data Handling:** Lightweight features, such as the "Now Playing" tracklist, rely on static JSON files (`playlist.json`) fetched dynamically without needing a backend server.
*   **Internationalization (i18n):** The website supports both German and English. Text content is stored in `data-de` and `data-en` attributes within the HTML elements, and the `script.js` file handles the language switching.
*   **Assets:** All assets (images) are located in the `assets/` directory.

## Antigravity Workflows

This project utilizes custom AI workflows to maintain content efficiently without manual coding:
*   **`/add-song`**: Automates ingesting Spotify track links. The workflow extracts the artist and title metadata from the Spotify URL and prepends it to the `playlist.json` file. It's stored in `.agents/workflows/add-song.md`.
