// Navigation functionality with sliding animation
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');
    const logoLink = document.querySelector('.logo-link');

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
    let lastFocusedElement = null;

    // Project data
    const projectData = {
        'ai-weather-iot': {
            title: '🌡️ AI Weather Forecasting & IoT Control System',
            overview: 'An intelligent environmental monitoring system that integrates artificial intelligence with IoT sensors to predict weather patterns and automate smart home devices.',
            description: `This comprehensive smart system revolutionizes environmental monitoring by combining cutting-edge AI algorithms with IoT sensor networks. The system continuously collects environmental data including temperature, humidity, and air pressure to generate accurate weather predictions while simultaneously controlling connected devices to optimize energy efficiency and user comfort.`,
            features: [
                'Real-time environmental data collection through multiple sensors',
                'Machine learning models for accurate weather prediction and pattern analysis',
                'LCD display interface showing live environmental readings and forecasts',
                'Automated device control for garage doors, window blinds, and irrigation systems',
                'Cloud-based data management platform for analysis and trends',
                'Energy optimization algorithms reducing power consumption',
                'Predictive maintenance alerts for connected devices and sensors'
            ],
            techStack: ['Python', 'TensorFlow', 'Arduino', 'ESP 32'],
            challenges: `The primary challenge was ensuring reliable data transmission between sensors and the central processing unit in various environmental conditions. I implemented robust error handling and data validation protocols to maintain system integrity.`,
            impact: 'Successfully deployed in 3 test homes with 85% weather prediction accuracy, 30% reduction in energy consumption, and automated 95% of routine device operations.',
            liveDemo: 'https://drive.google.com/file/d/1CsslgJ0qS7vsoAQza_9M0nQQ-4UAYvfw/view?usp=drive_link',
            github: '#',
            images: [
                {
                    path: 'images/projects/ai-weather-iot/setup.jpg',
                    alt: 'AI Weather IoT System Overview',
                    caption: 'Complete system setup showing sensors, display, and connected devices'
                },
                {
                    path: 'images/projects/ai-weather-iot/ui.png',
                    alt: 'Weather Dashboard Interface',
                    caption: 'Real-time weather data dashboard.'
                }
            ]
        },
        'forest-fire-ai': {
            title: '🔥 Forest Fire Prediction AI Model',
            overview: 'Advanced machine learning system designed to predict forest fire probability using environmental data analysis, supporting prevention and emergency response efforts.',
            description: `This research project focuses on developing a sophisticated AI model that analyzes multiple environmental factors to predict forest fire risks with high accuracy. By processing data from temperature sensors, humidity monitors, wind speed measurements,and vegetation indices, the system provides early warning capabilities that can significantly improve forest fire prevention and response strategies.`,
            features: [
                'Multi-variable environmental data analysis including temperature, humidity, and wind patterns, etc',
                'Historical fire data integration for improved prediction accuracy',
                'Risk assessment mapping with geographical visualization capabilities',
                'Real-time data processing from weather stations and environmental sensors',
                'Integration with existing emergency response systems and protocols',
                'Seasonal risk modeling accounting for climate change effects'
            ],
            techStack: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Flask'],
            challenges: `The most significant challenge was obtaining comprehensive training data that accurately represented diverse geographical and climatic conditions. I addressed this by combining multiple data sources including government weather databases and historical fire records. Another challenge involved balancing model sensitivity to minimize false positives while ensuring early detection of genuine fire risks, which required extensive hyperparameter tuning and cross-validation techniques.`,
            impact: 'Achieved 97% prediction accuracy in testing phases, potential to reduce forest fire response time by 40%.',
            liveDemo: '#',
            github: '#',
            images: [
                {
                    path: 'images/projects/forest-fire-ai/main-web.png',
                    alt: 'Website UI',
                    caption: 'Website where people input indices to get the predictions.'
                },
                {
                    path: 'images/projects/forest-fire-ai/dashboard.png',
                    alt: 'Dashboard',
                    caption: 'Dashboard for data visualization and storing.'
                }
            ]
        },
        'portfolio-website': {
            title: '🌐 Personal Portfolio Website',
            overview: 'A space-themed single-page site with animated transitions and a project modal.',
            description: `This website showcases my projects, skills, and activities with a clean UI, smooth section transitions, and a modal gallery system. Built with vanilla HTML, CSS, and JavaScript.`,
            features: [
                'Sidebar navigation with animated section transitions',
                'Project details modal with image lightbox',
                'Responsive layout and touch-friendly controls',
                'Basic PWA manifest and optimized icons'
            ],
            techStack: ['HTML5', 'CSS3', 'JavaScript'],
            challenges: `Balancing visuals with performance; reduced initial animation delay and added image fallbacks.`,
            impact: 'Delivers a fast, engaging portfolio viewing experience across devices.',
            liveDemo: '#',
            github: 'https://github.com/ProPhuMy/Portfolio-web',
            images: [
                { path: 'images/projects/personal-web/homepage.png', alt: 'Site preview 1', caption: 'Homepage layout' },
                { path: 'images/projects/personal-web/project.png', alt: 'Site preview 2', caption: 'Projects modal' }
            ]
        },
        'desktop-cat': {
            title: '🐱 Desktop Cat Assistant',
            overview: 'A desktop companion app with animated cat GIFs and conversational AI integration.',
            description: `A playful Tkinter desktop overlay that uses the Gemini API to chat. The cat switches GIFs based on mood (idle, happy, thinking) and reacts to user commands (e.g., greet, tell a joke, sit on the taskbar).`,
            features: [
                'Always-on-top Tkinter window with transparent background',
                'Gemini-powered chat responses with simple memory',
                'Mood/state engine controlling GIF animations',
                'Quick commands'
            ],
            techStack: ['Python', 'Tkinter', 'Gemini API', 'GIF'],
            challenges: `Keeping animations smooth in Tkinter while handling async API calls; solved using lightweight threading/queueing and frame-timed updates.`,
            impact: 'A delightful companion that showcases creativity and UI tinkering.',
            liveDemo: '#',
            github: '#',
            fun: true,
            images: [
                { path: 'images/projects/desktop-cat/idle.png', alt: 'Idle cat', caption: 'Idle animation' },
                { path: 'images/projects/desktop-cat/box.png', alt: 'Conversations', caption: 'Chat box' }
            ]
        }
    };

    // Reusable modal opener
    function openProjectModal(projectId, trigger) {
        const project = projectData[projectId];
        if (!project) {
            console.warn('Unknown project id:', projectId);
            return;
        }
        if (trigger) lastFocusedElement = trigger;
        modalBody.innerHTML = `
            <h1>${project.title}</h1>
            ${project.fun ? '<p><span class="badge badge-fun">Just for fun</span></p>' : ''}
            <p class="project-overview"><strong>${project.overview}</strong></p>
            ${project.images && project.images.length > 0 ? `
            <h2>📸 Project Gallery</h2>
            <div class="project-gallery">
                ${project.images.map((image) => `
                    <div class="gallery-item">
                        <img src="${image.path}" alt="${image.alt}" class="gallery-image" onerror="this.onerror=null;this.src='images/placeholder.svg';">
                        <p class="image-caption">${image.caption}</p>
                    </div>
                `).join('')}
            </div>
            ` : ''}
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
        `;

        modal.style.display = 'flex';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-label', project.title);
        setTimeout(() => {
            modal.classList.add('active');
            modalClose.focus();
        }, 10);
        document.body.style.overflow = 'hidden';

        // Bind lightbox clicks
        modalBody.querySelectorAll('.gallery-image').forEach(img => {
            img.addEventListener('click', () => openImageModal(img.getAttribute('src'), img.getAttribute('alt')));
        });
    }

    // Direct button binding
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openProjectModal(this.getAttribute('data-project'), this);
        });
    });

    // Delegated binding (resilient on Pages)
    document.addEventListener('click', function(e) {
        const btn = e.target.closest('.view-details-btn');
        if (!btn) return;
        e.preventDefault();
        openProjectModal(btn.getAttribute('data-project'), btn);
    });

    // Close modal functions
    function closeModal() {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            if (lastFocusedElement) {
                lastFocusedElement.focus();
            }
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
            return;
        }
        // Focus trap
        if (modal.classList.contains('active') && e.key === 'Tab') {
            const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (!focusable.length) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                last.focus();
                e.preventDefault();
            } else if (!e.shiftKey && document.activeElement === last) {
                first.focus();
                e.preventDefault();
            }
        }
    });

    // Image modal functionality
    window.openImageModal = function(imagePath, imageAlt) {
        // Create image modal overlay
        const imageModal = document.createElement('div');
        imageModal.className = 'image-modal-overlay';
        imageModal.innerHTML = `
            <div class="image-modal-content">
                <button class="image-modal-close">&times;</button>
                <img src="${imagePath}" alt="${imageAlt}" class="fullsize-image" onerror="this.onerror=null;this.src='images/placeholder.svg';">
                <p class="fullsize-caption">${imageAlt}</p>
            </div>
        `;
        
        document.body.appendChild(imageModal);
        
        // Show image modal
        setTimeout(() => {
            imageModal.classList.add('active');
        }, 10);
        
        // Close image modal functionality
        const closeImageModal = () => {
            imageModal.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(imageModal);
            }, 300);
        };
        
        imageModal.querySelector('.image-modal-close').addEventListener('click', closeImageModal);
        imageModal.addEventListener('click', function(e) {
            if (e.target === imageModal) {
                closeImageModal();
            }
        });
    };

    // Logo navigates to Home
    if (logoLink) {
        logoLink.style.cursor = 'pointer';
        logoLink.addEventListener('click', function(e) {
            e.preventDefault();
            const homeNav = document.querySelector('.nav-item[data-section="home"]');
            if (homeNav) {
                homeNav.click();
            } else {
                sections.forEach(section => section.classList.remove('active'));
                document.getElementById('home').classList.add('active');
            }
        });
    }

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
