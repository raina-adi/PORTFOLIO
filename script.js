// Modern Moon-Inspired Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

function initializePortfolio() {
    setupNavigation();
    setupAnimations();
    setupParticleEffects();
    setupScrollEffects();
    setupContactForm();
    setupTypingAnimation();
    setupParallaxEffects();
    setupHoverEffects();
    setupScrollToTop();
    setupLoadingAnimation();
<<<<<<< HEAD
    setupSmoothScrolling();
    setupNavbarEffects();
=======
>>>>>>> d05af0515e28988bfd2c5c16bf178971dda6e9ac
}

// Mobile Navigation Toggle
function setupNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Animate hamburger bars
            const bars = hamburger.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                if (hamburger.classList.contains('active')) {
                    bar.style.transform = index === 0 ? 'rotate(45deg) translate(5px, 5px)' :
                                        index === 1 ? 'opacity(0)' :
                                        'rotate(-45deg) translate(7px, -6px)';
                } else {
                    bar.style.transform = 'none';
                }
            });
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            console.log('Clicking link:', targetId, 'Target found:', !!target); // Debug log
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            } else {
                console.error('Target not found for:', targetId);
            }
        });
    });
}

// Navbar background change on scroll
function setupNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.8)';
                navbar.style.boxShadow = 'none';
            }
        });
    }
}

// Advanced Scroll Animations
function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation for child elements
                const children = entry.target.querySelectorAll('.skill-item, .project-card, .stat');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe all sections and animated elements
    const animatedElements = document.querySelectorAll('section, .skill-category, .project-card, .stat');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Moon Particle Effects
function setupParticleEffects() {
    const hero = document.querySelector('.hero');
    if (hero) {
        createMoonParticles(hero);
    }
}

function createMoonParticles(container) {
    const particleCount = 30;
    const moonColors = [
        'var(--moon-yellow)',
        'var(--moon-orange)', 
        'var(--moon-pink)',
        'var(--moon-purple)',
        'var(--moon-cyan)',
        'var(--moon-green)',
        'var(--moon-red)'
    ];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'moon-particle';
        const randomColor = moonColors[Math.floor(Math.random() * moonColors.length)];
        const size = 2 + Math.random() * 4;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${randomColor};
            border-radius: 50%;
            pointer-events: none;
            animation: floatMoon ${4 + Math.random() * 6}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 3}s;
            box-shadow: 0 0 ${size * 2}px ${randomColor};
        `;
        container.appendChild(particle);
    }
}

// Add moon particle animation to CSS
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes floatMoon {
        0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1); 
            opacity: 0.4;
        }
        25% { 
            transform: translateY(-15px) translateX(5px) scale(1.2); 
            opacity: 0.8;
        }
        50% { 
            transform: translateY(-25px) translateX(-5px) scale(1); 
            opacity: 1;
        }
        75% { 
            transform: translateY(-10px) translateX(10px) scale(1.1); 
            opacity: 0.6;
        }
    }
`;
document.head.appendChild(particleStyle);

// Scroll Effects
function setupScrollEffects() {
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Enhanced Contact Form
function setupContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Enhanced validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Enhanced form submission with loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Add loading animation
            submitBtn.style.background = 'linear-gradient(45deg, #64ffda, #00d4aa)';
            submitBtn.style.animation = 'pulse 1s infinite';
            
            setTimeout(() => {
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.animation = 'none';
            }, 2000);
        });
    }
}

// Enhanced Typing Animation
function setupTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 80);
    }
}

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Parallax Effects
function setupParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.profile-card, .image-placeholder');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Enhanced Hover Effects
function setupHoverEffects() {
    // Skill items hover effects
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-10px) scale(1.1) rotate(5deg)';
            item.style.boxShadow = '0 20px 40px rgba(100, 255, 218, 0.3)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1) rotate(0deg)';
            item.style.boxShadow = 'none';
        });
    });

    // Project cards hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-20px) scale(1.02)';
            card.style.boxShadow = '0 30px 60px rgba(100, 255, 218, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = 'none';
        });
    });
}

// Scroll to Top Button
function setupScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top when clicked
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Enhanced hover effects
    scrollToTopBtn.addEventListener('mouseenter', () => {
        scrollToTopBtn.style.transform = 'translateY(-5px) scale(1.1)';
        scrollToTopBtn.style.boxShadow = '0 15px 30px rgba(100, 255, 218, 0.4)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', () => {
        scrollToTopBtn.style.transform = 'translateY(0) scale(1)';
        scrollToTopBtn.style.boxShadow = '0 0 20px rgba(100, 255, 218, 0.3)';
    });
}

// Loading Animation
function setupLoadingAnimation() {
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Add loading animation styles
        const loadingStyle = document.createElement('style');
        loadingStyle.textContent = `
            body:not(.loaded) {
                overflow: hidden;
            }
            
            body:not(.loaded)::before {
                content: '';
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #0a0a0a 0%, #111111 100%);
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            body:not(.loaded)::after {
                content: 'Loading...';
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: #64ffda;
                font-size: 1.5rem;
                font-weight: 600;
                z-index: 10000;
                animation: pulse 1.5s ease-in-out infinite;
            }
        `;
        document.head.appendChild(loadingStyle);
    });
}

// Enhanced Notification System
function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Enhanced notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #64ffda, #00d4aa)' : 
                    type === 'error' ? 'linear-gradient(135deg, #ff6b6b, #ee5a52)' : 
                    'linear-gradient(135deg, #667eea, #764ba2)'};
        color: ${type === 'success' ? '#0a0a0a' : 'white'};
        padding: 1.5rem 2rem;
        border-radius: 16px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        max-width: 400px;
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 500);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 500);
        }
    }, 5000);
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Scroll-based animations and effects
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

<<<<<<< HEAD
=======
// Initialize all functions
setupSmoothScrolling();
setupNavbarEffects();

>>>>>>> d05af0515e28988bfd2c5c16bf178971dda6e9ac
// Fallback smooth scrolling for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo(0, offsetTop);
            }
        });
    });
<<<<<<< HEAD
}

// Generate and animate stars for the night sky
function createStars(numStars = 120) {
    const starsContainer = document.querySelector('.stars');
    if (!starsContainer) return;
    starsContainer.innerHTML = '';
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        // Random position
        star.style.top = `${Math.random() * 100}vh`;
        star.style.left = `${Math.random() * 100}vw`;
        // Random size
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        // Random animation delay for twinkle effect
        star.style.animationDelay = `${Math.random() * 2}s`;
        // Optional: random opacity
        star.style.opacity = Math.random() * 0.5 + 0.5;
        starsContainer.appendChild(star);
    }
}
window.addEventListener('DOMContentLoaded', () => createStars(120)); 
=======
} 
>>>>>>> d05af0515e28988bfd2c5c16bf178971dda6e9ac
