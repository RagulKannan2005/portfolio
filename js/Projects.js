import { portfolioData } from './config.js';

export default class ProjectsController {
    constructor() {
        this.grid = document.getElementById('projects-grid');
        this.filterBar = document.querySelector('.project-filters');
        if (!this.grid || !portfolioData.projects) return;
        
        this.projects = portfolioData.projects;
        this.activeFilter = 'All';
        this.init();
    }

    init() {
        this.renderFilters();
        this.renderProjects();
        this.setupInteractions();
    }

    renderFilters() {
        if (!this.filterBar) return;
        const allStacks = this.projects.flatMap(p => p.stack);
        const uniqueStacks = ['All', ...new Set(allStacks)];
        
        this.filterBar.innerHTML = uniqueStacks.map(stack => `
            <button class="filter-btn ${stack === 'All' ? 'active' : ''}" data-filter="${stack}">
                ${stack}
            </button>
        `).join('');

        this.filterBar.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                this.activeFilter = e.target.dataset.filter;
                this.filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.renderProjects();
            }
        });
    }

    renderProjects() {
        const filtered = this.activeFilter === 'All' 
            ? this.projects 
            : this.projects.filter(p => p.stack.includes(this.activeFilter));

        this.grid.innerHTML = filtered.map(p => `
            <div class="project-card" tabindex="0">
                <div class="project-card-inner">
                    <div class="project-front">
                        <h3 class="project-title">${p.name}</h3>
                        <p class="project-problem">${p.problem}</p>
                        <div class="project-stack">
                            ${p.stack.map(s => `<span class="chip">${s}</span>`).join('')}
                        </div>
                    </div>
                    <div class="project-exploded">
                        ${p.architectureLayers.map((layer, idx) => `
                            <div class="arch-layer" style="--layer-index: ${idx};">
                                <span class="layer-name">${layer.layer}</span>
                                <span class="layer-text">${layer.text}</span>
                            </div>
                        `).join('')}
                        <div class="arch-layer project-details" style="--layer-index: ${p.architectureLayers.length};">
                            <strong>Solution:</strong> ${p.solution}
                            <ul class="feature-list">
                                ${p.features.map(f => `<li>${f}</li>`).join('')}
                            </ul>
                            <div class="project-links">
                                ${p.github !== '#' ? `<a href="${p.github}" target="_blank" class="btn btn-outline" tabindex="-1">GitHub</a>` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    setupInteractions() {
        // Exploded view CSS handles hover interactions natively,
        // adding touch-to-expand logic for mobile users.
        this.grid.addEventListener('click', (e) => {
            const card = e.target.closest('.project-card');
            if (card && window.matchMedia('(max-width: 1024px)').matches) {
                // Toggle expansion
                const isExpanded = card.classList.contains('expanded');
                this.grid.querySelectorAll('.project-card').forEach(c => c.classList.remove('expanded'));
                if (!isExpanded) {
                    card.classList.add('expanded');
                }
            }
        });
    }
}
