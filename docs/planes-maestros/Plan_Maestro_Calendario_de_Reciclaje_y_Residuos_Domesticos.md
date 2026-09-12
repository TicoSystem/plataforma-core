# Plan Maestro — Calendario de Reciclaje y Residuos Domésticos

## 1. Propósito y usuario objetivo

Aplicación doméstica que unifica calendarios, reglas de separación y puntos de entrega para la ubicación concreta del usuario en España. Debe responder tres preguntas operativas: qué se recoge, cuándo se recoge y dónde llevar aquello que no corresponde a la recogida ordinaria.

El usuario principal es una persona que reside temporal o permanentemente en un municipio español y no conoce sus reglas, horarios o excepciones. También cubre hogares con varios domicilios, residentes recién mudados y personas que ayudan a familiares, sin convertirse en software de gestión municipal ni en sistema para residuos comerciales, industriales, sanitarios o peligrosos profesionales.

Principios de producto:

- Resolver primero `dirección → municipio → entidad gestora → zona de recogida`; un código postal puede abarcar más de un municipio o varias zonas con calendarios distintos.
- Pedir dirección exacta solo cuando sea necesaria para asignar una zona; permitir código postal, selección manual o ubicación aproximada y conservar la precisión mínima útil.
- Separar dato oficial, dato aportado por la comunidad y configuración manual del hogar mediante etiquetas visibles y modelos diferentes.
- No presentar una regla nacional como universal cuando el destino de un residuo dependa del sistema municipal, del tipo de contenedor o del servicio contratado.
- Cada respuesta del buscador debe indicar objeto reconocido, componentes o condición relevante, destino, excepciones, ámbito geográfico, fuente y última comprobación.
- Un festivo no desplaza automáticamente una recogida: solo una excepción publicada o confirmada debe alterar el calendario base.
- Los avisos comunitarios ayudan a detectar incidencias, pero no sustituyen un bando, calendario o canal oficial.
- El modo manual debe ofrecer calendario, reglas y puntos privados del hogar aun cuando el municipio no publique datos reutilizables.

## 2. Dominios de backend

- **Identidad y hogares:** usuarios, hogares, ubicaciones guardadas y preferencias. Un hogar puede seguir varios domicilios sin mezclar calendarios ni notificaciones.
- **Geocodificación y resolución territorial:** normaliza código postal o dirección, conserva precisión y confianza, y resuelve municipio INE, provincia, comunidad autónoma, entidad gestora y zona de servicio. Las ambigüedades se muestran para selección humana.
- **Cobertura municipal:** municipios, mancomunidades, consorcios, distritos y zonas de recogida con geometrías versionadas. La entidad que publica los datos puede no coincidir con el ayuntamiento.
- **Arquitectura de fuentes:** conectores para API, CSV, iCalendar, PDF, HTML y carga editorial. Cada ingestión conserva URL, organismo, licencia, fecha de publicación, fecha de captura, ámbito y hash del original.
- **Normalización y procedencia:** transforma formatos heterogéneos a un esquema común sin perder el registro fuente. Todo dato publicado debe poder rastrearse hasta una versión importada o una edición manual identificada.
- **Fracciones de residuos:** vocabulario canónico —resto, orgánica, envases, papel/cartón, vidrio y recogidas específicas— más nombres locales, color de contenedor y sistema puerta a puerta. Color y fracción no deben identificarse globalmente.
- **Calendarios de recogida:** reglas recurrentes, fechas excepcionales, franjas horarias, zonas, fracciones y modalidades. Materializa próximas ocurrencias, pero conserva la regla que las generó.
- **Festivos y excepciones:** los festivos son contexto; las modificaciones de servicio son eventos independientes, con fuente y prioridad sobre la recurrencia base.
- **Voluminosos:** modalidad con cita, día fijo, zona o punto de entrega; instrucciones, límites y canal de solicitud se modelan por separado del calendario ordinario.
- **Catálogo de objetos y materiales:** conceptos canónicos, sinónimos españoles, componentes, estado —vacío, contaminado, con batería, voluminoso— y preguntas de desambiguación.
- **Motor de clasificación contextual:** combina objeto, condición, reglas de la zona y vigencia. Devuelve destino, alternativas, prohibiciones, explicación y nivel de certeza; no responde si solo existe una coincidencia léxica débil.
- **Puntos de recogida:** puntos limpios fijos/móviles, aceite, pilas, textil, medicamentos y otras redes; coordenadas, dirección, residuos admitidos, horario, restricciones, accesibilidad y operador.
- **Moderación comunitaria:** incidencias y avisos con categoría, evidencia, ubicación aproximada, ventana temporal y estado editorial. Evita acusaciones personales, matrículas y fotografías con datos identificables.
- **Modo manual:** calendarios, instrucciones y puntos creados por el hogar, privados por defecto. Pueden proponerse como corrección, pero nunca se promueven automáticamente a dato oficial.
- **Notificaciones:** avisos por domicilio, fracción y excepción; zona horaria `Europe/Madrid`, horario silencioso, deduplicación y supresión al invalidarse la fuente.
- **Sincronización offline:** conjuntos versionados por zona, caché de reglas y puntos cercanos, cola idempotente para cambios manuales e incidencias. La app conserva el último conjunto válido e indica su antigüedad.
- **Calidad editorial:** revisión, publicación en dos pasos, expiración de datos, comparación de versiones y alertas de conectores fallidos. Una fuente antigua puede seguir visible con advertencia, pero no fingir actualidad.
- **Privacidad y auditoría:** minimización de direcciones, redondeo de coordenadas para analítica, registro de cambios editoriales y trazabilidad de moderación.

Prioridad de resolución:

1. Excepción oficial vigente para fecha y zona.
2. Calendario oficial vigente de la zona.
3. Configuración manual confirmada por el hogar.
4. Aviso comunitario moderado, mostrado como aviso y nunca como sustitución silenciosa.

## 3. Módulos de frontend

- **Alta de ubicación:** código postal, dirección o selección manual; muestra municipio y zona detectados, confianza, organismo responsable y precisión que se guardará.
- **Hoy y próximos días:** recogidas, cambios confirmados y avisos separados por domicilio. Cada elemento muestra fracción, franja, modalidad y procedencia.
- **Calendario:** vistas agenda, semana y mes; filtros por fracción y ubicación; festivos como contexto y excepciones como cambios efectivos diferenciados.
- **Buscador “¿Dónde va?”:** autocompletado por objeto y sinónimo, preguntas de desambiguación y resultado local. Debe explicar por qué, qué preparar —vaciar, separar, retirar batería— y qué no hacer.
- **Ficha de regla:** destino principal, alternativas, excepciones, zona aplicable, organismo, enlace fuente, fecha publicada y última comprobación.
- **Mapa y lista accesible:** puntos por tipo de residuo, abiertos ahora solo cuando el horario sea fiable, distancia, restricciones y fecha de verificación. La lista debe ser plenamente funcional sin permisos de geolocalización.
- **Ficha de punto:** materiales aceptados, horario estructurado y texto original, operador, acceso, teléfono/enlace oficial y avisos temporales.
- **Voluminosos:** instrucción específica del domicilio: cita previa, calendario, punto o ausencia de información; acceso al canal oficial sin simular la reserva dentro de la app.
- **Incidencias comunitarias:** alta guiada para contenedor lleno, punto cerrado, cambio observado o dato incorrecto; vigencia esperada, foto opcional y aviso de privacidad.
- **Bandeja de avisos:** separa comunicaciones oficiales, incidencias moderadas y notas privadas. Permite seguir, silenciar o confirmar que una incidencia terminó.
- **Modo manual:** editor de recogidas recurrentes, excepciones, instrucciones y puntos propios; importación opcional desde calendario y etiqueta permanente `Añadido por tu hogar`.
- **Fuentes y cobertura:** panel por municipio con entidad responsable, zonas disponibles, conectores activos, fecha de última actualización y huecos conocidos.
- **Notificaciones:** selección por domicilio y fracción, antelación, horario silencioso y avisos extraordinarios; vista previa del mensaje antes de activar.
- **Estado offline:** fecha del paquete local, cambios pendientes y acción para descargar una zona. Los resultados muestran si proceden del último conjunto disponible.
- **Privacidad:** ubicaciones guardadas, nivel de precisión, geolocalización, historial de búsquedas opcional, fotografías e incidencias enviadas.
- **Administración editorial:** mapa de cobertura, cola de importaciones, diferencias entre versiones, errores de validación, moderación y publicación con doble aprobación para cambios masivos.

## 4. Modelo de datos inicial

| Entidad | Campos y decisiones específicas |
|---|---|
| `users` | Identidad del core, `locale`, `timezone` y preferencias de privacidad/notificación. |
| `households` | Nombre, propietario, estado y versión; agrupa configuraciones privadas, no define una única dirección. |
| `saved_locations` | Hogar, alias, entrada del usuario cifrada si se conserva, punto redondeado, precisión, `service_zone_id?`, confianza y confirmación. |
| `municipalities` | Código INE, nombre oficial, provincia, comunidad y geometría/referencia cartográfica versionada. |
| `service_authorities` | Ayuntamiento, mancomunidad, consorcio u operador; nombre, ámbito, web y contacto oficial. |
| `service_zones` | Autoridad, municipio, nombre, geometría, criterios de asignación, vigencia y versión. |
| `source_records` | Organismo, URL, formato, licencia, publicado/capturado/revisado, ámbito, hash, estado y archivo original. |
| `ingestion_runs` | Conector, fuente, inicio/fin, versión de parser, registros creados/cambiados/rechazados y error. |
| `waste_fractions` | Código canónico, nombre neutro y categoría; sin color global obligatorio. |
| `local_fraction_definitions` | Zona, fracción, nombre local, color/recipiente, modalidad, instrucciones, fuente y vigencia. |
| `collection_rules` | Zona, fracción, recurrencia, franja, modalidad, vigencia, fuente, prioridad y estado. |
| `collection_exceptions` | Regla/zona, fecha, efecto (`replace`, `cancel`, `add`, `time_change`), valor alternativo, motivo y fuente. |
| `collection_occurrences` | Regla, fecha materializada, franja, estado, excepción aplicada y versión del cálculo. |
| `holiday_contexts` | Territorio, fecha, nombre y fuente; no modifica por sí solo una recogida. |
| `waste_items` | Concepto canónico, categoría, descripción y estado editorial. |
| `waste_item_terms` | Objeto, término, idioma, variante regional, peso de búsqueda y fuente. |
| `item_conditions` | Objeto, condición/pregunta, opciones y efecto clasificatorio; ejemplo: “¿contiene batería?”. |
| `disposal_rules` | Zona, objeto/material, condiciones, destino, preparación, prohibiciones, alternativas, fuente, vigencia y confianza editorial. |
| `dropoff_points` | Autoridad, tipo, nombre, punto/geometría, dirección, accesibilidad, contacto, fuente, vigencia y verificación. |
| `dropoff_point_acceptances` | Punto, fracción/material, límites, condición, cita requerida y fuente. |
| `opening_hour_sets` | Punto, regla semanal, excepciones, zona horaria, texto original y confianza de parseo. |
| `bulky_collection_services` | Zona, modalidad, reglas, cita, límites, canal oficial, fuente y vigencia. |
| `community_reports` | Autor, categoría, objetivo, ubicación redondeada, descripción, evidencia, inicio/fin esperado y estado. |
| `moderation_events` | Incidencia, acción, moderador, razón codificada, notas internas y fecha. |
| `manual_collection_rules` | Hogar, ubicación, fracción libre/canónica, recurrencia, franja, confirmación y autor. |
| `manual_dropoff_points` | Hogar, ubicación, nombre, materiales, horario y notas; privados salvo propuesta explícita. |
| `notification_rules` | Usuario, ubicación, fracción/tipo, antelación, canal, horario silencioso y estado. |
| `data_packages` | Zona, versión, generado, vigencia, hash y tamaño; unidad de caché offline. |
| `sync_operations` | UUID cliente, dispositivo, entidad, acción, versión base, estado y conflicto. |
| `editorial_reviews` | Entidad, versión, revisor, decisión, evidencia, próxima revisión y auditoría. |

Convenciones iniciales:

- Usar códigos INE y geometrías como referencias versionadas; no emplear el código postal como clave de municipio.
- Fechas de servicio como fecha y hora local; instantes de importación y auditoría en UTC con zona de origen.
- PostGIS para zonas, búsqueda de proximidad y asignación espacial; conservar alternativa de selección manual cuando la geometría falte.
- Índices por zona/fracción/vigencia, ocurrencia/fecha, punto/geografía, términos normalizados y revisiones vencidas.
- El texto comunitario nunca se fusiona dentro de una regla oficial; se enlaza como evidencia separada.
- Cada respuesta del clasificador conserva `disposal_rule_id`, versión, entradas de desambiguación y fuente para poder explicarla y corregirla.

## 5. Diferenciador frente a competencia

- **Resolución por zona real:** evita asumir que todo un municipio comparte días, contenedores o recogida puerta a puerta.
- **Respuesta local explicada:** el buscador no devuelve un color genérico; identifica condición, preparación, destino municipal, excepciones y fuente vigente.
- **Procedencia visible:** usuario y equipo editorial pueden saber qué organismo publicó cada dato, cuándo se capturó, qué parser lo transformó y cuándo debe revisarse.
- **Jerarquía de confianza honesta:** oficial, manual y comunitario conviven sin mezclarse; una incidencia popular nunca se convierte por votos en instrucción municipal.
- **Modo manual de primera clase:** municipios sin datos abiertos obtienen un calendario útil de inmediato, conservando la puerta a futuras importaciones sin perder ajustes domésticos.
- **Festivos correctamente modelados:** mostrar un festivo no implica cancelar o desplazar una recogida; solo una excepción respaldada cambia el servicio.
- **Puntos con capacidad, no simples marcadores:** un lugar se filtra por residuo admitido, condiciones, cita, horario y vigencia, evitando rutas inútiles.
- **Privacidad territorial:** permite usar selección manual o precisión reducida y evita convertir direcciones domésticas en telemetría de búsquedas.
- **Offline útil y transparente:** calendario, reglas y puntos descargados siguen disponibles, pero siempre muestran la antigüedad del paquete.

La métrica principal será el porcentaje de consultas que terminan en una instrucción local respaldada y no corregida posteriormente. Métricas de calidad: cobertura por población y por zonas, fuentes dentro de vigencia, conectores fallidos, consultas sin respuesta, resultados ambiguos, puntos rechazados por información obsoleta e incidencias moderadas dentro del plazo. No se optimizará por volumen de avisos comunitarios.

## 6. Fases del roadmap

**Fase 0 — Taxonomía, territorio y contratos de fuente**

- Definir municipio, autoridad, zona, fracción, objeto, condición, calendario, excepción y nivel de confianza.
- Seleccionar municipios piloto que representen contenedores, puerta a puerta, zonas internas y gestión supramunicipal.
- Crear esquema de procedencia, licencias, vigencia, retirada y publicación editorial.
- Probar casos ambiguos de código postal, límites municipales y direcciones sin geocodificación fiable.

**Fase 1 — MVP manual offline-first**

- Alta por código postal con selección confirmada de municipio/zona y alternativa totalmente manual.
- Calendario, fracciones configurables, excepciones, voluminosos manuales y notificaciones locales.
- Buscador inicial basado en reglas del hogar y catálogo canónico pequeño.
- IndexedDB, cola durable, UUID cliente y paquete local por ubicación.
- Salida: cualquier hogar puede operar aunque su ayuntamiento no publique datos reutilizables.

**Fase 2 — Primeros conectores oficiales**

- Pipeline de API/CSV/iCalendar y flujo editorial con originales, hashes y diferencias.
- Calendarios oficiales, excepciones y panel de organismo/última actualización.
- Observabilidad por conector, alertas de esquema cambiado y rollback a última versión válida.
- Salida: ninguna importación se publica si pierde zona, fracción, vigencia o procedencia.

**Fase 3 — Buscador contextual**

- Catálogo de objetos, sinónimos españoles, condiciones y reglas locales versionadas.
- Preguntas de desambiguación, explicación y respuesta prudente cuando la cobertura sea insuficiente.
- Consola editorial para comparar respuestas entre zonas y detectar contradicciones.
- Salida: cada resultado es reproducible desde regla, versión, contexto y fuente.

**Fase 4 — Mapa de recogida especial**

- PostGIS, puntos fijos/móviles, aceptación de materiales, horarios y restricciones.
- Mapa y lista accesible, descarga offline por zona y filtros por capacidad real.
- Verificación periódica y retirada temporal de puntos con información caducada.
- Salida: un marcador sin residuos aceptados o procedencia no puede publicarse como punto verificado.

**Fase 5 — Comunidad moderada**

- Incidencias temporales, fotos opcionales, anonimización, caducidad y moderación.
- Detección de duplicados y vinculación a puntos, recogidas o fuentes sin alterar el dato oficial.
- Canal editorial para convertir una corrección en candidata a verificación con el organismo.
- Salida: tiempos de moderación medidos y mecanismo de denuncia/retirada disponible desde cada aviso.

**Fase 6 — Cobertura y producción**

- Incorporar PDF/HTML con revisión humana obligatoria y ampliar conectores por impacto poblacional, no por facilidad técnica.
- Accesibilidad WCAG 2.2 AA, pruebas en iOS/Android, modo avión, cambio horario y mapas con navegación por teclado/lector.
- RGPD: precisión mínima, retención de direcciones, EXIF de fotografías, exportación y eliminación.
- Observabilidad separada para Laravel, PHP-FPM, colas, Redis, PostGIS, conectores, geocodificación, notificaciones y sincronización de esta app.
- Despliegue gradual con indicadores públicos de cobertura, última actualización y limitaciones conocidas por municipio.
