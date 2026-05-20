# Mockup Rendición Digital - NOS OLITEL

Mockup HTML interactivo del módulo Rendición Digital para validación visual
antes de implementación en Laravel 13 + Vue 3.

## Stack

- HTML estatico
- Tailwind CSS (CDN)
- Vanilla JavaScript
- Lucide Icons

## Cómo correr

Necesitas servidor HTTP local porque los componentes se cargan vía fetch:

```bash
# Opción 1: Node
npx serve .

# Opción 2: Python
python -m http.server 8000

# Opcion 3: VSCode -> Live Server extension
```

Abre `http://localhost:3000/index.html` (o el puerto que te indique tu servidor).

## Compartir como HTML (sin servidor)

Tambien funciona abriendo los `.html` directamente (`file://`): si `fetch` falla, el layout usa un fallback embebido para `sidebar` y `header`.

Recomendacion:
- Compartir toda la carpeta del proyecto (manteniendo estructura de subcarpetas).
- Abrir por ejemplo `index.html` o cualquier vista dentro de `rendidor/`, `aprobador/` o `admin/`.

## Estructura

- `index.html` - Sitemap navegacional
- `components/` - Sidebar y header reusables (cargados via fetch)
- `assets/` - CSS y JS compartidos
- `docs/` - Documentacion de BD y design system

## Documentacion

- [Estructura BD](docs/bd-estructura.md)
- [Design System](docs/design-system.md)
