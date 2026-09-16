/**
 * ==========================================================================
 * WEBGL BACKGROUND SCENE — THREE.JS DYNAMIC ORGANIC MESH
 * Translucent organic icosahedron mesh with dual cyan & violet lighting,
 * idle floating physics, and smooth mouse coordinates interaction.
 * ==========================================================================
 */

(function () {
  'use strict';

  // Verificar suporte a Three.js
  if (typeof THREE === 'undefined') {
    console.warn('[WebGL] Three.js não carregado.');
    return;
  }

  const canvas = document.getElementById('webgl-bg');
  if (!canvas) {
    console.warn('[WebGL] Canvas #webgl-bg não encontrado.');
    return;
  }

  // Respeitar preferências de movimento reduzido
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ===== 1. Criação de Cena, Câmera e Renderer =====
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 24;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance',
  });

  // Otimização estrita de resolução e tamanho
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Grupo principal para controle de rotação e translação
  const meshGroup = new THREE.Group();
  scene.add(meshGroup);

  // ===== 2. Malha Orgânica com IcosahedronGeometry =====
  // Raio 7.5 com 24 subdivisões para ondulações de alta fidelidade e leveza
  const detailLevel = window.innerWidth < 768 ? 16 : 24;
  const geometry = new THREE.IcosahedronGeometry(7.5, detailLevel);

  // Armazenar posições originais dos vértices para cálculo da distorção
  const originalPositions = geometry.attributes.position.array.slice();

  // Material translúcido orgânico com reflexos físicos
  const material = new THREE.MeshPhysicalMaterial({
    color: 0x07111a,
    emissive: 0x02070d,
    roughness: 0.18,
    metalness: 0.12,
    transmission: 0.7,
    ior: 1.35,
    transparent: true,
    opacity: 0.72,
    reflectivity: 0.6,
    clearcoat: 0.7,
    clearcoatRoughness: 0.15,
    flatShading: false,
  });

  const mesh = new THREE.Mesh(geometry, material);
  meshGroup.add(mesh);

  // Estrutura aramada sutil ciano para profundidade estética futurista
  const wireframeMaterial = new THREE.MeshBasicMaterial({
    color: 0x00f5ff,
    wireframe: true,
    transparent: true,
    opacity: 0.08,
  });
  const wireframeMesh = new THREE.Mesh(geometry, wireframeMaterial);
  meshGroup.add(wireframeMesh);

  // Posicionamento inicial sutil deslocado para a direita do hero
  meshGroup.position.set(4, 0, 0);

  // ===== 3. Iluminação Dinâmica Dupla (Ciano & Violeta/Púrpura) =====
  // Luz Ciano (Destaque frontal-superior direito)
  const cyanLight = new THREE.PointLight(0x00f5ff, 4.8, 70);
  cyanLight.position.set(16, 12, 18);
  scene.add(cyanLight);

  // Luz Violeta/Púrpura (Contraponto dinâmico inferior esquerdo)
  const violetLight = new THREE.PointLight(0x9d4edd, 4.2, 70);
  violetLight.position.set(-16, -12, 14);
  scene.add(violetLight);

  // Luz Ambiente para sombras suaves e preenchimento escuro
  const ambientLight = new THREE.AmbientLight(0x0c0f14, 1.4);
  scene.add(ambientLight);

  // Luz de recorte (rim light) superior para contornos brilhantes
  const rimLight = new THREE.DirectionalLight(0x00f5ff, 0.7);
  rimLight.position.set(0, 20, -10);
  scene.add(rimLight);

  // ===== 4. Interação Dinâmica com Mouse =====
  let targetMouseX = 0;
  let targetMouseY = 0;
  let currentMouseX = 0;
  let currentMouseY = 0;

  window.addEventListener('mousemove', (e) => {
    // Normalizar coordenadas (-1 a 1)
    targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    targetMouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  // Redimensionamento automático com atualização de câmera e renderer
  window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Ajuste responsivo de posicionamento do mesh
    if (width < 768) {
      meshGroup.position.set(0, 2, 0);
      meshGroup.scale.set(0.75, 0.75, 0.75);
    } else {
      meshGroup.position.set(4, 0, 0);
      meshGroup.scale.set(1, 1, 1);
    }
  });

  // Ajuste inicial para telas menores
  if (window.innerWidth < 768) {
    meshGroup.position.set(0, 2, 0);
    meshGroup.scale.set(0.75, 0.75, 0.75);
  }

  // ===== 5. Loop de Animação e Física Ondulatória =====
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const time = clock.getElapsedTime();

    // Suavização do movimento do mouse (inércia linear)
    currentMouseX += (targetMouseX - currentMouseX) * 0.045;
    currentMouseY += (targetMouseY - currentMouseY) * 0.045;

    if (!prefersReducedMotion) {
      // Flutuação em idle (oscilação orgânica no eixo Y e Z)
      const baseIdleY = window.innerWidth < 768 ? 2 : 0;
      meshGroup.position.y = baseIdleY + Math.sin(time * 0.8) * 0.9 + currentMouseY * 1.8;
      meshGroup.position.x = (window.innerWidth < 768 ? 0 : 4) + currentMouseX * 2.2;

      // Rotação suave idle combinada com coordenadas do mouse
      meshGroup.rotation.y = time * 0.12 + currentMouseX * 0.55;
      meshGroup.rotation.x = Math.cos(time * 0.6) * 0.1 - currentMouseY * 0.45;
      meshGroup.rotation.z = Math.sin(time * 0.4) * 0.08;

      // Deslocamento dinâmico das fontes de luz para reflexos especulares vivos
      cyanLight.position.x = 16 + currentMouseX * 12;
      cyanLight.position.y = 12 + currentMouseY * 10;

      violetLight.position.x = -16 - currentMouseX * 10;
      violetLight.position.y = -12 - currentMouseY * 12;

      // Deformação da malha geométrica (Distorção Orgânica de Vértices)
      const positionAttr = geometry.attributes.position;
      const count = positionAttr.count;

      for (let i = 0; i < count; i++) {
        const ox = originalPositions[i * 3];
        const oy = originalPositions[i * 3 + 1];
        const oz = originalPositions[i * 3 + 2];

        // Função de onda tridimensional contínua
        const wave =
          Math.sin(ox * 0.35 + time * 1.2) *
          Math.cos(oy * 0.35 + time * 1.0) *
          Math.sin(oz * 0.35 + time * 0.8);

        const displacement = 1 + wave * 0.16;

        positionAttr.setXYZ(i, ox * displacement, oy * displacement, oz * displacement);
      }

      positionAttr.needsUpdate = true;
      geometry.computeVertexNormals();
    }

    // Integração sutil com Lenis Scroll
    if (window.lenis && !prefersReducedMotion) {
      const scrollOffset = (window.lenis.scroll || 0) * 0.003;
      meshGroup.rotation.y += scrollOffset * 0.05;
    }

    renderer.render(scene, camera);
  }

  animate();
})();
