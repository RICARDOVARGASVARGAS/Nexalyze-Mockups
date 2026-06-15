# Inventario de Postes — README

## ¿Qué es?
Sistema para relevar la infraestructura de red entre el domicilio de un cliente y la caja de red (NAP) que le da servicio, identificando todos los postes intermedios.

---

## ¿Quiénes lo usan?
- **Supervisor** — asigna trabajo a los técnicos desde la web
- **Técnico** — ejecuta el relevamiento en campo desde la app móvil

---

## Flujo del supervisor
1. Importa un Excel con la lista de clientes a relevar
2. Asigna cada cliente a un técnico
3. Monitorea el avance desde el panel web
4. Visualiza el resultado del relevamiento con mapa y datos

---

## Flujo del técnico en campo
1. Ve su lista de asignaciones pendientes en la app
2. Va al domicilio del cliente
3. **¿Tiene acceso al domicilio?**
   - **NO** → registra el motivo y cierra la visita como fallida
   - **SÍ** → toma coordenadas y fotos de la fachada y continúa
4. Sigue el cable desde el domicilio hasta el primer poste
5. **En cada poste registra:**
   - Datos del poste (propietario, código, material, estado, etc.)
   - Fotos del poste
   - Si hay operadores externos con cable en ese poste
   - **¿Este poste tiene la NAP del cliente?**
     - **NO** → sigue al siguiente poste
     - **SÍ** → registra la NAP y cierra el relevamiento
6. Al cerrar, el sistema calcula automáticamente la distancia total del recorrido y la atenuación

---

## Reglas importantes
- Un cliente tiene exactamente una NAP
- Una NAP puede servir a muchos clientes
- Un poste puede aparecer en múltiples relevamientos porque es infraestructura compartida
- La NAP siempre está en el último poste del recorrido
- Si no hay acceso al domicilio no se registra ningún poste
