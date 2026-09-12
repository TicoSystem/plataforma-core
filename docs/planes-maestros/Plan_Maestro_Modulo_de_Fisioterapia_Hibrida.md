## 1. Propósito y usuario objetivo

**Módulo de Fisioterapia Híbrida** prolongará en el domicilio un tratamiento definido presencialmente por un fisioterapeuta, preservando la pauta exacta, recogiendo la experiencia del paciente y preparando información útil para la siguiente consulta. La autoridad clínica será siempre el profesional responsable; la aplicación no diagnosticará, seleccionará ejercicios, calculará progresiones ni sustituirá una valoración presencial.

El producto se dirige a clínicas y fisioterapeutas españoles que prescriben ejercicio terapéutico domiciliario, y a pacientes adultos que necesitan instrucciones claras, seguimiento asincrónico y continuidad entre visitas. El MVP priorizará tratamientos musculoesqueléticos ambulatorios; quedarán fuera rehabilitación posquirúrgica de alto riesgo, neurología compleja, pediatría y monitorización urgente hasta disponer de protocolos, validación y alcance regulatorio específicos.

Decisiones de alcance:

- Un paciente solo ejecutará planes publicados por un profesional habilitado en su centro. La biblioteca de ejercicios sirve al fisioterapeuta; no será un catálogo de autoprescripción.
- Cada publicación congelará ejercicios, orden, dosis, descansos, frecuencia, precauciones y criterios de detención. Editar un tratamiento creará una versión nueva con fecha de vigencia.
- Dolor antes/después, dificultad, adherencia y comentarios son datos declarados por el paciente, no mediciones diagnósticas.
- Las alertas clasificarán respuestas según reglas configuradas y aprobadas por el centro. No emitirán diagnósticos ni garantizarán atención inmediata; cada centro deberá informar horario, canal alternativo y tiempo de respuesta esperado.
- Ante una señal configurada como urgente, la app detendrá la sesión, mostrará instrucciones preaprobadas por el centro y ofrecerá contacto. No generará instrucciones clínicas nuevas.
- El modo offline incluirá plan vigente, vídeos, textos, accesibilidad, sesión en curso y registro local. La sincronización posterior conservará el orden y la hora real de cada respuesta.
- Los resúmenes automáticos serán deterministas y trazables a sesiones, escalas y mensajes. Cualquier narrativa generada será borrador revisable, nunca incorporada a la historia o exportación clínica sin validación profesional.
- El posicionamiento y la finalidad prevista deberán revisarse antes de lanzamiento y ante cada ampliación funcional para evitar una deriva inadvertida hacia software de diagnóstico o decisión clínica automatizada.

## 2. Dominios de backend

**Organizaciones, centros e identidad profesional**

- Organización sanitaria como tenant raíz, con centros, profesionales, personal administrativo y pacientes.
- Roles `organization_owner`, `clinical_admin`, `physiotherapist`, `assistant` y `patient`; permisos por centro, relación asistencial y plan.
- Verificación documental/administrativa del profesional y número de colegiación declarado, con estado y fecha; la plataforma no inferirá habilitación solo desde el correo.
- Separación entre identidad, datos clínicos y facturación del centro; autorización obligatoria por relación profesional-paciente activa.

**Pacientes, episodios y equipo asistencial**

- Perfil mínimo con datos de contacto, zona horaria, idioma, preferencias de accesibilidad y contacto autorizado.
- Episodio de tratamiento con motivo descrito por el profesional, lateralidad/localización estructurada, fecha de inicio, estado, objetivos clínicos textuales y profesional responsable.
- Miembros del equipo con periodo y capacidades; finalizar la relación revoca acceso futuro sin borrar autoría histórica.
- La app no construirá un diagnóstico desde síntomas; códigos o diagnósticos solo se almacenarán si los introduce el profesional.

**Biblioteca de ejercicios**

- Ejercicio clínico versionado con nombre, objetivo explicado al paciente, instrucciones, vídeo, imagen, errores frecuentes, precauciones y criterios de detención.
- Variantes diferenciadas, no parámetros libres ambiguos: posición, apoyo, resistencia, rango o lado deben formar parte de la prescripción.
- Contenido global curado y contenido privado del centro; estados `draft`, `clinical_review`, `approved`, `retired` y `superseded`.
- Un ejercicio retirado no desaparece de planes históricos, pero no puede incorporarse a nuevas versiones.
- Medios con transcripción, subtítulos, audio descriptivo cuando proceda y demostración alternativa para limitaciones visuales o auditivas.

**Planes prescritos y versionado**

- Plan asociado a paciente, episodio y prescriptor, con vigencia, frecuencia semanal, días preferidos y estado `draft`, `published`, `paused`, `completed` o `cancelled`.
- Versión inmutable con firma lógica del profesional, motivo de cambio, fecha efectiva y mensaje de transición para el paciente.
- Ítems ordenados con ejercicio/version, series, repeticiones o duración, descanso, lado, resistencia, tempo, instrucciones personalizadas y regla de progresión exclusivamente profesional.
- La nueva versión no altera sesiones iniciadas; el paciente termina con la versión congelada o acepta reiniciar según política del profesional.
- Publicar exige validar que todos los medios estén disponibles offline, las dosis tengan unidad y existan criterios de detención cuando sean necesarios.

**Sesión domiciliaria**

- Instancia de sesión creada desde una versión exacta del plan, con cola de ejercicios y snapshots de prescripción.
- Máquina de estados `not_started`, `in_progress`, `paused`, `awaiting_feedback`, `completed`, `aborted` o `superseded`.
- Check-in previo obligatorio configurable: dolor, cambios desde la última sesión y preguntas de seguridad aprobadas.
- Registro por ejercicio de series/repeticiones/segundos prescritos y realizados, pausas, omisiones, dificultad y observación.
- Check-out con dolor posterior, esfuerzo global, confianza y comentario; los campos clínicos usan escalas versionadas y etiquetas completas.
- Persistencia después de cada acción, `current_step`, cronómetro monotónico local y recuperación tras cierre, cambio de aplicación o reinicio.

**Dolor, dificultad y medidas reportadas**

- Escalas independientes para intensidad de dolor, dificultad y esfuerzo; no se reutilizará un valor 0–10 sin guardar escala, anclajes y contexto.
- Localización, temporalidad y cualidad opcionales como datos reportados, con valores controlados más texto libre.
- Valor previo/posterior enlazado a sesión; dolor durante ejercicio enlazado al ítem y momento exacto.
- El sistema conserva valor original, zona horaria, versión de escala y autor; correcciones no eliminan el registro previo.

**Reglas de seguridad y alertas**

- Motor determinista versionado por centro para cambios de dolor, respuesta positiva a preguntas de seguridad, interrupción repetida, empeoramiento sostenido o texto marcado manualmente.
- Cada regla define entradas, umbral, severidad, acción visible al paciente, destinatarios, plazo interno y si bloquea la sesión.
- Estados `triggered`, `acknowledged`, `triaged`, `resolved`, `false_positive` y `expired`; toda transición registra actor y nota.
- Una alerta no se cierra porque llegue una nueva sesión normal. Requiere acción profesional o regla explícita de cierre aprobada.
- Mensajes críticos usan contenido preaprobado y canales redundantes configurables; se muestra siempre que no es un servicio de emergencias.
- El texto libre no activa decisiones clínicas automatizadas en el MVP; puede marcarse para revisión por reglas no semánticas o por el paciente.

**Adherencia**

- Distingue sesión programada, iniciada, completada, parcialmente completada, omitida con motivo y no registrada.
- Porcentaje calculado con denominador visible; una pausa clínica o cambio de plan no cuenta como incumplimiento.
- Adherencia por sesión, ejercicio y periodo, con huecos explícitos y zona horaria del paciente.
- No se usarán rachas, castigos, rankings ni lenguaje moralizante; el fisioterapeuta puede ajustar la carga según conversación clínica, no por automatismo.

**Feedback asíncrono**

- Hilo vinculado a episodio, plan, sesión, ejercicio o alerta; mensajes con autor, visibilidad, estado y adjuntos.
- Tipos profesionales `clarification`, `encouragement`, `technique_note`, `plan_change_required` y `safety_instruction` para separar comentario de prescripción.
- Un mensaje no modifica dosis. `plan_change_required` abre un flujo de nueva versión que el profesional debe publicar.
- Confirmación de lectura y recordatorio interno sin prometer respuesta instantánea.
- Vídeo/foto del paciente opcional, con consentimiento específico, retención corta y prohibición de reutilización para entrenamiento sin consentimiento independiente.

**Resumen previo a consulta**

- Ventana configurable desde la última visita o fechas seleccionadas.
- Agregados: sesiones previstas/realizadas, ejercicios omitidos, dolor previo/posterior, dificultad, alertas, cambios de plan y mensajes sin resolver.
- Línea de tendencias con valores y contexto, evitando inferencias de causa o evolución clínica automática.
- Cada frase o cifra enlaza con registros fuente; datos faltantes aparecen como “no registrados”, nunca como cero.
- Borrador generado al aproximarse la cita y regenerable; el profesional puede validar, editar o descartar antes de incorporarlo a una exportación.

**Consentimiento y finalidad**

- Consentimientos separados para tratamiento asistencial de datos, comunicaciones, medios aportados, acceso de cuidadores, investigación/analítica y exportación.
- Documento versionado con finalidad, responsable, alcance, conservación, destinatarios, fecha, evidencia de aceptación y revocación.
- Revocar un uso opcional detiene futuros tratamientos de esa finalidad sin alterar obligaciones de conservación aplicables al centro.
- Consentimiento informado del tratamiento clínico aportado por el centro se almacena como documento relacionado, diferenciado del consentimiento de privacidad/plataforma.

**Exportación clínica**

- PDF y paquete estructurado por episodio con plan/versiones, sesiones, resultados reportados, alertas, feedback y resumen validado.
- Alcance, periodo, autor, zona horaria, unidades, versiones de escalas y procedencia en portada/metadata.
- Exportación firmada lógicamente con hash e índice de anexos; no sustituye la firma clínica requerida por el centro.
- Descarga privada o enlace temporal revocable; auditoría de solicitante, finalidad y destinatario.
- Modelo interno preparado para adaptadores de interoperabilidad futuros, sin declarar compatibilidad FHIR hasta implementar perfiles y validación reales.

**Offline y sincronización**

- IndexedDB cifrada cuando la plataforma lo permita, con plan vigente, snapshots, vídeos descargados, escalas, mensajes críticos y sesión activa.
- UUID por operación, cola append-only, cursor incremental, claves idempotentes y reloj del dispositivo acompañado por hora de recepción del servidor.
- Respuestas de sesión como eventos inmutables; ediciones clínicas, planes, reglas y consentimientos usan versión optimista.
- Si llega una nueva versión mientras hay una sesión offline, el servidor acepta los datos contra la versión iniciada y marca la transición pendiente.
- Conflicto explícito para planes, alertas, consentimientos y mensajes clínicos; nunca “última escritura gana”.
- Manifiesto con hashes verifica que todos los vídeos y textos necesarios estén disponibles antes de declarar una sesión lista offline.

**Seguridad, auditoría y observabilidad**

- Cifrado en tránsito y reposo, separación tenant, MFA obligatorio para profesionales, sesiones revocables y acceso de soporte excepcional/auditado.
- Archivos privados, validación MIME, límites, análisis antimalware, URLs temporales y metadatos clínicos excluidos de nombres públicos.
- Auditoría inmutable de lectura clínica sensible, prescripción, publicación, alertas, feedback, consentimiento y exportación.
- Logs y telemetría sin dolor, diagnóstico, texto, vídeo ni identificadores directos; correlación mediante IDs opacos.
- Evaluación regulatoria, de riesgos y de privacidad antes del piloto y cada vez que cambie la finalidad prevista o se añada automatización clínica.

## 3. Módulos de frontend

**Inicio del paciente**

- Próxima sesión, plan vigente, mensajes pendientes y estado offline con una acción principal única.
- Texto grande, contraste alto, objetivos táctiles amplios y navegación lineal; sin depender de gestos, color o memoria de menús.
- Opción de cuidador autorizada con interfaz simplificada y atribución de quién registró cada dato.

**Sesión guiada**

- Check-in previo, ejercicio actual, vídeo corto, dosis, descanso y criterio de detención siempre accesible.
- Controles visibles `anterior`, `pausar`, `continuar`, `omitir` y `finalizar`; bloqueo de suspensión de pantalla cuando el navegador lo permita.
- Persistencia local tras cada respuesta y restauración exacta de ejercicio, serie, repetición/tiempo y pausa.
- Cambio de app, llamada o pérdida de red no reinician cronómetros ni marcan automáticamente el ejercicio como completado.

**Registro de respuesta**

- Escalas con texto completo en ambos extremos, alternativa numérica y lectura por tecnologías de asistencia.
- Dolor antes, durante y después separado de esfuerzo/dificultad.
- Omitir exige motivo breve opcional/configurable, sin castigo en interfaz.
- Ante umbral de seguridad, se detiene el flujo y se muestra el mensaje preaprobado con contacto del centro.

**Plan y ejercicios**

- Calendario, versión vigente, prescriptor, fecha de publicación y cambios frente a la versión anterior.
- Ficha de ejercicio con vídeo descargado, transcripción, pasos, precauciones, dosis y personalización prescrita.
- El paciente puede confirmar lectura o preguntar; no puede alterar dosis ni activar ejercicios archivados.

**Mensajes**

- Bandeja por episodio con contexto visible de sesión/ejercicio/alerta.
- Adjuntar foto o vídeo solo tras recordatorio de privacidad y consentimiento vigente.
- Diferenciación visual entre explicación, mensaje de ánimo, instrucción de seguridad y cambio pendiente de plan.
- Horario y tiempo de respuesta esperado del centro visibles junto al compositor.

**Progreso**

- Sesiones previstas/realizadas, adherencia con denominador, dolor previo/posterior y dificultad por periodo.
- Valores faltantes diferenciados de cero y cambios de plan señalados en gráficas.
- Sin diagnóstico, predicción de recuperación, ranking ni promesa de resultado.

**Panel profesional**

- Lista de pacientes priorizada por alertas sin resolver, próxima consulta, plan pendiente y ausencia de registros.
- Ficha longitudinal con episodio, plan/versiones, sesiones, dolor, adherencia, alertas y feedback.
- Filtros configurables sin convertir un umbral en diagnóstico.
- Acceso rápido a revisar alerta, responder, generar nueva versión y preparar consulta.

**Editor de plan**

- Biblioteca aprobada, búsqueda por objetivo/posición/material y vista previa de accesibilidad.
- Constructor por días con orden, series, repeticiones/tiempo, descanso, lado, resistencia, instrucciones y criterios de detención.
- Validación de campos clínicos, comparación de versiones y fecha efectiva antes de publicar.
- Simulación exacta de lo que verá el paciente, incluido contenido offline.

**Alertas**

- Bandeja por severidad y antigüedad con regla, entradas causantes, plan/sesión y plazo interno.
- Acciones reconocer, clasificar, responder, cambiar plan, resolver o falso positivo con nota.
- Escalado interno configurable si vence el plazo; nunca cierre automático por silencio.

**Resumen de consulta**

- Periodo, cobertura de datos, agregados y eventos relevantes con enlaces a fuente.
- Borrador editable con diferencias entre texto automático y validación profesional.
- Congelación de versión al validar y opción de incluirla en exportación.

**Administración clínica**

- Centros, profesionales, verificación, biblioteca privada, escalas, reglas de seguridad, horarios y canales alternativos.
- Consentimientos y textos versionados; publicación con doble revisión para reglas/mensajes críticos.
- Auditoría, exportaciones y acceso excepcional de soporte.

**Ajustes, accesibilidad y sincronización**

- Tamaño de texto, contraste, reducción de movimiento, subtítulos, audio, velocidad de vídeo y modo cuidador.
- Descargas offline con tamaño, versión, fecha y comprobación de integridad.
- Centro de sincronización con última conexión, operaciones pendientes, errores y conflictos comprensibles.

## 4. Modelo de datos inicial

Las claves primarias serán UUID/ULID generables offline. Las medidas conservarán unidad, escala, contexto y versión. Las entidades clínicas editables incluirán `organization_id`, `created_at`, `updated_at`, `deleted_at` y `lock_version`; los eventos de sesión serán append-only.

| Entidad | Campos específicos iniciales | Restricciones y relaciones |
| --- | --- | --- |
| `organizations` | `name`, `tax_id`, `timezone`, `clinical_response_policy_json`, `status` | Tenant raíz; política de respuesta obligatoria antes del piloto. |
| `clinics` | `organization_id`, `name`, `address`, `phone`, `timezone`, `emergency_copy_version` | Centro operativo; texto crítico versionado. |
| `users` | `email`, `name`, `locale`, `timezone`, `mfa_status` | Identidad global; MFA exigida por rol profesional. |
| `organization_members` | `organization_id`, `user_id`, `clinic_id`, `role`, `verification_status`, `professional_identifier`, `status` | Único por organización/usuario/centro/rol. |
| `patients` | `organization_id`, `user_id`, `clinical_record_ref`, `accessibility_profile_json`, `status` | Referencia clínica interna, no diagnóstico. |
| `care_relationships` | `patient_id`, `professional_member_id`, `role`, `starts_at`, `ends_at`, `capabilities_json` | Autoriza acceso durante el periodo. |
| `treatment_episodes` | `patient_id`, `clinic_id`, `responsible_professional_id`, `reason_text`, `clinical_codes_json`, `body_region`, `laterality`, `goals_text`, `started_on`, `ended_on`, `status` | Códigos solo introducidos por profesional. |
| `exercise_definitions` | `organization_id`, `owner_scope`, `name`, `category`, `current_version_id`, `status` | Global curado o privado de organización. |
| `exercise_versions` | `exercise_id`, `version`, `instructions_json`, `common_errors_json`, `precautions_json`, `stop_criteria_json`, `media_manifest_id`, `reviewed_by`, `approved_at` | Inmutable tras aprobación/uso. |
| `media_assets` | `organization_id`, `storage_key`, `mime_type`, `sha256`, `size_bytes`, `duration_ms`, `width`, `height`, `transcript`, `captions_asset_id`, `retention_until` | Privado y verificable por hash. |
| `media_manifests` | `version`, `assets_json`, `manifest_hash`, `created_at` | Declara recursos offline completos. |
| `treatment_plans` | `episode_id`, `prescriber_id`, `status`, `current_version_id`, `starts_on`, `ends_on`, `timezone` | Solo profesional autorizado publica. |
| `treatment_plan_versions` | `treatment_plan_id`, `version`, `effective_from`, `frequency_rule_json`, `change_reason`, `patient_transition_copy`, `published_by`, `published_at`, `content_hash` | Inmutable; firma lógica por hash/actor. |
| `plan_items` | `plan_version_id`, `exercise_version_id`, `day_pattern_json`, `sort_order`, `sets`, `repetitions`, `duration_seconds`, `rest_seconds`, `side`, `resistance_text`, `tempo_text`, `custom_instructions`, `stop_criteria_override_json` | Dosis estructurada; orden único por versión/día. |
| `session_instances` | `patient_id`, `treatment_plan_id`, `plan_version_id`, `scheduled_for`, `started_at`, `ended_at`, `status`, `current_step`, `device_id`, `operation_uuid` | UUID única; versión congelada al iniciar. |
| `session_item_snapshots` | `session_id`, `plan_item_id`, `position`, `prescription_snapshot_json`, `exercise_snapshot_json` | Garantiza continuidad aunque cambie el plan. |
| `session_events` | `session_id`, `session_item_id`, `event_type`, `occurred_at_device`, `received_at_server`, `payload_json`, `operation_uuid`, `supersedes_event_id` | Append-only; UUID única. |
| `reported_outcomes` | `session_id`, `session_item_id`, `scale_version_id`, `context`, `value`, `body_location`, `quality_codes_json`, `notes`, `recorded_at`, `recorded_by` | Contextos pre/during/post separados. |
| `outcome_scales` | `organization_id`, `code`, `version`, `name`, `min_value`, `max_value`, `anchors_json`, `status`, `reviewed_by` | La escala/version acompaña siempre al valor. |
| `safety_rule_sets` | `organization_id`, `clinic_id`, `name`, `version`, `status`, `effective_from`, `approved_by` | Solo una versión activa por ámbito. |
| `safety_rules` | `rule_set_id`, `code`, `input_definitions_json`, `condition_json`, `severity`, `patient_action_copy_key`, `recipient_policy_json`, `response_due_seconds`, `blocks_session` | Motor determinista, sin diagnóstico textual. |
| `clinical_alerts` | `patient_id`, `episode_id`, `session_id`, `rule_id`, `severity`, `trigger_inputs_json`, `status`, `triggered_at`, `response_due_at`, `assigned_to` | No se cierra por nueva sesión normal. |
| `alert_actions` | `alert_id`, `actor_id`, `action`, `notes`, `occurred_at` | Historial inmutable de triaje/resolución. |
| `message_threads` | `episode_id`, `patient_id`, `context_type`, `context_id`, `status` | Contexto obligatorio. |
| `messages` | `thread_id`, `sender_id`, `message_type`, `body`, `media_asset_id`, `visibility`, `sent_at`, `read_at` | `plan_change_required` no modifica el plan. |
| `adherence_projections` | `patient_id`, `plan_version_id`, `period_start`, `period_end`, `scheduled_count`, `completed_count`, `partial_count`, `paused_count`, `calculation_version` | Reconstruible desde agenda/sesiones. |
| `appointments` | `patient_id`, `clinic_id`, `professional_id`, `starts_at`, `external_reference`, `status` | Activa generación previa del resumen. |
| `consultation_summaries` | `patient_id`, `episode_id`, `appointment_id`, `period_start`, `period_end`, `generator_version`, `source_cursor`, `coverage_json`, `structured_summary_json`, `draft_text`, `validated_text`, `status`, `validated_by`, `validated_at` | Solo `validated_text` entra en exportación clínica. |
| `consent_documents` | `organization_id`, `purpose`, `version`, `content_hash`, `content_asset_id`, `effective_from`, `status` | Finalidades separadas. |
| `consent_records` | `patient_id`, `consent_document_id`, `scope_json`, `granted_at`, `revoked_at`, `evidence_json` | Conserva documento/version exactos. |
| `clinical_exports` | `organization_id`, `patient_id`, `episode_id`, `requested_by`, `purpose`, `scope_json`, `format`, `storage_key`, `content_hash`, `expires_at`, `revoked_at`, `status` | Privado, temporal y auditado. |
| `download_manifests` | `patient_id`, `plan_version_id`, `manifest_hash`, `downloaded_at`, `verified_at`, `device_id` | Confirma sesión disponible offline. |
| `sync_operations` | `organization_id`, `user_id`, `device_id`, `operation_uuid`, `entity_type`, `entity_id`, `action`, `payload_json`, `base_version`, `status`, `conflict_json` | Idempotente; eventos de sesión append-only. |
| `audit_logs` | `organization_id`, `actor_id`, `action`, `subject_type`, `subject_id`, `origin`, `occurred_at`, `metadata_json` | Inmutable; metadata minimizada y sin contenido clínico libre. |

Planes, ejercicios aprobados, escalas, reglas y consentimientos se referencian por versión exacta. Sesiones y alertas son la fuente de verdad; adherencia, paneles y resúmenes son proyecciones reconstruibles con cobertura y cursor de origen.

## 5. Diferenciador frente a competencia

- **Prescripción cerrada y versionada:** el paciente ve exactamente qué publicó su fisioterapeuta; ningún algoritmo añade, elimina o progresa ejercicios.
- **Continuidad offline real:** plan, vídeos, escalas y sesión se descargan con manifiesto; cambiar de app o perder red conserva el ejercicio, la serie y el cronómetro.
- **Dolor y dificultad no se mezclan:** cada respuesta conserva escala, anclajes, momento y contexto para evitar gráficos clínicamente ambiguos.
- **Alertas gobernadas por el centro:** reglas, severidad, texto, destinatario y plazo son versionados y auditables; la app prioriza, pero no diagnostica.
- **Feedback que no altera silenciosamente la pauta:** un comentario profesional puede explicar o solicitar cambio, pero la dosis solo cambia al publicar una versión.
- **Resumen trazable previo a consulta:** cada cifra y frase enlaza a sesiones, alertas o mensajes; datos ausentes se muestran como ausentes y la narrativa requiere validación.
- **Accesibilidad operativa:** interfaz lineal, controles grandes, contenido audiovisual alternativo y modo cuidador forman parte de la sesión, no una capa posterior.
- **Privacidad clínica desde el modelo:** relación asistencial, consentimiento por finalidad, lectura sensible auditada, medios temporales y telemetría sin contenido son requisitos base.

## 6. Fases del roadmap

**Fase 0 — Finalidad prevista, riesgos e invariantes**

- Documentar finalidad de continuidad terapéutica, usuarios, exclusiones, claims permitidos y acciones que siguen reservadas al profesional.
- Realizar evaluación regulatoria de software sanitario, evaluación de impacto de privacidad y análisis de riesgos antes de fijar el MVP.
- Definir versionado de ejercicios/planes/escalas/reglas, máquina de estados de sesión y contrato de eventos offline.
- Acordar con centros piloto severidades, mensajes, horario, SLA interno y canal alternativo de urgencia.
- Preparar observabilidad aislada para Laravel, Vue/PWA, PHP-FPM, colas, Redis, base de datos, vídeo, alertas, errores y latencia sin payloads clínicos.

**Fase 1 — Prescripción y sesión offline**

- Organización, profesionales, pacientes, episodios, biblioteca aprobada y planes versionados.
- PWA con descarga verificada, vídeo, sesión persistente, pausa/reanudación y eventos append-only.
- Check-in/out, dolor, dificultad, adherencia y sincronización idempotente.
- Criterio de salida: completar una sesión en modo avión, interrumpirla varias veces y reconstruirla exactamente sin perder ni duplicar respuestas.

**Fase 2 — Panel profesional y feedback**

- Línea longitudinal, adherencia, resultados reportados y mensajes contextuales.
- Flujo `plan_change_required` hacia nueva versión, comparación y publicación.
- Roles, relaciones asistenciales, MFA y auditoría de lectura/escritura.
- Criterio de salida: ningún mensaje modifica dosis; finalizar una relación revoca acceso y conserva autoría.

**Fase 3 — Seguridad clínica y alertas**

- Motor determinista, reglas versionadas, detención de sesión, bandeja, asignación y escalado interno.
- Contenido crítico preaprobado y canales alternativos visibles.
- Simulador de reglas con casos históricos anonimizados antes de activarlas.
- Criterio de salida: pruebas de falsos positivos/negativos definidos por el centro, alertas nunca autocerradas por silencio y trazabilidad completa de cada disparo.

**Fase 4 — Resumen y consulta presencial**

- Citas, ventana de análisis, agregados, cobertura, borrador trazable y validación profesional.
- Gráficas con cambios de plan y valores faltantes explícitos.
- Exportación clínica PDF/estructurada con hash e índice.
- Criterio de salida: toda frase validable enlaza a datos fuente; contenido no revisado queda fuera de exportaciones clínicas definitivas.

**Fase 5 — Consentimiento y accesibilidad avanzada**

- Consentimientos por finalidad, revocación, medios del paciente, cuidador autorizado y retención.
- Pruebas con personas mayores: comprensión, tamaño táctil, lector de pantalla, contraste, subtítulos, velocidad y recuperación de sesión.
- Acceso de soporte excepcional con aprobación y auditoría.
- Criterio de salida: tareas críticas se completan con tecnologías de asistencia y los usos opcionales cesan al revocar consentimiento.

**Fase 6 — Piloto clínico controlado**

- Piloto con pocos centros, tratamientos musculoesqueléticos de bajo riesgo y profesionales formados.
- Monitorización de fallos de sesión, entrega de alertas, tiempos de respuesta, abandono y discrepancias de datos.
- Revisión conjunta de incidentes, lenguaje y carga asistencial antes de ampliar usuarios o patologías.
- Criterio de salida: riesgos residuales aceptados, restauración probada, soporte operativo y evidencia de que el flujo no induce decisiones clínicas autónomas.

**Fase 7 — Endurecimiento y producción**

- Seguridad de archivos, antimalware, rate limiting, cifrado/rotación, sesiones, copias y restauración.
- Rendimiento plurianual, accesibilidad, portabilidad, borrado y compatibilidad PWA en dispositivos objetivo.
- QA exhaustivo funcional, offline, concurrencia, planes, alertas, permisos, consentimiento, exportación y recuperación.
- Revisión regulatoria final de funcionalidad, materiales comerciales y finalidad prevista; cualquier futura recomendación o ajuste automático reabre la evaluación antes de desarrollarse.
