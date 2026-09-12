## 1. Propósito y usuario objetivo

**Bitácora de Mantenimiento del Hogar** permitirá saber qué necesita revisión, quién se responsabiliza, qué se hizo realmente y cuánto costó, conservando evidencias por vivienda, habitación, sistema y aparato. La fuente de verdad será la intervención ejecutada; una tarea marcada como prevista o recordada no contará como mantenimiento realizado.

El producto se dirige a hogares españoles propietarios o arrendatarios que quieren prevenir olvidos y mantener un historial portable de caldera, fontanería, climatización, electricidad, electrodomésticos, exterior y elementos constructivos. El MVP priorizará viviendas de uso particular y tareas domésticas/revisiones profesionales; comunidades de propietarios, mantenimiento industrial y gestión de inmuebles para terceros quedarán fuera.

Decisiones de alcance:

- Plantilla de tarea, plan aplicado, ocurrencia programada e intervención ejecutada serán entidades distintas. Cambiar una periodicidad no reescribirá vencimientos ni trabajos históricos.
- Las tareas tendrán nivel `diy`, `professional_recommended` o `qualified_professional_required`. En instalaciones de gas, electricidad, climatización u otras reguladas, la app no ofrecerá instrucciones que inviten a intervenir sin cualificación.
- Los calendarios legales/técnicos dependerán de instalación, potencia/tipo, uso, ubicación, contrato y norma vigente. Si faltan datos, se propondrá revisar la documentación o consultar a un profesional, no una fecha exacta ficticia.
- “Realizada” exigirá fecha y responsable; para tareas configuradas como profesionales podrá exigir empresa, factura/certificado o confirmación explícita de que falta evidencia.
- Presupuesto aceptado, factura pagada y coste imputado se separarán para no duplicar importes ni confundir previsión con gasto real.
- Fotos conservarán momento, intervención y fase `before`, `during` o `after`; la galería no será un depósito sin contexto.
- El hogar compartido permitirá asignar y delegar sin rankings ni penalizaciones. No realizada, omitida, pospuesta y no registrada serán estados distintos.
- El enlace con Control de Garantías intercambiará aparato, manual y eventos que puedan afectar cobertura mediante consentimiento; las facturas no viajarán por defecto.
- Al cambiar de vivienda, la integración con Organizador de Mudanzas generará una instantánea de entrega/salida y tareas transferibles. El historial de la vivienda anterior permanecerá separado del nuevo hogar.

## 2. Dominios de backend

**Hogares, viviendas y residentes**

- Hogar como tenant de colaboración; vivienda como inmueble temporalmente ocupado por ese hogar.
- Una vivienda conserva dirección cifrada, zona horaria, tipo, régimen `owned`, `rented` u `other`, fecha de entrada/salida y características relevantes.
- Miembros con roles `owner`, `admin` y `resident`; permisos separados para costes, documentos, profesionales, reglas, exportación e integraciones.
- Periodos de residencia y responsabilidad para impedir que un antiguo conviviente mantenga acceso tras abandonar la vivienda.
- Elementos pertenecientes al inmueble y bienes pertenecientes al hogar se distinguen para decidir qué se queda al mudarse.

**Espacios, sistemas y activos**

- Jerarquía vivienda → espacio/estancia → zona opcional; exterior, cubierta, fachada y cuarto técnico son espacios válidos.
- Sistema técnico `heating`, `plumbing`, `electrical`, `cooling`, `ventilation`, `security`, `water_treatment`, `building_envelope`, `garden` u otro.
- Activo mantenible vinculado a sistema y ubicación: caldera, termo, bomba de calor, aire acondicionado, filtro, detector, persiana o electrodoméstico.
- Identidad operativa con marca/modelo/serie opcionales y `external_asset_id` cuando proviene de Control de Garantías.
- Cambio de ubicación, sustitución, venta o retirada como eventos; archivar no elimina planes/intervenciones.

**Catálogo de plantillas**

- Plantillas editoriales versionadas por tipo de vivienda, sistema, activo, región y características técnicas necesarias.
- Cada plantilla contiene propósito, procedimiento seguro, materiales, evidencia esperada, periodicidad sugerida, anticipaciones, nivel profesional y criterios de detención.
- Fuente, fecha de revisión, jurisdicción y ámbito de aplicabilidad obligatorios para plantillas normativas.
- Contenido global, privado del usuario y privado de colaborador profesional; una plantilla global actualizada no cambia planes activos sin comparación y aceptación.
- Las instrucciones DIY excluyen manipulación técnica restringida y muestran cuándo detenerse/llamar a un profesional.

**Planes y programación**

- Plan de mantenimiento aplicado a vivienda, espacio, sistema o activo con responsable, plantilla/version, vigencia y regla.
- Recurrencia por intervalo, fechas estacionales, contador/uso introducido o una sola vez; reglas combinadas pueden vencer por la primera condición alcanzada.
- Zona horaria y política de fin de mes explícitas; la próxima ocurrencia se deriva desde la última intervención válida o ancla configurada.
- Posponer mantiene fecha original, nueva fecha, actor y motivo. Omitir no mueve automáticamente la siguiente ocurrencia salvo política visible.
- Pausar por obra, ausencia, avería o fin de temporada evita contabilizar retraso durante ese periodo.
- Editar regla crea versión del plan y previsualiza ocurrencias afectadas antes de confirmar.

**Ocurrencias y estados**

- Ocurrencia con ventana recomendada, vencimiento, prioridad y estado `upcoming`, `due`, `overdue`, `in_progress`, `completed`, `skipped`, `postponed` o `cancelled`.
- La ocurrencia congela título, instrucciones, nivel de seguridad y evidencia del plan vigente.
- Solo una intervención completada puede satisfacerla; una intervención podrá satisfacer varias ocurrencias relacionadas si el usuario lo confirma.
- Cierre parcial por checklist mantiene estado `in_progress` o `completed_with_issues`, según regla.
- Generación idempotente para evitar duplicados al recalcular calendarios o reintentar jobs.

**Intervenciones**

- Intervención con fecha/hora, ejecutor residente/profesional, ubicación, activo/sistema, descripción, resultado y tiempo invertido.
- Tipo `inspection`, `cleaning`, `servicing`, `repair`, `replacement`, `installation`, `test` o `other`.
- Resultado `completed`, `completed_with_issues`, `failed`, `temporary_fix` o `not_performed`; solo los válidos actualizan el último mantenimiento.
- Checklist respondido contra versión exacta de plantilla; campos libres no sustituyen certificados.
- Hallazgos generan incidencias/tareas nuevas mediante confirmación, no modifican planes silenciosamente.
- Correcciones por supersesión y auditoría; no se edita destructivamente una intervención que ya alimentó una exportación o integración.

**Historial fotográfico y documentos**

- Fotos etiquetadas `before`, `during`, `after`, `detail`, `meter` o `certificate`, enlazadas a intervención/hallazgo.
- Captura con timestamp del sistema y fecha declarada; metadatos GPS eliminados por defecto.
- Álbum comparativo por activo/área y posición, evitando comparar fotos sin correspondencia.
- Documentos: presupuesto, factura, certificado, parte de trabajo, manual, contrato y garantía.
- Almacenamiento privado, hash, análisis de seguridad, miniaturas, URLs temporales y retención configurable.
- OCR de facturas/presupuestos queda como extensión futura; el MVP permite introducir campos y adjuntar original.

**Profesionales y proveedores**

- Contacto privado del hogar con empresa, NIF/CIF opcional, oficio, teléfono, correo, área y notas.
- Relación con intervenciones, presupuestos y facturas; una valoración privada del hogar no crea reseña pública.
- Credenciales/cualificación se guardan como “declaradas” o documentadas, sin sello de verificación salvo proceso específico.
- No habrá marketplace, contratación ni mensajería externa en el MVP.

**Presupuestos, facturas y costes**

- Solicitud/necesidad separada del presupuesto recibido; varias ofertas pueden compararse sin sumar todas como coste.
- Presupuesto con partidas, base, IVA, total, validez, proveedor, estado `received`, `accepted`, `rejected`, `expired` o `superseded`.
- Factura con número, fecha, partidas, base, IVA, total, proveedor, pago y documento.
- Enlace presupuesto→factura y detección de desviación por partidas/total; solo factura confirmada o coste manual cuenta como gasto real.
- Reparto entre activos/sistemas cuando una factura cubre varios trabajos.
- Métricas de mantenimiento preventivo, correctivo y mejora por año/vivienda, sin presentarlas como contabilidad fiscal.

**Recordatorios y escalado doméstico**

- Anticipaciones múltiples por tarea/categoría y canales PWA/correo.
- Asignación primaria, suplente y escalado al administrador si una tarea crítica queda vencida.
- Franjas silenciosas y resumen semanal; tareas de seguridad críticas pueden usar una política separada aceptada por el hogar.
- Dedupe key y registro de entrega; una notificación enviada no implica tarea vista o realizada.
- Reasignar conserva historial y notifica al nuevo responsable solo tras aceptar o según regla del hogar.

**Plantillas españolas y seguridad**

- Reglas reglamentarias versionadas, con fuente oficial, fecha efectiva, ámbito y campos necesarios.
- Motor produce `applicable`, `not_applicable` o `insufficient_data`, nunca aplica un calendario por semejanza de nombre.
- Calendarios del fabricante/instalador prevalecen como fuente separada cuando el usuario los introduce; la interfaz muestra divergencias.
- Cambios normativos generan propuesta de actualización, no reescritura de planes ni afirmación de incumplimiento retroactivo.
- Contenido sobre gas, combustión, electricidad, refrigerantes, altura, amianto o estructura se limita a inspección visual segura y derivación profesional.

**Integración con Control de Garantías**

- Conexión consentida por hogar y bien; mapeo opaco y autoridad explícita por campo.
- Control de Garantías manda sobre factura de compra, número de serie, cobertura y manual confirmado; Mantenimiento manda sobre planes e intervenciones.
- Eventos versionados `home_asset.created`, `home_asset.updated`, `manual.linked`, `maintenance.completed`, `maintenance.issue_found` y `asset.replaced` mediante outbox.
- Payload de vuelta con fecha, tipo, proveedor y referencia de documento; coste/factura/fotos solo con consentimiento independiente.
- Una reparación recibida propone evento de cobertura en Garantías; no modifica el vencimiento automáticamente.

**Integración con Organizador de Mudanzas**

- Evento de mudanza define vivienda origen/destino, fecha y selección de bienes/sistemas portátiles.
- Exporta checklist de salida: lecturas, limpieza, llaves, equipos que permanecen y evidencias del estado.
- Clasificación `stays_with_property`, `moves_with_household`, `disposed` o `undecided` por activo.
- Los planes de bienes trasladados se proponen en la nueva vivienda; los sistemas fijos se cierran en origen.
- Fotos, facturas y dirección no se transfieren por defecto. La app de mudanzas recibe tareas/IDs mínimos y devuelve estados mediante eventos idempotentes.

**Offline, sincronización y auditoría**

- IndexedDB con vivienda activa, espacios, activos, planes, ocurrencias, checklists, fotos pendientes y manuales seleccionados.
- UUID local, cola append-only, cursor incremental, idempotencia y versión optimista.
- Completar tareas, capturar fotos, registrar coste y crear hallazgos funciona sin red.
- Conflictos explícitos para completar/omitir la misma ocurrencia, cambiar plan, sustituir activo, factura y permisos; notas independientes pueden combinarse.
- Auditoría inmutable de plantillas, planes, ejecuciones, documentos, costes, asignaciones e integraciones.

## 3. Módulos de frontend

**Hoy**

- Tareas próximas, vencidas, en curso y delegadas, agrupadas por vivienda y prioridad.
- Explicación de por qué vence: regla, última intervención, ancla, fuente y datos faltantes.
- Estado offline, fotos pendientes y conflictos sin bloquear otras tareas.

**Calendario**

- Vista semanal, mensual y estacional con filtros por habitación, sistema, activo y responsable.
- Posponer, reasignar u omitir con motivo; previsualización de efecto en próximas fechas.
- Diferenciación visual entre sugerencia doméstica, fabricante y requisito normativo versionado.

**Tareas**

- Ficha con propósito, checklist, materiales, seguridad, evidencia requerida, responsable y recurrencia.
- Editor de periodicidad con simulación antes de crear versión.
- Plantillas privadas y catálogo español filtrado por datos reales de vivienda/instalación.

**Modo intervención**

- Checklist lineal, temporizador opcional, fotos por fase, notas, hallazgos y coste.
- Persistencia paso a paso al cambiar de aplicación o perder conexión.
- Bloqueo de instrucciones técnicas en tareas marcadas para profesional y acceso a contacto/proveedor.
- Cierre con resultado, evidencia faltante y ocurrencias satisfechas.

**Historial**

- Línea temporal por vivienda, sistema, activo o habitación.
- Comparador antes/después con fotos alineadas por etiqueta/área.
- Trazado desde intervención hasta tarea, versión, ejecutor, factura y eventos enviados.

**Profesionales y costes**

- Directorio privado con oficios, contactos e historial de trabajos.
- Comparador de presupuestos por partidas, impuestos, vigencia y alcance.
- Conciliación presupuesto/factura y desviación; separación de previsto, aceptado, facturado y pagado.

**Hogar compartido**

- Miembros, periodo de residencia, permisos y responsabilidades por tarea/sistema.
- Bandeja personal y aceptación de delegaciones.
- Sin puntuación pública, ranking ni penalización por retraso.

**Integración con Garantías**

- Selección de aparatos, campos y estado de sincronización.
- Manual y cobertura visibles como referencia; documentos sensibles permanecen en la app origen.
- Intervenciones que podrían afectar cobertura aparecen como propuestas revisables.

**Cambio de vivienda**

- Clasificador de activos que se quedan, se trasladan o se descartan.
- Checklist de salida con evidencias y tareas coordinadas con Organizador de Mudanzas.
- Vista previa de planes a cerrar, migrar o recrear en destino; el historial nunca se mezcla entre viviendas.

**Informes y ajustes**

- Costes preventivos/correctivos, cumplimiento por periodo y trabajos por sistema con navegación al origen.
- Exportación de historial de vivienda o activo con documentos seleccionados.
- Notificaciones, seguridad, plantillas, dispositivos, integraciones y centro de sincronización.

## 4. Modelo de datos inicial

Las claves primarias serán UUID/ULID generables offline. Importes en unidades mínimas y moneda ISO 4217; duraciones en segundos. Plantillas, planes y reglas se referenciarán por versión exacta; los eventos de intervención serán inmutables o se corregirán por supersesión.

| Entidad | Campos específicos iniciales | Restricciones y relaciones |
| --- | --- | --- |
| `households` | `name`, `timezone`, `locale` | Tenant colaborativo. |
| `household_members` | `household_id`, `user_id`, `role`, `status`, `joined_at`, `left_at` | Único por hogar/usuario/periodo activo. |
| `homes` | `household_id`, `display_name`, `address_encrypted`, `property_type`, `tenure_type`, `occupied_from`, `occupied_until`, `attributes_json`, `status` | Historial separado por vivienda. |
| `rooms` | `home_id`, `parent_id`, `name`, `type`, `archived_at` | Nombre único entre hermanas activas. |
| `home_systems` | `home_id`, `type`, `name`, `attributes_json`, `installed_on`, `status` | Datos técnicos alimentan aplicabilidad. |
| `maintainable_assets` | `home_id`, `room_id`, `system_id`, `name`, `category`, `brand`, `model`, `serial_encrypted`, `mobility_class`, `external_warranty_asset_id`, `status`, `aggregate_version` | Fijo, trasladable o desconocido. |
| `asset_events` | `asset_id`, `type`, `occurred_at`, `payload_json`, `recorded_by`, `supersedes_event_id` | Ubicación, sustitución, retirada y traslado append-only. |
| `maintenance_templates` | `owner_scope`, `owner_id`, `code`, `current_version_id`, `status` | Global, hogar o profesional. |
| `maintenance_template_versions` | `template_id`, `version`, `title`, `purpose`, `instructions_json`, `checklist_schema_json`, `evidence_requirements_json`, `schedule_suggestion_json`, `professional_level`, `stop_criteria_json`, `applicability_json`, `sources_json`, `reviewed_at` | Inmutable tras aplicar. |
| `regulatory_rule_sets` | `jurisdiction`, `version`, `effective_from`, `effective_until`, `rules_json`, `sources_json`, `reviewed_by`, `status` | Resultado aplicable/no aplicable/datos insuficientes. |
| `maintenance_plans` | `home_id`, `room_id`, `system_id`, `asset_id`, `template_version_id`, `responsible_member_id`, `backup_member_id`, `status`, `current_version_id` | Exactamente uno de room/system/asset puede ser objetivo principal. |
| `maintenance_plan_versions` | `plan_id`, `version`, `schedule_rule_json`, `anchor_type`, `anchor_at`, `reminder_offsets_json`, `effective_from`, `change_reason`, `created_by` | Versionado antes de generar ocurrencias. |
| `plan_pauses` | `plan_id`, `starts_at`, `ends_at`, `reason`, `created_by` | Excluye retraso en ventana. |
| `task_occurrences` | `plan_id`, `plan_version_id`, `window_starts_at`, `due_at`, `original_due_at`, `status`, `priority`, `snapshot_json`, `generation_key`, `completed_intervention_id` | `generation_key` única; snapshot inmutable. |
| `occurrence_actions` | `occurrence_id`, `actor_id`, `action`, `occurred_at`, `from_state`, `to_state`, `reason`, `new_due_at` | Historial de posposición/omisión/asignación. |
| `interventions` | `home_id`, `room_id`, `system_id`, `asset_id`, `type`, `performed_at`, `executor_type`, `executor_member_id`, `professional_id`, `result`, `duration_seconds`, `summary`, `source_type`, `supersedes_intervention_id`, `operation_uuid` | UUID única; resultado determina actualización del plan. |
| `intervention_checklist_answers` | `intervention_id`, `template_version_id`, `item_key`, `value_json`, `recorded_at`, `recorded_by` | Responde a esquema congelado. |
| `intervention_occurrences` | `intervention_id`, `occurrence_id`, `satisfaction_status`, `confirmed_by` | Una intervención puede satisfacer varias ocurrencias. |
| `findings` | `intervention_id`, `severity`, `title`, `description`, `status`, `created_task_plan_id` | Crear tarea exige confirmación. |
| `media_assets` | `household_id`, `storage_key`, `mime_type`, `sha256`, `size_bytes`, `captured_at_device`, `received_at_server`, `metadata_stripped`, `status` | Privado y con URL temporal. |
| `intervention_media` | `intervention_id`, `media_asset_id`, `phase`, `area_label`, `sort_order` | Fase/contexto obligatorios. |
| `documents` | `household_id`, `type`, `storage_key`, `mime_type`, `sha256`, `issued_on`, `professional_id`, `status` | Presupuesto, factura, certificado, parte, manual o contrato. |
| `professionals` | `household_id`, `business_name`, `tax_id_encrypted`, `trade`, `phone_encrypted`, `email_encrypted`, `qualification_status`, `notes_encrypted` | Directorio privado. |
| `quotes` | `home_id`, `professional_id`, `document_id`, `issued_on`, `valid_until`, `tax_base_minor`, `vat_minor`, `total_minor`, `currency`, `status`, `scope_json` | Aceptado no es gasto real. |
| `quote_lines` | `quote_id`, `description`, `quantity`, `unit_price_minor`, `tax_rate`, `total_minor`, `asset_id`, `system_id` | Desglose comparable. |
| `invoices` | `home_id`, `professional_id`, `quote_id`, `document_id`, `invoice_number_encrypted`, `issued_on`, `paid_on`, `tax_base_minor`, `vat_minor`, `total_minor`, `currency`, `status` | Solo confirmada alimenta coste. |
| `invoice_allocations` | `invoice_id`, `intervention_id`, `asset_id`, `system_id`, `amount_minor`, `allocation_method` | Suma no supera total. |
| `reminders` | `occurrence_id`, `recipient_member_id`, `channel`, `scheduled_for`, `dedupe_key`, `status`, `sent_at`, `acknowledged_at` | Notificación ≠ ejecución. |
| `integration_connections` | `household_id`, `destination_app`, `status`, `contract_version`, `scope_json`, `authority_map_json`, `last_cursor` | Garantías y Mudanzas como conexiones separadas. |
| `external_mappings` | `connection_id`, `entity_type`, `internal_id`, `external_id`, `aggregate_version` | IDs opacos y estables. |
| `move_asset_decisions` | `home_id`, `asset_id`, `external_move_id`, `decision`, `decided_by`, `decided_at`, `destination_home_id` | Se queda, se mueve, se desecha o pendiente. |
| `outbox_events` | `household_id`, `aggregate_type`, `aggregate_id`, `aggregate_version`, `event_type`, `schema_version`, `payload_json`, `occurred_at`, `published_at` | Escritura transaccional con el cambio. |
| `sync_operations` | `household_id`, `user_id`, `device_id`, `operation_uuid`, `command_type`, `payload_json`, `base_version`, `status`, `conflict_json` | Idempotente; no envía proyecciones como verdad. |
| `audit_logs` | `household_id`, `actor_id`, `action`, `subject_type`, `subject_id`, `origin`, `occurred_at`, `metadata_json` | Inmutable y con datos mínimos. |

Intervenciones, documentos y acciones sobre ocurrencias serán fuentes de verdad. Próximas fechas, cumplimiento, costes agregados y calendarios serán proyecciones reconstruibles con versiones de plantilla, plan y regla.

## 5. Diferenciador frente a competencia

- **Historial que no se falsifica al reprogramar:** plantilla, plan, ocurrencia e intervención están separados; posponer o cambiar frecuencia conserva lo que vencía y lo realmente ejecutado.
- **Seguridad por diseño:** cada tarea define nivel profesional, criterios de detención y aplicabilidad; las áreas reguladas no se convierten en tutoriales DIY.
- **Calendario explicable:** muestra última intervención, ancla, regla, fuente y datos faltantes en vez de emitir una fecha universal para cualquier caldera o instalación.
- **Evidencia contextual:** fotos antes/durante/después, checklist, factura y certificado quedan unidos a la intervención concreta.
- **Costes sin doble conteo:** presupuesto, aceptación, factura, pago y reparto son estados distintos; comparar ofertas no infla el gasto anual.
- **Colaboración doméstica neutral:** responsabilidades, suplencias y acceso temporal funcionan sin ranking ni culpabilización.
- **Garantía conectada sin invadir la bóveda:** mantenimiento recibe identidad/manual y devuelve eventos; documentos de compra, serie y cobertura permanecen bajo la autoridad de Garantías.
- **Mudanza como cambio de contexto:** activos móviles trasladan planes mediante propuesta, sistemas fijos se cierran y el historial de viviendas no se mezcla.

## 6. Fases del roadmap

**Fase 0 — Invariantes, seguridad y contratos**

- Formalizar vivienda, sistema, activo, plantilla, plan, ocurrencia, intervención y evidencia.
- Definir niveles profesional/DIY, taxonomía de riesgo y revisión de contenido crítico.
- Versionar reglas españolas con fuentes y campos de aplicabilidad; no hardcodear calendarios sin contexto.
- Diseñar protocolo offline, idempotencia y contratos de eventos con Garantías y Mudanzas.
- Preparar observabilidad aislada para Laravel, Vue/PWA, PHP-FPM, colas, Redis, base de datos, medios, errores y latencia.

**Fase 1 — Bitácora manual offline-first**

- Hogar, viviendas, miembros, habitaciones, sistemas, activos y tareas personalizadas.
- Planes recurrentes, ocurrencias, recordatorios y modo intervención persistente.
- IndexedDB, fotos pendientes, cola idempotente y sincronización incremental.
- Criterio de salida: completar y fotografiar tareas sin red; reconstruir el calendario sin duplicar ocurrencias tras reintentos.

**Fase 2 — Plantillas y seguridad**

- Catálogo español inicial para mantenimiento doméstico de bajo riesgo y revisiones profesionales.
- Aplicabilidad por características, fuentes/versiones, comparación y adopción de cambios.
- Criterios de detención y bloqueos de instrucciones para actividades restringidas.
- Criterio de salida: ninguna plantilla crítica se aplica con datos insuficientes ni invita a trabajo técnico no autorizado.

**Fase 3 — Profesionales, presupuestos y facturas**

- Directorio privado, ofertas, partidas, aceptación, factura, pago y reparto.
- Documentos, certificados, desviaciones e informes de coste preventivo/correctivo.
- Historial fotográfico comparativo por intervención/área.
- Criterio de salida: totales reproducibles sin doble conteo y permisos de coste verificados extremo a extremo.

**Fase 4 — Hogar compartido avanzado**

- Periodos de residencia, delegación/aceptación, suplencias, permisos por sistema y escalado.
- Resúmenes semanales, franjas silenciosas y política de tareas críticas.
- Auditoría de asignación y acceso.
- Criterio de salida: salida de un residente revoca acceso; reasignaciones no alteran autoría ni ejecución histórica.

**Fase 5 — Integración con Control de Garantías**

- Consentimiento, mapeos opacos, autoridad por campo, outbox y consumidores idempotentes.
- Importación de aparato/manual y retorno de intervención/hallazgo/sustitución.
- Propuestas revisables de impacto sobre cobertura.
- Criterio de salida: no viajan factura, serie, coste o fotos por defecto; reintentos/eventos fuera de orden no duplican historial.

**Fase 6 — Integración con Organizador de Mudanzas**

- Evento de cambio, clasificación de activos, checklist de salida y snapshot de vivienda.
- Cierre de sistemas fijos y propuesta de migración para bienes móviles.
- Creación controlada de nueva vivienda sin mezclar habitaciones o historial.
- Criterio de salida: cada plan queda cerrado, migrado o pendiente de decisión y ambas apps funcionan tras desconectarse.

**Fase 7 — Endurecimiento y producción**

- Seguridad de archivos, antimalware, rate limiting, sesiones, cifrado, exportación/borrado, copias y restauración.
- Accesibilidad, rendimiento plurianual, almacenamiento offline y compatibilidad PWA/cámara.
- QA exhaustivo funcional, offline, concurrencia, calendarios, seguridad, permisos, costes e integraciones.
- Revisión final de plantillas y normas vigentes; cualquier automatización profesional o contratación externa amplía alcance y requiere nueva evaluación.
