# Plan Maestro — Control de Inventario B2B

## 1. Propósito y usuario objetivo

La app permitirá a autónomos y pequeños comercios españoles conocer qué stock tienen, dónde está, cuánto vale y qué deben reponer, sin implantar un ERP. El trabajo central será registrar entradas, salidas, transferencias y ajustes con rapidez desde móvil, incluso sin conexión.

El usuario principal es el propietario de una tienda, taller, almacén pequeño, negocio de servicios con consumibles o profesional autónomo que actualmente utiliza Excel, papel o una aplicación demasiado compleja. El usuario secundario es el empleado ocasional que solo necesita consultar, contar, recibir, entregar o mover artículos.

El producto cubrirá inventario operativo, lotes, caducidades y valoración. No incluirá inicialmente contabilidad completa, nóminas, CRM, ecommerce, fabricación avanzada ni gestión fiscal. Holded y Facturae serán integraciones opcionales y desacopladas; el inventario seguirá funcionando si no se utilizan.

## 2. Dominios de backend

- **Negocios y acceso:** organizaciones, propietarios, empleados, invitaciones, roles simples y límites del plan contratado.
- **Catálogo:** productos, variantes, SKU, EAN, unidad, categoría, proveedor preferente, fotografías y estado.
- **Ubicaciones:** almacenes, tiendas, zonas, estanterías y ubicaciones virtuales como “en tránsito” o “merma”.
- **Existencias:** saldo por producto, variante, ubicación y, cuando proceda, lote; disponibilidad y stock reservado.
- **Movimientos:** recepción, salida, venta informada, consumo interno, devolución, transferencia, merma y ajuste; operación inmutable con reversión compensatoria.
- **Lotes y caducidades:** número de lote, fecha de recepción, caducidad, coste, proveedor y estrategia FEFO.
- **Reposición:** mínimos por ubicación, alertas, sugerencias y borradores de pedido, sin convertirse en módulo completo de compras.
- **Valoración:** coste medio ponderado como método inicial, instantáneas por fecha y desglose de movimientos; otros métodos quedarán fuera del MVP.
- **Importación:** Excel/CSV, mapeos reutilizables, validación, vista previa, errores por fila e idempotencia del lote.
- **Captura e identificación:** código de barras, foto asistida y generación de etiquetas QR internas.
- **Conteos:** inventario total o cíclico, sesiones, diferencias, aprobación y ajustes resultantes.
- **Auditoría:** actor, dispositivo, fecha, motivo y relación entre operación original y corrección.
- **Sincronización offline:** cola local, claves idempotentes, versiones, conflictos y consistencia por ubicación.
- **Integraciones:** adaptadores versionados para Holded y exportación/importación documental compatible con flujos de Facturae.
- **Informes:** existencias, movimientos, rotación básica, caducidades, bajo mínimo y valoración.

## 3. Módulos de frontend

- **Inicio:** artículos bajo mínimo, próximos a caducar, movimientos recientes, tareas de conteo y valor del inventario.
- **Productos:** búsqueda por nombre/SKU/EAN, filtros, ficha, variantes, imágenes, existencias por ubicación y trazabilidad.
- **Alta rápida:** formulario mínimo, escaneo de código, fotografía y duplicación de un producto existente.
- **Importador Excel/CSV:** plantilla descargable, mapeo de columnas, vista previa, validaciones y resumen antes de confirmar.
- **Escáner operativo:** entrada, salida, traslado o consulta mediante cámara; cesta de múltiples artículos antes de guardar.
- **Movimientos:** historial filtrable, detalle auditable, motivo, adjunto opcional y reversión autorizada.
- **Ubicaciones:** mapa jerárquico simple, stock contenido y transferencias origen-destino.
- **Lotes y caducidades:** recepción por lote, semáforo configurable y propuesta de salida FEFO.
- **Reposición:** mínimos, alertas y lista consolidada por proveedor.
- **Conteos:** congelación lógica de sesión, escaneo, cantidad contada, diferencias y aprobación.
- **Etiquetas:** diseño básico, selección masiva y PDF imprimible con QR, SKU y nombre.
- **Informes:** valoración, stock, caducidad y movimientos; exportación Excel/CSV.
- **Equipo:** invitaciones, roles predefinidos, ubicaciones permitidas y registro de actividad.
- **Sincronización:** estado offline, operaciones pendientes y conflictos que requieren decisión.
- **Integraciones:** conexión, mapeo, última ejecución, errores y desconexión de Holded/Facturae.

## 4. Modelo de datos inicial

- `businesses`, `business_members`, `invitations`, `roles`: negocio, usuario, rol y permisos limitados.
- `products`, `product_variants`, `categories`, `units`: ficha, SKU, EAN, unidad y estado.
- `suppliers`, `product_suppliers`: proveedor, referencia, coste y preferencia.
- `locations`: negocio, padre, tipo, nombre y estado.
- `lots`: variante, proveedor, código, recepción, caducidad y coste unitario.
- `stock_balances`: variante, ubicación, lote opcional, disponible, reservado y versión.
- `stock_movements`: tipo, variante, lote, origen, destino, cantidad, coste, motivo, actor e idempotency key.
- `movement_reversals`: movimiento original, movimiento compensatorio, autor y motivo.
- `reorder_rules`: variante, ubicación, mínimo, objetivo y proveedor.
- `inventory_counts`, `count_lines`: alcance, estado, cantidad esperada, contada y diferencia.
- `import_batches`, `import_rows`, `import_mappings`: archivo, columnas, fila, validación y resultado.
- `label_batches`, `labels`: formato, entidad, token QR no sensible y estado.
- `valuation_snapshots`, `valuation_lines`: fecha, método, cantidades, coste y total.
- `integration_connections`, `integration_runs`, `external_mappings`: proveedor, credenciales cifradas, cursor, resultado e identificadores externos.
- `devices`, `sync_operations`, `audit_logs`: dispositivo, versión, operación, actor y fecha.

Cantidades y costes usarán decimales con precisión por unidad. Los movimientos confirmados no se editarán: cualquier corrección generará una compensación auditable.

## 5. Diferenciador frente a competencia

La ventaja será ofrecer profundidad operativa sin complejidad de ERP. Un comercio podrá empezar desde su Excel, imprimir QR y trabajar ese mismo día. Los empleados ocasionales tendrán pantallas limitadas por tarea y ubicación, sin pagar licencias individuales ni acceder a costes sensibles.

El diseño offline será transaccional: cada movimiento quedará en cola con identificador único, estado visible y prevención de duplicados al reconectar. Los conflictos de saldo nunca se ocultarán; se resolverán mediante recuento o movimiento compensatorio.

La adaptación española incluirá Excel con formatos locales, unidades y proveedores habituales, además de conectores opcionales. El precio será por negocio con una bolsa razonable de miembros y dispositivos; los límites comerciales se basarán en volumen o funciones, no en penalizar cada usuario temporal.

## 6. Fases del roadmap

1. **Fundación:** Laravel/Vue/PWA, negocio, roles, catálogo, ubicaciones, movimientos inmutables y sincronización offline idempotente.
2. **MVP operativo:** alta manual/escáner, entradas, salidas, traslados, saldos, mínimos, dashboard y exportación.
3. **Migración y etiquetas:** importador Excel/CSV, mapeos, cámara asistida y PDF de etiquetas QR.
4. **Trazabilidad:** lotes, caducidades, FEFO, conteos cíclicos, reversiones y auditoría completa.
5. **Gestión económica:** coste medio, valoración histórica, reposición consolidada e informes de rotación básica.
6. **Integraciones y lanzamiento:** Holded/Facturae, seguridad, RGPD, accesibilidad, observabilidad por negocio, copias de seguridad y QA exhaustivo offline/multidispositivo.
## 1. Propósito y usuario objetivo

**Control de Inventario B2B** permitirá saber qué unidades existen, dónde están, cuánto valen y qué debe reponerse, incluso cuando el comercio pierde conectividad. La unidad de verdad será el movimiento de stock —entrada, salida, traslado, ajuste o recuento—; el saldo será una proyección reconstruible y nunca un número editable sin causa.

El producto se dirige a autónomos y pequeños negocios españoles con uno o varios almacenes, tiendas, vehículos o zonas internas, que hoy controlan existencias con Excel, papel o funciones parciales de facturación. El primer segmento serán comercios de 1 a 15 trabajadores y hasta unas decenas de miles de referencias, incluidos empleados ocasionales que solo necesitan escanear, contar o mover mercancía.

Límites del producto:

- Gestionará productos, variantes, ubicaciones, lotes, caducidades, movimientos, recuentos, mínimos y valoración; no incluirá contabilidad, CRM, nóminas, compras completas, TPV ni fabricación/MRP en el MVP.
- La suscripción se contratará por negocio e incluirá un número operativo razonable de miembros; los roles limitarán acciones, pero no generarán cobros por asiento.
- La cantidad disponible será `existencia física − reservas activas`; las reservas serán opcionales y no se confundirán con salidas confirmadas.
- Todo ajuste exigirá motivo. No existirá una edición directa del saldo que borre su procedencia.
- La app trabajará en unidades enteras o decimales según producto. La unidad base y su precisión no podrán cambiar después del primer movimiento sin una migración explícita.
- Lotes y caducidad se activarán por producto. Cuando estén activos, una salida deberá identificar lote o aplicar una política FEFO confirmable.
- Holded y Facturae serán integraciones opcionales mediante adaptadores. La aplicación seguirá siendo utilizable sin ellas y no se convertirá en sistema contable ni de facturación.

## 2. Dominios de backend

**Negocios, suscripción y acceso**

- Negocio como tenant raíz, con NIF/CIF opcional, moneda EUR, zona horaria y configuración de inventario.
- Membresías con roles `owner`, `manager`, `operator` y `viewer`; permisos granulares para coste, valoración, ajustes, recuentos, exportación, etiquetas e integraciones.
- Invitaciones temporales y desactivación inmediata de empleados ocasionales sin eliminar su historial.
- Plan y facturación asociados al negocio, no a la membresía; límites por productos, ubicaciones, almacenamiento e integraciones, nunca por usuarios activos dentro del plan.

**Catálogo**

- Productos simples y variantes con SKU interno, EAN/GTIN opcional, nombre, categoría, unidad base, precisión, coste, precio informativo, impuestos informativos y estado.
- Identificadores múltiples por variante: EAN, código proveedor, SKU heredado y QR interno; cada tipo será único dentro del alcance apropiado.
- QR interno firmado o con identificador opaco, sin precio ni datos sensibles embebidos; la etiqueta resuelve el producto en el catálogo local offline.
- Imágenes privadas optimizadas en varios tamaños; la cámara podrá leer códigos, pero el reconocimiento visual de producto solo creará candidatos revisables.
- Importación Excel por lote con mapeo de columnas, previsualización, validación, modo crear/actualizar y clave de coincidencia elegida.

**Ubicaciones**

- Jerarquía limitada: sede o almacén, zona y hueco. Cada nodo tendrá código corto escaneable y estado activo/archivado.
- El stock siempre pertenecerá a una ubicación operativa final; nodos contenedores solo agregarán.
- Ubicaciones virtuales controladas para recepción, expedición, merma y tránsito, excluidas del disponible comercial según política.
- Traslado como operación única con líneas de salida y entrada correlacionadas, no dos ediciones independientes.

**Lotes, series y caducidad**

- Lote con código, fecha de recepción, fabricación opcional, caducidad, coste unitario y proveedor informativo.
- FEFO para propuestas de salida cuando exista caducidad; FIFO para productos sin caducidad si la valoración lo requiere.
- Estados de lote `available`, `quarantined`, `expired`, `depleted` y `recalled`; cuarentena/caducado no computan como disponible.
- Números de serie quedan fuera del MVP salvo validación temprana de demanda; el modelo dejará `tracking_mode` preparado para `none`, `lot` o `serial`.
- Alertas de caducidad por umbrales configurables y ubicación, con deduplicación y cierre al agotar o bloquear el lote.

**Libro de movimientos**

- Documento de movimiento con tipo, estado, fecha efectiva, origen, destino, motivo, referencia externa y actor; líneas por producto/lote/cantidad/coste.
- Estados `draft`, `posted`, `reversed`; solo `posted` afecta stock. Un movimiento contabilizado es inmutable y se corrige mediante reversión y nuevo movimiento.
- Tipos iniciales: recepción, venta/salida, consumo interno, devolución, traslado, merma, ajuste y recuento.
- Idempotencia por `business_id + operation_uuid`; el servidor devolverá el resultado original ante reintentos offline.
- Validación de stock negativo configurable por negocio: bloquear, permitir solo a manager o permitir con incidencia auditable.
- Saldo materializado por producto, lote y ubicación, reconstruible desde líneas contabilizadas y protegido con versión optimista.

**Recuentos e inventarios físicos**

- Sesión de recuento con ubicaciones incluidas, fotografía del saldo esperado al abrir, asignaciones y estado.
- Conteo ciego opcional para que el operario no vea la cantidad teórica.
- Capturas múltiples por producto/lote, consolidación y diferencias; la aprobación genera movimientos de ajuste, no sobrescribe saldos.
- Corte temporal: movimientos posteriores a la apertura se separan para evitar atribuirlos como diferencias del recuento.
- Reapertura restringida y cierre con firma lógica del responsable.

**Reposición y mínimos**

- Mínimos por producto/ubicación, cantidad objetivo y plazo de reposición informativo.
- Estado `ok`, `below_minimum`, `out_of_stock` y `overstock_candidate` derivado de disponible y reservas.
- Sugerencias de traslado interno antes de recomendar compra cuando otra ubicación tenga exceso.
- Lista de reposición exportable; no se emitirán pedidos de compra en el MVP.

**Costes y valoración**

- Métodos iniciales por negocio: coste medio ponderado móvil y FIFO. El método quedará bloqueado tras movimientos, salvo migración recalculada y auditada.
- Cada entrada crea o actualiza capas de coste; cada salida conserva coste unitario aplicado y valor total.
- Ajustes positivos requieren coste; ajustes negativos consumen según método configurado.
- Valoración a fecha reconstruible desde movimientos/capas y cierre mensual opcional para acelerar consultas.
- Precio de venta no participa en valoración; margen y contabilidad quedan fuera del alcance inicial.

**Importación y exportación**

- Excel/CSV para catálogo, stock inicial, mínimos y lotes mediante plantillas independientes.
- Stock inicial importado siempre generará un movimiento de apertura por ubicación y lote.
- Fichero original, hash SHA-256, fila, payload normalizado, resultado y errores conservados para auditoría y reversión.
- Exportación de catálogo, saldo, lotes, movimientos, valoración y reposición con formato de fecha/número español y filtros activos.

**Etiquetas y captura**

- Diseños de etiqueta para A4 y rollo con SKU, nombre, EAN/GTIN existente y QR interno.
- Generación PDF determinista con versión de plantilla, márgenes, tamaño físico y calibración de impresora.
- Escaneo por cámara desde PWA con entrada manual inmediata si el navegador no concede permiso o no decodifica.
- Modo ráfaga para recepciones y recuentos, con confirmación sonora/háptica local y prevención de doble lectura configurable.

**Integraciones**

- Capa de puertos y adaptadores; el dominio no dependerá de SDK, nombres de campo ni disponibilidad de Holded o Facturae.
- Holded: sincronización opcional de productos y documentos compatibles tras validar capacidades y límites de su API vigente; dirección de autoridad configurable por campo para evitar bucles.
- Facturae: importación de XML validado para proponer salidas/entradas desde líneas de factura; no se tratará Facturae como API de inventario ni se generará facturación completa.
- Mapeos persistentes de identificadores externos, cursores, versiones de esquema, errores y reintentos.
- Bandeja de conflictos para SKU desconocido, unidad incompatible, documento repetido o cantidad no disponible; ninguna integración corregirá stock silenciosamente.

**Sincronización offline**

- Catálogo operativo, ubicaciones, permisos efectivos y saldos recientes en IndexedDB; cola local de comandos con UUID.
- Comandos offline expresan intención (`receive`, `issue`, `transfer`, `count`) y no envían un nuevo saldo absoluto.
- El servidor ordena por fecha de recepción pero conserva `occurred_at` del dispositivo; aplica autorización y reglas vigentes al sincronizar.
- Conflictos semánticos para stock insuficiente, lote bloqueado, producto archivado o sesión de recuento cerrada; el cliente no los resuelve con última escritura gana.
- Tokens por dispositivo, revocación, cursor incremental y paquetes de catálogo versionados.

**Auditoría y observabilidad**

- Registro inmutable de movimientos, reversiones, cambios de coste, mínimos, permisos, importaciones e integraciones.
- Correlación desde saldo hasta líneas de movimiento y desde integración/importación hasta fila o documento origen.
- Métricas aisladas por app: latencia, errores, colas, PHP-FPM, Redis, base de datos, uso de disco, sincronizaciones y conflictos por negocio sin incluir nombres ni costes en logs.

## 3. Módulos de frontend

**Panel operativo**

- Indicadores de productos bajo mínimo, agotados, lotes próximos a caducar, movimientos pendientes y valor de inventario si el rol puede verlo.
- Selector persistente de ubicación y fecha; cada agregado enlaza al detalle que lo compone.
- Estado offline, última sincronización y conflictos visibles sin bloquear operaciones locales válidas.

**Catálogo**

- Lista/búsqueda por nombre, SKU, EAN, categoría y estado; escaneo de cámara desde la misma pantalla.
- Ficha con stock por ubicación/lote, mínimos, historial, identificadores, unidad y coste restringido por permiso.
- Alta manual, por código, desde fotografía como candidato y mediante Excel.
- Edición masiva de categoría, mínimos, estado e impresión de etiquetas sin permitir cambios destructivos de unidad.

**Importación Excel/CSV**

- Asistente para tipo de importación, hoja, cabecera, mapeo, clave de coincidencia y modo crear/actualizar.
- Previsualización separada de altas, actualizaciones, filas ignoradas, advertencias y errores bloqueantes.
- Confirmación asíncrona con progreso, resultado descargable por fila y reversión del lote cuando sea segura.

**Escáner y operaciones rápidas**

- Flujo cámara → producto → acción → cantidad → ubicación/lote → confirmación, optimizado para una mano.
- Acciones según permisos: recibir, retirar, trasladar, ajustar o contar.
- Modo ráfaga con cesta local; detección de escaneos repetidos y deshacer antes de sincronizar.
- Entrada por SKU/EAN y búsqueda siempre disponible como alternativa a la cámara.

**Stock y ubicaciones**

- Matriz producto × ubicación con disponible, físico, reservado y en tránsito.
- Árbol de ubicaciones con QR imprimible, archivado protegido y traslado masivo.
- Vista de lotes ordenada FEFO, estado, coste y caducidad; cuarentena y liberación restringidas.

**Movimientos**

- Libro filtrable por producto, ubicación, lote, tipo, actor, origen y fecha.
- Ficha con líneas, cantidades, coste aplicado, dispositivo, referencia y cadena de reversión.
- Creación por borrador y contabilización; un movimiento contabilizado solo ofrece revertir.

**Recuento físico**

- Apertura por ubicaciones, asignación a empleados, conteo ciego y escaneo en ráfaga.
- Progreso por zona sin revelar diferencias hasta que la política lo permita.
- Revisión de discrepancias, segundo conteo selectivo y aprobación que muestra los ajustes resultantes.

**Reposición y caducidad**

- Bandeja priorizada por agotado, bajo mínimo, plazo y caducidad.
- Sugerencias de traslado entre ubicaciones con cantidad disponible después del movimiento.
- Exportación de lista de reposición sin simular que existe un pedido de compra.

**Valoración**

- Valor actual y a fecha, desglose por ubicación/categoría y método aplicado.
- Acceso solo para owner/manager autorizado; costes ocultos también en exportaciones y respuestas offline.
- Explicación desde total hasta capas o coste medio y movimientos origen.

**Etiquetas**

- Selector de productos, cantidad de copias, formato, posición inicial en A4 y vista previa a escala.
- Plantillas protegidas por versión; calibración de desplazamiento horizontal/vertical por impresora.
- Regeneración de QR sin cambiar la identidad del producto.

**Equipo y permisos**

- Invitaciones, rol, ubicaciones permitidas, caducidad de acceso y desactivación.
- Vista previa de capacidades efectivas antes de confirmar un rol.
- Historial de acciones por miembro sin posibilidad de borrar su autoría.

**Integraciones**

- Conexiones, dirección de sincronización, mapeos, última ejecución, errores y pausa.
- Importación Facturae con previsualización de líneas y correspondencias de producto.
- Bandeja de conflictos y reintento idempotente; nunca botón genérico de “sincronizar todo” sin alcance visible.

**Ajustes**

- Negocio, unidades, método de valoración, política de negativos, caducidad, notificaciones, exportación y dispositivos.
- Centro de sincronización con operaciones pendientes, fallidas y conflictos accionables.
- Plan contratado y consumo por límites del negocio, sin contador comercial por empleado.

## 4. Modelo de datos inicial

Las claves primarias serán UUID/ULID. Las cantidades y costes usarán decimales de precisión fija; las sumas monetarias se almacenarán en unidad mínima cuando el redondeo fiscal lo permita. Todas las tablas operativas incluirán `business_id`; las editables offline incluirán `created_at`, `updated_at`, `deleted_at` y `lock_version`.

| Entidad | Campos específicos iniciales | Restricciones y relaciones |
| --- | --- | --- |
| `businesses` | `name`, `tax_id`, `currency`, `timezone`, `negative_stock_policy`, `costing_method` | Tenant raíz; EUR en MVP. Método de coste bloqueado tras contabilizar. |
| `business_members` | `business_id`, `user_id`, `role`, `status`, `access_expires_at` | Único por negocio/usuario; precio no depende del número de filas. |
| `member_location_permissions` | `business_member_id`, `location_id`, `capabilities_json` | Restringe operaciones sin duplicar el rol global. |
| `subscriptions` | `business_id`, `plan_code`, `status`, `starts_at`, `renews_at`, `limits_snapshot_json` | Una suscripción comercial activa por negocio. |
| `product_categories` | `business_id`, `parent_id`, `name`, `archived_at` | Nombre único entre hermanas activas. |
| `products` | `business_id`, `name`, `description`, `category_id`, `tracking_mode`, `base_unit`, `quantity_scale`, `active` | Unidad/precisión protegidas tras primer movimiento. |
| `product_variants` | `product_id`, `name`, `sku`, `default_cost_minor`, `sale_price_minor`, `tax_rate`, `image_asset_id`, `active` | SKU único por negocio; una variante base para producto simple. |
| `product_identifiers` | `product_variant_id`, `type`, `value`, `normalized_value`, `source` | Único por negocio, tipo y valor normalizado. |
| `locations` | `business_id`, `parent_id`, `name`, `code`, `type`, `is_stock_point`, `availability_policy`, `archived_at` | Código único; stock solo en nodos `is_stock_point`. |
| `lots` | `business_id`, `product_variant_id`, `lot_code`, `received_on`, `manufactured_on`, `expires_on`, `status`, `supplier_label` | Código único por variante; requerido si `tracking_mode=lot`. |
| `stock_documents` | `business_id`, `type`, `status`, `occurred_at`, `posted_at`, `source_location_id`, `destination_location_id`, `reason_code`, `notes`, `operation_uuid`, `external_reference`, `created_by` | `operation_uuid` única por negocio; contabilizados inmutables. |
| `stock_movement_lines` | `stock_document_id`, `product_variant_id`, `lot_id`, `quantity`, `unit_cost_minor`, `total_cost_minor`, `direction`, `reverses_line_id` | Cantidad positiva; dirección expresa signo; índice por variante/lote. |
| `stock_balances` | `business_id`, `product_variant_id`, `location_id`, `lot_id`, `physical_quantity`, `reserved_quantity`, `version` | Proyección única por combinación; reconstruible. |
| `stock_reservations` | `business_id`, `product_variant_id`, `location_id`, `lot_id`, `quantity`, `reference_type`, `reference_id`, `status`, `expires_at` | Solo activas reducen disponible. |
| `cost_layers` | `business_id`, `product_variant_id`, `location_id`, `lot_id`, `source_line_id`, `original_quantity`, `remaining_quantity`, `unit_cost_minor`, `occurred_at` | Consumidas por FIFO; para coste medio sirven de trazabilidad. |
| `inventory_valuations` | `business_id`, `as_of_date`, `costing_method`, `total_value_minor`, `breakdown_json`, `calculation_version`, `closed_at` | Snapshot reconstruible; único por negocio/fecha/método. |
| `reorder_rules` | `business_id`, `product_variant_id`, `location_id`, `minimum_quantity`, `target_quantity`, `lead_time_days`, `enabled` | Única por variante/ubicación. |
| `inventory_counts` | `business_id`, `name`, `status`, `opened_at`, `snapshot_cursor`, `blind_count`, `approved_at`, `approved_by` | Una sesión controla múltiples ubicaciones. |
| `inventory_count_locations` | `inventory_count_id`, `location_id`, `assigned_member_id`, `status` | Única por sesión/ubicación. |
| `inventory_count_lines` | `inventory_count_id`, `location_id`, `product_variant_id`, `lot_id`, `expected_quantity`, `counted_quantity`, `counted_at`, `counted_by`, `adjustment_line_id` | Diferencia genera ajuste al aprobar. |
| `import_templates` | `business_id`, `name`, `import_type`, `file_type`, `mapping_json`, `parsing_options_json`, `match_key`, `version` | Plantillas separadas por catálogo, apertura, lotes y mínimos. |
| `import_batches` | `business_id`, `template_id`, `original_filename`, `file_hash`, `status`, `total_rows`, `success_rows`, `warning_rows`, `error_rows`, `completed_at` | Hash evita repetición no intencionada. |
| `import_rows` | `import_batch_id`, `sheet_name`, `row_number`, `raw_payload_json`, `normalized_payload_json`, `status`, `error_code`, `subject_type`, `subject_id` | Única por lote/hoja/fila. |
| `label_templates` | `business_id`, `name`, `paper_type`, `width_mm`, `height_mm`, `margins_json`, `content_schema_json`, `version`, `active` | Dimensiones físicas, no píxeles como fuente de verdad. |
| `integration_connections` | `business_id`, `provider`, `status`, `credentials_ref`, `configuration_json`, `last_cursor`, `last_synced_at` | Secretos fuera de la fila, cifrados en almacén dedicado. |
| `external_mappings` | `connection_id`, `entity_type`, `internal_id`, `external_id`, `external_version`, `last_payload_hash` | Único por conexión, tipo e ID externo. |
| `integration_runs` | `connection_id`, `direction`, `scope`, `status`, `cursor_before`, `cursor_after`, `started_at`, `completed_at`, `summary_json` | Cursor avanza solo si el lote se confirma. |
| `integration_conflicts` | `integration_run_id`, `type`, `external_reference`, `payload_json`, `status`, `resolved_by`, `resolved_at` | Resolución explícita y auditable. |
| `media_assets` | `business_id`, `storage_key`, `mime_type`, `sha256`, `purpose`, `deleted_at` | Imágenes/archivos privados y URLs temporales. |
| `sync_operations` | `business_id`, `user_id`, `device_id`, `operation_uuid`, `command_type`, `payload_json`, `base_versions_json`, `status`, `conflict_json` | Comandos idempotentes; nunca saldo absoluto desde cliente. |
| `audit_logs` | `business_id`, `actor_id`, `action`, `subject_type`, `subject_id`, `origin`, `before_json`, `after_json`, `occurred_at` | Inmutable; actor histórico aunque se desactive. |

La base de datos impondrá índices por negocio en toda clave de búsqueda y restricciones que impidan relacionar productos, lotes o ubicaciones de tenants distintos. Los saldos, alertas y valoraciones son proyecciones; el libro contabilizado es la fuente de verdad.

## 5. Diferenciador frente a competencia

- **Inventario operativo sin carga de ERP:** el flujo central es escanear, mover, contar y reponer; facturación, CRM y contabilidad no contaminan navegación ni modelo.
- **Offline basado en comandos, no en saldos:** cada dispositivo sincroniza intenciones idempotentes y el servidor detecta conflictos semánticos, evitando que una copia antigua sobrescriba existencias recientes.
- **Auditoría contable del stock:** movimientos contabilizados inmutables, reversiones correlacionadas y trazado desde valoración hasta la entrada original.
- **Adaptación al trabajo físico pequeño:** QR imprimible, etiquetas A4/rollo, cámara, modo ráfaga, ubicaciones simples y roles temporales funcionan sin hardware propietario.
- **Lotes y caducidad sin complejidad industrial:** FEFO, cuarentena, alertas y recuentos por lote, pero sin introducir MRP, producción ni trazabilidad clínica.
- **Coste protegido por permisos:** empleados pueden operar cantidades sin descargar, ver o inferir valoración cuando el negocio lo restrinja.
- **Integraciones desacopladas:** Holded puede complementar el flujo administrativo y Facturae aportar líneas documentales, pero ninguna integración se convierte en fuente silenciosa del saldo.
- **Precio alineado con el pequeño comercio:** el negocio puede incorporar personal ocasional sin que cada acceso temporal aumente la factura.

## 6. Fases del roadmap

**Fase 0 — Invariantes y arquitectura**

- Cerrar unidades, precisión, tipos/estados de movimiento, política de negativos e invariantes de lote/ubicación.
- Implementar tenant por negocio, matriz de permisos y aislamiento automatizado en repositorios, jobs y exportaciones.
- Definir protocolo offline de comandos, idempotencia, resolución de conflictos y reconstrucción de saldos.
- Validar límites comerciales por negocio y preparar observabilidad separada para PHP-FPM, colas, Redis, base de datos, disco, errores y latencia.

**Fase 1 — Stock esencial offline-first**

- Negocio, miembros, catálogo, variantes, identificadores, ubicaciones y movimientos básicos.
- PWA con catálogo local, escáner, cola, sincronización incremental y conflictos accionables.
- Saldos por ubicación e historial auditable; política configurable de negativos.
- Criterio de salida: recepción, salida y traslado completos sin conexión; reintentos sin duplicados; saldo reconstruido igual a proyección.

**Fase 2 — Incorporación y etiquetas**

- Importación Excel/CSV de catálogo y stock inicial con mapeo, previsualización y resultado por fila.
- QR internos, PDF de etiquetas A4/rollo y calibración.
- Alta por cámara/código y flujo ráfaga.
- Criterio de salida: importar al menos 10.000 variantes con errores aislados, revertir lotes seguros e imprimir códigos legibles en formatos soportados.

**Fase 3 — Lotes, caducidad y recuentos**

- Tracking opcional por lote, FEFO, cuarentena, alertas y caducidad.
- Sesiones de inventario, conteo ciego, corte temporal, discrepancias y ajustes aprobados.
- Roles temporales y permisos por ubicación.
- Criterio de salida: concurrencia probada entre recuentos y movimientos; ningún cierre sobrescribe operaciones posteriores a la apertura.

**Fase 4 — Valoración y reposición**

- Coste medio ponderado y FIFO, capas, valoración actual/a fecha y cierres mensuales.
- Mínimos por ubicación, disponibles, reservas y sugerencias de traslado/reposición.
- Restricción integral de costes en API, caché offline, informes y exportaciones.
- Criterio de salida: valoración reproducible desde movimientos, casos de devolución/reversión cubiertos y ausencia de filtraciones a operadores.

**Fase 5 — Integraciones opcionales**

- Adaptador Facturae para importar XML validado y convertir líneas confirmadas en propuestas de movimiento.
- Adaptador Holded tras validar API, autenticación, límites y entidades vigentes; piloto unidireccional antes de admitir sincronización bidireccional.
- Mapeos externos, cursores, bandeja de conflictos, reintentos e idempotencia.
- Criterio de salida: caída o cambio del proveedor no bloquea inventario; ninguna línea externa crea saldo sin mapeo y confirmación definidos.

**Fase 6 — Endurecimiento y producción**

- Exportación completa, retención, copias de seguridad y restauración ensayada.
- Seguridad de archivos, secretos, dispositivos, rate limiting, auditoría y análisis de dependencias.
- Rendimiento con decenas de miles de referencias y millones de líneas, accesibilidad y compatibilidad PWA/cámara/impresión.
- QA exhaustivo funcional, offline, concurrencia, valoración, permisos, integraciones y recuperación; lanzamiento sin ampliar el alcance hacia ERP.
