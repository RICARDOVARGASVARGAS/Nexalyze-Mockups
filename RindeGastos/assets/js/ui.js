// Modal helpers
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.body.style.overflow = '';
}

// Cerrar modal con Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('[data-modal].flex').forEach((m) => {
      m.classList.add('hidden');
      m.classList.remove('flex');
    });
    document.body.style.overflow = '';
  }
});

// Drawer helpers
function openDrawer(drawerId) {
  const drawer = document.getElementById(drawerId);
  if (!drawer) return;
  drawer.classList.remove('translate-x-full');
  drawer.parentElement.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeDrawer(drawerId) {
  const drawer = document.getElementById(drawerId);
  if (!drawer) return;
  drawer.classList.add('translate-x-full');
  setTimeout(() => {
    drawer.parentElement.classList.add('hidden');
    document.body.style.overflow = '';
  }, 300);
}

// Toast notifications
function showToast(message, type = 'success') {
  const colors = {
    success: 'bg-success text-white',
    danger: 'bg-danger text-white',
    warning: 'bg-warning text-white',
    info: 'bg-info text-white'
  };
  const icons = {
    success: 'check-circle-2',
    danger: 'x-circle',
    warning: 'alert-triangle',
    info: 'info'
  };
  const toast = document.createElement('div');
  toast.className = `fixed top-20 right-6 ${colors[type]} px-4 py-3 rounded-xl shadow-lg z-50 transition-all transform translate-x-full flex items-center gap-2 min-w-[240px]`;
  toast.innerHTML = `<i data-lucide="${icons[type] || 'check-circle-2'}" class="w-4 h-4"></i><span class="text-sm font-semibold">${message}</span>`;
  document.body.appendChild(toast);
  if (window.lucide) lucide.createIcons();
  setTimeout(() => toast.classList.remove('translate-x-full'), 10);
  setTimeout(() => {
    toast.classList.add('translate-x-full');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Tabs simples
function switchTab(tabsContainerId, tabId) {
  const container = document.getElementById(tabsContainerId);
  if (!container) return;
  container.querySelectorAll('[data-tab]').forEach((btn) => {
    if (btn.dataset.tab === tabId) {
      btn.classList.add('text-primary', 'border-primary');
      btn.classList.remove('text-ink-muted', 'border-transparent');
    } else {
      btn.classList.remove('text-primary', 'border-primary');
      btn.classList.add('text-ink-muted', 'border-transparent');
    }
  });
  container.querySelectorAll('[data-tab-content]').forEach((content) => {
    content.classList.toggle('hidden', content.dataset.tabContent !== tabId);
  });
}
