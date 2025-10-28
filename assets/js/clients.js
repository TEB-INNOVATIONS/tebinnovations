// Enhanced Clients Section Interactions
// TEB INNOVATIONS - Interactive Client Cards

(function() {
  'use strict';

  // Add tilt effect on mouse move
  function initClientCardTilt() {
    const clientCards = document.querySelectorAll('.client-card');

    clientCards.forEach(card => {
      const cardInner = card.querySelector('.client-card-inner');

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        cardInner.style.transform = `
          perspective(1000px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          scale(1.05)
        `;
      });

      card.addEventListener('mouseleave', () => {
        cardInner.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
      });
    });
  }

  // Add click to enlarge effect
  function initClientCardClick() {
    const clientCards = document.querySelectorAll('.client-card');

    clientCards.forEach((card, index) => {
      card.addEventListener('click', function() {
        // Remove active class from all cards
        clientCards.forEach(c => c.classList.remove('active-client'));

        // Add active class to clicked card
        this.classList.add('active-client');

        // Optional: Add pulse animation
        const cardFront = this.querySelector('.client-card-front');
        cardFront.style.animation = 'pulse-glow 0.6s ease';

        setTimeout(() => {
          cardFront.style.animation = '';
        }, 600);
      });
    });
  }

  // Staggered reveal animation on scroll
  function initScrollReveal() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, index * 50);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const clientCards = document.querySelectorAll('.client-card');
    clientCards.forEach(card => {
      card.classList.add('hidden-card');
      observer.observe(card);
    });
  }

  // Magnetic effect for client cards
  function initMagneticEffect() {
    const clientCards = document.querySelectorAll('.client-card');

    clientCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const moveX = x * 0.1;
        const moveY = y * 0.1;

        card.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translate(0, 0)';
      });
    });
  }

  // Particle effect on hover
  function createParticle(x, y, container) {
    const particle = document.createElement('div');
    particle.className = 'client-particle';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    container.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 1000);
  }

  function initParticleEffect() {
    const clientCards = document.querySelectorAll('.client-card');

    clientCards.forEach(card => {
      let particleInterval;

      card.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        particleInterval = setInterval(() => {
          const x = Math.random() * rect.width;
          const y = Math.random() * rect.height;
          createParticle(x, y, this);
        }, 200);
      });

      card.addEventListener('mouseleave', function() {
        clearInterval(particleInterval);
      });
    });
  }

  // Add active client indicator
  function addActiveStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .client-card.hidden-card {
        opacity: 0;
        transform: translateY(30px) scale(0.9);
      }

      .client-card.revealed {
        opacity: 1;
        transform: translateY(0) scale(1);
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .client-card.active-client .client-card-front {
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 25px 70px rgba(154, 1, 1, 0.35) !important;
      }

      .client-particle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(154, 1, 1, 0.6);
        border-radius: 50%;
        pointer-events: none;
        animation: particle-rise 1s ease-out forwards;
        z-index: 10;
      }

      @keyframes particle-rise {
        0% {
          transform: translateY(0) scale(1);
          opacity: 1;
        }
        100% {
          transform: translateY(-50px) scale(0);
          opacity: 0;
        }
      }

      @keyframes pulse-glow {
        0%, 100% {
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        }
        50% {
          box-shadow: 0 20px 60px rgba(154, 1, 1, 0.4);
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Initialize all effects
  function init() {
    // Check if clients section exists
    const clientsSection = document.querySelector('#clients');
    if (!clientsSection) return;

    addActiveStyles();

    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        initClientCardTilt();
        initClientCardClick();
        initScrollReveal();
        // Optional effects - comment out if too much
        // initMagneticEffect();
        // initParticleEffect();
      });
    } else {
      initClientCardTilt();
      initClientCardClick();
      initScrollReveal();
      // Optional effects - comment out if too much
      // initMagneticEffect();
      // initParticleEffect();
    }
  }

  // Run initialization
  init();

})();
