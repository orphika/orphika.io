// Configuration simple pour site vitrine
// Pas besoin de Formspree compliqué pour un site vitrine

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
            stat.textContent = Math.floor(current);
        }, 16);
    });
}

// Gestion du formulaire simple (juste une confirmation)
function initSimpleForm() {
    const form = document.getElementById('simpleContactForm');
    const messageDiv = document.getElementById('simpleFormMessage');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulation d'envoi - dans un vrai site vitrine, on redirige vers email
            messageDiv.textContent = '✅ Merci ! Nous vous rappellerons très rapidement.';
            messageDiv.className = 'form-message success';
            form.reset();
            
            // Cacher le message après 5 secondes
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 5000);
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
        '.btn-primary', // Démarrer maintenant
        '.btn-secondary' // Voir la démo
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

// Initialisation complète
document.addEventListener('DOMContentLoaded', () => {
    // Observer les éléments à animer
    const animatedElements = document.querySelectorAll('.service-card, .stat-item, .case-item');
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
    initSimpleForm();
    initSmoothScroll();
    initModals();
    initButtonActions();
});
