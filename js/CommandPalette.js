export default class CommandPalette {
    constructor(themeManager) {
        this.palette = document.getElementById('command-palette');
        this.trigger = document.querySelector('.cmd-k-trigger');
        this.themeManager = themeManager;
        
        if (this.palette) {
            this.init();
        }
    }

    init() {
        this.render();
        
        if (this.trigger) {
            this.trigger.addEventListener('click', () => this.open());
        }

        document.addEventListener('keydown', (e) => {
            // Check for Ctrl+K or Cmd+K
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.open();
            }
            if (e.key === 'Escape' && this.palette.open) {
                this.close();
            }
        });

        this.palette.addEventListener('click', (e) => {
            // Close on clicking backdrop
            const rect = this.palette.getBoundingClientRect();
            const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
                rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
            if (!isInDialog) {
                this.close();
            }

            // Handle actions
            const actionBtn = e.target.closest('.cmd-action');
            if (actionBtn) {
                this.handleAction(actionBtn.dataset.action, actionBtn.dataset.value);
                this.close();
            }
        });
    }

    render() {
        this.palette.innerHTML = `
            <div class="cmd-palette-content">
                <div class="cmd-header">
                    <input type="text" id="cmd-search" placeholder="Search commands, projects..." aria-label="Command palette search">
                </div>
                <div class="cmd-body">
                    <div class="cmd-group">
                        <span class="cmd-group-label">Navigation</span>
                        <button class="cmd-action" data-action="navigate" data-value="#about">Go to About</button>
                        <button class="cmd-action" data-action="navigate" data-value="#projects">Go to Projects</button>
                        <button class="cmd-action" data-action="navigate" data-value="#architecture-lab">Go to Architecture Lab</button>
                    </div>
                    <div class="cmd-group">
                        <span class="cmd-group-label">Actions</span>
                        <button class="cmd-action" data-action="toggle-theme">Toggle Theme</button>
                        <button class="cmd-action" data-action="download-resume">Download Resume</button>
                    </div>
                </div>
                <div class="cmd-footer">
                    <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
                    <span><kbd>Enter</kbd> select</span>
                    <span><kbd>ESC</kbd> close</span>
                </div>
            </div>
        `;
    }

    open() {
        this.palette.showModal();
        const searchInput = document.getElementById('cmd-search');
        if (searchInput) {
            searchInput.value = '';
            searchInput.focus();
        }
    }

    close() {
        this.palette.close();
    }

    handleAction(action, value) {
        switch(action) {
            case 'navigate':
                window.location.hash = value;
                break;
            case 'toggle-theme':
                if (this.themeManager) this.themeManager.toggleTheme();
                break;
            case 'download-resume':
                window.open('assets/resume/Ragul-Kannan-Resume.pdf', '_blank');
                break;
        }
    }
}
