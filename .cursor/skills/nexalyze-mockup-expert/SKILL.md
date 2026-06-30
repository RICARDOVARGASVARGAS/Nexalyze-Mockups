---
name: nexalyze-mockup-expert
description: Experto senior en mockups HTML/CSS/Tailwind/JS, análisis UX, modelado de BD PostgreSQL y arquitectura escalable para Nexalyze-Mockups (NOS OLITEL). Usar al crear mockups, refactorizar módulos, analizar pantallas vs BD, diseñar esquemas, auditar gaps o preparar migración a Laravel 13 + Vue 3.
---

# Nexalyze Mockup Expert

## Misión

Validar producto mediante mockups interactivos de calidad producción y generar contratos técnicos (UI + BD + arquitectura) para el backend real.

## Fases del workflow

### Fase 1 — Mockup UI

**Antes de codificar:**
1. Leer README y casos de uso del módulo
2. Revisar design system (global o del módulo)
3. Listar pantallas, roles y flujos en sitemap (`index.html`)

**Al implementar:**
- Una pantalla = un HTML en carpeta de rol
- Layout compartido vía `components-loader.js` (ver `RindeGastos/`)
- Estilos en `assets/css/custom.css`; no CSS inline masivo
- Datos mock en `assets/js/catalog.js` o archivos por dominio
- Iconos: Lucide CDN
- Interacciones: `ui.js` (modales, toasts, drawers, tabs)
- Acciones sin API: `showToast('Guardado (mockup)')`

**Plantilla mínima de página:**

```html
<div id="sidebar-mount"></div>
<div id="header-mount"></div>
<main class="ml-0 md:ml-[220px] pt-16"><!-- contenido --></main>
<script src="https://unpkg.com/lucide@latest"></script>
<script src="../assets/js/components-loader.js"></script>
<script src="../assets/js/ui.js"></script>
<script>
  initLayout('MODULO / SECCIÓN', '../components').then(() => lucide.createIcons());
</script>
```

### Fase 2 — Análisis de BD

Ver [database-analysis.md](database-analysis.md). Entregables:
- `docs/bd-estructura.md` — tablas, tipos PostgreSQL, FKs, índices
- `docs/analisis-mockup-y-bd.txt` — mapeo campo UI ↔ columna
- Datos mock alineados a nomenclatura final

### Fase 3 — Auditoría pre-backend

Checklist:
- [ ] Cada pantalla del sitemap existe y navega desde sidebar
- [ ] Estados de entidad cubiertos (draft, pending, approved, etc.)
- [ ] Permisos por rol documentados
- [ ] Campos obligatorios vs opcionales definidos
- [ ] Relaciones FK reflejadas en selects/combos del mockup
- [ ] Flujos de error y vacío (sin datos, validación)
- [ ] Gaps documentados en `docs/auditoria-reporte.md`

### Fase 4 — Handoff backend (fuera del repo)

El mockup + docs definen:
- Rutas Vue (1 HTML ≈ 1 ruta)
- Endpoints API REST
- Migraciones Laravel
- Policies por rol

## Arquitectura escalable

Ver [architecture-reference.md](architecture-reference.md).

**Regla:** RindeGastos = referencia. NosInventario y futuros módulos deben converger al mismo patrón.

## Análisis de diseño UX

Al revisar o crear pantallas, evaluar:

| Criterio | Preguntas |
|----------|-----------|
| Jerarquía | ¿El CTA principal es obvio? ¿KPIs antes de tabla? |
| Densidad | ¿Tabla legible? ¿Modales no sobrecargados? |
| Consistencia | ¿Mismos patrones de búsqueda, paginación, badges? |
| Flujo | ¿Mínimos clics para tarea frecuente? |
| Estados | ¿Loading, vacío, error, solo lectura? |
| Accesibilidad | Contraste, labels, focus visible |
| Responsive | Sidebar colapsable, tablas scroll en móvil |

## Módulos de referencia

| Qué copiar | Dónde |
|------------|-------|
| Arquitectura multipágina | `RindeGastos/` |
| components-loader + fallback | `RindeGastos/assets/js/components-loader.js` |
| UI utilities | `RindeGastos/assets/js/ui.js` |
| Catálogo mock centralizado | `RindeGastos/assets/js/catalog.js` |
| BD completa documentada | `RindeGastos/docs/bd-estructura.md` |
| Mapeo mockup↔BD | `RindeGastos/docs/analisis-mockup-y-bd.txt` |
| Design system NOS OLITEL | `.claude/memory/project_nos_olitel_design_system.md` |
| Dominio inventario + flujo campo | `NosInventario/bd.md`, `NosInventario/Readme flujo bd inventario postes.md` |

## Anti-patrones

- ❌ SPA monolítica de miles de líneas en un solo `index.html`
- ❌ CSS/JS inline masivo sin extraer a `assets/`
- ❌ Datos mock duplicados entre pantallas
- ❌ Campos UI sin nombre de columna BD
- ❌ Pantallas huérfanas (en código pero no en sidebar/sitemap)
- ❌ Inventar estilos fuera del design system

## Servidor local

```bash
npx serve .
# o: python -m http.server 8000
```

RindeGastos usa `fetch` para componentes; sin servidor hay fallback `file://` en `components-loader.js`.
