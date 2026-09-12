## 1. Propósito y usuario objetivo

**Diario de Sueño y Descanso** permitirá registrar el descanso sin sensores, reconocer patrones descriptivos y reproducir meditaciones breves adaptadas al contexto declarado por el usuario. La fuente de verdad será el autorregistro; la app no estimará fases de sueño, apnea, insomnio ni otros trastornos a partir de horarios o respuestas subjetivas.

El producto se dirige a adultos residentes en España que quieren observar su descanso sin comprar un wearable ni dormir con un dispositivo. También contempla madres con un bebé que, mediante consentimiento específico y si usan Diario de Lactancia y Crianza, desean visualizar si los despertares de cuidado coinciden temporalmente con interrupciones propias.

Decisiones de alcance:

- Registro, tendencia y orientación serán capas separadas. Una meditación propuesta nunca se guardará como hecho ni una correlación como explicación causal.
- El diario aceptará sueño principal, siestas y periodos partidos. No impondrá un modelo nocturno único ni asumirá que el día termina a medianoche.
- Calidad, descanso percibido, somnolencia y ánimo usarán escalas distintas, versionadas y con anclajes textuales; un “3” no será intercambiable entre ellas.
- Las duraciones se calcularán desde instantes con zona horaria y offset, conservando la hora local introducida. Cambios de hora, viajes y trabajo nocturno no se resolverán con una resta ingenua.
- El módulo adaptativo seleccionará estructura, duración, voz, ritmo y bloques editoriales aprobados mediante reglas visibles; no generará afirmaciones médicas ni técnicas respiratorias intensas.
- La explicación será concreta: “se propone una sesión de 5 minutos de descarga porque registraste una noche interrumpida y poco tiempo disponible”, sin afirmar por qué durmió mal.
- Las meditaciones no se recomendarán durante conducción, manejo de maquinaria ni situaciones que requieran atención. El usuario podrá desactivar voz, música, respiración guiada o adaptación.
- La exportación mostrará datos faltantes, correcciones y método de cálculo; se presentará como diario aportado por el usuario, no como estudio del sueño.
- La integración con Lactancia será opcional, revocable y de mínimo dato. Nunca importará contenido de tomas, notas del bebé o identidad infantil si bastan intervalos temporales pseudonimizados.

## 2. Dominios de backend

**Identidad, perfil y consentimiento**

- Perfil individual con zona horaria, horarios habituales opcionales, trabajo por turnos, preferencias de accesibilidad y módulos visibles.
- Consentimientos separados para datos de bienestar, adaptación de meditaciones, audio personalizado, exportación e integración con Lactancia.
- Modo `journal_only`, `journal_and_trends` o `adaptive_meditation`; cambiar de modo no elimina registros históricos.
- Contextos excluyentes declarados para orientación automatizada, sin almacenar diagnósticos salvo que el usuario los incluya voluntariamente en una exportación.

**Diario de sueño**

- Periodo de sueño con intención `main_sleep`, `nap` o `other`, hora de acostarse, intento de dormir, latencia estimada, despertares, despertar final y levantarse.
- Duraciones derivadas: tiempo en cama, sueño estimado, vigilia nocturna y eficiencia estimada; cada cifra conserva fórmula, entradas y versión.
- Registro parcial permitido. La ausencia de latencia o interrupciones produce métrica incompleta, no valor cero.
- Distinción entre “no hubo interrupciones” y “no las registré”.
- Correcciones mediante versiones/supersesión; el valor original y motivo permanecen auditables.
- Un día de diario se asigna al despertar final o a una política configurable, no al calendario de inicio de forma implícita.

**Interrupciones**

- Interrupción con inicio/fin o duración aproximada, causa seleccionada opcional, certeza temporal y nota.
- Causas como cuidado del bebé, ruido, temperatura, baño, dolor declarado, preocupación u otra se tratan como factores reportados, no como causas demostradas.
- Interrupciones solapadas se normalizan para calcular vigilia sin sumar minutos dos veces.
- Eventos importados de Lactancia pueden mostrarse como “coincidentes” sin convertirse automáticamente en interrupciones propias.

**Factores del día**

- Taxonomía versionada: cafeína, alcohol, ejercicio, siesta, pantallas, cena, estrés percibido, medicación declarada, enfermedad declarada, viaje, turno laboral, ambiente y otros.
- Cada factor tiene tipo de dato, unidad, momento, procedencia y visibilidad; no todo factor se reduce a sí/no.
- El usuario elige qué factores registrar y puede crear etiquetas privadas sin incorporarlas al catálogo global.
- Los factores alimentan filtros y comparaciones descriptivas solo con consentimiento para análisis.

**Escalas y autorreportes**

- Escalas independientes para calidad del sueño, descanso al despertar, somnolencia diurna, ánimo y tensión.
- Cada observación conserva `scale_version`, valor, anclaje mostrado, momento y contexto.
- Cambiar la redacción o rango crea nueva versión; las gráficas no mezclan escalas incompatibles sin transformación explícita.
- Las escalas son de seguimiento personal y no se presentan como cuestionarios diagnósticos validados salvo licencia, implementación y revisión específicas futuras.

**Motor de tendencias descriptivas**

- Ventanas de 7, 14, 30 y 90 días con mediana, rango, distribución y cobertura, evitando conclusiones a partir de una sola noche.
- Comparaciones “con factor/sin factor” muestran tamaño de muestra, periodo y diferencia observada; no usan lenguaje causal.
- Umbral mínimo configurable antes de mostrar asociación; con pocos datos se muestra “aún no hay registros suficientes”.
- Tendencias trazables a periodos confirmados y versiones de cálculo; exclusiones y noches parciales se hacen visibles.
- Detección de cambios descriptivos mediante reglas simples y versionadas, nunca etiquetas de enfermedad.

**Biblioteca de meditación**

- Bloques editoriales versionados: introducción, postura, atención corporal, respiración suave opcional, relajación, observación, intención diurna y cierre.
- Metadatos por bloque: momento `morning`/`night`/`any`, duración, objetivo de bienestar, intensidad, contraindicaciones editoriales, voz, idioma y compatibilidad de mezcla.
- Guiones y audio pasan por revisión editorial; un bloque retirado permanece en sesiones históricas pero deja de seleccionarse.
- Alternativas sin audio, sin música, sin respiración o con ojos abiertos para preferencias y accesibilidad.
- No se incluirán retenciones prolongadas de respiración, hiperventilación ni afirmaciones de curación.

**Composición adaptativa**

- Motor determinista que recibe datos confirmados de una ventana configurable, momento del día, minutos disponibles, preferencias, sesiones recientes y reglas de seguridad.
- Salida: plantilla, bloques/versiones, duración, parámetros de reproducción y explicación estructurada con los datos utilizados.
- La personalización nunca usa texto libre, medicación, enfermedad declarada o notas salvo consentimiento y una regla editorial explícita; en el MVP se excluyen.
- Diversificación controlada para no repetir exactamente la misma sesión, sin sacrificar reproducibilidad: la semilla y versión quedan registradas.
- Datos insuficientes producen una sesión general elegida por preferencias, identificada como no adaptada.
- Antes de reproducir, el usuario puede ver, cambiar duración, sustituir enfoque o elegir una sesión general.

**Generación y reproducción de audio**

- Audio pregrabado o compuesto a partir de bloques compatibles; síntesis dinámica solo con guiones cerrados y versionados.
- Normalización de volumen, fundidos, silencios y música mediante recetas deterministas.
- Manifiesto con hashes para descarga offline y reproducción sin cortes; la sesión completa se prepara antes de empezar.
- Velocidad, voz, música y volumen independientes; subtítulos/transcripción siempre disponibles.
- Caché con cuota y borrado; el audio generado no contiene nombre, notas ni otros datos personales.

**Sesiones de meditación**

- Sesión propuesta, iniciada, pausada, completada o abandonada con receta exacta de bloques.
- Check-in y check-out opcionales de tensión/estado, separados del diario de sueño.
- Pausas, saltos y finalización se registran sin interpretarlos como fracaso.
- La respuesta del usuario modifica preferencias y futuras selecciones, pero no reescribe la noche que originó la propuesta.

**Señales y límites de seguridad**

- Reglas editoriales para mostrar información de ayuda profesional cuando el usuario declara somnolencia intensa persistente, episodios preocupantes o deterioro mantenido; la app no nombra un diagnóstico.
- Mensajes preaprobados, neutrales y accionables, con servicios sanitarios generales; nunca sustituyen atención urgente.
- Una meditación puede omitirse si el usuario indica que está conduciendo, requiere mantenerse alerta o no se siente cómodo.
- No se enviarán notificaciones nocturnas que interrumpan el descanso; las franjas silenciosas serán obligatorias y configurables.

**Integración con Diario de Lactancia y Crianza**

- Consentimiento específico del adulto responsable y comprobación de autoridad sobre el perfil infantil en la aplicación origen.
- Outbox y eventos versionados con intervalos pseudonimizados de cuidado/despertar necesarios para la correlación; contenido de toma, alimentación, salud o notas queda excluido.
- Autoridad separada: Lactancia conserva eventos del bebé; Sueño conserva periodos del adulto. Ninguna app edita datos de la otra.
- Emparejamiento por solapamiento temporal y tolerancia configurable, mostrando coincidencia, no causalidad.
- Agregados solo tras un mínimo de noches y siempre con cobertura; no se comparan madres/personas ni bebés entre sí.
- Revocar elimina futuras importaciones y proyecciones derivadas regenerables, sujeto a la elección explícita sobre snapshots ya exportados.

**Exportación profesional**

- PDF y CSV por periodo con sueño principal/siestas, interrupciones, escalas, factores seleccionados, cobertura y tendencias.
- Sección opcional de coincidencias con cuidado del bebé, claramente rotulada como datos de dos fuentes y sin notas infantiles.
- Las meditaciones aparecen solo como intervención de bienestar realizada —tipo y duración— si el usuario las incluye.
- Vista previa y exclusión de factores, notas, integración o sesiones antes de generar.
- Enlace temporal revocable o archivo local; hash, fecha, zona horaria, método y versiones de cálculo.

**Offline, privacidad y auditoría**

- IndexedDB con diario, escalas, factores, tendencias recientes, biblioteca descargada, audio y cola de operaciones.
- UUID local, cursor incremental, idempotencia, eventos append-only y versión optimista.
- Registro y edición, tendencias locales, composición con reglas descargadas y reproducción disponibles sin conexión.
- Conflictos explícitos para periodos, escalas, consentimiento e integración; respuestas independientes pueden fusionarse si no alteran el mismo campo.
- Cifrado en tránsito/reposo, archivos privados, telemetría sin horarios exactos/notas y auditoría de consentimientos, exportaciones, integraciones y reglas.

## 3. Módulos de frontend

**Hoy**

- Registro pendiente de la última noche, tendencia breve, meditación propuesta y estado offline.
- Una acción principal según momento: completar diario por la mañana o iniciar cierre nocturno.
- Explicación visible de qué datos están confirmados, incompletos o aún no sincronizados.

**Registro rápido de sueño**

- Hora de acostarse, intento de dormir, latencia aproximada, despertares, despertar final, levantarse y siestas.
- Entrada relativa rápida —“me dormí unos 20 minutos después”— sin exigir precisión ficticia.
- Opciones diferenciadas “ninguna interrupción” y “no lo recuerdo/no lo registré”.
- Guardado local inmediato y edición de la noche en una sola pantalla.

**Interrupciones y factores**

- Línea temporal nocturna con solapamientos visibles y ajuste aproximado.
- Selector personalizable de factores del día con unidades adecuadas y recientes.
- Causas declaradas presentadas como contexto, no como explicación demostrada.

**Tendencias**

- Duración estimada, tiempo en cama, interrupciones, calidad y descanso con mediana, rango y cobertura.
- Comparación con/sin factor solo al superar el mínimo de datos; muestra noches incluidas y excluidas.
- Valores faltantes separados de cero y cambios de zona horaria/trabajo por turnos señalados.
- Sin semáforos morales, puntuación global de sueño ni etiquetas diagnósticas.

**Meditación adaptativa**

- Propuesta mañana/noche con duración 5, 10 o 15 minutos, enfoque y explicación “por qué esta sesión”.
- Desglose de datos usados y opción de excluir una noche/factor de la adaptación.
- Cambio de duración, voz, música, respiración o elección de sesión general antes de reproducir.
- Historial que conserva receta/versiones y valoración, no solo un título generado.

**Reproductor**

- Controles grandes, pausa, avance/retroceso, velocidad, música, volumen y transcripción.
- Persistencia del punto exacto al cambiar de aplicación o perder red.
- Aviso previo de no uso conduciendo y salida inmediata sin penalización.
- Estado de descarga e integridad del audio antes de comenzar.

**Biblioteca**

- Sesiones generales y adaptadas guardadas, filtrables por momento, duración, voz y preferencias.
- Descarga/borrado offline con tamaño y versión.
- Contenido retirado no aparece para nuevas sesiones, pero el historial conserva referencia y explicación.

**Correlación con Lactancia**

- Flujo de consentimiento que explica qué intervalos se importan, de quién son y qué queda excluido.
- Visualización superpuesta de interrupciones propias y eventos del bebé, con coincidencias y tolerancia.
- Cobertura, número de noches y aviso “coincidencia no implica causa” junto al resultado.
- Pausa, revocación y borrado de proyecciones derivadas desde la misma pantalla.

**Exportación**

- Selector de periodo, métricas, factores, notas, meditaciones y correlación.
- Previsualización del PDF/CSV y leyenda de escalas, datos faltantes, estimaciones y métodos.
- Enlace temporal revocable, historial y eliminación anticipada.

**Ajustes y privacidad**

- Zona horaria, trabajo por turnos, política de día, escalas, factores y modo de producto.
- Voz, música, respiración, adaptación, franjas silenciosas y almacenamiento offline.
- Consentimientos, integración, sesiones/dispositivos, exportación integral y eliminación.
- Centro de sincronización con última conexión, operaciones pendientes, errores y conflictos accionables.

## 4. Modelo de datos inicial

Las claves serán UUID/ULID generables offline. Los instantes conservarán UTC, zona IANA, offset y hora local introducida. Las métricas derivadas indicarán fórmula y versión; los eventos de diario y reproducción serán append-only o se corregirán mediante supersesión.

| Entidad | Campos específicos iniciales | Restricciones y relaciones |
| --- | --- | --- |
| `users` | `email`, `name`, `locale`, `timezone`, `product_mode` | Cuenta individual; zona IANA obligatoria para cálculos. |
| `wellness_profiles` | `user_id`, `shift_work_mode`, `day_assignment_policy`, `quiet_hours_json`, `accessibility_json` | Sin diagnóstico obligatorio. |
| `consent_documents` | `purpose`, `version`, `content_hash`, `effective_from`, `status` | Adaptación, integración y exportación separadas. |
| `consent_records` | `user_id`, `consent_document_id`, `scope_json`, `granted_at`, `revoked_at`, `evidence_json` | Conserva versión exacta. |
| `sleep_periods` | `user_id`, `type`, `bed_at`, `sleep_attempt_at`, `sleep_latency_minutes`, `final_wake_at`, `out_of_bed_at`, `assigned_local_date`, `timezone`, `offset_snapshot_json`, `completeness_status`, `source_type`, `supersedes_period_id` | Periodos válidos aunque crucen medianoche; no solapamiento sin advertencia. |
| `sleep_interruptions` | `sleep_period_id`, `started_at`, `ended_at`, `estimated_duration_minutes`, `time_precision`, `reported_factor_code`, `notes_encrypted`, `source_type`, `supersedes_interruption_id` | Duración o intervalo; solapamientos normalizados. |
| `factor_definitions` | `code`, `version`, `name`, `data_type`, `canonical_unit`, `allowed_values_json`, `status` | Catálogo versionado. |
| `daily_factor_entries` | `user_id`, `factor_definition_id`, `local_date`, `occurred_at`, `value_json`, `source_type`, `visibility` | Valor cero distinto de ausencia. |
| `outcome_scales` | `code`, `version`, `name`, `min_value`, `max_value`, `anchors_json`, `context`, `status` | Inmutable tras uso. |
| `reported_outcomes` | `user_id`, `sleep_period_id`, `meditation_session_id`, `scale_id`, `context`, `value`, `recorded_at` | Enlaza sueño o meditación según contexto. |
| `sleep_metric_runs` | `sleep_period_id`, `engine_version`, `inputs_json`, `formulae_json`, `result_json`, `coverage_json`, `calculated_at` | Reproducible; una versión activa por motor. |
| `trend_runs` | `user_id`, `period_start`, `period_end`, `engine_version`, `filters_json`, `source_cursor`, `coverage_json`, `results_json`, `generated_at` | Proyección reconstruible. |
| `meditation_blocks` | `code`, `type`, `language`, `current_version_id`, `status` | Unidad editorial reutilizable. |
| `meditation_block_versions` | `block_id`, `version`, `script_text`, `duration_seconds`, `timing_scope`, `wellness_focus`, `safety_metadata_json`, `voice_asset_id`, `reviewed_by`, `approved_at` | Inmutable tras aprobación. |
| `meditation_templates` | `code`, `version`, `duration_target_seconds`, `structure_json`, `compatibility_rules_json`, `status` | Define posiciones y bloques compatibles. |
| `adaptation_rule_sets` | `version`, `rules_json`, `excluded_inputs_json`, `approved_by`, `effective_from`, `status` | Determinista y versionado. |
| `meditation_proposals` | `user_id`, `local_date`, `time_scope`, `rule_set_id`, `template_id`, `input_snapshot_encrypted`, `reason_codes_json`, `explanation_params_json`, `seed`, `duration_seconds`, `status` | Una propuesta no altera el diario. |
| `meditation_recipes` | `proposal_id`, `version`, `ordered_blocks_json`, `mix_parameters_json`, `recipe_hash`, `audio_asset_id`, `generated_at` | Reproduce audio y explicación exactos. |
| `meditation_sessions` | `user_id`, `proposal_id`, `recipe_id`, `started_at`, `ended_at`, `position_ms`, `status`, `device_id`, `operation_uuid` | UUID única; persistencia de punto. |
| `meditation_session_events` | `session_id`, `type`, `position_ms`, `occurred_at_device`, `received_at_server`, `operation_uuid` | Append-only e idempotente. |
| `media_assets` | `storage_key`, `mime_type`, `sha256`, `size_bytes`, `duration_ms`, `language`, `transcript_asset_id`, `status` | Privado/licenciado y verificable. |
| `download_manifests` | `user_id`, `manifest_type`, `subject_id`, `version`, `assets_json`, `manifest_hash`, `downloaded_at`, `verified_at` | Confirma disponibilidad offline. |
| `wellness_safety_messages` | `code`, `version`, `trigger_rule_json`, `content_json`, `destination_type`, `reviewed_by`, `effective_from`, `status` | No contiene diagnóstico automático. |
| `integration_connections` | `user_id`, `source_app`, `status`, `contract_version`, `scope_json`, `authority_reference`, `last_cursor`, `revoked_at` | Consentimiento/autoridad obligatorios. |
| `external_care_intervals` | `connection_id`, `external_event_id`, `event_version`, `started_at`, `ended_at`, `time_precision`, `event_class`, `pseudonymous_subject_ref`, `received_at` | Sin contenido de lactancia ni identidad infantil directa. |
| `sleep_care_correlations` | `user_id`, `period_start`, `period_end`, `engine_version`, `tolerance_minutes`, `source_cursor`, `coverage_json`, `results_json`, `generated_at` | Proyección descriptiva y borrable. |
| `outbox_events` | `user_id`, `aggregate_type`, `aggregate_id`, `aggregate_version`, `event_type`, `schema_version`, `payload_json`, `occurred_at`, `published_at` | Para revocación/sincronización, sin notas. |
| `exports` | `user_id`, `format`, `period_start`, `period_end`, `scope_json`, `method_versions_json`, `storage_key`, `content_hash`, `expires_at`, `revoked_at`, `status` | Temporal, privado y regenerable. |
| `sync_operations` | `user_id`, `device_id`, `operation_uuid`, `entity_type`, `entity_id`, `action`, `payload_encrypted`, `base_version`, `status`, `conflict_encrypted` | Idempotente. |
| `audit_logs` | `user_id`, `actor_id`, `action`, `subject_type`, `subject_id`, `origin`, `occurred_at`, `metadata_json` | Inmutable y sin horarios/notas en claro. |

Los periodos, interrupciones, factores y autorreportes confirmados serán fuentes de verdad. Métricas, tendencias, propuestas, correlaciones y exportaciones serán proyecciones versionadas con cobertura y cursor de origen.

## 5. Diferenciador frente a competencia

- **Diario completo sin sensores:** sueño principal, siestas, periodos partidos, latencia e interrupciones se registran manualmente con precisión honesta.
- **Cálculos temporales correctos:** conserva zona, offset y hora local para tratar medianoche, viajes, turnos y cambios horarios sin inventar duraciones.
- **Adaptación explicable:** cada meditación muestra datos utilizados, regla, duración y bloques; el usuario puede excluir entradas o elegir una sesión general.
- **Audio reproducible, no consejo improvisado:** la sesión compone bloques revisados y versionados, evitando que un generador libre produzca afirmaciones clínicas.
- **Tendencias sin puntuación moral:** medianas, rangos, cobertura y muestras sustituyen semáforos, diagnósticos o una nota global de “buen sueño”.
- **Ausencia de dato tratada como ausencia:** “no recuerdo”, noche parcial y ninguna interrupción son estados distintos en cálculos y exportaciones.
- **Correlación familiar de mínimo dato:** superpone intervalos del bebé y del adulto con consentimiento/autoridad, sin importar el contenido de lactancia ni presentar causalidad.
- **Privacidad y portabilidad profesional:** telemetría sin horarios exactos, archivos temporales, selección previa y métodos visibles convierten la exportación en un diario revisable.

## 6. Fases del roadmap

**Fase 0 — Finalidad, escalas e invariantes temporales**

- Documentar alcance de bienestar, claims prohibidos, señales de derivación y revisión de finalidad prevista.
- Definir periodos, interrupciones, ausencia de datos, política de día, escalas y fórmulas versionadas.
- Diseñar protección de datos, consentimiento, offline, eventos append-only y borrado.
- Revisar guiones, reglas de adaptación y mensajes de seguridad con profesionales cualificados.
- Preparar observabilidad aislada para Laravel, Vue/PWA, PHP-FPM, colas, Redis, base de datos, audio, errores y latencia sin payloads sensibles.

**Fase 1 — Diario manual offline-first**

- Registro de sueño/siestas, interrupciones, escalas, factores y edición por supersesión.
- IndexedDB, cola idempotente, sincronización incremental y resolución de conflictos.
- Métricas explicables por noche y tendencias básicas con cobertura.
- Criterio de salida: registrar varias noches sin red y superar pruebas de medianoche, DST, viaje, turnos, solapamientos y datos parciales.

**Fase 2 — Biblioteca y reproductor**

- Bloques/plantillas revisados de 5, 10 y 15 minutos, audio, transcripción y preferencias.
- Descarga con manifiestos, reproducción offline y persistencia del punto.
- Historial y feedback separados del diario.
- Criterio de salida: una sesión iniciada sobrevive cambio de app, bloqueo y pérdida de red; todos los audios cumplen guion/hash/versiones.

**Fase 3 — Adaptación explicable**

- Reglas deterministas, snapshots de entrada, razones estructuradas, diversificación con semilla y fallback general.
- Pantalla “por qué”, exclusión de datos y controles de intensidad/formato.
- Guardrails de contexto, franjas silenciosas y mensajes de ayuda.
- Criterio de salida: toda propuesta se reproduce desde regla/datos; con entradas incompletas no se inventa explicación ni contenido clínico.

**Fase 4 — Exportación profesional**

- PDF/CSV selectivo con periodos, escalas, métricas, tendencias, cobertura y métodos.
- Vista previa, enlace revocable, hash e historial.
- Validación de legibilidad con profesionales sin presentar el archivo como prueba diagnóstica.
- Criterio de salida: cada cifra exportada enlaza a datos confirmados; exclusiones y datos faltantes se respetan automáticamente.

**Fase 5 — Integración con Lactancia**

- Consentimiento y autoridad, contrato versionado, intervalos mínimos, outbox y consumidor idempotente.
- Superposición temporal, tolerancia, cobertura y correlación descriptiva.
- Revocación y borrado de proyecciones derivadas.
- Criterio de salida: el payload no contiene tomas, salud, notas o identidad infantil; eventos fuera de orden/reintentos no duplican coincidencias.

**Fase 6 — Endurecimiento y producción**

- Seguridad de medios, cifrado, rate limiting, sesiones, copias, restauración, exportación y borrado.
- Accesibilidad, rendimiento plurianual, almacenamiento offline y compatibilidad PWA/audio.
- QA exhaustivo funcional, offline, concurrencia, temporalidad, adaptación, privacidad, exportación e integración.
- Revisión final de claims y finalidad; sensores, predicción, cribado o recomendaciones clínicas requerirán nueva evaluación antes de desarrollarse.
