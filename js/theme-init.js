/**
 * Aplica o tema salvo e habilita o estado inicial do reveal antes da primeira pintura.
 * Carregado de forma síncrona no <head> para evitar flash (FOUC).
 */
(function () {
  // Habilita o estado inicial do reveal (GSAP) só com JS e sem movimento reduzido
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('js-reveal');
  }
  try {
    var saved = localStorage.getItem('portfolio-theme');
    if (saved === 'light' || saved === 'dark') {
      document.documentElement.setAttribute('data-theme', saved);
    }
  } catch (e) {}
})();
