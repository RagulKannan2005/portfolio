/**
 * SoundEngine.js
 * Synthesizes UI sound effects using Web Audio API (zero external assets).
 * Provides click, hover, command palette chime, terminal keystroke, and mascot chirp SFX.
 */

export default class SoundEngine {
    constructor() {
        this.ctx = null;
        this.isMuted = localStorage.getItem('sound_enabled') !== 'true'; // muted by default until user turns it on
        this.initUI();
    }

    initContext() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                this.ctx = new AudioCtx();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    initUI() {
        // Find or wait for sound toggle button in DOM
        const toggleBtn = document.getElementById('sound-toggle-btn');
        if (toggleBtn) {
            this.updateToggleButton(toggleBtn);
            toggleBtn.addEventListener('click', () => {
                this.toggleSound();
                this.updateToggleButton(toggleBtn);
            });
        }
    }

    toggleSound() {
        this.initContext();
        this.isMuted = !this.isMuted;
        localStorage.setItem('sound_enabled', (!this.isMuted).toString());
        if (!this.isMuted) {
            this.playChime();
        }
        const toggleBtn = document.getElementById('sound-toggle-btn');
        if (toggleBtn) {
            this.updateToggleButton(toggleBtn);
        }
        return !this.isMuted;
    }

    updateToggleButton(btn) {
        if (!btn) return;
        if (this.isMuted) {
            btn.classList.remove('sound-on');
            btn.classList.add('sound-off');
            btn.setAttribute('aria-label', 'Sound FX: Muted. Click to enable audio.');
            btn.innerHTML = `<span class="sound-icon">🔇</span> <span class="sound-text">SFX: OFF</span>`;
        } else {
            btn.classList.remove('sound-off');
            btn.classList.add('sound-on');
            btn.setAttribute('aria-label', 'Sound FX: Enabled. Click to mute audio.');
            btn.innerHTML = `
                <span class="sound-icon sound-wave-anim">
                    <span class="bar bar-1"></span>
                    <span class="bar bar-2"></span>
                    <span class="bar bar-3"></span>
                </span>
                <span class="sound-text">SFX: ON</span>
            `;
        }
    }

    // Play subtle soft click pulse
    playClick() {
        if (this.isMuted) return;
        this.initContext();
        if (!this.ctx) return;

        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(420, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(180, this.ctx.currentTime + 0.05);

            gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start();
            osc.stop(this.ctx.currentTime + 0.05);
        } catch (e) {
            // Audio context error fallback
        }
    }

    // Play soft high-frequency hover blip
    playHover() {
        if (this.isMuted) return;
        this.initContext();
        if (!this.ctx) return;

        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.03);

            gain.gain.setValueAtTime(0.025, this.ctx.currentTime); // Very quiet & non-intrusive
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start();
            osc.stop(this.ctx.currentTime + 0.03);
        } catch (e) {
            // Audio context error fallback
        }
    }

    // Play harmonic power-up chime (for Ctrl+K command palette, modal opens, theme toggle)
    playChime() {
        if (this.isMuted) return;
        this.initContext();
        if (!this.ctx) return;

        try {
            const now = this.ctx.currentTime;
            const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 chord
            freqs.forEach((freq, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();

                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, now + idx * 0.04);

                gain.gain.setValueAtTime(0, now + idx * 0.04);
                gain.gain.linearRampToValueAtTime(0.06, now + idx * 0.04 + 0.01);
                gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.25);

                osc.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start(now + idx * 0.04);
                osc.stop(now + idx * 0.04 + 0.25);
            });
        } catch (e) {
            // Audio context error fallback
        }
    }

    // Terminal keystroke click sound
    playKeystroke() {
        if (this.isMuted) return;
        this.initContext();
        if (!this.ctx) return;

        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'square';
            osc.frequency.setValueAtTime(250 + Math.random() * 80, this.ctx.currentTime);

            gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.02);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start();
            osc.stop(this.ctx.currentTime + 0.02);
        } catch (e) {
            // Audio context error fallback
        }
    }

    // Play cute robotic voice chirp for Byte Mascot
    playMascotChirp() {
        if (this.isMuted) return;
        this.initContext();
        if (!this.ctx) return;

        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(600, now);
            osc.frequency.exponentialRampToValueAtTime(1400, now + 0.06);
            osc.frequency.exponentialRampToValueAtTime(900, now + 0.12);

            gain.gain.setValueAtTime(0.07, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.14);
        } catch (e) {
            // Audio context error fallback
        }
    }
}
