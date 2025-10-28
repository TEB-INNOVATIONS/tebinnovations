// Custom Navbar Scrollspy
// TEB INNOVATIONS - Enhanced Navigation

(function() {
  'use strict';

  // Configuration
  const config = {
    offset: 80, // Offset from top of viewport
    smoothScrollDuration: 800
  };

  // Get all navigation links and sections
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link[href^="#"]');
  const sections = [];

  // Build sections array
  navLinks.forEach(link => {
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      sections.push({
        id: targetId,
        element: targetSection,
        link: link
      });
    }
  });

  // Function to update active nav link
  function updateActiveNavLink() {
    const scrollPosition = window.scrollY + config.offset + 100;

    // Find the current section
    let currentSection = null;

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const sectionTop = section.element.offsetTop;

      if (scrollPosition >= sectionTop) {
        currentSection = section;
        break;
      }
    }

    // Special case: if at very top of page, activate hero/home
    if (window.scrollY < 100) {
      currentSection = sections.find(s => s.id === 'hero');
    }

    // Remove active class from all links
    navLinks.forEach(link => {
      link.classList.remove('active');
    });

    // Add active class to current section link
    if (currentSection && currentSection.link) {
      currentSection.link.classList.add('active');
    }
  }

  // Smooth scroll to section
  function smoothScrollTo(targetElement) {
    const targetPosition = targetElement.offsetTop - 70; // Navbar height offset
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = config.smoothScrollDuration;
    let start = null;

    function animation(currentTime) {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    // Easing function
    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  }

  // Add click handlers to nav links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        e.preventDefault();

        // Close mobile menu if open
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
            toggle: false
          });
          bsCollapse.hide();
        }

        // Smooth scroll to section
        smoothScrollTo(targetSection);

        // Update URL without jumping
        if (history.pushState) {
          history.pushState(null, null, `#${targetId}`);
        }
      }
    });
  });

  // Throttle function for scroll event
  function throttle(func, wait) {
    let timeout;
    let previous = 0;

    return function() {
      const now = Date.now();
      const remaining = wait - (now - previous);

      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        func();
      } else if (!timeout) {
        timeout = setTimeout(() => {
          previous = Date.now();
          timeout = null;
          func();
        }, remaining);
      }
    };
  }

  // Add scroll event listener with throttling
  window.addEventListener('scroll', throttle(updateActiveNavLink, 100), { passive: true });

  // Update on page load
  window.addEventListener('load', updateActiveNavLink);

  // Update on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateActiveNavLink);
  } else {
    updateActiveNavLink();
  }

  // Update on window resize (sections may shift)
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(updateActiveNavLink, 250);
  });

  // Handle hash on page load
  function handleInitialHash() {
    const hash = window.location.hash;
    if (hash) {
      const targetId = hash.substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        setTimeout(() => {
          smoothScrollTo(targetSection);
        }, 100);
      }
    }
  }

  // Initialize hash handling
  handleInitialHash();

  // Navbar background on scroll
  const navbar = document.querySelector('.navbar');
  function updateNavbarBackground() {
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  }

  window.addEventListener('scroll', throttle(updateNavbarBackground, 100), { passive: true });
  updateNavbarBackground();

  // Add hover effect to nav links
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });

    link.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  console.log('✅ Custom Navbar Scrollspy Initialized');

})();
