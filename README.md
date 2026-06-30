# Nexalyze Mockups — NOS OLITEL

Repositorio de **mockups HTML interactivos** del ecosistema **NOS OLITEL** (Nexalyze). Sirve para validar diseño, flujos de usuario y contratos de datos **antes** de implementar el producto real.

No es una aplicación con backend: son prototipos navegables que simulan la experiencia final con datos de prueba.

## ¿Para qué existe?

El flujo de trabajo de este repo es:

```
Mockup UI  →  Análisis de BD  →  Auditoría  →  Desarrollo backend (otro repositorio)
```

1. **Mockup** — Pantallas HTML para revisar UX/UI con stakeholders.
2. **Análisis de BD** — Esquemas y mapeos campo a campo (mockup ↔ PostgreSQL).
3. **Auditoría** — Gaps, permisos, estados y flujos incompletos.
4. **Backend** — Implementación en **Laravel 13 + Vue 3 + PostgreSQL 16** (`schema: nos_gpc`).

## Módulos incluidos

| Módulo | Descripción | Entrada |
|--------|-------------|---------|
| **Portal NOS OLITEL** | Login simulado y selector de módulos | [`index.html`](index.html) |
| **RindeGastos** | Rendición digital de gastos (rendidor, aprobador, admin) | [`RindeGastos/index.html`](RindeGastos/index.html) |
| **NosInventario** | Inventario de postes, clientes, asignaciones y relevamiento de campo | [`NosInventario/index.html`](NosInventario/index.html) |

## Stack de los mockups

- HTML estático
- [Tailwind CSS](https://tailwindcss.com/) (CDN)
- JavaScript vanilla (sin frameworks)
- [Lucide Icons](https://lucide.dev/) — RindeGastos
- [Leaflet](https://leafletjs.com/) — NosInventario (mapas)

**Stack destino (producción):** Laravel 13 · Vue 3 · PostgreSQL 16

## Cómo ejecutar

Desde la raíz del proyecto:

```bash
# Opción 1 — Node
npx serve .

# Opción 2 — Python
python -m http.server 8000
```

Abre `http://localhost:3000` (o el puerto que indique tu servidor) y entra por [`index.html`](index.html).

> **Nota:** RindeGastos carga sidebar y header vía `fetch`. Sin servidor HTTP hay un fallback para abrir archivos con `file://`, pero se recomienda usar un servidor local.

## Estructura del repositorio

```
Nexalyze-Mockups/
├── index.html              # Portal principal NOS OLITEL
├── AGENTS.md               # Guía para agentes de IA (Cursor)
├── .cursor/                # Reglas y skills del proyecto
├── RindeGastos/            # Mockup multipágina (patrón de referencia)
│   ├── components/         # Sidebar y header compartidos
│   ├── assets/             # CSS y JS
│   ├── admin/              # Pantallas administrador
│   ├── rendidor/           # Pantallas rendidor
│   ├── aprobador/          # Pantallas aprobador
│   └── docs/               # BD, design system, auditoría
└── NosInventario/          # Mockup inventario de postes (SPA)
    ├── index.html
    ├── bd.md               # Esquema de base de datos
    └── README_Inventario_Postes.md
```

### Patrón arquitectónico

**RindeGastos** es el modelo de referencia para módulos nuevos:

- Una pantalla = un archivo HTML
- Layout compartido (`components/sidebar.html`, `components/header.html`)
- Estilos y utilidades en `assets/`
- Datos mock centralizados en `catalog.js`
- Documentación de BD junto al módulo en `docs/`

## Documentación por módulo

### RindeGastos
- [README](RindeGastos/README.md)
- [Estructura de BD](RindeGastos/docs/bd-estructura.md)
- [Design system](RindeGastos/docs/design-system.md)
- [Mapeo mockup ↔ BD](RindeGastos/docs/analisis-mockup-y-bd.txt)

### NosInventario
- [Especificación funcional](NosInventario/README_Inventario_Postes.md)
- [Esquema de BD](NosInventario/bd.md)
- [Flujo técnico de relevamiento](NosInventario/Readme%20flujo%20bd%20inventario%20postes.md)

### Design system global NOS OLITEL
- [Reglas de diseño](.claude/memory/project_nos_olitel_design_system.md)

## Convenciones

- Los mockups **no llaman a APIs reales**; las acciones se confirman con toasts `(mockup)`.
- Los datos de prueba usan nomenclatura de BD (`snake_case`, claves foráneas explícitas).
- Se reutilizan tablas del ecosistema NOS: `users`, `roles`, geo (`countries`, `departments`, etc.), `attachments`, `audit_logs`.

## Licencia y uso

Repositorio interno de Nexalyze para diseño y validación de producto. No desplegar como aplicación de producción.
