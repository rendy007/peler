// LAGGY Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling untuk anchor links
    function smoothScrollTo(target) {
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Handle navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            if (target !== '#') {
                smoothScrollTo(target);
            }
        });
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.setAttribute('data-animation-state', 'active');
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all images and text elements
    const elementsToAnimate = document.querySelectorAll('[data-animation-role]');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });

    // Button hover effects
    const buttons = document.querySelectorAll('.grid-button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'all 0.3s ease';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Image lazy loading enhancement
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.addEventListener('load', function() {
                    this.classList.add('loaded');
                });
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // Mobile menu functionality (if needed)
    const hamburgerBtn = document.querySelector('.burger');
    const mobileMenu = document.querySelector('.block-header-layout-mobile__dropdown');
    
    if (hamburgerBtn && mobileMenu) {
        hamburgerBtn.addEventListener('click', function() {
            this.classList.toggle('burger--open');
            mobileMenu.classList.toggle('block-header-layout-mobile__dropdown--open');
        });
    }

    // Glitch effect for LAGGY elements
    function addGlitchEffect() {
        const laggyElements = document.querySelectorAll('img[src*="LAGGY"], img[alt*="LAGGY"]');
        
        laggyElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.style.filter = 'hue-rotate(90deg) saturate(1.5)';
                this.style.animation = 'glitch 0.3s infinite';
            });

            element.addEventListener('mouseleave', function() {
                this.style.filter = 'none';
                this.style.animation = 'none';
            });
        });
    }

    // Add CSS for glitch animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes glitch {
            0% { transform: translateX(0); }
            10% { transform: translateX(-2px); }
            20% { transform: translateX(2px); }
            30% { transform: translateX(-1px); }
            40% { transform: translateX(1px); }
            50% { transform: translateX(-2px); }
            60% { transform: translateX(2px); }
            70% { transform: translateX(-1px); }
            80% { transform: translateX(1px); }
            90% { transform: translateX(-2px); }
            100% { transform: translateX(0); }
        }

        .animate-in {
            animation: fadeInUp 0.6s ease forwards;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .loaded {
            opacity: 1;
            transition: opacity 0.3s ease;
        }

        img[loading="lazy"] {
            opacity: 0;
        }
    `;
    document.head.appendChild(style);

    // Initialize glitch effect
    addGlitchEffect();

    // Social media link tracking (optional analytics)
    const socialLinks = document.querySelectorAll('a[href*="twitter.com"], a[href*="t.me"], a[href*="pump.fun"]');
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            const platform = this.textContent.trim();
            console.log(`User clicked ${platform} link`);
            
            // You can add analytics tracking here if needed
            // gtag('event', 'social_click', { platform: platform });
        });
    });

    // Parallax effect for background images
    function addParallaxEffect() {
        const backgrounds = document.querySelectorAll('.block-background__image');
        
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            
            backgrounds.forEach((bg, index) => {
                const rate = scrolled * -0.3 * (index + 1);
                bg.style.transform = `translateY(${rate}px)`;
            });
        });
    }

    // Initialize parallax only on desktop
    if (window.innerWidth > 920) {
        addParallaxEffect();
    }

    // Preload critical images
    function preloadImages() {
        const criticalImages = [
            'assets.zyrosite.com/AQEywp5k9NFLjQRK/window-Yg2Woqy0XRh95o6R.gif',
            'LAGGY.gif',
            'LAGGY2.gif'
        ];

        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    preloadImages();

    // Copy contract address functionality (if QR code is clicked)
    const qrImages = document.querySelectorAll('img[src*="qr-moshed"]');
    qrImages.forEach(qr => {
        qr.style.cursor = 'pointer';
        qr.addEventListener('click', function() {
            // Replace with actual contract address
            const contractAddress = '63RdeC9wrtyH4qT4yo6ZKxzqXnuDBuNE2zdxW18Bpump';
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(contractAddress).then(() => {
                    showNotification('Contract address copied!');
                });
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = contractAddress;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showNotification('Contract address copied!');
            }
        });
    });

    // Simple notification system
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #0078d7;
            color: white;
            padding: 12px 20px;
            border-radius: 5px;
            z-index: 10000;
            font-family: 'Roboto Mono', monospace;
            animation: slideIn 0.3s ease;
        `;

        const slideInStyle = document.createElement('style');
        slideInStyle.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(slideInStyle);

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => {
                document.body.removeChild(notification);
                document.head.removeChild(slideInStyle);
            }, 300);
        }, 3000);
    }

    // Easter egg: Konami code
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.toString() === konamiSequence.toString()) {
            // Easter egg activated
            document.body.style.filter = 'hue-rotate(180deg) saturate(2)';
            showNotification('LAGGY MODE ACTIVATED! 🚀');
            
            setTimeout(() => {
                document.body.style.filter = 'none';
            }, 5000);
            
            konamiCode = [];
        }
    });

    // Performance optimization: Debounced scroll handler
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(function() {
            // Add any scroll-based functionality here
            const scrollProgress = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            document.documentElement.style.setProperty('--scroll-progress', scrollProgress + '%');
        }, 16); // ~60fps
    });

    console.log('LAGGY website initialized successfully! 🚀');
});

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
