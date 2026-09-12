## 1. Propósito y usuario objetivo

**Seguimiento de Ayuno Intermitente** permitirá registrar ventanas elegidas por el usuario y observar su constancia sin prescribir un patrón, evaluar resultados médicos ni convertir la alimentación en un sistema de recompensas. La app medirá lo que el usuario declara que hizo; no decidirá si debe ayunar, cuánto tiempo ni con qué frecuencia.

El producto se dirige a adultos en España que ya han decidido llevar un horario de ayuno/alimentación y buscan un temporizador privado, flexible y usable sin conexión. No se dirigirá a menores ni ofrecerá orientación automatizada en embarazo/lactancia, antecedentes o señales de trastorno de la conducta alimentaria, diabetes tratada, medicación dependiente de comidas u otros contextos que requieran criterio sanitario.

Decisiones de alcance:

- 16:8 y 18:6 se modelarán como ciclos diarios de dos ventanas; 5:2 como calendario semanal de días etiquetados. Un patrón personalizado podrá combinar ventanas y días, pero siempre mostrará su estructura real.
- Los presets son atajos de configuración, no recomendaciones. No se ordenarán por “eficacia” ni se sugerirá aumentar duración.
- Iniciar y finalizar serán acciones manuales. La llegada de una hora prevista no creará un ayuno real ni lo marcará como completado.
- Un ayuno finalizado antes de lo previsto puede registrarse como válido y conservar su duración; “no alcanzó el objetivo” no equivaldrá a fracaso.
- Peso y medidas serán módulos opcionales, ocultos por defecto durante el onboarding y sin atribuir cambios al ayuno.
- Las rachas serán desactivables. El modo silencioso ocultará cuenta atrás, rachas, peso, progreso porcentual, lenguaje restrictivo y notificaciones de “aguanta”; mantendrá únicamente controles neutrales de inicio/fin e historial si el usuario lo desea.
- La app no registrará alimentos, calorías, macros, recetas ni “alimentos permitidos”. No importará datos de Diario Fitness ni duplicará sus funciones.
- El funcionamiento offline incluirá configuración, temporizador, inicio/fin, notas, historial, medidas y recordatorios locales ya programados.

## 2. Dominios de backend

**Identidad, preferencias y límites**

- Perfil individual con zona horaria, idioma, inicio de semana, formato horario y preferencias de privacidad/accesibilidad.
- Modo de interfaz `standard`, `quiet` o `minimal`; la preferencia se sincroniza pero debe estar disponible antes de renderizar contenido sensible.
- Confirmación de mayoría de edad y aceptación versionada del alcance no médico; sin solicitar diagnósticos para utilizar el temporizador.
- Autodeclaraciones opcionales de contexto de exclusión se almacenan como banderas mínimas y no como historia clínica detallada.

**Patrones y reglas temporales**

- Plantilla `daily_window`, `weekly_days` o `custom_schedule` con nombre neutral y configuración visible.
- Versión inmutable de patrón con duración/horarios, días activos, zona horaria de referencia, política de viajes y fecha de vigencia.
- Cambiar un patrón crea versión futura y no altera ventanas ya iniciadas ni el historial.
- Para un ciclo diario se conservan duración de ayuno y alimentación; para 5:2 se conservan los días designados sin traducirlos falsamente a 16/8.
- Calendario previsto como proyección; sus ocurrencias nunca cuentan como sesiones completadas.

**Motor de ventanas**

- Máquina de estados `idle`, `fasting`, `eating_window`, `paused_tracking` y `closed` con una sola ventana activa por usuario.
- Evento de inicio congela versión del patrón, objetivo temporal opcional, instante UTC, hora local, zona IANA y offset.
- Evento de fin conserva instante real y motivo opcional; la duración se calcula desde instantes, no desde horas de pared.
- El cronómetro cliente deriva el tiempo desde timestamps persistidos y reloj monotónico cuando está abierto; no incrementa un contador vulnerable al cierre de la PWA.
- Cambios de hora, zona o reloj del dispositivo generan advertencia y conservan ambos valores; el servidor no reescribe la duración real sin confirmación.
- Inicio/fin duplicados son idempotentes por `operation_uuid`.

**Registro de experiencia**

- Check-out opcional con escala de experiencia general, dificultad percibida, energía percibida y nota libre.
- Escalas independientes, versionadas y con anclajes textuales; no se derivan diagnósticos ni recomendaciones.
- Motivos opcionales de finalización: planificado, horario cambiado, no me apetecía continuar, malestar declarado u otro.
- Si se declara malestar, se muestra un mensaje de seguridad preaprobado y la opción de detener; no se interpreta el síntoma ni se recomienda continuar.
- Notas quedan excluidas de analítica y telemetría; el usuario puede bloquearlas con autenticación local adicional.

**Finalización y cumplimiento**

- Resultado `completed_as_planned`, `completed_modified`, `ended_early`, `cancelled` o `unknown`; todos conservan duración real.
- “Completado” requiere inicio y fin confirmados. Una ocurrencia pasada sin registros queda `not_recorded`, no `failed`.
- Tolerancia configurable para horarios previstos, pero no para fabricar duración.
- Reabrir/corregir una sesión crea supersesión y recalcula proyecciones sin borrar eventos originales.
- Una sesión manual fuera del calendario puede contar en historial, pero solo entra en racha según regla visible elegida por el usuario.

**Rachas y progreso**

- Reglas de racha versionadas: por días previstos completados, por semanas con objetivo o por número de sesiones; el denominador se muestra.
- Días de descanso, pausa del patrón y sesiones no registradas se tratan según configuración, nunca como error implícito.
- La racha actual es una proyección reconstruible desde calendario y sesiones.
- Congelar/ocultar rachas no cambia datos y no genera comunicaciones de recuperación.
- Estadísticas limitadas a frecuencia, duración, distribución horaria y experiencia declarada; no se calcula “salud metabólica”, grasa quemada o fase fisiológica.

**Peso y medidas opcionales**

- Peso, cintura u otras medidas elegidas con fecha, unidad, fuente y nota.
- Sin objetivos automáticos, peso ideal, IMC interpretado, predicción ni atribución causal al patrón.
- Promedios/rangos opcionales para reducir énfasis en fluctuaciones diarias.
- Permisos de visualización separados para inicio, historial y exportación; modo silencioso los oculta sin borrar.
- Entrada manual únicamente en MVP; sin integración con básculas o Diario Fitness.

**Recordatorios**

- Avisos de inicio previsto, fin previsto, registro pendiente y resumen semanal, todos opt-in.
- Texto neutral: “Tu horario previsto comienza a las 20:00”, no “deja de comer” o “aguanta X horas”.
- Franjas silenciosas, días excluidos, anticipación y canal configurables.
- Recordatorio local programado cuando la plataforma lo permita y respaldo servidor opcional; deduplicación por ocurrencia/canal.
- Si cambia el patrón o la zona horaria, se cancelan/reprograman ocurrencias futuras con trazabilidad.

**Modo silencioso**

- Política central aplicada en servidor y cliente, no solo un tema visual.
- Oculta countdown/count-up prominente, porcentajes, rachas, comparaciones, peso, medidas, badges, frases de control y recordatorios restrictivos.
- Pantalla activa muestra estado neutral y botones `Finalizar registro`/`Registrar inicio`, con la hora accesible bajo acción deliberada.
- Exportaciones generadas en modo silencioso excluyen peso/rachas por defecto y requieren selección explícita.
- Pruebas automáticas de contenido impedirán que componentes nuevos introduzcan términos bloqueados en este modo.

**Seguridad de bienestar y contenido**

- Catálogo versionado de mensajes de alcance y ayuda, revisado por profesionales cualificados.
- No habrá artículos de beneficios, protocolos, progresión, suplementos, hidratación clínica ni recomendaciones para romper el ayuno en el MVP.
- Señales declaradas de malestar persistente o contexto excluido desactivan prompts de constancia/racha y muestran recomendación general de consultar a un profesional.
- La app no es un servicio de emergencias; los mensajes críticos no sustituyen atención inmediata.
- Cualquier futura recomendación personalizada obliga a revisar finalidad prevista, riesgos y alcance regulatorio antes de implementarla.

**Historial y exportación**

- Calendario y lista con sesiones reales, previstas no registradas, modificadas y canceladas diferenciadas.
- Exportación CSV/PDF por periodo con timestamps, zona, patrón/version, duración, resultado, escalas y medidas seleccionadas.
- Los presets se describen como configuración del usuario y no como tratamiento.
- Vista previa exacta y selección de notas/peso/medidas; enlace temporal revocable o descarga local.

**Offline, sincronización y privacidad**

- IndexedDB con patrón vigente, próximas ocurrencias, sesión activa, historial reciente, escalas, medidas y cola.
- Eventos de inicio/fin append-only, UUID, cursor incremental, idempotencia y versión optimista.
- Si dos dispositivos abren sesiones, el servidor conserva ambas operaciones como conflicto y exige elegir/corregir; no fusiona intervalos automáticamente.
- Cifrado en tránsito/reposo, notas protegidas, telemetría sin horarios exactos/medidas y auditoría de exportaciones/consentimientos.
- Borrado/exportación integral y retención diferenciada de logs, archivos y datos de usuario.

## 3. Módulos de frontend

**Inicio**

- Estado actual, próximo hito previsto y acciones iniciar/finalizar/corregir.
- En modo estándar, progreso temporal discreto; en modo silencioso, estado neutral sin porcentaje ni racha.
- Estado offline y hora de última sincronización sin bloquear el temporizador.

**Temporizador**

- Inicio manual, hora real, objetivo opcional y versión del patrón congelada.
- Persistencia al cerrar o cambiar de app; reconstrucción desde timestamp, no contador local acumulado.
- Fin anticipado permitido en una acción, sin confirmaciones culpabilizadoras.
- Corrección de hora separada de finalizar y siempre auditada.

**Configuración de patrón**

- Presets 16:8 y 18:6 como ventanas diarias; 5:2 como selector semanal; personalizado según tipo.
- Previsualización de siete días con zonas y cambios antes de activar.
- Selector de política de viaje: mantener hora local, mantener instantes o preguntar al cambiar zona.
- Texto explícito de que elegir un preset no es una recomendación.

**Cierre y nota**

- Resultado, experiencia, dificultad, energía y nota opcionales.
- Opción “prefiero no valorar” diferenciada de una puntuación neutra.
- Ante malestar declarado, salida rápida y mensaje preaprobado sin diagnóstico.

**Historial**

- Calendario/lista con real, previsto no registrado, modificado y cancelado.
- Filtros por patrón, duración y experiencia; navegación hasta eventos/correcciones.
- Racha opcional con explicación exacta de regla y días incluidos.

**Progreso**

- Frecuencia, duración mediana/rango y distribución de horarios.
- Experiencia declarada separada de duración; sin fases fisiológicas ni beneficios estimados.
- Cobertura visible para evitar interpretar huecos como sesiones fallidas.

**Peso y medidas**

- Módulo instalable/activable desde ajustes, no incluido en flujo principal.
- Registro, historial y tendencia neutral con promedios opcionales.
- Controles para ocultar del inicio, progreso y exportación; desaparece completamente en modo silencioso.

**Recordatorios**

- Canal, evento, anticipación, días y franjas silenciosas.
- Vista previa literal de cada mensaje para comprobar lenguaje neutral.
- Centro de estado con programado, enviado, fallido o desactivado.

**Modo silencioso**

- Activación inmediata con previsualización de elementos que desaparecerán.
- Preferencias independientes: ocultar temporizador, racha, peso, estadísticas, badges y avisos.
- Acceso deliberado al historial sin banners de reactivación.

**Exportación y privacidad**

- Periodo y campos seleccionables; peso, medidas y notas excluidos por defecto.
- Previsualización PDF/CSV, enlace temporal, revocación e historial.
- Cuenta, dispositivos, sesiones, consentimiento, exportación integral y eliminación.
- Centro de sincronización con operaciones pendientes y conflictos de sesiones concurrentes.

## 4. Modelo de datos inicial

Las claves serán UUID/ULID generables offline. Todos los eventos temporales conservarán UTC, zona IANA, offset y hora local. Las sesiones se reconstruirán desde eventos; rachas, estadísticas y calendario serán proyecciones versionadas.

| Entidad | Campos específicos iniciales | Restricciones y relaciones |
| --- | --- | --- |
| `users` | `email`, `name`, `locale`, `timezone`, `week_starts_on`, `age_eligibility_confirmed_at` | Cuenta individual adulta. |
| `user_preferences` | `user_id`, `interface_mode`, `time_format`, `travel_policy`, `privacy_json`, `accessibility_json` | Modo silencioso disponible antes del contenido. |
| `scope_acceptances` | `user_id`, `document_version`, `accepted_at`, `revoked_at`, `evidence_json` | Alcance de hábito, no consentimiento médico. |
| `safety_context_flags` | `user_id`, `flag_code`, `active`, `declared_at`, `cleared_at` | Banderas mínimas, sin historia clínica libre. |
| `fasting_patterns` | `user_id`, `name`, `type`, `current_version_id`, `status` | Daily, weekly o custom. |
| `fasting_pattern_versions` | `pattern_id`, `version`, `effective_from`, `timezone`, `schedule_json`, `goal_policy_json`, `travel_policy`, `created_at` | Inmutable tras activación. |
| `planned_windows` | `user_id`, `pattern_version_id`, `window_type`, `starts_at`, `ends_at`, `local_date`, `generation_key`, `status` | Proyección; `generation_key` única. |
| `tracking_sessions` | `user_id`, `pattern_version_id`, `planned_window_id`, `started_at`, `ended_at`, `start_timezone`, `end_timezone`, `start_offset`, `end_offset`, `target_ends_at`, `status`, `result`, `operation_group_id`, `supersedes_session_id` | Una activa por usuario salvo conflicto explícito. |
| `session_events` | `session_id`, `type`, `occurred_at_device`, `local_time`, `timezone`, `offset_minutes`, `received_at_server`, `payload_json`, `operation_uuid`, `supersedes_event_id` | Append-only; UUID única. |
| `experience_scales` | `code`, `version`, `name`, `min_value`, `max_value`, `anchors_json`, `status` | Dificultad, energía y experiencia separadas. |
| `session_reflections` | `session_id`, `scale_id`, `context`, `value`, `note_encrypted`, `recorded_at`, `declined` | Ausencia y rechazo explícito diferenciados. |
| `streak_rule_versions` | `user_id`, `version`, `rule_type`, `rule_json`, `effective_from`, `status` | Configuración visible e inmutable. |
| `streak_projections` | `user_id`, `rule_version_id`, `as_of_date`, `current_count`, `best_count`, `included_sessions_json`, `calculation_version` | Reconstruible y ocultable. |
| `body_measurements` | `user_id`, `type`, `measured_at`, `value`, `unit`, `source_type`, `note_encrypted` | Módulo opcional; sin objetivo implícito. |
| `notification_rules` | `user_id`, `event_type`, `channel`, `offset_minutes`, `days_json`, `quiet_hours_json`, `message_template_version`, `enabled` | Opt-in y lenguaje neutral. |
| `scheduled_notifications` | `notification_rule_id`, `planned_window_id`, `scheduled_for`, `dedupe_key`, `status`, `sent_at`, `failure_code` | Clave única por canal/ocurrencia. |
| `content_policies` | `interface_mode`, `version`, `hidden_components_json`, `blocked_copy_keys_json`, `effective_from` | Política central de modo silencioso. |
| `safety_messages` | `code`, `version`, `trigger_json`, `content_json`, `reviewed_by`, `effective_from`, `status` | Mensaje general, sin diagnóstico/protocolo. |
| `statistic_runs` | `user_id`, `period_start`, `period_end`, `engine_version`, `filters_json`, `source_cursor`, `coverage_json`, `results_json` | Proyección descriptiva. |
| `exports` | `user_id`, `format`, `period_start`, `period_end`, `scope_json`, `method_versions_json`, `storage_key`, `content_hash`, `expires_at`, `revoked_at`, `status` | Temporal y privado. |
| `sync_operations` | `user_id`, `device_id`, `operation_uuid`, `entity_type`, `entity_id`, `action`, `payload_encrypted`, `base_version`, `status`, `conflict_encrypted` | Idempotente; conflictos de sesión no se fusionan solos. |
| `audit_logs` | `user_id`, `actor_id`, `action`, `subject_type`, `subject_id`, `origin`, `occurred_at`, `metadata_json` | Sin notas, medidas u horarios exactos en claro. |

`session_events`, versiones de patrón, escalas y preferencias serán fuentes de verdad. Sesiones consolidadas, ventanas previstas, rachas, estadísticas y exportaciones serán reconstruibles y conservarán motor, cobertura y cursor de origen.

## 5. Diferenciador frente a competencia

- **Seguimiento sin prescripción:** los presets configuran un reloj; la app no recomienda empezar, intensificar ni mantener un ayuno.
- **Modelado temporal correcto:** 5:2 no se disfraza de ventana diaria y los cambios de hora/viaje conservan instante, zona y offset.
- **Finalizar sin castigo:** una sesión corta conserva valor histórico, no borra la racha mediante reglas ocultas ni activa mensajes de culpa.
- **Modo silencioso estructural:** elimina countdown, porcentajes, rachas, peso, badges y copy restrictivo en cliente, servidor, notificaciones y exportación.
- **Offline real:** el estado se reconstruye desde timestamps persistidos; cerrar la PWA o perder red no detiene ni inventa tiempo.
- **Ausencia de registro honesta:** una ventana prevista sin eventos queda “no registrada”, no “fallida”.
- **Progreso descriptivo:** frecuencia, duración y experiencia se muestran con cobertura, sin grasa quemada, fases metabólicas, predicción de peso o claims clínicos.
- **Independencia de Diario Fitness:** no registra alimentos/calorías ni crea presión para instalar otra app; peso/medidas siguen siendo opcionales y locales al producto.

## 6. Fases del roadmap

**Fase 0 — Alcance, seguridad y tiempo**

- Documentar finalidad de hábito, claims prohibidos, población excluida y mensajes de ayuda.
- Formalizar patrones diarios/semanales, máquina de estados, timestamps, DST, viajes y correcciones.
- Diseñar modo silencioso como política transversal y crear pruebas de copy/componentes.
- Evaluar privacidad, riesgo de uso problemático y revisión profesional del contenido antes del MVP.
- Preparar observabilidad aislada para Laravel, Vue/PWA, PHP-FPM, colas, Redis, base de datos, notificaciones, errores y latencia sin datos sensibles.

**Fase 1 — Temporizador offline-first**

- Perfil, patrones 16:8/18:6/5:2/personalizado, inicio/fin manual y sesión persistente.
- IndexedDB, eventos append-only, cola idempotente y sincronización incremental.
- Historial con estados reales/previstos/no registrados y corrección por supersesión.
- Criterio de salida: funcionamiento continuado sin red y pruebas de cierre, reinicio, reloj alterado, DST, viaje y doble toque.

**Fase 2 — Reflexión, recordatorios y seguridad**

- Escalas separadas, notas protegidas, finalización neutral y mensajes ante malestar declarado.
- Avisos opt-in con texto visible, franjas silenciosas, local/server fallback y deduplicación.
- Revisión de todos los flujos para eliminar prescripción, progresión y claims.
- Criterio de salida: ninguna notificación crea sesión o presiona para continuar; datos ausentes nunca se convierten en cero.

**Fase 3 — Historial, rachas y modo silencioso**

- Rachas versionadas/explicables, estadísticas de frecuencia/duración/cobertura y pausas.
- Modo silencioso en inicio, navegación, notificaciones, estadísticas y exportación.
- Pruebas visuales y de contenido para componentes ocultos/bloqueados.
- Criterio de salida: activar modo silencioso elimina contenido restrictivo inmediatamente sin borrar información ni promover reactivación.

**Fase 4 — Peso y medidas opcionales**

- Módulo activable, tendencias neutrales, ocultación y exportación selectiva.
- Sin objetivo automático, causalidad, IMC interpretado ni conexión con Diario Fitness.
- Validación de privacidad y experiencia con usuarios que no desean exposición de peso.
- Criterio de salida: el producto completo funciona sin habilitar el módulo y ningún resumen revela medidas ocultas.

**Fase 5 — Exportación y portabilidad**

- CSV/PDF con patrón, timestamps, zona, duración, resultados y campos seleccionados.
- Vista previa, enlace temporal, revocación y exportación integral.
- Métodos/versiones y correcciones visibles.
- Criterio de salida: toda duración se reproduce desde eventos y ninguna exportación incluye notas/medidas sin selección.

**Fase 6 — Endurecimiento y producción**

- Seguridad, cifrado, rate limiting, sesiones, copias, restauración, exportación y borrado.
- Accesibilidad, rendimiento plurianual, notificaciones y compatibilidad PWA.
- QA exhaustivo funcional, offline, concurrencia, temporalidad, modo silencioso, privacidad y recuperación.
- Revisión final de finalidad y comunicación comercial; cualquier recomendación o integración alimentaria requerirá nueva evaluación antes de desarrollarse.
