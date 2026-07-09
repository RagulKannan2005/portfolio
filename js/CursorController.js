export default class CursorController {
    constructor() {
        this.cursor = document.getElementById('custom-cursor');
        this.isFinePointer = window.matchMedia('(pointer: fine)').matches;
        
        if (this.cursor && this.isFinePointer) {
            this.init();
        } else if (this.cursor) {
            this.cursor.style.display = 'none';
        }
    }

    init() {
        document.body.classList.add('custom-cursor-active');
        
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        }, { passive: true });

        // Event delegation for hover effects
        document.addEventListener('mouseover', (e) => {
            const interactive = e.target.closest('a, button, input, textarea, .timeline-node, [tabindex="0"]');
            if (interactive) {
                this.cursor.classList.add('cursor-hover');
            }
        });

        document.addEventListener('mouseout', (e) => {
            const interactive = e.target.closest('a, button, input, textarea, .timeline-node, [tabindex="0"]');
            if (interactive) {
                this.cursor.classList.remove('cursor-hover');
            }
        });
    }
}
