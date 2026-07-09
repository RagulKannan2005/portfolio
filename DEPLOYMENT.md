# Deployment Guide

This project is built using 100% Vanilla HTML, CSS, and JS. There is no build step required (no Webpack, Vite, or Node modules to compile), making deployment lightning fast and extremely reliable.

## Option 1: Vercel (Recommended)

1. Push your code to a GitHub repository.
2. Log in to [Vercel](https://vercel.com/) and click **Add New > Project**.
3. Import your GitHub repository.
4. Leave all build settings (Framework Preset, Build Command, Output Directory) at their defaults. Vercel automatically detects static HTML.
5. Click **Deploy**. Vercel will instantly host your static files and provide a blazing-fast global CDN.

## Option 2: GitHub Pages

1. Push your code to a GitHub repository.
2. Go to your repository's **Settings** tab.
3. On the left sidebar, click on **Pages**.
4. Under "Build and deployment", set the **Source** to `Deploy from a branch`.
5. Under "Branch", select `main` (or `master`) and `/ (root)` folder.
6. Click **Save**. GitHub will provide a live URL shortly (e.g., `https://username.github.io/portfolio`).

## SEO & Polish Checklist (Post-Deployment)

- **OpenGraph Image:** Create a sleek screenshot of your Hero section (1200x630px). Save it as `og-image.jpg` in a new `assets/` folder. Update the URL in `index.html` to match your live domain.
- **Favicon:** Generate a favicon (e.g. from favicon.io) and place it in the root directory. Add `<link rel="icon" href="/favicon.ico">` to the `index.html` `<head>`.
- **Custom Domain:** If you purchase `ragulkannan.dev`, configure your DNS A-records in your provider to point to Vercel or GitHub Pages for the ultimate professional finish.
- **Analytics:** Consider dropping a simple, privacy-friendly analytics script (like Plausible or Vercel Web Analytics) before the `</body>` tag to track visitor metrics without heavy cookies.
