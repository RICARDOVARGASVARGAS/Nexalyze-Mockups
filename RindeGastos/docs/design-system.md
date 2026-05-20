# Design System - NOS OLITEL (Rendicion Digital)

Guia visual base del mockup HTML para validar UX/UI antes de implementar en Laravel + Vue.

## Paleta de colores

- `primary`: `#6B5BFF` (acciones principales, estado activo, identidad)
- `primary-light`: `#EDE9FE` (fondos de estados activos suaves)
- `primary-dark`: `#5849D6` (hover de accion primaria)
- `success`: `#22C55E` (aprobado, disponible, exito)
- `danger`: `#EF4444` (rechazos, alertas, acciones destructivas)
- `warning`: `#F59E0B` (pendiente, advertencias)
- `info`: `#3B82F6` (mensajes informativos)
- `ink`: `#1F2937` (texto principal)
- `ink-muted`: `#6B7280` (texto secundario)
- `ink-soft`: `#9CA3AF` (auxiliar/meta)
- `border`: `#E5E7EB` (bordes)
- `bg`: `#F5F7FA` (fondo general app)

Ejemplo:

```html
<button class="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg">
  Guardar
</button>
```

## Tipografia

- Familia base: `Inter, system-ui, sans-serif`
- Jerarquia recomendada:
  - Titulo principal: `text-2xl font-extrabold`
  - Titulo seccion: `text-lg font-extrabold uppercase`
  - Texto base: `text-sm`
  - Meta/ayuda: `text-xs text-ink-muted`
- Casing:
  - Navegacion y labels cortos: `uppercase`
  - Contenido descriptivo: sentence case

## Componentes

### Botones

```html
<!-- Primario -->
<button class="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-semibold">
  Guardar cambios
</button>

<!-- Secundario -->
<button class="bg-white border border-border hover:bg-bg text-ink px-4 py-2 rounded-lg font-medium">
  Cancelar
</button>

<!-- Danger -->
<button class="bg-danger hover:opacity-90 text-white px-4 py-2 rounded-lg font-semibold">
  Eliminar
</button>
```

### Cards

```html
<article class="bg-white border border-border rounded-xl p-6 shadow-sm">
  <h3 class="text-base font-bold text-ink">Titulo card</h3>
  <p class="text-sm text-ink-muted mt-1">Descripcion de apoyo.</p>
</article>
```

### Badges

```html
<span class="text-xs bg-success-light text-success px-2 py-0.5 rounded-full">✓ Disponible</span>
<span class="text-xs bg-gray-100 text-ink-muted px-2 py-0.5 rounded-full">○ Pendiente</span>
<span class="text-xs bg-danger-light text-danger px-2 py-0.5 rounded-full">Rechazado</span>
```

### Modales

```html
<div id="modalDemo" data-modal class="hidden fixed inset-0 bg-black/40 z-50 items-center justify-center">
  <div class="bg-white rounded-xl p-6 w-full max-w-lg">
    <h3 class="font-bold text-lg">Titulo modal</h3>
    <p class="text-sm text-ink-muted mt-2">Contenido del modal.</p>
  </div>
</div>
```

### Drawer

```html
<div class="hidden fixed inset-0 z-50">
  <div class="absolute inset-0 bg-black/30"></div>
  <aside id="drawerDemo" class="drawer-slide translate-x-full ml-auto h-full w-full max-w-md bg-white">
    <div class="p-6">Contenido del drawer</div>
  </aside>
</div>
```

### Inputs

```html
<label class="block text-xs font-semibold text-ink-muted uppercase mb-1">Proveedor</label>
<input type="text" class="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary">
```

### Toggles

```html
<label class="inline-flex items-center gap-2 cursor-pointer">
  <input type="checkbox" class="sr-only peer">
  <span class="w-10 h-6 bg-gray-200 rounded-full relative peer-checked:bg-primary transition-colors">
    <span class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4"></span>
  </span>
  <span class="text-sm text-ink">Incluir impuestos</span>
</label>
```

## Estados

- Hover: subir contraste o usar `hover:bg-bg`
- Focus: `focus:ring-2 focus:ring-primary-light focus:border-primary`
- Disabled: `opacity-50 cursor-not-allowed`
- Error: borde rojo + helper en `text-danger`

```html
<input class="w-full border border-danger rounded-lg px-3 py-2 text-sm">
<p class="text-xs text-danger mt-1">Este campo es obligatorio.</p>
```

## Espaciado

- `p-4`: bloques compactos (listas, filtros cortos)
- `p-6`: cards y formularios principales
- `gap-4`: separacion estandar entre controles
- `gap-6`: separacion entre bloques mayores
- `mb-2` / `mb-4` / `mb-6`: jerarquia vertical progresiva

Regla practica:
- Listados densos -> `p-4`
- Formularios y detalle -> `p-6`
- Secciones de pagina -> `px-6 py-4` o `px-8 py-6` en desktop
