# Plan Maestro — Planificador de Comidas Semanal

## 1. Propósito y usuario objetivo

Planificador familiar que construye la semana desde las existencias, sobras y restricciones reales del hogar, y convierte el plan confirmado en una lista de compra consolidada. Su unidad de valor no es descubrir recetas, sino reducir compras duplicadas, desperdicio y decisiones diarias sin imponer una dieta.

El usuario principal es quien organiza comidas para una o varias personas en España, con perfiles omnívoros, veganos o mixtos, horarios y raciones diferentes. Debe servir con una despensa aproximada —“queda medio paquete”— y no exigir inventario exacto, precios completos ni información nutricional.

Principios de producto:

- Las alergias y exclusiones de seguridad son restricciones duras; preferencias, temporada, presupuesto y variedad son objetivos negociables cuya relajación debe explicarse.
- El plan se calcula por comensales asignados a cada comida, no multiplicando toda receta por el tamaño total del hogar.
- Descontar despensa solo tras convertir ingrediente, unidad, preparación y merma a una base compatible; si la equivalencia es incierta, preguntar o no descontar.
- No agrupar ingredientes porque sus nombres se parezcan: deben compartir identidad canónica, forma compatible y reglas de sustitución aceptadas.
- Mantener separados `cantidad requerida`, `cantidad disponible`, `cantidad reservada`, `cantidad a comprar` y `formato comercial sugerido`.
- Una receta importada es siempre borrador hasta confirmar ingredientes, cantidades, raciones, pasos, alérgenos y fuente.
- El presupuesto puede optimizar cantidades estimadas, pero no prometer un coste sin precios vigentes y cobertura suficiente.
- Las sobras son lotes con origen, cantidad aproximada, disponibilidad y decisión del usuario; no se crean automáticamente porque una receta “debería” sobrar.
- La clasificación vegana del hogar no sustituye la comprobación de ingredientes y trazas de un producto concreto.

## 2. Dominios de backend

- **Identidad y hogares:** usuarios, hogares, miembros, roles y preferencias. Permisos separados para editar despensa, recetas, plan, lista y restricciones sensibles.
- **Motor compartido de despensa/recetas:** paquete Laravel independiente con contratos versionados para ingredientes, unidades, recetas, lotes, movimientos, equivalencias e importación; consumido también por Nevera Vegana.
- **Frontera entre apps:** el paquete compartido no conoce semanas, comidas, presupuesto, supermercados ni perfiles de planificación. La sincronización entre productos usa eventos versionados y consentimiento, no acceso cruzado a tablas.
- **Ingredientes canónicos:** alimento base, variantes, estado físico, preparación, densidad/rendimiento opcionales, alérgenos y etiquetas dietarias con procedencia.
- **Unidades y conversiones:** masa, volumen, unidades contables y medidas caseras españolas. Las conversiones dependientes del ingrediente requieren factor y confianza; `1 vaso` conserva tamaño configurable.
- **Recetas versionadas:** raciones base, ingredientes estructurados, pasos, tiempos, equipamiento, fuente, licencia/uso y estado de revisión. Editar una receta usada en un plan crea nueva versión.
- **Importación de recetas:** adaptadores URL, OCR de foto y texto; extraen un borrador con fragmento fuente por campo, confianza y errores. Respetar restricciones de acceso y no republicar contenido importado como catálogo público.
- **Escalado de raciones:** cantidades escalables, no escalables, rangos y redondeos culinarios. Huevos, sobres, moldes y unidades enteras requieren política explícita.
- **Despensa:** ubicaciones, lotes, cantidad/estado aproximado, fechas, reservas, consumos y ajustes. El saldo deriva de movimientos; admite `desconocido`, `poco`, `medio`, `mucho` sin falsa precisión.
- **Perfiles alimentarios:** miembro, perfil vegano/omnívoro/mixto, alergias, intolerancias declaradas, exclusiones, preferencias y vigencia. “Mixto” se resuelve por miembro y comida, no por etiqueta global de receta.
- **Evaluación de restricciones:** comprueba ingredientes y sustituciones contra comensales. Si faltan datos de alérgenos, marca `no verificado` y nunca `seguro`.
- **Plan semanal:** semana, zona horaria, slots de comida, comensales, receta/elemento libre, raciones, estado y versión.
- **Motor de propuesta:** prioriza caducidades, sobras, disponibilidad, tiempo, presupuesto, temporada y variedad bajo pesos editables. Devuelve razones, restricciones cumplidas, datos ausentes y compromisos.
- **Temporada:** calendario orientativo por producto y región española, fuente y vigencia; afecta prioridad, no declara origen ni sostenibilidad del artículo comprado.
- **Presupuesto:** límite semanal, gastos fijos opcionales, precios conocidos, cobertura y margen. El motor distingue coste ya hundido de despensa y coste incremental de compra.
- **Sobras:** lotes de preparado vinculados a una cocción confirmada; porciones, consumo preferente elegido y destinos planificados.
- **Batch cooking:** sesiones con recetas, dependencias, equipamiento, tareas paralelizables y productos resultantes. El orden es operativo, no una garantía de seguridad alimentaria.
- **Lista de compra:** demanda consolidada, descuento de lotes/reservas, agrupaciones, sustituciones y redondeo a formatos comerciales; regeneración mediante diferencias para preservar checks y notas.
- **Supermercados y secciones:** establecimientos/cadenas favoritos, taxonomía de pasillos por configuración del usuario y mapeos versionados. No asumir que todas las tiendas de una cadena comparten distribución.
- **Precios y formatos:** datos manuales o fuentes autorizadas con tienda, fecha, unidad, promoción y cobertura. No rastrear precios sin licencia o condiciones compatibles.
- **Sincronización offline:** UUID cliente, cola durable, control optimista y conflictos de dominio. Los checks de compra se fusionan como eventos; cambios incompatibles de cantidades se presentan para revisión.
- **Notificaciones:** recordatorios de descongelado, preparación, caducidad aproximada y compra, configurables y no prescriptivos.
- **Auditoría y privacidad:** cambios de alergias, accesos, importaciones, exportaciones e integración. Logs técnicos sin alergias, recetas privadas ni contenido de la despensa.

Reglas críticas:

- Una alergia activa bloquea propuestas con coincidencia confirmada y también sustituciones; una coincidencia incierta exige revisión explícita.
- Reservar para un plan reduce disponibilidad calculable, pero no consume stock. Solo cocinar, usar, descartar o ajustar genera movimiento.
- Cambiar una receta o los comensales invalida sus cálculos dependientes y recalcula la lista como diff, no como borrado total.
- Una equivalencia agrupa demanda sin perder sus líneas de origen; el usuario puede desagrupar y recordar la decisión.
- La ausencia de precio mantiene el artículo en la lista y reduce la cobertura presupuestaria; nunca se imputa precio cero.
- La app no certifica ausencia de alérgenos ni controla contaminación cruzada de cocina o supermercado.

## 3. Módulos de frontend

- **Semana:** cuadrícula por día y momento, comensales visibles, arrastrar/mover y estados `borrador`, `confirmado`, `cocinado` y `omitido`.
- **Asistente de propuesta:** pregunta tiempo, presupuesto, prioridades y días especiales; muestra qué usa de despensa, qué caduca, qué sobra reutiliza y qué restricciones no pudo satisfacer.
- **Alta de hogar:** miembros, raciones relativas, presencia habitual, perfiles vegano/omnívoro/mixto, alergias y preferencias con visibilidad controlada.
- **Importador de receta:** URL, foto o texto; comparación fuente–campo, confianza y corrección obligatoria de raciones/unidades ambiguas.
- **Editor de receta:** versiones, cantidades, unidades, escalabilidad, sustituciones, tiempos, equipamiento y alérgenos no verificados.
- **Ajuste por comensales:** asigna quién come cada slot y muestra redondeos no lineales; permite guardar una variante familiar sin alterar el original.
- **Despensa:** vista rápida por ubicación y caducidad, niveles aproximados, escaneo/escritura manual y movimientos. La app funciona aunque solo se registren ingredientes clave.
- **Cobertura de despensa:** desglose por ingrediente de requerido, disponible, reservado, faltante y decisión de equivalencia.
- **Sobras:** confirmar porciones al cocinar, planificar reutilización, congelar, consumir o descartar. No presupone que el rendimiento teórico fue real.
- **Batch cooking:** agenda por bloques, preparación común, dependencias y checklist offline; persistencia del punto de sesión al cambiar de app.
- **Lista automática:** agrupada por sección, receta, prioridad o supermercado; cantidades consolidadas con acceso a líneas de origen.
- **Resolución de equivalencias:** compara “tomate triturado” con “tomate entero”, marcas o formatos y permite `agrupar esta vez`, `siempre` o `nunca`.
- **Modo supermercado:** botones grandes, funcionamiento offline, checks compartidos y detección de edición concurrente; no revela alergias en notificaciones.
- **Orden por tienda:** mapeo editable de secciones y pasillos por establecimiento; los elementos sin sección quedan en `Revisar`, no al final invisibles.
- **Presupuesto:** estimado, rango, cobertura de precios y coste incremental; separa comprado, pendiente y artículos sin precio.
- **Temporada:** indicador regional con fuente; sirve como criterio de propuesta, no bloquea ingredientes fuera de temporada.
- **Historial:** planes, cambios, recetas cocinadas, gasto declarado y desperdicio; repetir semana crea copia versionada.
- **Integración Nevera Vegana:** consentimiento, recursos sincronizados, origen y conflictos; opción de desconectar sin borrar recetas o lotes propios de la otra app.
- **Estado offline:** cambios pendientes, último sincronizado y conflictos; plan, recetas descargadas, despensa y lista siguen operativos.

## 4. Modelo de datos inicial

| Entidad | Campos y decisiones específicas |
|---|---|
| `users` | Identidad del core, idioma, zona horaria, unidades y preferencias de accesibilidad. |
| `households` | Nombre, propietario, región, moneda, política de compartición y versión. |
| `household_members` | Hogar, usuario opcional, alias, rol, factor de ración y estado. |
| `member_food_profiles` | Miembro, perfil, alergias/exclusiones cifradas, preferencias, vigencia y fuente declarada. |
| `ingredients` | ID canónico, nombre base, categoría, estado, datos dietarios y procedencia. Entidad del motor compartido. |
| `ingredient_variants` | Ingrediente, forma/preparación, nombre local, rendimiento y compatibilidad. Compartida. |
| `units` | Dimensión, símbolo, escala, región y precisión. Compartida. |
| `ingredient_conversions` | Ingrediente/variante, unidad origen/destino, factor/rango, confianza, fuente y versión. Compartida. |
| `recipes` | Propietario, visibilidad, origen, estado y versión actual. Compartida. |
| `recipe_versions` | Receta, raciones base, pasos, tiempos, equipamiento, fuente, hash y autor. Compartida. |
| `recipe_ingredients` | Versión, ingrediente/variante, cantidad/rango, unidad, escalabilidad, opcionalidad y texto original. Compartida. |
| `recipe_imports` | Método, fuente, parser/versión, borrador, fragmentos, confianza, licencia y confirmación. Compartida. |
| `pantry_locations` | Hogar, nombre, tipo y orden. Compartida. |
| `pantry_lots` | Ingrediente/variante, ubicación, cantidad/unidad o nivel aproximado, fechas, estado y versión. Compartida. |
| `pantry_movements` | Lote, tipo, cantidad/nivel, hora, origen, actor y `operation_id`. Compartida. |
| `pantry_reservations` | Lote/demanda, cantidad, plan, vigencia y estado; no es consumo. Compartida. |
| `meal_plans` | Hogar, semana local, zona horaria, estado, presupuesto, moneda y versión. |
| `meal_slots` | Plan, fecha, tipo, receta/elemento libre, versión de receta, raciones, estado y orden. |
| `meal_participants` | Slot, miembro, factor de ración y restricciones congeladas. |
| `planning_runs` | Plan, pesos, restricciones, instantánea de despensa/precios, motor, resultado, razones y hash. |
| `seasonality_rules` | Ingrediente, región, meses, intensidad, fuente, vigencia y versión. |
| `leftover_batches` | Slot/cocción origen, receta, porciones reales/aproximadas, disponibilidad, ubicación, fecha y estado. |
| `leftover_allocations` | Lote, slot destino, porciones reservadas y estado. |
| `batch_sessions` | Plan, fecha, duración objetivo, equipamiento, estado y versión. |
| `batch_tasks` | Sesión, receta/paso, dependencia, duración, paralelizable, orden y estado. |
| `shopping_lists` | Plan, estado, versión y algoritmo de consolidación. |
| `shopping_demands` | Lista, ingrediente/variante, requerido, cubierto, reservado, faltante, unidad base y líneas origen. |
| `shopping_items` | Demanda/grupo, texto, cantidad, unidad, formato, tienda, sección, estado y actor. |
| `equivalence_decisions` | Hogar, variantes implicadas, ámbito, decisión, restricciones y autor. |
| `stores` | Hogar/cadena, nombre, localidad, fuente y estado. |
| `store_sections` | Tienda/cadena, nombre, orden, ámbito y versión. |
| `ingredient_section_mappings` | Ingrediente/variante, sección, tienda/ámbito, confianza y autor. |
| `price_observations` | Producto/ingrediente, tienda, formato, precio, unidad comparable, fecha, promoción y fuente. |
| `integration_consents` | Hogar, app destino, recursos, dirección, finalidad, otorgado y revocado. |
| `integration_outbox` | Evento versionado, recurso, payload mínimo, consentimiento, idempotencia, estado e intentos. |
| `sync_operations` | UUID cliente, dispositivo, entidad, acción, versión base, estado y conflicto. |

Convenciones iniciales:

- El motor compartido se publica como paquete Composer interno y esquema de eventos; cada app mantiene migraciones propias para sus dominios exclusivos.
- IDs globales opacos para ingredientes, recetas y lotes; no usar autoincrementos compartidos entre aplicaciones.
- Cantidades con decimal y unidad explícita; niveles aproximados en campo distinto para impedir sumas de falsa precisión.
- Fechas de comida como fecha local y slot; movimientos como instantes UTC más zona de origen.
- Índices por hogar/semana, ingrediente/ubicación/estado, receta/versión, lista/estado y sincronización/dispositivo/estado.
- Toda línea consolidada conserva relación con demandas y recetas de origen para explicar y revertir agrupaciones.

## 5. Diferenciador frente a competencia

- **Planificación pantry-first real:** las existencias y caducidades participan antes de seleccionar recetas, no se descuentan al final como decoración.
- **Raciones por presencia:** calcula quién come cada comida y aplica factores individuales; evita inflar una receta porque el hogar tenga miembros ausentes.
- **Equivalencias reversibles:** agrupa ingredientes compatibles con procedencia visible y decisiones recordables, sin perder el detalle culinario.
- **Alergias como restricción dura:** bloquean receta y sustitución confirmadas; los datos incompletos se marcan como no verificados, nunca como seguros.
- **Sobras confirmadas:** solo planifica lo que el usuario declara disponible y mantiene su origen, porciones y reservas.
- **Presupuesto honesto:** muestra rango y cobertura de precios, separa coste incremental de existencias y nunca trata un precio desconocido como cero.
- **Lista adaptada a tiendas reales:** el orden por sección es editable por establecimiento y sobrevive a diseños distintos dentro de una cadena.
- **Importación auditable:** cada campo mantiene fragmento fuente y confianza; una receta raspada u obtenida por OCR no entra silenciosamente en el motor.
- **Núcleo compartido sin acoplamiento:** Nevera Vegana reutiliza ingredientes, recetas y despensa, mientras cada producto conserva consentimiento, base de datos y lógica propia.

La métrica principal será el porcentaje de ingredientes de planes confirmados cubiertos por despensa o sobras antes de comprar. Métricas de calidad: correcciones tras importar, conversiones ambiguas, agrupaciones deshechas, cobertura de precios, desperdicio declarado, conflictos offline y propuestas bloqueadas por seguridad. No se optimizará por número de recetas sugeridas ni por tiempo dentro de la app.

## 6. Fases del roadmap

**Fase 0 — Contratos compartidos y seguridad alimentaria**

- Delimitar paquete compartido frente a dominios exclusivos y publicar ADR, contratos de eventos y política de versiones.
- Formalizar ingrediente, variante, unidad, conversión, lote, movimiento, reserva, alergia y equivalencia.
- Crear corpus español de medidas caseras y casos de escalado no lineal.
- Revisar textos y flujos de alergias para no prometer ausencia de trazas ni sustituir indicaciones profesionales.

**Fase 1 — MVP manual offline-first**

- Hogar, miembros, perfiles, recetas manuales, semana, comensales y lista básica.
- Despensa aproximada, movimientos, descuento de existencias y explicación por ingrediente.
- PWA con IndexedDB, cola idempotente y conflictos de lista/plan.
- Salida: crear semana y comprar sin red conservando checks y cantidades.

**Fase 2 — Motor de recetas y normalización**

- Versiones, escalado por raciones, unidades, medidas caseras y conversiones dependientes del ingrediente.
- Importación desde URL, foto y texto como borrador revisable con fragmentos y confianza.
- Agrupación reversible y centro de equivalencias.
- Pruebas doradas compartidas ejecutadas tanto en Planificador como en Nevera Vegana.

**Fase 3 — Despensa, sobras y batch cooking**

- Reservas sin consumo, lotes de sobras confirmados y asignación a futuras comidas.
- Sesiones de batch cooking con dependencias y persistencia offline.
- Caducidades y recordatorios prudentes, sin inferir seguridad alimentaria de una fecha aislada.
- Salida: cocinar actualiza stock únicamente mediante confirmaciones y movimientos auditables.

**Fase 4 — Propuestas, presupuesto y temporada**

- Optimizador explicable con restricciones duras, objetivos ponderados y relajaciones visibles.
- Precios manuales/fuentes autorizadas, rango, cobertura y coste incremental.
- Temporada regional versionada y preferencia de variedad.
- Salida: cada propuesta enumera datos utilizados, restricciones cumplidas y compromisos realizados.

**Fase 5 — Supermercados e integración con Nevera Vegana**

- Tiendas, secciones editables, formatos comerciales y modo supermercado compartido.
- Eventos de receta/despensa, consentimientos, procedencia, idempotencia y resolución de conflictos entre apps.
- Pruebas de desconexión, borrado y versiones incompatibles del paquete.
- Salida: ninguna app consulta tablas de la otra ni replica datos no seleccionados.

**Fase 6 — Producción y comercialización**

- RGPD: perfiles alimentarios, alergias, miembros sin cuenta, retención, exportación y borrado.
- Accesibilidad WCAG 2.2 AA y pruebas iOS/Android, modo avión, cámara, listas largas y sesión de cocina persistente.
- Seguridad de importadores URL, imágenes, contenido no confiable, archivos y autorización horizontal del hogar.
- Observabilidad separada para Laravel, PHP-FPM, colas, Redis, base de datos, OCR/importadores, sincronización y motor compartido por aplicación.
- Despliegue gradual condicionado a conversiones, restricciones de alergias, integridad offline y compatibilidad contractual con Nevera Vegana.
