import { portfolioData } from './config.js';

export default class TechnologyGalaxy {
    constructor() {
        this.container = document.getElementById('technology-galaxy');
        if (!this.container) return;
        this.isMobile = window.matchMedia('(max-width: 768px)').matches;
        this.init();
    }

    init() {
        if (this.isMobile) {
            this.renderSwipeableCards();
        } else {
            this.renderGalaxy();
        }
        
        window.addEventListener('resize', () => {
            const mobileNow = window.matchMedia('(max-width: 768px)').matches;
            if (mobileNow !== this.isMobile) {
                this.isMobile = mobileNow;
                this.isMobile ? this.renderSwipeableCards() : this.renderGalaxy();
            }
        });
    }

    renderGalaxy() {
        let html = '<div class="galaxy-orbit-system">';
        
        const categories = Object.keys(portfolioData.skills);
        const ringSpacing = 110;
        
        categories.forEach((cat, index) => {
            const radius = 120 + (index * ringSpacing);
            const skills = portfolioData.skills[cat];
            const angleStep = 360 / skills.length;
            
            html += `<div class="galaxy-ring" style="width: ${radius*2}px; height: ${radius*2}px; animation-duration: ${40 + index * 10}s; animation-direction: ${index % 2 === 0 ? 'normal' : 'reverse'}">`;
            
            skills.forEach((skill, i) => {
                const angle = i * angleStep;
                const size = 20 + (skill.level - 70) * 1.5; // Scale size based on proficiency level
                
                html += `
                    <div class="galaxy-node cat-${cat}" 
                         style="--angle: ${angle}deg; --radius: ${radius}px; width: ${size}px; height: ${size}px;"
                         data-name="${skill.name}" tabindex="0">
                         <div class="galaxy-node-counter">
                             <div class="galaxy-panel">
                                 <strong>${skill.name}</strong>
                                 <span>${cat.toUpperCase()}</span>
                             </div>
                         </div>
                    </div>
                `;
            });
            html += `</div>`;
        });
        
        html += '</div>';
        this.container.innerHTML = html;
        this.setupGalaxyInteractions();
    }

    renderSwipeableCards() {
        let html = '<div class="constellation-cards">';
        const categories = Object.keys(portfolioData.skills);
        
        categories.forEach(cat => {
            html += `<div class="constellation-card cat-card-${cat}">
                        <h3>${cat.toUpperCase()}</h3>
                        <div class="constellation-chips">`;
            portfolioData.skills[cat].forEach(skill => {
                html += `<span class="chip">${skill.name}</span>`;
            });
            html += `</div></div>`;
        });
        
        html += '</div>';
        this.container.innerHTML = html;
    }

    setupGalaxyInteractions() {
        // Accessibility and hover states managed in CSS, but can add sounds or cursor snaps here
    }
}
