# Arquitectura de referencia — Nexalyze Mockups

## Estado actual del monorepo

```
Nexalyze-Mockups/
├── index.html                    # Portal NOS OLITEL
├── AGENTS.md
├── .cursor/rules/                # Reglas siempre activas
├── .cursor/skills/               # Workflows especializados
├── RindeGastos/                  # ✅ Patrón objetivo
└── NosInventario/                # ⚠️ Monolito — refactor pendiente
```

## Patrón por módulo (producción)

```
{Modulo}/
├── index.html                    # Sitemap: tarjetas por rol/flujo
├── README.md                     # Stack, cómo correr, enlaces docs
├── components/
│   ├── sidebar.html              # Menú por roles, grupos colapsables
│   └── header.html               # Breadcrumb, tema, usuario, notificaciones
├── assets/
│   ├── css/custom.css            # Variables, KPI cards, tablas, tema oscuro
│   └── js/
│       ├── components-loader.js  # loadComponent, initLayout, setActiveSidebarItem
│       ├── ui.js                 # showToast, modales, drawers, tabs
│       └── catalog.js            # window.{MOD}_CATALOG — datos mock compartidos
├── {rol}/                        # Subcarpetas por dominio de negocio
│   └── {entidad}-{accion}.html   # Convención: gastos-listar, informes-crear
└── docs/
    ├── design-system.md
    ├── bd-estructura.md
    ├── analisis-mockup-y-bd.txt
    └── auditoria-reporte.md
```

## Convención de nombres

| Elemento | Patrón | Ejemplo |
|----------|--------|---------|
| Página listado | `{entidad}-listar.html` | `gastos-listar.html` |
| Página crear | `{entidad}-crear.html` | `informes-crear.html` |
| Página detalle | `{entidad}-detalle.html` | `informes-detalle.html` |
| Página editar | `{entidad}-editar.html` | `categorias-editar.html` |
| Catálogo JS | `window.{PREFIX}_CATALOG` | `window.RD_CATALOG` |

## components-loader.js — contrato

Funciones esperadas:
- `loadComponent(mountId, path)` — fetch HTML a `#sidebar-mount` / `#header-mount`
- `initLayout(breadcrumb, componentsPath)` — carga layout + marca item activo
- `setActiveSidebarItem()` — resalta menú según URL
- `toggleSidebarGroup(id)` — grupos colapsables del sidebar
- Fallback inline para `file://` cuando fetch falla

## Evolución futura: capa shared del monorepo

Cuando haya 3+ módulos, extraer al nivel raíz:

```
shared/
├── components/
│   ├── portal-header.html        # Shell NOS OLITEL común
│   └── theme-toggle.js
├── assets/
│   ├── css/nos-olitel-base.css   # Tokens del design system global
│   └── js/
│       └── ui-core.js            # Toasts, modales base
└── design-system/
    └── tokens.md
```

Cada módulo mantiene su `sidebar.html` (menú específico) pero hereda tokens y utilidades de `shared/`.

## Mapeo mockup → producción Vue/Laravel

| Mockup | Vue 3 | Laravel |
|--------|-------|---------|
| `components/sidebar.html` | `AppSidebar.vue` | — |
| `components/header.html` | `AppHeader.vue` | — |
| `{rol}/{pagina}.html` | `pages/{rol}/{Pagina}.vue` | — |
| `assets/js/catalog.js` | Pinia store / composable | API Resource |
| `docs/bd-estructura.md` | Types TS generados | Migrations + Models |
| Roles en sidebar | Vue Router guards | Policies + Middleware |

## Refactor NosInventario — plan sugerido

1. Extraer CSS → `NosInventario/assets/css/custom.css`
2. Extraer JS (navTo, renderView, DB mock) → `assets/js/` por dominio
3. Crear `components/sidebar.html` + `header.html`
4. Dividir vistas en HTML: `supervisor/postes-listar.html`, `supervisor/clientes-listar.html`, etc.
5. Crear `index.html` sitemap
6. Migrar datos mock a `catalog.js` o `inventory-data.js`
7. Documentar en `docs/design-system.md` y alinear a NOS OLITEL global
8. Mantener Leaflet en páginas que lo requieran (carga condicional)

## Escalabilidad — principios

1. **Separación por pantalla** — facilita review, permisos y rutas
2. **Layout compartido** — un cambio de menú actualiza todo el módulo
3. **Datos mock centralizados** — una fuente de verdad antes de API
4. **Docs como contrato** — BD y mapeos viven junto al módulo
5. **Convenciones predecibles** — cualquier dev encuentra archivos sin preguntar
6. **Sin build step** — mockups abren con servidor estático; migración a Vue es 1:1
