# Análisis de BD — Workflow

## Objetivo

Traducir cada campo visible en el mockup a un esquema PostgreSQL 16 (`schema: nos_gpc`) listo para migraciones Laravel, reutilizando tablas NOS existentes.

## Tablas NOS reutilizables (no recrear)

- `users`, `roles`, `permissions`, `role_user`
- `countries`, `departments`, `provinces`, `districts` (schema `public`)
- `attachments`, `audit_logs`
- `cost_centers`, `projects`, `purchase_requests`, `currencies` (según módulo)

## Proceso

### 1. Inventario de entidades UI

Por cada pantalla, listar:
- Entidad principal (ej. `expense_reports`, `poles`, `assignments`)
- Entidades secundarias en modales/tabs
- Catálogos en combos (FKs)

### 2. Definir tablas nuevas

Por tabla documentar:

```markdown
### nombre_tabla
Descripción breve.

| Columna | Tipo PG | Null | FK | UI (pantalla.campo) |
|---------|---------|------|----|---------------------|
| id | bigserial | NO | PK | — |
| status | varchar(20) | NO | — | informes-listar.badge |
| user_id | bigint | NO | users.id | header.avatar |
```

### 3. Mapeo mockup ↔ BD

Archivo `docs/analisis-mockup-y-bd.txt`:

```
PANTALLA: rendidor/gastos-crear-simple.html
CAMPO UI          → TABLA.COLUMNA          → TIPO        → NOTAS
"Monto" input     → expenses.amount        → numeric(12,2) → validar > 0
"Categoría" select→ expenses.category_id   → bigint FK   → expense_categories
```

### 4. Estados y enums

Documentar todos los valores de badge/status del mockup:

```sql
-- expense_reports.status
'draft' | 'submitted' | 'in_review' | 'approved' | 'rejected' | 'paid'
```

### 5. Relaciones y cardinalidad

```
users 1──N expense_reports
expense_reports 1──N expenses
expense_reports N──1 expense_policies
assignments 1──N assignment_poles N──1 poles
```

### 6. Índices sugeridos

- FKs siempre indexadas
- Campos de filtro frecuente (status, created_at, technician_id)
- Búsqueda: `object_id`, códigos de negocio

### 7. Datos mock alineados

En `catalog.js` o equivalente, usar nombres de columna:

```javascript
// ✅ Alineado a BD
{ id: 1, technician_id: 5, status: 'pending', object_id: 'P-0042' }

// ❌ Evitar
{ id: 1, tech: 'Juan', estado: 'Pendiente' }
```

## Plantilla bd-estructura.md

```markdown
# Estructura BD — {Módulo}

Schema: nos_gpc
Stack destino: Laravel 13 + PostgreSQL 16

## Tablas reutilizadas
- users, attachments, ...

## Tablas nuevas

### {tabla}
[definición]

## Diagrama ER (texto)
[relaciones]

## Notas de migración
- [ ] Seeds para catálogos
- [ ] Soft deletes en ...
- [ ] Auditoría vía audit_logs
```

## Referencias por módulo

| Módulo | Archivo BD |
|--------|------------|
| RindeGastos | `RindeGastos/docs/bd-estructura.md` |
| RindeGastos mapeo | `RindeGastos/docs/analisis-mockup-y-bd.txt` |
| NosInventario | `NosInventario/bd.md` |
| NosInventario flujo campo | `NosInventario/Readme flujo bd inventario postes.md` |

## Checklist pre-migración

- [ ] Toda FK del mockup tiene tabla destino definida
- [ ] Tipos numéricos con precisión (montos, coordenadas, decibeles)
- [ ] Campos geo referencian tablas `public.*`
- [ ] Attachments usan tabla `attachments` estándar
- [ ] Estados del UI = CHECK constraint o enum documentado
- [ ] Campos calculados en UI marcados como `computed` (no columna)
- [ ] Timestamps: `created_at`, `updated_at`, `deleted_at` donde aplique
