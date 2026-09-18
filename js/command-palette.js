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

    let isOpen = false;
    let selectedIndex = 0;
    let previousActiveElement = null;

    function getVisibleItems() {
      return Array.from(resultsContainer.querySelectorAll('.cmd-item:not([style*="display: none"])'));
    }

    function updateActiveItem(items) {
      items.forEach((item, idx) => {
        const isSelected = idx === selectedIndex;
        item.classList.toggle('is-selected', isSelected);
        item.setAttribute('aria-selected', isSelected ? 'true' : 'false');
        if (isSelected) {
          item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
      });
    }

    function openPalette() {
      if (isOpen) return;
      isOpen = true;
      previousActiveElement = document.activeElement;
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
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
      document.body.style.overflow = '';
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
          emptyMsg.textContent = `Nenhum comando encontrado para "${query}"`;
          resultsContainer.appendChild(emptyMsg);
        } else {
          emptyMsg.textContent = `Nenhum comando encontrado para "${query}"`;
          emptyMsg.style.display = 'block';
        }
      } else if (emptyMsg) {
        emptyMsg.style.display = 'none';
      }

      selectedIndex = 0;
      updateActiveItem(getVisibleItems());
    }

    function executeItem(item) {
      if (!item) return;
      const action = item.getAttribute('data-action');

      switch (action) {
        case 'copy-email': {
          const email = 'eduardoocardosoo@gmail.com';
          if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(email).then(() => {
              triggerToast('E-mail institucional copiado com sucesso!');
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
          cvLink.href = 'assets/cv_eduardo_cardoso.pdf?v=14';
          cvLink.target = '_blank';
          cvLink.rel = 'noopener noreferrer';
          cvLink.click();
          triggerToast('Download do Currículo PDF iniciado!');
          break;
        }

        case 'open-whatsapp': {
          window.open(
            'https://wa.me/5549998095955?text=Oi%20Eduardo%2C%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar',
            '_blank',
            'noopener,noreferrer'
          );
          break;
        }

        case 'toggle-theme': {
          const themeToggle = document.getElementById('theme-toggle');
          if (themeToggle) {
            themeToggle.click();
            const current = document.documentElement.getAttribute('data-theme') || 'dark';
            triggerToast(`Tema alterado para: ${current === 'light' ? 'Modo Claro' : 'Modo Escuro'}`);
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
              targetEl.scrollIntoView({ behavior: 'smooth' });
              history.pushState(null, '', targetId);
              return;
            }
          }
          break;
        }
      }

      closePalette();
    }

    function triggerToast(message) {
      const existingToast = document.getElementById('email-toast');
      if (existingToast) existingToast.remove();

      const toast = document.createElement('div');
      toast.id = 'email-toast';
      toast.className = 'contact-toast is-visible';
      toast.setAttribute('role', 'status');
      toast.innerHTML = `
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>${message}</span>
      `;
      document.body.appendChild(toast);

      setTimeout(() => {
        toast.classList.remove('is-visible');
        setTimeout(() => toast.remove(), 300);
      }, 2600);
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
