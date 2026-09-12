## 1. Propósito y usuario objetivo

**Control de Garantías y Manuales del Hogar** será una bóveda doméstica para identificar aparatos, conservar pruebas de compra, localizar el manual correcto y preparar una reclamación antes de que expire una cobertura. La unidad principal será el **bien concreto** —modelo y número de serie—, no una factura genérica ni una categoría de gasto.

El producto se dirige a hogares españoles con electrodomésticos, climatización, electrónica, herramientas y otros equipos que hoy guardan tickets, facturas, pólizas y manuales en lugares distintos. El MVP priorizará bienes de consumo adquiridos en España por particulares; compras profesionales, bienes inmuebles, vehículos y garantías de obra quedarán fuera hasta disponer de reglas específicas.

Decisiones de alcance:

- Garantía legal, garantía comercial del fabricante/vendedor y seguro/extensión de cobertura serán entidades separadas. Sus plazos, responsables, condiciones y documentos no se fusionarán en una única “garantía”.
- La fecha de vencimiento se calculará solo cuando existan país, tipo de bien, estado nuevo/usado/reacondicionado, fecha jurídica de referencia y versión de regla suficientes. Si falta un dato, la app mostrará “pendiente de confirmar”.
- El cálculo legal será informativo y trazable a una regla versionada; no sustituirá asesoramiento jurídico ni afirmará que una reclamación será aceptada.
- Reparaciones, sustituciones y periodos sin disponibilidad podrán afectar la cobertura, pero nunca modificarán el vencimiento de forma silenciosa: se generará una propuesta explicada que el usuario confirma.
- OCR de factura y placa producirá candidatos con evidencia visual. Vendedor, fecha, modelo, serie, importe y garantía no pasarán a estado confirmado automáticamente.
- El manual se vinculará a marca, modelo exacto, variante, idioma y versión/revisión. Un PDF encontrado por similitud de nombre no se marcará como oficial sin verificar dominio y correspondencia.
- Facturas, números de serie y valor de los bienes permanecerán cifrados localmente; la búsqueda offline usará índices mínimos derivados y protegidos.
- La integración con Mantenimiento del Hogar intercambiará identidad opaca del aparato, manual seleccionado y eventos consentidos; no compartirá facturas, precio ni número de serie por defecto.

## 2. Dominios de backend

**Hogares, miembros y responsabilidades**

- Hogar como tenant raíz con miembros `owner`, `admin` y `member`.
- Permisos separados para ver factura/valor, editar bienes, gestionar garantías, abrir incidencias, exportar y conectar otras aplicaciones.
- Responsable principal y suplente por bien; asignar responsabilidad no cambia la propiedad jurídica declarada.
- Invitaciones revocables y auditoría de lectura/descarga de documentos sensibles.

**Bienes y ejemplares domésticos**

- Producto de catálogo separado del ejemplar poseído: marca, familia, modelo y variante frente a número de serie, fecha de compra, habitación y propietario/responsable.
- Identificadores admitidos: EAN/GTIN, MPN/modelo, número de serie, referencia del vendedor y QR interno.
- Estado `active`, `stored`, `lent`, `sold`, `disposed`, `lost` o `replaced`; vender o desechar detiene alertas sin borrar historia.
- Componentes relevantes —unidad exterior/interior, batería o accesorio cubierto— podrán relacionarse como bienes hijos con garantía propia.
- Traslado de habitación y cambio de responsable como eventos, no simples sobrescrituras, para conservar trazabilidad.

**Captura por factura y placa**

- Pipeline asíncrono: carga, validación de seguridad, clasificación, OCR, extracción por esquema, emparejamiento y revisión.
- Esquemas distintos para factura/ticket, placa de características, certificado de garantía y póliza.
- Cada campo conserva valor bruto, normalizado, confianza, página/recorte y decisión del usuario.
- La placa aporta marca, modelo, serie, tensión/potencia y otros datos técnicos, pero no fecha de compra ni vendedor salvo evidencia independiente.
- Una factura con varias líneas crea candidatos separados y conserva un solo documento origen; el total se concilia con líneas, impuestos y descuentos sin inventar reparto.
- Hash SHA-256 y huellas de proveedor/fecha/importe detectan documentos o bienes duplicados; la fusión siempre es confirmada.

**Documentos y cifrado**

- Tipos: factura, ticket, placa, certificado, contrato comercial, póliza, reparación, sustitución, comunicación y manual.
- Cifrado de contenido en cliente con clave del hogar protegida por el sistema operativo cuando sea posible; el servidor almacena ciphertext y metadatos mínimos.
- En sobres criptográficos separados por hogar y versión de clave; rotación y incorporación/revocación de miembros sin recifrar inmediatamente cada blob.
- No se enviarán imágenes en claro a OCR remoto sin consentimiento específico; el usuario podrá optar por OCR local cuando esté disponible o por alta manual.
- Miniaturas sensibles también cifradas. Nombres de archivo, serie, vendedor e importe no aparecerán en rutas, logs ni telemetría.
- Recuperación de cuenta y pérdida de clave tendrán consecuencias explicadas; no se prometerá recuperación de contenido que el servidor no pueda descifrar.

**Garantías y coberturas**

- Cobertura con tipo `legal_conformity`, `commercial_warranty`, `insurance` o `service_plan`, obligado declarado, beneficiario, ámbito territorial, fecha de inicio/fin y documento.
- La garantía comercial conserva texto, exclusiones, procedimiento, canal, necesidad de registro y número de contrato; nunca reduce la cobertura legal mostrada.
- Motor de reglas legales versionado por jurisdicción, fecha de adquisición, tipo/estado del bien y naturaleza comprador/vendedor.
- Resultado con fecha inicial, duración, supuestos, fuente, versión y nivel de certeza; cambios normativos no recalculan historiales sin comparación.
- Eventos que pueden alterar cobertura: reparación, entrega/recogida, sustitución, negativa, suspensión declarada, extensión y cesión.
- Cronología de cobertura append-only; correcciones mediante supersesión.

**Alertas y vencimientos**

- Recordatorios separados para registro de garantía comercial, fin de devolución voluntaria, revisión, vencimiento y último margen de reclamación configurado.
- Anticipaciones múltiples por cobertura —por ejemplo 90, 30 y 7 días— adaptables por usuario y bien.
- Una alerta nunca afirma “pierdes tus derechos hoy” si la fecha depende de datos o reglas no confirmados; muestra certeza y cálculo.
- Al abrir una incidencia se pausan alertas genéricas y se crean hitos propios: envío, respuesta esperada, recogida, devolución y seguimiento.
- Notificación PWA/correo con deduplicación y registro de entrega; la app no garantiza recepción como medio jurídico de reclamación.

**Manuales oficiales**

- Manual con fabricante, modelo/variante, idioma, revisión, fecha, región, tipo, URL fuente, hash y archivo preservado cuando la licencia/condiciones lo permitan.
- Procedencia `manufacturer`, `authorized_distributor`, `user_uploaded` o `third_party`; solo fabricante/distribuidor verificado puede mostrar sello “fuente oficial”.
- Coincidencia modelo-manual con evidencia y estado `candidate`, `confirmed`, `obsolete`, `replaced` o `unavailable`.
- El usuario confirma el manual correcto antes de fijarlo como predeterminado; la versión anterior se conserva si el enlace desaparece.
- Comprobación periódica de URL, hash y metadatos sin sustituir un archivo por contenido nuevo bajo la misma identidad.
- Búsqueda dentro del manual mediante texto local/índice cifrado cuando sea posible; no se enviará el contenido a servicios externos sin consentimiento.

**Incidencias y reclamaciones**

- Incidencia vinculada a bien y cobertura con descripción, fecha de detección, síntomas observados, impacto, estado y comunicaciones.
- Evidencias con fotos, vídeos, factura, placa, serie, garantía, reparaciones previas y conversación con vendedor/fabricante.
- Estados `draft`, `ready`, `submitted`, `acknowledged`, `in_service`, `resolved`, `rejected` o `closed`; la app no marca enviado sin confirmación del usuario o integración verificable.
- Línea temporal inmutable de contactos, compromisos y respuestas; archivos originales preservados.
- Plantillas de comunicación editables y diferenciadas por destinatario, sin generar hechos o derechos no confirmados.

**Paquete de incidencia**

- Generación PDF/ZIP con portada, identificación del bien, cobertura invocada, descripción, cronología, factura, serie y anexos seleccionados.
- Vista previa exacta y controles para ocultar dirección, otros artículos de la factura, precio, medio de pago o metadatos no necesarios.
- Índice de anexos, hash por archivo, fecha de generación, zona horaria y estado de verificación de cada dato.
- Versión congelada y regenerable; nuevos documentos no alteran un paquete ya enviado.
- Enlace temporal revocable o descarga local; registro de destinatario/finalidad sin enviar automáticamente al vendedor en el MVP.

**Habitaciones, búsqueda y responsables**

- Árbol simple vivienda → estancia → zona opcional, con habitaciones archivables.
- Búsqueda local/remota por nombre, marca, modelo, identificador parcial, habitación, responsable, garantía y estado.
- Índices de búsqueda sensibles derivados en cliente; el backend usa tokens ciegos cuando el cifrado impida indexar texto claro.
- Filtros de vencimiento y documentos faltantes como proyecciones, no campos mantenidos manualmente.

**Integración con Mantenimiento del Hogar**

- Conexión consentida por hogar y selección de bienes; autoridad explícita por campo.
- Outbox transaccional con eventos `home_asset.created`, `home_asset.updated`, `home_asset.archived`, `manual.linked` y `warranty_event.recorded`.
- Payload por defecto: identificador opaco, nombre visible, categoría, marca/modelo, ubicación, estado y referencia de manual; serie, factura, precio y coberturas excluidos.
- La app de mantenimiento conserva sus tareas e intervenciones; esta app conserva documentos y garantías. Una intervención recibida puede proponer un evento de garantía, nunca crearlo sin confirmación.
- Consumidores idempotentes, `schema_version`, `aggregate_version` y mapeos externos; sin acceso directo entre bases de datos.

**Offline, sincronización y auditoría**

- IndexedDB para bienes, habitaciones, responsables, coberturas, alertas, manuales descargados y documentos cifrados seleccionados.
- UUID local, cola append-only, cursor incremental, idempotencia y versión optimista.
- Alta/edición, búsqueda, consulta de manual descargado y preparación de incidencia disponibles offline; OCR remoto, comprobación de enlaces y generación servidor requieren conexión.
- Conflicto explícito para serie, fecha de compra, cobertura, eliminación, manual confirmado y permisos; nunca última escritura gana.
- Auditoría de OCR, documentos, garantías, cálculos, paquetes, accesos, miembros e integración.

## 3. Módulos de frontend

**Inicio**

- Coberturas próximas a vencer, bienes sin factura/manual/serie, incidencias abiertas y documentos pendientes de sincronizar.
- Selector de vivienda/hogar y filtros por habitación o responsable.
- Estado offline, última sincronización y alertas con cálculo incierto diferenciadas.

**Alta rápida de bien**

- Opciones factura, placa, EAN, manual o entrada manual.
- Flujo mínimo con nombre, habitación y responsable; el resto puede completarse por candidatos OCR.
- Emparejamiento factura + placa antes de crear dos bienes duplicados.

**Revisión OCR**

- Vista documento-campos con recorte, valor bruto, normalización y confianza.
- Confirmación independiente de vendedor, fecha, modelo, serie, importe y líneas.
- Separación visible entre datos extraídos de factura y placa; imposibilidad de atribuir una fuente incorrecta.

**Mis bienes**

- Lista y búsqueda por habitación, responsable, marca, modelo, categoría, cobertura y estado.
- Ficha con identidad, documentos, coberturas, manual, cronología e incidencias.
- Cambiar ubicación/responsable crea evento; vender/desechar solicita qué documentos conservar.

**Garantías**

- Tarjetas separadas para legal, comercial y seguro/extensión, cada una con obligado, periodo, condiciones, fuente y certeza.
- Explicación del cálculo con datos usados, supuestos, versión de regla y eventos posteriores.
- Acción corregir dato o añadir documento sin editar directamente una fecha derivada.

**Alertas**

- Calendario/lista con margen, vencimiento, registro comercial e hitos de incidencia.
- Ajuste por cobertura y canal; posponer conserva la fecha original.
- Acceso directo a crear paquete antes del vencimiento.

**Manuales**

- Candidatos con modelo/variante, idioma, revisión, región, fuente y estado del enlace.
- Visor y búsqueda offline para manuales descargados; favorito por bien.
- Reportar manual incorrecto/obsoleto y conservar versión anterior hasta confirmar reemplazo.

**Incidencias**

- Asistente con problema, fecha, cobertura, destinatario, evidencias y cronología.
- Checklist de factura, serie, imágenes, condiciones y comunicaciones, sin bloquear un paquete incompleto.
- Seguimiento de estado, respuesta esperada y reparaciones/sustituciones.

**Generador de paquete**

- Selector de documentos/campos, ocultación de datos ajenos y previsualización página a página.
- PDF/ZIP congelado con índice y hashes; historial de versiones.
- Descarga o enlace temporal revocable, sin envío automático en el MVP.

**Privacidad y cifrado**

- Configuración de desbloqueo, dispositivos, claves, documentos offline y recuperación.
- Explicación previa de qué datos podrán o no recuperarse si se pierde la clave.
- Indicador inequívoco cuando OCR requiere descifrado y envío temporal a un proveedor autorizado.

**Integración con Mantenimiento del Hogar**

- Selector de bienes/campos y previsualización del alcance.
- Estado sincronizado, pendiente, conflicto o desconectado por aparato.
- Bandeja de intervenciones recibidas que podrían afectar cobertura, siempre pendientes de confirmación.

**Hogar y ajustes**

- Miembros, roles, habitaciones, responsables, canales, anticipaciones y reglas regionales.
- Exportación integral, eliminación, sesiones y auditoría visible.
- Centro de sincronización con operaciones pendientes, errores y conflictos accionables.

## 4. Modelo de datos inicial

Las claves primarias serán UUID/ULID generables offline. Los importes usarán unidades mínimas enteras y moneda ISO 4217. Fechas legales conservarán precisión, procedencia y zona horaria; entidades editables incluirán `created_at`, `updated_at`, `deleted_at` y `lock_version`.

| Entidad | Campos específicos iniciales | Restricciones y relaciones |
| --- | --- | --- |
| `households` | `name`, `country_code`, `timezone`, `encryption_key_version` | Tenant raíz; jurisdicción no inferida solo por idioma. |
| `household_members` | `household_id`, `user_id`, `role`, `status`, `joined_at` | Único por hogar/usuario. |
| `rooms` | `household_id`, `parent_id`, `name`, `type`, `archived_at` | Nombre único entre hermanas activas. |
| `catalog_products` | `brand_id`, `model`, `variant`, `mpn`, `ean`, `category`, `region`, `current_version_id` | Producto genérico, sin serie ni factura. |
| `catalog_product_versions` | `catalog_product_id`, `version`, `specifications_json`, `source_json`, `valid_from`, `valid_until` | Histórico inmutable. |
| `brands` | `name`, `official_domains_json`, `support_contacts_json`, `status` | Dominios alimentan verificación de manuales. |
| `household_assets` | `household_id`, `catalog_product_id`, `display_name_encrypted`, `serial_encrypted`, `serial_blind_index`, `purchase_on`, `purchase_date_source`, `condition_at_purchase`, `price_minor_encrypted`, `currency`, `room_id`, `responsible_member_id`, `ownership_status`, `parent_asset_id`, `aggregate_version` | Serie única solo cuando esté confirmada; campos sensibles cifrados. |
| `asset_identifiers` | `asset_id`, `type`, `value_encrypted`, `blind_index`, `source_type`, `verification_status` | Múltiples identificadores por ejemplar. |
| `asset_events` | `asset_id`, `type`, `occurred_at`, `payload_encrypted`, `source_type`, `recorded_by`, `supersedes_event_id` | Append-only para ubicación, responsable, venta y sustitución. |
| `vendors` | `household_id`, `name_encrypted`, `tax_id_encrypted`, `contact_encrypted`, `blind_index` | Privado por hogar. |
| `documents` | `household_id`, `type`, `ciphertext_storage_key`, `cipher_hash`, `mime_type`, `size_bytes`, `key_version`, `issued_on`, `retention_status` | Contenido y miniaturas cifrados. |
| `document_asset_links` | `document_id`, `asset_id`, `role`, `page_range_json`, `allocated_amount_minor_encrypted` | Una factura puede enlazar varios bienes. |
| `extraction_jobs` | `document_id`, `schema_type`, `processing_mode`, `consent_record_id`, `provider`, `model_version`, `status`, `started_at`, `completed_at`, `error_code` | Registra si OCR fue local/remoto. |
| `extracted_fields` | `extraction_job_id`, `field_name`, `raw_value_encrypted`, `normalized_value_encrypted`, `confidence`, `evidence_locator`, `review_status`, `resolved_subject_id` | Confirmación por campo. |
| `warranty_coverages` | `asset_id`, `type`, `obligor_type`, `obligor_id`, `territory`, `starts_on`, `ends_on`, `date_certainty`, `terms_document_id`, `registration_required`, `registration_completed_at`, `status`, `calculation_id` | Varias coberturas simultáneas y separadas. |
| `warranty_rule_sets` | `jurisdiction`, `version`, `effective_from`, `effective_until`, `rules_json`, `sources_json`, `reviewed_by`, `status` | Inmutable y revisado. |
| `warranty_calculations` | `asset_id`, `coverage_type`, `rule_set_id`, `inputs_encrypted_json`, `result_json`, `assumptions_json`, `certainty`, `calculated_at` | Resultado reproducible; no fuente jurídica definitiva. |
| `coverage_events` | `coverage_id`, `type`, `occurred_on`, `effective_days`, `source_document_id`, `notes_encrypted`, `status`, `recorded_by` | Reparación, suspensión, sustitución o extensión. |
| `reminders` | `household_id`, `asset_id`, `coverage_id`, `incident_id`, `type`, `scheduled_for`, `original_scheduled_for`, `channel`, `dedupe_key`, `status`, `sent_at` | Dedupe key única. |
| `manuals` | `catalog_product_id`, `manufacturer`, `model`, `variant`, `language`, `region`, `revision`, `publication_date`, `source_type`, `source_url`, `source_domain`, `file_hash`, `ciphertext_storage_key`, `status` | Identidad por modelo/idioma/revisión, no URL. |
| `asset_manual_links` | `asset_id`, `manual_id`, `match_evidence_json`, `match_status`, `confirmed_by`, `confirmed_at`, `is_primary` | Un manual principal por bien/idioma. |
| `incidents` | `household_id`, `asset_id`, `coverage_id`, `title_encrypted`, `description_encrypted`, `detected_on`, `status`, `target_party_type`, `target_party_id`, `submitted_at`, `resolved_at` | Estado enviado requiere evidencia/confirmación. |
| `incident_events` | `incident_id`, `type`, `occurred_at`, `actor_id`, `content_encrypted`, `document_id`, `expected_response_on` | Cronología inmutable. |
| `incident_packages` | `incident_id`, `version`, `scope_encrypted_json`, `storage_key`, `content_hash`, `generated_at`, `expires_at`, `revoked_at`, `status` | Paquete congelado y versionado. |
| `encryption_key_envelopes` | `household_id`, `member_id`, `device_id`, `key_version`, `wrapped_key`, `algorithm`, `revoked_at` | Sin clave maestra en claro en servidor. |
| `search_tokens` | `household_id`, `subject_type`, `subject_id`, `field_type`, `blind_token`, `key_version` | Índice ciego; no almacena texto claro. |
| `consent_records` | `household_id`, `user_id`, `purpose`, `scope_json`, `policy_version`, `granted_at`, `revoked_at`, `evidence_json` | OCR remoto e integración como finalidades separadas. |
| `integration_connections` | `household_id`, `destination_app`, `status`, `contract_version`, `authority_map_json`, `last_cursor` | Una conexión por hogar/destino. |
| `external_mappings` | `connection_id`, `entity_type`, `internal_id`, `external_id`, `aggregate_version` | IDs opacos. |
| `outbox_events` | `household_id`, `aggregate_type`, `aggregate_id`, `aggregate_version`, `event_type`, `schema_version`, `payload_json`, `occurred_at`, `published_at` | Sin campos cifrados excluidos del consentimiento. |
| `sync_operations` | `household_id`, `user_id`, `device_id`, `operation_uuid`, `command_type`, `ciphertext_payload`, `base_version`, `status`, `conflict_encrypted` | Idempotente y cifrado. |
| `audit_logs` | `household_id`, `actor_id`, `action`, `subject_type`, `subject_id`, `origin`, `occurred_at`, `metadata_json` | Inmutable; sin valores sensibles. |

Documentos cifrados, eventos de bienes/coberturas e incidencias serán fuentes de verdad. Alertas, búsquedas, vencimientos y paquetes serán proyecciones reconstruibles que conservan regla, versión y evidencia de origen.

## 5. Diferenciador frente a competencia

- **Coberturas sin falsa simplificación:** garantía legal, comercial y seguro se muestran simultáneamente con obligado, condiciones, evidencia y certeza propios.
- **OCR que respeta la procedencia:** la factura aporta compra/vendedor y la placa aporta modelo/serie; cada campo mantiene su recorte y confirmación.
- **Manual correcto, no primer PDF encontrado:** marca, modelo, variante, idioma, región, revisión, dominio y hash forman parte de la coincidencia.
- **Reclamación preparada con privacidad selectiva:** el paquete reúne prueba y cronología, pero permite ocultar otros artículos, medio de pago, domicilio o valor innecesario.
- **Cifrado doméstico real:** facturas, series, valores, miniaturas e índices sensibles se protegen también offline y no aparecen en telemetría.
- **Alertas explicables:** cada fecha muestra regla, datos, supuestos y eventos que la modificaron; un dato incompleto produce incertidumbre, no precisión ficticia.
- **Organización por vida cotidiana:** habitación y responsable conviven con marca/modelo, permitiendo encontrar quién gestiona el aparato sin montar un inventario empresarial.
- **Integración de mínimo dato:** Mantenimiento del Hogar recibe identidad operativa y manual, mientras la bóveda conserva factura, serie, precio y cobertura.

## 6. Fases del roadmap

**Fase 0 — Reglas, criptografía e invariantes**

- Validar alcance de bienes de consumo y fuentes vigentes de garantía en España; versionar reglas y textos legales.
- Diseñar cifrado cliente, recuperación, rotación, índices ciegos y revocación de miembros mediante revisión especializada.
- Definir producto de catálogo frente a ejemplar, cobertura, evento, manual e incidencia.
- Formalizar protocolo offline, idempotencia, resolución de conflictos y contrato con Mantenimiento del Hogar.
- Preparar observabilidad aislada para Laravel, Vue/PWA, PHP-FPM, colas, Redis, base de datos, OCR, almacenamiento, errores y latencia sin payloads sensibles.

**Fase 1 — Bóveda manual offline-first**

- Hogar, miembros, habitaciones, responsables, bienes, identificadores y documentos cifrados.
- Alta/edición, búsqueda por índices protegidos y consulta offline.
- Garantías introducidas manualmente y alertas configurables sin motor legal automático.
- Criterio de salida: crear y localizar bienes sin red, sincronizar sin duplicación y demostrar que servidor/logs no contienen documentos, serie o valor en claro.

**Fase 2 — OCR de factura y placa**

- Pipelines separados, revisión campo a campo, múltiples artículos por factura y detección de duplicados.
- OCR local cuando sea viable y remoto con consentimiento/trazabilidad.
- Conciliación de líneas, placa y bien existente.
- Criterio de salida: conjunto anonimizado de facturas/placas españolas, cero campos confirmados sin usuario y ningún valor atribuido a la fuente equivocada.

**Fase 3 — Garantías y alertas explicables**

- Motor versionado por jurisdicción/fecha/tipo/estado, garantías comerciales y coberturas adicionales.
- Eventos de reparación, sustitución y extensión con propuestas de recálculo.
- Alertas por vencimiento, margen e hitos con certeza visible.
- Criterio de salida: casos frontera revisados jurídicamente, resultados reproducibles y cambios normativos sin reescritura silenciosa.

**Fase 4 — Manuales oficiales**

- Catálogo marca/modelo/variante, procedencia, idioma, revisión y verificación de dominio/hash.
- Descarga y búsqueda offline, preservación de versión y reporte de errores.
- Flujo editorial para candidatos y obsolescencia.
- Criterio de salida: ningún manual obtiene sello oficial solo por similitud; sustituciones conservan versiones previas y correspondencia auditable.

**Fase 5 — Incidencias y paquetes**

- Cronología, comunicaciones, evidencias, estados y seguimiento.
- Generador PDF/ZIP con redacción selectiva, hashes, versiones y enlaces revocables.
- Plantillas de comunicación revisables, sin envío externo automático.
- Criterio de salida: paquete reproducible y congelado, datos ajenos ocultos y cada anexo vinculado a su documento original.

**Fase 6 — Integración con Mantenimiento del Hogar**

- Consentimiento, selección de bienes, autoridad por campo, outbox y mapeos opacos.
- Manuales hacia mantenimiento e intervenciones hacia propuestas de eventos de cobertura.
- Reintentos, eventos fuera de orden, revocación y bandeja de conflictos.
- Criterio de salida: no se transfieren facturas, precios o series por defecto; desconectar no inutiliza ninguna aplicación.

**Fase 7 — Endurecimiento y producción**

- Seguridad de archivos, antimalware, rate limiting, sesiones, rotación, exportación/borrado, copias cifradas y restauración.
- Accesibilidad, rendimiento plurianual, catálogos grandes y compatibilidad PWA/cámara/PDF.
- QA exhaustivo funcional, offline, concurrencia, cifrado, OCR, reglas, permisos, paquetes e integración.
- Revisión jurídica y de seguridad final; las reglas se publican solo con fuente, fecha efectiva, versión y responsable de revisión.
