// Configuration Formspree - VOTRE ID
const FORMSPREE_URL = 'https://formspree.io/f/mqawzbpn';

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

// Carrousel "Pour qui"
function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    if (!track || !slides.length) return;
    
    let currentIndex = 0;
    const slideCount = slides.length;
    
    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateCarousel();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateCarousel();
    }
    
    // Événements
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Défilement automatique
    setInterval(nextSlide, 5000);
}

// Gestion du formulaire avec Formspree
function initSimpleForm() {
    const form = document.getElementById('simpleContactForm');
    const messageDiv = document.getElementById('simpleFormMessage');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Validation RGPD
            const consent = document.getElementById('consent');
            if (!consent.checked) {
                messageDiv.textContent = '❌ Vous devez accepter la politique de confidentialité';
                messageDiv.className = 'form-message error';
                messageDiv.style.display = 'block';
                return;
            }
            
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            // Désactiver le bouton
            submitButton.disabled = true;
            submitButton.innerHTML = 'ENVOI EN COURS...';
            
            try {
                const formData = new FormData(form);
                
                // Envoi réel à Formspree
                const response = await fetch(FORMSPREE_URL, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    messageDiv.textContent = '✅ Merci ! Nous vous contactons rapidement pour organiser votre démo.';
                    messageDiv.className = 'form-message success';
                    messageDiv.style.display = 'block';
                    form.reset();
                } else {
                    throw new Error('Erreur lors de l\'envoi');
                }
            } catch (error) {
                messageDiv.textContent = '❌ Erreur d\'envoi. Contactez-nous directement à support@orphika.io';
                messageDiv.className = 'form-message error';
                messageDiv.style.display = 'block';
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
    
    // Fermer avec ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }
    });
}

// Redirection des boutons vers contact
function initButtonActions() {
    // Tous ces boutons redirigent vers la section contact
    const contactButtons = [
        '.cyber-button', // Demo disponible nav
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
    const animatedElements = document.querySelectorAll('.service-card, .stat-item, .profession-card');
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
    initCarousel();
    initSimpleForm(); // ← Celle-ci est maintenant corrigée
    initSmoothScroll();
    initModals();
    initButtonActions();
    
    // Message de bienvenue dans la console (optionnel)
    console.log('🚀 Bienvenue sur Orphika IA - Site vitrine sécurisé RGPD');
    console.log('📧 Contact : support@orphika.io');
    console.log('🔒 Aucun cookie utilisé - Conforme RGPD');
});

// Désactiver le clic droit pour protéger le contenu (optionnel)
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Empêcher l'inspection (optionnel - léger)
document.addEventListener('keydown', (e) => {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
        e.preventDefault();
    }
});
