document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const menuToggle = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
        
        // Toggle aria-expanded attribute for accessibility
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        navList.setAttribute('aria-hidden', isExpanded);
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navList.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            navList.setAttribute('aria-hidden', 'true');
        });
    });
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate the scroll position accounting for navbar height
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    location.hash = targetId;
                }
            }
        });
    });
    
    // Form validation and submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validation
            if (!name || !email || !message) {
                showAlert('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showAlert('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            simulateFormSubmission(name, email, message);
        });
    }
    
    // Resume button functionality
    const resumeBtn = document.getElementById('resume-btn');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // In a real implementation, this would download the resume
            showAlert('Downloading resume... (this is a demo)', 'success');
            // window.open('path/to/resume.pdf', '_blank');
        });
    }
    
    // Animate skill bars when they come into view
    const skillItems = document.querySelectorAll('.skill-item');
    if (skillItems.length > 0) {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillLevel = entry.target.querySelector('.skill-level');
                    const width = skillLevel.getAttribute('data-width');
                    skillLevel.style.width = width;
                    skillObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        skillItems.forEach(item => {
            const skillLevel = item.querySelector('.skill-level');
            const width = skillLevel.style.width;
            skillLevel.style.width = '0';
            skillLevel.setAttribute('data-width', width);
            skillObserver.observe(item);
        });
    }
    
    // Helper function for email validation
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Show alert message
    function showAlert(message, type = 'success') {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert ${type}`;
        alertDiv.textContent = message;
        alertDiv.setAttribute('role', 'alert');
        
        // Add to body
        document.body.appendChild(alertDiv);
        
        // Remove after 5 seconds
        setTimeout(() => {
            alertDiv.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(alertDiv);
            }, 300);
        }, 5000);
    }
    
    // Simulate form submission
    function simulateFormSubmission(name, email, message) {
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate network request
        setTimeout(() => {
            // Reset form
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            showAlert('Thank you for your message! I will get back to you soon.', 'success');
        }, 1500);
    }
    
    // Initialize animations on page load
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});