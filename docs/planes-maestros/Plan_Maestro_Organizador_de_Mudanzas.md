# Plan Maestro — Organizador de Mudanzas

## 1. Propósito y usuario objetivo

Aplicación que coordina una mudanza completa desde la vivienda de origen hasta la puesta en marcha del destino, incluyendo inventario, cajas, tareas, actas fotográficas y trámites posteriores en España. Su función es evitar omisiones y conservar evidencias organizadas; no sustituye asesoramiento jurídico, contractual o administrativo.

El usuario principal es una persona o unidad de convivencia que cambia de vivienda dentro de España, sola o con empresa de mudanzas. Debe cubrir alquiler y propiedad, mudanzas locales o entre comunidades autónomas y hogares con menores o mascotas, sin convertirse en portal inmobiliario, comparador de mudanceras ni gestoría.

Principios de producto:

- Mantener dos planes vinculados: logística física y trámites administrativos. Sus dependencias, responsables y pruebas de finalización son distintas.
- Generar el plan retroactivo desde una fecha objetivo y un contexto declarado, pero conservar como propuestas las fechas calculadas hasta que el usuario las confirme.
- Modelar origen y destino por separado; una tarea puede pertenecer al origen, destino, traslado o etapa posterior.
- Un trámite se considera realizado solo con confirmación y evidencia opcional del usuario; abrir un enlace o completar una checklist no acredita su efecto administrativo.
- Las guías españolas llevan ámbito estatal, autonómico, municipal o contractual, fuente oficial, versión y fecha de revisión.
- El inventario funciona con granularidad progresiva: habitación → caja → artículo destacado. No obliga a catalogar cada objeto.
- El QR identifica una caja mediante token opaco; no codifica dirección, contenido, valor, propietario ni teléfono.
- Las etiquetas `frágil`, `valor` y `abrir primero` son instrucciones domésticas, no tasación, seguro ni garantía de manipulación.
- Las actas fotográficas conservan originales, momento, autor, ubicación declarada y hash; no se presentan como acta notarial ni garantizan la devolución de la fianza.
- Las integraciones transfieren únicamente bienes o tareas seleccionados con consentimiento; nunca replican automáticamente todo el inventario o los documentos del hogar.

## 2. Dominios de backend

- **Identidad y hogares:** usuarios, unidades de convivencia, miembros, invitaciones y dispositivos. Permisos para administrar mudanza, inventario, tareas, actas, contratos e integraciones.
- **Mudanzas:** origen, destino, fecha objetivo, fecha efectiva, tipo de ocupación, alcance, estado y zona horaria. Admitir destino provisional o desconocido sin bloquear inventario.
- **Contexto español:** municipio/comunidad de origen y destino, alquiler/propiedad, menores, mascotas, vehículos, actividad profesional y suministros seleccionados. Solo se solicitan factores necesarios para generar el plan.
- **Motor de plan retroactivo:** plantillas, hitos, dependencias, ventanas y márgenes; produce fechas propuestas y explicación. Recalcular crea revisión y no mueve tareas confirmadas silenciosamente.
- **Catálogo de trámites:** empadronamiento, suministros, colegio, mascotas, fianza y otros cambios seleccionados; cada plantilla incluye condiciones de aplicabilidad, documentos habituales, canal y fuente versionada.
- **Fuentes oficiales y contractuales:** organismo, URL, ámbito, fecha de publicación/comprobación, vigencia y sustitución. Los pasos contractuales se etiquetan como dependientes del contrato, no como norma general.
- **Tareas:** logística o administrativa, ubicación, responsable, dependencias, fecha propuesta/confirmada, estado, checklist, evidencia y versión.
- **Asignaciones:** miembro responsable, colaboradores, aceptación, fecha y carga estimada. Reasignar deja trazabilidad y no borra trabajo registrado.
- **Suministros y contratos:** electricidad, gas, agua, telecomunicaciones, seguros y otros; estados de baja, traslado o alta, lecturas, referencias y comprobantes. No almacenar credenciales de proveedores.
- **Fianza y cierre de alquiler:** inventario de entrega, notificación, llaves, lecturas, desperfectos declarados, comunicaciones, liquidación y devolución parcial/total. La app no determina responsabilidad jurídica.
- **Habitaciones y zonas:** catálogo separado para origen y destino, mapeo entre ambos y prioridad de apertura.
- **Cajas:** código humano, QR opaco, origen, destino, estado, responsable, banderas y fotografías. El estado sigue `planificada`, `embalada`, `en_transito`, `entregada`, `abierta`, `incidencia`.
- **Inventario:** artículos individuales o grupos, cantidad aproximada, caja, propietario, habitación, estado y atributos. Los datos de valor son opcionales y cifrados.
- **Captura por voz y foto:** borradores locales/remotos según consentimiento, campos extraídos, confianza y confirmación. El audio y derivados OCR se eliminan por defecto tras validar.
- **Etiquetas imprimibles:** diseños en PDF, lote de impresión, versión, tamaño y tokens; reimprimir no cambia identidad de la caja.
- **Escaneo QR offline:** resolución mediante índice local del evento de mudanza; movimientos encolados con idempotencia para evitar marcar dos veces.
- **Actas fotográficas:** sesión de origen/destino y entrada/salida, estancias, fotos originales, anotaciones, orden, hash y manifiesto. Las correcciones se anexan y no sustituyen el original.
- **Documentos y medios:** almacenamiento cifrado, miniaturas, EXIF controlado, URLs temporales, retención y auditoría de descargas.
- **Integración con Control de Garantías:** evento consentido por bien seleccionado con nombre, marca/modelo, serie opcional, compra/garantía si existe y referencia de procedencia; fotos/documentos solo por selección explícita.
- **Integración con Bitácora de Mantenimiento:** alta propuesta de vivienda, ubicación o aparato y tareas iniciales seleccionadas; no convierte todas las cajas en activos mantenibles.
- **Integración con Control de Vencimientos:** evento `address_change_started` y candidatos de documento a revisar; la app receptora decide reglas y vencimientos. No se envían números ni escaneos.
- **Notificaciones:** tareas, dependencias desbloqueadas, días críticos y responsables, con horario silencioso y contenido neutro.
- **Sincronización offline:** UUID cliente, cola durable, control optimista y conflictos de dominio. Checks y escaneos QR se fusionan como eventos; cambios incompatibles de destino o responsable requieren revisión.
- **Exportación y archivo:** dossier de mudanza, inventario, etiquetas, actas, trámites y manifiesto; conservación configurable tras finalizar.
- **Auditoría y privacidad:** accesos, actas, documentos, cambios de responsable, exportaciones e integraciones. Los logs excluyen direcciones completas, contenido de cajas, valores y fotografías.

Reglas críticas:

- `due_at_proposed`, `due_at_confirmed` y `completed_at` son campos semánticamente distintos.
- Una tarea dependiente no se completa automáticamente al cerrar su predecesora; solo pasa a disponible.
- Una caja puede cambiar de habitación de destino sin regenerar su QR; el historial conserva cada movimiento.
- Escanear una caja en destino registra ubicación declarada por el usuario, no geolocalización física.
- Los artículos transferidos a otra app conservan ID de procedencia e idempotency key para impedir duplicados.
- Modificar un acta cerrada crea anexo con autor y fecha; el manifiesto cerrado nunca se sobrescribe.

## 3. Módulos de frontend

- **Alta de mudanza:** origen/destino, fecha objetivo, ocupación, composición del hogar y alcance; permite omitir dirección exacta y elegir municipio manualmente.
- **Panel de cuenta atrás:** hitos confirmados, bloqueos, carga por persona y decisiones pendientes; separa logística y administración.
- **Plan retroactivo:** lista y cronograma con `fecha sugerida → fecha confirmada`, dependencia, razón y margen; edición por lote sin perder excepciones.
- **Trámites españoles:** tarjetas por suministro, padrón, colegio, mascotas y fianza; ámbito, aplicabilidad, pasos, fuente y última revisión visibles.
- **Contratos y suministros:** decidir trasladar, dar de baja o contratar; lecturas de contador, cita, número de gestión y comprobante opcionales.
- **Inventario rápido:** foto, voz o texto; crea borrador de habitación/caja/artículos y muestra campos dudosos antes de guardar.
- **Cajas:** alta en dos toques, código grande, destino, frágil/valor/abrir primero y contenido resumido; impresión individual o por lote.
- **Escáner QR:** identifica caja offline y permite cambiar estado, destino o incidencia; confirmación reforzada si ya figura abierta o entregada.
- **Mapa origen–destino:** habitaciones en dos columnas y cajas asignadas; contador de pendientes, sin exigir plano físico.
- **Modo embalaje:** tareas y cajas de la habitación actual, botones grandes, cámara rápida y funcionamiento sin conexión.
- **Modo llegada:** prioriza `abrir primero`, suministros básicos y cajas por estancia; varios miembros pueden escanear simultáneamente.
- **Tareas compartidas:** responsables, aceptación, comentarios estructurados, dependencias y actividad; completar no borra quién la hizo.
- **Acta fotográfica:** guía por estancia y elemento, foto general/detalle, nota, medidor/llaves opcionales y revisión antes de cerrar.
- **Fianza:** checklist de salida, comunicaciones, deducciones declaradas, devolución y documentos; lenguaje neutral sin calcular derechos.
- **Dossier:** previsualización cronológica de acta, inventario, incidencias y comprobantes; exportación selectiva y redacción de datos.
- **Transferencias:** selecciona bienes/documentos/tareas, ve campos exactos y destino, confirma consentimiento y consulta estado.
- **Hogar y permisos:** miembros, módulos accesibles, dispositivos, actividad y revocación. Un ayudante puede escanear cajas sin ver contratos ni valores.
- **Estado offline:** paquete descargado, operaciones pendientes, conflictos y último sincronizado; etiquetas y escaneo funcionan en modo avión.

## 4. Modelo de datos inicial

| Entidad | Campos y decisiones específicas |
|---|---|
| `users` | Identidad del core, zona horaria, idioma y preferencias de accesibilidad. |
| `households` | Nombre, propietario, estado y política de retención/compartición. |
| `household_members` | Hogar, usuario, rol, capacidades, estado e invitador. |
| `moves` | Hogar, origen/destino, fecha objetivo/efectiva, tipo, contexto, estado y versión. |
| `move_places` | Mudanza, rol origen/destino, alias, municipio/comunidad, dirección cifrada opcional y precisión. |
| `rooms` | Lugar, nombre, tipo, planta opcional, orden y estado. |
| `room_mappings` | Habitación origen, habitación destino, regla por defecto y autor. |
| `plan_template_versions` | Código, contexto aplicable, tareas/dependencias, offsets, ámbito, fuentes, vigencia y versión. |
| `administrative_guide_versions` | Tipo, territorio, condiciones, pasos, documentos, fuente, revisado y publicado. |
| `official_sources` | Organismo, URL, ámbito, última comprobación, estado y sustituto. |
| `move_tasks` | Mudanza, módulo, tipo, lugar, fecha propuesta/confirmada, responsable, estado, prioridad y versión. |
| `task_dependencies` | Predecesora, sucesora, tipo, demora y estado; impedir ciclos al guardar. |
| `task_events` | Tarea, transición, actor, hora, dispositivo, nota y `operation_id`; append-only. |
| `utility_accounts` | Mudanza/lugar, categoría, proveedor, acción, referencia cifrada, estado y fechas. |
| `meter_readings` | Cuenta, fecha, valor/unidad, foto, actor y estado de revisión. |
| `deposit_cases` | Origen, arrendador/agencia cifrado opcional, importe, fechas, estado y resultado declarado. |
| `boxes` | Mudanza, código humano, token QR aleatorio, habitación origen/destino, estado, responsable y banderas. |
| `box_events` | Caja, acción, habitación, actor, hora, dispositivo y operación; fuente del historial. |
| `inventory_items` | Mudanza, caja opcional, nombre, grupo/cantidad, propietario, destino, valor cifrado opcional y estado. |
| `capture_drafts` | Voz/foto/texto, extractor/versión, campos, confianza, confirmación, retención y borrado. |
| `label_batches` | Mudanza, formato, cajas, versión de plantilla, PDF, hash e impreso. |
| `inspection_sessions` | Mudanza, lugar, tipo entrada/salida, fecha, participantes, estado y manifiesto cerrado. |
| `inspection_sections` | Sesión, estancia/elemento, orden, estado y observación. |
| `inspection_media` | Sección, original cifrado, hash, captura, autor, anotación y EXIF conservado/depurado. |
| `inspection_annexes` | Sesión cerrada, autor, fecha, motivo, contenido/medios y hash. |
| `source_documents` | Objeto cifrado, hash, MIME, audiencia, retención y estado. |
| `integration_consents` | Hogar, app destino, tipos/campos, finalidad, otorgado y revocado. |
| `integration_transfers` | Destino, recurso origen, payload versionado, idempotency key, estado, respuesta e intentos. |
| `notification_rules` | Usuario, tarea/tipo, antelación, canal, horario silencioso y estado. |
| `sync_operations` | UUID cliente, dispositivo, entidad, acción, versión base, estado y conflicto. |
| `export_snapshots` | Mudanza, alcance, filtros, manifiesto, hash, archivo, caducidad y descargas. |
| `audit_logs` | Actor, acción, objeto opaco, resultado y fecha; sin dirección, inventario ni documentos. |

Convenciones iniciales:

- ULID/UUID generado en cliente para cajas, artículos, tareas, eventos y operaciones offline.
- Tokens QR aleatorios y rotables; el código humano es distinto y solo necesita ser único dentro de la mudanza.
- Instantes en UTC más zona de origen; fechas administrativas como fechas locales con ámbito.
- Fotografías y documentos fuera de la base de datos, cifrados y servidos con URLs temporales.
- Inventario y valores protegidos mediante permisos y cifrado de campo; no se incluyen en analítica de producto.
- Índices por mudanza/estado/fecha, caja/token, caja/destino/estado, tarea/responsable/estado e integración/idempotencia.

## 5. Diferenciador frente a competencia

- **Continuidad origen–destino:** la misma caja conserva contenido, ubicación de salida, destino, movimientos y estado de apertura; no son dos listas desconectadas.
- **Plan español versionado:** padrón, colegio, mascotas, suministros y fianza se activan por contexto y territorio con fuente y revisión, no mediante checklist nacional rígida.
- **Fechas bajo control humano:** el motor explica el cálculo retroactivo, pero el usuario confirma cada compromiso y conserva cambios posteriores.
- **Inventario con granularidad útil:** permite registrar solo cajas y artículos de valor/interés, evitando que la preparación dependa de catalogar toda la vivienda.
- **QR privado y offline:** la etiqueta no expone contenido ni dirección y el índice local permite trabajar en trasteros, ascensores o viviendas sin cobertura.
- **Actas resistentes a ediciones invisibles:** originales, hashes, manifiesto y anexos conservan trazabilidad sin vender una falsa certificación legal.
- **Permisos operativos:** un ayudante puede embalar y escanear sin conocer contratos, fianza, valores o documentación familiar.
- **Trámites como resultados verificables:** visitar una web no completa una tarea; se registran número de gestión, comprobante o confirmación elegida.
- **Ecosistema con transferencia mínima:** Garantías, Mantenimiento y Vencimientos reciben solo elementos seleccionados, con procedencia y deduplicación.

La métrica principal será el porcentaje de tareas críticas confirmadas y resueltas antes de su fecha objetivo, separado entre logística y administración. Métricas de calidad: cajas localizadas sin búsqueda manual, duplicados por QR, tareas bloqueadas, capturas corregidas, conflictos offline, actas cerradas con cobertura y transferencias sin duplicados. No se optimizará por número de artículos catalogados ni por volumen de notificaciones.

## 6. Fases del roadmap

**Fase 0 — Modelo de mudanza y gobierno de guías**

- Formalizar lugar, fase, tarea, dependencia, fecha propuesta/confirmada, caja, bien, acta y transferencia.
- Crear matriz española de contexto y fuentes con ámbito, vigencia, revisión y responsable editorial.
- Probar grafo retroactivo con cambios de fecha, tareas vencidas, destino desconocido y dependencias cíclicas.
- Realizar análisis de amenazas sobre direcciones, inventario, valores, fotografías, QR, cuidadores e integraciones.

**Fase 1 — MVP logístico offline-first**

- Mudanza, origen/destino, habitaciones, fecha, plan manual y tareas compartidas.
- Cajas, QR imprimible, asignación de destino, banderas y escaneo offline.
- Inventario básico por texto/foto y cola durable con UUID e idempotencia.
- Salida: embalar, transportar y abrir durante varios días sin conectividad y sin duplicar movimientos.

**Fase 2 — Plan retroactivo y trámites españoles**

- Plantillas versionadas, motor de fechas explicable, dependencias y confirmación humana.
- Suministros, empadronamiento, colegio, mascotas y fianza por contexto/territorio.
- Consola editorial, revisión de fuentes, enlaces rotos y publicación por versiones.
- Salida: cambiar la fecha propone un nuevo plan sin mover silenciosamente tareas confirmadas.

**Fase 3 — Captura avanzada y convivencia**

- Voz/foto con borrador, confianza, confirmación y borrado de derivados.
- Roles, aceptación de tareas, carga por miembro y resolución de conflictos.
- Etiquetas por lotes, formatos de impresión y reimpresión sin cambiar tokens.
- Pruebas con una mano, guantes, baja luz, cámara y dispositivos antiguos.

**Fase 4 — Actas y fianza**

- Sesiones guiadas de entrada/salida, estancias, originales, hashes y manifiesto.
- Anexos inmutables, dossier y redacción de datos antes de compartir.
- Flujo de fianza y comunicaciones con lenguaje neutral y revisión legal puntual.
- Salida: una sesión cerrada es reproducible y cualquier cambio posterior aparece como anexo.

**Fase 5 — Integraciones del hogar**

- Contratos de eventos con Control de Garantías, Bitácora de Mantenimiento y Control de Vencimientos.
- Consentimiento por transferencia, vista previa de campos, procedencia, idempotencia, reintentos y desconexión.
- Pruebas de duplicados, fallos parciales, versiones incompatibles y borrado en origen.
- Salida: ninguna integración consulta directamente la base de datos de otra app.

**Fase 6 — Producción y cierre de mudanza**

- Archivo, exportación, retención o eliminación guiada al finalizar; conservar solo lo elegido para la vivienda nueva.
- RGPD: direcciones, convivientes, menores, voz, fotografías, documentos, encargados y derechos.
- Seguridad: autorización horizontal, tokens QR, archivos, EXIF, exportaciones y dispositivos perdidos.
- Accesibilidad WCAG 2.2 AA y pruebas iOS/Android, modo avión, cámara, impresión y almacenamiento limitado.
- Observabilidad separada para Laravel, PHP-FPM, colas, Redis, base de datos, OCR/voz, archivos, integraciones y sincronización, sin datos domésticos en logs.
- Despliegue gradual condicionado a integridad offline, fuentes vigentes, actas reproducibles y transferencias minimizadas.
