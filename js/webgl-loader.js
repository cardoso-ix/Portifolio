/**
 * ==========================================================================
 * WEBGL LOADER — carrega Three.js e a cena de fundo sob demanda
 * O Three.js (~600 KB) é decorativo: entra só depois do evento load, em tempo
 * ocioso, para não competir com o primeiro render. Com movimento reduzido ou
 * economia de dados ele não é carregado e o fundo fica só com CSS.
 * ==========================================================================
 */

(function () {
  'use strict';

  const THREE_URL = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
  const THREE_SRI = 'sha384-CI3ELBVUz9XQO+97x6nwMDPosPR5XvsxW2ua7N1Xeygeh1IxtgqtCkGfQY9WWdHu';
  const SCENE_URL = 'js/webgl-scene.js?v=4';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = navigator.connection && navigator.connection.saveData;
  if (reduceMotion || saveData) return;

  function loadScript(src, integrity) {
    return new Promise(function (resolve, reject) {
      const script = document.createElement('script');
      script.src = src;
      if (integrity) {
        script.integrity = integrity;
        script.crossOrigin = 'anonymous';
        script.referrerPolicy = 'no-referrer';
      }
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  function start() {
    loadScript(THREE_URL, THREE_SRI)
      .then(function () { return loadScript(SCENE_URL); })
      .catch(function () {
        console.warn('[WebGL] Não foi possível carregar a cena 3D. Fundo estático mantido.');
      });
  }

  function schedule() {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(start, { timeout: 2500 });
    } else {
      setTimeout(start, 1200);
    }
  }

  if (document.readyState === 'complete') schedule();
  else window.addEventListener('load', schedule, { once: true });
})();
