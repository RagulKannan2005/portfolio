/**
 * TechMascot.js
 * Interactive Cyber Mascot / AI Assistant ("Byte") widget.
 * Features vector SVG character, mouse-following pupil gaze, expressive states, speech dialog bubbles, and audio feedback.
 */

export default class TechMascot {
    constructor(soundEngine) {
        this.soundEngine = soundEngine;
        this.container = null;
        this.speechBubble = null;
        this.currentTipIndex = 0;
        this.tips = [
            "👋 Hi! I'm <strong>Byte</strong>, Ragul's Cyber Companion!",
            "⚡ Ragul built a live CRM Import Module using Spring Boot & Angular at TechPuram!",
            "💡 Pro-Tip: Press <kbd>Ctrl</kbd> + <kbd>K</kbd> to launch the Command Palette!",
            "☕ Specializing in Java, Spring Security, REST APIs & Angular Single Page Apps.",
            "🚀 Check out the Architecture Lab section for system design simulations!",
            "🔊 Click the Sound button in the header to toggle retro cyber SFX!"
        ];

        this.init();
    }

    init() {
        this.createMarkup();
        this.setupEyeTracking();
        this.setupInteractions();
    }

    createMarkup() {
        let wrapper = document.getElementById('tech-mascot-container');
        if (!wrapper) {
            wrapper = document.createElement('div');
            wrapper.id = 'tech-mascot-container';
            wrapper.className = 'tech-mascot-container';
            document.body.appendChild(wrapper);
        }

        wrapper.innerHTML = `
            <div class="mascot-speech-bubble" id="mascot-speech-bubble" aria-live="polite">
                <span class="mascot-message">${this.tips[0]}</span>
                <button class="mascot-bubble-next" aria-label="Next tip">❯</button>
            </div>
            
            <button class="mascot-avatar-btn" id="mascot-avatar-btn" aria-label="Interact with Byte, Ragul's AI Mascot">
                <div class="mascot-orbit-ring"></div>
                <svg class="mascot-svg" viewBox="0 0 100 100" width="60" height="60">
                    <!-- Outer Bot Head -->
                    <rect x="15" y="20" width="70" height="60" rx="18" fill="var(--color-surface-elevated, #131b2e)" stroke="var(--color-accent-primary, #00f0ff)" stroke-width="3" />
                    <!-- Antenna -->
                    <line x1="50" y1="20" x2="50" y2="8" stroke="var(--color-accent-primary, #00f0ff)" stroke-width="3" stroke-linecap="round" />
                    <circle cx="50" cy="6" r="4" fill="var(--color-accent-primary, #00f0ff)" class="mascot-antenna-bulb" />
                    <!-- Screen Face -->
                    <rect x="23" y="30" width="54" height="40" rx="10" fill="#080c14" stroke="rgba(0, 240, 255, 0.3)" stroke-width="1.5" />
                    <!-- Left Eye Socket & Pupil -->
                    <circle cx="38" cy="48" r="8" fill="rgba(0, 240, 255, 0.15)" />
                    <circle class="mascot-pupil mascot-pupil-left" cx="38" cy="48" r="4" fill="var(--color-accent-primary, #00f0ff)" />
                    <!-- Right Eye Socket & Pupil -->
                    <circle cx="62" cy="48" r="8" fill="rgba(0, 240, 255, 0.15)" />
                    <circle class="mascot-pupil mascot-pupil-right" cx="62" cy="48" r="4" fill="var(--color-accent-primary, #00f0ff)" />
                    <!-- Smile/Mouth -->
                    <path class="mascot-mouth" d="M 42 62 Q 50 67 58 62" stroke="var(--color-accent-primary, #00f0ff)" stroke-width="2.5" stroke-linecap="round" fill="none" />
                </svg>
                <span class="mascot-status-dot"></span>
            </button>
        `;

        this.container = wrapper;
        this.speechBubble = wrapper.querySelector('#mascot-speech-bubble');
    }

    setupEyeTracking() {
        const pupilLeft = this.container.querySelector('.mascot-pupil-left');
        const pupilRight = this.container.querySelector('.mascot-pupil-right');
        const btn = this.container.querySelector('#mascot-avatar-btn');

        if (!pupilLeft || !pupilRight || !btn) return;

        document.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const mascotX = rect.left + rect.width / 2;
            const mascotY = rect.top + rect.height / 2;

            const dx = e.clientX - mascotX;
            const dy = e.clientY - mascotY;
            const dist = Math.hypot(dx, dy);

            // Limit pupil movement offset to max 3px
            const maxOffset = 3.5;
            const offsetX = dist > 0 ? (dx / dist) * Math.min(dist / 20, maxOffset) : 0;
            const offsetY = dist > 0 ? (dy / dist) * Math.min(dist / 20, maxOffset) : 0;

            pupilLeft.setAttribute('transform', `translate(${offsetX}, ${offsetY})`);
            pupilRight.setAttribute('transform', `translate(${offsetX}, ${offsetY})`);
        });
    }

    setupInteractions() {
        const avatarBtn = this.container.querySelector('#mascot-avatar-btn');
        const nextBtn = this.container.querySelector('.mascot-bubble-next');

        if (avatarBtn) {
            avatarBtn.addEventListener('click', () => {
                this.triggerNextTip();
                this.bounceAnimation();
                if (this.soundEngine) {
                    this.soundEngine.playMascotChirp();
                }
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.triggerNextTip();
                if (this.soundEngine) {
                    this.soundEngine.playClick();
                }
            });
        }

        // Show bubble initially, fade after 8 seconds
        setTimeout(() => {
            if (this.speechBubble) {
                this.speechBubble.classList.add('visible');
            }
        }, 1500);
    }

    triggerNextTip() {
        this.currentTipIndex = (this.currentTipIndex + 1) % this.tips.length;
        const msgEl = this.speechBubble.querySelector('.mascot-message');
        if (msgEl) {
            msgEl.style.opacity = '0';
            setTimeout(() => {
                msgEl.innerHTML = this.tips[this.currentTipIndex];
                msgEl.style.opacity = '1';
            }, 150);
        }
        this.speechBubble.classList.add('visible');
    }

    bounceAnimation() {
        const avatar = this.container.querySelector('#mascot-avatar-btn');
        if (avatar) {
            avatar.classList.add('mascot-bounce');
            setTimeout(() => avatar.classList.remove('mascot-bounce'), 500);
        }
    }

    speak(text) {
        if (this.speechBubble) {
            const msgEl = this.speechBubble.querySelector('.mascot-message');
            if (msgEl) {
                msgEl.innerHTML = text;
            }
            this.speechBubble.classList.add('visible');
            this.bounceAnimation();
            if (this.soundEngine) {
                this.soundEngine.playMascotChirp();
            }
        }
    }
}
