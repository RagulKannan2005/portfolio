# Ragul Kannan - Developer Portfolio

A highly interactive, production-quality personal developer portfolio built with HTML5, CSS3, and Vanilla JavaScript.

## Features
- **"Systems Blueprint" Design System**: Engineering-inspired dark/light modes.
- **Interactive Architecture Lab**: Steppable diagrams of core systems.
- **Technology Galaxy & Developer Core**: 3D interactive hubs for skills.
- **Zero Frameworks**: Built entirely with Vanilla JS and CSS for maximum performance.

## How to Run Locally

Since this project uses ES6 Modules (`type="module"` in the `<script>` tag), you must serve the files via a local HTTP server. Opening `index.html` directly via `file://` will result in CORS errors.

### Using VS Code
1. Install the **Live Server** extension.
2. Right-click on `index.html` and select **"Open with Live Server"**.

### Using Node.js / npx
If you have Node.js installed, open a terminal in this directory and run:
```bash
npx serve .
```

### Using Python
```bash
python -m http.server 8000
```

## Content Management

All dynamic content (projects, stats, skills, timeline, certifications) is stored centrally to allow easy updates without touching the UI code. 
- Open `js/config.js` (will be created in a later phase) to update any text or statistics.

## Deployment
This project can be deployed easily to any static hosting provider (Vercel, Netlify, GitHub Pages) by linking the repository. No build step is required.
