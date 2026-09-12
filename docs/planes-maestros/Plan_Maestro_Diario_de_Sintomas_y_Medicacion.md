# Plan Maestro — Diario de Síntomas y Medicación

## 1. Propósito y usuario objetivo

Diario personal para que una persona con enfermedad crónica conserve un registro clínicamente legible aun cuando su energía sea limitada. Su objetivo es describir síntomas, medicación y cambios entre consultas; no interpreta síntomas, recomienda tratamientos, calcula dosis ni sustituye una valoración profesional.

El usuario principal es una persona adulta que necesita seguir pocas variables relevantes de forma sostenida. Puede configurar esas variables con un profesional sanitario y compartir después un informe, pero el profesional no obtiene acceso continuo ni capacidad de prescripción salvo que se diseñe y regule un producto distinto.

Principios de producto:

- La configuración activa prioriza 3–5 variables esenciales; el catálogo admite síntomas ilimitados sin paywall, pero evita convertir el check-in diario en interrogatorio.
- `Modo normal` y `modo brote` son diseños de interacción elegidos por el usuario, no una clasificación clínica de su estado.
- Cada variable conserva escala, anclajes y versión; cambiar de escala no mezcla series incompatibles.
- La falta de registro significa `sin dato`, nunca ausencia de síntoma, incumplimiento terapéutico ni mejoría.
- Separar pauta declarada, recordatorio, toma efectiva, omisión, decisión PRN y movimiento de stock.
- Registrar una medicación no valida su idoneidad; la fuente de la pauta se etiqueta como `introducida por usuario`, `copiada de documento` o `revisada con profesional` sin certificarla.
- Los resultados analíticos usarán “asociación observada”, incluirán cobertura y tamaño de muestra y evitarán verbos causales.
- El informe de una página prioriza cambios, eventos relevantes y preguntas elegidas por el paciente; el histórico completo queda como anexo/exportación.
- Cifrado, exportación y borrado son funciones básicas. Ningún nivel de pago limita cantidad de síntomas o acceso a los propios datos.

## 2. Dominios de backend

- **Identidad y espacios de salud:** cuenta, perfil de seguimiento, dispositivos y preferencias. Separar el ámbito de salud del perfil general del core para reducir accesos accidentales.
- **Consentimientos y bases de tratamiento:** finalidad, alcance, versión del aviso, exportación, procesamiento de voz/imagen futuro y analítica. La retirada detiene usos opcionales sin corromper el diario básico.
- **Variables de seguimiento:** definiciones privadas para síntomas, capacidad funcional, sueño u otros factores; tipo de dato, escala, unidad, anclajes, obligatoriedad y versión.
- **Plantillas de check-in:** conjunto activo de 3–5 variables, orden y campos opcionales. Versionadas para que un cambio acordado con el médico no reinterprete registros previos.
- **Modos de energía:** configuración `normal` y `brote` por usuario. El modo brote puede reducir a una variable global, síntomas prioritarios y medicación reciente, pero nunca oculta emergencia/ayuda ni bloquea el registro libre.
- **Check-ins:** instante, plantilla, modo elegido, cobertura y respuestas. Un check-in parcial es válido y no debe forzarse a completo.
- **Episodios y síntomas:** observación puntual o intervalo, intensidad, cualidad, nota y localizaciones corporales. Un mismo episodio admite varias zonas y lateralidad.
- **Esquema corporal:** versión anatómica, regiones estables, coordenadas de selección y etiquetas del usuario. La interfaz gráfica se normaliza a IDs anatómicos, no se guarda solo como píxeles.
- **Medicamentos:** nombre mostrado, principio activo opcional, forma, concentración textual, vía y estado. Evitar normalización farmacológica automática sin revisión humana.
- **Pautas declaradas:** medicación, vigencia, instrucciones textuales, ventanas programadas y fuente. El backend agenda recordatorios; no infiere una pauta de tomas pasadas.
- **Medicaciones PRN:** motivo declarado, límites copiados por el usuario/profesional y toma efectiva. La aplicación no sugiere tomarla por detectar un síntoma.
- **Administraciones y omisiones:** eventos inmutables con hora efectiva, dosis/unidad confirmadas, estado y actor. `Omitida`, `pospuesta`, `desconocida` y `no aplicable` son estados diferentes.
- **Efectos secundarios:** evento observado, inicio/fin, intensidad, medicamento sospechado por el usuario y texto libre. La relación es atribuida, no causal.
- **Stock:** lotes opcionales y movimientos `entrada`, `consumo`, `ajuste`, `descarte`; el saldo deriva del historial. Las alertas de reposición no sustituyen receta ni disponibilidad de farmacia.
- **Adherencia descriptiva:** proporción de eventos registrados frente a oportunidades de pauta dentro de periodos con cobertura suficiente. Nunca cuenta como omitida una toma sin registro ni crea puntuación moral.
- **Preguntas para consulta:** lista priorizada por paciente, contexto y estado `pendiente/respondida/archivada`; no se generan respuestas médicas.
- **Analítica de asociaciones:** ventanas temporales, variables, control de rezagos, mínimos de observaciones y corrección por comparaciones múltiples cuando proceda. Los resultados conservan método, versión, datos incluidos y limitaciones.
- **Informes clínicos:** instantánea de periodo, selección, cambios, eventos, medicación, preguntas y cobertura; PDF de una página más anexos estructurados.
- **Interoperabilidad:** exportación CSV/JSON y, en fase posterior, mapeos a estándares sanitarios solo para los recursos que puedan representarse fielmente. No etiquetar como interoperable un PDF sin estructura.
- **Cifrado:** cifrado local de base/caché cuando la plataforma lo permita, cifrado de campo para salud sensible y claves envueltas por usuario. Definir recuperación de cuenta sin puerta trasera silenciosa.
- **Sincronización offline:** UUID cliente, cola durable, idempotencia y revisiones. Los eventos concurrentes se preservan; una edición clínica aparente nunca gana por “última escritura”.
- **Exportación y borrado:** paquetes cifrados opcionales, caducidad de enlaces, auditoría y eliminación verificable de eventos, medios, derivados, cachés controladas y copias según política declarada.
- **Auditoría y seguridad:** accesos, exportaciones, permisos, cambios de pauta y borrado. Logs técnicos sin nombres de medicamentos, síntomas, notas, regiones corporales ni valores.

Reglas críticas:

- Una toma solo existe tras confirmación explícita; abrir una notificación o pulsar “recordar después” no cuenta como administración.
- El stock no demuestra adherencia y la adherencia no corrige stock: ambos se conectan únicamente mediante un movimiento confirmado.
- Una posible duplicidad de toma se avisa y conserva; nunca se elimina automáticamente ni se convierte en consejo de actuación.
- Los cambios de pauta parten la línea temporal. No recalculan oportunidades anteriores.
- Un resultado asociativo debe quedar invalidado si se borran o corrigen datos fuente y regenerarse con nueva versión.
- La app muestra una ruta neutral para buscar atención urgente, configurable para España, pero no decide si un síntoma constituye una urgencia.

## 3. Módulos de frontend

- **Inicio adaptable:** botones `Tengo poca energía` y `Registro normal`, últimos registros pendientes y acceso inmediato a medicación; sin rachas ni presión por completar.
- **Check-in normal:** 3–5 variables activas, una por pantalla o lista compacta según accesibilidad; anclajes visibles para que una escala mantenga significado.
- **Modo brote:** flujo de máximo tres acciones configurables, tipografía grande, guardado parcial automático y opción “solo dejar una nota”. No pide justificar por qué se activa.
- **Configurador con profesional:** selecciona variables, escala, anclajes, frecuencia orientativa y fecha de revisión; genera un resumen para validar en consulta sin otorgar acceso al médico.
- **Registro libre:** permite añadir cualquier síntoma fuera del conjunto esencial sin límite ni cambio de plan comercial.
- **Esquema corporal:** vistas frontal/dorsal, regiones seleccionables, lateralidad, varias zonas y alternativa accesible en lista jerárquica.
- **Medicación de hoy:** separa programada, PRN y ya registrada; acciones `tomada`, `posponer`, `omitir`, `no sé` y `corregir hora` con confirmación reforzada.
- **Registro PRN:** medicamento, hora, dosis confirmada, motivo declarado y efecto observado posterior opcional. No sugiere PRN a partir del check-in.
- **Efectos secundarios:** síntoma, periodo, intensidad y relación sospechada seleccionada por usuario; lenguaje “posiblemente relacionado según tu registro”.
- **Stock:** saldo estimado, movimientos y umbral de aviso; muestra discrepancias y permite recuento físico sin reescribir el historial.
- **Cronología:** síntomas, tomas, pautas, efectos, notas y correcciones con filtros. Cada evento muestra fuente, hora efectiva y estado de sincronización.
- **Tendencias:** evolución de variables estables, cobertura por día y cambios de plantilla/pauta. Los huecos rompen la línea en lugar de interpolarse visualmente.
- **Asociaciones:** comparación elegida por el usuario, diagrama simple, tamaño de muestra, cobertura, rezago y explicación de por qué no implica causalidad.
- **Preparar consulta:** cambios desde la última visita, eventos marcados, preguntas, pauta actual y selección de información sensible a excluir.
- **Informe de una página:** previsualización estricta; prioriza contexto clínico y preguntas, con anexos opcionales para series o cronología.
- **Exportación interoperable:** PDF, CSV y JSON con diccionario de variables, unidades, zona horaria, escalas y revisiones.
- **Privacidad:** consentimientos, claves/dispositivos, exportaciones, accesos, retención y borrado. Explica qué copias offline requieren que el dispositivo vuelva a conectarse para purgarse.
- **Estado offline:** último sincronizado, operaciones pendientes y conflictos. Todos los registros esenciales funcionan sin red.

## 4. Modelo de datos inicial

| Entidad | Campos y decisiones específicas |
|---|---|
| `users` | Identidad del core, zona horaria, idioma y preferencias de accesibilidad. |
| `health_spaces` | Usuario propietario, alias, estado, política de cifrado/retención y versión. |
| `consent_records` | Espacio, finalidad, alcance, versión de texto, otorgado/revocado y prueba. |
| `devices` | Usuario, clave pública, confianza, último acceso, capacidad de cifrado local y estado de purga. |
| `tracking_variables` | Espacio, código privado, nombre, tipo, unidad, escala, anclajes, estado y autor. |
| `tracking_variable_versions` | Variable, definición congelada, vigencia y motivo; evita mezclar escalas modificadas. |
| `checkin_templates` | Espacio, nombre, modo, vigencia, estado y máximo recomendado de variables esenciales. |
| `checkin_template_items` | Plantilla, versión de variable, orden, esencial/opcional y configuración de captura. |
| `checkins` | Espacio, plantilla, modo, hora efectiva, cobertura, estado, dispositivo y `operation_id`. |
| `observations` | Check-in/episodio, versión de variable, valor cifrado, unidad, hora/intervalo, fuente y estado. |
| `symptom_episodes` | Espacio, síntoma libre/codificado, inicio/fin, intensidad, cualidad, nota cifrada y estado. |
| `body_schema_versions` | Versión visual/anatómica, regiones y vigencia. |
| `symptom_locations` | Episodio, esquema, región, lateralidad, coordenada opcional y orden. |
| `medications` | Espacio, nombre cifrado, principio activo opcional, forma, concentración, vía, origen y estado. |
| `regimen_versions` | Medicamento, vigencia, instrucciones cifradas, fuente, PRN/programada y estado. |
| `schedule_rules` | Pauta, recurrencia/ventana, zona horaria, fecha inicial/final y excepciones. |
| `dose_opportunities` | Pauta, ventana prevista, estado derivado y versión; nunca equivale a una toma. |
| `medication_events` | Medicamento/pauta, tipo (`taken`, `omitted`, `postponed`, `unknown`), hora, dosis/unidad, actor y operación. |
| `side_effect_events` | Espacio, síntoma, inicio/fin, intensidad, medicamento sospechado opcional y atribución textual. |
| `stock_batches` | Medicamento, cantidad/unidad, alta, caducidad opcional, ubicación y estado. |
| `stock_movements` | Lote/medicamento, tipo, cantidad, hora, toma relacionada opcional, actor y operación. |
| `consultation_questions` | Espacio, texto cifrado, prioridad, contexto, estado y fecha objetivo opcional. |
| `clinical_events` | Espacio, etiqueta, fecha, importancia elegida por usuario y nota; no implica clasificación médica. |
| `analysis_runs` | Espacio, variables, periodo, método, rezago, cobertura, muestra, versión, resultado y limitaciones. |
| `report_snapshots` | Espacio, periodo, configuración, fuentes incluidas, versión, hash y creado por. |
| `export_jobs` | Informe, formato, archivo cifrado, caducidad, descargas y estado. |
| `sync_operations` | UUID cliente, dispositivo, entidad, acción, versión base, payload cifrado, estado y conflicto. |
| `possible_duplicates` | Eventos candidatos, regla, estado, resolución y auditoría; no borra automáticamente. |
| `access_audit_logs` | Actor, acción, objeto opaco, resultado, dispositivo y fecha; sin contenido sanitario. |
| `deletion_jobs` | Alcance, comprobación, fases, derivados/cachés afectados, fallos y resultado verificable. |

Convenciones iniciales:

- ULID/UUID en cliente para registros offline; eventos clínicos append-only con correcciones enlazadas.
- Instantes en UTC más zona de origen; las tomas programadas conservan la zona en que se definió la pauta.
- Valores, textos y nombres sanitarios cifrados; índices funcionales limitados a IDs opacos, tiempo y tipo.
- Los informes son instantáneas reproducibles y caducables, no consultas vivas que cambien después de una cita.
- Las series solo unen valores de la misma versión de variable o aplican una conversión explícita y visible.
- Índices por espacio/hora/tipo, pauta/vigencia, oportunidad/ventana, medicamento/evento y sincronización/dispositivo/estado.

## 5. Diferenciador frente a competencia

- **Carga cognitiva configurable:** el producto conserva profundidad sin exigirla diariamente; 3–5 variables gobiernan el check-in, no el límite de la cuenta.
- **Modo brote sin interpretación clínica:** reduce interacción y acepta registros parciales, pero no etiqueta automáticamente la intensidad de la enfermedad.
- **Semántica farmacológica honesta:** pauta, oportunidad, recordatorio, toma, omisión y stock son hechos distintos y auditables.
- **Adherencia sin castigo ni falsos ceros:** solo se calcula donde existen pauta vigente y cobertura suficiente; lo desconocido permanece desconocido.
- **Esquema corporal interoperable:** guarda regiones anatómicas versionadas y lateralidad, no una marca irreutilizable sobre una imagen.
- **Informe orientado a consulta:** una página concentra cambios, eventos y preguntas elegidas por el paciente; no pretende sustituir la historia clínica.
- **Asociaciones reproducibles y prudentes:** muestran método, muestra, cobertura y rezago y usan siempre lenguaje no causal.
- **Privacidad como arquitectura:** cifrado local, campos protegidos, dispositivos y exportaciones se diseñan antes del análisis, no como añadido posterior.
- **Sin monetizar la complejidad de la enfermedad:** ningún paywall limita síntomas, registros, exportación básica o borrado.

La métrica principal será el porcentaje de semanas en que el usuario obtiene un resumen interpretable sin superar la carga de registro que eligió. Métricas de calidad: tiempo del check-in por modo, parciales conservados, correcciones de medicación, duplicados pendientes, cobertura declarada, informes de una página sin desbordamiento, revocaciones y borrados verificados. No se optimizará por rachas, número de síntomas ni “adherencia perfecta”.

## 6. Fases del roadmap

**Fase 0 — Seguridad, límites y modelo longitudinal**

- Formalizar variable versionada, check-in parcial, episodio, pauta, oportunidad, toma, PRN, stock y asociación.
- Realizar evaluación de impacto RGPD para datos de categoría especial, cifrado, dispositivos, exportación y analítica.
- Definir textos de no diagnóstico, ayuda urgente neutral y revisión legal puntual antes de publicación.
- Prototipar modos normal/brote con personas de energía fluctuante y tecnologías de apoyo.

**Fase 1 — MVP offline-first de síntomas**

- Espacio privado, 3–5 variables, plantillas versionadas, check-in normal/brote y registro libre ilimitado.
- Episodios, esquema corporal con alternativa textual, cronología y correcciones trazables.
- IndexedDB cifrada cuando la plataforma lo permita, cola idempotente y recuperación tras cierre.
- Salida: registrar en modo brote sin red y sincronizar sin pérdidas ni falsos duplicados.

**Fase 2 — Medicación y stock**

- Medicamentos, pautas versionadas, programada/PRN, oportunidades y eventos confirmados.
- Efectos secundarios atribuidos por usuario, posibles duplicidades y movimientos de stock.
- Recordatorios neutros y pruebas de cambios horarios, cambios de pauta y varios dispositivos.
- Revisión clínica de seguridad centrada en evitar prescripción implícita y confianza falsa.

**Fase 3 — Tendencias e informe de consulta**

- Cobertura, series por versión, cambios desde última consulta, eventos marcados y preguntas.
- Generador de una página con anexos, PDF accesible y previsualización de exclusiones.
- CSV/JSON con diccionario, unidades, escalas, zonas horarias y revisiones.
- Validación con pacientes y profesionales limitada a fidelidad, claridad y utilidad del resumen.

**Fase 4 — Asociaciones observadas**

- Motor estadístico versionado con mínimos de datos, rezagos, cobertura y limitaciones.
- Interfaz que impide titulares causales y enlaza cada hallazgo a las observaciones incluidas.
- Pruebas contra correlaciones espurias, múltiples comparaciones y cambios de escalas.
- Salida: ningún resultado se publica si no puede reproducirse desde una instantánea.

**Fase 5 — Cifrado e interoperabilidad reforzados**

- Claves por usuario, dispositivos confiables, recuperación explícita, rotación y purga sincronizada.
- Mapeos a estándares sanitarios solo para conceptos fielmente representables; conservar extensiones para variables personales.
- Exportaciones cifradas, caducidad, auditoría de descarga y pruebas de importación en herramientas externas seleccionadas.

**Fase 6 — Cumplimiento y producción**

- Revisión jurídica puntual de base legal, consentimiento, derechos, transferencias, encargados, conservación y posible calificación regulatoria de funcionalidades futuras.
- Pruebas de autorización horizontal, pérdida de dispositivo, cachés PWA, URLs de exportación, claves y filtraciones por logs.
- Accesibilidad WCAG 2.2 AA y pruebas iOS/Android con fatiga, temblor, baja visión, modo avión y almacenamiento limitado.
- Observabilidad separada para Laravel, PHP-FPM, colas, Redis, base de datos, cifrado, exportaciones y sincronización, sin contenido sanitario en telemetría.
- Despliegue gradual condicionado a integridad offline, semántica de medicación, informes reproducibles, borrado completo y ausencia de lenguaje diagnóstico.
