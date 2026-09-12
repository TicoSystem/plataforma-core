# Plan Maestro — Bitácora de Vehículos

## 1. Propósito y usuario objetivo

La app permitirá conocer la rentabilidad real de cada vehículo al relacionar ingresos por turno, kilómetros productivos e improductivos y todos los costes de propiedad y operación. También funcionará como historial de uso, mantenimiento y obligaciones del vehículo.

El usuario principal es un conductor autónomo o de pequeña flota que trabaja con Uber, Cabify, Bolt u otras plataformas VTC/taxi en España. Necesita saber cuánto gana realmente por hora y kilómetro después de combustible o recarga, comisiones, peajes, mantenimiento, seguro, financiación y depreciación. El usuario secundario es el propietario particular que desea controlar gastos y revisiones sin registrar ingresos profesionales.

El GPS será opcional, activado explícitamente y visible mientras funcione. La app ofrecerá entrada manual rápida e importación CSV como alternativas completas. Los cálculos fiscales serán informativos; la exportación facilitará el trabajo de la gestoría, pero no sustituirá asesoramiento contable o tributario.

## 2. Dominios de backend

- **Identidad y espacios de trabajo:** usuarios, negocio opcional, miembros, roles y consentimiento de localización.
- **Vehículos:** ficha, matrícula protegida, energía, adquisición, titularidad, kilometraje y estado.
- **Turnos:** plataforma, conductor, inicio/fin, ingresos brutos, propinas, incentivos, comisiones, horas y estado.
- **Trayectos y kilometraje:** segmentos con/sin pasajero, kilómetros manuales, GPS o importados, finalidad y calidad del dato.
- **Ingresos e importaciones VTC:** perfiles CSV por plataforma/versión, mapeo, validación, vista previa, errores y conciliación con turnos.
- **Gastos variables:** combustible, recarga, peajes, aparcamiento, lavados, comisiones y otros costes asignables.
- **Costes fijos:** seguro, financiación, licencias, alquiler, impuestos y cuotas periodificadas.
- **Mantenimiento:** servicios, reparaciones, neumáticos, piezas, taller, odómetro, documentos y próxima intervención.
- **Depreciación:** método configurable —lineal como valor inicial—, valor residual, vida útil y cálculo por periodo/kilómetro.
- **Obligaciones:** ITV, seguro, revisión y otras fechas; reglas de aviso y renovaciones.
- **OCR documental:** ticket/factura, campos detectados, confianza, documento cifrado y confirmación humana.
- **Rentabilidad:** instantáneas reproducibles por vehículo, turno, plataforma y periodo; coste/hora, coste/km y beneficio neto.
- **Exportaciones:** paquete trimestral CSV/PDF/ZIP con ingresos, gastos, justificantes y criterios de cálculo.
- **Integración con Control de Gastos:** publicación asíncrona consentida de eventos de gasto, idempotencia, estado y revocación.
- **Sincronización offline:** cola local, versiones, resolución de conflictos y borrado lógico.

## 3. Módulos de frontend

- **Inicio:** beneficio neto del periodo, horas, kilómetros, coste/km, próximas obligaciones y avisos.
- **Vehículos:** ficha, odómetro, documentos, coste acumulado, rentabilidad e historial.
- **Turno rápido:** iniciar/finalizar, plataforma, ingresos, horas, kilómetros con/sin pasajero y notas.
- **Importador VTC:** plataforma, CSV, mapeo, vista previa, incidencias y confirmación.
- **GPS opcional:** permiso contextual, indicador persistente, pausa, clasificación posterior y eliminación de ruta.
- **Repostaje/recarga:** litros o kWh, precio, odómetro, estación, depósito/carga completa y ticket.
- **Gastos:** alta rápida, OCR, categoría, proveedor, vehículo, deducibilidad informada por el usuario y justificante.
- **Mantenimiento:** operación, piezas, taller, coste, odómetro y siguiente revisión por fecha o kilómetros.
- **Calendario:** ITV, seguro, revisiones, financiación y recordatorios escalonados.
- **Rentabilidad:** filtros por vehículo/plataforma/periodo y desglose desde beneficio hasta cada dato fuente.
- **Simulador:** impacto de combustible, horas, kilómetros vacíos, financiación o depreciación, sin modificar registros.
- **Exportación para gestoría:** trimestre, selección de datos, comprobaciones y descarga.
- **Conexiones:** autorización granular y registro de eventos enviados a Control de Gastos.
- **Sincronización y privacidad:** estado offline, conflictos, permisos GPS, retención y borrado/exportación.

## 4. Modelo de datos inicial

- `users`, `workspaces`, `workspace_members`, `devices`: identidad, ámbito, rol y sincronización.
- `vehicles`: propietario, matrícula cifrada/enmascarada, combustible, compra, valor y odómetro.
- `platforms`, `driver_accounts`: Uber/Cabify/Bolt/otra, conductor e identificador externo cifrado.
- `shifts`: vehículo, plataforma, inicio, fin, ingresos, comisiones, horas y estado.
- `trip_segments`, `odometer_readings`: turno, origen del dato, kilómetros, ocupación, finalidad y precisión.
- `income_entries`: turno, tipo, bruto, comisión, neto, moneda y fuente.
- `expense_entries`: vehículo, turno opcional, categoría, importe, IVA informado, fecha, proveedor y origen.
- `fuel_entries`, `charge_entries`: cantidad, unidad, coste, odómetro y carga completa.
- `maintenance_records`, `maintenance_items`: servicio, taller, piezas, coste, fecha y kilometraje.
- `recurring_costs`: tipo, importe, frecuencia, vigencia y criterio de reparto.
- `depreciation_profiles`, `depreciation_entries`: método, base, residual, vida útil y resultado versionado.
- `vehicle_deadlines`, `reminder_rules`: obligación, vencimiento, umbral kilométrico y avisos.
- `import_batches`, `import_rows`, `import_profiles`: archivo, versión, mapeo, fila y resultado.
- `documents`, `ocr_extractions`: archivo cifrado, tipo, campos, confianza y confirmación.
- `profitability_snapshots`: periodo, ingresos, costes, horas, kilómetros, fórmula y versión.
- `exports`, `outbox_events`, `delivery_attempts`, `audit_logs`: paquete, evento, destino, idempotencia y trazabilidad.

Importes y magnitudes usarán decimales y unidades explícitas. Los resultados guardarán fórmula y entradas para poder reproducirse.

## 5. Diferenciador frente a competencia

La app medirá negocio, no solo consumo del vehículo. Separará kilómetros con pasajero, aproximación y vacío; distribuirá costes fijos y depreciación; y mostrará beneficio neto por hora y kilómetro con acceso a cada dato que lo explica.

La captura será flexible: GPS controlable, entrada manual rápida o CSV. Ningún usuario perderá funcionalidad esencial por rechazar localización. El OCR propondrá datos y conservará el ticket, pero exigirá confirmación.

La adaptación española incluirá ITV, formatos y plataformas locales, además de una exportación trimestral ordenada. Control de Gastos recibirá únicamente eventos autorizados mediante patrón outbox, sin acceso directo a la base de vehículos y sin duplicar gastos al reintentar.

## 6. Fases del roadmap

1. **Fundación:** Laravel/Vue/PWA, usuarios, vehículos, almacenamiento offline, sincronización idempotente y privacidad.
2. **MVP manual:** turnos, ingresos, kilómetros, gastos, repostajes/recargas, mantenimiento y rentabilidad básica.
3. **Coste real:** costes fijos, financiación, depreciación, asignación por periodo y desglose reproducible.
4. **Automatización:** CSV de plataformas prioritarias, perfiles versionados, conciliación y OCR de tickets.
5. **Operación avanzada:** GPS opcional, trayectos ocupados/vacíos, calendario ITV/seguro/revisión y simulador.
6. **Integraciones y lanzamiento:** eventos hacia Control de Gastos, exportación para gestoría, RGPD, seguridad, observabilidad por app y QA exhaustivo offline/multidispositivo.
## 1. Propósito y usuario objetivo

**Bitácora de Vehículos** calculará la rentabilidad real de cada vehículo y periodo de trabajo a partir de ingresos, kilómetros, tiempo y costes atribuibles. La unidad operativa será el **turno**; la unidad económica será el **vehículo**, incluyendo desembolsos directos, costes periódicos, financiación y depreciación sin mezclarlos en una sola cifra opaca.

El producto se dirige a conductores profesionales y pequeños titulares de flota en España —incluidos quienes trabajan con Uber, Cabify o Bolt— y a autónomos que usan un vehículo para generar ingresos. El MVP priorizará negocios de una a cinco unidades que hoy combinan informes de plataformas, tickets, odómetro y hojas de cálculo.

Decisiones de alcance:

- Se distinguirán ingreso bruto de plataforma, comisiones, incentivos, propinas, ajustes e ingreso neto liquidado. El importe transferido al banco no sustituirá al desglose del turno.
- Los kilómetros se clasificarán como con pasajero, aproximación/espera operativa, reposicionamiento, desplazamiento profesional no VTC y uso personal. El usuario podrá combinar captura manual e importada.
- La rentabilidad tendrá dos vistas: **caja** —cobros y pagos del periodo— y **económica** —costes devengados, depreciación y financiación separando principal e intereses—.
- La app no determinará por sí sola la deducibilidad fiscal. Guardará afectación, IVA, justificantes y criterios elegidos para que una gestoría revise la exportación.
- ITV, seguro y revisión serán recordatorios basados en datos del vehículo, reglas configuradas y documentación aportada; no sustituirán la consulta a fuentes oficiales ni al taller/aseguradora.
- GPS estará desactivado por defecto, se iniciará y detendrá de forma visible por turno y admitirá borrado de trazas. La alternativa manual permitirá registrar inicio/fin, horas y odómetro en segundos.
- OCR e importaciones crearán borradores o candidatos. Ningún importe, kilometraje o fecha afectará a rentabilidad sin validación o regla previamente aceptada.
- La integración con Control de Gastos Personal enviará gastos seleccionados mediante eventos asíncronos consentidos; no habrá acceso cruzado a bases de datos.

## 2. Dominios de backend

**Identidad, negocios y acceso**

- Usuario individual o negocio ligero como tenant, con miembros y roles `owner`, `manager`, `driver` y `viewer`.
- Permisos independientes para ver ingresos, costes, ubicación, valoración, exportaciones e integraciones.
- Un conductor podrá registrar turnos de vehículos asignados sin ver financiación, seguro o rentabilidad global.
- Todas las consultas, jobs, exportaciones y eventos se limitarán por `workspace_id`.

**Vehículos**

- Ficha con matrícula, VIN opcional, marca/modelo, combustible/energía, fecha de primera matriculación, adquisición, baja y odómetro inicial.
- Titularidad `owned`, `financed`, `leased` o `rented`; los contratos económicos se modelarán aparte de la ficha técnica.
- Configuración por vehículo de unidad energética, consumo, kilometraje anual previsto, uso profesional estimado y política de depreciación.
- Estado `active`, `inactive`, `sold` o `written_off`; archivar no elimina turnos, gastos ni cálculos históricos.
- Lecturas de odómetro inmutables por origen, con detección de retrocesos, saltos y cambio de cuadro como incidencias explícitas.

**Turnos e ingresos**

- Turno con conductor, vehículo, inicio/fin, tiempo conectado, pausas, plataforma o combinación de plataformas y estado.
- Segmentos kilométricos por clase y fuente; la suma no dependerá exclusivamente del GPS.
- Ingresos por plataforma y turno desglosados en tarifa, suplemento, incentivo, propina, ajuste, comisión, retención informativa e importe liquidado.
- Un turno puede agrupar varias plataformas sin duplicar tiempo: los tramos solapados se consolidarán y los ingresos conservarán su procedencia.
- Cierre del turno con resumen y advertencias por horas, odómetro o liquidación incoherentes; reabrir queda auditado.

**Importación VTC**

- Pipeline por lotes: fichero, plataforma declarada/detectada, mapeo, normalización, previsualización, conciliación y confirmación.
- Adaptadores versionados por plataforma/formato, más mapeador genérico CSV para cambios o exportaciones no reconocidas.
- Zona horaria, separador decimal, divisa, identificador de viaje, fechas, comisión y signo configurables por plantilla.
- Conservación de fichero original, SHA-256, fila, payload normalizado y versión del adaptador para reproducir resultados.
- Idempotencia por plataforma, cuenta, identificador externo y/o huella; un cambio de formato genera error visible, no columnas ignoradas silenciosamente.
- Conciliación de viajes importados con turnos por conductor, vehículo y ventana temporal; los viajes sin turno quedan en bandeja pendiente.

**Kilometraje y geolocalización**

- Fuentes `manual_odometer`, `manual_distance`, `platform_import`, `gps` y `derived`; nunca se sumarán fuentes solapadas sin regla explícita.
- Sesión GPS subordinada a un turno, con consentimiento, precisión, intervalo y estado visible.
- Procesamiento local cuando sea posible para obtener distancia y segmentos; la traza detallada tendrá retención más corta que los agregados.
- Clasificación manual rápida de intervalos y corrección posterior; los cambios conservan valor original y actor.
- Detección de incoherencias entre odómetro, GPS e importación mediante tolerancias, sin sobrescritura automática.

**Gastos y justificantes**

- Gasto con proveedor, fecha de operación, fecha de pago, categoría, base imponible, IVA, total, afectación profesional declarada, vehículo y método de pago.
- Categorías específicas: combustible, recarga, peaje, aparcamiento, lavado, mantenimiento, reparación, neumáticos, seguro, impuesto, licencia, alquiler, financiación y otros.
- Gastos directos asignados a vehículo; gastos comunes repartidos mediante reglas versionadas por kilómetros, horas, ingresos o porcentaje manual.
- Ticket/factura en almacenamiento privado; OCR por campo con confianza y evidencia, siempre revisable.
- Litros/kWh, precio unitario, odómetro y estación/punto de carga para consumos; validación de `cantidad × precio` frente al total con tolerancia de redondeo.
- Reversión y corrección mediante historial; un justificante nunca se eliminará al fusionar duplicados.

**Mantenimiento y neumáticos**

- Intervención con taller, odómetro, tareas, piezas, coste, fecha y próxima recomendación por fecha/kilómetros.
- Plan configurable por vehículo y tarea: aceite, filtros, frenos, neumáticos, batería u otras.
- Próximo vencimiento calculado por el menor de fecha o kilometraje proyectado, mostrando la base del cálculo.
- Componentes importantes como neumáticos podrán llevar posición, montaje, retirada y kilometraje acumulado sin construir un sistema de taller completo.

**Obligaciones y documentos**

- Eventos de ITV, seguro, impuesto y revisión con fecha prevista, estado, documento, coste y regla de recordatorio.
- Las reglas generales se versionarán y exigirán confirmación del usuario cuando falten clase, antigüedad o uso necesarios para calcular.
- Seguro con periodo de cobertura, prima y vehículo; renovación no se asumirá hasta disponer de nueva póliza o confirmación.
- Alertas por fecha y kilometraje con deduplicación, reprogramación y registro de entrega.

**Financiación, propiedad y depreciación**

- Activo vehículo con coste de adquisición, gastos capitalizables, valor residual estimado, fecha de puesta en servicio y método de depreciación.
- Método inicial lineal para análisis interno; parámetros editables y versionados, sin presentarlo como amortización fiscal aceptada.
- Contrato financiero con entrada, principal, intereses/comisiones, cuotas y valor final; principal reduce deuda y no se contabiliza como coste operativo.
- Leasing/alquiler como gasto periódico separado de depreciación para impedir doble cómputo.
- Venta/baja calcula resultado interno frente al valor pendiente, manteniendo separado el tratamiento fiscal.

**Motor de rentabilidad**

- Periodos por día, semana, mes, trimestre y rango personalizado; cálculos por vehículo, conductor y plataforma cuando exista atribución.
- Margen de contribución: ingreso devengado menos comisiones y costes variables directos.
- Beneficio de caja: cobros menos pagos del periodo.
- Beneficio económico: ingresos devengados menos costes variables, costes fijos prorrateados, intereses y depreciación; principal financiero excluido.
- Beneficio/hora usa horas operativas definidas por el usuario —conectadas o turno completo— y muestra el denominador aplicado.
- Beneficio/km ofrece denominadores total profesional y con pasajero por separado; nunca una cifra única sin etiqueta.
- Costes fijos se prorratean por día, kilómetros, horas o regla manual versionada; el informe conserva fórmula, entradas y versión.
- Datos incompletos generan nivel de cobertura y advertencias; no se rellenan kilómetros, comisiones o costes con cero implícito.

**Exportación trimestral**

- Paquete por trimestre con CSV/XLSX de ingresos, gastos, kilómetros, activos, financiación y documentos relacionados.
- Columnas separadas para base, IVA, total, porcentaje profesional declarado, categoría, proveedor, matrícula y referencia de justificante.
- Índice de documentos y listado de incidencias: ticket sin factura, duplicado posible, afectación sin confirmar o campo fiscal incompleto.
- El archivo se presenta como dossier para revisión de gestoría, no como declaración tributaria ni garantía de deducibilidad.
- Cierre trimestral opcional; cualquier cambio posterior se marca como ajuste de periodo cerrado.

**Integración con Control de Gastos Personal**

- Consentimiento granular por vehículo, categoría y periodo; el usuario previsualiza cada campo transferido.
- Outbox transaccional con eventos `vehicle_expense.created`, `vehicle_expense.updated` y `vehicle_expense.deleted`, todos versionados e idempotentes.
- Payload mínimo: identificador opaco, fecha, importe, moneda, comercio, categoría sugerida, método de pago enmascarado y marca de uso profesional/personal.
- Los documentos no viajan por defecto. Transferir justificantes exige consentimiento separado y enlace temporal.
- La aplicación destino conserva su propia categorización; no existe escritura directa ni eliminación retroactiva al revocar futuras sincronizaciones.

**Sincronización offline, privacidad y auditoría**

- UUID de cliente, cola local, cursor incremental, claves de idempotencia y versión optimista.
- Operaciones manuales de turno, odómetro, ingreso y gasto disponibles offline; OCR, importación, exportación y eventos externos requieren servidor.
- Conflicto explícito para cierres de turno, kilometraje, importe, vehículo, conciliación y reparto de coste.
- Ubicación precisa separada de datos económicos, cifrada, con acceso restringido, retención configurable y registro de accesos/exportaciones.
- Auditoría de cambios, importaciones, OCR, cierres, reglas de reparto, permisos, exportaciones y consentimientos.

## 3. Módulos de frontend

**Panel de rentabilidad**

- Ingresos, costes variables, costes fijos, depreciación, beneficio de caja y beneficio económico sin mezclar métricas.
- Beneficio/hora y beneficio/km con selector de denominador y cobertura de datos.
- Comparación por vehículo, plataforma y periodo; cada total enlaza con sus componentes.

**Turno rápido**

- Inicio con vehículo, conductor, odómetro y plataformas; opción GPS separada y desactivada por defecto.
- Durante el turno: ingreso rápido, gasto, cambio de estado kilométrico, pausa y foto de ticket.
- Cierre con odómetro, horas, kilómetros por clase, ingresos y advertencias; funcionamiento completo manual sin red.
- Recuperación de turno abierto tras cierre de navegador o reinicio del dispositivo.

**Importación VTC**

- Asistente por plataforma con fichero, formato, mapeo, previsualización y conciliación con turnos.
- Resumen de viajes, ingresos, comisiones, incentivos, filas duplicadas y errores.
- Bandeja para formatos desconocidos o columnas nuevas y descarga de incidencias por fila.
- Reversión de lote protegida si los registros importados ya fueron modificados o exportados.

**Vehículos**

- Ficha con estado, odómetro, rentabilidad, costes acumulados, documentación y próximos hitos.
- Datos de compra/contrato, depreciación interna y financiación visibles solo por permiso.
- Historial de lecturas y resolución de inconsistencias de odómetro.

**Ingresos y gastos**

- Libro filtrable por vehículo, turno, plataforma, categoría, proveedor, afectación, origen y trimestre.
- Alta manual y edición con desglose fiscal informativo; selección masiva para categoría o afectación.
- Conciliación de duplicados entre OCR, importación y entrada manual sin eliminación automática.

**OCR y justificantes**

- Captura de ticket/factura con revisión campo a campo y fragmento de evidencia.
- Formularios específicos para combustible/energía y mantenimiento.
- Cola offline de imágenes y estado de subida/procesamiento; opción de guardar el gasto manual antes de OCR.
- Comparación con gastos existentes por fecha, total, comercio y vehículo.

**Kilometraje y GPS**

- Vista por turno con kilómetros totales, con pasajero y sin pasajero desglosado.
- Control inequívoco iniciar/pausar/detener, indicador persistente y acceso rápido a borrar traza.
- Comparación entre odómetro, plataforma y GPS con selección de fuente para rentabilidad.
- Mapa solo cuando exista traza y permiso; los informes estándar usarán agregados, no ubicaciones precisas.

**Mantenimiento y obligaciones**

- Línea temporal de intervenciones y costes; plan por fecha/kilómetros.
- Calendario de ITV, seguro, impuesto y revisiones con procedencia de cada fecha.
- Alertas configurables y acción de completar/aplazar con documento o nota.

**Financiación y depreciación**

- Calendario de cuotas separando principal, intereses y comisiones.
- Simulador de depreciación lineal con coste, valor residual y vida útil; cambios como nueva versión.
- Vista de coste económico que evita sumar alquiler/leasing y depreciación simultáneamente.

**Informes y exportación**

- Resultados por turno, vehículo, plataforma y trimestre con vista caja/económica.
- Desglose de coste/km, coste/hora, ocupación y porcentaje de kilómetros con pasajero.
- Asistente trimestral con validaciones, documentos faltantes, vista previa y paquete para gestoría.

**Integración con Control de Gastos**

- Selector de gastos, categorías y periodo; previsualización exacta del payload.
- Estado transferido, actualizado, fallido o revocado por gasto.
- Gestión de consentimiento y reintento idempotente sin prometer borrado en destino.

**Equipo, ajustes y privacidad**

- Miembros, vehículos asignados y permisos de ingresos, costes, GPS y exportación.
- Reglas de reparto, método de depreciación, horas/km de referencia, notificaciones y retención GPS.
- Centro offline con última sincronización, comandos pendientes, errores y conflictos accionables.

## 4. Modelo de datos inicial

Las claves primarias serán UUID/ULID. El dinero se almacenará en unidades mínimas enteras y código ISO 4217; distancias en metros, energía en mililitros/litros normalizados o Wh/kWh y duraciones en segundos. Las entidades editables offline incluirán `created_at`, `updated_at`, `deleted_at` y `lock_version`.

| Entidad | Campos específicos iniciales | Restricciones y relaciones |
| --- | --- | --- |
| `workspaces` | `name`, `type`, `tax_id`, `currency`, `timezone` | Tenant individual o negocio; EUR en MVP. |
| `workspace_members` | `workspace_id`, `user_id`, `role`, `status` | Único por workspace/usuario. |
| `member_vehicle_assignments` | `member_id`, `vehicle_id`, `capabilities_json`, `starts_at`, `ends_at` | Acceso temporal y por vehículo. |
| `vehicles` | `workspace_id`, `registration_number`, `vin`, `make`, `model`, `energy_type`, `first_registered_on`, `acquired_on`, `disposed_on`, `ownership_type`, `tracking_mode`, `status` | Matrícula única activa por workspace. |
| `odometer_readings` | `vehicle_id`, `read_at`, `distance_m`, `source_type`, `source_id`, `status`, `recorded_by` | Retrocesos crean incidencia; no sobrescritura. |
| `shifts` | `workspace_id`, `vehicle_id`, `driver_member_id`, `started_at`, `ended_at`, `connected_seconds`, `break_seconds`, `start_odometer_m`, `end_odometer_m`, `status`, `operation_uuid` | Una operación UUID por workspace; cierre versionado. |
| `shift_platforms` | `shift_id`, `platform_account_id`, `active_from`, `active_until` | Permite varias plataformas y solapamiento explícito. |
| `distance_segments` | `shift_id`, `classification`, `distance_m`, `started_at`, `ended_at`, `source_type`, `source_id`, `confidence` | Fuentes solapadas no se agregan sin selección. |
| `platform_accounts` | `workspace_id`, `provider`, `external_label`, `driver_member_id`, `active` | No requiere credenciales en MVP. |
| `revenue_entries` | `workspace_id`, `shift_id`, `vehicle_id`, `platform_account_id`, `external_trip_id`, `occurred_at`, `fare_minor`, `supplements_minor`, `incentives_minor`, `tips_minor`, `adjustments_minor`, `commission_minor`, `withholding_minor`, `settled_minor`, `source_type` | Huella/ID externo únicos dentro de cuenta y proveedor. |
| `import_templates` | `workspace_id`, `provider`, `name`, `mapping_json`, `parsing_options_json`, `adapter_version` | Versionadas por formato. |
| `import_batches` | `workspace_id`, `platform_account_id`, `template_id`, `filename`, `file_hash`, `status`, `total_rows`, `success_rows`, `error_rows`, `completed_at` | Repetición requiere confirmación explícita. |
| `import_rows` | `import_batch_id`, `row_number`, `raw_payload_json`, `normalized_payload_json`, `status`, `error_code`, `subject_type`, `subject_id` | Único por lote/fila. |
| `expenses` | `workspace_id`, `vehicle_id`, `shift_id`, `category_id`, `supplier_id`, `incurred_on`, `paid_on`, `tax_base_minor`, `vat_minor`, `total_minor`, `currency`, `business_use_percent`, `payment_method_label`, `source_type`, `status` | Afectación declarada, no decisión fiscal automática. |
| `expense_categories` | `workspace_id`, `system_key`, `name`, `allocation_default`, `active` | Categorías de sistema copiadas y personalizables. |
| `expense_allocations` | `expense_id`, `vehicle_id`, `amount_minor`, `allocation_method`, `rule_version`, `calculation_json` | Suma igual al total atribuible. |
| `fuel_energy_details` | `expense_id`, `energy_type`, `quantity`, `unit`, `unit_price_minor`, `odometer_m`, `station_name`, `charge_duration_seconds` | Uno por gasto compatible; validación de total. |
| `documents` | `workspace_id`, `expense_id`, `maintenance_event_id`, `storage_key`, `mime_type`, `sha256`, `document_type`, `retention_until` | Almacenamiento privado; relación exclusiva validada. |
| `extraction_jobs` | `document_id`, `status`, `provider`, `model_version`, `started_at`, `completed_at`, `error_code` | Asíncrono e idempotente. |
| `extracted_fields` | `extraction_job_id`, `field_name`, `raw_value`, `normalized_value_json`, `confidence`, `evidence_locator`, `review_status` | Revisión por campo. |
| `maintenance_events` | `workspace_id`, `vehicle_id`, `supplier_id`, `performed_on`, `odometer_m`, `type`, `description`, `cost_minor`, `next_due_on`, `next_due_odometer_m` | Coste enlazable a `expenses`. |
| `maintenance_plans` | `vehicle_id`, `task_type`, `interval_days`, `interval_distance_m`, `last_event_id`, `enabled` | Vence por la primera condición alcanzada. |
| `compliance_events` | `workspace_id`, `vehicle_id`, `type`, `due_on`, `completed_on`, `status`, `rule_version`, `source`, `document_id` | ITV/seguro/impuesto como recordatorio verificable. |
| `insurance_policies` | `vehicle_id`, `provider`, `policy_number_masked`, `coverage_from`, `coverage_until`, `premium_minor`, `renewal_status` | Periodos históricos, no renovación asumida. |
| `vehicle_assets` | `vehicle_id`, `acquisition_cost_minor`, `capitalized_costs_minor`, `residual_value_minor`, `in_service_on`, `depreciation_method`, `useful_life_months`, `calculation_version` | Una versión activa; historial aparte. |
| `depreciation_schedules` | `vehicle_asset_id`, `period_start`, `period_end`, `amount_minor`, `book_value_minor`, `calculation_version`, `status` | Análisis interno reconstruible. |
| `finance_contracts` | `vehicle_id`, `type`, `provider`, `principal_minor`, `down_payment_minor`, `started_on`, `ends_on`, `balloon_minor`, `status` | Préstamo, leasing, renting o alquiler. |
| `finance_installments` | `finance_contract_id`, `due_on`, `principal_minor`, `interest_minor`, `fees_minor`, `paid_on`, `expense_id` | Principal excluido de coste operativo. |
| `gps_sessions` | `workspace_id`, `shift_id`, `vehicle_id`, `started_at`, `ended_at`, `consent_version`, `status`, `retention_until` | Una sesión activa por dispositivo/turno. |
| `gps_points` | `gps_session_id`, `recorded_at`, `latitude_encrypted`, `longitude_encrypted`, `accuracy_m`, `speed_mps` | Particionado y purga por retención. |
| `profitability_runs` | `workspace_id`, `vehicle_id`, `period_start`, `period_end`, `view_type`, `engine_version`, `inputs_hash`, `calculation_json`, `result_json`, `coverage_json` | Resultado explicable y reproducible. |
| `quarterly_exports` | `workspace_id`, `year`, `quarter`, `scope_json`, `status`, `storage_key`, `generated_at`, `closed_at` | Único por alcance/versión; ajustes posteriores señalados. |
| `transfer_consents` | `workspace_id`, `user_id`, `destination_app`, `scope_json`, `contract_version`, `granted_at`, `revoked_at` | Consentimiento granular y versionado. |
| `expense_transfers` | `consent_id`, `expense_id`, `destination_external_id`, `payload_version`, `payload_hash`, `status`, `last_synced_at` | Idempotencia por gasto y versión. |
| `outbox_events` | `workspace_id`, `aggregate_type`, `aggregate_id`, `event_type`, `schema_version`, `payload_json`, `occurred_at`, `published_at`, `attempts` | Misma transacción que el cambio de gasto. |
| `sync_operations` | `workspace_id`, `user_id`, `device_id`, `operation_uuid`, `command_type`, `payload_json`, `base_versions_json`, `status`, `conflict_json` | Operación UUID única. |
| `audit_logs` | `workspace_id`, `actor_id`, `action`, `subject_type`, `subject_id`, `origin`, `before_json`, `after_json`, `occurred_at` | Inmutable y con retención definida. |

Ingresos, gastos, kilómetros y calendarios serán fuentes de verdad; los paneles, previsiones y resultados de rentabilidad serán proyecciones versionadas. Las relaciones entre documentos, gastos y mantenimiento impedirán duplicar el mismo coste en el beneficio.

## 5. Diferenciador frente a competencia

- **Rentabilidad económica además de caja:** separa pagos, principal financiero, intereses, costes devengados y depreciación para evitar que una cuota o una compra distorsionen el rendimiento mensual.
- **Denominadores transparentes:** beneficio por hora y kilómetro especifica si usa turno, conexión, kilómetros profesionales o con pasajero y muestra cobertura de datos.
- **VTC sin entregar credenciales:** importa CSV de varias plataformas, conserva el formato original y concilia viajes con turnos sin depender de una integración bancaria.
- **Captura híbrida del trabajo real:** GPS opcional y visible, odómetro, distancias manuales e importaciones pueden convivir sin sumar recorridos duplicados.
- **Coste completo por vehículo:** combustible/energía, peajes, lavados, mantenimiento, seguro, financiación, alquiler y depreciación se atribuyen mediante reglas auditables.
- **Gestión preventiva vinculada al uso:** revisión y mantenimiento vencen por fecha o kilómetros proyectados; no son un calendario genérico desligado del odómetro.
- **Dossier para gestoría, no falsa automatización fiscal:** exporta base, IVA, afectación declarada, documentos e incidencias y reserva al profesional la decisión tributaria.
- **Integración prudente con finanzas personales:** solo los gastos consentidos viajan a Control de Gastos mediante eventos versionados; cada aplicación conserva su autoridad de categorización.

## 6. Fases del roadmap

**Fase 0 — Invariantes económicas y privacidad**

- Definir vocabulario de ingreso, comisión, caja, devengo, coste, principal, interés, depreciación y kilometraje.
- Cerrar fórmulas de beneficio/hora y beneficio/km, reglas de atribución, cobertura y trazas de cálculo.
- Diseñar tenant/permisos, protocolo offline, outbox y límites de acceso/retención GPS.
- Validar el dossier trimestral con gestorías españolas y mantener reglas fiscales/ITV como contenido versionado, no lógica fija sin revisión.
- Preparar observabilidad separada para PHP-FPM, colas, Redis, base de datos, OCR, GPS, errores, latencia y consumo por app.

**Fase 1 — Bitácora manual offline-first**

- Vehículos, turnos, odómetro, kilómetros clasificados, ingresos y gastos manuales.
- PWA con cola idempotente, sincronización incremental y conflictos accionables.
- Panel básico por turno/vehículo con caja, coste variable, beneficio/hora y beneficio/km explicables.
- Criterio de salida: turno completo sin conexión, reintentos sin duplicación y totales reproducibles desde registros fuente.

**Fase 2 — Importación VTC y conciliación**

- CSV genérico y adaptadores versionados para formatos de Uber, Cabify y Bolt disponibles en la validación.
- Conciliación de viajes, ingresos, comisiones e incentivos con turnos; detección de duplicados y cambios de esquema.
- Cobertura y advertencias de datos faltantes.
- Criterio de salida: corpus anonimizado de extractos representativos, errores por fila, reversión segura y cero columnas económicas ignoradas silenciosamente.

**Fase 3 — OCR, mantenimiento y obligaciones**

- Tickets/facturas, extracción por campo, consumo de combustible/energía y conciliación.
- Mantenimiento por fecha/kilómetros, seguro, ITV, impuesto y alertas.
- Calendario preventivo con procedencia y versión de regla.
- Criterio de salida: ninguna extracción no confirmada afecta rentabilidad; alertas temporales y kilométricas cubiertas por pruebas.

**Fase 4 — Coste económico completo**

- Gastos comunes y reglas de reparto, financiación, leasing/renting, activos y depreciación interna.
- Vistas caja/económica, coste/km, coste/hora y rentabilidad por plataforma.
- Simulación de cambios de coste, kilómetros o ingresos sin alterar datos reales.
- Criterio de salida: principal/intereses y alquiler/depreciación no se duplican; cada total se traza hasta entradas y versión de fórmula.

**Fase 5 — GPS opcional y equipo**

- Sesiones GPS visibles, clasificación de segmentos, agregación local y retención configurable.
- Roles y asignación de vehículos con separación de ubicación, ingresos y costes.
- Comparador de fuentes GPS/odómetro/plataforma y resolución de incoherencias.
- Criterio de salida: retirar permiso o detener turno cesa captura; purga de trazas verificada; operación manual conserva paridad funcional.

**Fase 6 — Gestoría e integración financiera**

- Exportación trimestral PDF/CSV/XLSX, índice documental, incidencias y cierre de periodo.
- Consentimiento, eventos de gastos de vehículo, entrega idempotente y revocación hacia Control de Gastos Personal.
- Pruebas contractuales extremo a extremo, reintentos y eventos fuera de orden.
- Criterio de salida: gestoría puede reconciliar cifras con justificantes; ninguna transferencia duplica gastos ni expone GPS.

**Fase 7 — Endurecimiento y producción**

- Seguridad de documentos/ubicación, antivirus, rate limiting, sesiones, auditoría, exportación y borrado.
- Copias cifradas y restauración probada, rendimiento plurianual, accesibilidad y compatibilidad PWA/cámara/GPS.
- QA exhaustivo funcional, offline, concurrencia, cálculos, permisos, privacidad e importaciones.
- Revisión final de fuentes vigentes y textos para evitar presentar previsiones administrativas o clasificación fiscal como asesoramiento garantizado.
