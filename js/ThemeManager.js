export default class ThemeManager {
    constructor() {
        this.themeToggleBtn = document.querySelector('.theme-toggle');
        this.currentTheme = localStorage.getItem('theme') || 
            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        
        if (this.themeToggleBtn) {
            this.themeToggleBtn.addEventListener('click', () => this.toggleTheme());
        }

        // Listen for OS theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', this.currentTheme);
        this.applyTheme(this.currentTheme);
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        // update icon based on theme
        if (this.themeToggleBtn) {
            const iconPlaceholder = this.themeToggleBtn.querySelector('.theme-icon-placeholder');
            if (iconPlaceholder) {
                // Using simple emojis for now, can be replaced with SVGs
                iconPlaceholder.textContent = theme === 'dark' ? '🌙' : '☀️';
            }
        }
    }
}
