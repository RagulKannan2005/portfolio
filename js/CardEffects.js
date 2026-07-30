/**
 * CardEffects.js
 * Implements 3D perspective tilt on hover, cursor-tracking radial spotlight glow, glitch text, and audio event listeners.
 */

export default class CardEffects {
    constructor(soundEngine) {
        this.soundEngine = soundEngine;
        this.init();
    }

    init() {
        this.init3DTilt();
        this.initSpotlightGlow();
        this.initAudioListeners();
        this.initGlitchTitles();
    }

    init3DTilt() {
        const tiltCards = document.querySelectorAll('.project-card, .lab-card, .stat-card, .skill-3d-card');
        
        tiltCards.forEach(card => {
            card.classList.add('tilt-card-active');

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -8; // Max 8 deg rotation
                const rotateY = ((x - centerX) / centerX) * 8;

                card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            });
        });
    }

    initSpotlightGlow() {
        const spotlightElements = document.querySelectorAll('.project-card, .lab-card, .stat-card, .btn, .main-nav');
        
        spotlightElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                el.style.setProperty('--spotlight-x', `${x}px`);
                el.style.setProperty('--spotlight-y', `${y}px`);
            });
        });
    }

    initAudioListeners() {
        if (!this.soundEngine) return;

        // Hover audio feedback for buttons, links, project cards & nav items
        const hoverTargets = document.querySelectorAll('a, button, .project-card, .lab-card, .core-node, .filter-btn, .timeline-node');
        hoverTargets.forEach(target => {
            target.addEventListener('mouseenter', () => {
                this.soundEngine.playHover();
            });

            target.addEventListener('click', () => {
                this.soundEngine.playClick();
            });
        });

        // Footer Terminal keystroke SFX
        const termInput = document.getElementById('terminal-input');
        if (termInput) {
            termInput.addEventListener('keydown', () => {
                this.soundEngine.playKeystroke();
            });
        }
    }

    initGlitchTitles() {
        const titles = document.querySelectorAll('.section-title, .hero-section .name');
        titles.forEach(title => {
            title.addEventListener('mouseenter', () => {
                title.classList.add('cyber-glitch-active');
                setTimeout(() => title.classList.remove('cyber-glitch-active'), 600);
            });
        });
    }
}
