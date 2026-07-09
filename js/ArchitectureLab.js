import { portfolioData } from './config.js';

export default class ArchitectureLab {
    constructor() {
        this.container = document.getElementById('lab-visualizations');
        if (!this.container || !portfolioData.architectures) return;
        
        this.architectures = portfolioData.architectures;
        this.intervals = {};
        this.activeSteps = {};
        
        this.init();
    }

    init() {
        this.render();
        this.setupInteractions();
    }

    render() {
        let html = '';
        this.architectures.forEach(arch => {
            this.activeSteps[arch.id] = 0;
            
            html += `
                <div class="lab-card">
                    <div class="lab-card-header">
                        <div class="lab-title-area">
                            <h3>${arch.title}</h3>
                            <p class="lab-caption">${arch.caption}</p>
                        </div>
                        <a href="${arch.codeLink}" target="_blank" class="btn btn-outline btn-sm">View Code</a>
                    </div>
                    
                    <div class="lab-visualization">
                        <div class="lab-diagram" id="diagram-${arch.id}">
                            ${arch.steps.map((step, i) => `
                                <div class="lab-node" data-index="${i}">
                                    <div class="lab-node-circle">${i + 1}</div>
                                    <div class="lab-node-label">${step.title}</div>
                                </div>
                                ${i < arch.steps.length - 1 ? `<div class="lab-connector" data-from="${i}" data-to="${i+1}"></div>` : ''}
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="lab-controls">
                        <button class="lab-btn lab-btn-prev" data-id="${arch.id}" aria-label="Previous step">←</button>
                        <button class="lab-btn lab-btn-play" data-id="${arch.id}" aria-label="Play/Pause animation">▶</button>
                        <button class="lab-btn lab-btn-next" data-id="${arch.id}" aria-label="Next step">→</button>
                        <button class="lab-btn lab-btn-reset" data-id="${arch.id}" aria-label="Reset animation">↻</button>
                    </div>
                    
                    <div class="lab-explanation slide-up" id="explanation-${arch.id}">
                        <strong>${arch.steps[0].title}:</strong> ${arch.steps[0].desc}
                    </div>
                </div>
            `;
        });
        
        this.container.innerHTML = html;
        this.architectures.forEach(arch => this.updateStep(arch.id, 0));
    }

    setupInteractions() {
        this.container.addEventListener('click', (e) => {
            const btn = e.target.closest('.lab-btn');
            if (!btn) return;
            
            const id = btn.dataset.id;
            const arch = this.architectures.find(a => a.id === id);
            let current = this.activeSteps[id];
            
            if (btn.classList.contains('lab-btn-next')) {
                this.pause(id, btn.parentElement.querySelector('.lab-btn-play'));
                this.updateStep(id, Math.min(current + 1, arch.steps.length - 1));
            } else if (btn.classList.contains('lab-btn-prev')) {
                this.pause(id, btn.parentElement.querySelector('.lab-btn-play'));
                this.updateStep(id, Math.max(current - 1, 0));
            } else if (btn.classList.contains('lab-btn-reset')) {
                this.pause(id, btn.parentElement.querySelector('.lab-btn-play'));
                this.updateStep(id, 0);
            } else if (btn.classList.contains('lab-btn-play')) {
                this.togglePlay(id, arch, btn);
            }
        });
    }

    togglePlay(id, arch, btn) {
        if (this.intervals[id]) {
            this.pause(id, btn);
        } else {
            btn.innerHTML = '⏸';
            this.intervals[id] = setInterval(() => {
                let current = this.activeSteps[id];
                if (current >= arch.steps.length - 1) {
                    this.pause(id, btn);
                } else {
                    this.updateStep(id, current + 1);
                }
            }, 1800);
        }
    }

    pause(id, btn) {
        if (this.intervals[id]) {
            clearInterval(this.intervals[id]);
            this.intervals[id] = null;
        }
        if (btn) btn.innerHTML = '▶';
    }

    updateStep(id, stepIndex) {
        this.activeSteps[id] = stepIndex;
        const arch = this.architectures.find(a => a.id === id);
        const diagram = document.getElementById(`diagram-${id}`);
        const explanation = document.getElementById(`explanation-${id}`);
        
        diagram.querySelectorAll('.lab-node').forEach((node, i) => {
            node.classList.remove('active', 'completed');
            if (i === stepIndex) node.classList.add('active');
            else if (i < stepIndex) node.classList.add('completed');
        });
        
        diagram.querySelectorAll('.lab-connector').forEach((conn, i) => {
            conn.classList.remove('active');
            if (i < stepIndex) conn.classList.add('active');
        });
        
        const stepData = arch.steps[stepIndex];
        explanation.innerHTML = `<strong>${stepData.title}:</strong> ${stepData.desc}`;
        
        // Trigger CSS animation reflow
        explanation.classList.remove('slide-up');
        void explanation.offsetWidth;
        explanation.classList.add('slide-up');
    }
}
