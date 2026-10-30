/**
 * ==========================================================================
 * WEBGL BACKGROUND SCENE — THREE.JS DYNAMIC ORGANIC MESH
 * Translucent organic icosahedron mesh with dual cyan & violet lighting,
 * idle floating physics, and smooth mouse coordinates interaction.
 * A deformação orgânica roda no vertex shader (GPU): sem laço de vértices
 * nem computeVertexNormals() por frame no JS.
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

  const isMobile = () => window.innerWidth < 768;
  const maxPixelRatio = () => (isMobile() ? 1.25 : 2);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: !isMobile(),
    powerPreference: 'high-performance',
  });

  // Otimização estrita de resolução e tamanho
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxPixelRatio()));

  // Grupo principal para controle de rotação e translação
  const meshGroup = new THREE.Group();
  scene.add(meshGroup);

  // ===== 2. Malha Orgânica com IcosahedronGeometry =====
  // Deformação feita no vertex shader: menos subdivisões bastam e o custo de CPU é zero
  const detailLevel = isMobile() ? 10 : 18;
  const geometry = new THREE.IcosahedronGeometry(7.5, detailLevel);

  // Uniform compartilhado entre malha e wireframe
  const uTime = { value: 0 };

  // Mesma função de onda 3D que antes rodava no JS, agora em GLSL
  const WAVE_GLSL = `
    uniform float uTime;
    float waveField(vec3 p) {
      return sin(p.x * 0.35 + uTime * 1.2) *
             cos(p.y * 0.35 + uTime * 1.0) *
             sin(p.z * 0.35 + uTime * 0.8);
    }
    vec3 displaceOrganic(vec3 p) {
      return p * (1.0 + waveField(p) * 0.16);
    }
  `;

  function applyOrganicDisplacement(mat, withNormals) {
    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = uTime;
      shader.vertexShader = WAVE_GLSL + shader.vertexShader;

      if (withNormals) {
        // Normal analítica por diferenças finitas sobre a base tangente da esfera
        shader.vertexShader = shader.vertexShader.replace(
          '#include <beginnormal_vertex>',
          `
          vec3 sphN = normalize(position);
          vec3 sphT = normalize(cross(sphN, abs(sphN.y) < 0.99 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0)));
          vec3 sphB = cross(sphN, sphT);
          vec3 dP0 = displaceOrganic(position);
          vec3 dPT = displaceOrganic(normalize(position + sphT * 0.05) * 7.5) - dP0;
          vec3 dPB = displaceOrganic(normalize(position + sphB * 0.05) * 7.5) - dP0;
          vec3 objectNormal = normalize(cross(dPT, dPB));
          if (dot(objectNormal, sphN) < 0.0) objectNormal = -objectNormal;
          #ifdef USE_TANGENT
            vec3 objectTangent = vec3(tangent.xyz);
          #endif
          `
        );
      }

      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        'vec3 transformed = displaceOrganic(position);'
      );
    };
  }

  // Material translúcido orgânico (sem transmission: evita render pass extra)
  const material = new THREE.MeshStandardMaterial({
    color: 0x07111a,
    emissive: 0x02070d,
    roughness: 0.18,
    metalness: 0.12,
    transparent: true,
    opacity: 0.72,
    flatShading: false,
  });
  applyOrganicDisplacement(material, true);

  const mesh = new THREE.Mesh(geometry, material);
  meshGroup.add(mesh);

  // Estrutura aramada sutil ciano para profundidade estética futurista
  const wireframeMaterial = new THREE.MeshBasicMaterial({
    color: 0x00f5ff,
    wireframe: true,
    transparent: true,
    opacity: 0.08,
  });
  applyOrganicDisplacement(wireframeMaterial, false);
  const wireframeMesh = new THREE.Mesh(geometry, wireframeMaterial);
  meshGroup.add(wireframeMesh);

  // ===== Partículas de Dados Flutuantes (Cyber Dust Matrix) =====
  const particleCount = isMobile() ? 90 : 180;
  const particleGeometry = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i += 3) {
    particlePositions[i] = (Math.random() - 0.5) * 55;
    particlePositions[i + 1] = (Math.random() - 0.5) * 55;
    particlePositions[i + 2] = (Math.random() - 0.5) * 35;
  }
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

  const particleMaterial = new THREE.PointsMaterial({
    color: 0x00f5ff,
    size: 0.18,
    transparent: true,
    opacity: 0.42,
    blending: THREE.AdditiveBlending,
  });

  const particles = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particles);

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

  // Redimensionamento automático (debounce) com atualização de câmera e renderer
  let resizeTimer = null;
  function handleResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxPixelRatio()));

    // Ajuste responsivo de posicionamento do mesh
    if (width < 768) {
      meshGroup.position.set(0, 2, 0);
      meshGroup.scale.set(0.75, 0.75, 0.75);
    } else {
      meshGroup.position.set(4, 0, 0);
      meshGroup.scale.set(1, 1, 1);
    }

    // Em movimento reduzido não há loop: redesenha o frame estático
    if (prefersReducedMotion) renderer.render(scene, camera);
  }

  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(handleResize, 150);
  });

  // Ajuste inicial para telas menores
  if (isMobile()) {
    meshGroup.position.set(0, 2, 0);
    meshGroup.scale.set(0.75, 0.75, 0.75);
  }

  // ===== 5. Loop de Animação com Gestão de Bateria =====
  const clock = new THREE.Clock();
  let animationFrameId = null;
  let contextLost = false;

  function startLoop() {
    // Evita rAF duplicado ao voltar para a aba
    if (animationFrameId !== null || document.hidden || contextLost || prefersReducedMotion) return;
    clock.start();
    animationFrameId = requestAnimationFrame(animate);
  }

  function stopLoop() {
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  }

  // Pausar o loop WebGL quando a aba estiver em segundo plano
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopLoop();
    else startLoop();
  });

  // Perda/restauração de contexto GPU (troca de GPU, driver, pressão de memória)
  canvas.addEventListener('webglcontextlost', (e) => {
    e.preventDefault();
    contextLost = true;
    stopLoop();
  });
  canvas.addEventListener('webglcontextrestored', () => {
    contextLost = false;
    if (prefersReducedMotion) renderer.render(scene, camera);
    else startLoop();
  });

  function animate() {
    animationFrameId = requestAnimationFrame(animate);

    const time = clock.getElapsedTime();
    uTime.value = time;

    // Suavização do movimento do mouse (inércia linear)
    currentMouseX += (targetMouseX - currentMouseX) * 0.045;
    currentMouseY += (targetMouseY - currentMouseY) * 0.045;

    // Flutuação em idle (oscilação orgânica no eixo Y e Z)
    const mobile = isMobile();
    meshGroup.position.y = (mobile ? 2 : 0) + Math.sin(time * 0.8) * 0.9 + currentMouseY * 1.8;
    meshGroup.position.x = (mobile ? 0 : 4) + currentMouseX * 2.2;

    // Rotação suave idle combinada com coordenadas do mouse
    meshGroup.rotation.y = time * 0.12 + currentMouseX * 0.55;
    meshGroup.rotation.x = Math.cos(time * 0.6) * 0.1 - currentMouseY * 0.45;
    meshGroup.rotation.z = Math.sin(time * 0.4) * 0.08;

    // Deslocamento dinâmico das fontes de luz para reflexos especulares vivos
    cyanLight.position.x = 16 + currentMouseX * 12;
    cyanLight.position.y = 12 + currentMouseY * 10;

    violetLight.position.x = -16 - currentMouseX * 10;
    violetLight.position.y = -12 - currentMouseY * 12;

    // Integração sutil com Lenis Scroll
    if (window.lenis) {
      const scrollOffset = (window.lenis.scroll || 0) * 0.003;
      meshGroup.rotation.y += scrollOffset * 0.05;
    }

    // Rotação suave das partículas de dados em órbita
    particles.rotation.y = time * 0.035;
    particles.rotation.x = Math.sin(time * 0.02) * 0.05;

    renderer.render(scene, camera);
  }

  if (prefersReducedMotion) {
    // Frame estático único: sem loop contínuo
    renderer.render(scene, camera);
  } else {
    startLoop();
  }
})();
