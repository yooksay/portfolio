# GEMINI.md

## Project Overview

This project is a minimalist, single-page portfolio website for a Senior UX Designer. It is designed to showcase their work and design philosophy.

The key technologies used are:
*   **HTML5:** For the structure and content of the website.
*   **CSS3:** For styling, with a focus on a light theme, responsive design, and accessibility.
*   **Vanilla JavaScript:** For interactive elements, including a language switcher (German/English) and scroll-based animations.

The website is a static site, consisting of a single HTML file, a stylesheet, and a JavaScript file. It has no external dependencies or frameworks, and it is highly optimized for performance and accessibility, as documented in the extensive comments within the `index.html` file.

## Building and Running

This is a static website with no build process. To run the project, simply open the `index.html` file in a web browser.

## Development Conventions

The codebase follows several conventions:

*   **HTML:** The HTML is well-structured and semantic, using tags like `<main>`, `<section>`, and `<article>` appropriately. There is a strong emphasis on accessibility (WCAG 2.1 AA/AAA), with detailed ARIA implementation, keyboard navigation support, and screen reader optimization.
*   **CSS:** The CSS is organized and uses custom properties (variables) for colors, typography, and spacing. It follows a mobile-first approach and includes detailed comments on performance, accessibility, and responsive design considerations.
*   **JavaScript:** The JavaScript code is vanilla, modular, and unobtrusive. It handles the language switching functionality and scroll animations. It also respects user preferences for reduced motion.
*   **Internationalization (i18n):** The website supports both German and English. Text content is stored in `data-de` and `data-en` attributes within the HTML elements, and the `script.js` file handles the language switching.
*   **Assets:** All assets (images) are located in the `assets/` directory.
