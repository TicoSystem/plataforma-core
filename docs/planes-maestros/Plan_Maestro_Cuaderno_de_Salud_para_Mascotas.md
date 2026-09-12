## 1. Propósito y usuario objetivo

**Cuaderno de Salud para Mascotas** reunirá la información sanitaria y de cuidado de cada animal en una cronología portable, legible y controlada por su responsable. Será un cuaderno personal de continuidad asistencial: no sustituirá la historia clínica custodiada por una clínica, una receta veterinaria, los registros oficiales de identificación ni el pasaporte oficial exigible para viajar.

El producto se dirige a responsables de perros, gatos y otras mascotas en España que utilizan varias clínicas, residencias, cuidadores o servicios de urgencias y necesitan entregar información fiable sin compartir toda su cuenta. El MVP priorizará perros y gatos; nuevas especies se habilitarán únicamente cuando existan modelos de datos y contenidos de cuidado revisados para ellas.

Decisiones de alcance:

- Cada dato indicará procedencia y estado: introducido por responsable, extraído por OCR, importado de documento, aportado por profesional o verificado mediante documento. “Verificado” no significará validado por la plataforma.
- OCR generará borradores campo a campo. Vacunas, diagnósticos, alergias, medicamentos, dosis o resultados nunca entrarán en el resumen de emergencia sin confirmación.
- Los planes por especie y etapa de vida serán recordatorios generales y configurables. No diagnosticarán, prescribirán, calcularán dosis ni sustituirán el calendario indicado por el veterinario.
- El modo emergencia offline contendrá un subconjunto seleccionado y cifrado en el dispositivo: identidad, contactos, alergias, medicación activa, diagnósticos relevantes y pautas de emergencia aportadas por un veterinario.
- El QR no contendrá datos sanitarios. Resolverá un token opaco, limitado por mascota, finalidad, campos, vigencia y número de usos; el responsable podrá revocarlo de inmediato.
- Un cuidador o residencia podrá registrar observaciones y administraciones autorizadas, pero no modificar diagnósticos, vacunas o prescripciones.
- La exportación PDF separará hechos registrados, documentos adjuntos y recordatorios; no presentará el contenido como certificado oficial.
- Solo los gastos veterinarios seleccionados viajarán a Control de Gastos Personal mediante eventos asíncronos consentidos; los datos clínicos y documentos no se incluirán por defecto.

## 2. Dominios de backend

**Identidad, hogares y responsables**

- Usuario, hogar de mascotas, membresías e invitaciones con roles `owner`, `caregiver` y `viewer`.
- Relación específica por mascota entre responsable principal, corresponsable y cuidador temporal.
- Permisos por capacidad: ver resumen, ver documentos, registrar observación, administrar pauta, editar identidad, compartir y exportar.
- Aislamiento obligatorio por `pet_household_id` en controladores, repositorios, colas, exportaciones y eventos.

**Mascotas e identificación**

- Ficha con nombre, especie, raza declarada, sexo, esterilización, fecha de nacimiento exacta/estimada, color, foto y estado.
- Identificadores separados: microchip, pasaporte oficial, registro autonómico y póliza; cifrados o enmascarados donde proceda.
- Contactos de emergencia, clínica habitual y veterinario de referencia como datos aportados por el responsable.
- Estado `active`, `missing`, `deceased` o `archived`; el fallecimiento detiene recordatorios pero conserva la cronología.
- El “pasaporte digital” será una vista portable del cuaderno y nunca reutilizará numeración o apariencia que pueda confundirse con un documento oficial.

**Cronología sanitaria**

- Evento clínico base con tipo, fecha/hora, título, resumen, origen, estado de verificación, autor y enlaces a documentos.
- Tipos iniciales: vacuna, consulta, diagnóstico comunicado, síntoma observado, analítica, procedimiento, alergia/reacción, peso, medicación, hospitalización y episodio.
- Episodio como contenedor temporal de síntomas, consultas, pruebas, diagnósticos, tratamientos y resolución sin borrar la individualidad de los eventos.
- Correcciones mediante nuevas versiones o supersesión; el valor original, autor y motivo permanecen auditables.
- Hechos aportados por un usuario se redactarán como “registrado/comunicado por”, evitando atribuirlos a una clínica sin evidencia.

**Vacunas y preventivos**

- Vacunación con producto, fabricante, enfermedad/valencia, lote, fecha, próxima recomendación, profesional/centro y evidencia documental.
- Desparasitación y antiparasitarios como eventos preventivos separados, con producto, vía, fecha y siguiente fecha indicada.
- Recordatorios derivados de una fecha introducida o del plan aceptado; nunca se inventará una próxima dosis por reconocimiento del nombre comercial.
- Estado `planned`, `administered`, `overdue`, `skipped` o `unknown`; solo `administered` exige fecha real y procedencia.

**Medicaciones y pautas**

- Medicamento con nombre tal como figura en receta/envase, principio activo opcional, forma, concentración, vía y prescriptor declarado.
- Pauta versionada con cantidad textual y estructurada, unidad, frecuencia, inicio/fin, instrucciones y zona horaria.
- Administración registrada por responsable/cuidador con hora programada/real, estado y nota; no modifica la pauta.
- La app no calculará dosis por peso ni recomendará iniciar, cambiar o interrumpir tratamiento.
- Alertas por administración y fin de pauta con registro de envío; una omisión no generará consejo clínico automático.

**Analíticas y medidas**

- Panel analítico con prueba, valor, unidad, intervalo de referencia exactamente como aparece en el laboratorio, marca fuera de rango original y documento.
- No se compararán valores entre laboratorios/unidades sin conversión definida y confirmada.
- Peso y otras medidas con fecha, dispositivo/fuente y unidad; las tendencias serán descriptivas, sin diagnóstico.
- OCR de analíticas preservará texto y tabla original para revisión; ningún indicador se interpretará clínicamente.

**Documentos y OCR**

- Cartillas, informes, recetas, analíticas y facturas en almacenamiento privado con hash SHA-256, páginas y metadatos mínimos.
- Pipeline asíncrono: análisis de seguridad, clasificación, OCR, extracción por esquema, revisión y vinculación.
- Confianza y evidencia por campo; valores ambiguos —fecha, lote, dosis, decimal, unidad— requerirán confirmación individual.
- Una página podrá producir varios eventos; una factura generará gasto y proveedor, pero no inferirá diagnóstico desde una línea comercial.
- Documento original y datos estructurados tendrán políticas de retención y borrado independientes.

**Planes de cuidado**

- Plantillas editoriales versionadas por especie, etapa de vida y contexto general, con tareas de revisión, higiene, prevención y seguimiento.
- Cada recomendación indicará fuente, fecha de revisión, ámbito geográfico y condición de aplicabilidad.
- Al activar un plan se crean tareas propuestas; el responsable acepta, descarta o sustituye cada una por la pauta de su veterinario.
- Las reglas no usarán síntomas para sugerir diagnósticos ni medicamentos; ante señales marcadas como urgentes mostrarán contacto veterinario, no tratamiento.
- Cambios de una plantilla no alterarán tareas aceptadas sin una comparación y confirmación.

**Recordatorios**

- Recordatorios por fecha fija, intervalo o evento previo para vacunas, preventivos, medicación, revisión y renovación documental.
- Zona horaria del responsable, anticipaciones múltiples, posposición, deduplicación y registro de entrega.
- Reprogramación explícita cuando cambia la pauta; notificaciones enviadas se conservan como evidencia.
- Canales iniciales: PWA y correo; no se promete entrega crítica ni se usarán como único mecanismo para una urgencia.

**Compartición temporal por QR**

- Concesión con mascota, destinatario/finalidad, ámbitos de datos, permisos, inicio, expiración, máximo de accesos y revocación.
- Ámbitos predefinidos: emergencia, veterinario, residencia y cuidador; el usuario verá la lista exacta de campos antes de crearla.
- Token aleatorio de alta entropía almacenado como hash, rotación, expiración y rate limiting; no se aceptarán identificadores secuenciales.
- Vista web sin cuenta para lectura temporal; escritura requerirá verificación adicional y quedará limitada a observaciones/administraciones autorizadas.
- Registro de cada acceso con fecha, alcance, resultado y metadatos mínimos; aviso al propietario configurable.
- Descarga de documentos desactivada por defecto y marcada con expiración cuando se autorice.

**Modo emergencia offline**

- Paquete local por mascota generado desde campos seleccionados, con fecha de actualización y advertencia si está desfasado.
- Incluye foto, microchip enmascarable/completo por elección, responsables, clínica, alergias, medicación activa, diagnósticos relevantes y pauta veterinaria de emergencia adjunta.
- Cifrado local y desbloqueo rápido definido por el usuario; opción de mostrar una tarjeta mínima desde la pantalla de bloqueo sin datos sensibles adicionales.
- Actualización transaccional: si falla una sincronización, se conserva el último paquete íntegro.
- El QR remoto y el modo offline serán mecanismos distintos; una caída del servidor no dejará inaccesible el resumen local.

**Gastos e integración con Control de Gastos Personal**

- Gasto con fecha, clínica/proveedor, total, base/IVA si consta, categoría, mascota, evento relacionado y justificante.
- Conciliación de duplicados entre factura OCR y alta manual por proveedor, fecha, importe y hash.
- Consentimiento por mascota, categoría, periodo y campos; previsualización antes de activar la transferencia.
- Outbox transaccional con `pet_expense.created`, `pet_expense.updated` y `pet_expense.deleted`, `event_id` y `schema_version`.
- Payload mínimo: identificador opaco, fecha, importe, moneda, proveedor y categoría sugerida. No incluirá nombre de mascota, diagnóstico, medicación ni documento salvo autorización separada.
- Consumidor idempotente y sin acceso directo entre bases de datos; revocar detiene futuras sincronizaciones sin prometer borrado retroactivo.

**Exportación PDF**

- Exportación seleccionable por periodo y secciones: identidad, resumen de emergencia, vacunas, medicación, alergias, episodios, analíticas, peso y documentos.
- Índice cronológico, procedencia, estado de verificación, unidades y referencias a anexos.
- Vista previa y exclusión de eventos/notas/documentos; marca de fecha de generación y ámbito.
- Enlace temporal revocable o archivo local; el PDF no imitará certificado sanitario, receta ni pasaporte oficial.

**Privacidad, auditoría y sincronización offline**

- Datos de propietarios, profesionales y destinatarios protegidos como datos personales; minimización de telemetría y exclusión de contenido clínico en logs.
- Auditoría inmutable de cambios sanitarios, OCR, consentimientos, QR, accesos, exportaciones y eventos hacia otras apps.
- UUID de cliente, cola local, cursor incremental, claves idempotentes y versiones optimistas.
- Alta/edición de observaciones, peso, medicación administrada y eventos manuales disponibles offline; OCR, QR remoto, correo y exportación se completan en servidor.
- Conflictos explícitos para pauta, alergia, diagnóstico, vacuna, eliminación y permisos; nunca “última escritura gana” en campos críticos.

## 3. Módulos de frontend

**Mis mascotas**

- Tarjetas con foto, especie, edad, próximo hito y avisos; selector persistente de mascota.
- Alta rápida con mínimos obligatorios: nombre y especie; identificación y datos sanitarios se completan progresivamente.
- Indicador de última actualización del paquete de emergencia offline.

**Resumen sanitario**

- Alergias/reacciones, medicación activa, diagnósticos relevantes comunicados, peso reciente, clínica y próximos recordatorios.
- Cada dato muestra fuente, fecha y estado de verificación; acceso directo al evento/documento origen.
- Acciones para corregir, ocultar del resumen o marcar como resuelto sin borrar historia.

**Cronología**

- Vista única filtrable por tipo, episodio, origen, profesional y periodo.
- Alta manual específica por evento, no un formulario genérico que mezcle vacuna, analítica y medicación.
- Agrupación de eventos en episodios y comparación de versiones/supersesiones.
- Operación offline con estado pendiente, sincronizado o en conflicto.

**Vacunas y preventivos**

- Cartilla digital por enfermedad/valencia, producto, lote, fecha y evidencia.
- Próximas fechas diferenciando indicada por veterinario, extraída pendiente o propuesta por plan.
- Recordatorios y exportación sin presentar la pantalla como pasaporte oficial.

**Medicaciones**

- Lista activa/histórica, pauta legible y calendario de administraciones.
- Registro rápido administrada, omitida o pospuesta por cuidador autorizado.
- Cambios de pauta como versión nueva con comparación; sin calculadora de dosis.

**Analíticas y peso**

- Resultados tabulares con unidad e intervalo del laboratorio, documento y marca original.
- Gráficas solo entre magnitudes compatibles; aviso cuando cambia unidad, método o laboratorio.
- Tendencia de peso descriptiva y exportable, sin interpretación automática.

**Captura OCR**

- Cámara/carga de cartilla, informe, receta, analítica o factura.
- Revisión campo a campo con recorte de evidencia, confianza y destino propuesto en cronología.
- Prevención de duplicados y posibilidad de conservar solo el documento, solo datos estructurados o ambos.

**Planes y recordatorios**

- Plan por especie/etapa con fuente y versión; tareas propuestas pendientes de aceptación.
- Sustitución de una tarea general por indicación del veterinario conservando procedencia.
- Calendario de vacunas, preventivos, revisiones y medicación con estados y canales.

**Compartir por QR**

- Selector de mascota, finalidad, campos, permisos, duración y usos máximos.
- Previsualización exacta de la pantalla que verá el destinatario antes de generar el QR.
- Panel de enlaces activos, caducados y revocados, con accesos y botón de revocación inmediata.
- Escritura para cuidador separada de lectura y protegida por verificación adicional.

**Emergencia offline**

- Pantalla de alto contraste accesible sin red con identidad, contactos y datos críticos seleccionados.
- Fecha/estado de actualización y acción para desbloquear datos ampliados.
- Prueba guiada del modo avión después de configurarlo; no dependerá de la caché ocasional del navegador.

**Gastos**

- Alta manual o desde factura OCR, vínculo con mascota/evento y búsqueda por proveedor/periodo.
- Estado de justificante y posible duplicado; desglose fiscal solo si aparece en factura.
- Selección y consentimiento para enviar gastos a Control de Gastos Personal.

**Exportación**

- Periodo, secciones, documentos y nivel de detalle seleccionables.
- Vista previa del PDF en español, avisos sobre información no verificada y generación de enlace temporal.
- Historial con descarga, revocación y eliminación anticipada.

**Hogar, ajustes y privacidad**

- Miembros, responsabilidades por mascota, cuidadores temporales y permisos efectivos.
- Contactos, clínicas, retención documental, consentimientos, sesiones y dispositivos.
- Centro offline con última sincronización, operaciones pendientes, errores y conflictos accionables.

## 4. Modelo de datos inicial

Las claves primarias serán UUID/ULID. Fechas clínicas conservarán zona horaria y precisión (`exact`, `day`, `month`, `year`, `estimated`). Las entidades editables offline incluirán `created_at`, `updated_at`, `deleted_at` y `lock_version`; cada dato sanitario conservará autor, fuente y estado de verificación.

| Entidad | Campos específicos iniciales | Restricciones y relaciones |
| --- | --- | --- |
| `pet_households` | `name`, `timezone`, `locale` | Tenant raíz. |
| `household_members` | `pet_household_id`, `user_id`, `role`, `status`, `joined_at` | Único por hogar/usuario. |
| `pets` | `pet_household_id`, `name`, `species_code`, `breed_text`, `sex`, `neutered_status`, `born_on`, `birth_date_precision`, `color`, `photo_asset_id`, `status` | Especie controlada; raza admite texto no normalizado. |
| `pet_responsibilities` | `pet_id`, `member_id`, `responsibility_type`, `starts_at`, `ends_at`, `capabilities_json` | Acceso por mascota y periodo. |
| `pet_identifiers` | `pet_id`, `type`, `encrypted_value`, `masked_value`, `issuer`, `issued_on`, `expires_on`, `verification_status` | Único por tipo/emisor/valor normalizado. |
| `contacts` | `pet_household_id`, `type`, `name`, `phone`, `email`, `address`, `notes` | Responsable, clínica, veterinario, seguro o emergencia. |
| `pet_contact_links` | `pet_id`, `contact_id`, `role`, `priority` | Prioridad única por mascota/rol. |
| `health_events` | `pet_id`, `episode_id`, `type`, `occurred_at`, `date_precision`, `title`, `summary`, `source_type`, `verification_status`, `recorded_by`, `supersedes_event_id` | Evento base; correcciones encadenadas. |
| `clinical_episodes` | `pet_id`, `title`, `started_at`, `ended_at`, `status`, `summary` | Agrupa eventos sin sustituirlos. |
| `conditions` | `health_event_id`, `name_as_reported`, `status`, `onset_on`, `resolved_on`, `reported_by_contact_id` | Diagnóstico comunicado, no inferido. |
| `allergies_reactions` | `health_event_id`, `substance`, `reaction_text`, `severity_as_reported`, `status`, `reported_by_contact_id` | Gravedad como dato reportado. |
| `vaccinations` | `health_event_id`, `disease_targets_json`, `product_name`, `manufacturer`, `batch_number`, `administered_on`, `next_due_on`, `professional_contact_id` | Administrada requiere fecha; siguiente fecha conserva fuente. |
| `medications` | `pet_id`, `name_as_prescribed`, `active_ingredient`, `form`, `strength_text`, `route`, `prescriber_contact_id`, `status` | Nombre original preservado. |
| `medication_schedules` | `medication_id`, `version`, `dose_text`, `dose_quantity`, `dose_unit`, `frequency_rule_json`, `starts_at`, `ends_at`, `instructions`, `source_type` | Inmutable tras administraciones; cambios crean versión. |
| `medication_administrations` | `schedule_id`, `scheduled_at`, `administered_at`, `status`, `recorded_by`, `notes`, `operation_uuid` | UUID única; cuidador no cambia pauta. |
| `lab_panels` | `health_event_id`, `laboratory_name`, `collected_at`, `reported_at`, `document_id` | Conserva laboratorio y documento. |
| `lab_results` | `lab_panel_id`, `test_name`, `value_text`, `numeric_value`, `unit`, `reference_low`, `reference_high`, `reference_text`, `flag_as_reported` | No normaliza entre métodos sin conversión validada. |
| `measurements` | `pet_id`, `health_event_id`, `type`, `measured_at`, `value`, `unit`, `source_type` | Peso en unidad canónica para gráfica, original conservado. |
| `care_plan_templates` | `species_code`, `life_stage`, `region`, `version`, `source_json`, `reviewed_at`, `status` | Global, editorial y versionada. |
| `care_plan_template_items` | `template_id`, `code`, `title`, `description`, `schedule_rule_json`, `scope`, `safety_copy_key` | Sin pauta farmacológica ni diagnóstico. |
| `pet_care_plans` | `pet_id`, `template_id`, `template_version`, `activated_at`, `status` | Una activación no modifica la plantilla. |
| `care_tasks` | `pet_care_plan_id`, `template_item_id`, `title`, `due_on`, `status`, `source_type`, `replaced_by_instruction_id` | Propuesta requiere aceptación. |
| `reminders` | `pet_id`, `subject_type`, `subject_id`, `event_type`, `scheduled_for`, `channel`, `dedupe_key`, `status`, `sent_at` | Clave única para evitar envíos dobles. |
| `documents` | `pet_household_id`, `pet_id`, `type`, `storage_key`, `original_name`, `mime_type`, `sha256`, `issued_on`, `issuer_contact_id`, `retention_until` | Privado; hash ayuda a detectar duplicados. |
| `document_event_links` | `document_id`, `health_event_id`, `page_number`, `evidence_locator` | Un documento sustenta varios eventos. |
| `extraction_jobs` | `document_id`, `schema_type`, `status`, `provider`, `model_version`, `started_at`, `completed_at`, `error_code` | Asíncrono e idempotente. |
| `extracted_fields` | `extraction_job_id`, `field_name`, `raw_value`, `normalized_value_json`, `confidence`, `evidence_locator`, `review_status`, `resolved_subject_id` | Confirmación independiente por campo. |
| `share_grants` | `pet_id`, `created_by`, `purpose`, `scopes_json`, `capabilities_json`, `token_hash`, `starts_at`, `expires_at`, `max_accesses`, `access_count`, `revoked_at` | Token opaco; ámbitos y duración obligatorios. |
| `share_access_logs` | `share_grant_id`, `accessed_at`, `action`, `result`, `ip_hash`, `user_agent_class` | Metadatos minimizados y retención limitada. |
| `emergency_profiles` | `pet_id`, `version`, `scope_json`, `content_snapshot_encrypted`, `generated_at`, `source_cursor` | Snapshot localizable y verificable; una versión activa. |
| `expenses` | `pet_household_id`, `pet_id`, `health_event_id`, `provider_contact_id`, `incurred_on`, `tax_base_minor`, `vat_minor`, `total_minor`, `currency`, `category`, `document_id`, `source_type` | No inferir contenido clínico desde factura. |
| `duplicate_candidates` | `pet_household_id`, `left_type`, `left_id`, `right_type`, `right_id`, `score`, `reasons_json`, `status`, `resolved_by` | Ninguna fusión automática. |
| `exports` | `pet_id`, `created_by`, `format`, `period_start`, `period_end`, `scope_json`, `storage_key`, `expires_at`, `revoked_at`, `status` | Temporal, privado y regenerable. |
| `consent_records` | `pet_household_id`, `user_id`, `purpose`, `scope_json`, `policy_version`, `granted_at`, `revoked_at`, `evidence_json` | Finalidad y alcance separados. |
| `expense_transfers` | `consent_id`, `expense_id`, `destination_external_id`, `payload_version`, `payload_hash`, `status`, `last_synced_at` | Idempotencia por gasto/versión. |
| `outbox_events` | `pet_household_id`, `aggregate_type`, `aggregate_id`, `event_type`, `schema_version`, `payload_json`, `occurred_at`, `published_at`, `attempts` | Escritura transaccional con el gasto. |
| `sync_operations` | `pet_household_id`, `user_id`, `device_id`, `operation_uuid`, `command_type`, `payload_json`, `base_versions_json`, `status`, `conflict_json` | UUID única; comandos críticos no usan última escritura gana. |
| `audit_logs` | `pet_household_id`, `actor_id`, `action`, `subject_type`, `subject_id`, `origin`, `before_json`, `after_json`, `occurred_at` | Inmutable; sin contenido sensible innecesario en índices. |

La cronología y sus versiones son la fuente de verdad. Resúmenes, calendarios, PDF y paquete de emergencia son proyecciones reconstruibles; cada una debe conservar el cursor o versiones de eventos con los que fue generada.

## 5. Diferenciador frente a competencia

- **Una cronología con procedencia real:** vacuna, diagnóstico comunicado, analítica, alergia, peso y medicación comparten orden temporal, pero mantienen esquemas, autor, fuente y evidencia propios.
- **Portabilidad sin suplantar documentos oficiales:** el cuaderno facilita continuidad y exportación, dejando claro qué es registro del responsable, documento profesional o dato verificado documentalmente.
- **OCR seguro por campo:** conserva el recorte de evidencia y exige confirmación en dosis, fechas, lotes, unidades y decimales antes de afectar el resumen.
- **Compartición de mínimo privilegio:** cada QR limita mascota, finalidad, campos, acciones, vigencia y usos; la revocación y el registro de accesos forman parte del flujo principal.
- **Emergencia realmente offline:** un paquete íntegro, cifrado y probado en modo avión no depende de que el QR o el servidor estén disponibles.
- **Cuidador sin privilegios clínicos:** puede registrar observaciones y administraciones autorizadas, pero no modificar prescripciones, diagnósticos o vacunas.
- **Planes generales que respetan al veterinario:** las tareas editoriales se aceptan individualmente y pueden ser sustituidas por instrucciones aportadas por el profesional sin mezclar ambas procedencias.
- **Gasto desacoplado de salud:** Control de Gastos recibe únicamente datos económicos consentidos y nunca deduce información clínica desde el evento transferido.

## 6. Fases del roadmap

**Fase 0 — Alcance, seguridad y lenguaje**

- Formalizar la diferencia entre cuaderno personal, historia clínica de clínica, receta, identificación y pasaporte oficial.
- Definir taxonomía de eventos, procedencia, verificación, supersesión y campos críticos.
- Diseñar tenant/permisos, consentimientos, retención, amenaza de QR y modelo offline cifrado.
- Establecer revisión veterinaria editorial para planes, mensajes de urgencia y textos que podrían interpretarse como consejo clínico.
- Preparar observabilidad aislada: PHP-FPM, colas, Redis, base de datos, OCR, almacenamiento, errores y latencia sin payloads clínicos.

**Fase 1 — Cuaderno manual offline-first**

- Mascotas, contactos, cronología, vacunas, alergias, peso, medicaciones, documentos y recordatorios manuales.
- PWA con almacenamiento local, cola idempotente, sincronización incremental y conflictos explícitos.
- Resumen sanitario con procedencia y exportación de datos básicos.
- Criterio de salida: registrar y editar eventos sin red, sincronizar sin duplicados y reconstruir el resumen desde eventos/versiones.

**Fase 2 — Emergencia y PDF**

- Configuración y generación del paquete cifrado offline, actualización transaccional y prueba en modo avión.
- Exportación PDF selectiva en español con índice, evidencias, estados de verificación y anexos.
- Enlaces temporales revocables para exportaciones.
- Criterio de salida: paquete anterior sobrevive a actualización fallida; PDF no adopta apariencia ni lenguaje de documento oficial.

**Fase 3 — OCR documental**

- Cartilla, factura, receta, informe y analítica mediante esquemas separados.
- Revisión campo a campo, evidencia, confianza, prevención de duplicados y vínculo documento-evento.
- Retención/borrado independiente de originales y datos estructurados.
- Criterio de salida: corpus anonimizado español, cero campos críticos aceptados sin confirmación y ninguna factura genera diagnóstico.

**Fase 4 — Compartición temporal y cuidadores**

- QR por finalidad, ámbitos, expiración/usos, revocación, logs y notificaciones.
- Vista sin cuenta de solo lectura y escritura reforzada para observaciones/administraciones.
- Roles temporales por mascota y pruebas contra escalada de permisos.
- Criterio de salida: tokens caducados/revocados dejan de funcionar inmediatamente; cada acceso y escritura queda correlacionado.

**Fase 5 — Planes de cuidado**

- Plantillas versionadas para perros y gatos por etapa de vida, tareas aceptables y sustitución por indicación veterinaria.
- Calendario consolidado y alertas con fuente de cada fecha.
- Revisión especializada del contenido y guardrails ante síntomas/solicitudes clínicas.
- Criterio de salida: ninguna regla diagnostica, prescribe o calcula dosis; actualizaciones editoriales no cambian tareas aceptadas sin consentimiento.

**Fase 6 — Gastos e integración financiera**

- Gastos, justificantes, conciliación y filtros por mascota/evento.
- Consentimiento granular, outbox y eventos idempotentes hacia Control de Gastos Personal.
- Reintentos, eventos fuera de orden, actualización y revocación.
- Criterio de salida: el payload económico no permite inferir mascota ni condición clínica y no crea duplicados en destino.

**Fase 7 — Endurecimiento y producción**

- Seguridad de archivos, antivirus, límites MIME/tamaño, rate limiting, sesiones, cifrado y rotación de claves.
- Copias cifradas, restauración probada, exportación/borrado, accesibilidad y rendimiento plurianual.
- QA exhaustivo funcional, offline, concurrencia, OCR, permisos, QR, privacidad y compatibilidad PWA.
- Revisión final legal/veterinaria de textos, planes y exportaciones para impedir que el producto se presente como diagnóstico, receta, historia clínica oficial o pasaporte oficial.
