/**
 * PORTFÓLIO — EDUARDO CARDOSO
 * JavaScript Vanilla (Clean, Accessible, Performant)
 */

(function () {
  'use strict';

  // DOM Elements
  const header = document.getElementById('header');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.header__link');
  const internalAnchors = document.querySelectorAll('a[href^="#"]');
  const yearEl = document.getElementById('year');
  const typingEl = document.getElementById('typing-text');
  const themeToggle = document.getElementById('theme-toggle');
  const contactEmailBtn = document.getElementById('contact-email');
  const timelineToggle = document.getElementById('timeline-toggle');
  const timelineArchive = document.getElementById('timeline-archive');
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');

  // Constants
  const THEME_KEY = 'portfolio-theme';
  const THEME_COLORS = { dark: '#0e0f0e', light: '#f6f7f3' };

  const TYPING_PHRASES = [
    'Suporte técnico e automações',
    'Implementação com n8n e OpenAI',
    'Diagnóstico · setup · integrações',
    'APIs REST · Webhooks · IA aplicada',
    'Pós Tech em Agentes de IA (FIAP)'
  ];

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ===== 1. Ano Dinâmico no Footer ===== */
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ===== 2. Tema Claro / Escuro ===== */
  function getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);

    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', THEME_COLORS[theme] || THEME_COLORS.dark);
    }

    if (themeToggle) {
      themeToggle.setAttribute(
        'aria-label',
        theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'
      );
      themeToggle.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
    }

    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {}

    document.dispatchEvent(new CustomEvent('themechange', { detail: { theme: theme } }));
  }

  if (themeToggle) {
    // Inicializar estado do botão
    const initialTheme = getCurrentTheme();
    themeToggle.setAttribute('aria-pressed', initialTheme === 'light' ? 'true' : 'false');

    themeToggle.addEventListener('click', function () {
      const nextTheme = getCurrentTheme() === 'light' ? 'dark' : 'light';
      applyTheme(nextTheme);
    });
  }

  /* ===== 3. Menu Mobile Acessível ===== */
  function openMobileMenu() {
    if (!navToggle || !navMenu) return;
    navToggle.classList.add('active');
    navMenu.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Fechar menu de navegação');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (!navToggle || !navMenu) return;
    navToggle.classList.remove('active');
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Abrir menu de navegação');
    document.body.style.overflow = '';
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      if (navMenu.classList.contains('open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Fechar ao clicar fora do menu
    document.addEventListener('click', function (e) {
      if (
        navMenu.classList.contains('open') &&
        !navMenu.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        closeMobileMenu();
      }
    });

    // Fechar via tecla Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeMobileMenu();
        navToggle.focus();
      }
    });

    // Fechar ao redimensionar para tela desktop (> 768px)
    window.addEventListener('resize', function () {
      if (window.innerWidth > 768 && navMenu.classList.contains('open')) {
        closeMobileMenu();
      }
    });
  }

  /* ===== 4. Navegação Suave Universal e Offset do Header ===== */
  internalAnchors.forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = anchor.getAttribute('href');
      if (!href || !href.startsWith('#') || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      closeMobileMenu();

      const headerHeight = header ? header.offsetHeight : 68;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });

      // Acessibilidade: mover foco para o destino
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });

  /* ===== 5. ScrollSpy e Efeito no Header ===== */
  const trackedSections = document.querySelectorAll('section[id]');
  let scrollTicking = false;

  function updateScrollState() {
    const scrollY = window.scrollY;

    // Header scrolled shadow
    if (header) {
      if (scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Identificar seção ativa
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const isAtBottom = scrollY + windowHeight >= documentHeight - 50;

    let currentSectionId = '';

    if (isAtBottom && trackedSections.length > 0) {
      currentSectionId = trackedSections[trackedSections.length - 1].getAttribute('id');
    } else {
      const headerOffset = (header ? header.offsetHeight : 68) + 80;
      trackedSections.forEach(function (section) {
        const top = section.getBoundingClientRect().top + scrollY - headerOffset;
        const height = section.offsetHeight;
        if (scrollY >= top && scrollY < top + height) {
          currentSectionId = section.getAttribute('id');
        }
      });
    }

    navLinks.forEach(function (link) {
      const linkHref = link.getAttribute('href');
      if (linkHref === '#' + currentSectionId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    scrollTicking = false;
  }

  window.addEventListener('scroll', function () {
    if (!scrollTicking) {
      scrollTicking = true;
      requestAnimationFrame(updateScrollState);
    }
  }, { passive: true });

  updateScrollState();

  /* ===== 6. Efeito de Digitação (Typing Effect) ===== */
  if (typingEl) {
    if (prefersReducedMotion) {
      typingEl.textContent = TYPING_PHRASES[0];
    } else {
      let phraseIdx = 0;
      let charIdx = 0;
      let isDeleting = false;

      function runTypingLoop() {
        const currentPhrase = TYPING_PHRASES[phraseIdx];

        if (isDeleting) {
          typingEl.textContent = currentPhrase.substring(0, charIdx - 1);
          charIdx--;
        } else {
          typingEl.textContent = currentPhrase.substring(0, charIdx + 1);
          charIdx++;
        }

        let stepDelay = isDeleting ? 38 : 75;

        if (!isDeleting && charIdx === currentPhrase.length) {
          stepDelay = 2200; // pausa ao terminar a frase
          isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
          isDeleting = false;
          phraseIdx = (phraseIdx + 1) % TYPING_PHRASES.length;
          stepDelay = 450;
        }

        setTimeout(runTypingLoop, stepDelay);
      }

      runTypingLoop();
    }
  }

  /* ===== 7. Intersection Observer (Fade-In) ===== */
  const fadeElements = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const fadeObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    fadeElements.forEach(function (el) {
      fadeObserver.observe(el);
    });
  } else {
    fadeElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ===== 8. Histórico Profissional (Timeline Accordion) ===== */
  if (timelineToggle && timelineArchive) {
    const toggleLabel = timelineToggle.querySelector('.timeline__toggle-label');

    timelineToggle.addEventListener('click', function () {
      const isExpanded = timelineToggle.getAttribute('aria-expanded') === 'true';
      const nextExpanded = !isExpanded;

      timelineToggle.setAttribute('aria-expanded', nextExpanded ? 'true' : 'false');
      timelineArchive.setAttribute('aria-hidden', nextExpanded ? 'false' : 'true');
      timelineArchive.classList.toggle('is-open', nextExpanded);

      if (toggleLabel) {
        toggleLabel.textContent = nextExpanded ? 'Ocultar histórico' : 'Ver histórico completo';
      }
    });
  }

  /* ===== 9. Botão Interativo de Copiar E-mail ===== */
  if (contactEmailBtn) {
    const originalText = contactEmailBtn.querySelector('.contact__chip-text')?.textContent || 'Copiar E-mail';
    let copyTimeout = null;

    function showEmailToast(message) {
      const existingToast = document.getElementById('email-toast');
      if (existingToast) existingToast.remove();

      const toast = document.createElement('div');
      toast.id = 'email-toast';
      toast.className = 'contact-toast';
      toast.setAttribute('role', 'status');
      toast.innerHTML = `
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>${message}</span>
      `;
      document.body.appendChild(toast);

      requestAnimationFrame(function () {
        toast.classList.add('is-visible');
      });

      setTimeout(function () {
        toast.classList.remove('is-visible');
        setTimeout(function () {
          toast.remove();
        }, 300);
      }, 2800);
    }

    contactEmailBtn.addEventListener('click', function () {
      const email = contactEmailBtn.getAttribute('data-email');
      if (!email) return;

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(function () {
          const textSpan = contactEmailBtn.querySelector('.contact__chip-text');
          contactEmailBtn.classList.add('contact__chip--copied');
          if (textSpan) textSpan.textContent = '✓ E-mail Copiado!';

          showEmailToast('E-mail copiado para a área de transferência!');

          clearTimeout(copyTimeout);
          copyTimeout = setTimeout(function () {
            contactEmailBtn.classList.remove('contact__chip--copied');
            if (textSpan) textSpan.textContent = originalText;
          }, 2600);
        }).catch(function () {
          window.location.href = 'mailto:' + email;
        });
      } else {
        window.location.href = 'mailto:' + email;
      }
    });
  }

})();
