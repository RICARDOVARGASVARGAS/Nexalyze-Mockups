# Inventario de Postes — Contexto completo para Mockup

## ¿Qué es este sistema?
Sistema para relevar la infraestructura de red de fibra óptica entre el domicilio de un cliente y la caja de red (NAP) que le da servicio, identificando y registrando todos los postes intermedios del recorrido.

---

## Actores

- **Supervisor / Admin** — opera desde la web. Importa clientes, asigna trabajo a técnicos y monitorea resultados.
- **Técnico de campo** — opera desde la app móvil. Ejecuta el relevamiento físico en la calle.

---

## Entidades principales

### Cliente
Punto de partida del relevamiento. Es el domicilio del usuario final del servicio de Internet. Los clientes se importan desde un archivo Excel que entrega el operador. Cada cliente está asociado a exactamente una NAP.

### Poste
Infraestructura física en la vía pública. El técnico sigue el cable poste por poste desde el domicilio del cliente hasta encontrar la NAP. Un poste puede aparecer en múltiples relevamientos porque es infraestructura compartida entre varios clientes. Un poste puede tener operadores externos (empresas con cable en ese poste además del propietario).

### NAP (Network Access Point)
Caja de red desde donde sale el cable que llega al domicilio del cliente. Siempre está ubicada en un poste. Una NAP puede servir a varios clientes. El módulo de NAPs ya existe en el sistema y no se modifica, solo se referencia.

### Asignación
Encargo que el supervisor le da a un técnico para relevar la ruta de un cliente específico. Contiene tanto los datos de la asignación como los del relevamiento en una sola entidad. Una asignación puede quedar sin ejecutar (pendiente), fallar (sin acceso) o completarse exitosamente.

### Recorrido de postes
Secuencia ordenada de postes que el técnico registra durante el relevamiento. Cada poste tiene su orden en la ruta y sus datos de visita. En el último poste se registra la NAP encontrada.

### Ruta
Resultado geográfico del relevamiento. Polilínea que conecta el domicilio del cliente con todos los postes hasta llegar a la NAP. Se calcula automáticamente al cerrar el relevamiento.

---

## Casos de uso

### CASO 1 — Importar clientes (Supervisor)
El supervisor sube un archivo Excel con los clientes a relevar. El sistema lee cada fila y crea el registro del cliente. El Excel contiene: ID del cliente, dirección, latitud, longitud, código NAP, dirección NAP, latitud NAP, longitud NAP.

### CASO 2 — Crear asignación (Supervisor)
El supervisor selecciona un cliente sin relevar y lo asigna a un técnico disponible. La asignación queda en estado **pendiente**.

### CASO 3 — Ver panel de asignaciones (Supervisor)
El supervisor ve el listado de todas las asignaciones con su estado actual: pendiente, en progreso, completada, fallida, cancelada. Puede filtrar por técnico, estado, fecha.

### CASO 4 — Ver detalle de relevamiento completado (Supervisor)
El supervisor abre una asignación completada y ve:
- Datos del cliente
- Mapa con la ruta del recorrido (domicilio → postes → NAP)
- Lista de postes en orden con sus datos y fotos
- Distancia total del recorrido (IEA en km)
- Atenuación calculada (dB)

### CASO 5 — Ver lista de asignaciones (Técnico - App)
El técnico abre la app y ve sus asignaciones pendientes con la dirección del cliente y un mapa de referencia.

### CASO 6 — Iniciar relevamiento (Técnico - App)
El técnico llega al domicilio y abre la asignación. Registra:
- ¿Tiene acceso al domicilio? (Sí / No)
- **Si NO tiene acceso:** escribe el motivo y cierra la visita como fallida. Fin.
- **Si SÍ tiene acceso:** toma las coordenadas GPS automáticamente y toma 2 fotos de la fachada. Continúa al primer poste.

### CASO 7 — Registrar poste (Técnico - App)
Por cada poste en el recorrido el técnico registra:

**Datos obligatorios:**
- Propietario del poste (lista: Entel, Win, Claro, Luz del Sur, On Empresas, Integratel Perú, Otros)
- Coordenadas GPS (automático)
- 2 fotos (panorámica y detalle)

**Datos opcionales:**
- Código del poste (texto)
- Material (lista: Hormigón, Madera, Metal, Fibra, Otro)
- Tensión (lista: Remate, Reducida)
- Altura en metros (decimal)
- Carga (decimal)
- Profundidad en metros (decimal)
- Retenida (Sí / No)
- Tipo de cable (lista: 24 FO, 48 FO, 96 FO, 128 FO)
- Puntos de apoyo (numérico)
- Estado (lista: Operativo, Necesita mantenimiento, Crítico)
- Hallazgos (texto libre)
- Observaciones (texto libre)

**Operadores externos:**
- ¿Tiene cable de otro operador? (Sí / No)
- Si SÍ: seleccionar operador + cantidad de cables (repetible, puede haber varios)

**Al terminar el poste:**
- ¿Este poste tiene la NAP del cliente? (Sí / No)
  - Si NO → continúa al siguiente poste (vuelve al inicio de este caso)
  - Si SÍ → pasa al registro de la NAP

### CASO 8 — Registrar NAP (Técnico - App)
En el poste donde encontró la NAP el técnico registra:
- ¿Tiene acceso a la NAP? (Sí / No)
- Si NO: escribe observación
- Si SÍ: toma fotos de la NAP
- Cierra el relevamiento

Al cerrar, el sistema calcula automáticamente:
- Ruta GeoJSON completa (domicilio → postes → NAP)
- Distancia total del recorrido en km
- Atenuación en dB

---

## Pantallas a mockupear

### Web (Supervisor)

1. **Dashboard** — resumen general: clientes importados, asignaciones por estado, % completado
2. **Clientes** — listado con estado de relevamiento, botón importar Excel
3. **Asignaciones** — listado con filtros, botón crear asignación
4. **Detalle de asignación** — mapa con ruta, lista de postes, datos del relevamiento
5. **Postes** — listado global de postes registrados

### App móvil (Técnico)

1. **Lista de asignaciones** — pendientes del técnico
2. **Detalle de asignación** — datos del cliente y dirección
3. **Registro del domicilio** — acceso Sí/No, coordenadas, fotos
4. **Registro de poste** — formulario completo con todos los campos
5. **Registro de NAP** — acceso Sí/No, fotos, cerrar relevamiento
6. **Resumen del relevamiento** — confirmación antes de cerrar

---

## Reglas de negocio

- Un cliente tiene exactamente una NAP
- Una NAP puede servir a muchos clientes
- Un poste puede aparecer en múltiples relevamientos (infraestructura compartida)
- La NAP siempre está en el último poste del recorrido, nunca en el medio
- Si no hay acceso al domicilio no se registra ningún poste ni NAP
- Una asignación puede existir sin relevamiento (pendiente o cancelada)
- El técnico registra los postes en orden secuencial, uno por uno
- Las coordenadas referenciales vienen del Excel y no se modifican
- Las coordenadas relevadas las toma el técnico en campo con GPS
- Las fotos son obligatorias: 2 por poste y 2 por domicilio con acceso
- El módulo de NAPs ya existe y no se modifica, solo se referencia

---

## Modelo de datos resumido

```
clients                  — clientes importados del Excel
poles                    — postes físicos
pole_owners              — catálogo: propietarios y operadores
pole_materials           — catálogo: materiales del poste
pole_tensions            — catálogo: tipos de tensión
pole_cable_types         — catálogo: tipos de cable
pole_conditions          — catálogo: estados del poste
pole_external_operators  — operadores externos por poste (tabla intermedia)
naps                     — cajas de red (módulo existente, solo se referencia)
assignments              — asignación + relevamiento
assignment_poles         — recorrido poste por poste de cada asignación
routes                   — polilínea GeoJSON resultado del relevamiento
attachments              — fotos (tabla polimórfica existente)
audit_logs               — trazabilidad de cambios (tabla existente)
```