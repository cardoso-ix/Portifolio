/* Portfólio Eduardo Cardoso: menu, tema, copiar e-mail e link ativo. Sem dependências. */
(function () {
  'use strict';

  var root = document.documentElement;

  // Tema claro/escuro
  var themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('portfolio-theme', next); } catch (e) { /* sem storage */ }
    });
  }

  // Menu no celular
  var nav = document.getElementById('nav');
  var navToggle = document.getElementById('nav-toggle');
  function closeNav() {
    if (!nav) return;
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Abrir menu');
  }
  if (nav && navToggle) {
    navToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeNav();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });
  }

  // Copiar e-mail
  var toast = document.getElementById('toast');
  var toastTimer;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('is-visible'); }, 2200);
  }
  var copyBtn = document.getElementById('copy-email');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var email = copyBtn.getAttribute('data-email');
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(
          function () { showToast('E-mail copiado'); },
          function () { window.location.href = 'mailto:' + email; }
        );
      } else {
        window.location.href = 'mailto:' + email;
      }
    });
  }

  // Ano no rodapé
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  // Link ativo no menu conforme a seção visível
  if ('IntersectionObserver' in window) {
    var links = {};
    document.querySelectorAll('.nav__link').forEach(function (a) {
      links[a.getAttribute('href').slice(1)] = a;
    });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = links[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          Object.keys(links).forEach(function (k) { links[k].removeAttribute('aria-current'); });
          link.setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(links).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }
})();
