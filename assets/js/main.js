
AOS.init({
  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 900, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});

// Counter js

    // Initialize PureCounter
    document.addEventListener("DOMContentLoaded", function () {
      new PureCounter();
    });


  //   * Init swiper sliders
  //  */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  // Submit

  function sbt() {
    let button = document.getElementById("sbtid");
    if (button.innerText === "Send Message") {
        button.innerText = "Submitted!";
    } else {
        button.innerText = "Send Message";
    }
}

    // Loding 

    var loader = document.getElementById('preloader');

    window.addEventListener('load', function(){
      loader.style.display = 'none';
    })


    // Nila

     // Function to toggle dark mode
     function toggleDarkMode() {
      document.body.classList.toggle("dark-mode");

      if (document.body.classList.contains("dark-mode")) {
          localStorage.setItem("theme", "dark");
          document.getElementById("darkModeToggle").checked = true;
          document.getElementById("toggleIcon").classList.replace("bi-moon", "bi-sun");
      } else {
          localStorage.setItem("theme", "light");
          document.getElementById("darkModeToggle").checked = false;
          document.getElementById("toggleIcon").classList.replace("bi-sun", "bi-moon");
      }
  }

  // Load theme from localStorage
  window.onload = function () {
      if (localStorage.getItem("theme") === "dark") {
          document.body.classList.add("dark-mode");
          document.getElementById("darkModeToggle").checked = true;
          document.getElementById("toggleIcon").classList.replace("bi-moon", "bi-sun");
      }
  };

  // Event listener
  document.getElementById("darkModeToggle").addEventListener("change", toggleDarkMode);