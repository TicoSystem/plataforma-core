## 1. Propósito y usuario objetivo

**Flashcards Educativas Leitner** permitirá memorizar contenidos mediante cajas de repaso visibles, reglas comprensibles y decisiones reproducibles. Cada tarjeta mostrará por qué corresponde estudiarla, qué respuesta anterior provocó su posición actual y cuándo volverá a aparecer si se responde bien o mal.

El producto se dirige a estudiantes de ESO, Bachillerato, Formación Profesional, universidad, oposiciones, idiomas y formación profesional continua en España. El MVP priorizará estudiantes autónomos que necesitan preparar una fecha concreta y docentes que distribuyen mazos cerrados sin gestionar una red social.

Decisiones de producto:

- El motor será Leitner determinista. No habrá una puntuación secreta de dificultad ni un modelo que cambie intervalos sin mostrar la regla aplicada.
- Cada mazo tendrá un esquema versionado de cajas; la configuración inicial propondrá cinco cajas, pero el usuario podrá modificar número, intervalos, ascensos, descensos y política ante omisión.
- El calendario distinguirá `due` —tarjetas cuyo repaso vence—, `new` —nunca estudiadas— y `exam_priority` —adelantadas por un objetivo próximo—. La interfaz explicará el origen de cada selección.
- “Completamente offline” incluirá crear, editar, importar, estudiar, reproducir medios ya descargados y consultar estadísticas. La cuenta y la sincronización serán opcionales para el uso individual.
- Las sesiones de 5, 10 o 20 minutos serán presupuestos temporales, no cantidades fijas de tarjetas. El planificador estimará cuántas caben usando la duración reciente del propio usuario y cerrará sin penalizar tarjetas no mostradas.
- El modo examen no alterará el estado Leitner salvo que el usuario active explícitamente “usar resultados para repaso”. Por defecto será una simulación separada.
- El panel docente será opcional y sin feed, comentarios públicos, seguidores, mensajería entre alumnos ni ranking global.
- Los mazos verificados indicarán autor, versión, materia, nivel, currículo/convocatoria declarada y fecha de revisión; “verificado” describirá el proceso editorial, no garantizará resultados académicos.

## 2. Dominios de backend

**Identidad y espacios de estudio**

- Perfil local anónimo como modo inicial; cuenta remota solo para sincronizar, recuperar compras o usar funciones docentes.
- Espacio personal por usuario y espacios de clase administrados por docente/centro.
- Roles `owner`, `teacher`, `student` y `viewer`; un docente puede asignar contenido y ver progreso autorizado, pero no editar el historial personal del alumno.
- Edad/curso se solicitarán únicamente si habilitan contenido o consentimiento específico; el sistema no necesita fecha de nacimiento completa para estudiar.

**Mazos y tarjetas**

- Mazo con título, descripción, materia, nivel, idioma, etiquetas, estado, esquema Leitner y versión de contenido.
- Tarjetas con anverso, reverso, pistas, explicación, audio, imágenes y tipo `basic`, `reverse`, `cloze` o `image_prompt`.
- Una nota puede generar varias tarjetas —por ejemplo directa e inversa— mediante plantillas; cada tarjeta mantiene progreso propio.
- Edición de contenido separada del progreso. Cambiar una errata no reinicia la tarjeta; un cambio sustancial puede marcarla para revisión o reiniciarla mediante decisión explícita.
- Archivado y eliminación lógica; las sesiones históricas conservan el snapshot mínimo de la tarjeta evaluada.

**Esquemas Leitner**

- Esquema con número de cajas, intervalo de cada caja, unidad temporal y reglas de transición.
- Transiciones explícitas para `again`, `hard`, `good` y `easy`, aunque la plantilla clásica pueda exponer solo incorrecta/correcta.
- Cada versión del esquema será inmutable una vez utilizada. Editar reglas crea nueva versión y ofrece simular la migración antes de aplicarla.
- La fecha prevista se calcula desde la última revisión efectiva y el intervalo de la caja destino, ajustada por zona horaria y política de días de estudio.
- Posponer una tarjeta conserva vencimiento original, motivo y nueva fecha; no se registra como acierto.

**Motor de programación**

- Funciones puras y versionadas que reciben estado, respuesta, esquema, calendario y objetivo; devuelven caja destino, vencimiento y explicación estructurada.
- Orden diario configurable: vencidas más antiguas, cajas inferiores, cercanía del examen, aleatorio estable o mezcla definida.
- Límite de tarjetas nuevas independiente del tiempo de sesión para impedir que las nuevas desplacen indefinidamente a las vencidas.
- Selección de sesión congelada al comenzar mediante un `session_plan`; sincronizaciones posteriores no reordenan tarjetas ya comprometidas.
- Toda decisión produce un código explicativo y parámetros: “vence hoy porque está en caja 2, cuyo intervalo es de 3 días, y se respondió el 8 de mayo”.

**Objetivos por fecha**

- Objetivo vinculado a uno o varios mazos, fecha/hora, cobertura deseada, días disponibles, minutos por día y días sin estudio.
- Planificación inversa que estima nuevas tarjetas/día y repasos previstos usando el esquema vigente y duración histórica.
- Estados `on_track`, `at_risk` y `not_feasible` definidos por reglas visibles; el sistema muestra qué supuesto provoca el riesgo.
- Replanificación al perder días, añadir tarjetas o cambiar reglas, sin modificar respuestas pasadas.
- Nunca se promete que completar el plan implique aprobar; el indicador mide cobertura y calendario del mazo.

**Sesiones de estudio**

- Sesión con presupuesto temporal, cola planificada, modo, inicio/fin, pausas y dispositivo.
- Respuesta con resultado, tiempo visible, tiempo total, pista usada y transición aplicada.
- El reloj se comprueba entre tarjetas; una tarjeta iniciada puede terminar aunque se alcance el límite.
- Interrupción, abandono o cierre de la PWA conserva progreso tarjeta a tarjeta y permite reanudar la cola restante.
- Deshacer disponible solo para la última respuesta y registra la reversión, evitando reescrituras históricas silenciosas.

**Modo examen**

- Plantillas por tipo de evaluación: test, respuesta corta, desarrollo autocorregido por el estudiante y oral.
- Parámetros: número de preguntas, tiempo, penalización por error, respuestas en blanco, aleatorización y temario.
- Presets editables para formatos frecuentes en España; el nombre del preset no sustituye la comprobación de normas de cada centro o convocatoria.
- Corrección automática únicamente para respuestas cerradas o coincidencias configuradas. Respuestas abiertas requieren autoevaluación o rúbrica docente.
- Resultado, puntuación y desglose almacenados aparte del historial Leitner; transferencia opcional y explícita de cada resultado al repaso.

**Medios**

- Imágenes y audio privados o vinculados a un mazo publicado, con hash, MIME, tamaño, dimensiones/duración y licencia/procedencia.
- Variantes optimizadas y manifiesto descargable para uso offline; integridad verificada por hash.
- Límites por mazo y cuota de almacenamiento; compresión sin sustituir el original hasta confirmación.
- Texto alternativo para imágenes y transcripción opcional de audio como requisitos de mazos docentes verificados.

**Importación y exportación**

- CSV con asistente de codificación, separador, cabecera, columnas, etiquetas, HTML y rutas de medios.
- Importación Anki mediante adaptador aislado para paquetes compatibles, notas, tarjetas, etiquetas y medios; las programaciones propietarias se convierten a estado inicial o a una aproximación explicada, nunca se presentan como equivalencia exacta.
- Previsualización, errores por fila/nota, detección de duplicados y reversión por lote.
- Exportación portable de contenido, configuración Leitner, progreso e historial en un formato propio documentado; CSV para contenido simple.

**Panel docente y verificación**

- Docente crea versiones publicables, asigna mazos a clases y fija fecha objetivo o esquema recomendado.
- Alumno puede clonar/adaptar un mazo; el original verificado queda intacto y las actualizaciones muestran diferencias antes de aplicar.
- Progreso compartido mínimo: cobertura, vencidas, sesiones y dominio por caja; respuestas concretas o tiempos detallados requieren alcance adicional.
- Flujo editorial `draft`, `submitted`, `in_review`, `verified`, `rejected`, `superseded` con revisor, rúbrica, fuentes y fecha de caducidad editorial.
- Sin descubrimiento algorítmico social; el acceso a mazos se realiza por catálogo curado, código de clase, enlace directo o búsqueda estructurada.

**Sincronización offline**

- IndexedDB como fuente operativa local para mazos descargados, medios, esquemas, objetivos, planes de sesión y revisiones.
- Operaciones con UUID, cola append-only, cursor incremental y claves idempotentes.
- Las respuestas son eventos inmutables; dos dispositivos que revisen la misma tarjeta crean una incidencia de orden que el servidor resuelve cronológicamente y muestra si cambia el vencimiento.
- Conflicto explícito para edición simultánea de contenido, esquema o objetivo; las notas personales pueden combinarse cuando sea seguro.
- Descarga por manifiestos versionados y delta; una actualización fallida conserva la última versión íntegra disponible.

**Analítica y privacidad**

- Métricas personales: tarjetas por caja, vencidas, precisión por periodo, tiempo, cobertura y carga futura.
- Las estadísticas se reconstruyen desde revisiones; los agregados son cachés, no fuente de verdad.
- Analítica de producto sin contenido de tarjetas ni respuestas; opt-out para telemetría no esencial.
- Borrado/exportación por espacio y separación de datos docentes/personales; auditoría de asignaciones, accesos y cambios editoriales.

## 3. Módulos de frontend

**Hoy**

- Resumen de vencidas, nuevas permitidas, objetivos en riesgo y carga estimada en minutos.
- Selector de sesión de 5, 10, 20 minutos o personalizado con previsión de tarjetas, no promesa fija.
- Desglose “por qué hoy” por cajas, retraso y objetivo de examen.

**Sesión de repaso**

- Tarjeta, pista opcional, revelado y botones de respuesta con caja/fecha resultante antes de confirmar.
- Temporizador discreto, progreso del presupuesto y control de pausa/fin.
- Explicación expandible de la selección y transición; deshacer limitado a la última respuesta.
- Audio, zoom de imagen, teclado y gestos configurables; navegación accesible sin depender del color.

**Cajas Leitner**

- Representación visual de cajas, número de tarjetas, intervalo y próximo volumen esperado.
- Inspección de tarjetas dentro de cada caja y movimiento manual con motivo auditable.
- Editor de esquema con simulación sobre el mazo actual antes de crear una nueva versión.
- Historial por tarjeta: respuestas, cajas, vencimientos, aplazamientos y reglas aplicadas.

**Mazos y editor**

- Biblioteca local/remota con estado descargado, tamaño, versión, progreso y procedencia.
- Editor de notas/tarjetas con previsualización, cloze, reversa, audio, imagen y etiquetas.
- Detección de cambios sustanciales y elección conservar progreso, marcar para revisión o reiniciar.
- Duplicado/fusión controlados sin mezclar progreso por coincidencia textual automática.

**Objetivos**

- Asistente con fecha de examen, mazos, cobertura, minutos y días de estudio.
- Calendario inverso con nuevas/día, repasos previstos, margen y supuestos.
- Replanificación visual ante retraso y simulación de cambios sin escribir hasta confirmar.

**Modo examen**

- Selector de preset, temario, número, duración, penalización, blancos y orden.
- Interfaz sin mostrar caja o vencimiento durante la prueba.
- Resultados por materia/etiqueta y revisión de fallos; botón separado para aplicar resultados al Leitner.
- Rúbrica o autoevaluación para respuestas abiertas, sin corrección semántica opaca en el MVP.

**Importación**

- Asistente CSV con codificación, delimitador, mapeo y previsualización.
- Importación de paquete Anki con inventario de notas, tarjetas, plantillas y medios antes de confirmar.
- Informe de elementos importados, aproximados, omitidos, duplicados y errores; reversión por lote.

**Offline y sincronización**

- Gestor de descargas con tamaño de mazo/medios, versión y disponibilidad real offline.
- Centro de sincronización con última fecha, operaciones pendientes, conflictos y reintentos.
- Prueba de disponibilidad offline que comprueba tarjetas y hashes de medios, no solo la instalación de la PWA.

**Panel docente**

- Clases, alumnos invitados, mazos asignados, fecha objetivo y esquema recomendado.
- Cobertura agregada y distribución por cajas con alcance de datos visible.
- Editor/publicación por versiones, solicitud de verificación y comparación de cambios.
- Catálogo curado y búsqueda; no feed, comentarios públicos, seguidores ni ranking.

**Ajustes y privacidad**

- Días de estudio, zona horaria, orden, nuevas/día, avisos, accesibilidad y almacenamiento.
- Cuenta opcional, dispositivos, exportación integral, eliminación y telemetría.
- Controles para aceptar o rechazar el seguimiento docente adicional al mínimo requerido por la clase.

## 4. Modelo de datos inicial

Las claves primarias serán UUID/ULID generables offline. Fechas de vencimiento conservarán zona horaria y versión del motor. Las respuestas serán eventos inmutables; el estado actual de una tarjeta será una proyección reconstruible.

| Entidad | Campos específicos iniciales | Restricciones y relaciones |
| --- | --- | --- |
| `users` | `email`, `name`, `locale`, `timezone`, `account_mode` | `local` o `synced`; correo solo para cuenta remota. |
| `study_spaces` | `owner_user_id`, `type`, `name`, `status` | Personal o clase. |
| `space_members` | `study_space_id`, `user_id`, `role`, `status`, `joined_at` | Único por espacio/usuario. |
| `decks` | `study_space_id`, `title`, `description`, `subject`, `education_level`, `language`, `status`, `current_content_version_id`, `leitner_scheme_id`, `source_deck_id` | Clon conserva procedencia, no identidad compartida. |
| `deck_content_versions` | `deck_id`, `version`, `change_summary`, `content_hash`, `published_at`, `created_by` | Inmutable tras publicación/asignación. |
| `notes` | `deck_id`, `content_version_id`, `note_type`, `fields_json`, `tags_json`, `change_classification` | Una nota genera una o varias tarjetas. |
| `cards` | `note_id`, `template_key`, `front_snapshot`, `back_snapshot`, `content_hash`, `status` | Identidad estable entre cambios menores. |
| `media_assets` | `owner_space_id`, `storage_key`, `mime_type`, `sha256`, `size_bytes`, `width`, `height`, `duration_ms`, `license`, `attribution`, `alt_text`, `transcript` | Hash único por espacio; privado salvo publicación. |
| `card_media` | `card_id`, `media_asset_id`, `side`, `position` | Orden estable por lado. |
| `leitner_schemes` | `owner_user_id`, `name`, `current_version_id`, `is_template` | Esquema personal o plantilla. |
| `leitner_scheme_versions` | `scheme_id`, `version`, `box_count`, `timezone_policy`, `study_days_json`, `rules_json`, `created_at` | Inmutable tras utilizarse. |
| `leitner_boxes` | `scheme_version_id`, `box_number`, `interval_value`, `interval_unit`, `transition_rules_json` | Número único por versión. |
| `card_states` | `user_id`, `card_id`, `scheme_version_id`, `box_number`, `due_at`, `last_reviewed_at`, `review_count`, `state_version` | Proyección única por usuario/tarjeta. |
| `review_events` | `user_id`, `card_id`, `session_id`, `reviewed_at`, `result`, `from_box`, `to_box`, `previous_due_at`, `next_due_at`, `engine_version`, `rule_code`, `explanation_params_json`, `operation_uuid`, `reverted_by_event_id` | `operation_uuid` única; no se actualiza tras crear. |
| `study_goals` | `user_id`, `name`, `exam_at`, `coverage_target`, `minutes_per_day`, `study_days_json`, `status`, `planning_version` | Objetivo puede enlazar varios mazos. |
| `study_goal_decks` | `study_goal_id`, `deck_id`, `weight`, `included_tags_json` | Único por objetivo/mazo. |
| `goal_plan_versions` | `study_goal_id`, `version`, `inputs_json`, `daily_plan_json`, `forecast_json`, `created_at`, `accepted_at` | Replanificar crea versión. |
| `study_sessions` | `user_id`, `mode`, `budget_seconds`, `started_at`, `ended_at`, `paused_seconds`, `status`, `device_id`, `session_plan_id` | Persistencia tarjeta a tarjeta. |
| `session_plans` | `user_id`, `created_at`, `engine_version`, `selection_policy`, `card_queue_json`, `explanation_summary_json` | Cola congelada al iniciar. |
| `exam_templates` | `owner_space_id`, `name`, `question_types_json`, `scoring_rules_json`, `time_limit_seconds`, `version` | Presets editables, no normativa garantizada. |
| `exam_attempts` | `user_id`, `exam_template_id`, `deck_scope_json`, `started_at`, `submitted_at`, `score`, `max_score`, `status`, `apply_to_leitner` | Separado del estado Leitner. |
| `exam_answers` | `exam_attempt_id`, `card_id`, `answer_text`, `selected_options_json`, `result`, `points`, `self_assessed`, `review_event_id` | Evento Leitner solo si se aplica explícitamente. |
| `import_batches` | `user_id`, `target_deck_id`, `format`, `filename`, `file_hash`, `adapter_version`, `status`, `summary_json`, `completed_at` | Hash detecta repetición. |
| `import_items` | `import_batch_id`, `source_ref`, `raw_payload_json`, `normalized_payload_json`, `status`, `warning_codes_json`, `subject_type`, `subject_id` | Error aislado por nota/tarjeta. |
| `classes` | `study_space_id`, `teacher_user_id`, `name`, `join_code_hash`, `status` | Sin descubrimiento público de alumnos. |
| `class_assignments` | `class_id`, `deck_id`, `content_version_id`, `goal_date`, `recommended_scheme_version_id`, `progress_scope`, `status` | Contenido y alcance congelados por asignación. |
| `deck_verifications` | `deck_id`, `content_version_id`, `status`, `rubric_version`, `reviewer_id`, `sources_json`, `curriculum_reference`, `reviewed_at`, `expires_at` | Verificación ligada a una versión exacta. |
| `download_manifests` | `user_id`, `deck_id`, `content_version_id`, `manifest_hash`, `assets_json`, `downloaded_at`, `verified_at` | Confirma disponibilidad offline íntegra. |
| `sync_operations` | `user_id`, `device_id`, `operation_uuid`, `entity_type`, `entity_id`, `action`, `payload_json`, `base_version`, `status`, `conflict_json` | Operaciones idempotentes; revisiones append-only. |
| `audit_logs` | `space_id`, `actor_id`, `action`, `subject_type`, `subject_id`, `before_json`, `after_json`, `occurred_at` | Inmutable para acciones docentes/editoriales. |

`review_events` será la fuente de verdad del aprendizaje; `card_states`, previsiones y estadísticas serán proyecciones. Los snapshots usados en sesiones y exámenes impedirán que una edición posterior cambie lo que el alumno respondió históricamente.

## 5. Diferenciador frente a competencia

- **Algoritmo visible de extremo a extremo:** cada respuesta muestra caja de origen, regla aplicada, caja destino, intervalo y próxima fecha.
- **Reglas editables sin perder reproducibilidad:** modificar el sistema crea una versión y permite simular la migración antes de alterar vencimientos.
- **Planificación por fecha comprensible:** el objetivo de examen convierte temario, días y minutos en carga diaria con supuestos visibles y estados de viabilidad.
- **Sesiones temporales honestas:** 5, 10 o 20 minutos controlan tiempo real; las tarjetas no mostradas no cuentan como fallo ni se reprograman.
- **Examen separado del aprendizaje:** una simulación puede usar penalización, blancos y tiempo sin contaminar el Leitner salvo decisión expresa.
- **Offline verificable:** editor, repaso, planificación, importación y medios descargados funcionan sin servidor; un manifiesto confirma que el mazo está completo.
- **Importación sin fingir equivalencia:** contenido y medios de Anki se conservan cuando sea compatible, mientras su programación se traduce de forma explícita al modelo Leitner.
- **Docencia sin red social:** asignación, versiones y progreso mínimo conviven con un catálogo curado sin feed, popularidad, comentarios públicos ni presión competitiva.

## 6. Fases del roadmap

**Fase 0 — Motor e invariantes**

- Formalizar estados, transiciones, intervalos, vencimientos, días de estudio, aplazamientos y explicación estructurada.
- Implementar el motor como funciones puras versionadas con pruebas de propiedad, zona horaria y cambios de calendario.
- Definir identidad local, sincronización opcional, eventos append-only y reconstrucción de `card_states`.
- Preparar observabilidad aislada para PWA, API Laravel, PHP-FPM, colas, Redis, base de datos, errores, latencia y almacenamiento.

**Fase 1 — Leitner personal completamente offline**

- Mazos, editor básico, cinco cajas visibles, repaso, historial y estadísticas esenciales.
- PWA con IndexedDB, service worker, manifiestos y copia/exportación local.
- Sesiones de 5, 10 y 20 minutos con cola congelada, pausa, reanudación y deshacer.
- Criterio de salida: instalar y usar durante siete días sin red; todos los vencimientos se reproducen desde eventos y reglas.

**Fase 2 — Objetivos y modo examen**

- Planificación inversa por fecha, carga prevista, estados de viabilidad y replanificación.
- Presets de examen editables, temporizador, penalización, blancos y resultados separados.
- Explicaciones completas de selección diaria y transición.
- Criterio de salida: pruebas sobre cambios de hora, días excluidos, objetivos imposibles y exámenes que no modifican Leitner por defecto.

**Fase 3 — Medios e importación**

- Audio, imágenes, optimización, accesibilidad y descarga íntegra offline.
- CSV con asistente y adaptador Anki para contenido/medios compatibles.
- Duplicados, errores aislados, aproximaciones explicadas y reversión por lote.
- Criterio de salida: paquetes de prueba variados, cero pérdida silenciosa y reproducción offline de todos los medios verificados.

**Fase 4 — Sincronización opcional**

- Cuenta, varios dispositivos, cursor incremental, idempotencia y conflictos de edición.
- Ordenación explícita de repasos concurrentes y reconstrucción del estado resultante.
- Recuperación de cuenta y exportación integral.
- Criterio de salida: reintentos y revisiones offline concurrentes no duplican eventos ni ocultan cambios de vencimiento.

**Fase 5 — Panel docente**

- Clases, asignaciones, versiones, objetivos y progreso mínimo autorizado.
- Publicación, clonación, comparación de actualizaciones y flujo de verificación.
- Catálogo curado por materia/nivel sin componentes sociales.
- Criterio de salida: aislamiento entre clases, consentimiento/alcance de progreso probado y verificación vinculada a versión exacta.

**Fase 6 — Endurecimiento y producción**

- Accesibilidad, teclado, lector de pantalla, contraste, medios alternativos y rendimiento con mazos grandes.
- Seguridad de archivos, rate limiting, sesiones, copias, restauración, exportación y borrado.
- QA exhaustivo funcional, offline, concurrencia, importación, calendarios, permisos y navegadores PWA.
- Validación con estudiantes y docentes españoles centrada en comprensión del sistema, tiempo hasta primera sesión y capacidad de explicar cualquier tarjeta programada.
