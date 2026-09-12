# Plan Maestro — Control de Riego y Cuidado de Plantas

## 1. Propósito y usuario objetivo

Aplicación doméstica para planificar, registrar y coordinar el cuidado de plantas sin convertir una estimación algorítmica en una orden. El sistema propone una fecha y muestra los factores que la desplazaron; el usuario conserva siempre la fecha confirmada y puede modificarla sin penalización.

El usuario principal es una persona en España con plantas de interior, terraza, balcón o jardín pequeño que necesita recordar cuidados distintos y compartir su ejecución con otros residentes. No se orienta a explotaciones agrícolas, riego industrial, diagnóstico fitosanitario ni control automático de electroválvulas.

Principios de producto:

- Distinguir `fecha propuesta`, `fecha confirmada` y `fecha ejecutada`; ninguna debe sobrescribir silenciosamente a otra.
- Tratar cada ejemplar como unidad de cuidado, aunque varias plantas compartan especie, habitación o pauta.
- Permitir planificación completamente manual; el clima mejora una propuesta, pero su ausencia nunca bloquea tareas.
- No inferir necesidad de agua solo por especie: combinar ubicación, exposición, cultivo en maceta o suelo, sustrato, último riego, humedad aportada y observaciones del usuario.
- Considerar lluvia como aporte hídrico únicamente para plantas expuestas; una previsión no cuenta como riego realizado y una lluvia observada debe poder confirmarse o corregirse.
- Evitar lenguaje de certeza: usar “propuesta”, “factores considerados” y “revisar antes de regar”, no “debes regar”.
- Diseñar el hogar compartido para prevenir duplicidades: quien inicia o completa una tarea debe hacerlo visible a los demás aun cuando opere sin conexión.

## 2. Dominios de backend

- **Identidad, hogares y permisos:** hogares multiusuario con roles `propietario`, `miembro` e `invitado`; permisos separados para editar plantas, confirmar propuestas, completar tareas y gestionar miembros.
- **Inventario de plantas:** ejemplares, nombre doméstico, especie opcional, estado activo, ubicación, orientación, exposición, recipiente, sustrato y archivos fotográficos. El catálogo botánico aporta valores iniciales, nunca bloquea datos manuales.
- **Contexto de cultivo versionado:** historial de cambios de interior/exterior, maceta/suelo, tamaño de recipiente, drenaje, sustrato y ubicación. Las propuestas deben conservar el contexto exacto con el que fueron calculadas.
- **Planes de cuidado:** reglas independientes para riego, abono, poda, trasplante y revisión de plagas. Admiten intervalo, temporada activa, antelación, pausa y excepciones por ejemplar.
- **Motor de propuestas:** genera candidatos a partir del plan confirmado y aplica ajustes trazables. Devuelve fecha base, fecha sugerida, rango de incertidumbre, factores con dirección e intensidad y versión del algoritmo.
- **Calendario confirmado:** almacena decisiones explícitas del usuario. Una recalculación crea una nueva propuesta pendiente y no mueve automáticamente una tarea ya confirmada.
- **Meteorología:** proveedor desacoplado por coordenadas aproximadas, datos diarios observados y previstos, precipitación, temperatura y calidad del dato. La dirección exacta del domicilio no debe enviarse si una cuadrícula o código postal resulta suficiente.
- **Aportes de humedad:** riegos manuales, lluvia confirmada y otros aportes registrados. Se guardan cantidad opcional, fuente y fiabilidad; no se inventan mililitros a partir de milímetros de lluvia sin superficie y exposición conocidas.
- **Ejecución de tareas:** estados `pendiente`, `en_curso`, `completada`, `omitida` y `cancelada`; actor, dispositivo, fecha efectiva, notas, fotografías e idempotencia para sincronización.
- **Coordinación doméstica:** reserva temporal de tarea, indicador “alguien la está realizando”, resolución de dobles ejecuciones y aviso cuando dos acciones offline afectan al mismo ejemplar y tipo de cuidado.
- **Historial y medios:** cronología inmutable de cuidados y cambios relevantes; derivados de imagen separados del original y metadatos sensibles eliminados cuando no sean necesarios.
- **Recordatorios:** reglas por tarea, planta y miembro; zona horaria `Europe/Madrid`, horario silencioso, aplazamiento y supresión cuando otro residente completa la tarea.
- **Sincronización offline:** operaciones con UUID generado en cliente, cola durable, control optimista por versión y conflictos de dominio. Las finalizaciones se fusionan como eventos; las ediciones incompatibles requieren elección del usuario.
- **Auditoría y explicabilidad:** registro de quién propuso, confirmó, editó o ejecutó cada fecha; instantánea de entradas y explicación legible reproducible para cada propuesta.

Reglas críticas del motor:

- Una tarea confirmada solo cambia por acción humana; el motor puede adjuntar una advertencia meteorológica o una alternativa.
- La lluvia prevista desplaza una propuesta con menor peso que la lluvia observada; si no ocurre, se recalcula desde la fecha original y se explica la reversión.
- La lluvia observada puede crear un aporte pendiente de confirmación. Solo una política habilitada por el usuario permite aceptarla automáticamente para plantas inequívocamente exteriores.
- Una lectura de humedad es contextual: registrar valor, escala o dispositivo, punto de medida y hora. No mezclar porcentajes de sensores distintos sin calibración.
- La ejecución duplicada no se elimina: se conserva, se marca como posible doble riego y se solicita confirmar qué ocurrió realmente.

## 3. Módulos de frontend

- **Hoy:** tareas confirmadas, propuestas pendientes y acciones en curso separadas visualmente. Cada tarjeta muestra planta, cuidado, responsable y acceso rápido a `completar`, `aplazar` o `editar`.
- **Alta de planta:** flujo corto con foto, nombre, ubicación y tipo de cultivo; especie, orientación, sustrato, drenaje y maceta son ampliables. La app debe funcionar con “especie desconocida”.
- **Ficha de planta:** estado actual, próxima tarea confirmada, propuestas sin decidir, última humedad, último aporte de agua, cronología y galería comparativa por fechas.
- **Calendario:** vistas agenda, semana y mes; edición directa por tarea o en lote. Debe distinguir propuestas mediante estilo y etiqueta, no solo mediante color.
- **Editor de plan:** frecuencia por tipo de cuidado, meses activos, recordatorio, responsable preferente y factores permitidos para ajustar propuestas.
- **Revisión de propuesta:** comparación `fecha base → fecha propuesta`, rango de confianza y lista de factores: lluvia, temperatura, interior/exterior, maceta/suelo, sustrato, humedad y último cuidado. Acciones: confirmar, elegir otra fecha o mantener la anterior.
- **Registro rápido:** completar riego u otra tarea en dos toques; fecha efectiva editable, cantidad opcional, observación y foto. Nunca exigir cuantificar agua.
- **Lluvia como riego:** bandeja de episodios observados aplicables a plantas exteriores; selección múltiple con exclusión de plantas cubiertas o trasladadas.
- **Hogar compartido:** miembros, permisos, asignaciones y actividad reciente. Antes de completar una tarea muestra si otro miembro la tiene en curso o acaba de registrarla.
- **Historial fotográfico:** línea temporal por ejemplar y comparación de dos imágenes; sin puntuación automática de “salud” en el alcance inicial.
- **Centro de conflictos:** presenta ambas versiones con autor, hora del dispositivo y estado de sincronización; ofrece conservar una, fusionar notas o registrar ambas ejecuciones.
- **Recordatorios:** configuración por cuidado, anticipación, horario silencioso y destinatario; notificación con acción de completar o aplazar que también se encola offline.
- **Estado offline:** indicador discreto, número de cambios pendientes y último sincronizado. Una acción completada debe parecer finalizada localmente sin esperar al servidor.
- **Ajustes y privacidad:** ubicación meteorológica aproximada, proveedor de clima, unidades, retención de fotos, exportación y eliminación del hogar.

## 4. Modelo de datos inicial

| Entidad | Campos y decisiones específicas |
|---|---|
| `users` | `id`, identidad del core, `timezone`, `locale`; zona horaria por defecto `Europe/Madrid`. |
| `households` | `id`, `name`, `weather_location_id`, `version`; límite de facturación por hogar, no por planta. |
| `household_members` | `household_id`, `user_id`, `role`, `status`, `joined_at`; unicidad por hogar y usuario. |
| `locations` | `id`, `household_id`, `name`, `kind` (`interior`, `balcon`, `terraza`, `jardin`, `otro`), `orientation`, `covered`, `sort_order`. |
| `weather_locations` | `id`, `postal_code` o cuadrícula, coordenadas redondeadas, `provider`, `consent_at`; separadas de la dirección doméstica. |
| `plant_taxa` | catálogo opcional: nombre científico, nombres comunes, procedencia y versión; no contiene un calendario obligatorio. |
| `plants` | `id`, `household_id`, `taxon_id?`, `display_name`, `acquired_on?`, `status`, `cover_media_id?`, `created_by`. |
| `plant_context_versions` | `plant_id`, vigencia, `location_id`, `placement`, `cultivation` (`pot`, `ground`), recipiente, drenaje, sustrato, exposición y notas. |
| `care_plan_versions` | `plant_id`, `care_type`, regla base, intervalo, meses activos, margen de revisión, `effective_from`, autor y estado. |
| `care_proposals` | `plant_id`, `care_type`, `base_due_at`, `proposed_due_at`, rango, `algorithm_version`, `input_snapshot`, `explanation`, `status`, `supersedes_id?`. |
| `proposal_factors` | `proposal_id`, `factor_type`, valor normalizado, `direction` (`advance`, `delay`, `neutral`), magnitud, fuente y texto explicativo. |
| `scheduled_tasks` | `plant_id`, `care_type`, `confirmed_due_at`, `source_proposal_id?`, responsable, prioridad, estado y `lock_version`. |
| `task_events` | diario append-only: `task_id`, transición, `occurred_at`, actor, dispositivo, `operation_id`, comentario. |
| `care_actions` | hecho observado: `plant_id`, `care_type`, `performed_at`, `performed_by`, `task_id?`, cantidad/unidad opcional, notas y `possible_duplicate_of?`. |
| `moisture_observations` | `plant_id`, hora, `method`, valor, escala, punto de medida, dispositivo opcional y observador. |
| `weather_daily_records` | ubicación, fecha, observado/previsto, precipitación, temperatura, proveedor, capturado en y calidad. |
| `water_contributions` | `plant_id`, `source` (`manual`, `rain`, `other`), hora, cantidad opcional, `weather_record_id?`, exposición, confirmación y actor. |
| `media_assets` | propietario, objeto asociado, almacenamiento, hash, fecha de captura, miniaturas y estado de borrado; EXIF sensible depurado. |
| `notification_rules` | ámbito, tipo de cuidado, usuario destinatario, anticipación, horario silencioso, canal y estado. |
| `task_claims` | `task_id`, miembro, inicio, caducidad y dispositivo; reserva blanda, nunca bloqueo irreversible. |
| `sync_operations` | `operation_id`, usuario, dispositivo, entidad, acción, payload, estado y resultado; `operation_id` único para idempotencia. |
| `conflict_cases` | entidad, versiones enfrentadas, tipo, detección, resolución, resolutor y auditoría. |
| `audit_logs` | hogar, actor, acción, entidad, antes/después mínimos y fecha; sin duplicar binarios ni notas privadas completas. |

Convenciones iniciales:

- UUID/ULID generados en cliente para plantas, tareas, acciones y operaciones offline.
- Fechas de calendario almacenadas con zona horaria; observaciones y eventos como instantes UTC más zona de origen.
- Fotografías fuera de la base de datos; la tabla solo conserva metadatos y referencias.
- `care_actions` es la fuente de verdad de lo realizado; `scheduled_tasks` expresa intención y `care_proposals` asesoramiento.
- Índices mínimos: tareas por hogar/estado/fecha, acciones por planta/tipo/fecha, propuestas por estado y operaciones por dispositivo/estado.
- Borrado lógico para plantas y tareas; los eventos de auditoría se retienen con identidad minimizada según la política del hogar.

## 5. Diferenciador frente a competencia

- **Control humano verificable:** la fecha calculada jamás sustituye una decisión confirmada; el historial permite reconstruir propuesta, modificación y ejecución.
- **Explicación causal concreta:** no muestra un “IA recomienda”, sino cuánto adelantaron o retrasaron la propuesta la lluvia, el entorno, el sustrato, la humedad y el último cuidado.
- **Clima tratado como evidencia imperfecta:** distingue previsión, observación meteorológica y confirmación doméstica; evita declarar regada una maceta cubierta porque llovió en su código postal.
- **Coordinación diseñada para offline:** la reserva de tarea reduce dobles riegos online y la conciliación conserva ambos registros cuando dos residentes actuaron sin conexión.
- **Calendario útil sin identificar la especie:** permite mantener una planta desde el primer minuto y enriquecer sus datos después, evitando que un catálogo incompleto bloquee el uso.
- **Historial operativo, no red social:** fotos y notas sirven para comparar el ejemplar y documentar intervenciones; no hay feed, puntuaciones públicas ni diagnósticos visuales.
- **Adecuación al hogar español:** zona horaria con cambios estacionales, ubicaciones típicas —interior, balcón, terraza y jardín—, meteorología aproximada y unidades métricas.
- **Alcance deliberado:** resuelve cuidados domésticos y convivencia; no añade comercio de plantas, comunidad pública, domótica obligatoria ni gestión agrícola.

La métrica principal será el porcentaje de tareas confirmadas resueltas con un registro inequívoco —completada, aplazada u omitida—, no el número de notificaciones enviadas. Las métricas de calidad del motor serán tasa de aceptación de propuestas, magnitud de correcciones humanas, reversiones por lluvia prevista no ocurrida y dobles riegos detectados por cada 100 acciones.

## 6. Fases del roadmap

**Fase 0 — Contratos de dominio y prototipo técnico**

- Definir formalmente propuesta, confirmación, ejecución, aporte hídrico y conflicto.
- Probar cambios horarios de `Europe/Madrid`, tareas repetitivas e idempotencia offline.
- Validar con usuarios que “propuesta” y “confirmada” se distinguen sin depender del color.
- Cerrar fuera de alcance: diagnóstico por foto, sensores, riego automático, marketplace y red social.

**Fase 1 — MVP manual offline-first**

- Hogar, ubicaciones, plantas, contexto de cultivo y planes manuales.
- Agenda de hoy, calendario editable y tareas de riego, abono, poda, trasplante y plagas.
- Registro rápido, notas, foto, historial por planta y recordatorios locales.
- IndexedDB con cola durable, UUID cliente, sincronización idempotente y recuperación tras cerrar la PWA.
- Salida: un hogar puede operar varios días sin conexión y sincronizar sin perder acciones.

**Fase 2 — Hogar compartido y conflictos**

- Invitaciones, roles, responsables, actividad y reservas temporales de tareas.
- Aviso de acciones recientes, supresión de recordatorios y conciliación de posibles dobles riegos.
- Centro de conflictos para ediciones simultáneas de planes, fechas y ubicaciones.
- Salida: dos residentes pueden actuar offline y resolver ambigüedades sin borrar evidencia.

**Fase 3 — Propuestas explicables**

- Motor determinista versionado basado inicialmente en intervalos y contexto confirmado.
- Pantalla `fecha base → propuesta`, factores, incertidumbre y aceptación o edición explícita.
- Telemetría de aceptación y corrección sin usar datos domésticos para entrenar modelos por defecto.
- Salida: cada propuesta es reproducible desde su instantánea y ninguna mueve una tarea confirmada.

**Fase 4 — Clima y lluvia**

- Consentimiento y ubicación aproximada, adaptador de proveedor meteorológico y caché por cuadrícula.
- Separación entre lluvia prevista y observada; flujo para confirmar qué plantas exteriores recibieron agua.
- Recalcular propuestas pendientes y anexar alternativas a tareas confirmadas.
- Salida: la indisponibilidad del proveedor degrada a calendario manual sin bloquear la aplicación.

**Fase 5 — Profundización del cuidado**

- Lecturas de humedad con método y escala, temporadas por cuidado y cambios de ubicación versionados.
- Comparador fotográfico, exportación del historial por planta y mantenimiento de catálogo botánico con procedencia.
- Ajustes del motor evaluados contra correcciones humanas, sin convertir correlaciones en diagnóstico.

**Fase 6 — Preparación comercial y producción**

- Cuotas por hogar, límites transparentes de almacenamiento y estrategia de copias de seguridad.
- Accesibilidad WCAG 2.2 AA, pruebas de notificaciones iOS/Android, cambios horarios, baja conectividad y recuperación de cola.
- RGPD: exportación, eliminación, minimización de ubicación, retención de fotografías y registro de consentimiento.
- Observabilidad separada para API Laravel, PHP-FPM, colas, Redis, base de datos, almacenamiento de medios y fallos de sincronización de esta app.
- Despliegue gradual con métricas de aceptación de propuestas, conflictos, dobles riegos y errores del proveedor climático.
