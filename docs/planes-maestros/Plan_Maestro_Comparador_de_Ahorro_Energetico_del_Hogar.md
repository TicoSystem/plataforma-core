# Plan Maestro — Comparador de Ahorro Energético del Hogar

## 1. Propósito y usuario objetivo

Comparador independiente que reconstruye facturas eléctricas y simula contratos alternativos sobre la misma curva real de consumo del suministro. El producto debe permitir que cada resultado se audite desde los datos de entrada hasta el céntimo calculado, mostrando supuestos, periodos sin datos, redondeos, vigencia y fuente.

El usuario principal es un hogar español con suministro eléctrico en baja tensión que quiere comprobar si otra tarifa habría reducido su coste, entender sus picos de potencia o medir el ahorro conseguido tras un cambio. Incluye hogares con autoconsumo y compensación simplificada de excedentes cuando el contrato y los datos lo permitan. Quedan fuera del alcance inicial comunidades energéticas, suministros industriales, optimización de mercados mayoristas, contratación automática y asesoramiento financiero.

Principios de producto:

- Comparar tarifas usando exactamente el mismo suministro, zona, periodo, curva, potencias contratadas, autoconsumo, impuestos y calidad de datos.
- Separar coste observado de factura, coste reconstruido y coste simulado; las diferencias deben explicarse, no corregirse ocultamente.
- No proyectar un año completo sin identificar método, cobertura real y estacionalidad disponible.
- Tratar una tarifa como una fórmula versionada, no como un precio único: potencia, energía, indexación, cuotas, descuentos, permanencia, servicios, excedentes e impuestos tienen vigencias independientes.
- Conservar el intervalo original de la curva importada y normalizarlo explícitamente para cada fórmula; no inventar granularidad.
- Mostrar ranking neutral completo antes de cualquier oferta patrocinada. La compensación comercial no influye en posición, ahorro estimado ni etiqueta de recomendación.
- No cambiar de comercializadora, contratar ni ceder datos a un tercero sin una acción y consentimiento separados del cálculo comparativo.
- Formular alertas de hábitos como observaciones medibles, no como culpabilización ni promesa garantizada de ahorro.

## 2. Dominios de backend

- **Identidad, hogares y permisos:** usuarios, hogares, miembros y suministros. Permisos separados para importar datos, ver importes, administrar contratos, ejecutar simulaciones y compartir una solicitud comercial.
- **Puntos de suministro:** alias doméstico, zona, tensión, peaje/acceso, potencias por periodo, modalidad de autoconsumo y CUPS cifrado. El comparador debe poder operar con un alias y archivos, sin conexión permanente a Datadis.
- **Consentimientos y conexiones Datadis:** autorización por suministro y finalidad, estado de conexión, ventanas importadas, revocación y trazabilidad. Credenciales/tokens viven en almacén de secretos y nunca en la base de datos de dominio ni en logs.
- **Importadores:** adaptadores para Datadis, factura PDF y CSV; preservan archivo original, parser, versión, mapeo de columnas, unidad, zona horaria y errores. Ningún dato OCR se acepta sin confirmación cuando altera importes, fechas, CUPS o potencias.
- **Series energéticas:** consumo e inyección por intervalo, calidad, procedencia, revisiones y huecos. Distinguir dato medido, agregado, imputado y estimado.
- **Facturas y líneas:** periodos, conceptos originales, base imponible, impuestos, alquiler de contador, servicios, descuentos y total. Conservar texto de factura y clasificación normalizada sin perder su correspondencia.
- **Contratos:** comercializadora, tarifa, fechas, potencias, modalidad fija/indexada, permanencia, servicios y condiciones particulares. Una factura puede reflejar cambios dentro del periodo.
- **Catálogo de tarifas:** ofertas neutrales y patrocinadas bajo el mismo esquema técnico; versión, territorio, elegibilidad, vigencia comercial, fórmula, fuente, fecha de comprobación y evidencia archivada.
- **Motor tarifario:** evaluador determinista de fórmulas versionadas con componentes de potencia, energía, cuotas, descuentos, excedentes, alquiler, peajes/cargos e impuestos. Genera un libro de cálculo interno por intervalo y concepto.
- **Variables reguladas:** tablas versionadas con ámbito y vigencia para impuestos, peajes, cargos, topes o ajustes aplicables. Las reglas históricas se conservan para reproducir facturas pasadas.
- **Precios indexados:** series externas con zona horaria, resolución, mercado/fuente, vigencia y versión de correcciones. La fórmula identifica qué serie, margen y coste adicional aplica.
- **Autoconsumo:** energía importada, exportada y compensada; precio de excedente, límites contractuales/fiscales aplicables y saldo no compensado. No presentar excedente como ingreso si el contrato solo permite compensación limitada.
- **Reconciliación de factura:** compara líneas observadas y reconstruidas con tolerancias explícitas; clasifica discrepancias por datos incompletos, redondeo, prorrateo, cambio contractual o concepto desconocido.
- **Simulaciones:** instantánea inmutable de curva, tarifa, contrato, variables reguladas, supuestos y versión del motor. Un nuevo dato crea otra ejecución; no reescribe resultados históricos.
- **Ranking neutral:** orden configurable por coste total comparable, cobertura y confianza; excluye o penaliza visualmente resultados no comparables, nunca por relación comercial.
- **Patrocinio y atribución:** campañas, posición publicitaria separada, divulgación, clic y consentimiento de lead. El patrocinio no comparte tablas ni funciones de ordenación con el ranking.
- **Analítica de potencia:** demanda máxima por periodo cuando los datos la soporten, frecuencia de picos y escenarios de potencia contratada. Toda oportunidad debe incluir límites de resolución y conceptos no afectados.
- **Detección de consumo base:** estima carga persistente nocturna o en periodos definidos por el usuario, con intervalo de confianza y exclusión de días atípicos. No etiqueta automáticamente un aparato como culpable.
- **Oportunidades de hábito:** desplaza bloques de consumo observados a ventanas alternativas bajo restricciones del usuario y recalcula solo componentes sensibles al horario; no asume que toda carga sea desplazable.
- **Ahorro realizado:** enlaza promesa previa, contrato activado y periodo posterior comparable; controla clima/estacionalidad solo si existe método declarado. Informa ahorro bruto, costes de cambio y diferencia frente a lo prometido.
- **Alertas:** picos, consumo base, fin de descuento, cambio de fórmula y datos ausentes; deduplicación, umbrales y horario silencioso.
- **Exportación, privacidad y borrado:** informe reproducible, paquete de datos y eliminación por suministro. Las exportaciones excluyen CUPS completo salvo inclusión explícita.
- **Sincronización offline:** contratos, facturas confirmadas y simulaciones descargadas son consultables offline; importaciones y cálculos ligeros se encolan. El servidor firma la versión canónica del motor utilizada.
- **Auditoría y observabilidad:** accesos a datos, cambios de fórmula, publicación de tarifas, ejecuciones y leads patrocinados; métricas técnicas sin CUPS, dirección ni curva individual.

Reglas de cálculo no negociables:

- Trabajar internamente con enteros o decimal arbitrario y redondear únicamente donde lo exija cada concepto; almacenar política y escala de redondeo.
- Particionar cualquier periodo cuando cambie contrato, tarifa, precio indexado, variable regulada o potencia.
- Marcar una simulación como incompleta si faltan intervalos y ofrecer resultados `observado únicamente` o `estimado`, nunca mezclarlos sin desglose.
- Aplicar descuentos a la base contractual correcta y durante su vigencia; “X %” no equivale a descuento sobre el total.
- Comparar totales con impuestos incluidos y, además, mostrar el desglose antes de impuestos.
- No sumar compensación de excedentes por encima del límite que permita la regla contractual aplicable a esa simulación.

## 3. Módulos de frontend

- **Alta de suministro:** alias, código postal/zona, potencias, modalidad y fuente de datos; CUPS opcional hasta que una integración lo requiera.
- **Centro de importación:** Datadis, PDF y CSV como rutas equivalentes; estado, intervalo disponible, huecos, duplicados, unidades detectadas y campos pendientes de confirmar.
- **Revisor de factura:** vista paralela `concepto original → concepto normalizado`; permite corregir OCR sin modificar el archivo fuente.
- **Calidad de datos:** calendario de cobertura, resolución, intervalos ausentes, duplicados, estimaciones y advertencia sobre qué comparaciones quedan afectadas.
- **Factura reconstruida:** total observado, reconstruido y diferencia; desglose de potencia, energía, excedentes, servicios, alquiler e impuestos con fórmula desplegable.
- **Comparador neutral:** filtros de elegibilidad y preferencias; ranking por coste total comparable, ahorro y confianza. Las tarifas con cobertura parcial quedan fuera del orden principal.
- **Detalle de tarifa:** fórmula legible y expresión técnica, versión, vigencia, fuente, permanencia, descuentos, servicios, excedentes y supuestos usados.
- **Laboratorio de escenarios:** mismas curvas con cambios controlados de tarifa, potencia, autoconsumo o desplazamiento horario; comparación lado a lado con delta por componente.
- **Vista de autoconsumo:** importación, exportación, energía compensada, excedente sin valor económico en el escenario y límite aplicado.
- **Picos de potencia:** fecha, periodo, magnitud, frecuencia y efecto estimado de una potencia alternativa; aviso cuando la resolución disponible no permite una conclusión firme.
- **Consumo base:** franjas recurrentes, kWh y coste atribuible estimado; el usuario puede marcar noches o días no representativos.
- **Cambios de hábito:** selecciona cargas/intervalos que realmente podrían desplazarse, propone ventanas y recalcula; no inventa electrodomésticos a partir de la curva agregada.
- **Contratos e historial:** línea temporal de contrato, descuentos, permanencia y revisiones; conecta simulación previa, cambio declarado y facturas posteriores.
- **Ahorro realizado:** prometido frente a observado con periodos homologables, cobertura y ajustes explícitos; si no son comparables, muestra la causa en lugar de un porcentaje.
- **Ofertas patrocinadas:** bloque independiente, rotulado en cada tarjeta, sin mezclarse en el ranking. Antes de enviar datos muestra comercializadora/intermediario, campos y finalidad.
- **Alertas:** reglas, umbrales, destinatario y horario; cada alerta enlaza a los intervalos y cálculo que la originaron.
- **Privacidad:** conexiones, consentimientos, archivos, CUPS oculto, exportaciones, accesos y eliminación por suministro.
- **Estado offline:** última sincronización, paquetes disponibles y operaciones pendientes; los resultados conservados indican versión y fecha de cálculo.
- **Administración tarifaria:** editor con esquema validado, casos de prueba, fuente, doble aprobación, simulación de regresión y publicación programada.

## 4. Modelo de datos inicial

| Entidad | Campos y decisiones específicas |
|---|---|
| `users` | Identidad del core, zona horaria, moneda y preferencias de privacidad/notificación. |
| `households` | Nombre, propietario, estado y versión; agrupa permisos y suministros. |
| `household_members` | Hogar, usuario, rol y capacidades energéticas explícitas. |
| `supply_points` | Hogar, alias, zona, tensión, peaje, modalidad de autoconsumo, estado y `encrypted_cups_id?`. |
| `sensitive_identifiers` | CUPS cifrado, máscara, token ciego opcional, algoritmo y clave envuelta; aislado de consultas analíticas. |
| `data_consents` | Usuario, suministro, proveedor, finalidad, alcance, versión de texto, otorgado/revocado y prueba. |
| `provider_connections` | Suministro, proveedor, referencia externa, secreto referenciado, estado, expiración y último acceso. |
| `import_jobs` | Fuente, archivo/conexión, parser y versión, periodo, estado, métricas, errores y actor. |
| `source_files` | Objeto cifrado, hash, MIME, tamaño, retención y metadatos mínimos; sin CUPS en nombre. |
| `energy_intervals` | Suministro, inicio/fin, consumo Wh, inyección Wh, resolución, calidad, fuente y revisión; unicidad por suministro/intervalo/fuente. |
| `data_gaps` | Suministro, intervalo, causa, estrategia elegida, valor imputado opcional y confianza. |
| `bills` | Suministro, contrato, periodo, fechas, total, moneda, fuente, estado de revisión y archivo. |
| `bill_lines` | Factura, texto original, tipo normalizado, cantidad, unidad, precio, base, impuesto, total y confianza OCR. |
| `contracts` | Suministro, comercializadora, tarifa, vigencia, permanencia, servicios y condiciones declaradas. |
| `contract_power_periods` | Contrato, periodo regulatorio, potencia kW, vigencia y fuente. |
| `tariff_products` | Proveedor, nombre, mercado, elegibilidad, estado neutral/publicitado y referencia comercial. |
| `tariff_versions` | Producto, vigencia, territorio, esquema de fórmula, fuente, comprobado, hash y estado editorial. |
| `tariff_components` | Versión, tipo, expresión AST/DSL, base, periodos, redondeo, impuesto y orden de evaluación. |
| `regulated_variable_sets` | Jurisdicción, vigencia, variables tipadas, fuente oficial, versión y publicación. |
| `indexed_price_series` | Fuente, mercado, resolución, zona horaria, versión y estado. |
| `indexed_prices` | Serie, intervalo, valor, unidad, revisión y publicado; clave única por serie/intervalo/versión. |
| `simulation_runs` | Suministro, periodo, tarifa, motor, entradas congeladas, cobertura, método de huecos, estado y hash reproducible. |
| `simulation_line_items` | Ejecución, componente, intervalo/periodo, cantidad, fórmula, variables, importe sin/con impuestos y redondeo. |
| `simulation_results` | Ejecución, total, ahorro, confianza, comparabilidad, advertencias y ranking elegible. |
| `bill_reconciliations` | Factura, simulación base, diferencia, tolerancia, causas y estado de revisión. |
| `power_events` | Suministro, periodo, instante, kW, resolución, umbral, fuente y confianza. |
| `baseload_findings` | Ejecución analítica, periodo, método, Wh, coste, confianza, días excluidos y versión. |
| `habit_scenarios` | Suministro, intervalos seleccionados, regla de desplazamiento, restricciones, tarifa y resultado. |
| `savings_commitments` | Simulación origen, contrato destino, ahorro prometido, periodo/proyección, supuestos y costes de cambio. |
| `realized_savings_assessments` | Compromiso, periodos comparados, método, cobertura, ahorro observado y limitaciones. |
| `sponsorship_campaigns` | Producto, anunciante, vigencia, divulgación, modelo de pago y estado; sin campo de peso neutral. |
| `lead_consents` | Usuario, campaña, destinatario, campos, finalidad, texto, fecha y revocación. |
| `alerts` | Suministro, tipo, regla, evidencia, estado, enviado, deduplicación y resolución. |
| `audit_logs` | Actor, acción, objeto, versión, resultado y fecha; sin CUPS, tokens ni curvas. |

Convenciones iniciales:

- Energía almacenada como Wh enteros y potencia con precisión decimal acordada; dinero interno en precisión superior a céntimos hasta el paso contractual de redondeo.
- Intervalos como instantes UTC más zona de mercado/origen; particiones mensuales por suministro para volumen y retención.
- Fórmulas en DSL/AST limitada, tipada y sin ejecución arbitraria; cada versión incluye casos de prueba y hash.
- Archivos, secretos y datos analíticos usan almacenes y permisos separados.
- Índices por suministro/intervalo, tarifa/vigencia, simulación/hash, factura/periodo y alertas/estado.
- Una simulación referencia versiones exactas de curva, contrato, tarifa, precios y variables reguladas; ningún `latest` participa en una reproducción histórica.

## 5. Diferenciador frente a competencia

- **Comparación contrafactual justa:** todas las tarifas reciben la misma curva y los mismos supuestos; no se compara una factura real con una estimación comercial optimista de consumo.
- **Cálculo inspeccionable:** cada euro se rastrea hasta intervalo, componente, variable, fórmula, fuente y regla de redondeo.
- **Reconstrucción antes de recomendar:** las discrepancias con la factura se resuelven o declaran antes de usar esos datos para ordenar alternativas.
- **Tarifas como versiones temporales:** promociones, márgenes indexados, servicios, excedentes e impuestos no se condensan en un precio que pierde vigencia.
- **Autoconsumo sin doble conteo:** separa inyección física, excedente valorizado, compensación aplicada y saldo no compensable.
- **Neutralidad estructural:** ranking y publicidad tienen tablas, endpoints, componentes visuales y métricas distintas; una campaña no dispone de parámetro de orden neutral.
- **Ahorro realizado auditable:** conserva qué se prometió, con qué datos y durante qué periodo, y lo contrasta después sin forzar equivalencias estacionales falsas.
- **Oportunidades prudentes:** identifica patrones de potencia y carga base, pero no atribuye consumos a aparatos que la curva agregada no puede reconocer.
- **Importación no cautiva:** Datadis mejora la continuidad, pero PDF y CSV permiten comparar sin entregar credenciales ni mantener una conexión externa.

La métrica principal será la desviación absoluta entre facturas reconstruidas y observadas en casos con datos completos. Métricas secundarias: cobertura de curvas, simulaciones reproducibles, tarifas vigentes, porcentaje de resultados comparables, ahorro realizado frente a estimado, revocación efectiva de conexiones y conversión patrocinada medida exclusivamente fuera del ranking. No se optimizará por comisión media de las tarifas recomendadas.

## 6. Fases del roadmap

**Fase 0 — Especificación matemática y corpus de prueba**

- Definir unidades, intervalos, zona horaria, particiones, impuestos, redondeos, descuentos, excedentes y estados de calidad.
- Crear facturas sintéticas y anonimizadas con cambios de tarifa, periodos parciales, autoconsumo, descuentos y conceptos desconocidos.
- Diseñar DSL tarifaria limitada y pruebas doradas independientes de Laravel.
- Formalizar política de ranking neutral, patrocinio y conflicto de interés antes de integrar ofertas.

**Fase 1 — MVP con factura/CSV y reconstrucción**

- Suministros, contratos, importador CSV y carga PDF con revisión manual de extracción.
- Series de consumo, huecos, factura normalizada y motor para tarifas fijas simples.
- Comparación por mismo periodo, desglose, fórmula y reconciliación contra factura.
- PWA offline para consulta y cola de importaciones; resultados versionados descargables.
- Salida: reproducir casos de prueba al céntimo dentro de la tolerancia documentada.

**Fase 2 — Catálogo tarifario versionado y ranking**

- Consola editorial, fuentes, vigencias, elegibilidad y publicación con doble aprobación.
- Componentes de potencia/energía, cuotas, descuentos, servicios e impuestos versionados.
- Ranking neutral con control de comparabilidad, cobertura y confianza.
- Regresión automática de todas las tarifas contra el corpus antes de publicar.

**Fase 3 — Datadis y calidad de datos**

- Consentimiento, conexión revocable, importación incremental, deduplicación y reintentos.
- Cifrado de CUPS, almacén de secretos, auditoría de acceso y borrado por suministro.
- Visualización de resolución, revisiones, huecos e imputaciones; degradación limpia a CSV/PDF.
- Salida: repetir una importación no duplica intervalos y revocar corta nuevos accesos.

**Fase 4 — Indexadas y autoconsumo**

- Series de precios versionadas, fórmulas indexadas y partición por cambios regulatorios.
- Importación/inyección, valoración de excedentes y límites aplicables reproducibles.
- Pruebas de zonas horarias, cambios de hora, resoluciones distintas y precios corregidos posteriormente.
- Salida: toda corrección externa produce nueva versión, nunca altera una simulación guardada.

**Fase 5 — Potencia, hábitos y ahorro realizado**

- Picos con límites de resolución, carga base configurable y escenarios de desplazamiento seleccionados por el usuario.
- Historial contractual, promesa congelada y evaluación posterior por periodos comparables.
- Alertas de fin de descuento, cambio tarifario y anomalías de cobertura.
- Validación con hogares para evitar mensajes culpabilizadores o conclusiones no soportadas.

**Fase 6 — Patrocinio, cumplimiento y producción**

- Espacio patrocinado separado, divulgación persistente, consentimiento granular y auditoría de leads.
- RGPD: minimización, retención de curvas/archivos, portabilidad, supresión y gestión de encargados externos.
- Revisión jurídica de comunicaciones comerciales, comparaciones y textos de ahorro antes del lanzamiento.
- Accesibilidad WCAG 2.2 AA y pruebas iOS/Android, modo avión, archivos grandes y dispositivos con poco almacenamiento.
- Observabilidad separada para Laravel, PHP-FPM, colas, Redis, base de datos, almacenamiento, importadores, motor tarifario y fallos de sincronización, sin CUPS ni curvas en logs.
- Despliegue gradual condicionado a reconciliación, reproducibilidad, vigencia de tarifas y ausencia demostrable de influencia patrocinada en el ranking.
