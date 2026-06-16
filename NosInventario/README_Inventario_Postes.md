# NosInventario — Especificación de Casos de Uso

Sistema web para gestionar el relevamiento de infraestructura de red (postes) y la asignación de clientes a técnicos de campo. SPA en un solo `index.html`, sin build tools, Tailwind CSS + Vanilla JS.

---

## Módulos del sistema

| Módulo | Descripción |
|---|---|
| **Postes** | Catálogo de postes relevados con datos técnicos, ubicación, fotos y operadores |
| **Clientes** | Registro de clientes a relevar, con ubicación geográfica y NAP asociada |
| **Asignaciones** | Gestión de qué técnico atiende a qué cliente |
| **Tablas de referencia** | Propietario, Material, Tensión, Tipo Cable, Condición, Fabricante |

---

## Módulo: Asignaciones

### Actores
- **Supervisor** — opera desde la web (este sistema)
- **Técnico** — recibe la asignación y la ejecuta en campo

### Estados de asignación

| Estado | Descripción |
|---|---|
| `libre` | El cliente no tiene ninguna asignación activa |
| `pendiente` | Asignado pero el técnico aún no ha iniciado |
| `en_progreso` | El técnico está actualmente en campo con ese cliente |
| `completado` | El relevamiento fue exitoso |
| `fallido` | El técnico intentó pero no pudo completar (sin acceso, etc.) |
| `cancelado` | La asignación fue cancelada por el supervisor |

### Regla de elegibilidad

Un cliente aparece como disponible para asignar **solo si**:
- No tiene ninguna asignación, **o**
- Su última asignación está en `completado` o `fallido`

Clientes con asignaciones `pendiente`, `en_progreso` o `cancelado` **no aparecen** en el modal de nueva asignación.

---

### CU-01: Nueva asignación

**Actor:** Supervisor  
**Disparador:** Click en "Nueva Asignación"

**Flujo:**
1. Se abre el modal de asignación
2. El supervisor selecciona un técnico mediante buscador (dropdown con nombre y código)
3. La tabla inferior muestra solo los clientes elegibles (regla de elegibilidad)
4. El supervisor puede filtrar la tabla por:
   - Texto libre (buscar por nombre/código)
   - Departamento / Provincia / Distrito
5. La tabla pagina de a 15 (soporta hasta 1 500 registros simulados)
6. El supervisor selecciona uno o más clientes con checkbox
7. Hace click en "Asignar" → se abre modal de confirmación con resumen
8. Confirma → las asignaciones se crean con estado `pendiente`
9. La tabla principal se refresca con animación de carga

**Validaciones:**
- No se puede confirmar sin técnico seleccionado
- No se puede confirmar sin al menos un cliente seleccionado

---

### CU-02: Reasignar / Liberar (estado `pendiente`)

**Actor:** Supervisor  
**Disparador:** Click en botón ⋯ en una fila con estado `pendiente`

**Opciones del modal:**

**a) Reasignar a otro técnico**
1. Seleccionar nuevo técnico con buscador
2. Confirmar → `technician_id` se actualiza, estado queda `pendiente`
3. Tabla refresca con animación de carga

**b) Liberar asignación**
1. Confirmar → se elimina el registro de asignación, cliente queda `libre`
2. Tabla refresca con animación de carga

---

### CU-03: Cancelar asignación

**Actor:** Supervisor  
**Aplica a:** filas con estado `pendiente` o `en_progreso`  
**Disparador:** Click en botón ✕ rojo en la fila

**Flujo:**
1. Se abre modal de confirmación mostrando: nombre del cliente, estado actual, técnico asignado
2. Supervisor confirma → estado pasa a `cancelado`
3. Tabla refresca con animación de carga y toast de advertencia

**Nota:** `cancelado` es un estado terminal desde la perspectiva del supervisor. El cliente puede ser reasignado en el futuro (está excluido de elegibilidad mientras tenga ese estado).

---

### CU-04: Filtros de la tabla principal

El supervisor puede filtrar la tabla de asignaciones por:

| Filtro | Valores |
|---|---|
| **Estado** | Sin Asignar / Pendiente / En Progreso / Completado / Fallido / Cancelado |
| **Departamento** | Lista de departamentos del Perú |
| **Provincia** | Filtrado por departamento seleccionado |
| **Distrito** | Filtrado por provincia seleccionada |
| **Técnico** | Dropdown con los técnicos registrados |
| **Búsqueda** | Texto libre, se activa con botón "Generar" |

---

## Módulo: Clientes

### CU-05: Registrar cliente

**Actor:** Supervisor  
**Flujo:**
1. Click en "Nuevo" → modal de 4 tabs
2. Tab 1 — Datos: nombre, DNI/RUC, tipo, teléfono, email
3. Tab 2 — Ubicación: país, departamento, provincia, distrito, dirección, coordenadas GPS
4. Tab 3 — NAP: selección de NAP asociada al cliente
5. Tab 4 — Foto: carga de foto de fachada (FileReader base64)
6. Guardar → cliente aparece en tabla

### CU-06: Editar / Eliminar cliente

- **Editar:** mismo modal de 4 tabs cargado con datos existentes
- **Eliminar:** modal de confirmación mostrando nombre y estado

### CU-07: Ver detalle de cliente

Abre modal de solo lectura con toda la información del cliente y mapa Leaflet con coordenadas.

---

## Módulo: Postes

### CU-08: Registrar poste

**Actor:** Técnico / Supervisor  
**Flujo:**
1. Click en "Nuevo" → modal de 4 tabs
2. Tab 1 — Datos: código, propietario, material, tensión, condición, fabricante, altura
3. Tab 2 — Ubicación: coordenadas GPS, departamento/provincia/distrito
4. Tab 3 — Operadores: listado de cables de terceros en el poste
5. Tab 4 — Fotos: hasta N fotos del poste (FileReader base64)
6. Guardar → poste aparece en tabla con badge de condición

### CU-09: Ver historial de poste

Modal de línea de tiempo con los relevamientos donde aparece ese poste, incluyendo fechas y estado.

---

## Módulo: Tablas de referencia

CRUD genérico compartido para: Propietario Poste, Material Poste, Tensión Poste, Tipo Cables, Condición Poste, Fabricante Poste.

Cada tabla soporta: **Nuevo**, **Editar**, **Eliminar** con modal de confirmación.

---

## Flujo completo supervisor → técnico

```
Supervisor                          Técnico (campo)
    |                                     |
    |-- Importa Excel de clientes         |
    |-- Crea nueva asignación             |
    |   (elige técnico + clientes)        |
    |-- Estado: pendiente ─────────────►  |
    |                                     |-- Ve lista en app móvil
    |                                     |-- Inicia trabajo
    |                          ◄──────────|-- Estado: en_progreso
    |                                     |
    |                                     |-- Completa relevamiento
    |                          ◄──────────|-- Estado: completado
    |                                     |      o
    |                                     |-- Sin acceso al domicilio
    |                          ◄──────────|-- Estado: fallido
    |                                     |
    |-- Supervisor puede cancelar         |
    |   mientras: pendiente / en_progreso |
    |-- Estado: cancelado                 |
```

---

## Reglas de negocio

| Regla | Descripción |
|---|---|
| Un cliente tiene exactamente una NAP | La NAP siempre está en el último poste del recorrido |
| Una NAP puede servir a muchos clientes | Infraestructura compartida |
| Un poste aparece en múltiples relevamientos | No se duplica, se referencia |
| Sin acceso → cero postes registrados | No se crea registro de postes si la visita es fallida |
| Elegibilidad para asignar | Solo `libre`, `completado` o `fallido` aparecen disponibles |
| Botón ⋯ reasignar | Solo visible en estado `pendiente` |
| Botón ✕ cancelar | Solo visible en estados `pendiente` y `en_progreso` |
