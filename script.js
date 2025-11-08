// Configuration Formspree - REMPLACEZ par votre vrai ID de formulaire
const FORMSPREE_URL = 'https://formspree.io/f/YOUR_FORM_ID';

// Animations au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animation des statistiques
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current) + (stat.getAttribute('data-count') === '100' ? '%' : '');
        }, 16);
    });
}

// Accordéon Technologies
function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector('.accordion-icon');
            
            // Fermer tous les autres
            document.querySelectorAll('.accordion-content').forEach(item => {
                if (item !== content) {
                    item.classList.remove('active');
                }
            });
            
            document.querySelectorAll('.accordion-icon').forEach(item => {
                if (item !== icon) {
                    item.textContent = '+';
                }
            });
            
            // Basculer l'actuel
            content.classList.toggle('active');
            icon.textContent = content.classList.contains('active') ? '−' : '+';
        });
    });
}

// Gestion du formulaire
function initContactForm() {
    const form = document.getElementById('contactForm');
    const messageDiv = document.getElementById('formMessage');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            // Désactiver le bouton
            submitButton.disabled = true;
            submitButton.innerHTML = 'ENVOI EN COURS...';
            
            try {
                const formData = new FormData(form);
                const response = await fetch(FORMSPREE_URL, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    messageDiv.textContent = '✅ Message envoyé ! Nous vous répondons sous 24h.';
                    messageDiv.className = 'form-message success';
                    form.reset();
                } else {
                    throw new Error('Erreur lors de l\'envoi');
                }
            } catch (error) {
                messageDiv.textContent = '❌ Erreur d\'envoi. Contactez-nous directement à support@orphika.io';
                messageDiv.className = 'form-message error';
            } finally {
                // Réactiver le bouton
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
                
                // Cacher le message après 5 secondes
                setTimeout(() => {
                    messageDiv.style.display = 'none';
                }, 5000);
            }
        });
    }
}

// Navigation smooth scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Gestion des modals
function initModals() {
    window.showModal = (modalType) => {
        const modal = document.getElementById(modalType + 'Modal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };
    
    window.closeModal = (modalType) => {
        const modal = document.getElementById(modalType + 'Modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    };
    
    // Fermer en cliquant à l'extérieur
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });
}

// Redirection des boutons vers contact
function initButtonActions() {
    // Tous ces boutons redirigent vers la section contact
    const contactButtons = [
        '.cyber-button', // Demo gratuite nav
        '.btn-primary', // Démarrer transformation
        '.btn-secondary', // Visionner démo
        '.cta-button-futurist' // Commencer maintenant
    ];
    
    contactButtons.forEach(selector => {
        document.querySelectorAll(selector).forEach(button => {
            button.addEventListener('click', () => {
                document.getElementById('contact').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });
    });
}

// Effets de particules
function createParticles() {
    const particlesContainer = document.querySelector('.animated-bg');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--accent);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: floatParticle ${10 + Math.random() * 20}s linear infinite;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Initialisation complète
document.addEventListener('DOMContentLoaded', () => {
    // Observer les éléments à animer
    const animatedElements = document.querySelectorAll('.service-card, .stat-item, .step, .tech-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Animation des stats
    const statsSection = document.querySelector('.stats-bar');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    });
    if (statsSection) statsObserver.observe(statsSection);
    
    // Initialiser toutes les fonctionnalités
    initAccordion();
    initContactForm();
    initSmoothScroll();
    initModals();
    initButtonActions();
    createParticles();
});

// Animation CSS pour les particules
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
        0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
