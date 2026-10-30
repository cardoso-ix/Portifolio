/**
 * ==========================================================================
 * CONFIG & UTILITÁRIOS COMPARTILHADOS (window.SITE)
 * Contatos em um só lugar e helpers usados por main.js e command-palette.js.
 * Deve ser carregado antes dos demais scripts do site.
 * ==========================================================================
 */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const SITE = {
    email: 'eduardoocardosoo@gmail.com',
    whatsappUrl: 'https://wa.me/5549998095955?text=Oi%20Eduardo%2C%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar',
    cvUrl: 'assets/cv_eduardo_cardoso.pdf?v=14',

    /** Rola até o elemento considerando o header fixo; usa Lenis quando ativo. */
    scrollTo(target) {
      const header = document.getElementById('header');
      const headerHeight = header ? header.offsetHeight : 68;
      const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - headerHeight - 16);

      if (window.lenis) {
        window.lenis.scrollTo(top, { duration: 1.2 });
      } else {
        window.scrollTo({ top: top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }
    },

    /** Toast único (role=status). A mensagem entra como texto, nunca como HTML. */
    toast(message, duration) {
      const existing = document.getElementById('email-toast');
      if (existing) existing.remove();

      const toast = document.createElement('div');
      toast.id = 'email-toast';
      toast.className = 'contact-toast';
      toast.setAttribute('role', 'status');

      const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      icon.setAttribute('viewBox', '0 0 24 24');
      icon.setAttribute('width', '18');
      icon.setAttribute('height', '18');
      icon.setAttribute('fill', 'none');
      icon.setAttribute('stroke', 'currentColor');
      icon.setAttribute('stroke-width', '2');
      icon.setAttribute('stroke-linecap', 'round');
      icon.setAttribute('stroke-linejoin', 'round');
      icon.setAttribute('aria-hidden', 'true');
      const check = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
      check.setAttribute('points', '20 6 9 17 4 12');
      icon.appendChild(check);

      const text = document.createElement('span');
      text.textContent = message;

      toast.append(icon, text);
      document.body.appendChild(toast);

      requestAnimationFrame(function () {
        toast.classList.add('is-visible');
      });

      setTimeout(function () {
        toast.classList.remove('is-visible');
        setTimeout(function () {
          toast.remove();
        }, 300);
      }, duration || 2800);
    },
  };

  window.SITE = SITE;
})();
