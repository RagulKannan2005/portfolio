import ThemeManager from './ThemeManager.js';
import CursorController from './CursorController.js';
import NavigationController from './NavigationController.js';
import CommandPalette from './CommandPalette.js';
import DeveloperCore from './DeveloperCore.js';
import TechnologyGalaxy from './TechnologyGalaxy.js';
import ProjectsController from './Projects.js';
import ArchitectureLab from './ArchitectureLab.js';
import MiscSections from './MiscSections.js';
import { portfolioData } from './config.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    const themeManager = new ThemeManager();
    const cursorController = new CursorController();
    const navigationController = new NavigationController();
    const commandPalette = new CommandPalette(themeManager);
    const developerCore = new DeveloperCore();
    const techGalaxy = new TechnologyGalaxy();
    const projects = new ProjectsController();
    const lab = new ArchitectureLab();
    const misc = new MiscSections();

    // Initialize Animated Counters (About Section)
    initCounters();

    // Initialize Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.section-container, .project-card, .skill-3d-card, .timeline-node, .about-grid, .contact-grid');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    revealElements.forEach(el => {
        el.classList.add('reveal-on-scroll');
        revealObserver.observe(el);
    });

    // Boot Sequence - Remove page loader
    const loader = document.getElementById('page-loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }, 1200); 
    }
});

function initCounters() {
    const container = document.getElementById('animated-counters');
    if (!container) return;

    let html = '';
    portfolioData.stats.forEach(stat => {
        html += `
            <div class="stat-card">
                <h3 class="stat-value" data-target="${stat.value}">0</h3>
                <span class="stat-suffix">${stat.suffix}</span>
                <p class="stat-label">${stat.label}</p>
            </div>
        `;
    });
    container.innerHTML = html;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.stat-value');
                counters.forEach(counter => {
                    const updateCount = () => {
                        const target = +counter.getAttribute('data-target');
                        const count = +counter.innerText;
                        const inc = target / 50; 
                        if (count < target) {
                            counter.innerText = Math.ceil(count + inc);
                            setTimeout(updateCount, 20);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCount();
                });
                observer.unobserve(entry.target);
            }
        });
    });
    
    observer.observe(container);
}
