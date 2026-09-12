# Plan Maestro — Biblioteca Personal y Préstamos

## 1. Propósito y usuario objetivo

Catálogo privado de ejemplares físicos que permite saber qué edición posee el hogar, dónde está y quién la tiene prestada. La app prioriza propiedad, localización y devolución; no incorpora feed, seguidores, reseñas públicas, gamificación social ni recomendaciones algorítmicas por defecto.

El usuario principal es una persona o familia en España con libros repartidos entre habitaciones, viviendas o trasteros y préstamos informales a conocidos. El receptor de un préstamo debe poder aceptar, consultar la fecha y confirmar devolución desde web sin instalar la PWA ni crear cuenta.

Principios de producto:

- Separar `obra`, `edición` y `ejemplar`: título/autor pertenecen a la obra; ISBN, editorial, idioma, formato y año a la edición; ubicación, estado, dedicatoria, valor y préstamo al ejemplar.
- ISBN ayuda a localizar una edición, pero no prueba cuál posee el usuario; cualquier coincidencia externa se confirma antes de crear el ejemplar.
- Un hogar puede conservar varios ejemplares de la misma edición con propietarios, dedicatorias, estados y ubicaciones diferentes.
- Las fotografías de portada/lomo generan candidatos, nunca una edición definitiva. OCR y reconocimiento muestran fuente y confianza por campo.
- El préstamo mediante enlace expone solo título/edición mínima, prestamista visible elegido, fecha y acciones autorizadas; nunca revela biblioteca, ubicación física, valor o dedicatoria.
- Prestamista y receptor registran declaraciones separadas de entrega y devolución. La discrepancia se conserva y la app no decide posesión ni responsabilidad.
- Los recordatorios son configurables por préstamo y requieren consentimiento para contactar al receptor; no se convierten en campañas ni en mensajes culpabilizadores.
- `Leído`, `leyendo` y `por leer` son estados personales, no estados del ejemplar compartido.
- El valor estimado es privado, manual, fechado y no equivale a tasación ni precio de mercado.

## 2. Dominios de backend

- **Identidad y hogares:** usuarios, bibliotecas domésticas, miembros, roles y dispositivos. Permisos separados para catalogar, mover, prestar, ver valores, ver dedicatorias y exportar.
- **Obras:** título canónico, títulos alternativos, autores/contribuidores, género opcional y relaciones. Evitar duplicación por normalización y permitir fusión reversible.
- **Ediciones:** obra, ISBN-10/ISBN-13 normalizados, editorial, colección, idioma, fecha, formato, páginas y cubierta. Un ISBN conflictivo mantiene candidatos hasta revisión.
- **Ejemplares:** edición confirmada o descripción libre, propietario, adquisición, estado físico, dedicatoria, valor, ubicación y disponibilidad.
- **Fuentes bibliográficas:** adaptadores de metadatos con proveedor, licencia, fecha, payload, atribución y campos importados. No asumir permiso para almacenar/republicar portadas indefinidamente.
- **Captura por ISBN:** escaneo EAN/ISBN, validación de checksum, conversión 10/13 cuando aplique y consulta multicandidato. Los códigos no ISBN se mantienen como búsqueda fallida, no como libro inventado.
- **Captura por imagen:** original opcional, OCR de lomo/portada, candidatos por título/autor/editorial y confianza. El usuario confirma obra y edición; los derivados se eliminan según retención.
- **Ubicaciones físicas:** vivienda, habitación, mueble, balda y contenedor mediante árbol ordenable. Mover un nodo mueve lógicamente sus descendientes sin reescribir el historial de cada ejemplar.
- **Estado y conservación:** vocabulario configurable, notas y fotografías fechadas. Las evaluaciones son del usuario, no tasaciones automáticas.
- **Préstamos:** ejemplar, prestamista, receptor con/sin cuenta, fechas prevista/efectiva, condiciones, estado y versión. Un ejemplar no puede tener dos préstamos activos confirmados.
- **Invitaciones de préstamo:** token aleatorio, permisos, caducidad, límite de uso, canal y revocación. Guardar hash del token y nunca incluir datos sensibles en QR/URL.
- **Declaraciones de entrega/devolución:** confirmaciones independientes, fecha declarada, actor y observación; estados discrepantes explícitos.
- **Receptores externos:** nombre mostrado y canal cifrado mínimos, consentimiento de contacto, retención y derecho a revocar recordatorios sin perder el registro del préstamo.
- **Recordatorios:** reglas por préstamo, calendario, zona horaria, canal, horario silencioso, límites de frecuencia y supresión tras devolución/revocación.
- **Listas personales:** leído, leyendo, por leer y listas propias asociadas a obra/edición; privadas incluso dentro del hogar salvo compartición explícita.
- **Sesiones de lectura:** fechas, páginas/progreso opcional y nota privada. Las estadísticas usan cobertura declarada y no equiparan préstamo con lectura.
- **Estadísticas:** libros terminados, tiempo/progreso cuando exista, autores, idiomas y formatos; siempre filtrables por usuario y periodo, sin rankings familiares predeterminados.
- **Búsqueda:** índice local/servidor por obra, edición, ubicación y código interno; dedicatorias, valores y datos del receptor quedan fuera del índice general salvo opción específica y protegida.
- **Importación/exportación:** CSV/JSON versionados con diccionario de campos, IDs estables y relaciones obra–edición–ejemplar. La reimportación usa IDs/origen para evitar duplicados.
- **Sincronización offline:** ULID cliente, cola durable, idempotencia y control optimista. Altas, movimientos y lectura funcionan sin red; préstamos externos solo se consideran enviados/aceptados tras confirmación del servidor.
- **Privacidad y medios:** cifrado de contactos, dedicatorias y valores; fotografías con EXIF depurado; URLs temporales y registros de acceso.
- **Auditoría:** movimientos, préstamos, confirmaciones, permisos, exportaciones, fusiones y borrados. Los logs técnicos excluyen títulos privados, contactos, dedicatorias y valores.

Reglas críticas:

- `work_id`, `edition_id` y `copy_id` nunca son intercambiables; listas de lectura pueden apuntar a una obra, préstamos siempre a un ejemplar.
- Cambiar los metadatos de una edición compartida no altera notas ni fotografías específicas del ejemplar.
- Aceptar un préstamo confirma sus condiciones, no la recepción física; la entrega se registra por separado.
- Una devolución solo cierra sin ambigüedad cuando la política elegida se cumple: confirmación de ambas partes o cierre unilateral explícitamente marcado.
- Un token revocado o caducado no permite descubrir si un préstamo existe.
- Los recordatorios ya encolados se cancelan cuando el receptor retira consentimiento de contacto.

## 3. Módulos de frontend

- **Inicio:** libros fuera, devoluciones próximas, últimas altas y accesos a escáner, búsqueda y préstamo; sin feed ni recomendaciones.
- **Alta por ISBN:** cámara o entrada manual, validación, candidatos de edición y pantalla de confirmación con diferencias resaltadas.
- **Alta por foto:** guía para portada/lomo, progreso local, texto detectado y candidatos; alternativa manual completa si no hay coincidencia.
- **Alta manual:** obra, edición y ejemplar en pasos separados; permite “edición desconocida” y enriquecer después.
- **Ficha de obra:** ediciones, ejemplares del hogar y listas personales; los datos externos muestran fuente.
- **Ficha de ejemplar:** ubicación, propietario, estado, dedicatoria, valor, fotos, historial y préstamo actual con permisos por campo.
- **Ubicaciones:** árbol vivienda–habitación–mueble–balda/caja, búsqueda y movimiento en lote; etiquetas imprimibles opcionales con código opaco.
- **Préstamo rápido:** seleccionar ejemplar, receptor, fecha, canal y recordatorios; previsualiza exactamente lo que verá el invitado.
- **Página pública limitada:** aceptar/rechazar, confirmar recepción/devolución, proponer fecha y revocar avisos; diseño responsive sin registro obligatorio.
- **QR de préstamo:** contiene URL con token, caduca y puede regenerarse. La pantalla evita mostrarlo junto al valor o localización del libro.
- **Bandeja de préstamos:** solicitados, aceptados, entregados, vencidos, devolución pendiente de una parte y cerrados.
- **Confirmación bilateral:** línea temporal con declaraciones de ambas partes y divergencias; permite corrección enlazada sin sobrescribir.
- **Recordatorios:** fecha, frecuencia, canal y tono neutro; vista previa y registro de envíos/fallos.
- **Listas personales:** leído, leyendo, por leer y personalizadas; drag-and-drop offline y privacidad por lista.
- **Registro de lectura:** inicio/fin, progreso y nota opcional; no exige páginas ni crea rachas.
- **Estadísticas:** periodo, obras terminadas, formatos/idiomas/autores y datos faltantes; sin comparaciones entre miembros.
- **Biblioteca familiar:** miembros, ejemplares propios/comunes y permisos; filtros por propietario sin convertir propiedad en visibilidad automática.
- **Exportación:** CSV/JSON, alcance por usuario/biblioteca, inclusión opcional de préstamos, dedicatorias y valores, con previsualización de datos sensibles.
- **Estado offline:** cambios pendientes, último sincronizado y conflictos; las búsquedas locales indican cuándo faltan portadas o metadatos remotos.

## 4. Modelo de datos inicial

| Entidad | Campos y decisiones específicas |
|---|---|
| `users` | Identidad del core, idioma, zona horaria y preferencias de privacidad. |
| `libraries` | Hogar/colección, propietario, nombre, estado, política de retención y versión. |
| `library_members` | Biblioteca, usuario, rol, capacidades, estado e invitador. |
| `works` | Título canónico, título original, idioma original opcional, estado y registro de fusión. |
| `contributors` | Nombre normalizado, ordenación y autoridad externa opcional; evitar imponer identidad cuando haya homónimos. |
| `work_contributors` | Obra, contribuidor, rol y orden. |
| `editions` | Obra, ISBN-10/13, editorial, colección, idioma, fecha, formato, páginas y estado de verificación. |
| `edition_metadata_sources` | Edición/candidato, proveedor, referencia, licencia, capturado, payload/hash y campos aceptados. |
| `copies` | Biblioteca, edición opcional, descripción libre, código interno, propietario, adquisición, estado, disponibilidad y versión. |
| `copy_private_details` | Ejemplar, dedicatoria cifrada, valor/moneda, fecha/método de estimación y visibilidad. |
| `locations` | Biblioteca, padre, tipo, nombre, orden y estado; árbol con protección contra ciclos. |
| `copy_location_events` | Ejemplar, origen/destino, hora, actor, dispositivo y operación; ubicación actual derivada/materializada. |
| `condition_events` | Ejemplar, estado, nota, fotografías, fecha y actor. |
| `media_assets` | Objeto, almacenamiento, hash, MIME, procedencia/licencia, EXIF, retención y estado. |
| `capture_jobs` | Método ISBN/foto/manual, entrada, extractor/versión, candidatos, confianza, confirmación y retención. |
| `external_borrowers` | Biblioteca, alias, email/teléfono cifrado opcional, consentimiento, revocado y retención. |
| `loans` | Ejemplar, prestamista, receptor usuario/externo, solicitado/previsto/entregado/devuelto, condiciones, versión y estado. |
| `loan_invites` | Préstamo, hash de token, permisos, caducidad, usos, canal, revocación y último acceso. |
| `loan_statements` | Préstamo, actor/rol, tipo aceptación/entrega/devolución, fecha declarada, nota y revisión. |
| `reminder_rules` | Préstamo, destinatario, canal, calendario, frecuencia, horario silencioso, consentimiento y estado. |
| `notification_attempts` | Regla, programado, enviado, resultado, proveedor y deduplicación; sin contenido completo. |
| `personal_lists` | Usuario, nombre/tipo, privacidad, orden y estado. |
| `list_entries` | Lista, obra/edición, posición, añadido y nota privada opcional. |
| `reading_sessions` | Usuario, obra/edición/ejemplar opcional, inicio/fin, progreso, unidad, nota y estado. |
| `statistics_runs` | Usuario, periodo, cobertura, fórmula/versión y resultados regenerables. |
| `export_jobs` | Solicitante, biblioteca, alcance, formato/versión, archivo, hash, caducidad y descargas. |
| `sync_operations` | ULID cliente, dispositivo, entidad, acción, versión base, estado y conflicto. |
| `possible_duplicates` | Obras/ediciones candidatas, regla, puntuación, estado, decisión y actor. |
| `audit_logs` | Actor, acción, objeto opaco, resultado y fecha; sin contacto, dedicatoria ni valor. |

Convenciones iniciales:

- ISBN almacenado sin guiones y validado por checksum; la unicidad admite ediciones sin ISBN y excepciones editoriales documentadas.
- ULID generado en cliente para ejemplares, eventos, listas y operaciones offline.
- Contactos, dedicatorias y valores cifrados; los índices públicos nunca incluyen esos campos.
- Fotografías propias y cubiertas de terceros se diferencian por procedencia/licencia y política de conservación.
- Índices por biblioteca/edición, ubicación/padre, ejemplar/disponibilidad, préstamo/estado/fecha y términos normalizados.
- Exportaciones incluyen esquema y versión para reimportar sin colapsar obra, edición y ejemplar.

## 5. Diferenciador frente a competencia

- **Catálogo de ejemplares, no lista de títulos:** distingue ediciones y copias físicas, permitiendo ubicar, valorar o prestar dos ejemplares iguales sin confundirlos.
- **Préstamo sin fricción ni vigilancia:** el receptor actúa desde un enlace limitado, sin cuenta obligatoria, acceso a la biblioteca ni seguimiento del dispositivo.
- **Devolución como dos declaraciones:** conserva lo que confirma cada parte y no cierra una discrepancia mediante última escritura.
- **Privacidad por atributo:** ubicación, propietario, dedicatoria, valor, lectura y contacto tienen visibilidad separada dentro de la familia.
- **Captura prudente:** ISBN y visión generan candidatos con procedencia; la edición exacta siempre requiere confirmación humana.
- **Ubicación jerárquica auditable:** mover una caja o balda mantiene coherencia y el historial permite localizar un ejemplar tras reorganizaciones.
- **Estadísticas personales sin presión social:** describen hábitos del usuario, no crean rankings, rachas públicas ni recomendaciones opacas.
- **Exportación reutilizable:** CSV/JSON preserva relaciones, IDs, ediciones, ejemplares, ubicaciones y préstamos; no reduce la colección a título y autor.
- **Alcance doméstico deliberado:** no incorpora compraventa, marketplace, club de lectura, comentarios públicos ni feed.

La métrica principal será el porcentaje de ejemplares prestados cuya situación actual puede determinarse sin preguntar fuera de la app. Métricas de calidad: altas confirmadas sin corrección de edición, ejemplares localizables, tokens revocados, recordatorios consentidos, devoluciones discrepantes, conflictos offline y reimportaciones sin duplicados. No se optimizará por seguidores, reseñas, libros añadidos masivamente ni tiempo de pantalla.

## 6. Fases del roadmap

**Fase 0 — Modelo bibliográfico y privacidad de préstamos**

- Formalizar obra, edición, ejemplar, ubicación, receptor, invitación, entrega y devolución.
- Evaluar proveedores bibliográficos españoles/internacionales por cobertura, licencia, atribución y política de portadas.
- Diseñar tokens, expiración, rate limiting, privacidad de URL y consentimiento de recordatorios.
- Probar flujos con ediciones sin ISBN, ISBN reutilizado/conflictivo, antologías, varios autores y duplicados domésticos.

**Fase 1 — MVP de catálogo offline-first**

- Biblioteca, miembros, obra/edición/ejemplar manuales, ubicaciones, estado y búsqueda.
- Alta ISBN con candidatos y confirmación; listas personales básicas.
- IndexedDB, cola durable, ULID cliente, sincronización idempotente y conflictos.
- Salida: catalogar y localizar sin conexión sin colapsar ejemplares duplicados.

**Fase 2 — Préstamos sin cuenta**

- Receptores externos mínimos, enlace/QR revocable, aceptación, entrega y devolución bilateral.
- Recordatorios consentidos, límites de frecuencia y supresión inmediata.
- Estados discrepantes, correcciones enlazadas y auditoría.
- Salida: un invitado completa todo el ciclo desde navegador sin acceder a otros libros.

**Fase 3 — Captura por imagen y catálogo enriquecido**

- Foto de portada/lomo, OCR, candidatos y revisión campo a campo.
- Procedencia/licencia de metadatos y medios, caché y eliminación de derivados.
- Fusión reversible de obras/ediciones y herramienta de calidad del catálogo.
- Salida: ninguna coincidencia visual crea o fusiona una edición sin confirmación.

**Fase 4 — Familia, conservación y lectura**

- Permisos por atributo, propietarios, movimientos jerárquicos y estado fotográfico.
- Sesiones/listas privadas y estadísticas descriptivas con cobertura.
- Etiquetas de ubicación opcionales y movimientos en lote.
- Validación para impedir que estados de lectura se filtren a otros miembros por agregados.

**Fase 5 — Portabilidad**

- CSV/JSON versionados, diccionario, previsualización sensible e importación idempotente.
- Exportación por biblioteca, propietario o usuario con préstamos opcionales.
- Pruebas de ida/vuelta, caracteres españoles, autores múltiples, ediciones incompletas y archivos grandes.

**Fase 6 — Producción**

- RGPD: receptores sin cuenta, consentimiento de contacto, portabilidad, borrado, retención y derechos sobre registros compartidos.
- Seguridad: autorización horizontal, tokens, enumeración, rate limiting, medios, exportaciones y pérdida de dispositivo.
- Accesibilidad WCAG 2.2 AA y pruebas iOS/Android, cámara, QR, modo avión y bibliotecas extensas.
- Observabilidad separada para Laravel, PHP-FPM, colas, Redis, base de datos, proveedores bibliográficos, OCR, notificaciones y sincronización, sin catálogo privado en logs.
- Despliegue gradual condicionado a exactitud de edición, aislamiento de enlaces, integridad offline y ciclos de préstamo trazables.
