export default class NavigationController {
    constructor() {
        this.nav = document.getElementById('main-nav');
        this.mobileToggle = document.querySelector('.mobile-menu-toggle');
        this.navLinks = document.getElementById('nav-links');
        this.scrollBar = document.querySelector('.scroll-progress-bar');
        
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            this.handleScroll();
            this.updateScrollProgress();
        }, { passive: true });
        
        if (this.mobileToggle) {
            this.mobileToggle.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Close mobile menu on link click
        if (this.navLinks) {
            this.navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    if (this.navLinks.classList.contains('active')) {
                        this.toggleMobileMenu();
                    }
                });
            });
        }

        // Intersection Observer for active link highlighting
        const sections = document.querySelectorAll('section[id]');
        const observerOptions = {
            rootMargin: '-20% 0px -80% 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    this.updateActiveLink(id);
                }
            });
        }, observerOptions);

        sections.forEach(sec => observer.observe(sec));
    }

    handleScroll() {
        if (!this.nav) return;
        if (window.scrollY > 50) {
            this.nav.classList.add('nav-scrolled');
        } else {
            this.nav.classList.remove('nav-scrolled');
        }
    }

    updateScrollProgress() {
        if (!this.scrollBar) return;
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        this.scrollBar.style.width = scrolled + '%';
    }

    toggleMobileMenu() {
        const isExpanded = this.mobileToggle.getAttribute('aria-expanded') === 'true';
        this.mobileToggle.setAttribute('aria-expanded', !isExpanded);
        this.navLinks.classList.toggle('active');
        this.mobileToggle.classList.toggle('active');
    }

    updateActiveLink(id) {
        if (!this.navLinks) return;
        const links = this.navLinks.querySelectorAll('ul a');
        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
            }
        });
    }
}
