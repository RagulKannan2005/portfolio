export default class DeveloperCore {
    constructor() {
        this.container = document.querySelector('.developer-core-container');
        if (!this.container) return;

        this.nodes = [
            { id: 'java', label: 'Java', info: 'Core backend logic & architecture. Used in Inventory System.', related: ['springboot', 'mysql'] },
            { id: 'springboot', label: 'Spring Boot', info: 'REST APIs & Microservices framework.', related: ['java', 'mysql'] },
            { id: 'angular', label: 'Angular', info: 'Dynamic SPA frontend interfaces.', related: ['java', 'springboot'] },
            { id: 'mysql', label: 'MySQL / SQL', info: 'Relational database management.', related: ['java', 'springboot'] },
            { id: 'docker', label: 'Docker', info: 'Containerization & deployment.', related: ['springboot'] },
            { id: 'git', label: 'Git / GitHub', info: 'Version control & collaboration.', related: [] }
        ];

        this.pointerX = 0;
        this.pointerY = 0;
        
        this.init();
    }

    init() {
        this.render();
        this.scene = this.container.querySelector('.core-scene');
        this.orbitGroup = this.container.querySelector('.core-orbit');
        
        // Setup mouse tracking for perspective shift
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth) - 0.5;
            const y = (e.clientY / window.innerHeight) - 0.5;
            this.pointerX = x * 20; // max rotation degrees
            this.pointerY = y * -20;
            
            if (this.scene && !this.orbitGroup.classList.contains('paused')) {
                this.scene.style.transform = `rotateX(${this.pointerY}deg) rotateY(${this.pointerX}deg)`;
            }
        });

        // Setup hover/focus events
        const nodeEls = this.container.querySelectorAll('.core-node');
        nodeEls.forEach(node => {
            node.addEventListener('mouseenter', () => this.handleNodeFocus(node));
            node.addEventListener('focus', () => this.handleNodeFocus(node));
            node.addEventListener('mouseleave', () => this.handleNodeBlur());
            node.addEventListener('blur', () => this.handleNodeBlur());
        });
        
        // Hide hint on first interaction
        const hint = this.container.querySelector('.core-hint');
        if (hint) {
            this.container.addEventListener('mouseenter', () => hint.style.opacity = '0', { once: true });
        }
    }

    render() {
        let html = `
            <div class="core-hint">? Hover a node</div>
            <div class="core-scene">
                <div class="core-orbit">
                    <div class="core-center-sphere"></div>
        `;
        
        const angleStep = 360 / this.nodes.length;
        
        this.nodes.forEach((node, i) => {
            const angle = i * angleStep;
            html += `
                <button class="core-node" data-id="${node.id}" tabindex="0"
                        style="--angle: ${angle}deg;"
                        aria-label="Technology: ${node.label}">
                    <div class="node-counter-rotate">
                        <div class="node-content">${node.label}</div>
                        <div class="node-panel">
                            <strong>${node.label}</strong>
                            <p>${node.info}</p>
                        </div>
                    </div>
                </button>
            `;
        });

        html += `
                </div>
            </div>
        `;
        
        this.container.innerHTML = html;
    }

    handleNodeFocus(focusedNode) {
        this.orbitGroup.classList.add('paused');
        this.scene.style.transform = `rotateX(0deg) rotateY(0deg)`; // Reset perspective to clearly see the focused node
        
        const id = focusedNode.dataset.id;
        const nodeData = this.nodes.find(n => n.id === id);
        
        this.container.querySelectorAll('.core-node').forEach(node => {
            if (node === focusedNode) {
                node.classList.add('active');
            } else if (nodeData.related.includes(node.dataset.id)) {
                node.classList.add('related');
            } else {
                node.classList.add('dimmed');
            }
        });
    }

    handleNodeBlur() {
        this.orbitGroup.classList.remove('paused');
        
        this.container.querySelectorAll('.core-node').forEach(node => {
            node.classList.remove('active', 'related', 'dimmed');
        });
        
        // Restore mouse perspective immediately
        if (this.scene) {
            this.scene.style.transform = `rotateX(${this.pointerY}deg) rotateY(${this.pointerX}deg)`;
        }
    }
}
