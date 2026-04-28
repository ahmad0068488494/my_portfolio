"use strict";

(function initMobileNav() {
  const hamburger = document.getElementById("hamburger");
  const navLinks  = document.getElementById("nav-links");

  if (!hamburger || !navLinks) return;

  function openMenu() {
    navLinks.classList.add("open");
    hamburger.classList.add("open");
    hamburger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden"; // prevent scroll when menu is open
  }

  function closeMenu() {
    navLinks.classList.remove("open");
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  function toggleMenu() {
    navLinks.classList.contains("open") ? closeMenu() : openMenu();
  }

  hamburger.addEventListener("click", toggleMenu);

  // Close when a nav link is clicked
  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  // Close on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });

  // Close if user resizes beyond mobile breakpoint
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 768) closeMenu();
  });
})();


/* ── Active nav link highlight on scroll ── */
(function initActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const links    = document.querySelectorAll(".nav-links a");

  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          links.forEach(function (link) {
            link.classList.remove("active");
            if (link.getAttribute("href") === "#" + entry.target.id) {
              link.classList.add("active");
            }
          });
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });
})();


/* ── Scroll-triggered fade-in for sections ── */
(function initScrollReveal() {
  // Only animate elements that are NOT already handled by CSS fade-in (hero children)
  const revealTargets = document.querySelectorAll(
    "#about, #projects .project-card, #skills .skill-group, #contact .contact-inner"
  );

  if (!revealTargets.length) return;

  // Respect reduced-motion preference
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  // Set initial hidden state
  revealTargets.forEach(function (el) {
    el.style.opacity    = "0";
    el.style.transform  = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });

  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity   = "1";
          entry.target.style.transform = "none";
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  revealTargets.forEach(function (el) {
    revealObserver.observe(el);
  });
})();


/* ── Navbar background intensity on scroll ── */
(function initNavScroll() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  let ticking = false;

  window.addEventListener("scroll", function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        if (window.scrollY > 20) {
          navbar.style.background = "rgba(10,10,15,0.97)";
          navbar.style.boxShadow  = "0 1px 24px rgba(0,0,0,0.4)";
        } else {
          navbar.style.background = "rgba(10,10,15,0.9)";
          navbar.style.boxShadow  = "none";
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();


/* ── Project card keyboard accessibility ── */
(function initProjectCards() {
  document.querySelectorAll(".project-card").forEach(function (card) {
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "article");
  });
})();
