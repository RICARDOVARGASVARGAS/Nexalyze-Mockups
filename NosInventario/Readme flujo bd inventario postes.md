# Inventario de Postes — Flujo del técnico y su relación con la base de datos

---

## Contexto general

A un técnico se le asignan N clientes para relevar. Cada cliente es una asignación independiente. El técnico las trabaja una por una.

El objetivo de cada asignación es:
1. Verificar y fotografiar el domicilio del cliente
2. Seguir el cableado poste por poste hasta encontrar la NAP que sirve a ese cliente
3. Registrar cada poste del recorrido
4. Registrar la NAP al final del recorrido

---

## Flujo detallado paso a paso y su relación con la BD

---

### PASO 1 — El supervisor asigna clientes al técnico

El supervisor crea una asignación por cada cliente a relevar.

**En la BD se crea un registro en `assignments`:**
```
assignments
---------
client_id     = ID del cliente a relevar
technician_id = ID del técnico asignado
assigned_by   = ID del supervisor
status        = pending
-- todo lo demás queda NULL, aún no hay relevamiento
```

El técnico puede tener N registros en `assignments` con status `pending`, uno por cada cliente asignado.

---

### PASO 2 — El técnico llega al domicilio del cliente

El técnico abre la asignación en la app y va al domicilio. Lo primero que hace es verificar la información del cliente.

**Dos sub-escenarios:**

**A) La información está correcta:**
El técnico confirma los datos y toma 2 fotos de la fachada.

**B) La información tiene errores:**
El técnico corrige los datos y toma 2 fotos de la fachada.

En ambos casos, si hay correcciones, **se actualiza `clients`:**
```
clients
---------
address       → se actualiza si había error
lat_ref       → se actualiza si había error
lng_ref       → se actualiza si había error
```

**Las 2 fotos de la fachada se guardan en `attachments`:**
```
attachments
---------
attachable_type = 'assignment'
attachable_id   = ID de la asignación
type            = 'fachada'
-- (2 registros, uno por cada foto)
```

**Y se actualiza `assignments`:**
```
assignments
---------
lat        = coordenada GPS tomada en el domicilio
lng        = coordenada GPS tomada en el domicilio
access     = true
started_at = timestamp de inicio
status     = in_progress
```

---

### PASO 3 — El técnico va al primer poste

Siguiendo el cableado desde el domicilio, el técnico llega al primer poste. Lo primero que hace es verificar si ese poste ya fue relevado por otro técnico buscando por propietario + código.

**Dos sub-escenarios:**

**A) El poste YA existe en la BD:**
No se crea un nuevo poste. Se reutiliza el existente. El técnico puede ver su información y actualizarla si detecta cambios.

**B) El poste NO existe en la BD:**
El técnico registra toda la información del poste y se **crea un registro en `poles`:**
```
poles
---------
owner_id        = propietario del poste (FK → pole_owners)
code            = código del poste
material_id     = material (FK → pole_materials)
tension_id      = tensión (FK → pole_tensions)
height          = altura en metros
load            = carga
depth           = profundidad
has_retainer    = true/false
cable_type_id   = tipo de cable (FK → pole_cable_types)
support_points  = puntos de apoyo
condition_id    = estado (FK → pole_conditions)
findings        = hallazgos (texto libre)
observations    = observaciones (texto libre)
lat             = coordenada GPS del poste
lng             = coordenada GPS del poste
has_external_operator = true/false
registered_by   = ID del técnico
```

**Si tiene operadores externos, se crean registros en `pole_external_operators`:**
```
pole_external_operators
---------
pole_id     = ID del poste
operator_id = ID del operador (FK → pole_owners)
cable_count = cantidad de cables de ese operador
-- (un registro por cada operador externo)
```

**Las fotos del poste se guardan en `attachments`:**
```
attachments
---------
attachable_type = 'pole'
attachable_id   = ID del poste
type            = 'panoramica' / 'detalle'
-- (2 registros, uno por cada foto)
```

**Y se registra la visita a este poste en `assignment_poles`:**
```
assignment_poles
---------
assignment_id = ID de la asignación actual
pole_id       = ID del poste (nuevo o existente)
nap_id        = NULL (aún no encontró la NAP)
seq_order     = 1 (primer poste del recorrido)
access        = true
observation   = observación de la visita
nap_access    = NULL
nap_observation = NULL
```

---

### PASO 4 — El técnico continúa al siguiente poste

El técnico evalúa: ¿este poste tiene la NAP del cliente?

**Si NO tiene la NAP:** repite el PASO 3 para el siguiente poste. El `seq_order` incrementa en 1 por cada poste.

Ejemplo de recorrido con 3 postes antes de la NAP:
```
assignment_poles
---------
assignment_id=1  pole_id=Poste_A  nap_id=NULL  seq_order=1
assignment_id=1  pole_id=Poste_B  nap_id=NULL  seq_order=2
assignment_id=1  pole_id=Poste_C  nap_id=NULL  seq_order=3
```

Nótese que `Poste_A`, `Poste_B`, `Poste_C` son postes físicos reales en `poles`. Si otro técnico relevó una ruta diferente y pasó por `Poste_B`, ese mismo poste aparecerá en su `assignment_poles` también, sin duplicarse en `poles`.

---

### PASO 5 — El técnico llega al poste que tiene la NAP

El técnico identifica que en este poste está la NAP del cliente. Primero releva el poste normalmente (igual que el PASO 3). Luego sube y verifica la NAP.

**Dos sub-escenarios para la NAP:**

**A) La NAP YA existe en la BD:**
No se crea. Se verifica su información y se puede actualizar si hay cambios.

**B) La NAP NO existe en la BD:**
Se crea el registro en `naps`:
```
naps
---------
code           = código de la NAP
pole_id        = ID del poste donde está ubicada
total_ports    = total de puertos de la NAP
sequential_ports = puertos secuenciales
lat            = coordenada GPS de la NAP
lng            = coordenada GPS de la NAP
registered_by  = ID del técnico
```

**Las fotos de la NAP se guardan en `attachments`:**
```
attachments
---------
attachable_type = 'nap'
attachable_id   = ID de la NAP
type            = 'panoramica' / 'puertos'
```

**Y se actualiza el registro de este poste en `assignment_poles`:**
```
assignment_poles
---------
assignment_id   = ID de la asignación
pole_id         = ID de este poste
nap_id          = ID de la NAP encontrada  ← aquí se vincula la NAP
seq_order       = N (último poste del recorrido)
access          = true/false
nap_access      = true/false
nap_observation = observación de la visita a la NAP
```

---

### PASO 6 — Cierre del relevamiento

Al confirmar la NAP, el técnico cierra el relevamiento. El sistema automáticamente:

1. Toma las coordenadas del domicilio (`assignments.lat / lng`)
2. Toma las coordenadas de cada poste en orden (`assignment_poles` ordenado por `seq_order` → `poles.lat / lng`)
3. Toma las coordenadas de la NAP (`naps.lat / lng`)
4. Construye la polilínea y la guarda en `routes`:
```
routes
---------
assignment_id    = ID de la asignación
geojson_polyline = LineString GeoJSON con todos los puntos en orden
total_points     = cantidad total de puntos
```

5. Calcula la distancia total y la atenuación y los guarda en `assignments`:
```
assignments
---------
iea_km         = distancia total del recorrido en km
attenuation_db = atenuación calculada
closed_at      = timestamp de cierre
status         = completed
```

---

### CASO ESPECIAL — Sin acceso al domicilio

Si el técnico llega al domicilio y no puede ingresar:

```
assignments
---------
access        = false
failed_reason = "motivo del fallo" (texto libre)
lat           = coordenada GPS tomada en el lugar
lng           = coordenada GPS tomada en el lugar
status        = failed
-- no hay postes, no hay NAP, no hay ruta
```

El relevamiento termina aquí. No se registra ningún poste ni NAP.

---

## Resumen visual de la relación entre tablas

```
assignments (1)
    │
    ├── clients (1) ←————————————————— el cliente a relevar
    │       └── naps (1) ←——————————— la NAP esperada del cliente
    │
    ├── assignment_poles (N) ←———————— un registro por cada poste visitado
    │       ├── poles (1) ←—————————— el poste físico compartido
    │       │       └── pole_external_operators (N)
    │       └── naps (1, solo el último) ← la NAP encontrada
    │
    ├── routes (1) ←—————————————————— la polilínea del recorrido completo
    │
    └── attachments (N) ←———————————— fotos del domicilio, postes y NAP
```

---

## Reglas de negocio

- Un técnico puede tener N asignaciones pendientes
- Una asignación corresponde a exactamente un cliente
- Un cliente tiene exactamente una NAP
- Una NAP puede servir a muchos clientes
- Un poste puede aparecer en múltiples asignaciones (infraestructura compartida, nunca se duplica en `poles`)
- La NAP siempre está en el último poste del recorrido
- Si no hay acceso al domicilio no se registra ningún poste ni NAP
- El técnico verifica primero si el poste ya existe antes de crear uno nuevo
- El técnico verifica primero si la NAP ya existe antes de crear una nueva
- Las fotos van siempre en `attachments` con su tipo correspondiente