/**
 * ==========================================================================
 * INTERACTIVE COMMAND PALETTE (Raycast / Linear Style Engine)
 * Hotkey Ctrl+K / Cmd+K, live search filter, keyboard navigation, actions.
 * ==========================================================================
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const trigger = document.getElementById('cmd-trigger');
    const overlay = document.getElementById('cmd-overlay');
    const input = document.getElementById('cmd-input');
    const resultsContainer = document.getElementById('cmd-results');
    const closeBtn = document.getElementById('cmd-close-btn');

    if (!trigger || !overlay || !input || !resultsContainer) return;

    // Detectar Mac para exibir ⌘K ou Ctrl K
    const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform || navigator.userAgent);
    const kbdLabels = document.querySelectorAll('.cmd-trigger__kbd, .cmd-kbd-dynamic');
    kbdLabels.forEach((kbd) => {
      kbd.textContent = isMac ? '⌘K' : 'Ctrl K';
    });

    const statusEl = document.getElementById('cmd-status');

    let isOpen = false;
    let selectedIndex = 0;
    let previousActiveElement = null;
    let inertedElements = [];

    // Padrão combobox + listbox: o foco fica no input e o item ativo é anunciado via aria-activedescendant
    resultsContainer.querySelectorAll('.cmd-group').forEach((group, gi) => {
      const title = group.querySelector('.cmd-group__title');
      group.setAttribute('role', 'group');
      if (title) {
        title.id = 'cmd-group-title-' + gi;
        group.setAttribute('aria-labelledby', title.id);
      }
    });
    resultsContainer.querySelectorAll('.cmd-item').forEach((item, i) => {
      item.id = 'cmd-opt-' + i;
      item.setAttribute('role', 'option');
      item.setAttribute('aria-selected', 'false');
    });

    // Deixa a página atrás do diálogo inerte (foco e leitor de tela)
    function setBackgroundInert(inert) {
      if (inert) {
        inertedElements = Array.from(document.body.children).filter((el) => {
          return el !== overlay && !['SCRIPT', 'CANVAS'].includes(el.tagName) && !el.hasAttribute('inert');
        });
        inertedElements.forEach((el) => el.setAttribute('inert', ''));
      } else {
        inertedElements.forEach((el) => el.removeAttribute('inert'));
        inertedElements = [];
      }
    }

    function announce(message) {
      if (statusEl) statusEl.textContent = message;
    }

    function getVisibleItems() {
      return Array.from(resultsContainer.querySelectorAll('.cmd-item:not([style*="display: none"])'));
    }

    function updateActiveItem(items) {
      items.forEach((item, idx) => {
        const isSelected = idx === selectedIndex;
        item.classList.toggle('is-selected', isSelected);
        item.setAttribute('aria-selected', isSelected ? 'true' : 'false');
        if (isSelected) {
          input.setAttribute('aria-activedescendant', item.id);
          item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
      });
      if (items.length === 0) input.removeAttribute('aria-activedescendant');
    }

    function openPalette() {
      if (isOpen) return;
      isOpen = true;
      previousActiveElement = document.activeElement;
      overlay.removeAttribute('inert');
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      setBackgroundInert(true);
      if (window.lenis) window.lenis.stop();
      trigger.setAttribute('aria-expanded', 'true');
      input.value = '';
      filterItems('');
      setTimeout(() => {
        input.focus();
      }, 50);
    }

    function closePalette() {
      if (!isOpen) return;
      isOpen = false;
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      overlay.setAttribute('inert', '');
      document.body.style.overflow = '';
      setBackgroundInert(false);
      if (window.lenis) window.lenis.start();
      trigger.setAttribute('aria-expanded', 'false');
      if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
        previousActiveElement.focus();
      }
    }

    function togglePalette() {
      if (isOpen) closePalette();
      else openPalette();
    }

    function filterItems(query) {
      const q = query.trim().toLowerCase();
      const groups = resultsContainer.querySelectorAll('.cmd-group');
      let totalVisible = 0;

      groups.forEach((group) => {
        const items = group.querySelectorAll('.cmd-item');
        let visibleInGroup = 0;

        items.forEach((item) => {
          const label = (item.querySelector('.cmd-item__label')?.textContent || '').toLowerCase();
          const desc = (item.querySelector('.cmd-item__desc')?.textContent || '').toLowerCase();
          const keywords = (item.getAttribute('data-keywords') || '').toLowerCase();

          const matches = !q || label.includes(q) || desc.includes(q) || keywords.includes(q);
          item.style.display = matches ? 'flex' : 'none';
          if (matches) {
            visibleInGroup++;
            totalVisible++;
          }
        });

        group.style.display = visibleInGroup > 0 ? 'block' : 'none';
      });

      let emptyMsg = document.getElementById('cmd-empty');
      if (totalVisible === 0) {
        if (!emptyMsg) {
          emptyMsg = document.createElement('div');
          emptyMsg.id = 'cmd-empty';
          emptyMsg.className = 'cmd-palette__empty';
          resultsContainer.appendChild(emptyMsg);
        }
        emptyMsg.textContent = `Nenhum comando encontrado para "${query}"`;
        emptyMsg.style.display = 'block';
        announce(`Nenhum resultado para ${query}`);
      } else {
        if (emptyMsg) emptyMsg.style.display = 'none';
        announce(q ? `${totalVisible} resultado${totalVisible > 1 ? 's' : ''}` : '');
      }

      selectedIndex = 0;
      updateActiveItem(getVisibleItems());
    }

    function executeItem(item) {
      if (!item) return;
      const action = item.getAttribute('data-action');

      switch (action) {
        case 'copy-email': {
          const email = SITE.email;
          if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(email).then(() => {
              SITE.toast('E-mail institucional copiado com sucesso!');
            }).catch(() => {
              window.location.href = 'mailto:' + email;
            });
          } else {
            window.location.href = 'mailto:' + email;
          }
          break;
        }

        case 'download-cv': {
          const cvLink = document.createElement('a');
          cvLink.href = SITE.cvUrl;
          cvLink.target = '_blank';
          cvLink.rel = 'noopener noreferrer';
          cvLink.click();
          SITE.toast('Download do Currículo PDF iniciado!');
          break;
        }

        case 'open-whatsapp': {
          window.open(SITE.whatsappUrl, '_blank', 'noopener,noreferrer');
          break;
        }

        case 'toggle-theme': {
          const themeToggle = document.getElementById('theme-toggle');
          if (themeToggle) {
            themeToggle.click();
            const current = document.documentElement.getAttribute('data-theme') || 'dark';
            SITE.toast(`Tema alterado para: ${current === 'light' ? 'Modo Claro' : 'Modo Escuro'}`);
          }
          break;
        }

        case 'open-url': {
          const url = item.getAttribute('data-url');
          if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
          }
          break;
        }

        case 'scroll-to': {
          const targetId = item.getAttribute('data-target');
          if (targetId) {
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
              closePalette();
              SITE.scrollTo(targetEl);
              history.pushState(null, '', targetId);
              return;
            }
          }
          break;
        }
      }

      closePalette();
    }

    // Event Listeners
    trigger.addEventListener('click', togglePalette);

    if (closeBtn) {
      closeBtn.addEventListener('click', closePalette);
    }

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closePalette();
      }
    });

    input.addEventListener('input', (e) => {
      filterItems(e.target.value);
    });

    // Teclas globais (Ctrl+K / Cmd+K / Esc / Navegação)
    document.addEventListener('keydown', (e) => {
      // Abrir / Fechar com Cmd+K ou Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        togglePalette();
        return;
      }

      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        closePalette();
        return;
      }

      // Focus trap: os únicos focáveis do diálogo são o input e o botão ESC
      if (e.key === 'Tab') {
        const focusables = [input, closeBtn].filter(Boolean);
        const idx = focusables.indexOf(document.activeElement);
        e.preventDefault();
        const next = e.shiftKey
          ? focusables[(idx - 1 + focusables.length) % focusables.length]
          : focusables[(idx + 1) % focusables.length];
        next.focus();
        return;
      }

      const visibleItems = getVisibleItems();
      if (visibleItems.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedIndex = (selectedIndex + 1) % visibleItems.length;
        updateActiveItem(visibleItems);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedIndex = (selectedIndex - 1 + visibleItems.length) % visibleItems.length;
        updateActiveItem(visibleItems);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        executeItem(visibleItems[selectedIndex]);
      }
    });

    // Clique em item da lista
    resultsContainer.addEventListener('click', (e) => {
      const item = e.target.closest('.cmd-item');
      if (item) {
        executeItem(item);
      }
    });
  });
})();
