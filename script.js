// Coffee Alchemy - Interactive JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all components
    initNavigation();
    initScrollAnimations();
    initRecipeFilters();
    initParticleSystem();
    initSmoothScrolling();
    initLoadingAnimations();
    
    // Navigation functionality
    function initNavigation() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        const header = document.querySelector('.glass-header');
        
        // Mobile menu toggle
        if (navToggle) {
            navToggle.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }
        
        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Header scroll effect
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.15)';
                header.style.backdropFilter = 'blur(25px)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.1)';
                header.style.backdropFilter = 'blur(20px)';
            }
        });
        
        // Intersection Observer for active nav links
        const sections = document.querySelectorAll('section[id]');
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '-100px 0px -50% 0px'
        };
        
        const sectionObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const currentId = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${currentId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);
        
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }
    
    // Scroll animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);
        
        // Observe all cards and sections
        const animateElements = document.querySelectorAll(
            '.recipe-card, .brewing-card, .section-header, .about-content > *'
        );
        
        animateElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Recipe filtering system
    function initRecipeFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const recipeCards = document.querySelectorAll('.recipe-card');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter recipes with animation
                recipeCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Particle system for background
    function initParticleSystem() {
        const particleField = document.querySelector('.particle-field');
        if (!particleField) return;
        
        // Create dynamic particles
        function createParticle() {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                pointer-events: none;
                animation: float-particle ${3 + Math.random() * 4}s linear infinite;
            `;
            
            // Random starting position
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = '100%';
            
            particleField.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 7000);
        }
        
        // Create particles periodically
        setInterval(createParticle, 500);
        
        // Add CSS animation for particles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float-particle {
                0% {
                    transform: translateY(0) translateX(0) scale(0);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                    transform: translateY(-10vh) translateX(10px) scale(1);
                }
                90% {
                    opacity: 1;
                    transform: translateY(-90vh) translateX(20px) scale(1);
                }
                100% {
                    transform: translateY(-100vh) translateX(30px) scale(0);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Smooth scrolling
    function initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = 80;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Loading animations
    function initLoadingAnimations() {
        const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-buttons, .hero-visual');
        
        // Stagger animation for hero elements
        heroElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 200 + index * 200);
        });
        
        // Add loading class to body
        document.body.classList.add('loading');
        
        // Remove loading class after animations
        setTimeout(() => {
            document.body.classList.remove('loading');
        }, 2000);
    }
    
    // Interactive coffee cup animation
    function initCoffeeCupInteraction() {
        const coffeeCup = document.querySelector('.coffee-cup');
        if (!coffeeCup) return;
        
        coffeeCup.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        coffeeCup.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
        
        // Click animation
        coffeeCup.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1.05)';
            }, 100);
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    }
    
    // Recipe card interactions
    function initRecipeCardInteractions() {
        const recipeCards = document.querySelectorAll('.recipe-card');
        
        recipeCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                // Add subtle 3D tilt effect
                this.addEventListener('mousemove', handleMouseMove);
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
                this.removeEventListener('mousemove', handleMouseMove);
            });
            
            function handleMouseMove(e) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            }
        });
    }
    
    // Parallax effect for background orbs
    function initParallaxEffect() {
        const orbs = document.querySelectorAll('.orb');
        
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            orbs.forEach((orb, index) => {
                const speed = (index + 1) * 0.3;
                orb.style.transform = `translateY(${rate * speed}px)`;
            });
        });
    }
    
    // Dynamic gradient animation
    function initGradientAnimation() {
        const gradients = document.querySelectorAll('.gradient-primary, .gradient-secondary, .gradient-accent');
        
        gradients.forEach(gradient => {
            let angle = 135;
            
            setInterval(() => {
                angle += 0.5;
                gradient.style.background = `linear-gradient(${angle}deg, var(--color-start) 0%, var(--color-end) 100%)`;
            }, 50);
        });
    }
    
    // Performance optimization
    function initPerformanceOptimizations() {
        // Debounce scroll events
        let ticking = false;
        
        function updateScrollEffects() {
            // Update scroll-based animations here
            ticking = false;
        }
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        });
        
        // Lazy load images
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Initialize additional interactions
    initCoffeeCupInteraction();
    initRecipeCardInteractions();
    initParallaxEffect();
    initPerformanceOptimizations();
    
    // Console easter egg
    console.log(`
    ☕ Coffee Alchemy - Interactive Brewing Guide
    
    Features:
    - Glassmorphism design with backdrop filters
    - Interactive particle system
    - Smooth scroll animations
    - Recipe filtering system
    - Responsive mobile design
    - Parallax background effects
    
    Crafted with passion for perfect coffee! ☕
    `);
});

// Utility functions
const utils = {
    // Debounce function for performance
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function for scroll events
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Random number generator
    random: function(min, max) {
        return Math.random() * (max - min) + min;
    },
    
    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = utils;
}