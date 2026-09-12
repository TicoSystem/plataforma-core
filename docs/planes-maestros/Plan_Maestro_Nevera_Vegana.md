## 1. Propósito y usuario objetivo

**Nevera Vegana** acompañará una transición práctica hacia hábitos veganos mediante cuatro módulos conectados: objetivos graduales, despensa/recetas, evaluación explicable de productos y directorio de establecimientos. El producto reducirá cambios de contexto: una sustitución sugerida podrá convertirse en ingrediente, una compra escaneada en existencia y una receta elegida en consumo de despensa.

Se dirige a residentes en España con perfil `vegan`, `transitioning_omnivore` o `mixed_household`. El MVP priorizará adultos que compran en supermercados españoles y hogares donde no todas las personas siguen la misma alimentación; no asumirá que todo el inventario, receta o compra del hogar deba ser vegano.

Decisiones de alcance:

- “Vegano” describirá composición y procesos declarados según evidencia disponible; no equivaldrá automáticamente a saludable, ecológico, sostenible, libre de alérgenos ni cruelty-free.
- “Cruelty-free” será una afirmación distinta y dimensionada por marca, producto, establecimiento, fecha, territorio y fuente. La app no la inferirá desde una lista de ingredientes.
- El escáner devolverá `compatible`, `not_compatible`, `uncertain` o `insufficient_data`, más evidencia y confianza. Una duda no se convertirá en respuesta afirmativa por popularidad.
- La orientación nutricional será general, prudente y editorialmente revisada. No diagnosticará deficiencias, prescribirá suplementos, calculará dosis ni sustituirá a dietista-nutricionista o médico.
- Embarazo, lactancia, menores, trastornos de la conducta alimentaria, enfermedad renal/digestiva/metabólica u otra dieta terapéutica quedarán fuera de la orientación automática; la despensa y las recetas seguirán utilizables.
- La despensa funcionará offline. Escanear un producto conocido, registrar existencias, consumir ingredientes y consultar recetas descargadas no dependerá de conexión.
- El directorio no prometerá estado permanente: mostrará qué se verificó, mediante qué fuente y cuándo caduca esa verificación.
- El motor compartido con Planificador de Comidas Semanal será un paquete de dominio versionado para ingredientes, unidades, recetas, despensa y consumos; perfiles veganos, evidencia y directorio permanecerán en esta app.

## 2. Dominios de backend

**Identidad, hogares y perfiles**

- Hogar como tenant con miembros `owner`, `admin` y `member`.
- Preferencia alimentaria por miembro y por comida: vegano, transición u omnívoro; nunca una bandera única que oculte el carácter mixto del hogar.
- Restricciones declaradas separadas: alergias, intolerancias, ingredientes evitados y preferencias. Una exclusión vegana no sustituye controles de alérgenos.
- Modo de orientación activable por usuario; la despensa y el escáner no dependen de aceptarlo.

**Transición gradual**

- Programa versionado compuesto por objetivos semanales observables: sustituir desayunos, probar fuentes de proteína vegetal, planificar comidas o revisar etiquetas.
- Objetivos personalizados con frecuencia, alcance, fecha y evidencia de cumplimiento; no se usarán rachas punitivas.
- Progreso calculado desde acciones confirmadas o autoevaluación, distinguiendo “no realizado” de “no registrado”.
- Replanificación conserva semanas anteriores y mueve objetivos pendientes sin calificarlos como fracaso.
- Contenido con fuente, autor/revisor, fecha de revisión, población aplicable y exclusiones.

**Orientación nutricional prudente**

- Fichas educativas sobre variedad, fuentes alimentarias y nutrientes que requieren atención en una alimentación vegana, sin interpretar síntomas ni analíticas.
- Mensajes vinculados al objetivo actual y a datos de recetas/despensa solo si el usuario consiente ese uso.
- Reglas editoriales deterministas; no se generarán recomendaciones clínicas libres a partir del historial.
- Cada consejo mostrará ámbito, fuente y fecha; los productos concretos no se presentarán como tratamiento.
- Guardrails para evitar dosis, déficit calórico, lenguaje moral, promesas de salud y recomendaciones en contextos excluidos.

**Motor compartido de ingredientes, despensa y recetas**

- Paquete Laravel independiente de modelos Eloquent de ambas apps, con objetos de valor, interfaces de repositorio y eventos versionados.
- Identidad canónica de ingrediente separada del producto comercial; una receta usa ingrediente, mientras una existencia puede referirse a ingrediente genérico o SKU/EAN.
- Unidades canónicas g, ml y unidad, con conversiones específicas por ingrediente y precisión decimal fija.
- Recetas versionadas con ingredientes, cantidades, raciones, pasos, sustituciones y requisitos de equipamiento.
- Existencias por lote doméstico con cantidad, ubicación, fecha de compra, consumo preferente/caducidad declarada y procedencia.
- Comandos idempotentes `stock.added`, `stock.consumed`, `stock.adjusted`, `recipe.versioned`; el Planificador de Comidas integrará por contrato, no por tablas compartidas.
- La semántica vegana será una extensión mediante IDs y clasificaciones; el paquete común no dependerá de esa taxonomía.

**Despensa y caducidades**

- Ubicaciones nevera, congelador, despensa y personalizadas.
- Entrada manual, desde escáner, desde lista de compra futura o duplicando compra reciente.
- FEFO doméstico para sugerir qué usar primero, diferenciando fecha de caducidad, consumo preferente y fecha estimada por el usuario.
- Consumo parcial, ajuste, desperdicio y traslado; el saldo se deriva de movimientos y no se sobrescribe sin motivo.
- Alertas configurables con lenguaje acorde al tipo de fecha; la app no decide por sí sola si un alimento es seguro para consumir.

**Recetas y aprovechamiento**

- Filtros por perfil/comensal, ingredientes disponibles, caducidad próxima, tiempo, raciones, equipamiento y alérgenos declarados.
- Puntuación explicable: cobertura de ingredientes, número de faltantes, prioridad FEFO y sustituciones posibles.
- “Puedo cocinarla” requiere cantidades suficientes o indica qué cantidades faltan; no basta con coincidencia nominal.
- Sustituciones versionadas por función culinaria y contexto, revisadas editorialmente; no se aplican automáticamente.
- Cocinar genera una propuesta de consumo que el usuario confirma/ajusta; nunca descuenta existencias solo por abrir una receta.

**Catálogo de productos españoles**

- Producto, marca, EAN/GTIN, variante, mercado, ingredientes tal como aparecen en etiqueta, alérgenos, trazas, imágenes y versiones temporales.
- Una reformulación crea versión nueva; los escaneos históricos conservan la etiqueta y clasificación utilizadas.
- Fuentes diferenciadas: imagen de etiqueta, fabricante, certificación, distribuidor, revisión editorial y aportación comunitaria.
- El nombre de un ingrediente se normaliza sin borrar el texto original ni su posición en la etiqueta.
- Productos de marca blanca conservan distribuidor y fabricante solo cuando conste; un EAN no se reutiliza como verdad atemporal.

**Clasificación vegana y evidencia**

- Motor determinista sobre ingredientes normalizados, derivados, coadyuvantes declarados y reglas versionadas.
- Taxonomía de ingredientes `plant`, `animal`, `synthetic_or_mineral`, `ambiguous_origin`, `process_dependent` y `unknown`.
- Resultado acompañado por hechos: ingredientes incompatibles, términos dudosos, información ausente, certificación y fecha de evidencia.
- Confianza calculada por completitud/recencia/procedencia, no por votos comunitarios.
- “Puede contener trazas” se mostrará separado de composición y no cambiará automáticamente la clasificación vegana; el usuario decide su criterio de compra.
- Casos dependientes de proceso/fabricante permanecen `uncertain` hasta evidencia específica del producto y mercado.

**Captura y correcciones comunitarias**

- Escaneo EAN primero; OCR de etiqueta cuando falta producto o versión vigente.
- OCR produce candidatos de ingredientes y alérgenos con recorte de evidencia y confianza por campo.
- Corrección comunitaria como propuesta con tipo, valor anterior/nuevo, fotografía, fecha, tienda opcional y declaración de autoría.
- Moderación por cola de riesgo: cambio de clasificación, alérgeno, reformulación o afirmación cruelty-free exige revisión reforzada.
- Consenso no publica hechos. El moderador acepta, rechaza, solicita evidencia o fusiona con otra propuesta, conservando trazabilidad.
- Protección frente a abuso: límites, reputación interna no pública, detección de duplicados y ocultación de datos personales de tickets/imágenes.

**Directorio de establecimientos**

- Entidad y sucursales separadas, con dirección, coordenadas, categorías, contacto y horarios declarados.
- Capacidades verificables distintas: menú/oferta vegana, establecimiento exclusivamente vegano, productos cruelty-free, política propia, certificación o respuesta escrita.
- Verificación con alcance, fuente, verificador, fecha y caducidad; una llamada, visita, web oficial o certificación tienen evidencias distintas.
- Estado `verified`, `partially_verified`, `stale`, `disputed` o `closed`; la interfaz nunca oculta la fecha.
- Informes comunitarios entran en moderación. Cambios de horario, cierre o política no actualizan automáticamente una afirmación sensible.
- Geolocalización solo para búsqueda cercana con permiso puntual; no se conservará historial de ubicación.

**Sincronización con Planificador de Comidas Semanal**

- Identificadores compartidos estables para ingredientes/recetas del usuario y mapeos explícitos entre instalaciones.
- Outbox transaccional y consumidores idempotentes; eventos con `event_id`, `schema_version`, `occurred_at` y `aggregate_version`.
- Autoridad por entidad: Nevera Vegana manda sobre sus existencias; la app de planificación manda sobre sus menús/listas; las recetas editadas en ambas requieren propietario de edición o bifurcación.
- Planificar no descuenta stock. Confirmar “cocinado” o “comprado” genera comandos explícitos.
- Conflictos fuera de orden se resuelven por versión de agregado, no por última hora de llegada.

**Privacidad, auditoría y offline**

- UUID local, cola append-only, cursor incremental, idempotencia y versión optimista.
- Catálogo esencial, despensa, recetas, programa activo y productos recientes almacenados en IndexedDB; mapas/verificación reciente requieren conexión.
- Alérgenos, contexto de salud y perfil alimentario minimizados, con consentimientos por finalidad y exclusión de telemetría.
- Auditoría de moderación, clasificaciones, fuentes, verificaciones, cambios de catálogo y sincronización entre apps.
- Medios privados con validación MIME, hash, análisis de seguridad, borrado de metadatos y URLs temporales.

## 3. Módulos de frontend

**Inicio integrado**

- Objetivo semanal, ingredientes que conviene usar, recetas posibles, productos pendientes de confirmar y locales con verificación próxima a caducar.
- Selector de miembro/comensales para hogares mixtos; cada recomendación muestra a quién aplica.
- Estado offline y última actualización de catálogo/directorio claramente separados.

**Transición**

- Ruta semanal con objetivos aceptados, alternativas y motivo de cada propuesta.
- Reprogramación sin rachas ni penalización; acciones no registradas no se cuentan como fallos.
- Contenido nutricional separado de objetivos prácticos, con fuente, revisión y aviso de alcance.

**Nevera y despensa**

- Vista por ubicación y por “usar primero”, con cantidad, unidad, lote doméstico y tipo de fecha.
- Alta rápida manual, escaneo, duplicado de compra y ajuste con motivo.
- Consumo parcial, traslado y desperdicio; funcionamiento completo offline.
- Aviso visual distinto para caducidad, consumo preferente y fecha estimada.

**Recetas**

- Filtros por perfil de comensales, disponibles, faltantes, caducidad, tiempo y restricciones.
- Explicación de coincidencia con cantidades y sustituciones propuestas.
- Modo cocina offline y confirmación final de consumos reales.
- Versionado de recetas familiares y bifurcación cuando llega una actualización externa.

**Escáner**

- Resultado inmediato para producto descargado; consulta remota o captura de etiqueta si falta.
- Cabecera con estado compatible/no compatible/dudoso/sin datos, confianza y fecha de versión.
- Desglose de ingrediente incompatible, ingrediente dudoso, trazas, certificación y evidencia.
- Preferencia personal sobre trazas visible pero separada de la clasificación común.

**Captura y corrección de producto**

- Fotografía guiada de frontal, EAN, ingredientes y alérgenos.
- Revisión OCR por fragmento; ningún ingrediente se publica sin confirmación.
- Formulario de corrección que exige tipo de cambio y evidencia, con estado de moderación.
- Historial de versiones y explicación de por qué cambió la clasificación.

**Directorio**

- Búsqueda por localidad o cercanía puntual, categoría, oferta vegana, exclusividad y evidencia cruelty-free.
- Ficha con alcance exacto, fuente, última verificación, caducidad, horarios y elementos disputados.
- Acción informar cambio/cierre con moderación; sin reseñas sociales ni puntuación popular en el MVP.

**Integración con Planificador de Comidas**

- Estado de conexión, entidades sincronizadas y autoridad de edición.
- Enviar receta/despensa seleccionada, recibir plan/lista y revisar comandos de compra/consumo.
- Centro de conflictos para ingredientes no mapeados, versiones divergentes y eventos fuera de orden.

**Hogar y ajustes**

- Miembros, perfil por persona/comida, restricciones y criterio sobre trazas.
- Consentimientos de orientación, ubicación y contribuciones; exportación y eliminación.
- Centro offline con operaciones pendientes, errores, descargas y conflictos accionables.

**Moderación**

- Cola por riesgo con comparación anterior/nuevo, evidencia y producto/local afectado.
- Acciones aceptar, rechazar, pedir más evidencia, fusionar o escalar.
- Vista previa del efecto sobre clasificación y usuarios antes de publicar una nueva versión.

## 4. Modelo de datos inicial

Las claves serán UUID/ULID generables offline. Cantidades usarán decimales de precisión fija y unidades canónicas. Catálogo, recetas, reglas, contenido y verificaciones se referenciarán por versión; el historial no se recalculará silenciosamente.

| Entidad | Campos específicos iniciales | Restricciones y relaciones |
| --- | --- | --- |
| `households` | `name`, `timezone`, `locale` | Tenant raíz. |
| `household_members` | `household_id`, `user_id`, `role`, `food_profile`, `status` | Único por hogar/usuario. |
| `member_food_preferences` | `member_id`, `type`, `value`, `severity`, `source` | Veganismo, alergia, intolerancia y preferencia como tipos separados. |
| `transition_programs` | `code`, `version`, `title`, `applicable_profiles_json`, `content_source_json`, `reviewed_at`, `status` | Global y editorial. |
| `transition_program_items` | `program_id`, `week_number`, `objective_code`, `title`, `instructions`, `completion_rule_json`, `safety_scope_json` | Sin consejo clínico personalizado. |
| `member_transition_plans` | `member_id`, `program_id`, `started_on`, `current_week`, `status` | Una activación conserva versión. |
| `transition_objectives` | `plan_id`, `program_item_id`, `scheduled_week`, `status`, `completed_at`, `completion_source`, `notes` | No registrado ≠ incumplido. |
| `guidance_articles` | `code`, `version`, `title`, `body_json`, `sources_json`, `applicability_json`, `exclusions_json`, `reviewed_by`, `reviewed_at`, `status` | Revisión editorial y sanitaria. |
| `ingredients` | `canonical_name`, `category`, `default_unit`, `vegan_origin_class`, `current_version_id` | Global; semántica vegana fuera del núcleo compartido. |
| `ingredient_aliases` | `ingredient_id`, `locale`, `alias`, `normalized_alias`, `context` | Único por idioma/contexto/alias. |
| `ingredient_conversions` | `ingredient_id`, `from_unit`, `to_unit`, `factor`, `source`, `version` | Conversión específica, no universal. |
| `pantry_items` | `household_id`, `ingredient_id`, `product_version_id`, `location_id`, `quantity`, `unit`, `date_type`, `date_value`, `date_source`, `status`, `aggregate_version` | Saldo proyectado; puede referir ingrediente o producto. |
| `pantry_locations` | `household_id`, `name`, `type`, `sort_order` | Nevera, congelador, despensa o personalizada. |
| `pantry_movements` | `household_id`, `pantry_item_id`, `type`, `quantity`, `unit`, `occurred_at`, `reason`, `source_type`, `operation_uuid` | Append-only e idempotente. |
| `recipes` | `owner_scope`, `owner_id`, `title`, `profile_compatibility`, `current_version_id`, `status` | Global curada o del hogar. |
| `recipe_versions` | `recipe_id`, `version`, `servings`, `steps_json`, `equipment_json`, `content_hash`, `created_from_version_id` | Inmutable tras uso/sincronización. |
| `recipe_ingredients` | `recipe_version_id`, `ingredient_id`, `quantity`, `unit`, `optional`, `preparation`, `substitution_group_id` | Cantidad normalizable. |
| `ingredient_substitutions` | `source_ingredient_id`, `target_ingredient_id`, `culinary_context`, `conversion_json`, `evidence_json`, `version`, `status` | Editorial; nunca automática. |
| `products` | `brand_id`, `ean`, `name`, `market`, `current_version_id`, `status` | EAN único por mercado con historia de versiones. |
| `brands` | `name`, `owner_company`, `country`, `status` | Marca separada de afirmaciones cruelty-free. |
| `product_versions` | `product_id`, `version`, `label_name`, `ingredient_text`, `allergen_text`, `valid_from`, `valid_until`, `source_summary_json`, `content_hash` | Histórico inmutable. |
| `product_ingredients` | `product_version_id`, `position`, `raw_name`, `ingredient_id`, `qualifier_text`, `normalization_confidence` | Texto original preservado. |
| `evidence_records` | `subject_type`, `subject_id`, `claim_type`, `source_type`, `source_url`, `media_asset_id`, `captured_at`, `valid_until`, `territory`, `submitted_by`, `status` | Sustenta una afirmación concreta. |
| `vegan_classification_runs` | `product_version_id`, `ruleset_version_id`, `result`, `confidence`, `reason_codes_json`, `evidence_ids_json`, `calculated_at` | Resultado reproducible. |
| `classification_rulesets` | `version`, `rules_json`, `approved_by`, `effective_from`, `status` | Una versión activa; no se modifica. |
| `claims` | `subject_type`, `subject_id`, `claim_type`, `value`, `territory`, `valid_from`, `valid_until`, `verification_status`, `evidence_summary_json` | Vegano, certificación y cruelty-free separados. |
| `scan_events` | `user_id`, `ean`, `product_version_id`, `classification_run_id`, `scanned_at`, `offline`, `result_snapshot_json` | Snapshot histórico; telemetría opcional. |
| `correction_proposals` | `subject_type`, `subject_id`, `proposal_type`, `before_json`, `after_json`, `evidence_ids_json`, `submitted_by`, `status`, `risk_level` | No publica directamente. |
| `moderation_actions` | `proposal_id`, `moderator_id`, `action`, `reason`, `occurred_at`, `result_version_id` | Historial inmutable. |
| `establishments` | `name`, `brand_id`, `type`, `website`, `status` | Entidad separada de sucursal. |
| `establishment_locations` | `establishment_id`, `address`, `municipality`, `province`, `postal_code`, `latitude`, `longitude`, `phone`, `hours_json`, `status` | Coordenadas para búsqueda, no seguimiento. |
| `establishment_verifications` | `location_id`, `claim_type`, `claim_scope_json`, `source_type`, `evidence_id`, `verified_by`, `verified_at`, `valid_until`, `status` | Fecha y alcance obligatorios. |
| `media_assets` | `owner_id`, `storage_key`, `mime_type`, `sha256`, `size_bytes`, `metadata_stripped`, `retention_until` | Privado hasta moderación/publicación. |
| `integration_connections` | `household_id`, `destination_app`, `status`, `contract_version`, `authority_map_json`, `last_cursor` | Una conexión por hogar/destino. |
| `external_mappings` | `connection_id`, `entity_type`, `internal_id`, `external_id`, `aggregate_version` | IDs estables entre apps. |
| `outbox_events` | `household_id`, `aggregate_type`, `aggregate_id`, `aggregate_version`, `event_type`, `schema_version`, `payload_json`, `occurred_at`, `published_at` | Misma transacción que el cambio de dominio. |
| `sync_operations` | `household_id`, `user_id`, `device_id`, `operation_uuid`, `command_type`, `payload_json`, `base_version`, `status`, `conflict_json` | Idempotente; no sincroniza saldo absoluto. |
| `audit_logs` | `actor_id`, `action`, `subject_type`, `subject_id`, `origin`, `metadata_json`, `occurred_at` | Inmutable; sin datos sensibles innecesarios. |

`pantry_movements`, versiones de receta, evidencias y moderación serán fuentes de verdad. Saldos, clasificaciones, recomendaciones y estados del directorio serán proyecciones reconstruibles que conservan la versión y evidencia utilizadas.

## 5. Diferenciador frente a competencia

- **Cuatro módulos con continuidad de datos:** objetivos, compras escaneadas, existencias y recetas comparten contexto sin obligar a mantener catálogos duplicados.
- **Respuesta honesta del escáner:** muestra ingrediente incompatible o dudoso, información ausente, evidencia, versión y confianza; “incierto” es un resultado válido.
- **Vegano y cruelty-free no se confunden:** composición, proceso, certificación, política de marca y verificación de establecimiento son afirmaciones independientes.
- **Hogar mixto de primera clase:** perfiles por persona y comida permiten gestionar una nevera real sin etiquetar a todo el hogar de una sola forma.
- **Despensa orientada a cantidades y fechas:** las recetas explican si alcanzan los ingredientes y priorizan FEFO, en vez de sugerir solo por coincidencia nominal.
- **Comunidad sin votación de la verdad:** las correcciones aportan evidencia y pasan por moderación de riesgo; la confianza procede de calidad y recencia, no de popularidad.
- **Directorio temporalmente verificable:** cada atributo indica fuente, alcance, fecha y caducidad, evitando fichas que parecen vigentes indefinidamente.
- **Motor compartido sin acoplamiento:** Planificador de Comidas reutiliza unidades, recetas y movimientos mediante contratos versionados, mientras cada app mantiene su autoridad funcional.

## 6. Fases del roadmap

**Fase 0 — Taxonomías, fuentes y contrato común**

- Definir jurídicamente/editorialmente los claims vegano, incierto, trazas, certificación y cruelty-free, con fuentes y territorios.
- Revisar la finalidad de orientación nutricional, exclusiones, lenguaje permitido y flujo de derivación profesional.
- Extraer el motor de ingredientes/despensa/recetas como paquete Laravel sin dependencias Eloquent y publicar pruebas de contrato con Planificador de Comidas.
- Diseñar tenant, consentimiento, offline, evidencia, moderación y versionado.
- Preparar observabilidad aislada para API, PWA, PHP-FPM, colas, Redis, base de datos, OCR, medios, errores y latencia.

**Fase 1 — Despensa y recetas offline**

- Hogares mixtos, ingredientes, ubicaciones, movimientos, fechas y recetas versionadas.
- PWA con IndexedDB, cola idempotente, sincronización incremental y conflictos.
- Búsqueda por disponibles/cantidades/FEFO y confirmación de consumo.
- Criterio de salida: gestionar una semana completa sin red, reconstruir saldos desde movimientos y no descontar ingredientes por mera planificación.

**Fase 2 — Escáner y catálogo español**

- Productos/EAN/versiones, etiquetas, evidencia y clasificador determinista.
- Resultado explicable compatible/no compatible/dudoso/sin datos y preferencia separada sobre trazas.
- Captura OCR con revisión campo a campo y productos privados pendientes.
- Criterio de salida: corpus representativo de supermercados españoles, cero clasificaciones afirmativas sin evidencia suficiente y reformulaciones históricas preservadas.

**Fase 3 — Transición y orientación prudente**

- Programas semanales, replanificación, contenido versionado y progreso neutral.
- Orientación vinculada a objetivos con consentimiento y guardrails.
- Revisión por dietista-nutricionista de contenido, exclusiones y mensajes.
- Criterio de salida: batería adversa sin diagnóstico, dosis, promesas, culpabilización ni orientación automática en contextos excluidos.

**Fase 4 — Comunidad moderada**

- Propuestas, evidencia, cola de riesgo, moderación, historial y protección frente a abuso.
- Publicación por nueva versión y recálculo trazable de productos afectados.
- Notificación a quienes escanearon/favoritaron una versión solo con consentimiento.
- Criterio de salida: ninguna contribución cambia clasificación o alérgenos sin acción moderadora y cada decisión puede auditarse.

**Fase 5 — Directorio verificado**

- Establecimientos/sucursales, claims separados, evidencias, caducidad y estados stale/disputed/closed.
- Búsqueda geográfica puntual, fichas y reportes moderados sin reseñas sociales.
- Proceso de reverificación y caducidad automática del estado.
- Criterio de salida: ningún local aparece “verificado” sin alcance, fuente y fecha; retirar permiso de ubicación impide su conservación.

**Fase 6 — Integración con Planificador de Comidas**

- Conexión consentida, mapeos, outbox, autoridad por entidad y consumidores idempotentes.
- Transferencia de recetas/despensa y recepción de planes/listas como comandos revisables.
- Conflictos por versiones divergentes, ingrediente no mapeado y eventos fuera de orden.
- Criterio de salida: planificar no descuenta stock, reintentos no duplican movimientos y desconectar no inutiliza ninguna app.

**Fase 7 — Endurecimiento y producción**

- Seguridad de archivos, antimalware, rate limiting, privacidad, exportación/borrado, copias y restauración.
- Accesibilidad, rendimiento con catálogos grandes, compatibilidad cámara/PWA y paquetes offline incrementales.
- QA exhaustivo funcional, offline, concurrencia, clasificación, moderación, directorio e integración.
- Revisión final de claims comerciales, contenido nutricional y fuentes vigentes antes del lanzamiento.
