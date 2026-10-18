// =====================
// MOBILE MENU TOGGLE
// =====================
const mobileToggle = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-nav-link');

// Toggle menu on button click
mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Close menu when a link is clicked
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.mobile-menu-toggle') && 
        !e.target.closest('.mobile-menu')) {
        mobileToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
});

// =====================
// FAQ ACCORDION
// =====================
const faqDetails = document.querySelectorAll('.faq-item');

faqDetails.forEach(detail => {
    detail.addEventListener('toggle', () => {
        // Close other details when one opens (optional: comment out for multiple open)
        // Uncomment the following 5 lines to only allow one FAQ open at a time:
        /*
        if (detail.open) {
            faqDetails.forEach(other => {
                if (other !== detail) other.open = false;
            });
        }
        */
    });
});

// =====================
// FORM HANDLING
// =====================
const estimateForm = document.getElementById('estimateForm');

if (estimateForm) {
    estimateForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(estimateForm);
        const data = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            service: formData.get('service'),
            details: formData.get('details'),
            timestamp: new Date().toLocaleString()
        };

        // Validate phone number
        const phoneRegex = /^\d{10}$|^\+1\d{10}$/;
        const cleanPhone = formData.get('phone').replace(/\D/g, '');
        
        if (cleanPhone.length !== 10) {
            alert('Please enter a valid 10-digit phone number');
            return;
        }

        // Here you would typically send the data to a backend
        // For now, we'll show a success message
        console.log('Form submission:', data);
        
        // Show success feedback
        const submitButton = estimateForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = '✓ Request Received!';
        submitButton.disabled = true;
        submitButton.style.background = '#10b981';
        
        // Reset form
        estimateForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.style.background = '';
        }, 3000);

        // Optional: Show alert to user
        alert('Thank you! We\'ll contact you soon at ' + formData.get('phone') + '. A team member will reach out within 24 hours.');
    });
}

// =====================
// STICKY HEADER SHADOW
// =====================
const header = document.getElementById('header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 10) {
        header.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// =====================
// SMOOTH SCROLL OFFSET FOR FIXED HEADER
// =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#" or empty
        if (href === '#') return;
        
        e.preventDefault();
        
        const target = document.querySelector(href);
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// =====================
// LAZY LOAD IMAGES (Optional Enhancement)
// =====================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// =====================
// PHONE NUMBER FORMATTING
// =====================
const phoneInput = document.getElementById('phone');

if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 0) {
            if (value.length <= 3) {
                value = value;
            } else if (value.length <= 6) {
                value = value.slice(0, 3) + '-' + value.slice(3);
            } else {
                value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 10);
            }
        }
        
        e.target.value = value;
    });
}

// =====================
// ACTIVE NAV LINK HIGHLIGHTING
// =====================
const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

function updateActiveLink() {
    const scrollPosition = window.scrollY + 100;
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        if (!href || href === '#') return;
        
        const section = document.querySelector(href);
        if (!section) return;
        
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

// =====================
// FORM VALIDATION (Client-side)
// =====================
const nameInput = document.getElementById('name');
const serviceSelect = document.getElementById('service');

if (nameInput) {
    nameInput.addEventListener('blur', (e) => {
        if (e.target.value.trim().length < 2) {
            e.target.style.borderColor = '#ef4444';
        } else {
            e.target.style.borderColor = '';
        }
    });
}

// =====================
// PAGE LOAD ANIMATION TRIGGER
// =====================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Initial opacity for smooth fade-in
document.body.style.opacity = '0.95';

// =====================
// UTILITY: Get Query Parameters
// =====================
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// If "service" is in URL, pre-fill the form
const serviceParam = getQueryParam('service');
if (serviceParam && serviceSelect) {
    serviceSelect.value = serviceParam;
}

// =====================
// CALL TRACKING (Optional)
// =====================
// This logs when phone numbers are clicked (useful for analytics)
const phoneLinks = document.querySelectorAll('a[href^="tel:"]');

phoneLinks.forEach(link => {
    link.addEventListener('click', () => {
        // You could send this data to your analytics service
        console.log('Phone number clicked:', link.textContent);
        // Example with Google Analytics:
        // gtag('event', 'phone_call', {
        //     'phone_number': link.href.replace('tel:', '')
        // });
    });
});

// =====================
// PERFORMANCE: Preload Critical Images
// =====================
function preloadImage(src) {
    const img = new Image();
    img.src = src;
}

// Preload icons and critical assets if needed
// preloadImage('/images/logo.png');

// =====================
// ACCESSIBILITY: Skip to Main Content
// =====================
// This is handled via semantic HTML and keyboard navigation
// Ensure proper heading hierarchy and ARIA labels are in place

console.log('✓ Speck Plumbing website loaded successfully');