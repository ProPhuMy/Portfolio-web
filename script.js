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
        'pothole-app': {
            title: '🚗 AI-Powered Pothole Detection and Mapping App',
            overview: 'A cross-platform mobile application that detects and maps potholes in real-time, helping drivers navigate safer routes and alerting authorities to road damage.',
            description: `This innovative mobile application combines computer vision and mapping technology to create a comprehensive pothole detection and navigation system. Using a YOLO-based deep learning model trained on extensive datasets, the app identifies road damage in real-time through the device's camera. The system integrates with OpenStreetMap to provide route optimization, allowing drivers to avoid hazardous areas while simultaneously building a crowdsourced database of road conditions. Firebase backend ensures real-time synchronization across all users, creating a collaborative approach to road safety.`,
            features: [
                'Real-time pothole detection using YOLO deep learning model with ~80% accuracy',
                'Cross-platform mobile app built with React Native for iOS and Android',
                'OpenStreetMap API integration for route visualization and navigation',
                'Shortest-path algorithms to optimize routes and avoid detected potholes',
                'Real-time hazard alerts notifying drivers of upcoming road damage',
                'Firebase Firestore database for real-time data synchronization',
                'Cloud Storage integration for storing detection images and metadata',
                'Cloud Functions for serverless backend processing and data aggregation',
                'Crowdsourced reporting system improving detection accuracy over time',
                'Dashboard for authorities to view and prioritize road maintenance'
            ],
            techStack: ['React Native', 'Flask', 'YOLO', 'Python', 'Firebase', 'Firestore', 'Cloud Storage', 'Cloud Functions', 'OpenStreetMap API', 'Machine Learning', 'Computer Vision'],
            challenges: `The primary challenge was achieving reliable pothole detection across varying lighting conditions, camera angles, and road types. I addressed this by fine-tuning the YOLO model on a diverse dataset combining online repositories and locally collected data, incorporating data augmentation techniques to improve model robustness. Another significant challenge was optimizing real-time processing on mobile devices with limited computational resources, which required implementing efficient model compression and asynchronous processing pipelines. Integrating the shortest-path algorithm with real-time hazard data also required careful optimization to ensure responsive navigation updates without excessive battery drain.`,
            impact: 'Currently in active development with pilot testing planned for local communities. The app has the potential to significantly reduce vehicle damage from potholes and help municipalities prioritize road maintenance efforts based on real-world data.',
            images: [
                {
                    path: 'images/projects/pothole-detection/potholes.png',
                    alt: 'Pothole Detection Interface',
                    caption: 'Real-time pothole detection'
                },
                {
                    path: 'images/projects/pothole-detection/map.png',
                    alt: 'Route Mapping System',
                    caption: 'Interactive map showing detected potholes and optimized routes'
                }
            ]
        },
        'ai-weather-iot': {
            title: '🌡️ AI Weather Forecasting & IoT Control System',
            overview: 'Application of Artificial Intelligence and IoT in Weather Forecasting and Device Control - A smart system integrating AI and IoT to predict weather patterns and automate home devices.',
            description: `This comprehensive smart system integrates artificial intelligence with IoT sensor networks to revolutionize environmental monitoring and home automation. The system continuously collects and analyzes environmental data including temperature, humidity, and air pressure through multiple sensors to generate accurate weather predictions. Beyond monitoring, the platform features an LCD-based interface for real-time data visualization and implements sophisticated device automation to improve energy efficiency and reduce manual operation. The data transmission platform enables remote analysis and automated decision-making, creating a seamless integration between environmental sensing, AI-powered forecasting, and practical home automation applications.`,
            features: [
                'Real-time environmental data collection (temperature, humidity, air pressure)',
                'AI and machine learning models for weather prediction and pattern analysis',
                'LCD-based interface for live environmental readings and forecasts',
                'Data transmission platform for remote analysis and monitoring',
                'Automated decision-making based on environmental conditions',
                'Device automation for garage doors, window blinds, and irrigation systems',
                'Energy efficiency optimization reducing power consumption',
                'Embedded systems integration for reliable sensor data collection',
                'Remote control capabilities for connected smart home devices',
                'Predictive algorithms for environmental management and sustainable living'
            ],
            techStack: ['Python', 'Machine Learning', 'TensorFlow', 'Arduino', 'ESP32', 'IoT Sensors', 'Embedded Systems', 'LCD Display', 'Data Analysis'],
            challenges: `The primary challenge was ensuring reliable data transmission between multiple sensors and the central processing unit across various environmental conditions while maintaining real-time responsiveness. I implemented robust error handling and data validation protocols to maintain system integrity. Another significant challenge was developing accurate weather prediction models with limited historical data, which I addressed by incorporating multiple environmental parameters and fine-tuning machine learning algorithms. Coordinating automated device control with weather predictions required careful calibration to balance energy efficiency with user comfort and safety.`,
            impact: 'Successfully demonstrated the practical application of AI and IoT in environmental management and smart home automation. The system enhances sustainable living through improved energy efficiency, reduces manual device operation by over 90%, and provides accurate local weather forecasting for automated decision-making.',
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
            overview: 'Application of machine learning in predicting forest fire risk based on weather data - A research project achieving 97.5% accuracy in fire occurrence prediction.',
            description: `This research project focuses on developing and optimizing advanced machine learning models to predict forest fire risks based on comprehensive weather data analysis. Using the Algerian Forest Fires dataset from UCI Machine Learning Repository, I developed and fine-tuned Random Forest and XGBoost models that analyze multiple environmental factors to provide accurate fire occurrence predictions and Fire Weather Index (FWI) regression. The project applies extensive data science techniques including Pandas and NumPy for data processing, along with comprehensive exploratory data analysis (EDA) to isolate key weather factors that influence fire likelihood. The research culminates in a full-stack Flask-based web application deployed on Heroku, providing real-time risk forecasting and interactive data visualization to support prevention and emergency response efforts.`,
            features: [
                'Random Forest and XGBoost models achieving 97.5% accuracy in fire occurrence prediction',
                'Fire Weather Index (FWI) regression with 0.98 R² score',
                'Comprehensive data processing using Pandas and NumPy',
                'Extensive Exploratory Data Analysis (EDA) to identify key weather factors',
                'Multi-variable environmental analysis (temperature, humidity, wind speed, etc.)',
                'Full-stack Flask web application for real-time risk forecasting',
                'Interactive data visualization and trend analysis dashboard',
                'Heroku cloud deployment for accessible remote access',
                'Historical fire data integration for improved prediction accuracy',
                'Real-time weather data processing and risk assessment',
                'User-friendly interface for inputting weather parameters and viewing predictions'
            ],
            techStack: ['Python', 'Random Forest', 'XGBoost', 'Scikit-learn', 'Pandas', 'NumPy', 'Flask', 'Heroku', 'Matplotlib', 'Seaborn', 'Machine Learning', 'Data Science', 'EDA'],
            challenges: `The most significant challenge was obtaining and processing comprehensive training data from the Algerian Forest Fires dataset that accurately represented diverse geographical and climatic conditions. I addressed this through extensive data preprocessing and exploratory data analysis to understand data patterns and relationships. Another major challenge was optimizing model performance - balancing the Random Forest and XGBoost algorithms to achieve both high accuracy (97.5%) in classification and excellent R² score (0.98) in regression tasks. This required extensive hyperparameter tuning, cross-validation techniques, and careful feature engineering to isolate the most influential weather factors. Additionally, deploying a responsive Flask application on Heroku while maintaining real-time prediction capabilities required optimization of model loading and inference times.`,
            impact: 'Achieved exceptional results with 97.5% accuracy in predicting fire occurrence and 0.98 R² score for Fire Weather Index regression. The deployed web application provides accessible, real-time forest fire risk assessment tools that can significantly improve prevention strategies and emergency response coordination. The research demonstrates the practical application of machine learning in environmental protection and disaster prevention.',
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
                        <img src="${image.path}" alt="${image.alt}" class="gallery-image">
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
                <img src="${imagePath}" alt="${imageAlt}" class="fullsize-image">
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
