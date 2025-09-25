/**
 * Portfolio Badohma BAKAYOKO - Script Principal
 * Version: 1.0.0
 */

// Configuration
const CONFIG = {
    animationDuration: 1000,
    scrollOffset: 100,
    typingSpeed: 100,
    particleCount: 30
};

// État de l'application
const state = {
    isScrolling: false,
    currentSection: 'home',
    theme: localStorage.getItem('theme') || 'light'
};

// ========================================
// Initialisation
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollEffects();
    initTypingAnimation();
    initProjectCards();
    initContactForm();
    initThemeToggle();
    initParticles();
    initLazyLoading();
    initAnalytics();
});

// ========================================
// Navigation
// ========================================

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const mobileMenuBtn = createMobileMenuButton();
    
    // Scroll effect sur la navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active section
        updateActiveSection();
    });
    
    // Smooth scroll pour les liens
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - CONFIG.scrollOffset;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Fermer le menu mobile si ouvert
                closeMobileMenu();
            }
        });
    });
    
    // Menu mobile
    navbar.querySelector('.nav-container').appendChild(mobileMenuBtn);
}

function createMobileMenuButton() {
    const btn = document.createElement('button');
    btn.className = 'mobile-menu-btn';
    btn.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    btn.addEventListener('click', toggleMobileMenu);
    return btn;
}

function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('mobile-active');
    document.querySelector('.mobile-menu-btn').classList.toggle('active');
}

function closeMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.remove('mobile-active');
    document.querySelector('.mobile-menu-btn')?.classList.remove('active');
}

function updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + CONFIG.scrollOffset + 50;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            state.currentSection = sectionId;
            
            // Update active nav link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ========================================
// Effets de scroll
// ========================================

function initScrollEffects() {
    const reveals = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
    
    // Parallax effect
    initParallax();
}

function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ========================================
// Animation de frappe
// ========================================

function initTypingAnimation() {
    const typingElements = document.querySelectorAll('.typing');
    
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.visibility = 'visible';
        
        let index = 0;
        const type = () => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, CONFIG.typingSpeed);
            }
        };
        
        // Delay initial pour l'effet
        setTimeout(type, 500);
    });
}

// ========================================
// Cartes de projets interactives
// ========================================

function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Effet de survol avec suivi de souris
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Créer un effet de gradient qui suit la souris
            card.style.background = `
                radial-gradient(
                    600px circle at ${x}px ${y}px,
                    rgba(255, 230, 230, 1),
                    rgba(255, 245, 236, 1)
                )
            `;
            
            // Effet 3D tilt
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateZ(10px)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.background = 'linear-gradient(135deg, white, #FFF5EC)';
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
        
        // Click pour plus de détails
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('project-link')) {
                this.classList.toggle('expanded');
            }
        });
    });
}

// ========================================
// Formulaire de contact
// ========================================

function initContactForm() {
    // Créer un formulaire de contact si nécessaire
    const contactSection = document.querySelector('.contact');
    
    if (contactSection && !document.getElementById('contact-form')) {
        const formHTML = `
            <form id="contact-form" class="contact-form" style="max-width: 600px; margin: 50px auto;">
                <div class="form-group">
                    <input type="text" name="name" placeholder="Votre nom" required class="form-control">
                </div>
                <div class="form-group">
                    <input type="email" name="email" placeholder="Votre email" required class="form-control">
                </div>
                <div class="form-group">
                    <textarea name="message" placeholder="Votre message" rows="5" required class="form-control"></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Envoyer le message</button>
            </form>
        `;
        
        const formContainer = document.createElement('div');
        formContainer.innerHTML = formHTML;
        contactSection.querySelector('.contact-grid').before(formContainer);
        
        // Gérer la soumission
        document.getElementById('contact-form').addEventListener('submit', handleContactSubmit);
    }
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Simulation d'envoi
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    
    btn.disabled = true;
    btn.textContent = 'Envoi en cours...';
    
    setTimeout(() => {
        // Ici vous pouvez intégrer avec un service comme EmailJS ou Formspree
        console.log('Form data:', data);
        
        btn.textContent = 'Message envoyé !';
        btn.style.background = 'var(--secondary)';
        
        // Reset après 3 secondes
        setTimeout(() => {
            e.target.reset();
            btn.disabled = false;
            btn.textContent = originalText;
            btn.style.background = '';
        }, 3000);
    }, 1500);
}

// ========================================
// Toggle de thème (clair/sombre)
// ========================================

function initThemeToggle() {
    // Créer le bouton de toggle
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'theme-toggle';
    toggleBtn.innerHTML = state.theme === 'dark' ? '☀️' : '🌙';
    toggleBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: white;
        border: 2px solid var(--primary);
        cursor: pointer;
        font-size: 24px;
        z-index: 9999;
        transition: all 0.3s ease;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(toggleBtn);
    
    toggleBtn.addEventListener('click', toggleTheme);
    
    // Appliquer le thème initial
    if (state.theme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-theme');
    state.theme = isDark ? 'dark' : 'light';
    localStorage.setItem('theme', state.theme);
    
    const toggleBtn = document.querySelector('.theme-toggle');
    toggleBtn.innerHTML = isDark ? '☀️' : '🌙';
    
    // Animation de transition
    document.body.style.transition = 'background 0.5s ease';
}

// ========================================
// Particules animées
// ========================================

function initParticles() {
    const particlesContainer = document.getElementById('particles');
    
    if (!particlesContainer) return;
    
    for (let i = 0; i < CONFIG.particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        background: var(--primary);
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: ${Math.random() * 0.5 + 0.3};
        animation: float ${Math.random() * 10 + 15}s infinite ease-in-out;
        animation-delay: ${Math.random() * 5}s;
    `;
    
    container.appendChild(particle);
}

// ========================================
// Lazy Loading des images
// ========================================

function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('fade-in');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ========================================
// Analytics et tracking
// ========================================

function initAnalytics() {
    // Track des clics sur les liens importants
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.addEventListener('click', () => {
            trackEvent('External Link', 'click', link.href);
        });
    });
    
    // Track des projets vus
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const projectTitle = entry.target.querySelector('.project-title')?.textContent;
                if (projectTitle) {
                    trackEvent('Project View', 'scroll', projectTitle);
                }
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.project-card').forEach(card => {
        projectObserver.observe(card);
    });
}

function trackEvent(category, action, label) {
    // Intégration avec Google Analytics ou autre
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
    
    // Logging pour debug
    console.log('Event tracked:', { category, action, label });
}

// ========================================
// Helpers
// ========================================

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

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========================================
// Export pour utilisation externe
// ========================================

window.Portfolio = {
    state,
    CONFIG,
    toggleTheme,
    trackEvent
};
