# Plan Maestro — Diario de Lactancia y Crianza

## 1. Propósito y usuario objetivo

Diario compartido de cuidados del bebé diseñado para registrar de noche con el mínimo esfuerzo y entregar un relevo fiable entre cuidadores. Describe lo ocurrido y facilita preparar una consulta; no evalúa el estilo de crianza, no diagnostica y no sustituye las indicaciones del equipo pediátrico.

El usuario principal es la persona progenitora o tutora que registra lactancia, biberones, extracción, sueño, pañales, medicación e hitos durante los primeros años. Puede invitar a pareja, familiares o cuidadores con acceso limitado y revocable. El bebé es sujeto de los datos, no titular de una cuenta ni objetivo publicitario.

Principios de producto:

- Registrar un evento útil en dos toques desde la pantalla nocturna; notas, cantidades y contexto son ampliaciones opcionales.
- Mantener temporizadores activos mediante tiempo de inicio persistido y reloj monotónico/local reconciliado; no depender de un proceso JavaScript vivo en segundo plano.
- Separar evento observado, dato corregido, resumen derivado y comentario del cuidador; una edición no borra quién registró originalmente el hecho.
- No puntuar tomas, sueño, pañales, hitos, lactancia materna, mixta o artificial ni compararlos con un “bebé ideal”.
- Las tendencias muestran conteos, duraciones y distribución temporal junto con cobertura del registro; nunca usan ausencia de datos como ausencia del evento.
- La medicación es un registro de administración basado en una pauta introducida o documentada por el cuidador; la app no propone dosis, intervalos ni tratamientos.
- El modo simplificado reduce tipos visibles, cifras, gráficas y recordatorios, pero conserva acceso a exportación, privacidad y ayuda urgente.
- Toda correlación con el Diario de Sueño exige consentimiento independiente de la persona adulta, rango temporal y variables seleccionadas; no se comparte la ficha del bebé ni se infiere causalidad.
- No usar datos de menores para publicidad comportamental, venta de perfiles ni entrenamiento de modelos generales.

## 2. Dominios de backend

- **Identidad y unidad familiar:** usuarios adultos, familias, miembros, invitaciones y dispositivos. Ningún menor inicia sesión ni recibe credenciales propias en el alcance inicial.
- **Autoridad y relación con el menor:** progenitor/tutor, cuidador autorizado y profesional receptor de exportación. La aplicación registra la declaración y su fecha sin pretender verificar por sí sola la patria potestad.
- **Perfiles infantiles:** alias, fecha de nacimiento con precisión controlada, zona horaria y preferencias; nombre legal, fotografía y datos sanitarios son opcionales.
- **Autorización granular:** permisos por bebé y capacidad: ver cronología, registrar, corregir, administrar medicación, gestionar stock, exportar, invitar y eliminar. Un rol familiar global no concede automáticamente todas las capacidades.
- **Registro de eventos:** modelo append-only para toma, extracción, biberón, sueño, pañal, medicación, hito y nota. Las correcciones generan revisión o anulación trazable.
- **Sesiones temporizadas:** máquina de estados `running`, `paused`, `completed`, `discarded` con eventos idempotentes. Lactancia permite segmentos por lado; sueño y extracción usan segmentos específicos sin reutilizar semántica incorrecta.
- **Lactancia:** inicio/fin, lado izquierdo/derecho/ambos/no indicado, cambios de lado y observación opcional. La duración se deriva de segmentos, no de un contador mutable.
- **Extracción y stock de leche:** sesiones de extracción, lotes, volumen, fecha/hora, estado, ubicación, consumos, descartes y ajustes. No mezclar volumen extraído con volumen ingerido.
- **Biberones:** contenido declarado —leche extraída, fórmula, mixto u otro indicado—, preparado/ofrecido/consumido opcional y unidad. Las cantidades nunca son obligatorias.
- **Sueño:** inicio, fin, despertares opcionales, ubicación libre y método de entrada; no calcula “calidad” clínica ni emite recomendaciones de sueño seguro no verificadas como personalización.
- **Pañales:** hora y tipo configurable; color, consistencia, observación o foto solo bajo acción explícita y con sensibilidad reforzada.
- **Medicación:** catálogo privado, concentración textual, pauta de referencia opcional y administraciones. Barreras contra duplicado, pero ninguna validación debe presentarse como garantía clínica.
- **Hitos:** categorías libres, fecha aproximada, nota y medios; sin ranking por edad ni mensajes de retraso/adelanto.
- **Turnos y relevos:** inicio/fin, cuidador responsable, ámbito, eventos desde el relevo anterior, tareas declaradas y confirmación de recepción. El resumen automático es extractivo y enlaza a los eventos fuente.
- **Voz:** grabación o transcripción local/remota según consentimiento; siempre muestra borrador y exige confirmar tipo, hora, cantidades y medicación. Audio efímero por defecto.
- **Tendencias descriptivas:** agregados con denominador de cobertura, zona horaria y filtros; las métricas derivadas son regenerables y nunca sustituyen el histórico.
- **Exportación pediátrica:** periodo, categorías, zona horaria, correcciones, medicación y notas elegidas; PDF legible más CSV/JSON estructurado. Debe declarar que son datos registrados por cuidadores.
- **Interoperabilidad con Diario de Sueño:** contrato de eventos asíncronos minimizados, pseudónimos por integración, consentimiento revocable e instantáneas, no acceso directo entre bases de datos.
- **Privacidad infantil:** consentimiento/legitimación documentada, minimización, retención configurable, control de exportaciones, revocación de cuidadores y eliminación total verificable.
- **Sincronización offline:** IDs cliente, cola durable, operaciones idempotentes, control optimista y resolución de simultaneidad. Los eventos concurrentes se conservan; no se deduplican solo por proximidad temporal.
- **Notificaciones:** recordatorios y avisos de turno con texto neutro en pantalla bloqueada; la medicación no activa recomendaciones predeterminadas.
- **Auditoría:** accesos, exportaciones, invitaciones, cambios de permiso, correcciones, eliminaciones e integración. Logs técnicos sin nombres, notas, medicación ni contenido de voz.

Reglas críticas:

- Una sesión se considera completada solo tras `completed_at`; el servidor calcula duración desde los segmentos válidos y conserva posibles incoherencias del reloj para revisión.
- Dos tomas registradas por cuidadores distintos no se fusionan automáticamente. Se marcan como posible duplicado y se decide si fueron una sola actividad o dos.
- El stock se modifica mediante movimientos inmutables; nunca actualizando un volumen sin historial.
- Una administración de medicación requiere medicamento, hora efectiva y actor; dosis/unidad pueden ser obligatorias solo si la familia configuró ese medicamento para registrarlas.
- El borrado del perfil inicia una cascada explícita sobre eventos, medios, derivados, exportaciones almacenadas, dispositivos e integraciones, con informe final de alcance.

## 3. Módulos de frontend

- **Pantalla nocturna:** fondo oscuro real, brillo visual reducido, cuatro acciones configurables, botones grandes, confirmación háptica opcional y ausencia de gráficas o mensajes motivacionales.
- **Temporizador persistente:** actividad, tiempo transcurrido derivado, cambio de lado, pausa y finalización. Al reabrir la PWA reconstruye el estado y pregunta ante saltos horarios o sesiones anormalmente largas.
- **Registro rápido:** lactancia, biberón, extracción, sueño, pañal, medicación, hito o nota; recuerda preferencias de interfaz, no valores clínicos ni dosis anteriores como propuesta automática.
- **Captura por voz:** pulsar-hablar-revisar-confirmar; resalta campos sensibles y ambigüedades como “a las dos”, “dos mililitros” o nombres parecidos.
- **Lactancia:** segmentos por lado, última toma y corrección rápida. “Último lado” es información, no instrucción sobre cuál usar.
- **Extracción y almacén:** entrada de lote, ubicación, caducidad elegida por el usuario, movimientos y saldo trazable; permite consumir parcialmente o descartar con motivo opcional.
- **Biberón:** contenido y cantidades opcionales; distingue preparado, ofrecido y consumido para no convertir el sobrante en ingesta.
- **Sueño y pañal:** temporizador/manual para sueño y botones neutros para pañal; campos ampliados permanecen ocultos salvo activación.
- **Medicación:** administración desde una pauta previamente introducida, aviso de registro cercano y confirmación reforzada. Botón visible para indicar “no sé/no se administró” sin falsear cumplimiento.
- **Cronología:** secuencia por bebé y zona horaria, filtros, autor, fuente de captura y correcciones. Los eventos anulados quedan identificados en auditoría y fuera de totales.
- **Turnos:** quién está a cargo, inicio, tareas declaradas y relevo. La responsabilidad es informativa y no bloquea que otro cuidador registre una urgencia.
- **Resumen de relevo:** desde una hora elegida, lista tomas, sueño, pañales, medicación y notas relevantes con enlaces; el receptor confirma lectura sin certificar exactitud clínica.
- **Tendencias:** conteos, duraciones, franjas y stock con días incompletos marcados; sin semáforos normativos, percentiles ni mensajes de culpa.
- **Modo simplificado:** elige hasta cuatro registros, oculta tendencias y cantidades no usadas, reduce navegación y puede activarse por usuario/dispositivo sin afectar los datos familiares.
- **Exportación para consulta:** periodo, categorías y nivel de detalle; previsualización para excluir notas/fotos antes de generar PDF, CSV o JSON.
- **Familia y permisos:** miembros, relación declarada, acceso por bebé, dispositivos y actividad reciente; revocación accesible en un toque.
- **Privacidad y borrado:** mapa de datos, consentimientos, exportaciones, retención de voz/medios, integración, portabilidad y eliminación con impacto explicado.
- **Integración con Diario de Sueño:** selector de variables y periodo, pantalla de consentimiento y vista de correlaciones descriptivas con advertencia explícita de no causalidad.
- **Estado offline:** cambios pendientes, último sincronizado y conflictos; nunca mostrar una operación local como sincronizada si el servidor aún no la confirmó.

## 4. Modelo de datos inicial

| Entidad | Campos y decisiones específicas |
|---|---|
| `users` | Identidad adulta del core, `locale`, `timezone` y preferencias por dispositivo. |
| `families` | Nombre, propietario, estado, política de retención y versión. |
| `family_members` | Familia, usuario, rol operativo, relación declarada, estado, invitador y vigencia. |
| `children` | Familia, alias, nacimiento opcional con precisión, zona horaria, estado y creador; sin cuenta propia. |
| `child_permissions` | Menor, miembro, capacidades explícitas, otorgante, vigencia y revocación. |
| `legal_basis_records` | Menor/familia, base declarada, finalidad, versión de aviso, actor, fecha y revocación/aplicabilidad. |
| `care_events` | Menor, tipo, hora efectiva, zona, autor, dispositivo, fuente, estado, `supersedes_id?` y `operation_id`. |
| `timed_sessions` | Evento, tipo, inicio, fin, estado, reloj origen, desviación detectada y versión. |
| `session_segments` | Sesión, tipo/lado, inicio, fin, orden, origen y estado; base de la duración calculada. |
| `feeding_details` | Evento, método, contenido, ofrecido/consumido opcional, unidad y observación estructurada. |
| `pumping_sessions` | Evento, volumen total opcional, unidad y detalles; no altera stock directamente. |
| `milk_batches` | Menor/familia, origen, extraído, volumen inicial, unidad, ubicación, etiqueta, estado y versión. |
| `milk_stock_movements` | Lote, tipo (`add`, `consume`, `discard`, `adjust`), volumen, hora, evento relacionado, actor y operación. |
| `sleep_details` | Evento, inicio/fin derivados, despertares opcionales y contexto libre. |
| `diaper_details` | Evento, tipo configurable y atributos opcionales cifrados/estructurados. |
| `medications` | Menor, alias, presentación/concentración textual, instrucciones aportadas, origen y estado. |
| `medication_administrations` | Evento, medicamento, dosis/unidad opcional según configuración, administrado y nota. |
| `milestones` | Evento, categoría libre, fecha con precisión, título y nota; sin edad normativa. |
| `care_shifts` | Menor, cuidador, inicio, fin, estado, ámbito, entrega y recepción. |
| `handover_summaries` | Turno/rango, versión, eventos incluidos, texto estructurado, generado y confirmado por receptor. |
| `media_assets` | Propietario, objeto, almacenamiento cifrado, hash, MIME, fecha, retención y estado; EXIF sensible eliminado. |
| `voice_captures` | Usuario, dispositivo, audio efímero, transcripción, motor/versión, consentimiento, confirmación y borrado. |
| `trend_runs` | Menor, periodo, zona, eventos/horas cubiertas, fórmula, versión y resultado regenerable. |
| `export_jobs` | Solicitante, menor, periodo, categorías, formato, archivo cifrado, caducidad y descargas. |
| `integration_consents` | Usuario adulto, destino, variables, periodo, finalidad, versión de texto, otorgado y revocado. |
| `integration_outbox` | Evento minimizado, pseudónimo destino, consentimiento, idempotency key, estado e intentos. |
| `sync_operations` | UUID cliente, dispositivo, entidad, acción, versión base, payload cifrado, estado y conflicto. |
| `possible_duplicates` | Dos eventos, regla, puntuación, estado, resolución, actor y fecha; nunca elimina automáticamente. |
| `access_audit_logs` | Actor, acción, menor/objeto, resultado, dispositivo, fecha e IP minimizada; sin payload sensible. |
| `deletion_jobs` | Alcance, solicitante, comprobación de autoridad, fases, objetos eliminados, fallos y certificado final. |

Convenciones iniciales:

- ULID/UUID en cliente para eventos, segmentos, movimientos y operaciones offline.
- Instantes en UTC más zona horaria de origen; fecha de nacimiento admite precisión `day`, `month`, `year` o desconocida.
- Cronología append-only: editar crea revisión; anular cambia estado y deja evidencia mínima.
- Medios y exportaciones fuera de la base de datos, cifrados y con URLs temporales; sus nombres no contienen nombres del menor.
- Cifrado de campos para notas médicas, medicación y otros datos especialmente sensibles; separación de claves por familia cuando sea viable.
- Índices por menor/hora/tipo, sesión/estado, stock/lote, turno/estado y sincronización/dispositivo/estado.
- Los agregados no sobreviven al borrado de sus eventos fuente: deben invalidarse y regenerarse o eliminarse.

## 5. Diferenciador frente a competencia

- **Diseño nocturno como requisito técnico:** la sesión persiste aunque el navegador suspenda la PWA; no es solo una paleta oscura aplicada a un cronómetro frágil.
- **Relevo verificable:** cada resumen enlaza a eventos, autores y correcciones, evitando mensajes de chat incompletos entre cuidadores cansados.
- **Neutralidad de crianza estructural:** no existe una puntuación global del bebé, racha de lactancia, objetivo universal ni comparación normativa escondida en notificaciones.
- **Registro honesto de ingesta y stock:** diferencia extraído, almacenado, preparado, ofrecido y consumido; no transforma cantidades aproximadas en balances exactos.
- **Permisos centrados en el menor:** ser miembro de la familia no implica poder ver medicación, exportar el histórico o invitar a terceros.
- **Voz con confirmación reforzada:** la transcripción nunca crea silenciosamente una administración o cantidad; conserva ambigüedad hasta validación humana.
- **Tendencias con cobertura:** un día sin registrar aparece como incompleto y no como cero tomas, cero pañales o sueño inexistente.
- **Portabilidad real:** PDF para lectura clínica y CSV/JSON para reutilización; las correcciones y zonas horarias viajan con los datos.
- **Interoperabilidad minimizada:** la correlación con el sueño adulto usa eventos seleccionados y pseudónimos, no una base familiar compartida entre aplicaciones.

La métrica principal será el porcentaje de eventos nocturnos completados sin corrección posterior de tipo u hora. Métricas de calidad: recuperación de temporizadores, operaciones offline sin pérdida, duplicados no resueltos, tiempo de relevo, exportaciones generadas, revocaciones efectivas y borrados completos. No se optimizará por cantidad de registros, duración de lactancia ni cumplimiento de una pauta de crianza.

## 6. Fases del roadmap

**Fase 0 — Límites clínicos, privacidad y modelo de eventos**

- Formalizar evento, sesión, segmento, corrección, duplicado, turno, resumen y movimiento de stock.
- Realizar evaluación de impacto de protección de datos centrada en menores, cuidadores, voz, medios, exportación e integraciones.
- Prototipar pantalla nocturna y probarla con una mano, baja luminosidad, fatiga y lector de pantalla.
- Definir fuera de alcance: diagnóstico, recomendaciones de dosis, percentiles, alertas clínicas automáticas y consejos personalizados de crianza.

**Fase 1 — MVP nocturno offline-first**

- Familia, perfil mínimo, permisos básicos y registro de lactancia, biberón, sueño y pañal.
- Temporizador persistente con segmentos, restauración tras cierre y manejo de cambios de reloj.
- Cronología, corrección trazable, modo simplificado e IndexedDB con cola idempotente.
- Pruebas de cierre forzado, batería agotada, varios días offline y doble toque.
- Salida: ninguna sesión confirmada se pierde o duplica tras reabrir y sincronizar.

**Fase 2 — Extracción, stock y medicación**

- Lotes y movimientos inmutables de leche; consumos parciales, descartes y ajustes.
- Medicamentos privados y administraciones con confirmación reforzada y detección prudente de posibles duplicados.
- Hitos y medios opcionales con cifrado, EXIF depurado y retención configurable.
- Revisión especializada de textos para que las barreras de seguridad no parezcan prescripción.

**Fase 3 — Hogar compartido, turnos y voz**

- ACL completa por bebé, invitaciones, revocación, dispositivos y auditoría visible.
- Turnos, resumen extractivo y confirmación de relevo; conflictos concurrentes conservados.
- Voz con consentimiento, borrado temprano del audio y revisión obligatoria de campos sensibles.
- Salida: dos cuidadores offline pueden registrar y después resolver duplicados sin pérdida de evidencia.

**Fase 4 — Tendencias y exportación**

- Agregados descriptivos con cobertura, zona horaria, filtros y días incompletos.
- PDF para consulta y CSV/JSON portable con previsualización y exclusiones.
- Exportaciones cifradas, caducidad, auditoría de descargas y eliminación automática.
- Validación con pediatría y familias limitada a legibilidad y fidelidad del registro, no a generar conclusiones clínicas.

**Fase 5 — Integración con Diario de Sueño**

- Contrato asíncrono, pseudónimos por destino, allowlist de variables y consentimiento por periodo.
- Correlaciones descriptivas con tamaño de muestra, cobertura y texto de no causalidad.
- Revocación que detiene nuevos envíos y elimina derivados controlados por ambas aplicaciones según su registro de procedencia.
- Salida: ninguna integración puede consultar directamente la base de datos de la otra app.

**Fase 6 — Cumplimiento y producción**

- Verificar portabilidad, eliminación total, copias de seguridad, cachés offline, exportaciones, medios e integraciones mediante pruebas automatizadas de alcance.
- Revisión RGPD española/europea: bases jurídicas, transparencia por capas, derechos, encargados, transferencias y plazos de conservación, con atención reforzada a menores.
- Accesibilidad WCAG 2.2 AA, pruebas iOS/Android, teclado, lector de pantalla, modo nocturno y dispositivos antiguos.
- Pruebas de autorización horizontal, revocación offline, URLs de medios, notificaciones bloqueadas, cifrado y filtraciones por logs.
- Observabilidad separada para Laravel, PHP-FPM, colas, Redis, base de datos, medios, voz, exportaciones y sincronización, sin contenido infantil en telemetría.
- Despliegue gradual condicionado a recuperación de sesiones, integridad de eventos, revocación, borrado y ausencia de mensajes prescriptivos.
