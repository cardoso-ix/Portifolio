(function () {
  'use strict';

  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.header__link');
  const fadeElements = document.querySelectorAll('.fade-in');
  const yearEl = document.getElementById('year');
  const typingEl = document.getElementById('typing-text');
  const themeToggle = document.getElementById('theme-toggle');
  const THEME_KEY = 'portfolio-theme';
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  const THEME_COLORS = { dark: '#111211', light: '#f3f4f1' };

  const TYPING_PHRASES = [
    'Suporte técnico em tech / IA',
    'Implementação com n8n e OpenAI',
    'Help Desk · diagnóstico · setup',
    'APIs · Webhooks · automações',
    'Buscando vaga CLT'
  ];

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const heroSection = document.getElementById('inicio');

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ===== Theme toggle ===== */
  function getTheme() {
    return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  function updateThemeToggleState(theme) {
    if (!themeToggle) {
      return;
    }

    themeToggle.setAttribute(
      'aria-label',
      theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'
    );
    themeToggle.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);

    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', THEME_COLORS[theme] || THEME_COLORS.dark);
    }

    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {}

    updateThemeToggleState(theme);
    document.dispatchEvent(new CustomEvent('themechange', { detail: { theme: theme } }));
  }

  if (themeToggle) {
    updateThemeToggleState(getTheme());

    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', THEME_COLORS[getTheme()] || THEME_COLORS.dark);
    }

    themeToggle.addEventListener('click', function () {
      setTheme(getTheme() === 'light' ? 'dark' : 'light');
    });
  }

  /* ===== Contact email ===== */
  const contactEmail = document.getElementById('contact-email');

  function showEmailCopiedToast() {
    const existing = document.getElementById('email-toast');
    if (existing) {
      existing.remove();
    }

    const toast = document.createElement('p');
    toast.id = 'email-toast';
    toast.className = 'contact-toast';
    toast.setAttribute('role', 'status');
    toast.textContent = 'E-mail copiado para a área de transferência.';
    document.body.appendChild(toast);

    if (!prefersReducedMotion) {
      requestAnimationFrame(function () {
        toast.classList.add('is-visible');
      });
    } else {
      toast.classList.add('is-visible');
    }

    window.setTimeout(function () {
      if (prefersReducedMotion) {
        toast.remove();
        return;
      }

      toast.classList.remove('is-visible');
      window.setTimeout(function () {
        toast.remove();
      }, 260);
    }, 2600);
  }

  if (contactEmail) {
    contactEmail.addEventListener('click', function () {
      const email = contactEmail.getAttribute('data-email');
      if (!email || !navigator.clipboard) {
        return;
      }

      navigator.clipboard.writeText(email).then(showEmailCopiedToast).catch(function () {});
    });
  }

  /* ===== Menu ===== */
  function closeMenu() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Abrir menu');
  }

  function openMenu() {
    navToggle.classList.add('active');
    navMenu.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Fechar menu');
  }

  navToggle.addEventListener('click', function () {
    if (navMenu.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closeMenu();
    });
  });

  document.addEventListener('click', function (e) {
    if (
      navMenu.classList.contains('open') &&
      !navMenu.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      closeMenu();
    }
  });

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const headerHeight = header.offsetHeight;
          const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      }
    });
  });

  /* ===== Scroll effects ===== */
  const sections = document.querySelectorAll('section[id]');

  let scrollTicking = false;

  function onScroll() {
    if (scrollTicking) {
      return;
    }

    scrollTicking = true;

    requestAnimationFrame(function () {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      const scrollPos = window.scrollY + 100;

      sections.forEach(function (section) {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('active');
            }
          });
        }
      });

      scrollTicking = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ===== Typing effect ===== */
  if (typingEl) {
    if (prefersReducedMotion) {
      typingEl.textContent = TYPING_PHRASES[0];
    } else {
      let phraseIndex = 0;
      let charIndex = 0;
      let isDeleting = false;

      function type() {
        const current = TYPING_PHRASES[phraseIndex];

        if (isDeleting) {
          typingEl.textContent = current.substring(0, charIndex - 1);
          charIndex--;
        } else {
          typingEl.textContent = current.substring(0, charIndex + 1);
          charIndex++;
        }

        let delay = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === current.length) {
          delay = 2000;
          isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % TYPING_PHRASES.length;
          delay = 500;
        }

        setTimeout(type, delay);
      }

      type();
    }
  }

  /* ===== Hero ready (ring spin) ===== */
  if (heroSection) {
    heroSection.classList.add('hero--ready');
  }

  /* ===== Intersection Observer ===== */
  function revealIfVisible(element) {
    const rect = element.getBoundingClientRect();
    const viewHeight = window.innerHeight || document.documentElement.clientHeight;

    if (rect.top < viewHeight * 0.92 && rect.bottom > 0) {
      element.classList.add('visible');
      return true;
    }

    return false;
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' }
    );

    fadeElements.forEach(function (el) {
      if (!revealIfVisible(el)) {
        observer.observe(el);
      }
    });
  } else {
    fadeElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ===== Experience archive toggle ===== */
  const timelineToggle = document.getElementById('timeline-toggle');
  const timelineArchive = document.getElementById('timeline-archive');

  if (timelineToggle && timelineArchive) {
    const timelineToggleLabel = timelineToggle.querySelector('.timeline__toggle-label');

    timelineToggle.addEventListener('click', function () {
      const expanded = timelineToggle.getAttribute('aria-expanded') === 'true';
      const nextExpanded = !expanded;

      timelineToggle.setAttribute('aria-expanded', nextExpanded ? 'true' : 'false');
      timelineArchive.setAttribute('aria-hidden', nextExpanded ? 'false' : 'true');
      timelineArchive.classList.toggle('is-open', nextExpanded);

      if (timelineToggleLabel) {
        timelineToggleLabel.textContent = nextExpanded ? 'Ocultar histórico' : 'Ver histórico completo';
      }
    });
  }
})();
