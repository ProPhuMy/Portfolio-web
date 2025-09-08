// Navigation functionality with sliding animation
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetSectionId = this.getAttribute('data-section');
            const targetSection = document.getElementById(targetSectionId);
            
            // Don't animate if clicking the same section
            if (this.classList.contains('active')) {
                return;
            }
            
            // Find currently active section
            const currentActiveSection = document.querySelector('.content-section.active');
            
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked nav item
            this.classList.add('active');
            
            // Animate section transition
            if (currentActiveSection) {
                // Slide out current section (up)
                currentActiveSection.style.animation = 'slideOutToTop 0.3s ease-in forwards';
                
                setTimeout(() => {
                    // Hide current section
                    sections.forEach(section => section.classList.remove('active'));
                    
                    // Show and slide in new section (from bottom)
                    targetSection.classList.add('active');
                    targetSection.style.animation = 'slideInFromBottom 0.4s ease-out forwards';
                }, 300);
            } else {
                // First load - just show the section
                sections.forEach(section => section.classList.remove('active'));
                targetSection.classList.add('active');
            }
        });
    });

    // Add some interactive stars on mouse move
    document.addEventListener('mousemove', function(e) {
        if (Math.random() > 0.95) {
            createStar(e.clientX, e.clientY);
        }
    });

    // Modal functionality
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.querySelector('.modal-close');
    const viewDetailsButtons = document.querySelectorAll('.view-details-btn');

    // Project data
    const projectData = {
        'space-explorer': {
            title: '🚀 Space Explorer App',
            overview: 'A comprehensive web application that transforms how users explore and learn about celestial bodies through immersive 3D experiences and real-time astronomical data.',
            description: `The Space Explorer App is an interactive educational platform that brings the wonders of space directly to your browser. Using cutting-edge web technologies, users can journey through our solar system and beyond, exploring planets, moons, asteroids, and distant galaxies with unprecedented detail and scientific accuracy.`,
            features: [
                'Interactive 3D planet models with realistic textures and lighting effects',
                'Real-time astronomical data integration from NASA\'s public APIs',
                'Virtual space travel with smooth camera transitions and orbital mechanics',
                'Comprehensive educational content about each celestial body',
                'Mobile-responsive design with intuitive touch controls',
                'Augmented reality features for supported devices',
                'Multi-language support for global accessibility'
            ],
            techStack: ['JavaScript ES6+', 'Three.js', 'WebGL', 'NASA API', 'Node.js', 'Express.js', 'MongoDB', 'CSS3 Animations'],
            challenges: `One of the primary technical challenges was optimizing 3D rendering performance across diverse devices and browsers. I implemented a sophisticated level-of-detail (LOD) system that dynamically adjusts mesh complexity based on viewing distance and device capabilities. Another significant challenge involved handling and processing large astronomical datasets efficiently, which I addressed through intelligent caching mechanisms and progressive data loading.`,
            impact: 'Used by over 10,000 students worldwide, featured in NASA\'s educational resource directory, and adopted by 15+ schools for astronomy curriculum.',
            liveDemo: '#',
            github: '#',
            images: ['Placeholder for screenshots']
        },
        'galaxy-portfolio': {
            title: '🌌 Galaxy Portfolio',
            overview: 'A visually stunning portfolio website that showcases creative work through space-themed animations and interactive elements, setting new standards for personal branding.',
            description: `This portfolio represents the perfect fusion of artistic creativity and technical excellence. Built from the ground up with custom animations and interactive elements, it creates an immersive experience that tells a compelling professional story while maintaining optimal performance and accessibility.`,
            features: [
                'Custom CSS animations synchronized with scroll events',
                'Interactive particle system creating dynamic backgrounds',
                'Responsive design that adapts beautifully to all screen sizes',
                'Progressive Web App (PWA) capabilities for offline access',
                'Advanced loading states with custom skeletal UI',
                'SEO-optimized with structured data markup',
                'Accessibility compliance (WCAG 2.1 AA standards)'
            ],
            techStack: ['HTML5', 'CSS3', 'Vanilla JavaScript', 'GSAP', 'Intersection Observer API', 'Service Workers', 'Webpack'],
            challenges: `The main challenge was creating smooth animations that work consistently across different browsers and devices while maintaining 60fps performance. I solved this by implementing hardware acceleration through CSS transforms and using the Intersection Observer API for efficient scroll-based animations. Another challenge was ensuring the creative design didn\'t compromise accessibility, which I addressed through careful color contrast management and comprehensive keyboard navigation.`,
            impact: 'Achieved 98/100 Google Lighthouse score, resulted in 3 job offers, and has been featured in 5 design showcases.',
            liveDemo: '#',
            github: '#',
            images: ['Placeholder for screenshots']
        },
        'stellar-task': {
            title: '⭐ Stellar Task Manager',
            overview: 'A productivity application that gamifies task management through cosmic themes, helping users achieve their goals while exploring the universe of personal organization.',
            description: `Stellar Task Manager reimagines productivity by combining effective task management principles with engaging gamification elements. Users embark on cosmic journeys as they complete tasks, unlock achievements, and build productive habits in an environment that makes work feel like exploration.`,
            features: [
                'Gamified task completion with cosmic themes and rewards',
                'Advanced progress tracking with visual analytics',
                'Team collaboration features for shared projects',
                'AI-powered task prioritization and scheduling suggestions',
                'Cross-platform synchronization (web, mobile, desktop)',
                'Customizable productivity methods (Pomodoro, GTD, etc.)',
                'Integration with popular tools (Google Calendar, Slack, Trello)'
            ],
            techStack: ['React', 'Redux Toolkit', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'JWT', 'Material-UI', 'Chart.js'],
            challenges: `Building real-time collaboration features while maintaining data consistency across multiple users was complex. I implemented optimistic updates with conflict resolution strategies and used Socket.io for real-time synchronization. Another challenge was designing an AI system for task prioritization that actually helped users without being intrusive, which required extensive user testing and machine learning model fine-tuning.`,
            impact: '5,000+ active users, 4.8/5 app store rating, and 40% improvement in user productivity metrics.',
            liveDemo: '#',
            github: '#',
            images: ['Placeholder for screenshots']
        },
        'intern-software': {
            title: '🏢 Software Engineering Intern',
            overview: 'Full-stack development internship focused on building scalable web applications and learning industry best practices in a fast-paced tech environment.',
            description: `During my software engineering internship, I worked on a cross-functional team developing customer-facing web applications. This experience provided hands-on exposure to enterprise-level software development, agile methodologies, and collaborative coding practices used in the industry.`,
            features: [
                'Developed responsive web components using React and modern JavaScript',
                'Built RESTful APIs with Node.js and Express framework',
                'Implemented database optimization strategies for PostgreSQL',
                'Participated in code reviews and maintained high coding standards',
                'Collaborated with UX/UI designers to implement pixel-perfect interfaces',
                'Wrote comprehensive unit tests achieving 90%+ code coverage',
                'Deployed applications using AWS services and Docker containers'
            ],
            techStack: ['React', 'Node.js', 'Express.js', 'PostgreSQL', 'AWS', 'Docker', 'Jest', 'Git', 'Jira'],
            challenges: `The main challenge was adapting to a large existing codebase with complex business logic and multiple integrations. I overcame this by systematically studying the architecture documentation, setting up comprehensive debugging environments, and working closely with senior developers. Another challenge was optimizing database queries for large datasets, which I solved by implementing proper indexing strategies and query optimization techniques.`,
            impact: 'Delivered 3 major features used by 50,000+ users, improved application performance by 25%, and received offer for full-time position upon graduation.',
            liveDemo: '#',
            github: '#',
            images: ['Placeholder for screenshots']
        },
        'research-assistant': {
            title: '🔬 Research Assistant - NLP Lab',
            overview: 'Academic research position focused on advancing natural language processing techniques and contributing to cutting-edge machine learning research.',
            description: `As a research assistant in the university\'s Natural Language Processing lab, I contributed to groundbreaking research on improving language model efficiency and accuracy. This role involved both independent research and collaboration with graduate students and faculty on publishable research.`,
            features: [
                'Conducted literature reviews on transformer architectures and attention mechanisms',
                'Implemented and fine-tuned BERT and GPT models for specific NLP tasks',
                'Developed data preprocessing pipelines for large text corpora',
                'Created evaluation metrics and benchmarking systems for model performance',
                'Contributed to research paper writing and statistical analysis',
                'Presented findings at student research symposium and lab meetings',
                'Mentored undergraduate students in machine learning fundamentals'
            ],
            techStack: ['Python', 'TensorFlow', 'PyTorch', 'Transformers', 'Pandas', 'NumPy', 'Jupyter', 'LaTeX', 'Git'],
            challenges: `Working with large language models required significant computational resources and optimization. I learned to implement efficient training strategies, including gradient accumulation and mixed precision training. Another challenge was reproducing results from academic papers, which taught me the importance of rigorous experimental design and documentation.`,
            impact: 'Co-authored research paper accepted to undergraduate symposium, contributed to lab\'s publication pipeline, and gained deep expertise in modern NLP techniques.',
            liveDemo: '#',
            github: '#',
            images: ['Placeholder for research visualizations']
        },
        'intern-frontend': {
            title: '💻 Frontend Developer Intern',
            overview: 'Frontend-focused internship at an innovative startup, specializing in user interface development and performance optimization for web applications.',
            description: `This internship provided intensive experience in modern frontend development within a startup environment. I worked directly with the design and product teams to create intuitive user interfaces while learning to balance rapid development cycles with code quality and user experience.`,
            features: [
                'Built responsive web interfaces using Vue.js and modern CSS techniques',
                'Implemented mobile-first design principles for optimal mobile experience',
                'Collaborated with UX designers using Figma for design-to-code workflows',
                'Optimized application performance through code splitting and lazy loading',
                'Integrated with REST APIs and implemented state management solutions',
                'Conducted cross-browser testing and accessibility improvements',
                'Participated in user testing sessions and iterated based on feedback'
            ],
            techStack: ['Vue.js', 'JavaScript ES6+', 'CSS3', 'Sass', 'Webpack', 'Figma', 'Git', 'Chrome DevTools'],
            challenges: `The biggest challenge was optimizing performance for users on slower internet connections while maintaining rich interactive features. I solved this by implementing progressive loading strategies, optimizing asset delivery, and using modern web performance techniques. Working in a fast-paced startup environment also required balancing speed of development with maintainable code practices.`,
            impact: 'Reduced average page load time by 40%, implemented responsive design that increased mobile engagement by 60%, and contributed to 15% increase in user retention.',
            liveDemo: '#',
            github: '#',
            images: ['Placeholder for interface screenshots']
        }
    };

    // Open modal
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const project = projectData[projectId];
            
            if (project) {
                // Populate modal content
                modalBody.innerHTML = `
                    <h1>${project.title}</h1>
                    <p class="project-overview"><strong>${project.overview}</strong></p>
                    
                    <h2>📋 Project Description</h2>
                    <p>${project.description}</p>
                    
                    <h2>✨ Key Features</h2>
                    <ul>
                        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                    
                    <h2>🛠️ Technology Stack</h2>
                    <div class="tech-stack">
                        ${project.techStack.map(tech => `<span class="tech-item">${tech}</span>`).join('')}
                    </div>
                    
                    <h2>🎯 Challenges & Solutions</h2>
                    <p>${project.challenges}</p>
                    
                    <h2>🌟 Impact & Results</h2>
                    <p>${project.impact}</p>
                    
                    <div class="modal-links">
                        <a href="${project.liveDemo}" class="modal-link" target="_blank">🚀 Live Demo</a>
                        <a href="${project.github}" class="modal-link" target="_blank">📁 GitHub Repository</a>
                    </div>
                `;
                
                // Show modal
                modal.style.display = 'flex';
                setTimeout(() => {
                    modal.classList.add('active');
                }, 10);
                
                // Prevent body scroll
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal functions
    function closeModal() {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }

    // Close modal events
    modalClose.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    function createStar(x, y) {
        const star = document.createElement('div');
        star.style.position = 'fixed';
        star.style.left = x + 'px';
        star.style.top = y + 'px';
        star.style.width = '3px';
        star.style.height = '3px';
        star.style.background = '#9933ff';
        star.style.borderRadius = '50%';
        star.style.pointerEvents = 'none';
        star.style.animation = 'starFade 2s ease-out forwards';
        star.style.zIndex = '1000';
        
        document.body.appendChild(star);
        
        setTimeout(() => {
            if (star.parentNode) {
                star.parentNode.removeChild(star);
            }
        }, 2000);
    }
});
