// Initialize Lucide Icons
lucide.createIcons();

// Preloader Logic
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('hidden');
        // Ensure scrolling is allowed after preloader hides
        document.body.style.overflow = 'auto';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Lock scroll temporarily during preloader
    document.body.style.overflow = 'hidden';

    // 1. Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            const isActive = navMenu.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isActive);
            const icon = isActive ? 'x' : 'menu';
            hamburger.innerHTML = `<i data-lucide="${icon}"></i>`;
            lucide.createIcons();
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.innerHTML = `<i data-lucide="menu"></i>`;
                lucide.createIcons();
            });
        });
    }

    // 2. Sticky Header on Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Scroll Reveal Animations & Stats Counter
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    const animateStats = () => {
        statNumbers.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const duration = 2000;
            const increment = target / (duration / 16); 
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.innerText = target;
                }
            };
            updateCounter();
        });
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Animate stats when they become visible
                if (entry.target.classList.contains('stat-item') && !statsAnimated) {
                    animateStats();
                    statsAnimated = true;
                }
                
                // Unobserve after revealing to prevent repeated animations
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 4. Portfolio Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === category) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // 5. Lightbox Modal
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const zoomBtns = document.querySelectorAll('.project-zoom');

    if (lightbox && lightboxImg && lightboxClose) {
        zoomBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const imgSrc = btn.getAttribute('data-img');
                lightboxImg.src = imgSrc;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden'; 
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        };

        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // 6. Contact Form Mock Submit
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm && formSuccess) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            
            // Show custom success message
            formSuccess.classList.remove('hidden');
            
            // Reset the form inputs
            contactForm.reset();
            
            // Hide the message after a few seconds
            setTimeout(() => {
                formSuccess.classList.add('hidden');
            }, 5000);
        });
    }
});
