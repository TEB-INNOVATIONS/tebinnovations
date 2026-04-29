
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

// JSONP wrapper to bypass CORS issues with Blogger's legacy feed
function fetchBloggerFeed(url) {
    return new Promise((resolve, reject) => {
        const callbackName = 'blogger_cb_' + Math.round(100000 * Math.random());
        let script;

        // Timeout fallback after 10 seconds
        const timer = setTimeout(function () {
            if (window[callbackName]) {
                delete window[callbackName];
                if (script && script.parentNode) script.parentNode.removeChild(script);
                reject(new Error('Blogger feed request timed out'));
            }
        }, 10000);

        window[callbackName] = function(data) {
            clearTimeout(timer);
            delete window[callbackName];
            if (script && script.parentNode) script.parentNode.removeChild(script);
            resolve(data);
        };

        script = document.createElement('script');
        // Append callback param correctly (URL may already have '?')
        const separator = url.includes('?') ? '&' : '?';
        script.src = url + separator + 'callback=' + callbackName;
        script.onerror = function() {
            clearTimeout(timer);
            delete window[callbackName];
            if (script && script.parentNode) script.parentNode.removeChild(script);
            reject(new Error('Failed to load Blogger feed'));
        };
        document.body.appendChild(script);
    });
}

// Fetch Latest Blog Posts
async function fetchLatestBlogs() {
    const blogContainer = document.getElementById("blog-container");
    if (!blogContainer) return;

    // Show skeleton loader while fetching
    blogContainer.innerHTML = `
        <div class="col-12 text-center py-4">
            <div class="spinner-border" style="color:#9a0101;" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-2 text-muted">Loading latest posts...</p>
        </div>`;

    // Primary feed URL — uses the JSON-in-script (JSONP) endpoint supported by Blogger
    const feedUrl = 'https://blog.tebinnovations.in/feeds/posts/default?alt=json-in-script&max-results=3';

    try {
        const data = await fetchBloggerFeed(feedUrl);

        // Get the latest 3 posts
        const entries = data.feed.entry || [];
        const latestPosts = entries.slice(0, 3);

        if (latestPosts.length === 0) {
            blogContainer.innerHTML = "<div class='col-12 text-center'><p>No blog posts available at the moment.</p></div>";
            return;
        }

        let htmlContent = "";

        latestPosts.forEach((post, index) => {
            const title = post.title.$t;

            // Extract the original blog URL
            let postUrl = "#";
            if (post.link) {
                post.link.forEach(link => {
                    if (link.rel === "alternate" && link.type === "text/html") {
                        postUrl = link.href;
                    }
                });
            }

            // Extract published date
            const publishedDate = new Date(post.published.$t);
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            const formattedDate = publishedDate.toLocaleDateString('en-US', options);

            // Extract content to get excerpt and image
            const contentHTML = post.content ? post.content.$t : (post.summary ? post.summary.$t : "");

            // Extract image — prefer media$thumbnail (always populated by Blogger)
            let imageUrl = "assets/images/tab.png";
            if (post.media$thumbnail && post.media$thumbnail.url) {
                // Use a larger size by removing size constraints from the URL
                imageUrl = post.media$thumbnail.url.replace(/s72-c|s72-w\d+-h\d+-c/, 's600');
            } else {
                const tempDiv2 = document.createElement("div");
                tempDiv2.innerHTML = contentHTML;
                const imgEl = tempDiv2.querySelector("img");
                if (imgEl) imageUrl = imgEl.src;
            }
            // Extract plain text for excerpt
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = contentHTML;
            const plainText = tempDiv.textContent || tempDiv.innerText || "";
            let excerpt = plainText.trim().substring(0, 100);
            if (plainText.length > 100) excerpt += "...";

            // Delay for animation
            const delay = 150 + (index * 100);

            htmlContent += `
                <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="${delay}">
                    <div class="blog-card">
                        <div class="blog-img-wrapper">
                            <img src="${imageUrl}" class="blog-img" alt="${title}" onerror="this.src='assets/images/tab.png'">
                        </div>
                        <div class="blog-content">
                            <div class="blog-date">
                                <i class="ri-calendar-line"></i> ${formattedDate}
                            </div>
                            <h5 class="blog-title">${title}</h5>
                            <p class="blog-excerpt">${excerpt}</p>
                            <a href="${postUrl}" class="btn-outline-brand" target="_blank">Read More</a>
                        </div>
                    </div>
                </div>
            `;
        });

        blogContainer.innerHTML = htmlContent;

    } catch (error) {
        console.error("Error fetching blog posts:", error);
        blogContainer.innerHTML = `
            <div class='col-12 text-center py-4'>
                <p class='text-muted'>Could not load blog posts right now.</p>
                <a href='https://blog.tebinnovations.in/' target='_blank' class='btn btn-brand mt-2'>Visit Our Blog</a>
            </div>`;
    }
}

// Call the function on DOM content loaded
document.addEventListener("DOMContentLoaded", function() {
    fetchLatestBlogs();
});
