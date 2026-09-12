# Plan Maestro — Gestor de Suscripciones

## 1. Propósito y usuario objetivo

La app centraliza suscripciones, cuotas y servicios recurrentes para responder cuatro preguntas: qué se paga, cuándo se renovará, cuánto cuesta realmente al año y qué ocurriría al cancelarlo. Su función comercial es ser un producto pequeño, útil desde el primer minuto y capaz de conducir, mediante consentimiento explícito, hacia Control de Gastos Personal.

El usuario principal es una persona residente en España con varias suscripciones de streaming, telecomunicaciones, software, gimnasio, seguros u otros servicios. Quiere evitar renovaciones inesperadas sin ceder credenciales bancarias. También se dirige a parejas y familias que necesitan detectar servicios duplicados y conocer quién paga cada cuota.

La experiencia debe permitir comenzar manualmente y funcionar offline. OCR, correo y CSV serán vías opcionales de captura; ninguna importación creará una suscripción definitiva sin revisión del usuario.

## 2. Dominios de backend

- **Identidad y acceso:** usuarios, autenticación, dispositivos, sesiones y consentimiento.
- **Hogares y permisos:** hogares, miembros, invitaciones, roles y separación entre suscripciones personales y compartidas.
- **Catálogo de proveedores:** plantillas españolas versionadas, marca, categoría, canales de contacto, patrones de cobro y campos sugeridos; sin afirmar condiciones contractuales universales.
- **Suscripciones:** proveedor, plan, responsable, beneficiarios, importe, moneda, método de pago enmascarado, estado y notas.
- **Motor de recurrencias compartido:** frecuencia, anclaje de fecha, próxima ocurrencia, calendario previsto, normalización mensual/anual y excepciones. Su contrato de servicio será compatible con Control de Gastos Personal.
- **Ciclo contractual:** prueba gratuita, alta, permanencia, preaviso, renovación, baja solicitada, baja efectiva y reactivación.
- **Precios:** historial de importes, fecha efectiva, promociones, impuestos incluidos y cálculo de variación.
- **Captura e importación:** alta manual, OCR de factura, extracción desde correo reenviado y CSV; archivo original, datos detectados, confianza y revisión.
- **Detección:** candidatos recurrentes y duplicidades familiares con motivos visibles; confirmación, descarte y fusión reversible.
- **Alertas:** reglas por evento, anticipación, zona horaria, canal, entrega y reintentos.
- **Escenarios:** cancelación, cambio de plan o precio y ahorro proyectado, sin alterar datos reales.
- **Transferencia entre apps:** paquete de datos, alcance consentido, idempotencia, estado, revocación y auditoría.
- **Privacidad:** portabilidad, eliminación, retención de documentos, cifrado y trazabilidad RGPD.

## 3. Módulos de frontend

- **Onboarding rápido:** moneda, alertas y primera suscripción mediante plantilla o alta libre.
- **Inicio:** coste mensual normalizado, coste anual, próxima renovación, pruebas activas y ahorro potencial.
- **Suscripciones:** listado, búsqueda, filtros, vista personal/hogar y estados activas, pausadas o canceladas.
- **Ficha y línea temporal:** plan, pagos, prueba, permanencia, preaviso, renovación, cambios de precio y documentos.
- **Alta asistida:** formulario manual, OCR de factura/captura, correo reenviado y CSV con vista previa y confirmación.
- **Calendario:** cargos previstos, vencimientos de prueba, fin de permanencia y último día recomendado para avisar la baja.
- **Alertas:** anticipación por tipo de evento, canal, silencio temporal y confirmación de acción.
- **Análisis:** distribución por categoría, evolución, equivalencia mensual/anual y servicios sin uso declarado.
- **Simulador:** seleccionar suscripciones y visualizar ahorro mensual/anual al cancelar o cambiar precio.
- **Hogar:** miembros, pagador, beneficiarios, duplicidades sugeridas y permisos.
- **Traspaso a Control de Gastos:** explicación del destino, selección granular, vista previa, consentimiento y resultado.
- **Ajustes y datos:** exportación, borrado, privacidad, dispositivos, zona horaria y estado de sincronización offline.

## 4. Modelo de datos inicial

- `users`, `devices`: identidad, preferencias, zona horaria y sincronización.
- `households`, `household_members`, `invitations`: espacio familiar, rol y estado.
- `providers`, `provider_templates`, `plans`: servicio, categoría, país, versión y metadatos sugeridos.
- `subscriptions`: propietario/ hogar, proveedor, nombre, estado, pagador, moneda, importe vigente y método enmascarado.
- `subscription_beneficiaries`: suscripción, miembro y tipo de acceso.
- `recurrence_rules`, `recurrence_occurrences`: unidad, intervalo, anclaje, siguiente fecha, importe previsto y estado.
- `contract_events`: tipo, fecha efectiva, fecha límite, fuente y notas.
- `price_periods`: importe, inicio, fin, promoción e impuestos incluidos.
- `imports`, `import_items`: canal, documento cifrado, texto extraído, campos, confianza, revisión y resultado.
- `duplicate_candidates`: suscripciones comparadas, puntuación, motivos y resolución.
- `notification_rules`, `notification_deliveries`: evento, antelación, canal, programación y resultado.
- `scenarios`, `scenario_items`: hipótesis y ahorro calculado.
- `app_transfers`, `transfer_items`, `consents`: app destino, alcance, versión, estado y prueba de consentimiento.
- `audit_logs`: actor, acción, entidad, fecha y metadatos mínimos.

Todas las entidades usarán UUID, marcas temporales, ámbito de propiedad y borrado lógico. Los importes serán decimales; los archivos tendrán cifrado y política de caducidad.

## 5. Diferenciador frente a competencia

El producto no exigirá conexión bancaria y combinará captura flexible con confirmación humana. Cada dato extraído mostrará origen y confianza; cada duplicidad explicará las coincidencias. La línea temporal contractual separará claramente fecha de cobro, renovación, permanencia y preaviso, conceptos que las apps simples suelen reducir a un único recordatorio.

La adaptación española se materializará en plantillas útiles para telecos, gimnasios, seguros y plataformas habituales, manteniendo sus condiciones editables y fechadas. El hogar permitirá descubrir que dos miembros pagan servicios equivalentes sin exponer suscripciones privadas.

El embudo hacia Control de Gastos será una función útil, no una captura encubierta: el usuario elegirá qué transferir, verá una previsualización y podrá conservar esta app de forma independiente. El motor compartido evitará cálculos incompatibles entre ambos productos.

## 6. Fases del roadmap

1. **Fundación:** core Laravel/Vue/PWA, autenticación, almacenamiento offline, sincronización idempotente y contrato del motor de recurrencias.
2. **MVP manual:** alta/edición, normalización mensual/anual, listado, calendario, alertas, línea temporal y exportación.
3. **Plantillas españolas:** catálogo versionado, búsqueda, preaviso/permanencia, historial de precios y panel editorial interno.
4. **Captura asistida:** OCR de facturas, correo reenviado y CSV con extracción explicable, revisión y prevención de duplicados.
5. **Hogar y escenarios:** invitaciones, permisos, beneficiarios, duplicidades familiares y simulador de cancelación.
6. **Embudo y lanzamiento:** traspaso consentido a Control de Gastos, analítica de conversión respetuosa, RGPD, accesibilidad, observabilidad por app y QA exhaustivo offline/multidispositivo.
## 1. Propósito y usuario objetivo

**Gestor de Suscripciones** centraliza compromisos de pago recurrentes y fechas contractuales antes de que produzcan un cargo no deseado. Su unidad principal no es el movimiento bancario, sino la **suscripción**: servicio, titular, coste normalizado, ciclo de cobro, prueba gratuita, permanencia, plazo de preaviso, próxima renovación y cambios de precio.

El producto se dirige a residentes en España que acumulan servicios de streaming, telecomunicaciones, gimnasios, seguros, software y otras cuotas, pero no quieren conectar sus credenciales bancarias. El primer segmento será una persona o familia con entre 5 y 20 suscripciones que necesita saber cuánto paga realmente al mes y al año, qué puede cancelar y qué servicios están duplicados dentro del hogar.

Decisiones de alcance:

- EUR será la moneda base del hogar en el MVP; los importes se almacenarán en céntimos enteros.
- El alta manual debe completarse con nombre, importe, periodicidad y próxima fecha de cobro; los datos contractuales restantes serán opcionales y se enriquecerán después.
- OCR de facturas o correos e importación bancaria generarán borradores revisables. Ninguna extracción creará una suscripción activa ni una obligación contractual sin confirmación.
- La app no solicitará credenciales bancarias. CSV será la vía bancaria inicial y el diseño admitirá conectores futuros sin convertirlos en requisito.
- Las notificaciones distinguirán cobro, fin de prueba, fecha límite de preaviso, fin de permanencia, renovación y cambio de precio; una sola “fecha de renovación” no cubrirá todos los casos.
- El hogar permitirá comparar servicios entre miembros sin obligar a compartir todos los detalles: cada suscripción tendrá visibilidad `household` o `private`, y las privadas solo participarán en detección de duplicidad mediante metadatos mínimos autorizados.
- El traspaso a Control de Gastos Personal será explícito, revocable e idempotente. Se transferirán únicamente las suscripciones seleccionadas y no las facturas o documentos originales salvo consentimiento separado.

## 2. Dominios de backend

**Identidad y hogares**

- Usuarios, hogares, invitaciones y roles `owner`, `admin` y `member`.
- Separación estricta por `household_id`; las políticas impedirán consultas cruzadas incluso mediante identificadores conocidos.
- Preferencias por usuario para zona horaria, idioma, canales y horas de aviso; moneda y calendario pertenecen al hogar.

**Catálogo de servicios**

- Plantillas versionadas de proveedores españoles y servicios operativos en España: alias comerciales, categoría, logotipo, web oficial, periodicidades habituales y campos contractuales sugeridos.
- Variantes de una plantilla para tarifas concretas sin convertir el catálogo en fuente de precios actuales; el importe siempre será confirmado por el usuario.
- Alias normalizados para reconocer descriptores bancarios y texto OCR, con puntuación de confianza y procedencia.
- Las actualizaciones del catálogo no sobrescribirán nombres, importes ni condiciones ya confirmadas en suscripciones del usuario.

**Suscripciones y contratos**

- Estado funcional `draft`, `trial`, `active`, `paused`, `pending_cancellation`, `cancelled` o `expired`, separado del estado de pago.
- Titular, beneficiarios del hogar, proveedor, tarifa, categoría, importe, moneda, impuestos incluidos, medio de pago enmascarado y notas.
- Ciclo de cobro mediante frecuencia, intervalo, ancla de facturación y política de ajuste de fin de mes.
- Línea temporal contractual formada por eventos inmutables: inicio, fin de prueba, inicio/fin de permanencia, límite de preaviso, renovación, solicitud/confirmación de baja y cambio de precio.
- Historial de precios con vigencia temporal; el coste actual se deriva del tramo aplicable, no se reescribe el histórico.
- Bajas sin automatización de terceros en el MVP: la app registra instrucciones, evidencias y estado, pero no afirma haber cancelado un servicio.

**Motor compartido de recurrencias**

- Paquete Laravel versionado compartido con Control de Gastos Personal para frecuencia, calendario, proyección, ocurrencias previstas, normalización de coste y emparejamiento.
- Núcleo sin dependencias de modelos Eloquent de ninguna app; contratos mediante objetos de valor, interfaces de repositorio y eventos versionados.
- Adaptador propio del Gestor para traducir suscripción, periodo de prueba, precio vigente y ciclo de cobro a la representación común.
- Cálculo normalizado mensual y anual basado en coste por ciclo: semanal × 52/12 y × 52; trimestral ÷ 3 y × 4; semestral ÷ 6 y × 2; anual ÷ 12 y sin multiplicación. Se conservará el importe original junto al normalizado.
- Eventos `recurrence.created`, `recurrence.updated`, `recurrence.cancelled` y `recurrence.occurrence_matched` con `event_id`, `schema_version`, `occurred_at` y claves idempotentes.

**Captura manual, OCR e importación**

- Flujo común de candidatos para que OCR, correo reenviado y CSV desemboquen en el mismo modelo de revisión.
- OCR asíncrono con documento original privado, texto extraído, proveedor, importe, fechas, periodicidad y nivel de confianza por campo.
- Correo mediante dirección de reenvío única o carga de `.eml`; no se solicitará acceso completo al buzón en el MVP.
- Importación CSV con mapeo de fecha, concepto, importe/debe-haber y cuenta; plantillas reutilizables por banco o formato.
- Detección de cargos recurrentes por similitud del descriptor, cadencia y tolerancia de importe. El sistema propondrá una suscripción o una ocurrencia, nunca ambas sin resolver primero la identidad.
- Hash SHA-256 del fichero/documento y claves de origen para evitar reprocesamientos accidentales.

**Línea temporal y alertas**

- Reglas de derivación separadas para próxima fecha de cobro, fecha de renovación y último día útil para notificar la baja.
- Preaviso expresado como cantidad, unidad y referencia (`before_renewal`, `before_period_end`); no se reducirá a una fecha fija hasta calcular cada ciclo.
- Alertas programadas por evento con múltiples anticipaciones configurables, deduplicación y registro de entrega.
- Reprogramación al cambiar precio, ciclo o fechas; las alertas ya enviadas se conservan como evidencia.
- Canales iniciales: notificación web/PWA y correo electrónico. Push móvil queda condicionado a compatibilidad real del navegador y permiso del usuario.

**Hogar y duplicidades**

- Beneficiarios diferenciados del titular y pagador para detectar que dos personas financian servicios equivalentes.
- Candidatos de duplicidad por misma plantilla, categoría funcional, solapamiento temporal y conjunto de beneficiarios.
- Estados `candidate`, `ignored`, `confirmed` y `resolved`; resolver implica conservar ambas, asignar una suscripción principal o registrar una cancelación prevista.
- Las coincidencias privadas mostrarán al resto solo categoría, grado de solapamiento y acción solicitada; proveedor e importe requieren autorización del titular.

**Traspaso a Control de Gastos Personal**

- Consentimiento con alcance por suscripción, campos autorizados, aplicación destino, versión del contrato y fecha de revocación.
- Envío asíncrono mediante outbox transaccional; nunca acceso directo a la base de datos de Control de Gastos.
- Payload mínimo: identificador externo opaco, nombre, categoría sugerida, importe y moneda, frecuencia, próxima fecha, estado e historial de precios necesario para proyección.
- Idempotencia por combinación de app origen, suscripción y versión; actualizaciones posteriores requieren consentimiento vigente y conservan correlación.
- Revocar detiene futuras sincronizaciones, pero no borra automáticamente datos ya aceptados por la otra app; la interfaz lo explicará antes de confirmar.

**Analítica, seguridad y auditoría**

- Agregados de coste mensual/anual, categoría, miembro y estado, excluyendo borradores y canceladas fuera del periodo.
- Auditoría de confirmaciones OCR, cambios contractuales, duplicidades, consentimientos, exportaciones e invitaciones.
- Documentos en almacenamiento privado con URLs temporales, cifrado en tránsito y reposo, borrado independiente y retención configurable.
- Métricas de producto sin contenido financiero: tiempo hasta primera suscripción, método de alta, alertas activadas, duplicidades resueltas y traspasos consentidos.

**Sincronización offline**

- UUID generado en cliente, cola de mutaciones, claves de idempotencia y sincronización incremental por cursor.
- Alta y edición manual disponibles sin conexión; OCR, importación, invitaciones, envío de correo y traspaso requerirán servidor.
- Versionado optimista en importe, ciclo, fechas contractuales y estado. Un conflicto no podrá resolverse con “última escritura gana” si altera una alerta o proyección.

## 3. Módulos de frontend

**Inicio**

- Totales mensual y anual normalizados, próximo cobro, próxima fecha límite de baja, pruebas que terminan y ahorro potencial por duplicidades.
- Selector de hogar y filtro personal/familiar; cada cifra enlazará con las suscripciones que la componen.
- Estado offline y fecha de última sincronización visibles sin ocupar la navegación principal.

**Alta rápida**

- Formulario de cuatro datos obligatorios: servicio, importe, periodicidad y próxima fecha de cobro.
- Autocompletado desde plantillas españolas, sin rellenar precios ni permanencias no confirmados.
- Después del guardado se solicitarán solo datos que habiliten una función concreta: fin de prueba para alertar, preaviso para calcular la fecha límite o titular para detectar duplicidades.

**Captura por documento o correo**

- Carga de PDF o imagen y reenvío de correo a una dirección asignada.
- Pantalla de revisión campo a campo con fragmento de evidencia y confianza; campos inciertos destacados.
- Comparación con suscripciones existentes antes de crear una nueva para evitar que una factura mensual origine duplicados.
- Opción de eliminar el documento tras confirmar y conservar únicamente los campos estructurados.

**Importación bancaria**

- Asistente para fichero, mapeo, previsualización, detección de recurrencias y revisión de candidatos.
- Agrupación de cargos similares con cadencia estimada, rango de importe y meses observados.
- Decisiones separadas: crear suscripción, vincular como pago de una existente, ignorar comercio o posponer.
- Resumen por fila y posibilidad de revertir el lote sin eliminar suscripciones editadas posteriormente.

**Suscripciones**

- Lista con coste original y normalizado, titular, próximo hito, estado y visibilidad.
- Filtros por categoría, miembro, estado, periodicidad, prueba, permanencia y duplicidad.
- Ficha con datos actuales, beneficiarios, historial de precios, documentos, pagos detectados y acciones de editar, pausar, iniciar baja o cancelar.

**Línea temporal contractual**

- Representación cronológica de prueba, permanencia, preaviso, renovación, cambios de precio y baja.
- Editor de eventos con distinción entre fecha confirmada, calculada y estimada.
- Acción “preparar baja” que muestre fecha límite, instrucciones guardadas, evidencia adjunta y recordatorios; no se etiquetará como baja completada hasta confirmación manual.

**Calendario y alertas**

- Calendario/lista de próximos cobros e hitos contractuales con agrupación semanal y mensual.
- Configuración de anticipaciones por tipo de evento y excepciones por suscripción.
- Centro de alertas con estado programada, enviada, fallida, descartada o atendida.

**Costes y escenarios**

- Desglose mensual/anual por categoría y miembro, conservando la periodicidad original en el detalle.
- Simulador de cancelación múltiple con ahorro a 1, 3 y 12 meses; respetará permanencias y cargos previstos hasta la baja efectiva.
- Comparación antes/después de un cambio de precio y efecto sobre el total anual.

**Hogar y duplicidades**

- Invitaciones, roles, beneficiarios y controles de visibilidad por suscripción.
- Bandeja de posibles duplicidades con explicación de la coincidencia y coste anual combinado.
- Resolución mediante conservar, compartir, marcar como no duplicado o planificar la baja de una opción.

**Traspaso a Control de Gastos**

- Selector de suscripciones, previsualización exacta de campos y explicación de qué se sincronizará en el futuro.
- Confirmación individual o masiva, estado por elemento y reintento seguro.
- Gestión del consentimiento: pausar futuras actualizaciones o revocar la conexión sin prometer borrado retroactivo.

**Ajustes y privacidad**

- Plantillas, categorías, preferencias de avisos, canales, dispositivos, exportación y eliminación de cuenta/hogar.
- Panel de documentos con fecha de retención y borrado independiente.
- Registro comprensible de accesos compartidos y traspasos entre aplicaciones.

## 4. Modelo de datos inicial

Las claves primarias serán UUID/ULID. Los importes usarán enteros en unidad mínima y código ISO 4217. Las entidades editables offline incluirán `created_at`, `updated_at`, `deleted_at` y `lock_version`; las financieras y contractuales incluirán `household_id` y `created_by`.

| Entidad | Campos específicos iniciales | Restricciones y relaciones |
| --- | --- | --- |
| `users` | `email`, `name`, `locale`, `timezone` | Correo único; preferencias personales fuera de datos del hogar. |
| `households` | `name`, `base_currency`, `timezone` | EUR en MVP; propietario mediante membresía. |
| `household_members` | `household_id`, `user_id`, `role`, `status`, `joined_at` | Único por hogar y usuario. |
| `household_invitations` | `household_id`, `email`, `role`, `token_hash`, `expires_at`, `accepted_at` | Token almacenado solo como hash. |
| `service_templates` | `name`, `slug`, `category_id`, `country_codes_json`, `website_url`, `logo_asset`, `version`, `active` | Catálogo global versionado; sin precio considerado vigente. |
| `service_template_aliases` | `service_template_id`, `alias`, `alias_type`, `normalized_value`, `confidence_weight` | Índice por valor normalizado y tipo OCR/banco/manual. |
| `service_plans` | `service_template_id`, `name`, `billing_frequencies_json`, `metadata_schema_json`, `active` | Sirve de ayuda de captura; no impone condiciones al usuario. |
| `subscriptions` | `household_id`, `service_template_id`, `service_plan_id`, `name`, `category_id`, `owner_member_id`, `payer_member_id`, `visibility`, `status`, `currency`, `billing_frequency`, `billing_interval`, `billing_anchor_on`, `end_of_month_policy`, `next_charge_on`, `payment_method_label`, `notes`, `shared_engine_id`, `engine_schema_version` | Índices por hogar/estado, próximo cobro y plantilla; no incluye el precio histórico como campo mutable único. |
| `subscription_beneficiaries` | `subscription_id`, `household_member_id` | Par único; permite detectar solapamientos distintos de titular/pagador. |
| `subscription_prices` | `subscription_id`, `amount_minor`, `effective_from`, `effective_until`, `source`, `confirmed_at` | Tramos no solapados; uno vigente por fecha. |
| `contract_events` | `subscription_id`, `type`, `effective_at`, `date_precision`, `source`, `status`, `metadata_json` | Eventos inmutables; correcciones mediante supersesión, no edición destructiva. |
| `notice_terms` | `subscription_id`, `quantity`, `unit`, `reference_event`, `effective_from`, `effective_until` | Un término vigente por suscripción y fecha. |
| `recurrence_occurrences` | `subscription_id`, `expected_on`, `expected_amount_minor`, `status`, `matched_import_item_id`, `engine_occurrence_id` | Único por suscripción y ocurrencia del motor. |
| `documents` | `household_id`, `uploaded_by`, `storage_key`, `original_name`, `mime_type`, `sha256`, `retention_until`, `deleted_at` | Privado; único por hogar y hash salvo carga explícita. |
| `extraction_jobs` | `document_id`, `source_type`, `status`, `provider`, `started_at`, `completed_at`, `error_code` | Procesamiento asíncrono reintentable. |
| `extracted_fields` | `extraction_job_id`, `field_name`, `raw_value`, `normalized_value_json`, `confidence`, `evidence_locator`, `review_status` | Conserva evidencia por campo y decisión del usuario. |
| `import_templates` | `household_id`, `name`, `bank_label`, `mapping_json`, `parsing_options_json`, `version` | Mapeo validado y reutilizable. |
| `import_batches` | `household_id`, `template_id`, `original_filename`, `file_hash`, `status`, `total_rows`, `processed_rows`, `completed_at` | Idempotencia por hogar y hash, con reimportación explícita. |
| `import_items` | `import_batch_id`, `row_number`, `booked_on`, `description`, `amount_minor`, `currency`, `normalized_descriptor`, `status`, `candidate_group_id` | Único por lote/fila; retiene el dato bancario mínimo. |
| `subscription_candidates` | `household_id`, `source_type`, `source_id`, `suggested_template_id`, `suggested_fields_json`, `confidence`, `status`, `resolved_subscription_id` | Un candidato debe confirmarse, vincularse o ignorarse. |
| `duplicate_candidates` | `household_id`, `left_subscription_id`, `right_subscription_id`, `score`, `reasons_json`, `privacy_projection_json`, `status`, `resolved_at`, `resolved_by` | Par canónico único; las privadas usan una proyección autorizada. |
| `notification_rules` | `user_id`, `event_type`, `channel`, `offset_quantity`, `offset_unit`, `enabled` | Regla general del usuario por tipo de hito. |
| `notification_overrides` | `subscription_id`, `notification_rule_id`, `enabled`, `custom_offset_json` | Excepción específica sin duplicar la regla base. |
| `scheduled_notifications` | `subscription_id`, `contract_event_id`, `recipient_user_id`, `channel`, `scheduled_for`, `dedupe_key`, `status`, `sent_at`, `failure_code` | `dedupe_key` única; reprogramación auditable. |
| `transfer_consents` | `household_id`, `user_id`, `destination_app`, `scope_json`, `contract_version`, `granted_at`, `revoked_at` | Alcance explícito y versionado. |
| `subscription_transfers` | `transfer_consent_id`, `subscription_id`, `destination_external_id`, `payload_version`, `payload_hash`, `status`, `last_synced_at`, `error_code` | Único por consentimiento, suscripción y versión de payload. |
| `outbox_events` | `aggregate_type`, `aggregate_id`, `event_type`, `schema_version`, `payload_json`, `occurred_at`, `published_at`, `attempts` | Escritura en la misma transacción que el cambio de dominio. |
| `audit_logs` | `household_id`, `actor_id`, `action`, `subject_type`, `subject_id`, `origin`, `before_json`, `after_json`, `occurred_at` | Inmutable; retención definida por política. |
| `sync_operations` | `household_id`, `user_id`, `device_id`, `operation_uuid`, `entity_type`, `entity_id`, `action`, `base_version`, `status`, `conflict_json` | `operation_uuid` única para idempotencia. |

Los totales mensual/anual serán proyecciones reconstruibles, no fuentes de verdad. Los eventos contractuales, precios y consentimientos conservarán historia; borrar una suscripción será lógico hasta completar la ventana de recuperación y las obligaciones de retención.

## 5. Diferenciador frente a competencia

- **Calendario contractual, no solo lista de cargos:** separa fin de prueba, permanencia, preaviso, renovación, cobro y cambio de precio, evitando avisos que llegan cuando la baja ya no es posible.
- **Entrada sin credenciales bancarias:** manual, OCR, correo reenviado y CSV convergen en borradores revisables con evidencia por campo.
- **Adaptación al mercado español:** plantillas de telecos, gimnasios, seguros y servicios comunes; modelado explícito de permanencia y preaviso, más relevante que una periodicidad genérica.
- **Coste comparable sin perder el contrato original:** normaliza mensual y anual, pero mantiene periodicidad, precio vigente e historial para explicar cada total.
- **Duplicidades familiares con privacidad graduada:** detecta solapamientos entre titulares y beneficiarios sin hacer públicas automáticamente las suscripciones privadas.
- **Escenarios de ahorro realistas:** el cálculo “si cancelo” incluye fin de permanencia, plazo de preaviso y cobros hasta la fecha efectiva, en lugar de multiplicar el precio actual por doce.
- **Automatización honesta de la baja:** ayuda a prepararla y documentarla, pero no afirma haber cancelado un servicio sin confirmación verificable.
- **Wedge con salida útil:** el traspaso consentido convierte suscripciones confirmadas en recurrencias de Control de Gastos Personal mediante un contrato versionado, sin acoplar bases de datos ni capturar más información de la autorizada.

## 6. Fases del roadmap

**Fase 0 — Contratos y cimientos**

- Cerrar objetos de valor para dinero, frecuencia, ancla, precio, evento contractual, preaviso y ocurrencia.
- Extraer/versionar el motor de recurrencias compartido y publicar pruebas de contrato válidas para ambas aplicaciones.
- Definir aislamiento por hogar, permisos, protocolo offline, esquema de eventos y outbox.
- Preparar observabilidad independiente: PHP-FPM, colas, Redis, base de datos, latencia, errores, almacenamiento OCR y coste por extracción.

**Fase 1 — Wedge manual offline-first**

- Hogar individual, plantillas iniciales, alta rápida, edición, estados e historial de precios.
- Totales mensual/anual, próximos cobros, calendario contractual y alertas PWA/correo.
- Cola local, sincronización incremental, idempotencia y resolución de conflictos sensibles.
- Criterio de salida: primera suscripción en menos de dos minutos; alta/edición offline sin duplicados; cálculos validados para todos los ciclos y finales de mes.

**Fase 2 — Captura asistida**

- Carga de factura/imagen, correo reenviado, OCR asíncrono y revisión con evidencia por campo.
- CSV bancario, mapeos guardados, agrupación recurrente y vinculación de pagos.
- Prevención de duplicados entre candidatos, suscripciones existentes y documentos repetidos.
- Criterio de salida: conjunto de prueba anonimizado con proveedores españoles, umbrales de confianza medidos y cero activaciones automáticas sin confirmación.

**Fase 3 — Contratos y decisiones de ahorro**

- Permanencia, preaviso, fin de prueba, renovación, cambio de precio y flujo de preparación de baja.
- Simulador de cancelación a 1, 3 y 12 meses respetando fechas efectivas.
- Centro de alertas, reprogramación y trazabilidad de entregas.
- Criterio de salida: pruebas temporales sobre años bisiestos, cambios de hora, meses cortos, ciclos anclados y modificaciones retroactivas.

**Fase 4 — Hogar y duplicidades**

- Invitaciones, roles, titular/pagador/beneficiarios y visibilidad privada o familiar.
- Detección explicable de solapamientos y flujo de resolución.
- Totales por miembro y hogar sin filtrar datos privados no autorizados.
- Criterio de salida: aislamiento multihogar y privacidad cubiertos por pruebas de autorización; ningún agregado permite inferir proveedor o importe privado.

**Fase 5 — Embudo hacia Control de Gastos**

- Consentimiento granular, selección, previsualización, outbox, entrega idempotente y correlación con la recurrencia destino.
- Actualización posterior controlada y revocación de futuras sincronizaciones.
- Métricas del embudo sin contenido financiero ni documentos.
- Criterio de salida: pruebas contractuales extremo a extremo, reintentos sin duplicación, eventos fuera de orden y revocación efectiva.

**Fase 6 — Endurecimiento y salida a producción**

- Ampliar y mantener el catálogo español con proceso de revisión y versionado.
- Exportación y borrado RGPD, retención documental, copias de seguridad y restauración probada.
- Seguridad de cargas, análisis antivirus, límites de tamaño/tipo, rate limiting, accesibilidad y rendimiento plurianual.
- QA exhaustivo funcional, offline, concurrencia, notificaciones, privacidad, seguridad y navegadores PWA; despliegue preparado sin prometer cancelación automática ni acceso bancario directo.
