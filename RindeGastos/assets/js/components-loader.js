const INLINE_COMPONENTS = {
  'sidebar.html': `<aside class="w-[220px] h-screen bg-[#F3F3F6] border-r border-[#E1E4EB] fixed left-0 top-0 flex flex-col z-40">
  <div class="px-3.5 py-4 border-b border-[#E2E5EC]">
    <div class="flex items-center gap-2.5">
      <div class="w-10 h-10 bg-gradient-to-br from-[#5F63F2] to-[#7B7AF8] rounded-xl flex items-center justify-center text-white font-extrabold text-lg shadow-sm">R</div>
      <div class="font-extrabold text-[#3B3D4E] text-xl leading-none tracking-tight">RENDICION DIGITAL</div>
    </div>
  </div>

  <nav class="flex-1 overflow-y-auto py-2.5">
    <a href="../index.html" class="menu-link">
      <i data-lucide="house" class="w-4 h-4"></i>
      <span>INICIO</span>
    </a>

    <div class="menu-caption">MODULO</div>

    <div data-group="rendidor">
      <button onclick="toggleSidebarGroup('rendidor')" class="menu-group">
        <span class="inline-flex items-center gap-2"><i data-lucide="user" class="w-4 h-4"></i>RENDIDOR</span>
        <i data-lucide="chevron-right" class="w-4 h-4 group-icon transition-transform"></i>
      </button>
      <div class="group-items hidden pl-2">
        <a href="../rendidor/gastos-listar.html" class="sidebar-item">
          <i data-lucide="receipt" class="w-4 h-4"></i>
          <span>GASTOS</span>
        </a>
        <a href="../rendidor/informes-listar.html" class="sidebar-item">
          <i data-lucide="file-text" class="w-4 h-4"></i>
          <span>INFORMES</span>
        </a>
        <a href="../rendidor/fondos-listar.html" class="sidebar-item">
          <i data-lucide="wallet" class="w-4 h-4"></i>
          <span>FONDOS</span>
        </a>
        <a href="../rendidor/galeria-listar.html" class="sidebar-item">
          <i data-lucide="images" class="w-4 h-4"></i>
          <span>GALERÍA</span>
        </a>
      </div>
    </div>

    <div data-group="aprobador">
      <button onclick="toggleSidebarGroup('aprobador')" class="menu-group">
        <span class="inline-flex items-center gap-2"><i data-lucide="user-check" class="w-4 h-4"></i>APROBADOR</span>
        <i data-lucide="chevron-right" class="w-4 h-4 group-icon transition-transform"></i>
      </button>
      <div class="group-items hidden pl-2">
        <a href="../aprobador/informes-bandeja.html" class="sidebar-item">
          <i data-lucide="file-search" class="w-4 h-4"></i>
          <span>REVISIÓN DE INFORMES</span>
        </a>
        <a href="../aprobador/solicitudes-bandeja.html" class="sidebar-item">
          <i data-lucide="wallet" class="w-4 h-4"></i>
          <span>SOLICITUDES DE FONDOS</span>
        </a>
      </div>
    </div>

    <div data-group="administrador">
      <button onclick="toggleSidebarGroup('administrador')" class="menu-group">
        <span class="inline-flex items-center gap-2"><i data-lucide="shield-check" class="w-4 h-4"></i>ADMINISTRADOR</span>
        <i data-lucide="chevron-right" class="w-4 h-4 group-icon transition-transform"></i>
      </button>
      <div class="group-items hidden pl-2">
        <a href="../admin/categorias-listar.html" class="sidebar-item">
          <i data-lucide="folder-tree" class="w-4 h-4"></i>
          <span>CATEGORÍAS</span>
        </a>
        <a href="../admin/paises-listar.html" class="sidebar-item">
          <i data-lucide="globe" class="w-4 h-4"></i>
          <span>PAÍSES</span>
        </a>
        <a href="../admin/monedas-listar.html" class="sidebar-item">
          <i data-lucide="coins" class="w-4 h-4"></i>
          <span>MONEDAS</span>
        </a>
        <a href="../admin/impuestos-listar.html" class="sidebar-item">
          <i data-lucide="receipt-text" class="w-4 h-4"></i>
          <span>IMPUESTOS</span>
        </a>
        <a href="../admin/flujos-listar.html" class="sidebar-item">
          <i data-lucide="git-branch" class="w-4 h-4"></i>
          <span>FLUJOS DE REVISIÓN</span>
        </a>
        <a href="../admin/politicas-listar.html" class="sidebar-item">
          <i data-lucide="scale" class="w-4 h-4"></i>
          <span>POLÍTICAS</span>
        </a>
        <a href="../admin/fondos-listar.html" class="sidebar-item">
          <i data-lucide="wallet-cards" class="w-4 h-4"></i>
          <span>FONDOS</span>
        </a>
        <a href="../admin/reporteria.html" class="sidebar-item">
          <i data-lucide="bar-chart-3" class="w-4 h-4"></i>
          <span>REPORTES</span>
        </a>
        <a href="../admin/usuarios-listar.html" class="sidebar-item">
          <i data-lucide="users" class="w-4 h-4"></i>
          <span>USUARIOS</span>
        </a>
      </div>
    </div>
  </nav>
</aside>

<style>
  .menu-link {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    margin: 0 8px;
    border-radius: 8px;
    color: #3F4252;
    font-size: 13px;
    font-weight: 500;
    text-transform: uppercase;
    text-decoration: none;
  }
  .menu-link:hover { background: #fff; }
  .menu-caption {
    padding: 14px 12px 6px;
    color: #A1A7B5;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: .04em;
  }
  .menu-group {
    width: calc(100% - 16px);
    margin: 2px 8px;
    padding: 10px 12px;
    border-radius: 8px;
    color: #4A4F60;
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .menu-group:hover { background: #fff; }
  .sidebar-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 10px;
    margin: 2px 8px;
    border-radius: 8px;
    color: #525768;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    cursor: pointer;
    text-decoration: none;
  }
  .sidebar-item i { color: #848B9B; }
  .sidebar-item:hover { background: #fff; }
  .sidebar-item.active {
    background: linear-gradient(90deg, #7669EF 0%, #6A5CE4 100%);
    color: #fff;
    box-shadow: 0 4px 10px rgba(117, 102, 235, 0.35);
  }
  .sidebar-item.active i { color: #fff; }
</style>`,
  'header.html': `<header class="h-14 bg-[#F8F8FB] border-b border-[#E6E8EE] fixed top-0 right-0 left-[220px] flex items-center justify-between px-5 z-30">

  <div id="breadcrumb" class="text-[13px] font-semibold uppercase text-ink tracking-wide">
    TABLAS GENERALES / CONECTORES
  </div>

  <div class="flex items-center gap-2.5">
    <button class="w-8 h-8 rounded-full hover:bg-white flex items-center justify-center text-ink-muted transition-colors">
      <i data-lucide="search" class="w-4 h-4"></i>
    </button>
    <div class="relative">
      <button onclick="toggleThemeMenu()" class="w-8 h-8 rounded-full hover:bg-white flex items-center justify-center text-ink-muted transition-colors">
        <i data-lucide="moon-star" class="w-4 h-4"></i>
      </button>
      <div id="themeMenu" class="hidden absolute right-0 top-full mt-2 w-44 bg-white border border-border rounded-lg shadow-lg p-2 z-50">
        <button onclick="setThemePreference('light')" data-theme-option="light" class="theme-option">
          <i data-lucide="sun" class="w-4 h-4"></i>
          <span>Claro</span>
        </button>
        <button onclick="setThemePreference('dark')" data-theme-option="dark" class="theme-option">
          <i data-lucide="moon-star" class="w-4 h-4"></i>
          <span>Oscuro</span>
        </button>
        <button onclick="setThemePreference('system')" data-theme-option="system" class="theme-option">
          <i data-lucide="monitor" class="w-4 h-4"></i>
          <span>Sistema</span>
        </button>
      </div>
    </div>
    <button class="w-8 h-8 rounded-full hover:bg-white flex items-center justify-center text-ink-muted relative transition-colors">
      <i data-lucide="bell" class="w-4 h-4"></i>
      <span class="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full"></span>
    </button>
    <button class="w-8 h-8 rounded-full hover:bg-white flex items-center justify-center text-ink-muted transition-colors">
      <i data-lucide="layout-grid" class="w-4 h-4"></i>
    </button>

    <div class="relative">
      <button onclick="toggleUserMenu()" class="flex items-center gap-2 hover:bg-white rounded-full px-1 py-1 transition-colors">
        <div class="relative">
          <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xs">AG</div>
          <span class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success rounded-full border-2 border-white"></span>
        </div>
      </button>
      <div id="userMenu" class="hidden absolute right-0 top-full mt-2 w-56 bg-white border border-border rounded-lg shadow-lg py-1 z-50">
        <a href="#" class="flex items-center gap-3 px-4 py-2 hover:bg-bg text-sm text-ink">
          <i data-lucide="user" class="w-4 h-4"></i>
          <span>MI PERFIL</span>
        </a>
        <a href="#" class="flex items-center gap-3 px-4 py-2 hover:bg-bg text-sm text-ink">
          <i data-lucide="settings" class="w-4 h-4"></i>
          <span>CONFIGURACIÓN</span>
        </a>
        <hr class="my-1 border-border">
        <a href="#" class="flex items-center gap-3 px-4 py-2 hover:bg-bg text-sm text-danger">
          <i data-lucide="log-out" class="w-4 h-4"></i>
          <span>CERRAR SESIÓN</span>
        </a>
      </div>
    </div>
  </div>
</header>

<style>
  .theme-option {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 10px;
    border-radius: 8px;
    color: #4B5161;
    font-size: 14px;
    font-weight: 500;
  }
  .theme-option:hover {
    background: #F3F4FA;
  }
  .theme-option.active {
    background: #EDE9FE;
    color: #6B5BFF;
    font-weight: 600;
  }
</style>`
};

function getInlineComponent(componentPath) {
  const normalizedPath = (componentPath || '').replace(/\\/g, '/');
  if (normalizedPath.endsWith('/sidebar.html') || normalizedPath === 'sidebar.html') {
    return INLINE_COMPONENTS['sidebar.html'];
  }
  if (normalizedPath.endsWith('/header.html') || normalizedPath === 'header.html') {
    return INLINE_COMPONENTS['header.html'];
  }
  return null;
}

function getRootPrefixFromComponentsBasePath(componentsBasePath) {
  const normalized = (componentsBasePath || 'components').replace(/\\/g, '/').replace(/\/$/, '');
  if (normalized === 'components') return '.';
  if (normalized.endsWith('/components')) {
    const prefix = normalized.slice(0, -'/components'.length);
    return prefix || '.';
  }
  return '.';
}

function buildProjectHref(rootPrefix, destination) {
  const cleanPrefix = (rootPrefix || '.').replace(/\/$/, '');
  if (cleanPrefix === '.' || cleanPrefix === '') return destination;
  return `${cleanPrefix}/${destination}`;
}

function normalizeSidebarLinks(rootPrefix = '.') {
  const sidebarMount = document.getElementById('sidebar-mount');
  if (!sidebarMount) return;

  const anchors = sidebarMount.querySelectorAll('a[href]');
  anchors.forEach((anchor) => {
    const originalHref = anchor.getAttribute('href') || '';
    const normalizedHref = originalHref.replace(/\\/g, '/').replace(/^\.\//, '').replace(/^(\.\.\/)+/, '');
    const isInternalPage = /^(index\.html|(rendidor|aprobador|admin)\/.+\.html)$/i.test(normalizedHref);
    if (!isInternalPage) return;
    anchor.setAttribute('href', buildProjectHref(rootPrefix, normalizedHref));
  });
}

// Carga un componente HTML via fetch
async function loadComponent(elementId, componentPath) {
  const mount = document.getElementById(elementId);
  try {
    const response = await fetch(componentPath);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const html = await response.text();
    if (mount) mount.innerHTML = html;
  } catch (error) {
    const inlineComponent = getInlineComponent(componentPath);
    if (inlineComponent && mount) {
      mount.innerHTML = inlineComponent;
      return;
    }
    console.error(`Error cargando ${componentPath}:`, error);
    if (mount) {
      mount.innerHTML = `<div class="p-4 text-danger text-sm">Error: ${componentPath}</div>`;
    }
  }
}

// Marca item activo del sidebar comparando href
function setActiveSidebarItem() {
  const currentPath = window.location.pathname.split('/').pop();
  const items = document.querySelectorAll('.sidebar-item');
  items.forEach((item) => {
    const href = item.getAttribute('href');
    if (href && href.includes(currentPath) && currentPath !== '') {
      item.classList.add('active');

      // Auto-expandir el grupo padre
      const groupItems = item.closest('.group-items');
      if (groupItems && groupItems.classList.contains('hidden')) {
        groupItems.classList.remove('hidden');
        const button = groupItems.previousElementSibling;
        const icon = button?.querySelector('.group-icon');
        if (icon) icon.classList.add('rotate-90');
      }
    }
  });
}

// Actualiza el breadcrumb del header
function updateBreadcrumb(text) {
  const el = document.getElementById('breadcrumb');
  if (el) el.textContent = text;
}

// Toggle de grupo del sidebar
function toggleSidebarGroup(groupName) {
  const group = document.querySelector(`[data-group="${groupName}"]`);
  if (!group) return;
  const items = group.querySelector('.group-items');
  const icon = group.querySelector('.group-icon');
  if (!items || !icon) return;
  items.classList.toggle('hidden');
  icon.classList.toggle('rotate-90');
}

// Toggle del menu de usuario
function toggleUserMenu() {
  document.getElementById('userMenu')?.classList.toggle('hidden');
}

// Toggle del menu de tema
function toggleThemeMenu() {
  document.getElementById('themeMenu')?.classList.toggle('hidden');
}

function getAppliedTheme(pref) {
  if (pref === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return pref;
}

function applyTheme(pref = 'light') {
  const applied = getAppliedTheme(pref);
  document.documentElement.classList.toggle('theme-dark', applied === 'dark');
  document.documentElement.classList.toggle('theme-light', applied !== 'dark');

  document.querySelectorAll('[data-theme-option]').forEach((option) => {
    option.classList.toggle('active', option.dataset.themeOption === pref);
  });
}

function setThemePreference(pref) {
  localStorage.setItem('rd_theme', pref);
  applyTheme(pref);
  document.getElementById('themeMenu')?.classList.add('hidden');
}

function initTheme() {
  const pref = localStorage.getItem('rd_theme') || 'light';
  applyTheme(pref);
}

// Inicializacion: carga sidebar + header + activa item + lucide
async function initLayout(breadcrumbText = 'RENDICION DIGITAL', componentsBasePath = 'components') {
  const basePath = componentsBasePath.replace(/\/$/, '');
  const rootPrefix = getRootPrefixFromComponentsBasePath(basePath);
  await Promise.all([
    loadComponent('sidebar-mount', `${basePath}/sidebar.html`),
    loadComponent('header-mount', `${basePath}/header.html`)
  ]);
  normalizeSidebarLinks(rootPrefix);
  setActiveSidebarItem();
  updateBreadcrumb(breadcrumbText);
  initTheme();
  if (window.lucide) lucide.createIcons();
}

// Click fuera del menu de usuario lo cierra
document.addEventListener('click', (e) => {
  const menu = document.getElementById('userMenu');
  const themeMenu = document.getElementById('themeMenu');
  const isInMenu = e.target.closest('#userMenu') || e.target.closest('button[onclick="toggleUserMenu()"]');
  const isInThemeMenu = e.target.closest('#themeMenu') || e.target.closest('button[onclick="toggleThemeMenu()"]');
  if (menu && !isInMenu && !menu.classList.contains('hidden')) {
    menu.classList.add('hidden');
  }
  if (themeMenu && !isInThemeMenu && !themeMenu.classList.contains('hidden')) {
    themeMenu.classList.add('hidden');
  }
});
