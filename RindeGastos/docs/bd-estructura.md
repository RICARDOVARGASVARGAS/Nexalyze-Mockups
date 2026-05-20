# Estructura de Base de Datos — Módulo Rendicion Digital

Sistema: NOS OLITEL
Schema PostgreSQL: nos_gpc
Stack: Laravel 13 + Vue 3 + PostgreSQL 16

---

## Tablas de la BD actual que se REUTILIZAN

| Tabla | Schema | Uso en este módulo |
|---|---|---|
| `users` | public | Rendidores, aprobadores, administradores |
| `roles`, `permissions` | public | Spatie Laravel Permission |
| `cost_centers` | nos_gpc | Centro de costo opcional en gastos |
| `projects` | nos_gpc | Proyecto opcional en gastos |
| `purchase_requests` | nos_gpc | Solicitud de compra opcional en gastos |
| `currencies` | nos_gpc | Moneda en gastos, fondos, políticas |

---

## BLOQUE 1 — Catálogos Base

### 1.1 expense_categories
**Propósito:** Clasifica el tipo de gasto. Soporta jerarquía padre-hijo.

| Campo | Tipo | Descripción |
|---|---|---|
| id | bigint PK | Identificador único |
| name | varchar(100) | Nombre visible: "Combustible", "Alimentación" |
| code | varchar(50) NULL | Código interno opcional, ej: "CB-001" |
| accounting_account | varchar(50) NULL | Cuenta contable, ej: "3202030" |
| instructions | varchar(250) NULL | Instrucciones que ve el rendidor |
| parent_id | bigint FK NULL → self | Categoría padre (jerarquía) |
| status | boolean default true | Si está activa |
| created_by | bigint FK → users | Auditoría |
| updated_by | bigint FK NULL → users | Auditoría |
| created_at, updated_at | timestamp | Timestamps |

**Ejemplo de datos:**
- VJS-001 / VIAJES (raíz)
- VJS-002 / HOSPEDAJE (hijo de VIAJES)
- VJS-003 / MOVILIDAD (hijo de VIAJES)
- VJS-004 / TAXIS (hijo de MOVILIDAD)
- CB-001 / COMBUSTIBLE
- AL-001 / ALIMENTACIÓN

---

### 1.2 expense_review_workflows
**Propósito:** Cadena de aprobación reutilizable.

| Campo | Tipo | Descripción |
|---|---|---|
| id | bigint PK | Identificador |
| name | varchar(255) | "Flujo Operaciones 2 niveles" |
| code | varchar(50) NULL | Código interno |
| description | varchar(500) NULL | Descripción |
| skip_approvers | boolean default false | Salta aprobadores duplicados |
| status | boolean default true | Activo |
| created_by, updated_by | bigint FK → users | Auditoría |
| created_at, updated_at | timestamp | Timestamps |

---

### 1.3 expense_review_workflow_steps
**Propósito:** Cada aprobador en su orden dentro de un flujo.

| Campo | Tipo | Descripción |
|---|---|---|
| id | bigint PK | Identificador |
| workflow_id | bigint FK → expense_review_workflows | Flujo |
| user_id | bigint FK → users | Aprobador |
| order | integer | Posición: 1, 2, 3... |
| is_closing_step | boolean default false | Solo true en último paso |
| created_at | timestamp | |

---

### 1.4 expense_policies
**Propósito:** Contrato maestro del rendidor. Reglas de moneda, flujo, validaciones.

| Campo | Tipo | Descripción |
|---|---|---|
| id | bigint PK | Identificador |
| name | varchar(255) | "Política Empleados Lima" |
| code | varchar(50) NULL | Código |
| description | text NULL | Descripción larga |
| workflow_id | bigint FK NULL → expense_review_workflows | Flujo asignado |
| currency_id | bigint FK → currencies | Moneda PEN/USD/CLP |
| duplicate_detection | boolean default false | Detectar duplicados |
| duplicate_similarity_pct | integer NULL | Umbral 0-100 |
| allow_report_reopen | boolean default false | Permitir reabrir cerrados |
| status | boolean default true | Activa |
| created_by, updated_by | bigint FK → users | Auditoría |
| created_at, updated_at, deleted_at | timestamp | Timestamps + soft delete |

---

### 1.5 expense_policy_users
**Propósito:** Pivot que asigna política a rendidor.

| Campo | Tipo | Descripción |
|---|---|---|
| id | bigint PK | Identificador |
| policy_id | bigint FK → expense_policies | Política |
| user_id | bigint FK → users | Rendidor |
| created_at | timestamp | |

UNIQUE (policy_id, user_id)

---

## BLOQUE 2 — Gastos

### 2.1 expenses
**Propósito:** Cada gasto individual del rendidor.

| Campo | Tipo | Descripción |
|---|---|---|
| id | bigint PK | Identificador |
| user_id | bigint FK → users | Rendidor |
| policy_id | bigint FK → expense_policies | Política (inmutable) |
| currency_id | bigint FK → currencies | Moneda |
| expense_report_id | bigint FK NULL → expense_reports | Informe (NULL si borrador) |
| category_id | bigint FK NULL → expense_categories | Categoría |
| creation_type | varchar(20) | simple, multiple, scanit |
| supplier | varchar(255) | "Petroperú" |
| expense_date | date | Fecha del gasto |
| amount | decimal(15,2) | Monto base sin impuestos |
| has_tax | boolean default false | Toggle impuestos |
| total_amount | decimal(15,2) | amount + impuestos |
| status | varchar(20) | borrador, en_informe, aprobado, rechazado |
| note | text NULL | Nota libre |
| document_number | varchar(100) NULL | "F001-12345" |
| supplier_document | varchar(20) NULL | RUC del proveedor |
| receiver_document | varchar(20) NULL | RUC del receptor |
| cost_center_id | bigint FK NULL → cost_centers | Centro de costo |
| project_id | bigint FK NULL → projects | Proyecto |
| purchase_request_id | bigint FK NULL → purchase_requests | Solicitud previa |
| created_by, updated_by | bigint FK → users | Auditoría |
| created_at, updated_at, deleted_at | timestamp | Timestamps + soft delete |

---

### 2.2 expense_attachments
**Propósito:** Archivos adjuntos polimórficos (gastos, informes, fondos, solicitudes).

| Campo | Tipo | Descripción |
|---|---|---|
| id | bigint PK | Identificador |
| user_id | bigint FK → users | Quien subió |
| attachable_id | bigint | ID del registro dueño |
| attachable_type | varchar(100) | "App\Models\Expense", etc. |
| file_path | varchar(500) | Ruta en S3/disco |
| file_name | varchar(255) | Nombre original |
| mime_type | varchar(50) | application/pdf, image/jpeg |
| size_bytes | bigint | Tamaño |
| origin | varchar(20) | manual, scanit |
| is_archived | boolean default false | Archivado por usuario |
| archived_at | timestamp NULL | Fecha de archivado |
| created_at | timestamp | |

INDEX (attachable_type, attachable_id)

---

## BLOQUE 3 — Informes

### 3.1 expense_reports
**Propósito:** Agrupador de gastos para aprobación.

| Campo | Tipo | Descripción |
|---|---|---|
| id | bigint PK | Identificador |
| user_id | bigint FK → users | Rendidor |
| policy_id | bigint FK → expense_policies | Política (inmutable) |
| workflow_id | bigint FK NULL → expense_review_workflows | Snapshot al enviar |
| current_step_id | bigint FK NULL → expense_review_workflow_steps | Paso actual |
| fund_id | bigint FK NULL → funds | Si es fondo_por_rendir |
| title | varchar(255) | "Reembolso Abril Lima" |
| correlative_number | integer NULL | 6077, único global |
| note | text NULL | Nota libre |
| report_type | varchar(30) | reembolso, fondo_por_rendir |
| status | varchar(30) | borrador, en_proceso, con_observaciones, cerrado, pagado, cancelado |
| total_amount | decimal(15,2) | Suma denormalizada |
| approved_amount | decimal(15,2) | Suma aprobados denormalizada |
| sent_at, closed_at, paid_at | timestamp NULL | Timestamps de eventos |
| created_by, updated_by | bigint FK → users | Auditoría |
| created_at, updated_at, deleted_at | timestamp | Timestamps + soft delete |

---

### 3.2 expense_report_history
**Propósito:** Bitácora de eventos del informe.

| Campo | Tipo | Descripción |
|---|---|---|
| id | bigint PK | Identificador |
| expense_report_id | bigint FK → expense_reports | Informe |
| user_id | bigint FK → users | Quién generó el evento |
| event_type | varchar(50) | report_sent, report_returned, report_closed, report_paid, report_cancelled, expense_approved, expense_rejected, comment, approver_replaced |
| description | varchar(500) NULL | Texto del evento |
| comment | text NULL | Comentario del usuario |
| expense_id | bigint FK NULL → expenses | Si es sobre un gasto |
| created_at | timestamp | |

---

## BLOQUE 4 — Fondos y Solicitudes

### 4.1 expense_fund_requests
**Propósito:** Solicitud formal del rendidor para que le asignen un fondo.

| Campo | Tipo | Descripción |
|---|---|---|
| id | bigint PK | Identificador |
| user_id | bigint FK → users | Rendidor |
| policy_id | bigint FK NULL → expense_policies | Política opcional |
| workflow_id | bigint FK NULL → expense_review_workflows | Snapshot al enviar |
| current_step_id | bigint FK NULL → expense_review_workflow_steps | Paso actual |
| currency_id | bigint FK → currencies | Moneda |
| fund_id | bigint FK NULL → funds | Fondo creado tras aprobación |
| title | varchar(255) | "Fondo Viaje Cusco Mayo" |
| fund_type | varchar(30) | fondo_por_rendir |
| requested_amount | decimal(15,2) | Monto solicitado |
| note | text NULL | Motivo libre |
| status | varchar(30) | borrador, en_proceso, aprobado, devuelto, cancelado |
| sent_at, approved_at | timestamp NULL | Timestamps |
| created_by, updated_by | bigint FK → users | Auditoría |
| created_at, updated_at, deleted_at | timestamp | Timestamps + soft delete |

---

### 4.2 expense_fund_request_history
**Propósito:** Bitácora de la solicitud de fondo.

| Campo | Tipo | Descripción |
|---|---|---|
| id | bigint PK | Identificador |
| fund_request_id | bigint FK → expense_fund_requests | Solicitud |
| user_id | bigint FK → users | Quién generó el evento |
| event_type | varchar(50) | request_sent, request_approved, request_returned, request_cancelled, comment |
| description | varchar(500) NULL | |
| comment | text NULL | |
| created_at | timestamp | |

---

### 4.3 funds
**Propósito:** Fondo con saldo asignado a un rendidor.

| Campo | Tipo | Descripción |
|---|---|---|
| id | bigint PK | Identificador |
| user_id | bigint FK → users | Dueño del fondo |
| creator_id | bigint FK → users | Quien lo creó (admin o aprobador) |
| fund_request_id | bigint FK NULL → expense_fund_requests | NULL si admin directo |
| currency_id | bigint FK → currencies | Moneda |
| name | varchar(255) | "FXR - Mayo - Juan" |
| code | varchar(50) NULL | Código interno |
| fund_type | varchar(30) | fondo_por_rendir |
| initial_amount | decimal(15,2) | Monto entregado (inmutable) |
| total_charges | decimal(15,2) | Cargos por informes cerrados |
| amount_in_review | decimal(15,2) | Cargos en informes en proceso |
| available_balance | decimal(15,2) | initial - charges - in_review |
| status | varchar(20) | activo, cerrado |
| is_flexible | boolean default false | Permite sobregiro |
| auto_block_on_zero | boolean default false | Cerrar al llegar a 0 |
| expiration_date | date NULL | Vencimiento |
| use_full_fund | boolean default false | Consumo total al primer informe |
| note | text NULL | |
| closed_at | timestamp NULL | |
| created_by, updated_by | bigint FK → users | Auditoría |
| created_at, updated_at | timestamp | |

---

### 4.4 fund_movements
**Propósito:** Historial contable de cada cambio de saldo.

| Campo | Tipo | Descripción |
|---|---|---|
| id | bigint PK | Identificador |
| fund_id | bigint FK → funds | Fondo |
| user_id | bigint FK → users | Quien generó |
| expense_report_id | bigint FK NULL → expense_reports | Si viene de informe |
| movement_type | varchar(30) | abono_inicial, cargo_reserva, cargo_definitivo, liberacion_reserva, ajuste_manual |
| concept | varchar(500) | Descripción |
| amount | decimal(15,2) | Positivo o negativo |
| balance_after | decimal(15,2) | Saldo después del movimiento |
| date | date | Fecha del movimiento |
| created_at | timestamp | |

---

## Reglas de Negocio Críticas

### REGLA 1 — Snapshot del workflow
Al enviar informe/solicitud, se copia el `workflow_id` de la política. Cambios posteriores en la política NO afectan los ya enviados.

### REGLA 2 — Edición de flujos en uso
Si un workflow tiene informes activos:
- ✅ Se puede editar: nombre, código, descripción, status, skip_approvers
- ❌ No se puede editar: pasos (estructura)
- 🟡 Excepción: "Reemplazar aprobador" sí permite cambiar quién aprueba

### REGLA 3 — Coincidencia de política
Un informe solo contiene gastos de la misma política. Validación por aplicación.

### REGLA 4 — Recálculo de montos
`total_amount` y `approved_amount` se recalculan vía Observer cuando cambia un gasto.

### REGLA 5 — Correlativo único global
Se asigna al ENVIAR (no al crear). Transacción + lock para evitar duplicados.

### REGLA 6 — Solicitud no se rechaza
Solo: aprobada o devuelta. Nunca rechazada.

### REGLA 7 — Solicitud aprobada genera fondo automático
Al aprobar la solicitud final, se crea fondo + abono_inicial. Transaccional.

### REGLA 8 — 4 montos del fondo via Observer
- Enviar informe → +amount_in_review, -available_balance
- Devolver informe → -amount_in_review, +available_balance
- Cerrar informe → de amount_in_review a total_charges

### REGLA 9 — Validación de saldo al enviar informe a fondo
Si `is_flexible=false`, total del informe ≤ available_balance del fondo.

### REGLA 10 — Inmutabilidad de initial_amount
Una vez creado el fondo, no cambia. Para "agregar plata", crear fondo nuevo o ajuste manual.

### REGLA 11 — Cada movimiento de saldo genera fund_movement
Trazabilidad completa: el saldo se reconstruye sumando movimientos.

### REGLA 12 — Nunca borrar físicamente
Usar soft delete o cambio de status. Solo el admin con permiso especial puede hard delete.

---

## Estados (Máquinas de Estado)

### Gasto
borrador → en_informe → aprobado / rechazado

### Informe
borrador → en_proceso ⇄ con_observaciones → cerrado → pagado
↓
cancelado

### Solicitud de Fondo
borrador → en_proceso ⇄ devuelto → aprobado
↓
cancelado

### Fondo
activo → cerrado

---

## Permisos Spatie del módulo
rendicion-digital.access (raíz)
Rendidor
rendicion-digital.expenses.{view,create,update,delete}
rendicion-digital.reports.{view,create,update,send,cancel}
rendicion-digital.fund-requests.{view,create,update,send}
rendicion-digital.funds.view
Aprobador
rendicion-digital.approver.reports.{view,approve-expense,reject-expense,return,close,mark-paid}
rendicion-digital.approver.fund-requests.{view,approve,return}
Administrador
rendicion-digital.admin.categories.{view,create,update,delete}
rendicion-digital.admin.policies.{view,create,update,delete}
rendicion-digital.admin.workflows.{view,create,update,delete,replace-approver}
rendicion-digital.admin.funds.{view,create,close,adjust}
rendicion-digital.admin.reports.view
rendicion-digital.admin.users.view

---

## Datos de Ejemplo Realistas (peruanos) para Mockup

### Usuarios
- Ana Guevara Muñoz (rendidor) — ana.guevara@empresa.com.pe
- Pedro Morales Quispe (aprobador) — pedro.morales@empresa.com.pe
- María Rojas Salas (administrador) — maria.rojas@empresa.com.pe
- Carlos Mendoza Torres (rendidor) — carlos.mendoza@empresa.com.pe

### Proveedores típicos
- Petroperú (combustible)
- Restaurante La Mar (alimentación)
- Hotel Casa Andina (hospedaje)
- Taxi Beat / InDriver (movilidad)
- Sodexo (alimentación)
- Tay Loy (útiles)

### Proyectos
- Proyecto Sur — Lima
- Proyecto Norte — Trujillo
- Proyecto Selva — Iquitos
- Proyecto Centro — Cusco

### Centros de Costo
- Operaciones Lima
- Administración Central
- Comercial Norte
- TI / Sistemas

### Distritos
- Miraflores, San Isidro, Surco, La Molina (Lima)
- Trujillo, Cusco, Arequipa, Iquitos

### Moneda principal
- PEN (S/) — soles
