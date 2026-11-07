/* Aplica o tema salvo antes da primeira pintura, para não piscar. */
(function () {
  try {
    var saved = localStorage.getItem('portfolio-theme');
    if (saved === 'light' || saved === 'dark') {
      document.documentElement.setAttribute('data-theme', saved);
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  } catch (e) { /* sem storage */ }
})();
