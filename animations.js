// =====================
// Smooth animations and interactions for Somali Community Care website
// Inspired by modern web animation patterns
// =====================

document.addEventListener('DOMContentLoaded', function() {
  
  // =====================
  // Intersection Observer for scroll-triggered animations
  // =====================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        // Add staggered delay for grid items
        if (entry.target.parentElement.classList.contains('services') || 
            entry.target.parentElement.classList.contains('jobs')) {
          const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
          entry.target.style.animationDelay = `${index * 0.1}s`;
        }
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all cards and sections for scroll animations
  const animateElements = document.querySelectorAll('.card:not(.soft), .section h2, .section .lead');
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    observer.observe(el);
  });

  // =====================
  // Enhanced hover effects for cards
  // =====================
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    // Add ripple effect on click
    card.addEventListener('click', function(e) {
      if (e.target.tagName === 'A' || e.target.closest('a')) return;
      
      const ripple = document.createElement('div');
      const rect = card.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      card.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });

    // Parallax-like effect on mouse move
    card.addEventListener('mousemove', function(e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;
      
      card.style.transform = `translateY(-5px) rotateX(${deltaY * 2}deg) rotateY(${deltaX * 2}deg)`;
    });

    card.addEventListener('mouseleave', function() {
      card.style.transform = '';
    });
  });

  // =====================
  // Smooth scroll for anchor links
  // =====================
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

  // =====================
  // Loading animation for forms
  // =====================
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
      if (submitBtn) {
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<span class="loading"></span> Sending...';
        submitBtn.disabled = true;
        
        // In a real application, you would handle the form submission here
        // For demo purposes, we'll just reset after 2 seconds
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 2000);
      }
    });
  });

  // =====================
  // Animated counter for statistics (if any)
  // =====================
  function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      element.textContent = value;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  // =====================
  // Enhanced CTA button interactions
  // =====================
  const ctaButtons = document.querySelectorAll('.cta');
  ctaButtons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px) scale(1.02)';
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });

    // Add click animation
    btn.addEventListener('click', function(e) {
      this.style.transform = 'translateY(0) scale(0.98)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });
  });

  // =====================
  // Navigation active state management
  // =====================
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage || 
        (currentPage === '' && link.getAttribute('href') === 'index.html')) {
      link.classList.add('active');
    }
  });

  // =====================
  // Typing animation for hero text (optional)
  // =====================
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle && heroTitle.textContent.length > 0) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.borderRight = '2px solid var(--brand)';
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      } else {
        // Remove cursor after typing is done
        setTimeout(() => {
          heroTitle.style.borderRight = 'none';
        }, 1000);
      }
    };
    
    // Start typing animation after a short delay
    setTimeout(typeWriter, 800);
  }

  // =====================
  // Scroll progress indicator
  // =====================
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--brand), var(--brand-2));
    z-index: 9999;
    transition: width 0.1s ease;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = scrolled + '%';
  });

  // =====================
  // Add ripple effect styles
  // =====================
  const rippleStyles = document.createElement('style');
  rippleStyles.textContent = `
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(4, 99, 250, 0.3);
      transform: scale(0);
      animation: ripple-animation 0.6s linear;
      pointer-events: none;
    }
    
    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(rippleStyles);

  console.log('🎉 Somali Community Care website animations loaded successfully!');
});

// =====================
// Utility functions
// =====================

// Debounce function for scroll events
function debounce(func, wait, immediate) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
}

// Random number generator for effects
function random(min, max) {
  return Math.random() * (max - min) + min;
}