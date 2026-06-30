# Nexalyze Mockups — Guía para Agentes

Repositorio de **mockups HTML interactivos** del ecosistema **NOS OLITEL** (Nexalyze). Objetivo: validar UX/UI y contratos de datos **antes** de implementar en **Laravel 13 + Vue 3 + PostgreSQL 16**.

## Rol del agente

Actúa como **senior en UI/UX** (HTML, CSS, Tailwind, JS vanilla), **análisis de diseño**, **modelado de BD** y **arquitectura escalable**. No implementes backend real aquí; prepara mockups y documentación que sirvan de contrato para el desarrollo posterior.

## Flujo de trabajo

```
1. Mockup UI  →  2. Análisis BD  →  3. Auditoría  →  4. Backend (fuera de este repo)
```

| Fase | Entregable |
|------|------------|
| Mockup | Pantallas HTML modulares, design system coherente |
| BD | `docs/bd-estructura.md` + mapeo mockup↔tablas |
| Auditoría | Gaps, estados, permisos, flujos incompletos |
| Backend | Migraciones Laravel, API, Vue SPA (otro repo) |

## Módulos actuales

| Módulo | Arquitectura | Referencia |
|--------|--------------|------------|
| **RindeGastos** | Multipágina modular (patrón objetivo) | `RindeGastos/` |
| **NosInventario** | SPA monolítica (~7k líneas) — **refactor pendiente** | `NosInventario/` |
| **Portal** | Shell corporativo + selector de módulos | `index.html` |

## Patrón arquitectónico obligatorio (nuevos módulos y refactors)

Seguir la estructura de **RindeGastos** como estándar de producción:

```
{Modulo}/
├── index.html                 # Sitemap navegacional
├── components/                # sidebar.html, header.html
├── assets/css/custom.css
├── assets/js/
│   ├── components-loader.js   # initLayout(), fetch + fallback file://
│   ├── ui.js                  # modales, toasts, drawers, tabs
│   └── catalog.js             # datos mock centralizados
├── {rol}/                     # páginas por dominio (admin/, rendidor/, etc.)
│   └── {entidad}-{accion}.html
└── docs/
    ├── design-system.md
    ├── bd-estructura.md
    └── analisis-mockup-y-bd.txt
```

Cada página HTML usa: `#sidebar-mount`, `#header-mount`, `initLayout(breadcrumb, '../components')`.

## Design system

- **NOS OLITEL global**: `.claude/memory/project_nos_olitel_design_system.md` (sidebar `#1A1D2E`, primary `#7B6EF8`)
- **RindeGastos**: `RindeGastos/docs/design-system.md` (variante clara, primary `#6B5BFF`)
- Nuevos módulos del portal NOS OLITEL → design system global. Módulos con identidad propia → documentar variante en `docs/design-system.md`.

## Recursos del proyecto

- Skill detallada: `.cursor/skills/nexalyze-mockup-expert/SKILL.md`
- Regla siempre activa: `.cursor/rules/nexalyze-mockups-core.mdc`
- Servidor local: `npx serve .` (RindeGastos requiere HTTP para fetch de componentes)

## Convenciones

- Stack mockup: HTML estático + Tailwind CDN + JS vanilla + Lucide Icons
- Sin frameworks (React/Vue) en mockups
- Datos mock con nomenclatura de BD (`snake_case`, FKs explícitas)
- Acciones sin backend: `showToast('... (mockup)')`
- Reutilizar tablas NOS existentes: `users`, `roles`, geo `public.*`, `attachments`, `audit_logs`
