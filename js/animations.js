/**
 * ==========================================================================
 * CINEMATIC ANIMATIONS — GSAP & SCROLLTRIGGER
 * 3D Project Card Tilt, Cinematic Scroll Reveals, and Hero Floating Physics
 * ==========================================================================
 */

(function () {
  'use strict';

  // Verificar se GSAP está disponível
  if (typeof gsap === 'undefined') {
    console.warn('[Animations] GSAP não carregado. Animações ignoradas.');
    return;
  }

  // Registrar o plugin ScrollTrigger
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  } else {
    console.warn('[Animations] ScrollTrigger não carregado.');
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.addEventListener('DOMContentLoaded', () => {
    // Se o usuário preferir redução de movimento, garantir visibilidade sem animação
    if (prefersReducedMotion) {
      document.querySelectorAll('.fade-in, .timeline__item, .skills__group, h2').forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    // ===== 1. Tilt 3D nos Cards de Projetos (<article>) =====
    const projectCards = document.querySelectorAll('#projetos article, .project-card');

    projectCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;

        // Posição relativa do cursor dentro do card (-0.5 a 0.5)
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        // Ângulo máximo de inclinação suave (graus)
        const maxTilt = 10;
        const rotateX = (-y * maxTilt).toFixed(2);
        const rotateY = (x * maxTilt).toFixed(2);

        // Aplicação da matriz tridimensional cinematográfica
        gsap.to(card, {
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
          duration: 0.25,
          ease: 'power1.out',
          overwrite: 'auto',
        });
      }, { passive: true });

      card.addEventListener('mouseleave', () => {
        // Restauração suave do estado plano original
        gsap.to(card, {
          transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          duration: 0.6,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      });
    });

    // ===== 2. Revelação Cinemática com GSAP ScrollTrigger =====
    if (typeof ScrollTrigger !== 'undefined') {
      // (a) Títulos de Seção (<h2>)
      const sectionTitles = document.querySelectorAll('section h2, .section__title');
      sectionTitles.forEach((title) => {
        title.classList.add('gsap-reveal');
        gsap.fromTo(
          title,
          {
            opacity: 0,
            y: 35,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: title,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // (b) Seção de Skills (Grupos com revelação escalonada)
      const skillsSection = document.getElementById('skills');
      const skillGroups = document.querySelectorAll('.skills__group');
      if (skillGroups.length > 0) {
        skillGroups.forEach((group) => group.classList.add('gsap-reveal'));
        gsap.fromTo(
          skillGroups,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: skillsSection || '.skills',
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // (c) Blocos de Formação Acadêmica e Experiência Profissional
      const timelineBlocks = document.querySelectorAll(
        '#formacao .timeline__item, #experiencia .timeline__item, .timeline__item'
      );
      timelineBlocks.forEach((item) => {
        item.classList.add('gsap-reveal');
        gsap.fromTo(
          item,
          {
            opacity: 0,
            y: 35,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // (d) Revelação suave dos cards de projetos na entrada da viewport
      projectCards.forEach((card) => {
        card.classList.add('gsap-reveal');
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Atualizar cálculos do ScrollTrigger caso o histórico profissional seja expandido
      const timelineToggle = document.getElementById('timeline-toggle');
      if (timelineToggle) {
        timelineToggle.addEventListener('click', () => {
          setTimeout(() => {
            ScrollTrigger.refresh();
          }, 350);
        });
      }
    }

    // ===== 3. Flutuação Suave Contínua em Loop no Hero =====
    // Terminal do Hero
    const heroTerminal = document.querySelector('.hero__content');
    if (heroTerminal) {
      gsap.to(heroTerminal, {
        y: -9,
        duration: 3.6,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    }

    // Contêiner da Foto de Perfil (Avatar Wrap)
    const heroAvatarWrap = document.querySelector('.hero__avatar-wrap');
    if (heroAvatarWrap) {
      gsap.to(heroAvatarWrap, {
        y: -11,
        duration: 4.2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 0.5,
      });
    }

    // ===== 4. Spotlight Reativo ao Cursor nos Cards =====
    const spotlightCards = document.querySelectorAll(
      '.project-card, .terminal-window, .hero__profile-card, .timeline__item'
    );

    spotlightCards.forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
        card.style.setProperty('--spotlight-opacity', '1');
      }, { passive: true });

      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--spotlight-opacity', '0');
      });
    });

    // ===== 5. Text Scramble / Decrypt Engine (Matrix Cyber Effect) =====
    class TextScramble {
      constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#010101XYZ';
        this.update = this.update.bind(this);
        const numberSpan = el.querySelector('.section__number');
        this.prefix = numberSpan ? numberSpan.outerHTML + ' ' : '';
        this.targetText = (numberSpan ? el.innerText.replace(numberSpan.innerText, '') : el.innerText).trim();
        this.currentText = this.targetText;
      }

      setText(newText) {
        const text = newText || this.targetText;
        const oldText = this.currentText || text;
        const length = Math.max(oldText.length, text.length);
        const promise = new Promise((resolve) => (this.resolve = resolve));
        this.queue = [];
        for (let i = 0; i < length; i++) {
          const from = oldText[i] || '';
          const to = text[i] || '';
          const start = Math.floor(Math.random() * 12);
          const end = start + Math.floor(Math.random() * 14) + 6;
          this.queue.push({ from, to, start, end, char: '' });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
      }

      update() {
        let output = '';
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
          let { from, to, start, end, char } = this.queue[i];
          if (this.frame >= end) {
            complete++;
            output += to;
          } else if (this.frame >= start) {
            if (!char || Math.random() < 0.28) {
              char = this.chars[Math.floor(Math.random() * this.chars.length)];
              this.queue[i].char = char;
            }
            output += `<span class="scramble-glyph">${char}</span>`;
          } else {
            output += from;
          }
        }
        this.el.innerHTML = this.prefix + output;
        this.currentText = output.replace(/<[^>]*>/g, '');
        if (complete === this.queue.length) {
          this.el.innerHTML = this.prefix + this.targetText;
          if (this.resolve) this.resolve();
        } else {
          this.frameRequest = requestAnimationFrame(this.update);
          this.frame++;
        }
      }
    }

    if (!prefersReducedMotion) {
      // (a) Hero Title Decrypt
      const heroTitle = document.getElementById('hero-title');
      if (heroTitle) {
        const heroScrambler = new TextScramble(heroTitle);
        setTimeout(() => {
          heroScrambler.setText();
        }, 200);
        heroTitle.addEventListener('mouseenter', () => {
          heroScrambler.setText();
        });
      }

      // (b) Section Titles Decrypt (ScrollTrigger + Hover)
      document.querySelectorAll('.section__title').forEach((title) => {
        const scrambler = new TextScramble(title);

        if (typeof ScrollTrigger !== 'undefined') {
          ScrollTrigger.create({
            trigger: title,
            start: 'top 85%',
            once: true,
            onEnter: () => scrambler.setText(),
          });
        }

        title.addEventListener('mouseenter', () => {
          scrambler.setText();
        });
      });

      // ===== 6. Telemetria em Tempo Real (Live Ping Jitter) =====
      const pingEl = document.getElementById('telemetry-ping');
      if (pingEl) {
        const pings = [14, 16, 18, 15, 19, 17, 22, 15, 18];
        let pingIndex = 0;
        setInterval(() => {
          pingIndex = (pingIndex + 1) % pings.length;
          const currentPing = pings[pingIndex];
          const jitter = Math.floor(Math.random() * 3) - 1;
          const val = Math.max(12, currentPing + jitter);
          pingEl.textContent = `${val}ms`;
        }, 2600);
      }
    }
  });
})();
