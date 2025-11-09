// =========================================
// ORPHIKA IA - JAVASCRIPT OPTIMISÉ
// Version: 2.0 (Janvier 2025)
// =========================================

// Configuration Formspree - IMPORTANT : NE PAS MODIFIER
const FORMSPREE_URL = 'https://formspree.io/f/mqawzbpn';

// Configuration générale
const CONFIG = {
    scrollAnimationThreshold: 0.15,
    scrollAnimationDelay: 100,
    formSuccessDisplayTime: 5000,
    smoothScrollDuration: 1000
};

// =========================================
// INITIALISATION AU CHARGEMENT
// =========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Orphika IA - Site optimisé chargé');
    console.log('📧 Contact: support@orphika.io');
    console.log('🔒 Conforme RGPD - Aucun cookie');
    
    // =========================================
    // CARROUSEL COMPARAISON
    // =========================================

    let currentComparisonIndex = 0;
    const comparisonSlides = document.querySelectorAll('.comparison-slide');
    const comparisonIndicators = document.querySelectorAll('.comparison-carousel .indicator');

    function moveComparison(direction) {
        if (!comparisonSlides.length) return;
        
        currentComparisonIndex += direction;
        
        if (currentComparisonIndex < 0) {
            currentComparisonIndex = comparisonSlides.length - 1;
        } else if (currentComparisonIndex >= comparisonSlides.length) {
            currentComparisonIndex = 0;
        }
        
        updateComparisonCarousel();
    }

    function goToComparison(index) {
        currentComparisonIndex = index;
        updateComparisonCarousel();
    }

    function updateComparisonCarousel() {
        const track = document.querySelector('.comparison-track');
        if (track) {
            track.style.transform = `translateX(-${currentComparisonIndex * 100}%)`;
        }
        
        // Mettre à jour indicateurs
        comparisonIndicators.forEach((indicator, index) => {
            if (index === currentComparisonIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    // Auto-défilement comparaison (optionnel - arrêtable)
    let comparisonAutoPlay = setInterval(() => {
        moveComparison(1);
    }, 5000);

    // Arrêter auto-défilement au survol
    const comparisonCarousel = document.querySelector('.comparison-carousel');
    if (comparisonCarousel) {
        comparisonCarousel.addEventListener('mouseenter', () => {
            clearInterval(comparisonAutoPlay);
        });
        
        comparisonCarousel.addEventListener('mouseleave', () => {
            comparisonAutoPlay = setInterval(() => {
                moveComparison(1);
            }, 5000);
        });
    }

    // =========================================
    // CARROUSEL TÉMOIGNAGES
    // =========================================

    let currentTestimonialIndex = 0;
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialIndicators = document.querySelectorAll('.testimonials-carousel .indicator');

    function moveTestimonial(direction) {
        if (!testimonialSlides.length) return;
        
        currentTestimonialIndex += direction;
        
        if (currentTestimonialIndex < 0) {
            currentTestimonialIndex = testimonialSlides.length - 1;
        } else if (currentTestimonialIndex >= testimonialSlides.length) {
            currentTestimonialIndex = 0;
        }
        
        updateTestimonialCarousel();
    }

    function goToTestimonial(index) {
        currentTestimonialIndex = index;
        updateTestimonialCarousel();
    }

    function updateTestimonialCarousel() {
        const track = document.querySelector('.testimonials-track');
        if (track) {
            track.style.transform = `translateX(-${currentTestimonialIndex * 100}%)`;
        }
        
        // Mettre à jour indicateurs
        testimonialIndicators.forEach((indicator, index) => {
            if (index === currentTestimonialIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    // Auto-défilement témoignages
    let testimonialAutoPlay = setInterval(() => {
        moveTestimonial(1);
    }, 6000);

    // Arrêter auto-défilement au survol
    const testimonialCarousel = document.querySelector('.testimonials-carousel');
    if (testimonialCarousel) {
        testimonialCarousel.addEventListener('mouseenter', () => {
            clearInterval(testimonialAutoPlay);
        });
        
        testimonialCarousel.addEventListener('mouseleave', () => {
            testimonialAutoPlay = setInterval(() => {
                moveTestimonial(1);
            }, 6000);
        });
    }

    // =========================================
    // FAQ ACCORDÉON
    // =========================================

    function toggleFAQ(button) {
        const answer = button.nextElementSibling;
        const isActive = button.classList.contains('active');
        
        // Fermer toutes les autres FAQs
        document.querySelectorAll('.faq-question').forEach(q => {
            q.classList.remove('active');
        });
        document.querySelectorAll('.faq-answer').forEach(a => {
            a.classList.remove('active');
        });
        
        // Toggle la FAQ cliquée
        if (!isActive) {
            button.classList.add('active');
            answer.classList.add('active');
        }
    }

    // Ouvrir la première FAQ par défaut
    setTimeout(() => {
        const firstFAQ = document.querySelector('.faq-question');
        if (firstFAQ) {
            toggleFAQ(firstFAQ);
        }
    }, 500);

    console.log('✅ Carrousels et accordéons initialisés');

    // Initialiser toutes les fonctionnalités
    initScrollAnimations();
    initSmoothScroll();
    initFormHandler();
    initCTAButtons();
    initModals();
    initTrustBar();
    initResponsiveMenu();
    
    // Animations au chargement
    animateHeroOnLoad();
});

// =========================================
// ANIMATIONS AU SCROLL
// =========================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: CONFIG.scrollAnimationThreshold,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Éléments à observer
    const animatedElements = document.querySelectorAll(
        '.problem-card, .solution-card, .testimonial-card, ' +
        '.package-card, .faq-item, .benefit-item, ' +
        '.timeline-item, .comparison-card'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// =========================================
// SMOOTH SCROLL
// =========================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 120; // Height of fixed header + trust bar
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// =========================================
// GESTION FORMULAIRE FORMSPREE
// =========================================

function initFormHandler() {
    const form = document.getElementById('simpleContactForm');
    const messageDiv = document.getElementById('simpleFormMessage');
    
    if (!form) {
        console.error('❌ Formulaire introuvable');
        return;
    }
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validation RGPD
        const consent = document.getElementById('consent');
        if (!consent || !consent.checked) {
            showFormMessage(
                '❌ Vous devez accepter la politique de confidentialité pour continuer',
                'error'
            );
            return;
        }
        
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        // État de chargement
        submitButton.disabled = true;
        submitButton.innerHTML = `
            <span class="btn-text">ENVOI EN COURS...</span>
            <span class="btn-arrow">⏳</span>
        `;
        
        try {
            const formData = new FormData(form);
            
            // Envoi à Formspree
            const response = await fetch(FORMSPREE_URL, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Succès
                showFormMessage(
                    '✅ Merci ! Nous vous contacterons dans les 24h pour organiser votre démo gratuite.',
                    'success'
                );
                form.reset();
                
                // Tracking événement (si analytics)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_submission', {
                        'event_category': 'engagement',
                        'event_label': 'demo_request'
                    });
                }
            } else {
                throw new Error('Erreur serveur');
            }
        } catch (error) {
            console.error('Erreur envoi formulaire:', error);
            showFormMessage(
                '❌ Une erreur s\'est produite. Contactez-nous directement à support@orphika.io',
                'error'
            );
        } finally {
            // Réactiver le bouton
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
        }
    });
}

function showFormMessage(message, type) {
    const messageDiv = document.getElementById('simpleFormMessage');
    if (!messageDiv) return;
    
    messageDiv.textContent = message;
    messageDiv.className = `form-message ${type}`;
    messageDiv.style.display = 'block';
    
    // Scroll vers le message
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Masquer après délai
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, CONFIG.formSuccessDisplayTime);
}

// =========================================
// BOUTONS CTA
// =========================================

function initCTAButtons() {
    // Tous les boutons qui redirigent vers le formulaire
    const ctaSelectors = [
        '.cta-button-nav',
        '.cta-primary',
        '.cta-secondary',
        '.cta-package',
        '.cta-how-it-works .cta-button'
    ];
    
    ctaSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                scrollToContact();
            });
        });
    });
}

function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        const headerOffset = 120;
        const elementPosition = contactSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
        
        // Focus sur le premier champ après scroll
        setTimeout(() => {
            const firstInput = contactSection.querySelector('input[type="text"]');
            if (firstInput) firstInput.focus();
        }, CONFIG.smoothScrollDuration);
    }
}

// =========================================
// MODALS (MENTIONS LÉGALES)
// =========================================

function initModals() {
    // Fonctions globales pour les liens HTML
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

// =========================================
// TRUST BAR COMPORTEMENT
// =========================================

function initTrustBar() {
    const trustBar = document.querySelector('.trust-bar');
    if (!trustBar) return;
    
    // Animation de l'élément urgence
    const urgencyItem = trustBar.querySelector('.urgency');
    if (urgencyItem) {
        setInterval(() => {
            urgencyItem.style.transform = 'scale(1.05)';
            setTimeout(() => {
                urgencyItem.style.transform = 'scale(1)';
            }, 200);
        }, 3000);
    }
}

// =========================================
// ANIMATIONS HERO AU CHARGEMENT
// =========================================

function animateHeroOnLoad() {
    const hero = document.querySelector('.hero-optimized');
    if (!hero) return;
    
    // Animer les éléments du hero progressivement
    const elements = [
        '.badge-urgency',
        '.hero-title',
        '.hero-subtitle',
        '.hero-benefits',
        '.hero-cta',
        '.social-proof',
        '.phone-mockup'
    ];
    
    elements.forEach((selector, index) => {
        const element = hero.querySelector(selector);
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
    
    // Animer les badges flottants
    setTimeout(() => {
        document.querySelectorAll('.floating-badge').forEach((badge, index) => {
            badge.style.opacity = '0';
            badge.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                badge.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                badge.style.opacity = '1';
                badge.style.transform = 'scale(1)';
            }, index * 200);
        });
    }, 800);
}

// =========================================
// MENU RESPONSIVE (MOBILE)
// =========================================

function initResponsiveMenu() {
    // Créer un bouton hamburger si mobile
    const nav = document.querySelector('nav');
    const navMenu = document.querySelector('.nav-menu');
    
    if (window.innerWidth <= 768) {
        const hamburger = document.createElement('button');
        hamburger.className = 'hamburger-menu';
        hamburger.innerHTML = '☰';
        hamburger.style.cssText = `
            display: block;
            background: transparent;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 8px;
        `;
        
        hamburger.addEventListener('click', () => {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '100%';
            navMenu.style.left = '0';
            navMenu.style.width = '100%';
            navMenu.style.background = 'rgba(15, 23, 42, 0.95)';
            navMenu.style.padding = '20px';
        });
        
        nav.insertBefore(hamburger, navMenu);
    }
}

// =========================================
// SCROLL EFFECTS (HEADER)
// =========================================

let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('.glass-header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Ajouter shadow au scroll
    if (scrollTop > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop;
});

// =========================================
// ANIMATIONS CHAT BUBBLE (HERO)
// =========================================

function animateChatBubbles() {
    const bubbles = document.querySelectorAll('.chat-bubble');
    
    bubbles.forEach((bubble, index) => {
        bubble.style.opacity = '0';
        bubble.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            bubble.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            bubble.style.opacity = '1';
            bubble.style.transform = 'translateY(0)';
        }, index * 800);
    });
    
    // Animer le typing indicator en dernier
    const typingIndicator = document.querySelector('.typing-indicator');
    if (typingIndicator) {
        setTimeout(() => {
            typingIndicator.style.opacity = '0';
            typingIndicator.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                typingIndicator.style.opacity = '1';
            }, 100);
        }, bubbles.length * 800);
    }
}

// Lancer l'animation des bulles après chargement
setTimeout(animateChatBubbles, 1000);

// =========================================
// VALIDATION FORMULAIRE TEMPS RÉEL
// =========================================

function initRealtimeValidation() {
    const form = document.getElementById('simpleContactForm');
    if (!form) return;
    
    const emailInput = form.querySelector('input[type="email"]');
    const phoneInput = form.querySelector('input[type="tel"]');
    
    // Validation email
    if (emailInput) {
        emailInput.addEventListener('blur', () => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput.value && !emailRegex.test(emailInput.value)) {
                emailInput.style.borderColor = 'var(--alert-red)';
            } else {
                emailInput.style.borderColor = 'var(--success-green)';
            }
        });
    }
    
    // Formatage téléphone
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                value = value.match(/.{1,2}/g).join(' ');
            }
            e.target.value = value;
        });
    }
}

initRealtimeValidation();

// =========================================
// TRACKING INTERACTIONS (OPTIONNEL)
// =========================================

function trackInteraction(action, label) {
    // Si vous utilisez Google Analytics ou autre
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': 'engagement',
            'event_label': label
        });
    }
    
    console.log(`📊 Interaction: ${action} - ${label}`);
}

// Tracker les clics sur CTA
document.querySelectorAll('.cta-primary, .cta-secondary, .cta-package').forEach(button => {
    button.addEventListener('click', () => {
        trackInteraction('cta_click', button.textContent.trim());
    });
});

// =========================================
// PERFORMANCE OPTIMIZATION
// =========================================

// Lazy loading des images (si ajoutées plus tard)
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback pour navigateurs anciens
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// =========================================
// DÉSACTIVATION CLIC DROIT (OPTIONNEL)
// =========================================

// Décommenter si vous voulez protéger le contenu
/*
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    console.log('Clic droit désactivé');
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
        e.preventDefault();
        console.log('DevTools désactivés');
    }
});
*/

// =========================================
// MESSAGES CONSOLE STYLÉS
// =========================================

console.log(
    '%c🚀 Orphika IA Agency',
    'color: #f97316; font-size: 24px; font-weight: bold;'
);
console.log(
    '%cSite optimisé pour la conversion 📈',
    'color: #10b981; font-size: 14px;'
);
console.log(
    '%c📧 Contact: support@orphika.io',
    'color: #2563eb; font-size: 12px;'
);
console.log(
    '%c🔒 100% Conforme RGPD - Aucun cookie utilisé',
    'color: #94a3b8; font-size: 12px;'
);

// =========================================
// EXPORT FONCTIONS GLOBALES
// =========================================

window.OrphikaIA = {
    scrollToContact,
    showModal: window.showModal,
    closeModal: window.closeModal,
    trackInteraction,
    // Fonctions des carrousels
    moveComparison: window.moveComparison,
    moveTestimonial: window.moveTestimonial,
    goToComparison: window.goToComparison,
    goToTestimonial: window.goToTestimonial,
    toggleFAQ: window.toggleFAQ
};

console.log('✅ Orphika IA - Toutes les fonctionnalités initialisées');
