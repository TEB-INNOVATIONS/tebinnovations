/**
 * parallax.js - Subtle scroll parallax effect for hero section
 * TEB INNOVATIONS
 */
(function () {
  'use strict';

  var heroSection = document.getElementById('hero');
  if (!heroSection) return;

  window.addEventListener('scroll', function () {
    var scrollY = window.pageYOffset || document.documentElement.scrollTop;
    // Subtle parallax: move background at 40% of scroll speed
    heroSection.style.backgroundPositionY = (scrollY * 0.4) + 'px';
  }, { passive: true });
})();
