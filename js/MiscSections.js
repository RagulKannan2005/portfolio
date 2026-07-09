import { portfolioData } from './config.js';

export default class MiscSections {
    constructor() {
        this.journeyContainer = document.querySelector('.journey-scroll-container');
        this.certsContainer = document.getElementById('certifications-grid');
        this.contactForm = document.getElementById('contact-form');
        this.yearElement = document.getElementById('current-year');
        this.terminalInput = document.getElementById('terminal-input');
        this.terminalOutput = document.getElementById('terminal-output');
        
        this.init();
    }
    
    init() {
        if (this.journeyContainer && portfolioData.journey) {
            this.renderJourney();
        }
        if (this.certsContainer && portfolioData.payload) {
            this.renderPayload();
        }
        if (this.contactForm) {
            this.setupContactForm();
        }
        if (this.yearElement) {
            this.yearElement.innerText = new Date().getFullYear();
        }
        if (this.terminalInput) {
            this.setupFooterTerminal();
        }
    }
    
    renderJourney() {
        let html = '<div class="timeline-track">';
        portfolioData.journey.forEach(job => {
            html += `
                <div class="timeline-node" tabindex="0">
                    <div class="node-marker"></div>
                    <div class="node-content">
                        <div class="role">${job.role}</div>
                        <div class="company">${job.company} | ${job.period}</div>
                        <div class="details"><p>${job.details}</p></div>
                    </div>
                </div>
            `;
        });
        html += '</div>';
        this.journeyContainer.innerHTML = html;
    }
    
    renderPayload() {
        const jsonStr = JSON.stringify(portfolioData.payload, null, 4);
        const formatted = jsonStr
            .replace(/"([^"]+)":/g, '<span class="json-key">"$1"</span>:')
            .replace(/: "([^"]+)"/g, ': <span class="json-string">"$1"</span>')
            .replace(/: (\[|{)/g, ': <span class="json-bracket">$1</span>')
            .replace(/(]|})/g, '<span class="json-bracket">$1</span>');
            
        this.certsContainer.innerHTML = `
            <div class="json-payload-container">
                <div class="window-header">
                    <span class="dot red"></span>
                    <span class="dot yellow"></span>
                    <span class="dot green"></span>
                    <span class="window-title">profile.json</span>
                </div>
                <pre class="json-code"><code>{
${formatted.substring(2)}</code></pre>
            </div>
        `;
    }
    
    setupContactForm() {
        this.contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = this.contactForm.querySelector('.form-submit');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<span class="loader-terminal cursor-blink">_</span> POSTing...';
            btn.disabled = true;
            
            const formData = new FormData(this.contactForm);
            const data = Object.fromEntries(formData.entries());
            
            // Real network request to FormSubmit (requires zero backend)
            fetch('https://formsubmit.co/ajax/rahul2005kannan@gmail.com', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                btn.innerHTML = '200 OK - Message Sent';
                btn.classList.add('btn-success');
                
                setTimeout(() => {
                    this.contactForm.reset();
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    btn.classList.remove('btn-success');
                }, 4000);
            })
            .catch(error => {
                btn.innerHTML = '500 ERROR - Failed';
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                }, 4000);
            });
        });
    }

    setupFooterTerminal() {
        this.terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const val = this.terminalInput.value.trim().toLowerCase();
                this.terminalInput.value = '';
                if (!val) return;
                
                let response = '';
                switch(val) {
                    case 'whoami': response = 'guest_user'; break;
                    case 'ls': response = 'projects/  skills/  contact.sh  resume.pdf'; break;
                    case 'cat resume.pdf': response = 'Error: Cannot read binary file to terminal. Please request via contact form.'; break;
                    case 'clear': this.terminalOutput.innerHTML = ''; return;
                    case 'help': response = 'Available commands: whoami, ls, cat [file], clear, help'; break;
                    default: response = `Command not found: ${val}. Type 'help' for available commands.`;
                }
                
                this.terminalOutput.innerHTML += `<div><span style="color:var(--color-text-muted)">guest@rk-portfolio:~$ ${val}</span><br>${response}</div>`;
                this.terminalOutput.scrollTop = this.terminalOutput.scrollHeight;
            }
        });
    }
}
