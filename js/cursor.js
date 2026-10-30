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
  // Escala do estado "ativo" (hover em interativos), interpolada junto com a posição.
  // Fica dentro do transform: a propriedade CSS `scale` multiplicaria a translação.
  let targetScale = 1;
  let currentScale = 1;
  const ACTIVE_SCALE = 2;
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
      applyTransform();
    }

    if (!isVisible) {
      isVisible = true;
      cursor.classList.add('visible');
    }

    startCursorLoop();
  }, { passive: true });

  // Ocultar quando o mouse sai da janela
  document.addEventListener('mouseleave', () => {
    isVisible = false;
    cursor.classList.remove('visible');
    cursor.classList.remove('active');
    targetScale = 1;
  });

  // Reexibir ao retornar à janela
  document.addEventListener('mouseenter', () => {
    isVisible = true;
    cursor.classList.add('visible');
  });

  // Loop sob demanda: roda só enquanto o cursor ainda não alcançou o alvo
  const EPSILON = 0.1;
  let rafId = null;

  function applyTransform() {
    // translate3d com translate(-50%, -50%) para manter o centro do círculo alinhado à ponta da seta
    cursor.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0) translate(-50%, -50%) scale(${currentScale.toFixed(3)})`;
  }

  function renderCursor() {
    currentX += (targetX - currentX) * LERP_FACTOR;
    currentY += (targetY - currentY) * LERP_FACTOR;
    currentScale += (targetScale - currentScale) * 0.2;
    applyTransform();

    if (isVisible && (
      Math.abs(targetX - currentX) > EPSILON ||
      Math.abs(targetY - currentY) > EPSILON ||
      Math.abs(targetScale - currentScale) > 0.01
    )) {
      rafId = requestAnimationFrame(renderCursor);
    } else {
      rafId = null;
    }
  }

  function startCursorLoop() {
    if (rafId === null && isVisible) rafId = requestAnimationFrame(renderCursor);
  }

  // ===== Listeners para tags <a>, <button> e <article> =====
  const INTERACTIVE_SELECTOR = 'a, button, article, [role="button"]';

  document.addEventListener('mouseover', (e) => {
    const interactiveEl = e.target.closest(INTERACTIVE_SELECTOR);
    if (interactiveEl) {
      cursor.classList.add('active');
      targetScale = ACTIVE_SCALE;
      startCursorLoop();
    }
  }, { passive: true });

  document.addEventListener('mouseout', (e) => {
    const interactiveEl = e.target.closest(INTERACTIVE_SELECTOR);
    if (interactiveEl) {
      // Verifica se o destino do cursor não é outro elemento interativo
      const nextInteractiveEl = e.relatedTarget && e.relatedTarget.closest ? e.relatedTarget.closest(INTERACTIVE_SELECTOR) : null;
      if (!nextInteractiveEl) {
        cursor.classList.remove('active');
        targetScale = 1;
        startCursorLoop();
      }
    }
  }, { passive: true });
})();
