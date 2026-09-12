# Plan Maestro — Organizador de Custodia Compartida

## 1. Propósito y usuario objetivo

Herramienta privada de coordinación para progenitores separados que necesitan ejecutar un calendario de cuidados, documentar acuerdos concretos y compartir información esencial del menor con baja fricción. La app organiza hechos y propuestas; no interpreta resoluciones judiciales, decide incumplimientos, calcula derechos de custodia ni sustituye mediación o asesoramiento jurídico.

El usuario principal es una pareja de progenitores o tutores en España con uno o varios menores y un patrón de convivencia acordado. También admite cuidadores autorizados con acceso limitado a entregas, agenda o contactos. No está diseñada para vigilancia, geolocalización del menor, evaluación de la conducta parental ni comunicación libre de alta confrontación.

Principios de producto:

- Separar `calendario base acordado`, `excepción aceptada`, `propuesta pendiente` y `entrega registrada`; ninguna capa reescribe silenciosamente a otra.
- Tratar vacaciones escolares, festivos nacionales, autonómicos y locales como contexto versionado. Solo una regla acordada determina cómo afectan al patrón.
- Toda propuesta de intercambio tiene versión, alcance, vencimiento y aceptación explícita de las partes requeridas.
- Rechazar o dejar caducar una propuesta conserva el calendario vigente y no genera etiquetas de cooperación o conflicto.
- Un gasto extraordinario pasa por solicitud, justificación, respuesta, reparto y pago; la aplicación no determina si existe obligación legal.
- La información sanitaria y escolar se comparte por finalidad y permisos; no todo miembro que ve el calendario puede abrir documentos sensibles.
- La mensajería se vincula a un asunto operativo y ofrece respuestas estructuradas; no incluye chat global, presencia, “escribiendo…” ni puntuación emocional.
- El tono preventivo reformula un borrador únicamente a petición del autor y antes del envío; el texto enviado siempre requiere aprobación humana.
- No almacenar GPS continuo, rutas ni ubicación en segundo plano. Una entrega puede registrar lugar acordado y confirmación manual, nunca seguimiento.
- Proteger al menor frente a usos secundarios: sin publicidad comportamental, perfiles de riesgo parental ni entrenamiento de modelos generales.

## 2. Dominios de backend

- **Identidad y familias de coordinación:** usuarios adultos, espacios familiares, miembros, invitaciones y dispositivos. El menor no tiene cuenta propia en el alcance inicial.
- **Autoridad y relaciones:** progenitor/tutor declarado, cuidador autorizado, mediador o profesional receptor de exportación. La plataforma registra la declaración y el otorgante sin certificar por sí sola su validez jurídica.
- **Perfiles infantiles:** alias, nacimiento con precisión mínima, zona escolar y necesidades compartidas. Nombre legal, imagen y documentos son opcionales y cifrados cuando se incorporen.
- **Autorización granular:** permisos por menor y capacidad: calendario, propuestas, entregas, gastos, escuela, salud, emergencias, mensajería, exportación e invitaciones.
- **Acuerdos versionados:** representación estructurada del patrón aportado por los usuarios, fecha de vigencia, reglas de alternancia, puntos de entrega y adjunto original opcional. El texto legal adjunto nunca se interpreta automáticamente como regla ejecutable.
- **Motor de calendario:** materializa periodos de cuidado desde versiones aceptadas, anclas y zona horaria. Conserva algoritmo, entradas y procedencia de cada ocurrencia.
- **Calendarios españoles:** catálogos nacionales, autonómicos, locales y escolares con fuente, territorio, curso/año, publicación y revisión. Un festivo no asigna progenitor por sí mismo.
- **Vacaciones y excepciones:** periodos escolares, reglas familiares y excepciones acordadas. Las precedencias se configuran explícitamente por acuerdo y se prueban contra solapamientos.
- **Propuestas de intercambio:** cambio puntual o por rango, calendario afectado, alternativa, mensaje estructurado, destinatarios requeridos, estado y caducidad.
- **Aceptaciones:** respuesta individual e inmutable, versión exacta aceptada, fecha y dispositivo. Cualquier modificación sustancial crea otra propuesta y reinicia aceptaciones.
- **Entregas y recogidas:** evento previsto y confirmaciones independientes por participante; hora efectiva, lugar acordado, incidencia categorizada y nota. No exige coincidencia de ambas versiones para conservarlas.
- **Gastos extraordinarios:** solicitud, categoría, menor, proveedor, importe, fecha, justificante y motivo. Distingue importe solicitado, reparto propuesto, reparto aceptado y pagos registrados.
- **Justificantes:** archivo cifrado, redacción de datos irrelevantes y acceso limitado. OCR opcional solo prepara campos para confirmación.
- **Repartos y pagos:** porcentajes/importes explícitos, versiones, respuestas por parte y conciliación de pagos manuales. No procesa dinero ni califica deuda en el MVP.
- **Información escolar:** centros, contactos, curso, eventos, comunicaciones y documentos; cada elemento define audiencia y vigencia.
- **Información sanitaria:** contactos, citas, alergias, medicación o instrucciones aportadas, con procedencia y fecha de revisión. No genera consejo clínico ni ficha médica oficial.
- **Emergencias:** contactos y datos mínimos disponibles offline en dispositivos autorizados; cambios y accesos auditados.
- **Mensajería estructurada:** hilos ligados a calendario, intercambio, gasto, escuela, salud, entrega u otro asunto permitido. Plantillas de intención, solicitud concreta, respuesta y cierre.
- **Asistente de tono preventivo:** servicio opcional que devuelve alternativas neutrales preservando hechos, fechas y peticiones; no envía, bloquea ni clasifica al destinatario. Los borradores no enviados tienen retención corta.
- **Notificaciones:** avisos operativos neutros, destinatarios autorizados, horario silencioso y deduplicación. La pantalla bloqueada no revela salud, escuela, gasto ni nombre del menor por defecto.
- **Exportación verificable:** instantánea cronológica firmada con hash, zona horaria, fuentes, correcciones y anexos seleccionados. Es un registro de la plataforma, no una certificación pública ni garantía de admisibilidad probatoria.
- **Sincronización offline:** UUID cliente, cola durable, idempotencia y control optimista. Propuestas y aceptaciones requieren versión exacta; eventos concurrentes se conservan como declaraciones separadas.
- **Privacidad, portabilidad y borrado:** consentimiento/legitimación documentados, minimización, exportación, retención, revocación y eliminación con restricciones transparentes sobre registros compartidos que también pertenecen a otra cuenta.
- **Auditoría:** acceso a datos sensibles, cambios de permiso, propuestas, respuestas, correcciones, exportaciones y eliminaciones. Los logs técnicos excluyen nombres, mensajes, importes y datos del menor.

Reglas de dominio no negociables:

- El calendario publicado se deriva únicamente de una versión aceptada; una propuesta pendiente jamás aparece como cambio confirmado.
- Una aceptación corresponde al hash de una versión. Editar fecha, hora, reparto o texto vinculante invalida las aceptaciones anteriores.
- Una entrega registra declaraciones; si difieren, se muestran ambas sin decidir cuál es verdadera.
- Borrar un mensaje enviado no lo elimina del registro compartido: se permite corrección enlazada o solicitud de ocultación según política y derechos aplicables.
- Ningún dato de ubicación se captura de forma continua. Como máximo se almacena el lugar acordado y una confirmación manual con hora.
- La app no calcula “progenitor incumplidor”, “nivel de conflicto”, “fiabilidad” ni predicciones judiciales.

## 3. Módulos de frontend

- **Hoy:** menor, responsable según calendario confirmado, próximo relevo, propuestas pendientes y tareas esenciales. Las propuestas usan un bloque separado del calendario vigente.
- **Configuración del acuerdo:** patrón semanal/quincenal, ancla, horas y lugares; asistente de conflictos que explica solapamientos sin interpretar el convenio.
- **Calendario familiar:** mes, semana y agenda; capas para base, excepciones aceptadas, vacaciones, festivos y eventos escolares. No depender solo del color para identificar responsable o estado.
- **Vacaciones y festivos:** fuente, territorio, curso/año y regla familiar aplicada; permite seleccionar periodos manuales cuando el calendario escolar no esté publicado.
- **Proponer intercambio:** muestra situación actual y propuesta, personas afectadas, compensación opcional de días y vencimiento. Antes de enviar congela una vista comparativa.
- **Bandeja de propuestas:** aceptar, rechazar o contrapropuesta; cada acción informa qué calendario cambiará. El silencio nunca equivale a aceptación.
- **Entrega/recogida:** confirmación rápida, hora efectiva editable, lugar acordado e incidencia categorizada. No solicita ubicación del dispositivo.
- **Gastos extraordinarios:** alta de gasto, justificante, reparto propuesto y motivo; vista de respuestas y pagos separada del total solicitado.
- **Revisión de justificante:** permite ocultar dirección, cuenta bancaria u otros datos antes de compartir y previsualiza exactamente lo visible.
- **Escuela:** calendario, comunicaciones, documentos y contactos con audiencia por elemento y recordatorios configurables.
- **Salud:** citas, alergias, medicación/instrucciones aportadas y documentos; etiquetas de procedencia y última revisión visibles.
- **Emergencia offline:** tarjeta mínima por menor con contactos y datos elegidos, protegida por desbloqueo local y disponible solo en dispositivos autorizados.
- **Mensajería por asunto:** crear solicitud, aportar información, responder y cerrar; todos los mensajes pertenecen a un hilo operativo y admiten adjuntos solo cuando el tipo lo permite.
- **Tono preventivo:** acción `Reformular` con comparación original/propuesta; protege fechas, importes, nombres y petición principal. El usuario edita y confirma antes de enviar.
- **Cronología:** mezcla ordenada de acuerdos, propuestas, respuestas, entregas, gastos y comunicaciones, con filtros y correcciones enlazadas.
- **Exportación para mediación/abogacía:** periodo, menores, categorías, anexos y redacciones; previsualización, índice, hash y registro de generación.
- **Permisos y privacidad:** matriz por menor y módulo, dispositivos, accesos recientes, exportaciones, retención y revocación.
- **Estado offline:** operaciones pendientes, última sincronización y conflictos. No muestra una propuesta como entregada ni aceptada hasta confirmación del servidor.

## 4. Modelo de datos inicial

| Entidad | Campos y decisiones específicas |
|---|---|
| `users` | Identidad adulta del core, idioma, zona horaria y preferencias de privacidad/notificación. |
| `coordination_spaces` | Nombre neutro, propietario inicial, estado, política de retención y versión. |
| `space_members` | Espacio, usuario, relación declarada, rol operativo, estado, invitador y vigencia. |
| `children` | Espacio, alias, nacimiento opcional con precisión, estado y creador; sin credenciales propias. |
| `child_permissions` | Menor, miembro, capacidades explícitas, otorgante, vigencia y revocación. |
| `legal_basis_records` | Menor/espacio, base declarada, finalidad, aviso versionado, actor, fecha y estado. |
| `agreement_versions` | Espacio, vigencia, reglas estructuradas, adjunto cifrado opcional, hash, aceptaciones requeridas y estado. |
| `care_patterns` | Acuerdo, menor, recurrencia, ancla, responsable, inicio/fin, zona horaria y prioridad. |
| `holiday_calendars` | Territorio/tipo, año o curso, fuente, publicado, revisado, versión y estado. |
| `holiday_periods` | Calendario, tipo, inicio/fin, nombre y ámbito; no asigna cuidado. |
| `calendar_rules` | Acuerdo, regla sobre vacaciones/festivos, precedencia, condiciones y resultado estructurado. |
| `care_occurrences` | Menor, inicio/fin, responsable, origen patrón/excepción, versión de motor y estado. |
| `exchange_proposals` | Proponente, alcance, versión, antes/después, mensaje estructurado, caducidad, hash y estado. |
| `proposal_responses` | Propuesta/versión, miembro, respuesta, fecha, dispositivo y nota; unicidad por respondedor y versión. |
| `agreed_exceptions` | Propuesta aceptada, menor, periodo, nuevo responsable, efecto y ocurrencias sustituidas. |
| `handover_events` | Ocurrencia, tipo, hora prevista/efectiva, lugar acordado, declarante, estado y operación. |
| `handover_statements` | Entrega, miembro, resultado, hora declarada, categoría de incidencia, nota cifrada y revisión. |
| `expense_requests` | Menor, solicitante, categoría, proveedor, fecha, importe/moneda, motivo, versión y estado. |
| `expense_evidence` | Solicitud, archivo cifrado, hash, campos redactados, audiencia y estado. |
| `expense_split_versions` | Solicitud, reparto por miembro, total, versión, hash y vigencia. |
| `expense_responses` | Reparto/versión, miembro, acepta/rechaza/contrapropone, fecha y nota. |
| `expense_payments` | Solicitud, pagador, receptor, importe, fecha, referencia opcional y confirmaciones separadas. |
| `school_records` | Menor, tipo, periodo, contenido cifrado, fuente, audiencia, vigencia y estado. |
| `health_records` | Menor, tipo, contenido cifrado, fuente, fecha de revisión, audiencia y estado. |
| `emergency_contacts` | Menor, nombre/relación/contacto cifrados, prioridad, audiencia, revisión y estado. |
| `topics` | Espacio/menor, tipo de asunto, objeto relacionado, título estructurado, participantes y estado. |
| `topic_messages` | Hilo, autor, intención, cuerpo cifrado, fecha efectiva, `supersedes_id?`, estado y operación. |
| `tone_rewrite_jobs` | Autor, borrador efímero, restricciones preservadas, versión de motor, resultado, aceptado y borrado. |
| `media_assets` | Objeto, almacenamiento cifrado, hash, MIME, audiencia, retención y estado; EXIF sensible depurado. |
| `notifications` | Destinatario, objeto, plantilla neutra, programado, enviado, deduplicación y estado. |
| `export_snapshots` | Solicitante, alcance, filtros, versiones incluidas, hash raíz, archivo cifrado, caducidad y descargas. |
| `sync_operations` | UUID cliente, dispositivo, entidad, acción, versión base, payload cifrado, estado y conflicto. |
| `access_audit_logs` | Actor, acción, objeto opaco, resultado, dispositivo y fecha; sin contenido familiar. |
| `deletion_requests` | Solicitante, alcance, derechos contrapuestos, decisión, objetos, fallos y resultado verificable. |

Convenciones iniciales:

- ULID/UUID en cliente para operaciones offline; eventos compartidos append-only con correcciones enlazadas.
- Instantes en UTC más zona de origen; días escolares/festivos como fechas locales, no medianoches UTC.
- Cifrado de campo para mensajes, salud, escuela, contactos e importes; archivos cifrados y URLs temporales.
- Cada ocurrencia conserva el acuerdo y versión del motor que la generó; regenerar crea nueva versión, no altera exportaciones anteriores.
- Índices por menor/periodo, propuesta/estado, entrega/fecha, gasto/estado, hilo/fecha y sincronización/dispositivo/estado.
- El hash de exportación cubre manifiesto, orden cronológico, contenido seleccionado y anexos; una redacción produce un hash distinto.

## 5. Diferenciador frente a competencia

- **Acuerdo ejecutable sin fingir interpretación jurídica:** las partes configuran y aceptan reglas estructuradas; un PDF judicial no se convierte automáticamente en calendario.
- **Propuestas transaccionales:** cada intercambio congela antes/después, versión y aceptaciones; editarlo reinicia el consentimiento.
- **Hechos sin juez algorítmico:** las declaraciones discrepantes sobre una entrega conviven en el registro y la app no elige ganador.
- **Gastos sin deuda automática:** justificante, aceptación, reparto y pago se muestran por separado, evitando que una carga unilateral aparezca como obligación acordada.
- **Mensajería deliberadamente limitada:** los hilos por asunto y las respuestas estructuradas reducen ruido sin impedir conservar una comunicación relevante.
- **Tono preventivo bajo control del autor:** propone redacción neutral, preserva datos esenciales y nunca puntúa, sanciona o perfila a la otra parte.
- **Privacidad del menor por módulo:** ver el calendario no concede acceso implícito a salud, escuela, contactos, documentos o exportaciones.
- **Sin vigilancia:** la coordinación de entregas funciona con lugares acordados y confirmaciones manuales; no necesita rastrear al menor ni a los adultos.
- **Exportación verificable pero prudente:** cronología, versiones y hashes permiten detectar cambios, sin vender el informe como prueba certificada o resultado jurídico.

La métrica principal será el porcentaje de cambios de calendario resueltos mediante propuesta versionada antes del inicio afectado. Métricas de calidad: solapamientos no resueltos, respuestas a versión obsoleta bloqueadas, tiempo de resolución, entregas con declaraciones discrepantes, gastos por estado, accesos denegados correctamente y exportaciones reproducibles. No se optimizará por volumen de mensajes, detección de conflicto ni “puntuación de cooperación”.

## 6. Fases del roadmap

**Fase 0 — Límites legales, amenazas y modelo temporal**

- Formalizar acuerdo, patrón, regla, ocurrencia, propuesta, aceptación, excepción y declaración de entrega.
- Realizar evaluación de impacto RGPD reforzada para menores, conflicto familiar, documentos, exportaciones y dispositivos offline.
- Revisar jurídicamente textos sobre calendario, gastos, trazabilidad y valor de exportaciones; evitar promesas probatorias.
- Prototipar patrones semanales/quincenales, vacaciones y precedencias con calendarios nacionales, autonómicos, locales y escolares.

**Fase 1 — MVP de calendario offline-first**

- Espacio, menores, miembros, permisos, acuerdo estructurado y calendario materializado.
- Patrón semanal/quincenal, excepciones manuales, vacaciones/festivos versionados y lugares acordados.
- PWA offline con cola durable, UUID cliente, sincronización idempotente y conflictos explícitos.
- Salida: reproducir cada ocurrencia desde su acuerdo y operar varios días sin red.

**Fase 2 — Intercambios y entregas**

- Propuestas con vista antes/después, caducidad, contraoferta y aceptación por hash de versión.
- Entregas/recogidas con confirmaciones independientes e incidencias categorizadas.
- Notificaciones neutras y bloqueo de aceptación sobre versiones obsoletas.
- Salida: ninguna propuesta pendiente altera el calendario confirmado y ninguna discrepancia se sobrescribe.

**Fase 3 — Gastos extraordinarios**

- Solicitud, justificante redactable, reparto versionado, respuestas y pagos manuales.
- OCR opcional con confirmación, cifrado y eliminación de derivados.
- Exportación contable por estados sin etiquetar deuda ni incumplimiento.
- Revisión legal puntual de flujos y lenguaje antes de activar el módulo.

**Fase 4 — Escuela, salud, emergencias y mensajes**

- Registros con audiencia por elemento, documentos cifrados y tarjeta de emergencia offline.
- Hilos por asunto, intenciones estructuradas, cierre y correcciones enlazadas.
- Tono preventivo opt-in con comparación, aprobación humana, pruebas de preservación de fechas/importes y retención corta de borradores.
- Salida: el asistente nunca envía ni clasifica automáticamente contenido.

**Fase 5 — Exportación verificable**

- Cronología filtrable, manifiesto, anexos, redacciones, hash raíz y PDF/JSON.
- Zona horaria, versiones, autores, correcciones y procedencia visibles.
- Pruebas de reproducción, alteración, descarga temporal y auditoría.
- Validación con mediación y abogacía centrada en legibilidad y trazabilidad, no en garantizar admisibilidad.

**Fase 6 — Cumplimiento y producción**

- Verificar portabilidad, revocación, eliminación, copias de seguridad, cachés offline y derechos concurrentes sobre registros compartidos.
- Pruebas de autorización horizontal, invitaciones, archivos, notificaciones, exportaciones y pérdida de dispositivo.
- Accesibilidad WCAG 2.2 AA y pruebas iOS/Android, modo avión, cambios horarios y uso con estrés.
- Observabilidad separada para Laravel, PHP-FPM, colas, Redis, base de datos, archivos, notificaciones y sincronización, sin menores, mensajes ni importes en logs.
- Despliegue gradual condicionado a integridad del calendario, consentimiento versionado, permisos, exportaciones reproducibles y ausencia de vigilancia o perfilado parental.
