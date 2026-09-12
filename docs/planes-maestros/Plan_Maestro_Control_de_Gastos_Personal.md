# Plan Maestro — Control de Gastos Personal

## 1. Propósito y usuario objetivo

La app permitirá registrar, ordenar y anticipar la economía personal o familiar sin depender obligatoriamente de conexiones bancarias. Su promesa central es responder con claridad: cuánto entra, en qué se gasta, qué pagos están comprometidos y cuánto queda disponible.

El usuario principal es una persona residente en España que administra una o varias cuentas, combina tarjeta, transferencia y efectivo, y quiere controlar sus finanzas sin usar hojas de cálculo. Incluye parejas y familias que comparten ciertos gastos, pero mantienen otros privados. El usuario secundario es quien importa periódicamente movimientos de diferentes bancos españoles y necesita conciliarlos.

La aplicación trabajará en euros por defecto, admitirá otras monedas y utilizará formatos españoles de fecha, número e impuestos. Será una herramienta de organización y análisis, no de asesoramiento financiero ni de iniciación de pagos.

## 2. Dominios de backend

- **Identidad y acceso:** usuarios, autenticación, dispositivos, sesiones, recuperación de cuenta y consentimiento.
- **Hogares y permisos:** hogares, miembros, invitaciones y roles `propietario`, `editor` y `lector`; separación entre espacios personales y compartidos.
- **Cuentas financieras:** cuentas bancarias manuales, efectivo y tarjetas; saldos iniciales, moneda, archivado y transferencias internas.
- **Movimientos:** ingresos, gastos, transferencias, fraccionamientos, adjuntos, etiquetas y estados `pendiente`, `confirmado` o `conciliado`.
- **Categorías y reglas:** árbol de categorías, reglas ordenadas por prioridad, condiciones visibles —texto, importe, cuenta o comercio— y registro de la regla aplicada.
- **Importaciones:** perfiles por banco/formato, carga CSV/XLSX, mapeo de columnas, normalización, vista previa, validación y trazabilidad por lote.
- **Conciliación:** huellas de movimiento, candidatos duplicados, puntuación explicable, fusión reversible y auditoría.
- **Presupuestos:** sobres mensuales, asignaciones, traspaso de remanentes, límites, consumo y alertas.
- **Recurrencias:** servicio compartido con Gestor de Suscripciones; patrones, próxima ejecución, incrementos de precio, renovaciones, proyección anual y simulación de cancelación.
- **Informes:** agregados por periodo, categoría, cuenta, miembro y comercio; flujo de caja histórico y previsto.
- **Sincronización:** API incremental, cola de cambios offline, idempotencia, resolución de conflictos y borrado lógico.
- **Privacidad y portabilidad:** exportación CSV/JSON, auditoría, retención, descarga y eliminación de datos conforme al RGPD.

## 3. Módulos de frontend

- **Inicio:** saldo utilizable, gasto del mes, sobres, próximos cargos y avisos de importación.
- **Registro rápido:** gasto o ingreso en pocos pasos, calculadora, foto opcional, cuenta, categoría y división entre miembros.
- **Movimientos:** cronología con búsqueda y filtros, edición múltiple, detalle y transferencia.
- **Importador bancario:** selección de banco o formato genérico, mapeo, vista previa, errores por fila y confirmación del lote.
- **Bandeja de conciliación:** duplicados sugeridos con coincidencias explicadas; conservar, fusionar o ignorar.
- **Reglas y categorías:** constructor comprensible, simulación sobre movimientos anteriores, prioridad y activación.
- **Presupuestos por sobres:** asignar ingresos, mover dinero entre sobres y consultar disponible, gastado y remanente.
- **Calendario recurrente:** pagos previstos, renovaciones, impacto mensual/anual y escenario sin una recurrencia.
- **Hogar:** miembros, invitaciones, permisos, movimientos compartidos y reparto.
- **Informes:** tendencias, comparación mensual, categorías, comercios y flujo previsto; exportación accesible.
- **Centro de sincronización:** estado offline, cambios pendientes, conflictos y última copia sincronizada.
- **Ajustes:** cuentas, divisas, formatos, notificaciones, privacidad, importación y exportación.

## 4. Modelo de datos inicial

- `users`: identidad, zona horaria, moneda y preferencias.
- `households`, `household_members`, `invitations`: espacio compartido, usuario, rol y estado.
- `accounts`: propietario o hogar, tipo, moneda, saldo inicial y estado.
- `transactions`: cuenta, tipo, importe decimal, moneda, fecha efectiva, comercio, descripción, categoría, recurrencia, estado y origen.
- `transaction_splits`: movimiento, categoría o miembro, importe y nota.
- `categories`: ámbito personal/hogar, padre, nombre, icono y naturaleza ingreso/gasto.
- `categorization_rules`, `rule_conditions`, `rule_actions`: prioridad, condiciones, acciones y activación.
- `import_batches`, `import_rows`, `import_profiles`: archivo, banco, mapeo, resultado, fila original y errores.
- `duplicate_candidates`, `reconciliation_actions`: pareja de movimientos, puntuación, motivos, decisión y reversión.
- `budget_periods`, `envelopes`, `envelope_allocations`, `envelope_transfers`: periodo, categoría, asignado, consumido y remanente.
- `recurrences`, `recurrence_occurrences`, `price_changes`: frecuencia, próxima fecha, importe esperado, estado y variaciones.
- `attachments`: referencia polimórfica, almacenamiento cifrado y metadatos.
- `sync_changes`, `devices`, `audit_logs`: versión, dispositivo, operación, actor y fecha.

Todos los registros funcionales incluirán UUID, ámbito de propiedad, marcas temporales y borrado lógico. Los importes se almacenarán como decimal y nunca como coma flotante.

## 5. Diferenciador frente a competencia

El producto combinará privacidad, control manual excelente y automatización explicable. No exigirá entregar credenciales bancarias: cualquier usuario podrá empezar offline y consolidar bancos mediante importaciones reproducibles. Cada categoría automática mostrará qué regla actuó; cada duplicado indicará por qué se propone; toda fusión podrá deshacerse.

La ventaja específica será unir presupuesto presente y compromisos futuros. Los sobres no mostrarán únicamente lo gastado: reservarán o señalarán próximas recurrencias y permitirán simular el efecto anual de cancelar, encarecer o añadir un servicio. El hogar compartido ofrecerá permisos y gastos divididos sin obligar a publicar toda la economía individual.

La adaptación española incluirá plantillas de importación mantenibles por entidad, formatos locales, comercios habituales y exportaciones abiertas, evitando publicidad de productos financieros que comprometa la neutralidad.

## 6. Fases del roadmap

1. **Fundación técnica:** autenticación, PWA instalable, base offline, sincronización idempotente, cuentas, categorías y movimientos manuales.
2. **MVP individual:** registro rápido, transferencias, búsqueda, dashboard mensual, informes básicos y exportación CSV/JSON.
3. **Importación y calidad:** CSV/XLSX genérico, perfiles de bancos españoles prioritarios, mapeo reutilizable, reglas y conciliación reversible.
4. **Planificación:** sobres mensuales, remanentes, alertas y motor compartido de recurrencias con calendario, proyección e impacto anual.
5. **Hogar compartido:** invitaciones, roles, espacios personales/compartidos, división de gastos, auditoría y conflictos de sincronización.
6. **Madurez y lanzamiento:** accesibilidad, rendimiento, cifrado de adjuntos, RGPD, observabilidad por app, copias de seguridad, pruebas exhaustivas offline/multidispositivo y piloto con usuarios de distintos bancos españoles.
## 1. Propósito y usuario objetivo

**Control de Gastos Personal** permitirá conocer, planificar y corregir la economía real de una persona o un hogar a partir de movimientos manuales y extractos de bancos españoles. La unidad principal de trabajo será el **hogar financiero**: una persona podrá operar sola o invitar a otros miembros, manteniendo cuentas, presupuestos y reglas comunes, con trazabilidad del autor de cada cambio.

El producto se dirige a residentes en España que usan una o varias cuentas bancarias, tarjetas, efectivo o cuentas compartidas y quieren controlar sus finanzas sin depender de una conexión bancaria obligatoria. El primer segmento será el de hogares que hoy consolidan extractos en hojas de cálculo y necesitan importar formatos heterogéneos, detectar duplicados, categorizar con reglas comprensibles y anticipar compromisos recurrentes.

Decisiones de producto:

- Moneda base EUR por hogar; los importes se almacenarán en unidades mínimas enteras para evitar errores de coma flotante.
- Fechas, separadores decimales, IBAN enmascarado y descripciones bancarias se interpretarán conforme a formatos habituales en España.
- La introducción manual funcionará sin conexión. Los datos pendientes se sincronizarán al recuperar conectividad mediante identificadores UUID generados en el cliente y operaciones idempotentes.
- La aplicación no iniciará con agregación bancaria PSD2. CSV/XLS/XLSX será la vía universal; el diseño dejará una interfaz de importación preparada para futuros conectores.
- La categorización automática será explicable: cada asignación indicará la regla aplicada y permitirá corregirla, crear una regla desde la corrección o excluir el movimiento.
- Un usuario nunca verá datos de otro hogar. Todos los recursos financieros estarán subordinados a `household_id`; autorización, consultas, exportaciones y eventos respetarán ese límite.

## 2. Dominios de backend

**Identidad y hogares**

- Usuarios, hogares, invitaciones, miembros y roles `owner`, `admin` y `member`.
- Permisos separados para administrar miembros, editar cuentas, importar extractos, modificar presupuestos y exportar datos.
- Auditoría de altas, ediciones, eliminaciones lógicas, importaciones y conciliaciones con actor, origen y fecha.

**Cuentas y movimientos**

- Cuentas de tipo corriente, ahorro, tarjeta, efectivo y otras; saldo inicial opcional y estado activa/archivada.
- Movimientos de ingreso, gasto y transferencia, con fecha de operación y fecha valor separadas, comercio/contraparte, concepto bancario original, notas, etiquetas y categoría.
- Transferencias internas enlazadas por un identificador común para que no computen como ingreso ni gasto del hogar.
- División de un movimiento entre varias categorías sin alterar el importe bancario original.
- Eliminación lógica y versionado optimista para resolver cambios concurrentes entre dispositivos.

**Ingesta bancaria**

- Flujo por lotes: carga, detección de formato, mapeo de columnas, previsualización, validación, importación y resumen de incidencias.
- Lectores CSV, XLS y XLSX desacoplados de perfiles bancarios. El usuario podrá guardar una plantilla de columnas por banco/cuenta.
- Normalización configurable de fechas, signo del importe, columnas separadas de debe/haber, codificación, separador decimal y filas de cabecera.
- Conservación del fichero original, hash SHA-256, fila de origen y datos normalizados para reproducir o auditar una importación.
- Procesamiento en cola para ficheros grandes; cada lote será idempotente y podrá revertirse sin borrar movimientos editados posteriormente.

**Categorización y reglas**

- Árbol de categorías del hogar con categorías de sistema copiadas al crear el hogar y categorías personalizadas.
- Reglas ordenadas por prioridad sobre descripción, contraparte, cuenta, importe, signo y etiquetas; condiciones combinables con `all`/`any`.
- Acciones iniciales: asignar categoría, añadir etiqueta, marcar como transferencia candidata o excluir de presupuesto.
- Simulación previa de una regla sobre movimientos existentes y registro de regla aplicada, versión y motivo.
- Correcciones manuales protegidas frente a recategorizaciones masivas salvo confirmación expresa.

**Conciliación y calidad del dato**

- Huella exacta basada en hogar, cuenta, fecha, importe, moneda y referencia bancaria normalizada.
- Detección probabilística adicional por ventana temporal, importe, texto normalizado y procedencia para localizar duplicados entre entrada manual e importación.
- Estados `unique`, `suspected`, `confirmed_duplicate` y `merged`; ninguna coincidencia probabilística eliminará datos automáticamente.
- Fusión con conservación de procedencia, adjuntos, categoría elegida y vínculo al movimiento descartado.

**Presupuestos por sobres**

- Sobres mensuales vinculados a una o varias categorías, con importe planificado, transferencias entre sobres y saldo acumulable configurable.
- Periodos cerrables para impedir que ediciones retroactivas alteren informes consolidados sin reapertura explícita.
- Cálculo separado de planificado, consumido, comprometido por recurrencias y disponible.
- Las transferencias entre sobres no crearán movimientos financieros ni modificarán saldos de cuentas.

**Recurrencias y proyección**

- Núcleo compartido con Gestor de Suscripciones mediante un paquete Laravel versionado y contratos estables; la app conservará adaptadores y políticas propias.
- Soporte para frecuencia, próxima fecha, importe fijo o estimado, tolerancia de variación, fecha final, estado, proveedor y categoría.
- Detección de candidatos recurrentes a partir de movimientos históricos, siempre pendiente de confirmación del usuario.
- Proyección de próximos cargos, impacto mensual/anual y escenario “si cancelo esto” sin modificar datos reales.
- Publicación de eventos versionados como `recurrence.created`, `recurrence.updated`, `recurrence.cancelled` y `recurrence.occurrence_matched`; consumidores idempotentes y sin acceso directo entre bases de datos de aplicaciones.

**Informes y exportación**

- Agregados por periodo, cuenta, categoría, etiqueta y miembro; comparación presupuesto-real y evolución de saldo.
- Materialización asíncrona de agregados para paneles, invalidada por cambios de movimientos, categorías o presupuestos.
- Exportación CSV/XLSX con filtros activos, zona horaria del hogar y formato numérico español; exportación completa independiente para portabilidad.

**Sincronización offline**

- Endpoint de sincronización incremental por cursor con operaciones `upsert`/`delete`, UUID del cliente, versión del registro y sello temporal del servidor.
- Estrategia por entidad: combinación segura para borradores y etiquetas; conflicto explícito para importes, cuenta, fecha, categoría y conciliaciones.
- Cola local cifrada cuando lo permita la plataforma, reintentos con clave de idempotencia y estado visible de sincronización.

## 3. Módulos de frontend

**Inicio**

- Resumen del mes con ingresos, gastos, ahorro neto, sobres en riesgo, cargos próximos y datos pendientes de sincronizar.
- Selector de hogar y periodo persistente; los totales excluirán transferencias internas y duplicados confirmados.

**Alta rápida de movimiento**

- Formulario optimizado para móvil con importe, tipo, cuenta, fecha, categoría y nota; guardado local inmediato.
- Sugerencia de categoría basada en reglas locales sincronizadas, mostrando la regla responsable.
- Duplicación de un movimiento anterior y creación de recurrencia desde el movimiento guardado.

**Movimientos**

- Lista virtualizada con búsqueda y filtros por cuenta, categoría, etiqueta, miembro, origen, estado de conciliación y periodo.
- Edición, división por categorías, marcado como transferencia, exclusión presupuestaria y selección masiva.
- Indicadores diferenciados para movimiento manual, importado, pendiente de sincronización, posible duplicado y vinculado a recurrencia.

**Importación bancaria**

- Asistente con pasos para fichero, cuenta destino, detección/mapeo, previsualización, duplicados y confirmación.
- Vista previa de al menos filas válidas, descartadas y conflictivas; no se confirmará un lote con columnas obligatorias sin resolver.
- Guardado y reutilización de plantillas por entidad bancaria y tipo de extracto.
- Resultado con recuentos importados, omitidos, posibles duplicados y errores descargables por fila.

**Reglas y categorías**

- Constructor visual de condiciones y acciones, prioridad por arrastre, activar/desactivar y contador de coincidencias.
- Simulación que compare “antes/después” sin escritura y ejecución posterior con alcance temporal explícito.
- Árbol de categorías con archivado; archivar no borrará la clasificación histórica.

**Presupuestos**

- Vista de sobres con planificado, gastado, comprometido y disponible; alertas configurables al 75 %, 90 % y 100 %.
- Transferencia entre sobres, activación de acumulación y copia del plan del mes anterior.
- Cierre y reapertura mensual con advertencia del impacto en informes.

**Recurrencias y escenarios**

- Calendario/lista de próximos cargos con estado previsto, confirmado, omitido o cancelado.
- Ficha con historial, variación de importes, impacto anual y coincidencias con movimientos reales.
- Simulador “si cancelo esto” para una o varias recurrencias, con ahorro a 1, 3 y 12 meses y efecto sobre sobres.

**Hogar compartido**

- Gestión de invitaciones, miembros y permisos; atribución visible de movimientos manuales y cambios.
- Preferencias comunes de moneda, zona horaria, inicio presupuestario y visibilidad de cuentas.

**Informes**

- Flujo de caja, gasto por categoría, evolución temporal, comparación con presupuesto y patrimonio líquido basado en cuentas incluidas.
- Navegación desde cada agregado hasta los movimientos que lo componen.
- Exportación del resultado filtrado sin incluir cuentas ocultas o datos fuera del ámbito autorizado.

**Estado offline y ajustes**

- Centro de sincronización con última actualización, operaciones pendientes, fallidas y conflictos accionables.
- Gestión de cuentas, plantillas bancarias, categorías, etiquetas, preferencias, exportación total y eliminación del hogar.

## 4. Modelo de datos inicial

Todas las claves primarias serán UUID/ULID. Las tablas financieras incluirán `household_id`, `created_by`, `created_at`, `updated_at`, `deleted_at` y `lock_version` cuando admitan edición offline.

| Entidad | Campos específicos iniciales | Restricciones y relaciones |
| --- | --- | --- |
| `users` | `email`, `name`, `locale`, `timezone` | Correo único; identidad global, sin datos financieros directos. |
| `households` | `name`, `base_currency`, `timezone`, `budget_cycle_day` | `base_currency = EUR` en MVP; propietario mediante membresía. |
| `household_members` | `household_id`, `user_id`, `role`, `status`, `joined_at` | Único por hogar y usuario. |
| `household_invitations` | `household_id`, `email`, `role`, `token_hash`, `expires_at`, `accepted_at` | Token nunca almacenado en claro. |
| `accounts` | `household_id`, `name`, `type`, `currency`, `opening_balance_minor`, `include_in_net_worth`, `masked_iban`, `archived_at` | El IBAN completo no es necesario para el MVP. |
| `categories` | `household_id`, `parent_id`, `name`, `kind`, `system_key`, `color`, `icon`, `archived_at` | `kind`: gasto, ingreso o ambos; nombre único entre hermanas activas. |
| `tags` | `household_id`, `name`, `color` | Nombre único por hogar. |
| `transactions` | `household_id`, `account_id`, `type`, `amount_minor`, `currency`, `booked_on`, `value_on`, `merchant`, `description`, `notes`, `category_id`, `source_type`, `source_ref`, `transfer_pair_id`, `recurrence_id`, `budget_excluded_at`, `dedupe_status`, `fingerprint` | Importe positivo; `type` determina el signo contable. Índices por hogar/fecha, cuenta/fecha, huella y recurrencia. |
| `transaction_splits` | `transaction_id`, `category_id`, `amount_minor`, `notes` | La suma debe igualar el importe del movimiento; al existir divisiones, `transactions.category_id` será nulo. |
| `transaction_tags` | `transaction_id`, `tag_id` | Par único. |
| `transfer_pairs` | `household_id`, `outflow_transaction_id`, `inflow_transaction_id`, `status` | Ambas cuentas pertenecen al mismo hogar; importes compatibles. |
| `import_templates` | `household_id`, `name`, `bank_label`, `file_type`, `mapping_json`, `parsing_options_json` | Configuración validada y versionada; sin lógica específica incrustada en el controlador. |
| `import_batches` | `household_id`, `account_id`, `template_id`, `original_filename`, `file_hash`, `status`, `total_rows`, `imported_rows`, `skipped_rows`, `error_rows`, `completed_at` | Único por hogar, cuenta y hash salvo reimportación explícita. |
| `import_rows` | `import_batch_id`, `row_number`, `raw_payload_json`, `normalized_payload_json`, `status`, `error_code`, `transaction_id` | Único por lote y número de fila; permite auditoría y reversión. |
| `categorization_rules` | `household_id`, `name`, `priority`, `match_mode`, `conditions_json`, `actions_json`, `enabled`, `version` | Prioridad única por hogar; esquema JSON validado por versión. |
| `rule_applications` | `rule_id`, `rule_version`, `transaction_id`, `result_json`, `applied_at` | Evidencia de por qué se modificó un movimiento. |
| `duplicate_candidates` | `household_id`, `left_transaction_id`, `right_transaction_id`, `score`, `reasons_json`, `status`, `resolved_by`, `resolved_at` | Par canónico único; nunca se autoconfirma por puntuación aproximada. |
| `budget_periods` | `household_id`, `starts_on`, `ends_on`, `status`, `closed_at`, `closed_by` | Periodos no solapados por hogar. |
| `budget_envelopes` | `budget_period_id`, `category_id`, `planned_minor`, `rollover_enabled`, `rollover_minor` | Una categoría por periodo en MVP. |
| `envelope_transfers` | `budget_period_id`, `from_envelope_id`, `to_envelope_id`, `amount_minor`, `created_by` | No modifica cuentas ni movimientos. |
| `recurrences` | `household_id`, `name`, `kind`, `account_id`, `category_id`, `merchant`, `frequency`, `interval`, `next_due_on`, `amount_mode`, `amount_minor`, `estimated_min_minor`, `estimated_max_minor`, `ends_on`, `status`, `shared_engine_id`, `engine_schema_version` | Contrato compatible con el motor compartido; estado local proyectado desde eventos. |
| `recurrence_occurrences` | `recurrence_id`, `expected_on`, `expected_amount_minor`, `status`, `matched_transaction_id` | Único por recurrencia y fecha prevista; una transacción no puede satisfacer dos ocurrencias activas. |
| `sync_operations` | `household_id`, `user_id`, `device_id`, `operation_uuid`, `entity_type`, `entity_id`, `action`, `base_version`, `status`, `conflict_json` | `operation_uuid` único para idempotencia. |
| `audit_logs` | `household_id`, `actor_id`, `action`, `subject_type`, `subject_id`, `origin`, `before_json`, `after_json`, `occurred_at` | Inmutable y con retención definida. |

Los ficheros importados no se servirán directamente desde almacenamiento público. Los datos agregados de informes serán proyecciones reconstruibles y no la fuente de verdad. Las condiciones y acciones JSON tendrán objetos de valor tipados en Laravel para evitar lógica dispersa y facilitar una futura extracción del motor.

## 5. Diferenciador frente a competencia

- **Compatibilidad bancaria práctica sin bloqueo de proveedor:** importación guiada de CSV/XLS/XLSX, plantillas reutilizables y trazabilidad hasta la fila original, pensadas para extractos dispares de bancos españoles.
- **Automatización explicable:** las reglas son visibles, ordenables, simulables y reversibles; cada categorización muestra qué condición la produjo. No se oculta la lógica detrás de una “IA” imposible de corregir.
- **Offline-first real para el registro cotidiano:** alta, consulta reciente, categorización y cola de cambios disponibles sin cobertura; los conflictos sensibles se resuelven de forma explícita.
- **Presupuesto conectado con compromisos futuros:** cada sobre distingue gasto ya realizado de dinero comprometido por recurrencias. Esto evita que un saldo aparentemente disponible ignore recibos y renovaciones cercanas.
- **Recurrencias orientadas a decisiones:** además de detectar gastos fijos, cuantifica impacto anual y permite comparar escenarios de cancelación antes de tocar datos reales.
- **Hogar como núcleo contable:** permisos, autoría, cuentas comunes y presupuestos compartidos forman parte del modelo base, no una sincronización añadida sobre cuentas individuales.
- **Conciliación conservadora:** combina huellas exactas y similitud explicada, pero reserva al usuario la decisión de fusionar coincidencias dudosas y mantiene la procedencia completa.
- **Portabilidad:** importación y exportación utilizables sin entregar credenciales bancarias; la futura conexión PSD2 será opcional y no sustituirá el acceso a los datos propios.

## 6. Fases del roadmap

**Fase 0 — Contratos y cimientos**

- Delimitar hogares, permisos, importes en unidades mínimas, fechas y eventos de dominio.
- Publicar la primera versión del contrato del motor de recurrencias compartido y su adaptador para esta app.
- Definir protocolo de sincronización, política de conflictos, esquemas de reglas y formato interno normalizado de importación.
- Preparar observabilidad separada para esta aplicación: logs, PHP-FPM, colas, Redis, base de datos, errores, latencia y consumo por servicio.

**Fase 1 — Libro personal offline-first**

- Hogares individuales, cuentas, categorías, etiquetas y movimientos manuales.
- PWA instalable, almacenamiento local, cola idempotente y sincronización incremental.
- Transferencias internas, división por categorías y panel mensual básico.
- Criterio de salida: crear y editar movimientos sin conexión, sincronizarlos sin duplicación y reproducir conflictos de versión en pruebas automatizadas.

**Fase 2 — Importación y calidad del dato**

- CSV, XLS y XLSX; mapeador visual; plantillas guardadas; procesamiento en cola.
- Huellas exactas, candidatos aproximados, revisión y fusión de duplicados.
- Reglas visibles de categorización, simulación y aplicación masiva protegida.
- Criterio de salida: importar extractos de al menos diez formatos representativos de bancos españoles con informe por fila, reversión de lote y cero pérdidas silenciosas.

**Fase 3 — Presupuestos y hogar compartido**

- Sobres mensuales, acumulación, transferencias internas de presupuesto, alertas y cierre de periodo.
- Invitaciones, roles, permisos y auditoría de cambios de varios miembros.
- Comparación plan-real con navegación hasta el movimiento origen.
- Criterio de salida: aislamiento multihogar verificado, permisos cubiertos por pruebas y cierres mensuales reproducibles.

**Fase 4 — Recurrencias y previsión**

- Integración del motor compartido, alta manual y detección de candidatos.
- Ocurrencias previstas, emparejamiento con movimientos, próximas renovaciones e impacto anual.
- Escenarios “si cancelo esto” y gasto comprometido dentro de sobres.
- Criterio de salida: compatibilidad contractual probada con Gestor de Suscripciones, consumidores idempotentes y proyecciones coherentes ante reintentos y eventos fuera de orden.

**Fase 5 — Informes, exportación y endurecimiento**

- Informes de flujo de caja, categorías, presupuesto y evolución; exportación filtrada y portabilidad completa.
- Seguridad: límites de tasa, sesiones/dispositivos, cifrado de secretos, análisis de dependencias, copias de seguridad y pruebas de restauración.
- Rendimiento con volúmenes plurianuales, accesibilidad, telemetría de fallos de importación y borrado/exportación conforme a RGPD.
- Criterio de salida: QA exhaustivo funcional, offline, concurrencia, seguridad, rendimiento, recuperación y compatibilidad de navegadores PWA; despliegue listo para producción sin activar todavía integraciones bancarias directas.
