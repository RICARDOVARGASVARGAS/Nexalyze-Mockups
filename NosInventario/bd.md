clients
---------
id
object_id        -- NOT NULL, UNIQUE — identificador del Excel
address          -- NOT NULL — dirección del domicilio
lat_ref          -- NOT NULL — latitud referencial del Excel
lng_ref          -- NOT NULL — longitud referencial del Excel
nap_id           -- FK → naps, NULLABLE
district_id      -- FK → districts (public), NULLABLE
province_id      -- FK → provinces (public), NULLABLE
department_id    -- FK → departments (public), NULLABLE
country_id       -- FK → countries (public), NULLABLE
created_at
updated_at


pole_owners
---------
id
name             -- NOT NULL
status           -- boolean, default true
created_at
updated_at
deleted_at       -- soft delete

pole_materials
---------
id
name             -- NOT NULL
status           -- boolean, default true
created_at
updated_at
deleted_at

pole_tensions
---------
id
name             -- NOT NULL
status           -- boolean, default true
created_at
updated_at
deleted_at

pole_cable_types
---------
id
name             -- NOT NULL
status           -- boolean, default true
created_at
updated_at
deleted_at

pole_conditions
---------
id
name             -- NOT NULL
status           -- boolean, default true
created_at
updated_at
deleted_at

poles
---------
id
owner_id              -- FK → pole_owners, NOT NULL
code                  -- Código del poste, NULLABLE
material_id           -- FK → pole_materials, NULLABLE
tension_id            -- FK → pole_tensions, NULLABLE
height                -- Altura en metros (decimal), NULLABLE
load                  -- Carga (decimal), NULLABLE
depth                 -- Profundidad en metros (decimal), NULLABLE
has_retainer          -- Retenida (boolean), NULLABLE
cable_type_id         -- FK → pole_cable_types, NULLABLE
support_points        -- Puntos de apoyo (numérico), NULLABLE
condition_id          -- FK → pole_conditions, NULLABLE
findings              -- Hallazgos en campo (texto libre), NULLABLE
observations          -- Observaciones adicionales (texto libre), NULLABLE
lat                   -- NOT NULL
lng                   -- NOT NULL
has_external_operator -- ¿Tiene cable de otro operador? (boolean), NULLABLE
year_instalation      -- año de instalacion
registered_by         -- FK → users, NOT NULL
created_at
updated_at

pole_external_operators
---------
id
pole_id          -- FK → poles, NOT NULL
operator_id      -- FK → pole_owners, NOT NULL
cable_count      -- Cantidad de cables de ese operador, NOT NULL
created_at
updated_at


naps (YA ESTA HECHO EN INVENTARIO, SOLO TRAEREMOS SU ID)


assignments
---------
id
client_id             -- FK → clients, NOT NULL — cliente a relevar
technician_id         -- FK → users, NOT NULL — técnico asignado
assigned_by           -- FK → users, NOT NULL — quién hizo la asignación
status                -- NOT NULL — pending/in_progress/completed/failed/cancelled
lat                   -- NULLABLE — latitud relevada del domicilio
lng                   -- NULLABLE — longitud relevada del domicilio
access                -- boolean, NULLABLE — true con acceso / false sin acceso
failed_reason         -- NULLABLE — motivo si visita fallida
started_at            -- NULLABLE — cuándo inició el relevamiento
closed_at             -- NULLABLE — cuándo cerró el relevamiento
iea_km                -- NULLABLE — distancia total de la ruta en km
attenuation_db        -- NULLABLE — atenuación calculada
created_at
updated_at

assignment_poles
---------
id
assignment_id         -- FK → assignments, NOT NULL
pole_id               -- FK → poles, NOT NULL
nap_id                -- FK → naps, NULLABLE — si en este poste hay una NAP para este cliente
seq_order             -- NOT NULL — orden del poste en la ruta
access                -- boolean, NULLABLE — true con acceso / false sin acceso al poste
observation           -- NULLABLE — observación de la visita al poste
nap_access            -- boolean, NULLABLE — true con acceso / false sin acceso a la NAP
nap_observation       -- NULLABLE — observación de la visita a la NAP
created_at
updated_at

routes
---------
id
assignment_id         -- FK → assignments, NOT NULL, UNIQUE
geojson_polyline      -- NOT NULL — LineString GeoJSON del recorrido completo
total_points          -- NOT NULL — total de puntos en la ruta
created_at
updated_at


Tablas de public que se reutilizan:
attachments        -- fotos de clientes, postes y NAPs
audit_logs         -- trazabilidad de cambios