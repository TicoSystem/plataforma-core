# Plan Maestro — Control de Vencimientos de Documentos

## 1. Propósito y usuario objetivo

Calendario documental privado para anticipar renovaciones de personas, vehículos, actividad profesional y mascotas en España. Su función es recordar, organizar y enlazar fuentes oficiales; no sustituye al documento original, acredita su validez ni garantiza que un trámite siga sin cambios.

El usuario principal es una persona adulta que coordina documentos propios o de su hogar y hoy depende de calendarios genéricos, fotografías dispersas o avisos tardíos. El producto debe servir igualmente a hogares unipersonales, familias, residentes extranjeros y autónomos con licencias profesionales, sin convertirse en gestoría ni repositorio documental empresarial.

Decisiones de alcance:

- Guardar por defecto únicamente tipo, titular, ámbito, fecha de expedición opcional, fecha de vencimiento y estado de renovación.
- Pedir número completo y escaneo solo cuando el usuario active esas funciones; ninguna plantilla puede convertirlos en obligatorios por conveniencia técnica.
- Separar `vencimiento legal`, `fecha objetivo de iniciar el trámite`, `recordatorios` y `renovación confirmada`.
- No calcular una nueva caducidad hasta que el usuario confirme la renovación e introduzca o valide la nueva fecha.
- Mostrar los requisitos como guía versionada con fuente y fecha de revisión, no como asesoramiento jurídico ni promesa de cita disponible.
- Adaptar cada guía al documento y, cuando proceda, a nacionalidad, edad, comunidad autónoma, municipio, profesión o situación administrativa; si falta contexto, declarar que la guía es parcial.
- Usar exclusivamente dominios oficiales aprobados para enlaces de trámite y advertir antes de abandonar la app.
- No enviar copias de documentos a integraciones. La conexión con Organizador de Mudanzas comunica tareas y referencias opacas, nunca escaneos ni números completos.

Plantillas iniciales: DNI, pasaporte español, TIE, NIE como identificador sin caducidad propia cuando corresponda, permiso de conducir, ITV por vehículo, seguro del vehículo, certificados digitales, licencias profesionales configurables y documentación de mascotas. La interfaz no debe presentar NIE y TIE como documentos equivalentes ni asumir que todos los certificados, licencias o pasaportes comparten reglas.

## 2. Dominios de backend

- **Identidad y hogares:** cuentas, hogares, miembros e invitaciones. Roles domésticos globales no conceden acceso automático a todos los documentos.
- **Sujetos documentales:** personas, vehículos, mascotas y actividades profesionales. El titular puede no ser usuario de la app; debe existir base de autorización declarada por quien lo administra.
- **Registro documental:** instancia concreta de un documento, tipo, emisor, jurisdicción, fechas, estado y titular. Identificadores sensibles viven fuera del registro ordinario.
- **Catálogo de plantillas:** definición versionada de campos, validaciones, ámbitos, plazos orientativos y contexto necesario. Las versiones publicadas son inmutables para reproducir qué guía vio el usuario.
- **Motor de vencimientos:** deriva fecha objetivo y avisos desde la fecha legal, la plantilla vigente y la antelación elegida. Nunca modifica la fecha legal ni marca una renovación como completada.
- **Guías de renovación:** pasos ordenados, canal presencial/online, documentación habitual, costes solo si están verificados, organismo competente y enlaces oficiales. Cada contenido incluye territorio, vigencia, fecha de comprobación y responsable editorial.
- **Registro de fuentes oficiales:** lista permitida de hosts, URL canónica, organismo, última comprobación, resultado HTTP y reemplazo conocido. Los enlaces rotos o no verificados se despublican sin borrar la versión histórica.
- **Alertas y notificaciones:** secuencias por documento, hitos relativos, zona horaria, aplazamientos, horario silencioso y destinatarios autorizados. El contenido visible en bloqueo será neutro por defecto.
- **Flujo de renovación:** estados `no_iniciada`, `preparando`, `cita_solicitada`, `en_tramite`, `renovada_pendiente_de_datos`, `completada` y `descartada`; checklist y notas sin inferir que una cita equivale a renovación.
- **Confirmación y sustitución:** cerrar la versión anterior, crear la nueva instancia o versión documental y recalcular avisos solo tras confirmación explícita. Conservar trazabilidad entre documento anterior y renovado.
- **Secretos documentales:** números completos cifrados a nivel de campo, últimos caracteres opcionales para identificación y búsquedas mediante token ciego cuando sea imprescindible.
- **Escaneos cifrados:** carga opcional, cifrado antes de persistencia, claves envueltas por hogar/usuario, miniaturas protegidas y descarga temporal autenticada. OCR, si se añade, requiere consentimiento independiente y eliminación programada de derivados.
- **Autorización por documento:** ACL con permisos `ver_metadatos`, `ver_identificador`, `ver_escaneo`, `editar`, `gestionar_alertas` y `compartir`; denegación por defecto y revocación inmediata en servidor.
- **Privacidad de presentación:** servicio que enmascara números, nombres y títulos de notificación según contexto. Los logs y la analítica reciben IDs opacos, nunca números ni nombres de archivo originales.
- **Integración con mudanzas:** eventos asíncronos `address_change_started`, `document_review_requested` y `document_update_resolved`; allowlist de tipos afectados, consentimiento por exportación e idempotencia.
- **Exportación y borrado:** exportación de metadatos, guías y auditoría; escaneos en paquete separado. Borrado criptográfico cuando proceda, revocación de enlaces y política de retención explícita.
- **Sincronización offline:** cola durable, UUID cliente, control optimista y operaciones idempotentes. Los metadatos pueden trabajar offline; los escaneos solo se cachean en dispositivos marcados como confiables y con almacenamiento seguro disponible.
- **Auditoría:** accesos a identificadores y escaneos, cambios de permisos, exportaciones, renovaciones y eventos enviados a otras apps. El propio usuario puede consultar esta actividad.

Reglas de dominio no negociables:

- `expires_on` es un dato confirmado; una plantilla puede sugerirlo durante el alta, pero debe quedar pendiente hasta validación humana.
- Un documento sin caducidad conocida admite seguimiento por revisión periódica sin inventar una fecha de vencimiento.
- Los plazos orientativos pertenecen a una versión de guía y no se recalculan retrospectivamente sobre alertas ya aceptadas sin informar al usuario.
- La pérdida de permiso corta acceso online y purga el contenido protegido del dispositivo cuando vuelva a sincronizar; se comunica que no puede garantizarse el borrado de copias externas previamente exportadas.
- Una notificación contiene “Tienes un vencimiento próximo” salvo que el usuario autorice mostrar tipo y titular en ese dispositivo.

## 3. Módulos de frontend

- **Panel de próximos vencimientos:** vistas `acción necesaria`, `próximos`, `en trámite` y `sin fecha`. Agrupa por urgencia operativa, no solo por fecha legal.
- **Alta guiada:** selección de titular y plantilla; formulario mínimo con fecha y tipo. Los campos de número, fotografía y escaneo aparecen como opciones separadas con explicación de privacidad.
- **Ficha del documento:** metadatos, visibilidad, alertas, guía aplicable, estado de renovación e historial. El número se muestra enmascarado y requiere revelado temporal.
- **Calendario:** mes y agenda con fecha objetivo, citas registradas, recordatorios y vencimiento legal diferenciados por etiqueta e icono, no únicamente por color.
- **Configurador de alertas:** presets específicos de la plantilla más edición libre; permite hitos múltiples, responsable, canal, horario silencioso y aviso de contingencia si queda poco margen.
- **Guía de renovación:** pasos verificables, contexto territorial, documentos habituales, organismo, enlace oficial, fecha de última revisión y aviso de comprobar requisitos antes de tramitar.
- **Modo trámite:** checklist, cita, justificantes opcionales y notas. Una acción rápida marca `cita solicitada` o `en trámite`, nunca `renovado` de forma implícita.
- **Confirmación de renovación:** solicita nueva fecha de expedición/vencimiento, permite sustituir escaneo y muestra qué alertas se archivarán y cuáles se crearán.
- **Bóveda opcional:** captura/importación de escaneo, estado de cifrado, dispositivos con copia offline, eliminación y control de descargas. Sin galería global de miniaturas por defecto.
- **Hogar y permisos:** matriz por documento y miembro; presets `solo avisos`, `gestionar renovación` y `acceso completo`, desplegados en permisos explícitos antes de confirmar.
- **Sujetos:** fichas de personas, vehículos y mascotas con sus documentos, pero sin exponer automáticamente a todos los miembros que puedan ver el sujeto.
- **Centro de privacidad:** ocultación en pantalla, contenido de notificaciones, dispositivos confiables, accesos recientes, exportaciones y eliminación.
- **Integración con mudanzas:** revisión consentida de documentos posiblemente afectados; el usuario selecciona cuáles enviar como tareas y ve exactamente los metadatos transferidos.
- **Estado offline:** indica cambios pendientes y última sincronización. La app bloquea la apertura offline de un escaneo si el dispositivo no cumple la política local, sin impedir consultar metadatos autorizados.
- **Administración editorial interna:** publicación en dos pasos de plantillas y guías, comparación de versiones, validación de hosts oficiales y cola de revisiones por caducidad del contenido.

## 4. Modelo de datos inicial

| Entidad | Campos y decisiones específicas |
|---|---|
| `users` | Identidad del core, `locale`, `timezone`, preferencias de privacidad de notificaciones. |
| `households` | `id`, nombre, propietario, estado y versión; límite comercial por hogar. |
| `household_members` | hogar, usuario, rol, estado, invitador y fechas; no sustituye las ACL documentales. |
| `subjects` | hogar, `type` (`person`, `vehicle`, `pet`, `professional_activity`), alias visible, datos mínimos y creador. |
| `document_types` | código estable, categoría, sujeto permitido, ámbito, sensibilidad, estado editorial. |
| `document_template_versions` | tipo, versión, territorio, criterios de aplicación, esquema de campos, política de fechas, publicación y vigencia. |
| `documents` | hogar, sujeto, tipo, plantilla aplicada, emisor, jurisdicción, `issued_on?`, `expires_on?`, estado, propietario y `lock_version`. |
| `document_versions` | documento, ordinal, fechas confirmadas, emisor, plantilla, motivo, `replaces_version_id?`, autor y confirmación. |
| `sensitive_identifiers` | versión documental, ciphertext, algoritmo, clave envuelta, máscara, últimos caracteres opcionales y token ciego opcional. |
| `encrypted_files` | versión documental, objeto de almacenamiento, ciphertext metadata, hash, clave envuelta, MIME, tamaño, origen, retención y estado. |
| `device_file_caches` | archivo, dispositivo, permiso, creado, último acceso, vencimiento y orden de purga; nunca contiene la clave sin envolver. |
| `renewal_guide_versions` | plantilla, territorio, condiciones, pasos estructurados, descargo, revisado y publicado. |
| `official_sources` | organismo, URL canónica, hosts permitidos, ámbito, última verificación, estado y sustituto. |
| `guide_source_links` | guía, fuente, afirmación respaldada, comprobado por y fecha; obliga a trazar cada paso sensible. |
| `alert_policies` | documento, regla relativa a vencimiento o fecha objetivo, antelación, destinatario, canal, privacidad y estado. |
| `scheduled_alerts` | política, instante, estado, guía/plantilla usadas, enviado y motivo de supresión; deduplicación por política e instante. |
| `renewal_cases` | documento, estado, fecha objetivo, cita opcional, inicio, cierre, responsable y versión. |
| `renewal_steps` | caso, guía/paso de origen, texto congelado, orden, estado, completado por y fecha. |
| `document_acl` | documento, principal usuario/rol, seis permisos explícitos, otorgante, vigencia y revocación. |
| `consents` | actor, finalidad, alcance, versión de texto, otorgado/revocado y prueba; incluye OCR e integración con mudanzas. |
| `integration_outbox` | evento, agregado, payload minimizado, consentimiento, idempotency key, estado, intentos y fecha. |
| `sync_operations` | UUID cliente, dispositivo, entidad, acción, base version, estado y conflicto; payload sensible cifrado. |
| `access_audit_logs` | actor, acción, documento/archivo, resultado, dispositivo, IP truncada y fecha; sin secretos ni payload completo. |
| `content_review_tasks` | plantilla/guía/fuente, motivo, vencimiento editorial, asignación y resultado. |

Convenciones iniciales:

- ULID/UUID generados en cliente para altas offline; claves externas nunca derivadas del número documental.
- Fechas legales como `date`, no como medianoche UTC; envíos programados como `timestamp` UTC más zona `Europe/Madrid` de origen.
- Separar tablas, servicios, políticas de acceso y claves de `documents`, `sensitive_identifiers` y `encrypted_files`.
- Índices por hogar/estado/vencimiento, sujeto/tipo, alertas pendientes/instante y ACL por documento/principal.
- No guardar números completos en búsquedas, logs, nombres de archivo, URLs, eventos, notificaciones ni herramientas de observabilidad.
- Cada versión documental apunta a la plantilla y guía utilizadas; actualizar contenido editorial no altera el historial.

## 5. Diferenciador frente a competencia

- **Privacidad por minimización real:** el producto es plenamente útil sin número ni escaneo; la bóveda es una capacidad opcional y aislada, no el precio de entrada.
- **Calendario orientado al inicio del trámite:** diferencia cuándo caduca de cuándo conviene actuar y permite que el usuario ajuste el margen a citas, desplazamientos y circunstancias propias.
- **Guías españolas gobernadas como datos:** cada paso tiene territorio, versión, fuente oficial y fecha de revisión; un cambio administrativo puede publicarse sin desplegar la aplicación.
- **Modelado correcto de documentos:** no confunde NIE con TIE, documento con identificador, vencimiento con cita ni seguro/ITV con documentación personal.
- **Permisos por documento y por capacidad:** un familiar puede recibir avisos o gestionar una renovación sin ver el número completo ni descargar el escaneo.
- **Renovación confirmada, no inferida:** marcar una tarea, visitar una sede o alcanzar la fecha prevista no renueva nada; el nuevo ciclo empieza con datos validados por el usuario.
- **Notificaciones discretas:** ninguna pantalla bloqueada revela por defecto documento, titular, nacionalidad, matrícula ni proximidad de una situación administrativa sensible.
- **Mudanza con transferencia mínima:** genera una lista revisable de posibles actualizaciones y comparte tareas consentidas, no una réplica de la bóveda.
- **Resiliencia sin falsa disponibilidad:** metadatos y checklist funcionan offline; el diseño no promete abrir escaneos protegidos en dispositivos que no puedan custodiarlos.

La métrica principal será el porcentaje de vencimientos con una acción registrada antes de la fecha objetivo elegida por el usuario. Métricas de calidad: renovaciones confirmadas, alertas útiles frente a descartadas, enlaces oficiales vigentes, guías dentro de su periodo editorial, accesos denegados correctamente y secretos detectados fuera de sus almacenes autorizados. No se optimizará por cantidad de documentos escaneados.

## 6. Fases del roadmap

**Fase 0 — Límites, amenazas y contenido**

- Formalizar documento, identificador, escaneo, titular, vencimiento, fecha objetivo y renovación.
- Modelar amenazas: pérdida de dispositivo, miembro revocado, notificación expuesta, enlace fraudulento, log con PII y exportación abandonada.
- Crear catálogo inicial y flujo editorial con plantillas diferenciadas; validar especialmente DNI/pasaporte, NIE/TIE, conducción/ITV/seguro, certificados, licencias y mascotas.
- Definir allowlist de dominios oficiales, cadencia de revisión y respuesta ante guías obsoletas.

**Fase 1 — MVP de metadatos offline-first**

- Hogares, sujetos, alta manual, fechas, panel, calendario y alertas configurables.
- Plantillas sin escaneo, guías versionadas y enlaces oficiales con fecha de comprobación.
- IndexedDB, cola durable, UUID cliente, sincronización idempotente y conflictos de edición.
- Confirmación de renovación que archive la versión anterior y cree el siguiente ciclo.
- Salida: gestionar todo el calendario sin proporcionar un solo número documental.

**Fase 2 — Hogar compartido y privacidad operativa**

- Invitaciones, ACL por documento, presets desglosados y auditoría visible.
- Notificaciones neutras, revelado temporal de campos y bloqueo local por inactividad.
- Pruebas de revocación, dispositivos offline, exportaciones y eliminación de miembros.
- Salida: un colaborador gestiona una renovación con el mínimo acceso necesario.

**Fase 3 — Bóveda cifrada opcional**

- Identificadores cifrados, máscaras y carga de archivos con cifrado y claves envueltas.
- Caché offline solo en dispositivos confiables, purga remota al sincronizar y descargas temporales.
- OCR opt-in como experimento separado; derivados efímeros y confirmación campo a campo.
- Auditoría criptográfica, rotación de claves, copias de seguridad y restauración verificadas.

**Fase 4 — Profundización española del catálogo**

- Variantes por territorio, edad, nacionalidad y profesión sin pedir datos irrelevantes antes de necesitarlos.
- Monitor de enlaces, revisiones editoriales, comparación de versiones y retirada inmediata de contenido inseguro.
- Checklist por canal presencial/online y registro de cita, justificante y estado en trámite.
- Revisión humana especializada antes de publicar cambios con impacto legal o administrativo.

**Fase 5 — Integración con Organizador de Mudanzas**

- Contrato de eventos asíncronos, payload minimizado, consentimiento por envío y claves idempotentes.
- Matriz editorial de documentos potencialmente afectados por cambio de domicilio; siempre presentada como revisión, no como obligación automática.
- Trazabilidad de qué se compartió, revocación futura y resolución devuelta sin adjuntar documentos.

**Fase 6 — Producción y comercialización**

- RGPD: registro de tratamientos, minimización, exportación, supresión, retención, encargados y evaluación del cifrado extremo a extremo frente a recuperación de cuenta.
- Pruebas de penetración centradas en autorización horizontal, URLs de archivos, cachés PWA, notificaciones y filtraciones por logs.
- Accesibilidad WCAG 2.2 AA y pruebas en iOS/Android para alertas, almacenamiento limitado, modo avión y cambio horario.
- Observabilidad separada para Laravel, PHP-FPM, colas, Redis, base de datos, fallos de notificación, sincronización y almacenamiento cifrado, sin capturar PII.
- Despliegue gradual medido por acciones a tiempo, guías vigentes, errores de permisos, secretos fuera de almacén y éxito de recuperación.
