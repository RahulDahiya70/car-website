// ===== Car Website Interactive Script =====

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all interactive features
    initPreloader();
    initNavbar();
    initScrollEffects();
    initCarFilters();
    initStatsCounter();
    initTestDriveForm();
    initContactForm();
    initSmoothScroll();
    initCarConfig();
    initColorPicker();
    initInteriorView();
});

// ===== Preloader - Fixed to actually hide after loading =====
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    
    // Hide preloader after page fully loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('loaded');
            // Remove preloader from DOM after animation
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 500); // Small delay for smooth transition
    });
    
    // Fallback - hide after 3 seconds max
    setTimeout(() => {
        preloader.classList.add('loaded');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 3000);
}

// ===== Navbar Scroll Effect =====
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// ===== Scroll Effects =====
function initScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.car-card, .feature-card, .contact-item').forEach(el => {
        observer.observe(el);
    });
}

// ===== Car Filters =====
function initCarFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const carCards = document.querySelectorAll('.car-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            carCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
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

// ===== Stats Counter Animation =====
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let started = false;

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !started) {
                started = true;
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.dataset.count);
                    animateCounter(stat, target);
                });
            }
        });
    }, observerOptions);

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// ===== Test Drive Form =====
function initTestDriveForm() {
    const form = document.querySelector('.test-drive-form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Show success message
            alert(`Thank you for booking a test drive! We will contact you at ${data.email} shortly.`);
            
            // Reset form
            form.reset();
        });
    }
}

// ===== Contact Form =====
function initContactForm() {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Show success message
            alert(`Thank you for contacting us, ${data.name}! We will respond to your message soon.`);
            
            // Reset form
            form.reset();
        });
    }
}

// ===== Smooth Scroll =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== Car Configuration Modal =====
function initCarConfig() {
    const modal = document.getElementById('carConfigModal');
    const closeBtn = document.querySelector('.modal-close');
    const configureBtns = document.querySelectorAll('.btn-details');
    
    // Open modal when Configure button is clicked
    configureBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const carCard = e.target.closest('.car-card');
            const carName = carCard.querySelector('h3').textContent;
            const carImage = carCard.querySelector('.car-card-image img').src;
            const carPrice = carCard.querySelector('.price').textContent;
            
            // Populate modal with car details
            document.getElementById('modalCarName').textContent = carName;
            document.getElementById('modalCarImage').src = carImage;
            document.getElementById('modalCarPrice').textContent = carPrice;
            
            // Reset to exterior view
            document.querySelectorAll('.view-toggle-btn').forEach(b => b.classList.remove('active'));
            document.querySelector('.view-toggle-btn[data-view="exterior"]').classList.add('active');
            document.getElementById('exteriorView').style.display = 'block';
            document.getElementById('interiorView').style.display = 'none';
            
            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// ===== Color Picker - Handles both Modal and Car Cards =====
function initColorPicker() {
    // Modal color pickers
    const exteriorColors = document.querySelectorAll('.exterior-color');
    const interiorColors = document.querySelectorAll('.interior-color');
    
    // Exterior color selection in modal
    exteriorColors.forEach(color => {
        color.addEventListener('click', () => {
            exteriorColors.forEach(c => c.classList.remove('active'));
            color.classList.add('active');
            
            const colorValue = color.dataset.color;
            const carImage = document.getElementById('modalCarImage');
            
            applyCarColor(carImage, colorValue);
            
            // Update selected color text
            if (document.getElementById('selectedExteriorColor')) {
                document.getElementById('selectedExteriorColor').textContent = color.dataset.name || 'Custom';
            }
        });
    });
    
    // Interior color selection in modal
    interiorColors.forEach(color => {
        color.addEventListener('click', () => {
            interiorColors.forEach(c => c.classList.remove('active'));
            color.classList.add('active');
            
            const colorValue = color.dataset.color;
            const interiorImage = document.getElementById('interiorImage');
            
            applyInteriorColor(interiorImage, colorValue);
            
            // Update selected color text
            if (document.getElementById('selectedInteriorColor')) {
                document.getElementById('selectedInteriorColor').textContent = color.dataset.name || 'Custom';
            }
        });
    });
    
    // Color dots on car cards
    const colorDots = document.querySelectorAll('.color-dot');
    
    colorDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const carCard = e.target.closest('.car-card');
            const carImage = carCard.querySelector('.car-card-image img');
            
            const cardDots = carCard.querySelectorAll('.color-dot');
            cardDots.forEach(d => d.classList.remove('active'));
            
            e.target.classList.add('active');
            
            const color = e.target.style.background;
            applyCarColor(carImage, rgbToHex(color));
        });
    });
}

function applyCarColor(img, color) {
    if (!img) return;
    
    img.style.filter = 'none';
    
    switch(color) {
        case '#ff4d00':
            img.style.filter = 'sepia(1) saturate(3) hue-rotate(-10deg)';
            break;
        case '#1a1a1a':
            img.style.filter = 'brightness(0.7) contrast(1.2)';
            break;
        case '#ffffff':
            img.style.filter = 'brightness(1.1) saturate(0.9)';
            break;
        case '#0066ff':
            img.style.filter = 'sepia(1) saturate(2) hue-rotate(180deg)';
            break;
        case '#c0c0c0':
            img.style.filter = 'brightness(1.05) saturate(0.8)';
            break;
        case '#228b22':
            img.style.filter = 'sepia(1) saturate(2) hue-rotate(70deg)';
            break;
        case '#00ff88':
            img.style.filter = 'sepia(1) saturate(3) hue-rotate(80deg)';
            break;
        case '#ff0000':
            img.style.filter = 'sepia(1) saturate(4) hue-rotate(-20deg)';
            break;
        case '#ffd700':
            img.style.filter = 'sepia(1) saturate(2) hue-rotate(10deg)';
            break;
        case '#000080':
            img.style.filter = 'sepia(1) saturate(2) hue-rotate(190deg)';
            break;
        case '#8b4513':
            img.style.filter = 'sepia(0.5) brightness(0.8)';
            break;
    }
}

function applyInteriorColor(img, color) {
    if (!img) return;
    
    img.style.filter = 'none';
    
    switch(color) {
        case '#1a1a1a':
            img.style.filter = 'brightness(0.6) contrast(1.1)';
            break;
        case '#c0c0c0':
            img.style.filter = 'grayscale(0.3) brightness(0.9)';
            break;
        case '#8b4513':
            img.style.filter = 'sepia(0.5) brightness(0.8)';
            break;
        case '#ffffff':
            img.style.filter = 'brightness(1.15) saturate(0.8)';
            break;
        case '#ff4d00':
            img.style.filter = 'sepia(0.3) saturate(1.5) hue-rotate(-20deg)';
            break;
    }
}

// ===== Interior View Toggle =====
function initInteriorView() {
    const viewButtons = document.querySelectorAll('.view-toggle-btn');
    const exteriorView = document.getElementById('exteriorView');
    const interiorView = document.getElementById('interiorView');
    
    viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            viewButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const view = btn.dataset.view;
            
            if (view === 'exterior') {
                if (exteriorView) exteriorView.style.display = 'block';
                if (interiorView) interiorView.style.display = 'none';
            } else if (view === 'interior') {
                if (exteriorView) exteriorView.style.display = 'none';
                if (interiorView) interiorView.style.display = 'block';
            }
        });
    });
}

// Helper function to convert RGB to Hex
function rgbToHex(rgb) {
    if (rgb.startsWith('#')) return rgb;
    
    const rgbValues = rgb.match(/\d+/g);
    if (!rgbValues) return '#000000';
    
    return '#' + rgbValues.map(x => {
        const hex = parseInt(x).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('');
}

// ===== Mobile Menu Toggle =====
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '70px';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'rgba(10, 10, 10, 0.98)';
        navLinks.style.padding = '20px';
        navLinks.style.gap = '20px';
    });
}

// ===== Search Button =====
const searchBtn = document.querySelector('.search-btn');

if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        const searchTerm = prompt('Search for a car model:');
        if (searchTerm) {
            // Filter cars based on search
            const carCards = document.querySelectorAll('.car-card');
            carCards.forEach(card => {
                const carName = card.querySelector('h3').textContent.toLowerCase();
                if (carName.includes(searchTerm.toLowerCase())) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }
    });
}

// ===== Newsletter Form =====
const newsletterForm = document.querySelector('.footer-newsletter form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        alert(`Thank you for subscribing with ${email}!`);
        newsletterForm.querySelector('input').value = '';
    });
}

// ===== Car Card Hover Effect =====
const carCards = document.querySelectorAll('.car-card');

carCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.zIndex = '1';
    });
});

// ===== Button Details Click =====
// This is now handled by initCarConfig()

console.log('AutoVeloce Website Loaded Successfully!');
