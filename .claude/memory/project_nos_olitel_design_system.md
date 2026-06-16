---
name: nos-olitel-design-system
description: Reglas de diseño del sistema NOS OLITEL — sidebar, tabla, buscador, paginación, modal, badges, botones
metadata:
  type: project
---

# Design System — NOS OLITEL

## Layout general
- Sidebar izquierdo fijo, ancho ~230px, fondo oscuro `#1A1D2E`
- Content area: fondo `#F2F2F7`, ocupa el resto del ancho

## Sidebar
- Fondo: `#1A1D2E` (dark navy-charcoal)
- Logo: icono N en `#7B6EF8` + texto "NOS OLITEL" blanco bold
- Icono de reloj/config a la derecha del logo: gris muted
- Item raíz ("INICIO"): text-xs uppercase tracking-widest, blanco, con ícono
- Section label (ej. "NOS INVENTARIO"): text-[10px] uppercase tracking-widest, color muted `#6B7280`
- Item de menú: text-xs uppercase tracking-wide, blanco, padding vertical
- Item expandible: flecha `>` a la derecha, al expandir muestra sub-items con sangría y "+"
- Item activo: fondo `#7B6EF8`, texto blanco, rounded
- Sub-items: prefijo "+", text-xs uppercase, indent izquierdo

## Barra superior (topbar)
- Fondo blanco, border-bottom sutil
- Izquierda: breadcrumb uppercase tracking-wide "TABLAS GENERALES / NAP"
- Derecha: ícono búsqueda | ícono sol (theme toggle) | iniciales usuario | avatar con dot verde

## Sección header de tabla (dentro del card)
- Fondo blanco, borde inferior
- Izquierda: ícono en cuadrado redondeado con color del módulo (fondo tenue) + título uppercase bold + subtítulo uppercase pequeño gris
- Derecha: botones de acción ("GENERAR", "IMPORTAR") — estilo primary

## Buscador
- Input full-width, border `#E8E8F0`, rounded-lg, placeholder uppercase gris
- Ícono lupa a la izquierda dentro del input
- A la derecha (fuera o dentro): badge "XXX RESULTADOS" con ícono filtro, fondo `#EDE9FE`, texto `#7B6EF8`

## Tabla
- Encabezados: text-[10px] uppercase tracking-widest, color `#A0A0B8`
- Fila hover: fondo sutil `#F9F9FC`
- Separadores: border-b `#E8E8F0`

### Tipos de celda
| Tipo | Estilo |
|------|--------|
| Código/ID | pill redondeado, bg `#EDE9FE`, text `#7B6EF8`, font-medium text-xs |
| Badge VERTICAL | bg `#CCFBF1`, text `#0F766E`, rounded-full text-xs font-bold |
| Badge EDIFICIO | bg `#DBEAFE`, text `#1D4ED8`, rounded-full text-xs font-bold |
| Porcentaje (puertos) | pill bg naranja claro `#FEF3C7`, text `#D97706` |
| Capacidad VACANTE | texto gris + barra gris muy tenue |
| Capacidad OPTIMO | texto azul + barra azul/primary |
| Capacidad ADVERTENCIA | texto naranja + barra naranja |
| Capacidad CRITICO | texto rojo + barra roja |
| Acciones | ícono lápiz gris hover primary + ícono basura gris hover rojo |

## Paginación
- Alineada bottom-right
- Texto: "Elementos por página: [15 ▼]  1-15 de 300"
- Flechas: primera `|<`, anterior `<`, siguiente `>`, última `>|`
- Estilo: text-xs gris, flechas en botones con border

## Botones
| Variante | Estilo |
|----------|--------|
| Primary | bg `#7B6EF8` text-white rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider + ícono opcional |
| Secondary / Cancel | bg blanco border `#E8E8F0` text `#6B6B8A` rounded-lg |
| Destructivo | bg rojo text-white |

## Modal edición
- Overlay dark semi-transparent
- Card blanco, rounded-2xl, shadow-xl, max-w-4xl, scrollable interno
- Header: ícono + título uppercase + subtítulo + dropdown EST. INVENTARIO top-right
- Secciones internas: card con header de sección (ícono en color + título uppercase + subtítulo), sin borde externo
- Badge "SOLO LECTURA": bg `#EDE9FE`, text `#7B6EF8`, rounded
- Grid de campos: 3 columnas, label uppercase text-[10px] tracking-widest, input deshabilitado gris
- Footer: botones CANCELAR (secondary) + ACTUALIZAR (primary) alineados derecha

## Íconos usados
- Sidebar toggle: ChevronRight / ChevronDown
- Búsqueda: Search (lupa)
- Editar: Pencil / Edit2
- Eliminar: Trash2
- Mapa/NAP: Globe / MapPin
- Tablas generales: Grid / LayoutGrid
- Filtro: Filter / SlidersHorizontal

**Why:** El usuario quiere que todos los módulos futuros (NosInventario, otros) respeten exactamente este sistema visual. Anotado para reutilización en cualquier pantalla nueva.

**How to apply:** Antes de crear cualquier pantalla nueva dentro de NOS OLITEL, usar estas reglas como base. No inventar estilos nuevos — todo debe ser coherente con este sistema.
