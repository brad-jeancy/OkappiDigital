// ===================================
// Appgen - SaaS Bootstrap Template
// Custom JavaScript
// ===================================

(function() {
    'use strict';

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)';
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    function updateActiveNav() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // Initialize EmailJS
    (function() {
        // Initialize EmailJS with your public key
        // Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
        // You can find this in EmailJS Dashboard → Account → General → Public Key
        emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your EmailJS Public Key
    })();

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                from_name: document.getElementById('name').value,
                from_email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Get submit button and disable it
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';

            // Send email using EmailJS
            // Replace 'YOUR_SERVICE_ID' with your Gmail Service ID (from Email Services)
            // Replace 'YOUR_TEMPLATE_ID' with your Email Template ID (from Email Templates)
            emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    
                    // Show success message
                    showFormMessage('success', 'Thank you for your message! We\'ll get back to you soon.');
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Re-enable button
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalButtonText;
                }, function(error) {
                    console.log('FAILED...', error);
                    
                    // Show error message
                    showFormMessage('error', 'Sorry, there was an error sending your message. Please try again or contact us directly.');
                    
                    // Re-enable button
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalButtonText;
                });
        });
    }

    // Function to show form messages
    function showFormMessage(type, message) {
        // Remove existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message alert alert-${type === 'success' ? 'success' : 'danger'} mt-3`;
        messageDiv.setAttribute('role', 'alert');
        messageDiv.innerHTML = message;

        // Insert message after form
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.parentNode.insertBefore(messageDiv, contactForm.nextSibling);
            
            // Scroll to message
            messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Remove message after 5 seconds (for success) or keep it for errors
            if (type === 'success') {
                setTimeout(() => {
                    messageDiv.remove();
                }, 5000);
            }
        }
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all service cards, pricing cards, and testimonial cards
    document.addEventListener('DOMContentLoaded', function() {
        const animatedElements = document.querySelectorAll('.feature-card, .pricing-card, .testimonial-card, .about-feature-item');
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    });

    // Counter animation for hero stats
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = formatNumber(target);
                clearInterval(timer);
            } else {
                element.textContent = formatNumber(Math.floor(start));
            }
        }, 16);
    }

    function formatNumber(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K+';
        }
        return num.toString();
    }

    // Initialize counter animation when hero section is visible
    const heroStatsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stats = entry.target.querySelectorAll('.hero-stats h3');
                stats.forEach(stat => {
                    const text = stat.textContent;
                    if (text.includes('K+')) {
                        const num = parseFloat(text) * 1000;
                        stat.textContent = '0';
                        animateCounter(stat, num);
                    } else if (text.includes('/')) {
                        // Don't animate rating
                    } else if (text.includes('%')) {
                        const num = parseFloat(text);
                        stat.textContent = '0%';
                        animateCounter(stat, num);
                    }
                });
                heroStatsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroStatsObserver.observe(heroSection);
    }

    // Mobile menu close on link click
    const mobileNavLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992) {
                navbarCollapse.classList.remove('show');
            }
        });
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Update copyright year automatically
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        const currentYear = new Date().getFullYear();
        currentYearElement.textContent = currentYear;
    }

    // Cookie Consent Management
    const cookieConsent = {
        // Check if user has already made a choice
        hasConsent: function() {
            return localStorage.getItem('cookieConsent') !== null;
        },
        
        // Get user's cookie preferences
        getPreferences: function() {
            const consent = localStorage.getItem('cookieConsent');
            if (consent) {
                return JSON.parse(consent);
            }
            return null;
        },
        
        // Save user's cookie preferences
        savePreferences: function(preferences) {
            const consentData = {
                timestamp: new Date().toISOString(),
                preferences: preferences
            };
            localStorage.setItem('cookieConsent', JSON.stringify(consentData));
            
            // Initialize cookies based on preferences
            this.initializeCookies(preferences);
        },
        
        // Initialize cookies based on user preferences
        initializeCookies: function(preferences) {
            // Essential cookies are always enabled
            this.setCookie('essential', 'true', 365);
            
            if (preferences.analytics) {
                this.setCookie('analytics', 'true', 365);
                // Initialize analytics (e.g., Google Analytics)
                this.initAnalytics();
            } else {
                this.setCookie('analytics', 'false', 365);
            }
            
            if (preferences.functional) {
                this.setCookie('functional', 'true', 365);
            } else {
                this.setCookie('functional', 'false', 365);
            }
            
            if (preferences.marketing) {
                this.setCookie('marketing', 'true', 365);
                // Initialize marketing cookies (e.g., Facebook Pixel)
                this.initMarketing();
            } else {
                this.setCookie('marketing', 'false', 365);
            }
        },
        
        // Set a cookie
        setCookie: function(name, value, days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            const expires = "expires=" + date.toUTCString();
            document.cookie = name + "=" + value + ";" + expires + ";path=/";
        },
        
        // Get a cookie
        getCookie: function(name) {
            const nameEQ = name + "=";
            const ca = document.cookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        },
        
        // Initialize analytics (placeholder for Google Analytics or similar)
        initAnalytics: function() {
            // Example: Google Analytics initialization
            // if (typeof gtag !== 'undefined') {
            //     gtag('consent', 'update', {
            //         'analytics_storage': 'granted'
            //     });
            // }
            console.log('Analytics cookies enabled');
        },
        
        // Initialize marketing (placeholder for Facebook Pixel or similar)
        initMarketing: function() {
            // Example: Facebook Pixel initialization
            // if (typeof fbq !== 'undefined') {
            //     fbq('consent', 'grant');
            // }
            console.log('Marketing cookies enabled');
        },
        
        // Show cookie consent banner
        showBanner: function() {
            const banner = document.getElementById('cookieConsent');
            if (banner) {
                banner.style.display = 'block';
                banner.style.visibility = 'visible';
                banner.style.opacity = '1';
                console.log('Cookie banner shown', banner.style.display);
            } else {
                console.error('Cookie banner element not found');
            }
        },
        
        // Hide cookie consent banner
        hideBanner: function() {
            const banner = document.getElementById('cookieConsent');
            if (banner) {
                banner.style.display = 'none';
            }
        },
        
        // Accept all cookies
        acceptAll: function() {
            const preferences = {
                essential: true,
                analytics: true,
                functional: true,
                marketing: true
            };
            this.savePreferences(preferences);
            this.hideBanner();
        },
        
        // Accept selected cookies
        acceptSelected: function() {
            const preferences = {
                essential: true, // Always true
                analytics: document.getElementById('cookieAnalytics').checked,
                functional: document.getElementById('cookieFunctional').checked,
                marketing: document.getElementById('cookieMarketing').checked
            };
            this.savePreferences(preferences);
            this.hideBanner();
        },
        
        // Reject all non-essential cookies
        rejectAll: function() {
            const preferences = {
                essential: true, // Always true
                analytics: false,
                functional: false,
                marketing: false
            };
            this.savePreferences(preferences);
            this.hideBanner();
        }
    };
    
    // Initialize cookie consent on page load
    function initCookieConsent() {
        console.log('Initializing cookie consent...');
        console.log('Has consent:', cookieConsent.hasConsent());
        
        // Check if user has already given consent
        if (!cookieConsent.hasConsent()) {
            console.log('No consent found, showing banner...');
            // Show banner after a short delay
            setTimeout(function() {
                cookieConsent.showBanner();
            }, 1000);
        } else {
            console.log('Consent already given, loading preferences...');
            // Load saved preferences
            const preferences = cookieConsent.getPreferences();
            if (preferences) {
                cookieConsent.initializeCookies(preferences.preferences);
            }
        }
        
        // Set up event listeners
        const acceptAllBtn = document.getElementById('acceptAllCookies');
        const acceptSelectedBtn = document.getElementById('acceptSelectedCookies');
        const rejectAllBtn = document.getElementById('rejectAllCookies');
        
        if (acceptAllBtn) {
            acceptAllBtn.addEventListener('click', function() {
                cookieConsent.acceptAll();
            });
        }
        
        if (acceptSelectedBtn) {
            acceptSelectedBtn.addEventListener('click', function() {
                cookieConsent.acceptSelected();
            });
        }
        
        if (rejectAllBtn) {
            rejectAllBtn.addEventListener('click', function() {
                cookieConsent.rejectAll();
            });
        }
    }
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCookieConsent);
    } else {
        // DOM is already ready
        initCookieConsent();
    }
    
    // FOR TESTING: Force show cookie banner
    // Run this in console: window.showCookieBanner()
    window.showCookieBanner = function() {
        console.log('Force showing cookie banner...');
        localStorage.removeItem('cookieConsent');
        cookieConsent.showBanner();
    };
    
    // FOR TESTING: Clear cookie consent
    // Run this in console: window.clearCookieConsent()
    window.clearCookieConsent = function() {
        localStorage.removeItem('cookieConsent');
        console.log('Cookie consent cleared. Refresh the page to see the banner.');
    };
    
    console.log('Cookie consent loaded. Use window.showCookieBanner() to force show, or window.clearCookieConsent() to clear and refresh.');

    // Contact Section Fly-in Animation (runs every time section is viewed)
    function animateContactSection(contactSection) {
        const contactCard = contactSection.querySelector('.contact-card');
        const headerBadge = contactSection.querySelector('.badge');
        const headerTitle = contactSection.querySelector('h2');
        const headerText = contactSection.querySelector('.lead');
        
        // Reset all elements to initial hidden state
        if (contactCard) {
            contactCard.classList.remove('contact-card-slide-in');
            contactCard.style.opacity = '0';
            contactCard.style.transform = 'translateX(200px)';
        }
        
        if (headerBadge) {
            headerBadge.classList.remove('contact-fly-in-up', 'contact-animate-delay-1');
            headerBadge.style.opacity = '0';
            headerBadge.style.transform = 'translateY(30px)';
        }
        if (headerTitle) {
            headerTitle.classList.remove('contact-fly-in-up', 'contact-animate-delay-2');
            headerTitle.style.opacity = '0';
            headerTitle.style.transform = 'translateY(30px)';
        }
        if (headerText) {
            headerText.classList.remove('contact-fly-in-up', 'contact-animate-delay-3');
            headerText.style.opacity = '0';
            headerText.style.transform = 'translateY(30px)';
        }
        
        // Force reflow to ensure reset is applied
        void contactSection.offsetWidth;
        
        // Animate header elements first (immediately)
        if (headerBadge) {
            headerBadge.style.opacity = '';
            headerBadge.style.transform = '';
            headerBadge.classList.add('contact-fly-in-up', 'contact-animate-delay-1');
        }
        if (headerTitle) {
            headerTitle.style.opacity = '';
            headerTitle.style.transform = '';
            headerTitle.classList.add('contact-fly-in-up', 'contact-animate-delay-2');
        }
        if (headerText) {
            headerText.style.opacity = '';
            headerText.style.transform = '';
            headerText.classList.add('contact-fly-in-up', 'contact-animate-delay-3');
        }
        
        // Animate the entire contact card sliding in from the right (after header)
        if (contactCard) {
            setTimeout(() => {
                contactCard.style.opacity = '';
                contactCard.style.transform = '';
                contactCard.classList.add('contact-card-slide-in');
            }, 400);
        }
    }
    
    const contactSectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const contactSection = entry.target;
                animateContactSection(contactSection);
            } else {
                // Reset animations when section leaves viewport - hide elements
                const contactSection = entry.target;
                const contactCard = contactSection.querySelector('.contact-card');
                const headerBadge = contactSection.querySelector('.badge');
                const headerTitle = contactSection.querySelector('h2');
                const headerText = contactSection.querySelector('.lead');
                
                // Reset and hide contact card
                if (contactCard) {
                    contactCard.classList.remove('contact-card-slide-in');
                    contactCard.style.opacity = '0';
                    contactCard.style.transform = 'translateX(200px)';
                }
                
                // Reset and hide header elements
                if (headerBadge) {
                    headerBadge.classList.remove('contact-fly-in-up', 'contact-animate-delay-1');
                    headerBadge.style.opacity = '0';
                    headerBadge.style.transform = 'translateY(30px)';
                }
                if (headerTitle) {
                    headerTitle.classList.remove('contact-fly-in-up', 'contact-animate-delay-2');
                    headerTitle.style.opacity = '0';
                    headerTitle.style.transform = 'translateY(30px)';
                }
                if (headerText) {
                    headerText.classList.remove('contact-fly-in-up', 'contact-animate-delay-3');
                    headerText.style.opacity = '0';
                    headerText.style.transform = 'translateY(30px)';
                }
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });

    // Observe contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSectionObserver.observe(contactSection);
    }
    
    // Also trigger on smooth scroll navigation
    document.querySelectorAll('a[href="#contact"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector('#contact');
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                // Trigger animation after scroll
                setTimeout(() => {
                    animateContactSection(target);
                }, 800);
            }
        });
    });

})();

