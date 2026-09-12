# Plan Maestro — Control de Horas y Facturación para Freelancers

## 1. Propósito y usuario objetivo

Aplicación para que un autónomo español transforme tiempo y gastos aprobados en documentos comerciales y facturas sin volver a teclear conceptos. Une operación y facturación, pero no sustituye asesoramiento fiscal, contabilidad oficial ni presentación de impuestos.

El usuario principal es un profesional independiente que factura servicios por hora, bolsa, precio fijo o combinación, trabaja solo o con colaboradores puntuales y entrega documentación a una gestoría. El alcance inicial excluye nóminas, contabilidad por partida doble, modelos tributarios, cobro bancario, inventario y ERP.

Principios de producto:

- El parte de horas es evidencia operativa editable; una línea de factura emitida es una instantánea fiscal inmutable. La relación entre ambos conserva cantidades y tarifas congeladas.
- Separar presupuesto, aceptación, albarán, factura borrador, factura emitida, rectificativa, cobro y vencimiento; cambiar un estado nunca debe fingir otro hecho.
- Versionar reglas fiscales por territorio, sujeto, cliente, operación y fecha. IVA e IRPF no son porcentajes globales de la cuenta.
- Distinguir suplido, gasto repercutido y gasto interno: tienen documentación, efecto fiscal y tratamiento de rentabilidad diferentes.
- No inferir retención de IRPF por ser “autónomo”; se determina por configuración validada de emisor, actividad, destinatario y operación.
- La serie y numeración se asignan al emitir, bajo bloqueo transaccional; un borrador no reserva número definitivo salvo política explícita y auditable.
- Una rectificación referencia documentos y motivos; nunca editar ni borrar una factura emitida para “corregirla”.
- El trabajo offline puede crear horas, gastos y borradores. La emisión fiscal offline requiere una estrategia validada contra la normativa y especificaciones vigentes, no una cola genérica añadida después.
- Los sistemas informáticos de facturación y VERI*FACTU se modelan aparte de la factura electrónica estructurada entre empresas. El [Reglamento de sistemas informáticos de facturación](https://www.boe.es/buscar/act.php?id=BOE-A-2023-24840), el [Reglamento de obligaciones de facturación](https://www.boe.es/buscar/act.php?id=BOE-A-2012-14696) y el [portal oficial Facturae](https://www.facturae.gob.es/) son fuentes iniciales, pero sus versiones y plazos deben revisarse de nuevo antes de producción.

## 2. Dominios de backend

- **Identidad y negocios:** usuario, organización fiscal, certificados/dispositivos y preferencias. La suscripción se cobra por negocio autónomo, aunque inicialmente tenga un solo usuario.
- **Perfil fiscal versionado:** NIF cifrado, nombre/razón, domicilio fiscal, actividad, régimen y textos legales; cambios con vigencia para que facturas antiguas conserven identidad histórica.
- **Clientes y contactos:** datos fiscales, direcciones, canal de entrega, idioma, condiciones de pago y retención configurada por contexto. Separar contacto comercial de destinatario fiscal.
- **Proyectos:** cliente, moneda, modalidad, presupuesto, estado, centros de coste y reglas de aprobación.
- **Tipos de tarea y tarifas:** tarifa por cliente, proyecto, tarea o periodo; prioridad explícita, vigencia, unidad facturable, mínimo, redondeo y moneda.
- **Bolsas de horas:** cantidad contratada, consumida, reservada, caducidad y movimientos inmutables. Aprobar horas puede consumir bolsa sin generar importe facturable adicional.
- **Temporizadores:** máquina de estados `running`, `paused`, `completed`, `discarded`; segmentos persistentes, origen de reloj y recuperación. El total se deriva de segmentos válidos.
- **Partes de horas:** fecha de servicio, proyecto, tarea, duración real, duración facturable, nota, actor, estado y aprobador. Correcciones posteriores a facturación crean ajuste, no mutación retroactiva.
- **Aprobaciones:** lote enviado, versión exacta de horas/gastos, respuesta, comentario y fecha. Editar contenido material invalida la aprobación anterior.
- **Gastos de proyecto:** gasto interno, repercutible o candidato a suplido; proveedor, fecha, base/impuestos, justificante, pagador y estado de validación.
- **Rentabilidad:** ingresos reconocidos según política, horas reales, coste interno configurable, gastos internos y repercutidos. Mostrar margen con cobertura y excluir suplidos del ingreso económico ordinario.
- **Documentos comerciales:** presupuesto y albarán versionados, aceptación/entrega, líneas de origen y conversión parcial. No adquieren semántica fiscal por parecerse a una factura.
- **Facturación:** borradores, facturas ordinarias y simplificadas si el alcance validado lo permite, rectificativas, líneas, vencimientos, pagos y estados. Totales se calculan desde líneas congeladas.
- **Motor fiscal:** reglas versionadas para IVA, retenciones, exenciones, inversión del sujeto pasivo u otros tratamientos habilitados. Devuelve cálculo, fundamento/fuente, fecha de vigencia y advertencias; exige confirmación ante contexto insuficiente.
- **Series y numeración:** series por tipo/establecimiento/ejercicio según configuración válida, secuencia transaccional, continuidad, huecos justificados y auditoría.
- **Suplidos:** tercero final, mandato/documentación, importe exacto y exclusión fiscal configurada; ningún gasto se convierte en suplido solo al marcar una casilla.
- **Vencimientos y cobros:** condiciones, varios plazos, estado, cobros parciales, conciliación manual y recordatorios. `Enviada` no significa `recibida`; `vencida` no significa incobrable.
- **Núcleo SIF:** registro de alta/anulación, encadenamiento, hash/huella, identificación del sistema, QR/textos y conservación según especificaciones vigentes. Debe ser módulo aislado, testeado con vectores oficiales y sin actualizaciones destructivas.
- **Modalidad VERI*FACTU:** generación, firma/identificación requerida, remisión, reintentos, respuestas, incidencias y conciliación con AEAT. El estado de envío no modifica la factura original.
- **Modalidad no VERI*FACTU:** requisitos adicionales de conservación, integridad, trazabilidad y registro de eventos, solo si se decide soportarla tras revisión especializada. Evitar prometer ambas modalidades en MVP.
- **Factura electrónica estructurada:** formatos, estados de entrega/aceptación/rechazo y conectores separados del SIF. Facturae/FACe y futura facturación B2B se implementan como perfiles versionados, no como un único XML universal.
- **Plantillas y renderizado:** PDF legible, datos fiscales, desglose, QR y textos condicionados por perfil normativo. El PDF es una representación; la fuente de verdad es el documento estructurado y sus registros.
- **Exportación a gestoría:** paquetes por periodo con facturas, rectificativas, cobros, gastos, justificantes y manifiesto; CSV/XLSX y formatos estructurados bajo contrato versionado.
- **Integración con Control de Gastos Personal:** API puntual y consentida para importar candidatos de gasto; deduplicación por referencia/hash y confirmación. Nunca enviar facturas de clientes ni datos fiscales de terceros a la app personal.
- **Sincronización offline:** UUID cliente, cola durable e idempotencia para temporizadores, horas, gastos y borradores. Las secuencias fiscales y emisiones usan protocolo específico y no resolución genérica por última escritura.
- **Auditoría y seguridad:** accesos, cambios de reglas, numeración, emisiones, anulaciones, exportaciones y remisiones. Logs técnicos sin NIF, conceptos, importes detallados, certificados ni payload fiscal completo.

Reglas de emisión no negociables:

- Emitir ejecuta una transacción única que valida perfil/regla, congela contenido, asigna número, calcula totales y genera el registro fiscal correspondiente.
- Tras emitir no se actualizan emisor, cliente, líneas, impuestos, fechas ni total; cualquier corrección sigue el flujo legal versionado aplicable.
- No existe borrado físico ordinario de una factura emitida. Baja de cuenta conserva o exporta lo exigible según la política legal validada.
- La fiscalidad usada queda referenciada por versión y fuente; una actualización normativa no recalcula documentos previos.
- La frase VERI*FACTU se usa únicamente cuando la modalidad y remisión cumplen los requisitos aplicables; el QR no demuestra por sí solo dicha modalidad.
- Ninguna factura se marca remitida, entregada, aceptada o cobrada por haber generado un PDF.

## 3. Módulos de frontend

- **Hoy:** temporizador, horas sin clasificar, aprobaciones pendientes, facturas por emitir y vencimientos; cada acción muestra su estado real.
- **Temporizador persistente:** proyecto/tarea, pausa, cambio de contexto y finalización. Recupera sesión tras cerrar la PWA y detecta solapamientos o saltos de reloj.
- **Parte semanal:** cuadrícula y agenda, edición masiva, duración real/facturable, notas y estado; funcionamiento completo offline.
- **Proyectos y bolsas:** alcance, saldo contratado/consumido/reservado, caducidad y movimientos; aviso antes de exceder sin bloquear trabajo.
- **Tarifas:** jerarquía cliente–proyecto–tarea, vigencia, redondeo y vista previa de qué regla se aplicará a cada parte.
- **Aprobación:** paquete versionado de horas/gastos con enlace o PDF; aceptación explícita y comparación cuando se reabre tras cambios.
- **Gastos:** captura, justificante, clasificación interna/repercutible/suplido y validación. La interfaz explica efecto en factura y rentabilidad por separado.
- **Rentabilidad:** ingreso, coste de tiempo, gastos y margen por proyecto; cobertura de coste interno visible para no fingir precisión.
- **Generador documental:** seleccionar horas/gastos aprobados y convertir total o parcialmente en presupuesto, albarán o borrador de factura conservando enlaces de origen.
- **Editor de factura:** cliente y perfil congelables, líneas, IVA, IRPF, suplidos, vencimientos, serie y previsualización. Advierte contexto fiscal incompleto antes de emitir.
- **Confirmación de emisión:** resumen irreversible, siguiente número, modalidad SIF, conectividad requerida y documentos que quedarán vinculados.
- **Rectificativas:** selecciona factura/s afectadas, motivo, líneas/importes y relación; nunca ofrece “editar factura emitida”.
- **Estado fiscal:** registro generado, encadenamiento, modalidad, remisión/respuesta y errores accionables; separa estado AEAT de envío al cliente.
- **Entrega electrónica:** PDF, Facturae/FACe o perfil B2B habilitado; valida destinatario y muestra acuse separado.
- **Cobros:** vencimientos, parciales y conciliación manual; recordatorios sin envío automático no consentido.
- **Exportación para gestoría:** periodo, formato, contenido y manifiesto; comprobaciones de continuidad de series, rectificativas y justificantes faltantes.
- **Integración de gastos personales:** candidatos, origen, coincidencias y confirmación; campos transferidos visibles antes de importar.
- **Configuración normativa:** versión activa, fuentes, fecha de revisión, modalidad soportada, declaración del sistema y resultado de pruebas; reservada a administración/compliance.
- **Estado offline:** operaciones pendientes y capacidades disponibles; emisión deshabilitada o bajo protocolo autorizado con explicación concreta, nunca por fallo silencioso.

## 4. Modelo de datos inicial

| Entidad | Campos y decisiones específicas |
|---|---|
| `businesses` | Propietario, nombre, moneda, zona horaria, estado y versión; unidad de aislamiento y facturación SaaS. |
| `business_members` | Negocio, usuario, rol y permisos; preparado para colaborador/gestoría sin cobrar por asiento en el modelo comercial inicial. |
| `fiscal_profile_versions` | Negocio, vigencia, identidad/domicilio cifrados, régimen, actividad, fuente y estado. |
| `clients` | Negocio, alias, identidad fiscal cifrada, contacto, condiciones de pago y estado. |
| `projects` | Cliente, código, modalidad, presupuesto, moneda, estado y fechas. |
| `task_types` | Negocio/proyecto, nombre, unidad facturable y estado. |
| `rate_versions` | Ámbito cliente/proyecto/tarea, precio, moneda, vigencia, mínimo, incremento/redondeo y prioridad. |
| `time_sessions` | Usuario, proyecto/tarea, inicio/fin, estado, reloj origen y operación. |
| `time_segments` | Sesión, inicio/fin, tipo, orden y anomalía; fuente de duración real. |
| `time_entries` | Proyecto, fecha de servicio, minutos reales/facturables, tarifa aplicada opcional, estado, versión y origen. |
| `approval_batches` | Cliente/proyecto, periodo, contenido congelado, hash, estado y vencimiento. |
| `approval_responses` | Lote/versión, respondedor, decisión, fecha, evidencia y comentario. |
| `hour_bags` | Proyecto/cliente, horas iniciales, vigencia y política. |
| `hour_bag_movements` | Bolsa, parte, tipo, minutos, fecha, actor y operación; saldo derivado. |
| `project_expenses` | Proyecto, tipo fiscal/operativo, proveedor, fecha, importes, moneda, justificante, pagador y estado. |
| `commercial_documents` | Tipo presupuesto/albarán, cliente, serie opcional, fecha, estado, moneda y versión. |
| `commercial_document_lines` | Documento, origen, descripción, cantidad, unidad, precio, descuento, orden y versión. |
| `invoices` | Negocio, cliente, tipo, serie, número, fecha emisión/operación, moneda, estado, perfil fiscal, regla y hash. |
| `invoice_lines` | Factura, origen parte/gasto/documento, descripción congelada, cantidad, precio, descuento, tratamiento fiscal y totales. |
| `tax_rule_sets` | Jurisdicción, sujeto/operación, vigencia, versión, fuente oficial, revisión y estado. |
| `tax_calculations` | Factura/línea, regla, base, tipo, cuota, retención, redondeo, explicación y hash. |
| `invoice_relations` | Factura origen/destino, tipo rectificación/sustitución/conversión, importe afectado y motivo. |
| `invoice_series` | Negocio, código, tipo, vigencia, siguiente secuencia, política y estado. |
| `invoice_number_allocations` | Serie, número, factura, transacción, asignado y estado; unicidad estricta. |
| `payment_schedules` | Factura, fecha, importe, estado y regla de cálculo. |
| `payments` | Factura, fecha, importe, método, referencia, estado y conciliación. |
| `fiscal_system_versions` | Software/versión, modalidad, especificación, declaración, fecha, hash binario/configuración y estado. |
| `billing_records` | Factura, tipo alta/anulación, secuencia, anterior, huella, payload canónico, sistema y generado. |
| `billing_event_records` | Sistema/registro, evento, fecha, payload canónico, huella y encadenamiento cuando aplique. |
| `tax_agency_submissions` | Registro, modalidad, intento, payload, estado, respuesta, código/error y marcas temporales. |
| `electronic_invoice_artifacts` | Factura, perfil/formato/versión, archivo cifrado, hash, firma, destinatario y estado. |
| `source_documents` | Objeto cifrado, hash, MIME, retención y metadatos; justificantes/PDF fuera de la base de datos. |
| `accounting_exports` | Periodo, formato/versión, selección, manifiesto, archivo, hash, caducidad y descargas. |
| `integration_imports` | Origen, consentimiento, referencia/hash, payload mínimo, coincidencia, estado y usuario confirmante. |
| `sync_operations` | UUID cliente, dispositivo, entidad no fiscal, acción, versión base, estado y conflicto. |
| `audit_logs` | Actor, acción, objeto opaco, versión, resultado y fecha; sin datos fiscales completos. |

Convenciones iniciales:

- ULID/UUID cliente para horas, gastos y borradores; identificadores y secuencias fiscales se asignan bajo control del servidor/protocolo validado.
- Dinero en decimal de precisión suficiente y moneda obligatoria; reglas de redondeo almacenadas por cálculo.
- Fechas fiscales como `date` local y eventos técnicos como UTC más zona de origen.
- Facturas emitidas y registros fiscales append-only; correcciones por relaciones y nuevos documentos.
- Payloads canónicos deterministas antes de huella/firma; conservar versión de serializador y especificación.
- Índices/constraints: número único por negocio-serie, huella/secuencia, parte/estado/fecha, proyecto/periodo, factura/estado/vencimiento e idempotency key.

## 5. Diferenciador frente a competencia

- **Continuidad de datos demostrable:** cada línea factura horas, bolsas o gastos aprobados con vínculo al origen y valores congelados; no copia texto sin trazabilidad.
- **Offline donde aporta y prudencia fiscal donde obliga:** el autónomo registra trabajo sin red, pero la emisión usa un protocolo diseñado y validado específicamente.
- **Fiscalidad temporal:** perfiles, reglas, formatos y especificaciones conservan vigencia y fuente; una actualización no reescribe facturas antiguas.
- **VERI*FACTU sin marketing confuso:** distingue SIF, modalidad de remisión y factura electrónica B2B/FACe, mostrando el estado real de cada flujo.
- **Rectificación correcta por diseño:** la interfaz no permite editar una factura emitida y guía hacia documento relacionado y motivo.
- **Suplidos tratados como excepción documentada:** no basta una categoría contable para excluirlos de base, ingresos o impuestos.
- **Rentabilidad basada en tiempo real:** separa duración trabajada, facturable, aprobada y cubierta por bolsa, con coste interno y cobertura visibles.
- **Gestoría como salida estructurada:** manifiesto, versiones, facturas, rectificativas, cobros y justificantes viajan juntos, no como una carpeta de PDF sin contexto.
- **Integración personal minimizada:** solo importa candidatos de gasto consentidos; los datos de clientes nunca se propagan a Control de Gastos Personal.

La métrica principal será el porcentaje de facturas emitidas cuyas líneas proceden íntegramente de datos aprobados y no reintroducidos manualmente. Métricas de calidad: recuperación de temporizadores, discrepancias de redondeo, continuidad de series, rectificativas, registros fiscales válidos, remisiones conciliadas, exportaciones aceptadas por gestoría y margen con cobertura. No se optimizará por facturas emitidas ni por impuestos “reducidos”.

## 6. Fases del roadmap

**Fase 0 — Alcance fiscal y especificación inmutable**

- Validar con asesoría fiscal/jurídica el alcance objetivo, tipos de autónomo, operaciones, IVA, IRPF, suplidos, series y rectificativas.
- Separar formalmente Reglamento SIF/VERI*FACTU, obligaciones generales de facturación y factura electrónica estructurada.
- Crear matriz normativa con fuente oficial, vigencia, aplicabilidad, propietario y prueba asociada; reconfirmar fechas antes de cada release.
- Definir transacción de emisión, canonicalización, numeración, conservación y estrategia offline antes de programar facturas.

**Fase 1 — Tiempo, proyectos y rentabilidad offline-first**

- Clientes, proyectos, tareas, tarifas versionadas, temporizador persistente, partes manuales y bolsas.
- Gastos operativos, coste interno y margen con cobertura.
- IndexedDB, cola durable, UUID cliente, idempotencia y conflictos.
- Salida: varios días offline sin perder segmentos ni duplicar partes.

**Fase 2 — Flujo comercial previo a factura**

- Aprobaciones por hash de versión, presupuestos, albaranes y conversiones parciales.
- Congelación de tarifa, descripción, cantidades y líneas de origen.
- PDF comercial y envío con estados explícitos.
- Salida: cualquier cambio material invalida aprobación y queda trazado.

**Fase 3 — Facturación española base**

- Perfil fiscal versionado, series, numeración transaccional, IVA/IRPF configurables, vencimientos, cobros y rectificativas.
- Suplidos y gastos repercutidos separados, con barreras de validación.
- Motor fiscal con corpus de casos revisado por especialista y pruebas doradas.
- Salida: factura emitida inmutable, reproducible y exportable; sin prometer aún conformidad SIF.

**Fase 4 — SIF y modalidad elegida**

- Implementar primero una sola modalidad tras decisión legal/técnica explícita; preferir alcance reducido frente a dos caminos parcialmente conformes.
- Registros de facturación/eventos, huella, encadenamiento, QR/textos, remisión y respuestas conforme a especificaciones entonces vigentes.
- Declaración responsable, matriz de requisitos, pruebas de integridad, fallos, reintentos, cambio horario y pérdida de conectividad.
- Auditoría externa y pruebas oficiales disponibles como puerta de salida; no autodeclarar cumplimiento por generar XML/QR.

**Fase 5 — Factura electrónica y gestoría**

- Facturae/FACe para clientes públicos cuando el alcance lo requiera y perfil B2B separado conforme al reglamento vigente en ese momento.
- Firma, directorio de destinatarios, estados de entrega/aceptación y errores.
- Exportaciones versionadas para gestorías piloto y conciliación de feedback.
- Salida: cada formato tiene validador, fixtures y contrato; PDF nunca se etiqueta como formato estructurado.

**Fase 6 — Integración y producción**

- API puntual de Control de Gastos Personal, consentimiento, minimización y deduplicación.
- RGPD: clientes, NIF, justificantes, exportaciones, encargados, conservación fiscal y baja de cuenta.
- Seguridad: autorización horizontal, certificados, secretos, archivos, secuencias, canonicalización y logs.
- Accesibilidad WCAG 2.2 AA y pruebas iOS/Android, modo avión, temporizadores largos y documentos extensos.
- Observabilidad separada para Laravel, PHP-FPM, colas, Redis, base de datos, almacenamiento, remisiones fiscales y sincronización, sin payload fiscal en telemetría.
- Revisión normativa final inmediatamente antes de producción; bloquear emisión si versión, declaración, fuentes o pruebas obligatorias no están aprobadas.
