# Plan Maestro — Diario Fitness y Calorías

## 1. Propósito y usuario objetivo

La app permitirá registrar alimentación, actividad y evolución corporal con el menor esfuerzo posible, usando alimentos, marcas, raciones y medidas habituales en España. Su propósito es ayudar al usuario a observar hábitos, organizar el día y compartir un historial comprensible con su nutricionista o entrenador.

El usuario principal es un adulto que quiere conocer de forma aproximada su consumo energético y nutricional, mejorar hábitos o acompañar un objetivo deportivo. El usuario secundario cocina para varias personas, reutiliza recetas familiares o prepara comida por lotes y necesita repartir raciones sin recalcular cada ingrediente.

El posicionamiento será exclusivamente de bienestar y seguimiento personal. Las calorías, nutrientes, gasto energético y sugerencias serán estimaciones explicadas; la app no diagnosticará, prescribirá dietas ni sustituirá a profesionales sanitarios. Ante embarazo, trastornos de la conducta alimentaria, patologías o necesidades clínicas, recomendará orientación profesional y permitirá desactivar objetivos calóricos.

## 2. Dominios de backend

- **Identidad y privacidad:** usuarios, sesiones, dispositivos, consentimiento, exportación, borrado y políticas reforzadas para datos de salud.
- **Perfil de bienestar:** unidades, preferencias, restricciones declaradas, objetivo opcional y nivel de actividad; sin inferir diagnósticos.
- **Catálogo alimentario:** productos, marcas, códigos de barras, alimentos genéricos, porciones españolas, nutrientes, alérgenos, fuentes y estado de validación.
- **Contribuciones y validación:** propuestas de alta/corrección, evidencias de etiqueta, revisión editorial, versiones y retirada de datos obsoletos.
- **Diario nutricional:** días, comidas, entradas, cantidades, porciones, origen de captura y valores congelados al registrar para preservar el histórico.
- **Captura asistida:** procesamiento de foto, voz o texto, candidatos, confianza y confirmación obligatoria del usuario.
- **Recetas y cocina por lotes:** ingredientes, rendimiento, raciones, pasos, versiones, lotes preparados, existencias y consumo parcial.
- **Actividad:** ejercicios, sesiones, duración, intensidad y energía estimada, diferenciando dato manual de dato importado.
- **Métricas personales:** peso, perímetros, fotos opcionales, sensaciones y notas; granularidad configurable.
- **Cálculos y planificación:** objetivos diarios, nutrientes consumidos, margen restante y redistribución dinámica entre comidas.
- **Orientación:** reglas de wellness, explicaciones, límites de seguridad y registro de qué sugerencia se mostró y por qué.
- **Informes:** agregados, tendencias y exportaciones profesionales con periodo y variables seleccionables.
- **Sincronización offline:** cambios incrementales, idempotencia, resolución de conflictos y borrado lógico.

## 3. Módulos de frontend

- **Onboarding prudente:** unidades, propósito de uso, preferencias, nivel de detalle y avisos de alcance no clínico.
- **Hoy:** resumen de comidas, actividad, energía y nutrientes, con botón para ocultar cifras o metas.
- **Registro rápido:** búsqueda, favoritos, recientes, código de barras, texto, voz y foto; siempre con pantalla de confirmación.
- **Explorador de alimentos:** marca, ración, nutrientes, alérgenos, fuente, fecha de revisión y señal de dato validado o comunitario.
- **Recetas:** creación, importación manual, escalado, porciones familiares, sustituciones y cálculo por ración.
- **Batch cooking:** preparar un lote, asignar recipientes/raciones y descontar cada consumo del lote disponible.
- **Actividad:** sesión manual, rutinas frecuentes e historial; gasto presentado como intervalo o estimación.
- **Ajuste del día:** redistribución opcional del margen restante entre comidas, con fórmula, supuestos y edición manual.
- **Progreso:** tendencias semanales, adherencia de registro, peso/medidas opcionales y notas, evitando mensajes punitivos.
- **Orientación:** sugerencias separadas visualmente del diario, justificadas y descartables.
- **Informe profesional:** periodo, resumen alimentario, actividad, evolución, notas y exportación PDF/CSV.
- **Privacidad y sincronización:** exportar, borrar, bloquear con biometría del dispositivo y revisar cambios pendientes offline.

## 4. Modelo de datos inicial

- `users`, `wellness_profiles`, `devices`, `consents`: preferencias, unidades, alcance aceptado y sincronización.
- `foods`, `brands`, `food_products`, `barcodes`: alimento base, producto comercial, fabricante y código.
- `serving_units`, `food_servings`: gramos, mililitros, unidad, cucharada, vaso o ración y equivalencia.
- `nutrients`, `food_nutrients`: nutriente, cantidad, unidad y base de referencia.
- `food_sources`, `food_versions`, `food_reviews`: procedencia, evidencia, versión y validación.
- `diary_days`, `meals`, `food_entries`: fecha local, comida, alimento, cantidad, valores registrados y método de captura.
- `capture_jobs`, `capture_candidates`: tipo, archivo/transcripción, candidato, confianza y resolución.
- `recipes`, `recipe_versions`, `recipe_ingredients`, `recipe_yields`: composición, versión, rendimiento y raciones.
- `cooking_batches`, `batch_portions`, `batch_consumptions`: lote, cantidad producida, disponible y consumida.
- `activities`, `activity_entries`: ejercicio, duración, intensidad, fuente y estimación energética.
- `body_metrics`, `wellbeing_notes`: métrica, valor, unidad, fecha y nota.
- `daily_targets`, `calculation_snapshots`: objetivo opcional, fórmula, parámetros, resultado y versión.
- `guidance_messages`: tipo, motivo, contenido, límite de seguridad y respuesta del usuario.
- `report_exports`, `audit_logs`, `sync_changes`: alcance, generación, actor, operación y versión.

Las cantidades usarán decimales y unidades explícitas. Los valores nutricionales se copiarán en cada entrada para que una corrección futura del catálogo no reescriba el pasado.

## 5. Diferenciador frente a competencia

La ventaja será combinar baja fricción con datos auditables. El catálogo priorizará marcas españolas, etiquetado por 100 g/ml y medidas domésticas locales. Cada ficha indicará fuente, fecha y validación; las capturas automáticas propondrán datos, pero el usuario conservará la decisión final.

Recetas familiares y batch cooking serán flujos principales, no añadidos: una preparación podrá dividirse en raciones reales y consumirse durante varios días. El ajuste dinámico mostrará cómo cambia el margen restante sin presentar una cifra como obligación.

“Registro” y “orientación” tendrán navegación, lenguaje y permisos separados. Los informes podrán excluir metas, peso o fotografías y exportarán datos limpios para el profesional elegido, sin convertirlo en usuario obligatorio de la plataforma.

## 6. Fases del roadmap

1. **Fundación segura:** Laravel/Vue/PWA, autenticación, diario offline, sincronización idempotente, consentimiento y borrado/exportación.
2. **MVP alimentario:** catálogo inicial validado, búsqueda, raciones españolas, comidas, favoritos, recetas y cálculos explicados.
3. **Captura de baja fricción:** código de barras, voz, texto y foto con candidatos, confianza y confirmación.
4. **Cocina real:** recetas versionadas, escalado familiar, batch cooking, lotes y consumo por raciones.
5. **Actividad y evolución:** sesiones, métricas opcionales, ajuste dinámico, tendencias e informes para profesional.
6. **Madurez y lanzamiento:** flujo editorial del catálogo, accesibilidad, revisión legal/RGPD, controles de lenguaje wellness, seguridad, observabilidad por app y QA exhaustivo offline/multidispositivo.
## 1. Propósito y usuario objetivo

**Diario Fitness y Calorías** permite registrar alimentación, actividad y evolución corporal con la menor fricción posible, mostrando de dónde procede cada cifra. Su finalidad es de seguimiento personal y bienestar: describe patrones y ofrece orientación general configurable, pero no diagnostica enfermedades, interpreta síntomas, prescribe dietas ni sustituye a un profesional sanitario.

El MVP se dirige a adultos residentes en España que quieren registrar comidas y ejercicio de forma cotidiana, especialmente quienes cocinan recetas familiares, preparan varias raciones y usan medidas como cucharada, vaso, unidad, loncha o ración. También sirve a usuarios que desean compartir un historial limpio con su nutricionista o entrenador sin concederle acceso permanente a la cuenta.

Límites de producto:

- No se ofrecerán planes terapéuticos ni recomendaciones para patologías, embarazo, trastornos de la conducta alimentaria o menores. Ante esos contextos, la app limitará la orientación automática y remitirá a un profesional cualificado.
- Calorías, macronutrientes y micronutrientes se mostrarán como estimaciones dependientes del alimento, cantidad, cocción y fuente; nunca como mediciones exactas del organismo.
- Foto, voz y texto producirán propuestas con nivel de confianza. El usuario confirmará alimento, cantidad y unidad antes de incorporarlas al diario.
- Los objetivos serán editables y opcionales. La experiencia permitirá ocultar calorías, peso, rachas y balances para evitar imponer una única relación con el seguimiento.
- El registro histórico no se recalculará silenciosamente cuando cambie el catálogo: cada entrada conservará una instantánea de valores, fuente y versión utilizada.
- La cuenta será individual en el MVP. Las recetas podrán marcarse como familiares, pero no habrá perfiles clínicos compartidos ni seguimiento de menores.
- La captura manual, consulta reciente y edición del día funcionarán sin conexión; reconocimiento remoto, actualización del catálogo y exportación requerirán sincronización.

## 2. Dominios de backend

**Identidad, consentimiento y perfil de bienestar**

- Usuario, zona horaria, idioma, sistema métrico, preferencias de privacidad y módulos visibles.
- Perfil opcional con año de nacimiento, sexo usado por la fórmula si procede, altura, peso de referencia, nivel de actividad y objetivo declarado; cada campo indicará qué cálculo habilita.
- Consentimientos versionados y separados para tratamiento de datos de salud, análisis de imágenes/voz, comunicaciones y exportación.
- Modo de orientación `disabled`, `neutral` o `goal_based`; el modo de registro seguirá operativo aunque el usuario no active orientación.

**Catálogo nutricional**

- Alimentos genéricos, productos envasados, marcas, códigos EAN, nutrientes, alérgenos declarados, porciones y medidas caseras españolas.
- Procedencia diferenciada: fuente pública/curada, etiqueta del fabricante, propuesta comunitaria o alimento privado del usuario.
- Flujo editorial `draft`, `under_review`, `validated`, `rejected`, `superseded`; solo elementos validados aparecerán como primera opción global.
- Nutrientes almacenados por 100 g o 100 ml como base canónica, con energía en kJ y kcal y factores de conversión por medida.
- Versionado de composición y medidas; cada modificación tendrá autor/revisor, evidencia, vigencia y motivo.
- Un producto por código EAN puede tener versiones distintas en el tiempo. Escanear el mismo código no debe reescribir consumos históricos.

**Diario alimentario**

- Días definidos por zona horaria del usuario y franjas configurables: desayuno, media mañana, comida, merienda, cena y otras.
- Entradas con alimento o receta, cantidad, unidad, momento, procedencia de captura y nivel de confirmación.
- Instantánea nutricional inmutable por entrada, derivada de cantidad × factor de medida × composición vigente.
- Copia, favoritos, recientes y plantillas de comida para reducir interacción sin degradar trazabilidad.
- Ediciones y eliminaciones lógicas auditables; cambios offline mediante UUID y versión optimista.

**Medidas y conversiones**

- Unidades canónicas g y ml; unidades contables como unidad, pieza, loncha, cucharada, cucharadita, vaso, taza, puñado y ración.
- Una medida casera siempre pertenece a un alimento o receta y contiene equivalencia en g/ml, fuente, variabilidad y versión. “Una taza” no será una conversión universal.
- Cantidades decimales conservadas con precisión fija; los totales se redondearán solo para presentación.
- Conversión ml↔g únicamente cuando exista densidad específica documentada para el alimento.

**Recetas y batch cooking**

- Receta con ingredientes versionados, cantidades, merma/rendimiento final, número de raciones y peso opcional tras cocción.
- Dos métodos de reparto: por número de raciones o por gramos servidos del lote terminado.
- La nutrición total se calcula desde las instantáneas de ingredientes de la versión; cada consumo guarda la versión de receta utilizada.
- Preparación por lotes con fecha, cantidad producida, raciones disponibles y consumos parciales; el inventario es orientativo, no un sistema de seguridad alimentaria.
- Duplicar y adaptar una receta crea nueva versión sin alterar diarios anteriores.

**Captura multimodal**

- Canal común de candidatos para foto, voz y texto; cada candidato contiene alimento sugerido, cantidad, unidad, confianza y evidencia.
- Foto: detección de componentes y estimación aproximada de porción; no se inferirá con certeza peso, aceite, ingredientes ocultos ni método de cocción.
- Voz: transcripción preservada, separación de varios alimentos y resolución de expresiones españolas como “medio bocadillo” o “un vaso de leche”.
- Texto: analizador de cantidades, unidades, marcas, recetas propias y momentos del día.
- Confirmación agrupada rápida y corrección por componente; las correcciones alimentarán métricas de calidad, no un entrenamiento personalizado sin consentimiento separado.
- Archivos originales con almacenamiento privado, retención corta configurable y opción de eliminación inmediata tras confirmar.

**Actividad física**

- Registro manual de actividad, duración, distancia opcional, intensidad percibida y energía estimada.
- El gasto energético se almacenará con método, parámetros y rango de incertidumbre; no se presentará como medición exacta.
- Importaciones futuras de dispositivos se conectarán mediante adaptadores y conservarán proveedor e identificador externo para impedir duplicados.
- Las calorías de ejercicio no se “devolverán” automáticamente al objetivo de ingesta; esa política será explícita y desactivada por defecto.

**Cálculo y explicación**

- Motor determinista con funciones puras y versionadas para totales nutricionales, normalización de porciones, objetivos y restante del día.
- Cada resultado expondrá fórmula, valores de entrada, fuente, versión, redondeo e incertidumbres relevantes.
- El “resto del día” será `objetivo configurado − consumo confirmado`, ajustado opcionalmente por actividad según política elegida; nunca ocultará valores negativos ni recomendará compensaciones extremas.
- Si faltan datos o la confianza es baja, se mostrará intervalo o estado incompleto en vez de completar con una cifra ficticia.
- Recalcular con una nueva versión del motor será una simulación; los resultados históricos conservarán su versión original.

**Orientación de bienestar**

- Reglas no clínicas basadas en objetivos configurados y patrones observables: distribución pendiente de energía/macros, variedad registrada y regularidad.
- Mensajes redactados como opciones (“podrías considerar”), vinculados a datos visibles y sin afirmar causa, riesgo, enfermedad o resultado garantizado.
- Guardrails para no generar restricciones agresivas, compensaciones por exceso, valoración moral de alimentos ni lenguaje de culpa.
- Señales sensibles —objetivos extremos, pérdida rápida declarada, patrones de restricción o petición clínica— desactivarán recomendaciones automáticas y mostrarán ayuda profesional apropiada.
- Versionado y revisión editorial de cada plantilla de orientación; no se generará texto libre clínico desde un modelo generalista.

**Exportación profesional**

- Exportación PDF y CSV por periodo con diario, recetas, actividad, medidas corporales opcionales y notas del usuario.
- Totales diarios acompañados de fuentes, unidades y aclaración de estimaciones; los registros originales permanecerán distinguibles de la orientación.
- Enlace temporal revocable o archivo descargable; sin cuenta obligatoria para el profesional cuando se use archivo.
- Exclusión selectiva de peso, fotos, notas o comidas antes de exportar; vista previa exacta del contenido.

**Privacidad, seguridad y auditoría**

- Datos de salud y hábitos separados lógicamente de identidad operativa, con autorización por propietario en cada consulta.
- Cifrado en tránsito y reposo, documentos privados, URLs temporales, minimización de logs y prohibición de incluir contenido nutricional en telemetría.
- Exportación, borrado, revocación y retención implementados por tipo de dato; las copias de seguridad respetarán una política documentada de expiración.
- Auditoría de consentimientos, accesos, exportaciones, cambios de objetivos y correcciones del catálogo.

**Sincronización offline**

- Almacén local para catálogo esencial, favoritos, recetas utilizadas, últimos días y cola de mutaciones.
- Sincronización incremental por cursor, UUID del cliente, clave de idempotencia y versión del registro.
- Combinación segura de notas y borradores; conflicto explícito para cantidad, alimento, versión de receta, objetivo o eliminación.
- El catálogo se distribuirá por paquetes versionados y deltas; una actualización fallida no invalidará el diario local.

## 3. Módulos de frontend

**Hoy**

- Línea del día con comidas y actividad, totales confirmados y estado de sincronización.
- Botones persistentes de foto, voz, texto y reutilizar comida; funcionamiento manual completo sin conexión.
- Tarjeta “resto del día” opcional con desglose de cálculo y selector para incluir o no actividad.

**Confirmación de captura**

- Lista de componentes detectados con alimento, cantidad, unidad, confianza y alternativa.
- Corrección en una pulsación mediante recientes, favoritos, código EAN o búsqueda del catálogo.
- Ningún candidato se suma a totales hasta confirmación; el usuario puede confirmar componentes por separado.
- Avisos específicos cuando la foto no permite estimar aceite, salsas, rellenos o tamaño.

**Buscador y catálogo**

- Prioridad: coincidencia exacta validada, productos por EAN, alimentos genéricos, recetas propias y elementos privados.
- Filtros por marca, genérico/envasado, estado de validación y disponibilidad de medida casera.
- Ficha con valores por 100 g/ml y por medida, fuente, fecha/versión, alérgenos declarados y botón para informar de un error.
- Comparar dos resultados antes de elegir para evitar confundir variantes de marca o preparación.

**Recetas y cocina por lotes**

- Constructor por ingredientes con rendimiento final, raciones y método de reparto.
- Recalcular por peso cocinado y mostrar cómo cambia el valor por 100 g sin cambiar el total del lote.
- Crear lote, descontar raciones/gramos al registrar y duplicar versión cuando cambien ingredientes.
- Vista de disponibilidad orientativa sin fechas de consumo seguro ni recomendaciones de conservación.

**Actividad**

- Alta rápida por tipo, duración e intensidad percibida; favoritos para rutinas frecuentes.
- Desglose del método de estimación y posibilidad de introducir una cifra externa identificando su fuente.
- Vista separada del registro alimentario; integración en el restante solo por preferencia expresa.

**Progreso**

- Tendencias semanales/mensuales de consistencia de registro, ingesta estimada, actividad y medidas corporales opcionales.
- Promedios y rangos en lugar de destacar variaciones diarias aisladas.
- Controles para ocultar peso, calorías, rachas o comparaciones; no habrá puntuación moral ni días “buenos/malos”.

**Explicación de cálculos**

- Hoja accesible desde cualquier total con fórmula, entradas, conversiones, fuente y redondeo.
- Trazado desde total diario hasta comida, receta, ingrediente y versión de catálogo.
- Distinción visual entre valor de etiqueta, dato de fuente validada, estimación y dato introducido por el usuario.

**Orientación**

- Panel separado del diario y desactivable; nunca aparecerá mezclado como hecho registrado.
- Sugerencias limitadas a lo que resta según objetivos elegidos, con explicación y alternativas neutrales.
- Bloqueo de orientación y mensaje apropiado cuando el contexto declarado queda fuera del alcance wellness.

**Exportación**

- Selector de periodo y tipos de datos, previsualización y generación de PDF/CSV.
- Portada con objetivo declarado, método de cálculo y advertencia de que los valores son estimaciones de autorregistro.
- Enlace temporal revocable, historial de exportaciones y eliminación anticipada.

**Ajustes y privacidad**

- Objetivos, modo de orientación, política de calorías de actividad, franjas de comida, unidades y módulos visibles.
- Consentimientos, retención de fotos/voz, exportación integral, cierre de cuenta y gestión de sesiones/dispositivos.
- Centro offline con última sincronización, operaciones pendientes, errores y conflictos accionables.

## 4. Modelo de datos inicial

Las claves primarias serán UUID/ULID. Las cantidades usarán decimales de precisión fija; energía y nutrientes se guardarán en unidades canónicas documentadas. Las entidades editables offline incluirán `created_at`, `updated_at`, `deleted_at` y `lock_version`.

| Entidad | Campos específicos iniciales | Restricciones y relaciones |
| --- | --- | --- |
| `users` | `email`, `name`, `locale`, `timezone`, `measurement_system` | Cuenta individual; correo único. |
| `wellness_profiles` | `user_id`, `birth_year`, `formula_sex`, `height_cm`, `reference_weight_g`, `activity_level`, `orientation_mode` | Campos opcionales; registra qué fórmula puede utilizarlos. |
| `user_goals` | `user_id`, `type`, `target_value`, `unit`, `starts_on`, `ends_on`, `source`, `calculation_method`, `formula_version`, `active` | Periodos no solapados por tipo; profesional indicado como fuente, no verificado por la app. |
| `consents` | `user_id`, `purpose`, `policy_version`, `granted_at`, `revoked_at`, `evidence_json` | Consentimiento separado por finalidad. |
| `food_categories` | `parent_id`, `name`, `slug` | Árbol global estable. |
| `foods` | `type`, `name`, `brand`, `ean`, `category_id`, `owner_user_id`, `validation_status`, `current_version_id` | `owner_user_id` nulo para catálogo global; EAN no implica composición inmutable. |
| `food_versions` | `food_id`, `version`, `basis_quantity`, `basis_unit`, `energy_kj`, `energy_kcal`, `valid_from`, `valid_until`, `source_id`, `evidence_ref`, `reviewed_by` | Una versión vigente; nutrientes principales coherentes con base 100 g/ml. |
| `nutrient_definitions` | `code`, `name`, `canonical_unit`, `display_precision` | Códigos internos estables. |
| `food_nutrient_values` | `food_version_id`, `nutrient_id`, `amount`, `data_quality`, `source_note` | Único por versión y nutriente. |
| `data_sources` | `name`, `publisher`, `source_type`, `license`, `url`, `retrieved_at`, `version_label` | La licencia debe permitir el uso previsto antes de publicar datos. |
| `household_measures` | `food_id`, `name`, `region_label`, `equivalent_quantity`, `equivalent_unit`, `variability_percent`, `source_id`, `version`, `validation_status` | Específica del alimento; no conversión universal. |
| `diary_days` | `user_id`, `local_date`, `timezone`, `status` | Único por usuario y fecha local. |
| `meal_slots` | `diary_day_id`, `type`, `label`, `sort_order` | Tipos predefinidos más etiquetas personalizadas. |
| `food_entries` | `meal_slot_id`, `food_id`, `food_version_id`, `recipe_version_id`, `quantity`, `unit`, `gram_equivalent`, `captured_at`, `capture_method`, `confirmation_status`, `nutrition_snapshot_json`, `calculation_trace_json` | Una entrada apunta a alimento o receta, no ambos; solo confirmadas computan. |
| `recipes` | `owner_user_id`, `name`, `is_family_recipe`, `current_version_id`, `archived_at` | Privada por defecto. |
| `recipe_versions` | `recipe_id`, `version`, `yield_quantity`, `yield_unit`, `servings`, `cooked_weight_g`, `nutrition_snapshot_json`, `created_from_version_id` | Inmutable tras utilizarse en una entrada. |
| `recipe_ingredients` | `recipe_version_id`, `food_id`, `food_version_id`, `quantity`, `unit`, `gram_equivalent`, `nutrition_snapshot_json` | Conserva composición usada en esa versión. |
| `batch_preparations` | `recipe_version_id`, `prepared_on`, `produced_quantity`, `unit`, `remaining_quantity`, `status` | Inventario orientativo; no modela seguridad alimentaria. |
| `activity_types` | `name`, `category`, `met_value`, `met_source`, `version` | Catálogo versionado; MET no se presenta como medición individual. |
| `activity_entries` | `user_id`, `local_date`, `activity_type_id`, `duration_seconds`, `distance_m`, `perceived_intensity`, `energy_kcal_estimate`, `energy_range_json`, `calculation_method`, `calculation_trace_json`, `source_type`, `external_id` | Único por fuente/ID externo cuando exista. |
| `body_measurements` | `user_id`, `measured_at`, `type`, `value`, `unit`, `source_type`, `notes` | Ocultable y excluible de exportación. |
| `capture_sessions` | `user_id`, `method`, `input_text`, `media_asset_id`, `status`, `model_version`, `retention_until` | No crea entradas definitivas por sí sola. |
| `capture_candidates` | `capture_session_id`, `position`, `suggested_food_id`, `raw_label`, `quantity`, `unit`, `confidence`, `evidence_json`, `status`, `resolved_entry_id` | Cada componente se confirma o descarta por separado. |
| `media_assets` | `user_id`, `type`, `storage_key`, `mime_type`, `sha256`, `captured_at`, `retention_until`, `deleted_at` | Almacenamiento privado y URL temporal. |
| `guidance_messages` | `user_id`, `diary_day_id`, `template_version_id`, `input_snapshot_json`, `message_text`, `status`, `suppressed_reason` | Separado de registros; reproducible desde entradas y plantilla. |
| `guidance_templates` | `code`, `version`, `scope`, `rules_json`, `content_json`, `review_status`, `reviewed_by` | Contenido editorial controlado; no texto clínico libre. |
| `calculation_runs` | `user_id`, `subject_type`, `subject_id`, `calculation_type`, `engine_version`, `inputs_json`, `formula_json`, `result_json`, `created_at` | Trazabilidad de resultados y simulaciones. |
| `exports` | `user_id`, `format`, `period_start`, `period_end`, `scope_json`, `storage_key`, `expires_at`, `revoked_at`, `status` | Archivo privado, temporal y regenerable. |
| `sync_operations` | `user_id`, `device_id`, `operation_uuid`, `entity_type`, `entity_id`, `action`, `base_version`, `status`, `conflict_json` | `operation_uuid` única para idempotencia. |
| `audit_logs` | `user_id`, `actor_id`, `action`, `subject_type`, `subject_id`, `origin`, `before_json`, `after_json`, `occurred_at` | Inmutable y sin contenido sensible innecesario. |

Los snapshots nutricionales y trazas de cálculo son la fuente histórica de lo mostrado al usuario; las tablas globales del catálogo sirven para nuevas selecciones. Los agregados diarios/semanales serán proyecciones reconstruibles y nunca sustituirán las entradas confirmadas.

## 5. Diferenciador frente a competencia

- **Catálogo útil en España y auditable:** combina productos, alimentos genéricos y medidas caseras específicas, mostrando fuente, versión y estado de validación en lugar de mezclar entradas comunitarias indistinguibles.
- **Captura asistida, no registro ficticio:** foto, voz y texto aceleran el alta, pero la confirmación explícita evita que una estimación silenciosa altere calorías o nutrientes.
- **Recetas que sobreviven a cambios reales:** rendimiento cocinado, raciones, gramos servidos, versiones y lotes permiten registrar cocina familiar sin recalcular el pasado.
- **Cada cifra tiene recorrido:** el usuario puede bajar desde el total diario hasta la porción, conversión, composición y fuente que lo originaron.
- **Ajuste diario configurable y neutral:** el restante cambia con lo registrado y con la política elegida para actividad, pero no impone compensaciones ni juzga alimentos.
- **Separación estructural entre hechos y orientación:** distintas entidades, pantallas y permisos impiden presentar una sugerencia como dato observado o recomendación clínica.
- **Privacidad acorde con datos sensibles:** retención corta de medios, telemetría sin contenido alimentario, exportación selectiva y enlaces revocables forman parte del producto base.
- **Exportación profesional verificable:** nutricionista o entrenador recibe entradas, métodos y fuentes, no solo gráficos agregados imposibles de revisar.

## 6. Fases del roadmap

**Fase 0 — Límites, fuentes y seguridad**

- Formalizar finalidad wellness, lenguaje permitido/prohibido, exclusiones de orientación y flujo de derivación a profesional.
- Evaluar y documentar fuentes nutricionales, licencias, unidades, versionado y proceso editorial del catálogo.
- Definir objetos de valor para cantidades, nutrientes, medidas, snapshots y trazas de cálculo.
- Completar evaluación de impacto de privacidad antes de tratar fotos, voz, alimentación, actividad o medidas corporales.
- Preparar observabilidad aislada: PHP-FPM, colas, Redis, base de datos, almacenamiento, inferencias, errores y latencia sin payloads sensibles.

**Fase 1 — Diario manual offline-first**

- Cuenta individual, catálogo curado inicial, búsqueda, medidas españolas, comidas y favoritos.
- PWA, almacenamiento local, cola idempotente y sincronización incremental.
- Totales diarios con trazas completas y controles para ocultar calorías/peso.
- Criterio de salida: registrar y editar un día completo offline, sincronizar sin duplicación y reproducir cada total desde su snapshot.

**Fase 2 — Recetas, lotes y actividad**

- Recetas versionadas, rendimiento cocinado, reparto por raciones/gramos y batch cooking.
- Actividad manual con método e intervalo de estimación.
- Objetivos opcionales y resto del día con política de actividad explícita.
- Criterio de salida: diarios históricos invariantes ante cambios de receta/catálogo y pruebas de conversión/redondeo en todas las unidades.

**Fase 3 — Captura multimodal**

- Entrada por texto y voz; después fotografía con candidatos por componente.
- Confirmación, alternativas, confianza, evidencia y retención configurable de medios.
- Métricas de precisión por canal y tipo de alimento sobre un conjunto español anonimizado.
- Criterio de salida: ninguna inferencia no confirmada afecta totales; degradación segura sin conexión o ante fallo del proveedor.

**Fase 4 — Orientación y progreso**

- Motor determinista versionado, panel separado, plantillas editoriales y guardrails.
- Tendencias con promedios/rangos, módulos ocultables y simulación del resto del día.
- Revisión especializada del lenguaje, límites y supresión de orientación en contextos excluidos.
- Criterio de salida: batería de casos adversos sin diagnóstico, prescripción, culpabilización ni recomendaciones restrictivas peligrosas.

**Fase 5 — Exportación profesional**

- PDF/CSV selectivo, vista previa, enlaces temporales revocables e historial.
- Inclusión de fórmulas, fuentes, versiones y notas metodológicas.
- Validación de utilidad con nutricionistas y entrenadores sin convertirlos en usuarios clínicos de la plataforma.
- Criterio de salida: toda cifra exportada puede rastrearse a registros confirmados; exclusiones de privacidad verificadas automáticamente.

**Fase 6 — Endurecimiento y producción**

- Seguridad de archivos, validación MIME, análisis antimalware, rate limiting, sesiones y borrado/retención.
- Copias de seguridad cifradas, restauración probada, accesibilidad, rendimiento plurianual y actualización incremental del catálogo.
- QA exhaustivo funcional, offline, concurrencia, privacidad, cálculos, exportación y navegadores PWA.
- Revisión final de posicionamiento, textos comerciales y cambios funcionales para impedir deriva hacia diagnóstico o tratamiento antes del lanzamiento.
