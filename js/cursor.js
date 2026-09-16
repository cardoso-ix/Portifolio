/**
 * ==========================================================================
 * CUSTOM CURSOR — FLUID LERP PHYSICS & HOVER EXPANSION
 * Organic weighted latency with smooth interpolation and element scaling.
 * Does not intercept or block any user interactions.
 * ==========================================================================
 */

(function () {
  'use strict';

  // Desativar em dispositivos com touch ou sem ponteiro fino
  if (window.matchMedia('(pointer: coarse), (hover: none)').matches) {
    return;
  }

  const cursor = document.getElementById('custom-cursor');
  if (!cursor) return;

  // Garantia absoluta de não bloquear cliques ou seleção de texto
  cursor.style.pointerEvents = 'none';

  // Coordenadas do mouse (alvo) e do cursor (interpolado)
  let targetX = -100;
  let targetY = -100;
  let currentX = -100;
  let currentY = -100;
  let isVisible = false;
  let hasInitialized = false;

  // Fator de interpolação linear (lerp): determina o peso e atraso orgânico (0.15 = fluido com inércia)
  const LERP_FACTOR = 0.15;

  // Atualizar coordenadas do mouse
  window.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;

    if (!hasInitialized) {
      currentX = targetX;
      currentY = targetY;
      hasInitialized = true;
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
    }

    if (!isVisible) {
      isVisible = true;
      cursor.classList.add('visible');
    }
  }, { passive: true });

  // Ocultar quando o mouse sai da janela
  document.addEventListener('mouseleave', () => {
    isVisible = false;
    cursor.classList.remove('visible');
    cursor.classList.remove('active');
  });

  // Reexibir ao retornar à janela
  document.addEventListener('mouseenter', () => {
    isVisible = true;
    cursor.classList.add('visible');
  });

  // Loop contínuo com requestAnimationFrame para interpolação linear fluida
  function renderCursor() {
    if (isVisible) {
      currentX += (targetX - currentX) * LERP_FACTOR;
      currentY += (targetY - currentY) * LERP_FACTOR;

      // translate3d com translate(-50%, -50%) para manter o centro do círculo alinhado à ponta da seta
      cursor.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0) translate(-50%, -50%)`;
    }

    requestAnimationFrame(renderCursor);
  }

  requestAnimationFrame(renderCursor);

  // ===== Listeners para tags <a>, <button> e <article> =====
  const INTERACTIVE_SELECTOR = 'a, button, article, [role="button"]';

  document.addEventListener('mouseover', (e) => {
    const interactiveEl = e.target.closest(INTERACTIVE_SELECTOR);
    if (interactiveEl) {
      cursor.classList.add('active');
    }
  }, { passive: true });

  document.addEventListener('mouseout', (e) => {
    const interactiveEl = e.target.closest(INTERACTIVE_SELECTOR);
    if (interactiveEl) {
      // Verifica se o destino do cursor não é outro elemento interativo
      const nextInteractiveEl = e.relatedTarget && e.relatedTarget.closest ? e.relatedTarget.closest(INTERACTIVE_SELECTOR) : null;
      if (!nextInteractiveEl) {
        cursor.classList.remove('active');
      }
    }
  }, { passive: true });
})();
