export const portfolioData = {
    stats: [
        { id: 'projects', label: 'Projects Built', value: 7, suffix: '+' },
        { id: 'backend', label: 'Backend Modules', value: 10, suffix: '+' },
        { id: 'tech', label: 'Technologies', value: 7, suffix: '' },
        { id: 'certs', label: 'Certifications', value: 2, suffix: '' }
    ],
    skills: {
        languages: [
            { name: 'Java', level: 90 },
            { name: 'JavaScript', level: 85 },
            { name: 'SQL', level: 85 },
            { name: 'C / C++', level: 70 }
        ],
        backend: [
            { name: 'Spring Boot', level: 90 },
            { name: 'Spring Security', level: 85 },
            { name: 'REST APIs', level: 90 },
            { name: 'JWT', level: 85 },
            { name: 'JPA / Hibernate', level: 80 }
        ],
        frontend: [
            { name: 'Angular', level: 80 },
            { name: 'HTML5', level: 90 },
            { name: 'CSS3', level: 85 }
        ],
        database: [
            { name: 'MySQL', level: 85 },
            { name: 'PostgreSQL', level: 75 }
        ],
        devops: [
            { name: 'Docker', level: 70 },
            { name: 'Vercel / Git', level: 80 }
        ]
    },
    projects: [
        {
            id: 'inventory-system',
            name: 'Inventory Management System',
            problem: 'Manual inventory tracking led to stockouts and lack of visibility in the purchase order workflow.',
            solution: 'Developed a full-stack, role-based system to automate PO workflows and track stock movements in real-time.',
            stack: ['Java', 'Spring Boot', 'Angular', 'MySQL', 'JWT', 'Hibernate'],
            features: [
                'Role-Based Access Control (Admin, Manager, Staff, Supplier)',
                'Purchase Order Workflow (ORDERED → ACCEPTED → SHIPPED → RECEIVED)',
                'Real-time stock movement tracking'
            ],
            architectureLayers: [
                { layer: 'Frontend', text: 'Angular SPA' },
                { layer: 'Security', text: 'Spring Security / JWT' },
                { layer: 'Backend', text: 'Spring Boot REST API' },
                { layer: 'Database', text: 'MySQL / Hibernate JPA' }
            ],
            github: 'https://github.com/RagulKannan2005/IMS',
            demo: '#'
        },
        {
            id: 'bloodlink',
            name: 'BloodLink',
            problem: 'Connecting blood donors with recipients during emergencies is often chaotic and unorganized.',
            solution: 'A centralized blood donation and management platform ensuring real-time matching and availability tracking.',
            stack: ['Java', 'Spring Boot', 'Angular', 'MySQL'],
            features: [
                'Donor registration and recipient request matching',
                'Real-time blood availability dashboard',
                'Secure user authentication'
            ],
            architectureLayers: [
                { layer: 'Frontend', text: 'Angular Components' },
                { layer: 'Backend', text: 'Spring Boot Services' },
                { layer: 'Database', text: 'MySQL Storage' }
            ],
            github: 'https://github.com/[Add GitHub URL]',
            demo: '#'
        },
        {
            id: 'crm-module',
            name: 'CRM Import Module (TechPuram)',
            problem: 'Client data onboarding was a tedious, manual data entry process.',
            solution: 'Contributed to a full-stack import module capable of parsing and mapping external data sources seamlessly into the CRM.',
            stack: ['Java', 'Spring Boot', 'JavaScript', 'HTML/CSS'],
            features: [
                'Data parsing and validation',
                'Frontend-to-backend API integration',
                'Error handling and mapping workflows'
            ],
            architectureLayers: [
                { layer: 'UI', text: 'HTML/JS Form' },
                { layer: 'API', text: 'REST Endpoints' },
                { layer: 'Core', text: 'Business Logic' }
            ],
            github: '#',
            demo: '#'
        },
        {
            id: 'project-management',
            name: 'Multi-Tenant Project SaaS',
            problem: 'Need for isolated tenant environments in a shared SaaS platform.',
            solution: 'Schema-per-tenant architecture ensuring absolute data isolation across different organizational accounts.',
            stack: ['Node.js', 'Express', 'PostgreSQL', 'React', 'JWT'],
            features: [
                'Dynamic schema resolution per tenant',
                'Activity logging and time tracking',
                'Role-based permissions'
            ],
            architectureLayers: [
                { layer: 'Frontend', text: 'React SPA' },
                { layer: 'Auth', text: 'JWT Tenant ID' },
                { layer: 'Backend', text: 'Express API' },
                { layer: 'Database', text: 'PostgreSQL Dynamic Schemas' }
            ],
            github: 'https://github.com/RagulKannan2005/saas-on-Aws',
            demo: '#'
        }
    ],
    architectures: [
        {
            id: 'jwt-auth',
            title: 'JWT Authentication Flow',
            caption: 'Stateless, secure API authentication using Spring Security filters.',
            codeLink: 'https://github.com/[Add GitHub URL]/SecurityConfig.java',
            steps: [
                { title: 'Login Request', desc: 'Client sends credentials to /api/auth/login.', elementId: 'jwt-step-1' },
                { title: 'Auth Manager', desc: 'AuthenticationManager uses UserDetailsService to verify credentials against the database.', elementId: 'jwt-step-2' },
                { title: 'JWT Generation', desc: 'If valid, a signed JWT is generated and returned to the client.', elementId: 'jwt-step-3' },
                { title: 'Protected Request', desc: 'Client attaches JWT in Authorization header for subsequent requests.', elementId: 'jwt-step-4' },
                { title: 'JWT Filter', desc: 'Spring Security OncePerRequestFilter validates the token and sets the SecurityContext.', elementId: 'jwt-step-5' }
            ]
        },
        {
            id: 'po-workflow',
            title: 'Purchase Order Workflow',
            caption: 'State machine for inventory replenishment and stock tracking.',
            codeLink: 'https://github.com/[Add GitHub URL]/PurchaseOrderService.java',
            steps: [
                { title: 'Manager Creates PO', desc: 'Status set to ORDERED. Sent to supplier.', elementId: 'po-step-1' },
                { title: 'Supplier Accepts', desc: 'Supplier reviews and accepts. Status: ACCEPTED.', elementId: 'po-step-2' },
                { title: 'Supplier Ships', desc: 'Goods dispatched. Status: SHIPPED.', elementId: 'po-step-3' },
                { title: 'Inventory Receives', desc: 'Warehouse scans and receives goods. Status: RECEIVED.', elementId: 'po-step-4' },
                { title: 'Stock Updated', desc: 'System automatically creates a StockMovement record and increments product quantity.', elementId: 'po-step-5' }
            ]
        }
    ],
    journey: [
        {
            role: 'Backend Developer',
            company: 'TechPuram',
            period: 'Feb 2025 - Jun 2025',
            details: 'Engineered scalable Spring Boot microservices, implemented role-based JWT auth, and optimized database queries.'
        },
        {
            role: 'Junior Full Stack as a intern',
            company: 'Zenjade automation Pvt Ltd',
            period: 'Oct 2024 - Feb 2025',
            details: 'Developed custom web applications using Angular and Node.js for local businesses.'
        }
    ],
    payload: {
        "education": {
            "degree": "B.Tech in Computer Science",
            "institution": "Sethu Institute of Technology, Virudhunagar",
            "graduated": "2022"
        },
        "certifications": [
            "Advanced Master Program in Next-Gen AI Integrated Java Full stack Web Development",
            "Advanced Master Program in DevOPS"
        ],
        "status": "Ready for new deployments (Open to Work)"
    }
};
