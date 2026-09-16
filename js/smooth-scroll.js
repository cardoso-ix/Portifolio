/**
 * ==========================================================================
 * SMOOTH SCROLL — LENIS + GSAP TICKER SYNC
 * Natural physical inertia scroll synchronized with GSAP ScrollTrigger
 * ==========================================================================
 */

(function () {
  'use strict';

  // Respeitar preferência de redução de movimento do sistema
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // Verificar se Lenis está carregado
  if (typeof Lenis === 'undefined') {
    console.warn('[Creative] Lenis não encontrado. Scroll suave nativo mantido.');
    return;
  }

  // Inicializar Lenis com parâmetros de inércia física natural
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Curva exponencial suave
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.95,
    touchMultiplier: 1.8,
    infinite: false,
  });

  // Disponibilizar globalmente para outros módulos criativos
  window.lenis = lenis;

  // Sincronização avançada com GSAP e ScrollTrigger
  if (typeof gsap !== 'undefined') {
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      // Notificar ScrollTrigger a cada ciclo de scroll do Lenis
      lenis.on('scroll', ScrollTrigger.update);
    }

    // Amarrar renderização do Lenis diretamente ao ticker do GSAP
    // Garante sincronização perfeita de framerate e elimina frame stuttering
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Desativar compensação agressiva de lag do GSAP para evitar saltos visuais
    gsap.ticker.lagSmoothing(0);
  } else {
    // Fallback caso GSAP ainda não esteja disponível: ciclo via requestAnimationFrame
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // Interceptar âncoras internas para rolagem suave via Lenis
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#' && targetId.length > 1) {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            const header = document.getElementById('header');
            const offset = header ? -header.offsetHeight - 16 : -70;

            lenis.scrollTo(targetEl, {
              offset: offset,
              duration: 1.2,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
          }
        }
      });
    });
  });
})();
