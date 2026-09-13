# Prompts plan maestro — 24 apps (Plantilla A rellena)

Copia cada bloque y pégalo en ChatGPT (con búsqueda web activada).
Cada prompt ya incluye el campo [MÓDULOS_CONOCIDOS] relleno con los
datos del estudio de mercado.

---

## App 1 — Control de Gastos Personal

```
Actúa como consultor de producto y arquitecto de software. Voy a
construir una app llamada "Control de Gastos Personal" (Finanzas),
reutilizando un core técnico compartido en Laravel + Vue 3 + PWA
offline-first, dirigida al mercado español.

Descripción breve: registro y análisis de gastos e ingresos
personales, con categorización y reportes, adaptado a la realidad
bancaria española.

Módulos ya identificados (del estudio de mercado):
- Registro manual de gastos e ingresos (offline-first)
- Importación CSV/Excel de cualquier banco español
- Categorización con reglas visibles y editables por el usuario
- Presupuestos por sobres (envelope budgeting)
- Conciliación de duplicados
- Hogar compartido (varios miembros de la familia)
- Motor de recurrencias integrado: gasto fijo futuro, próximas
  renovaciones, impacto anual y escenarios "si cancelo esto"
  (motor compartido con Gestor de Suscripciones)

Apps con las que comparte motor técnico: motor de recurrencias,
compartido con Gestor de Suscripciones.

Genera un documento "Plan Maestro" en Markdown con EXACTAMENTE
estas secciones, sin añadir ni quitar ninguna:
1. Propósito y usuario objetivo
2. Dominios de backend
3. Módulos de frontend
4. Modelo de datos inicial
5. Diferenciador frente a competencia
6. Fases del roadmap

Sé concreto y específico a esta app, no genérico. Evita relleno
y explicaciones obvias — cada frase debe aportar algo que Claude
(el asistente de IA que construirá la app) no podría deducir solo.
```

---

## App 2 — Gestor de Suscripciones

```
Actúa como consultor de producto y arquitecto de software. Voy a
construir una app llamada "Gestor de Suscripciones" (Micro-SaaS),
reutilizando un core técnico compartido en Laravel + Vue 3 + PWA
offline-first, dirigida al mercado español.

Descripción breve: app pequeña y de entrada fácil (wedge product)
que gestiona todas las suscripciones recurrentes del usuario, y
actúa como embudo hacia la app de Control de Gastos Personal.

Módulos ya identificados (del estudio de mercado):
- Alta manual, por OCR de factura/correo y por CSV bancario (sin
  exigir credenciales bancarias)
- Línea temporal de cada suscripción: prueba gratuita, permanencia,
  preaviso, renovación y cambio de precio
- Cálculo mensual/anual normalizado de todas las suscripciones
- Plantillas de servicios españoles (telecos, gimnasios, seguros,
  streaming)
- Módulo "hogar" para detectar duplicidades familiares
- Botón de traspaso consentido a la app de Control de Gastos

Apps con las que comparte motor técnico: motor de recurrencias,
compartido con Control de Gastos Personal.

Genera un documento "Plan Maestro" en Markdown con EXACTAMENTE
estas secciones, sin añadir ni quitar ninguna:
1. Propósito y usuario objetivo
2. Dominios de backend
3. Módulos de frontend
4. Modelo de datos inicial
5. Diferenciador frente a competencia
6. Fases del roadmap

Sé concreto y específico a esta app, no genérico. Evita relleno
y explicaciones obvias — cada frase debe aportar algo que Claude
(el asistente de IA que construirá la app) no podría deducir solo.
```

---

## App 3 — Diario Fitness y Calorías

```
Actúa como consultor de producto y arquitecto de software. Voy a
construir una app llamada "Diario Fitness y Calorías" (Salud),
reutilizando un core técnico compartido en Laravel + Vue 3 + PWA
offline-first, dirigida al mercado español.

Descripción breve: diario de alimentación y ejercicio de baja
fricción, con catálogo validado de productos y medidas españolas,
pensado para uso diario sin convertirse en una herramienta de
diagnóstico médico.

Módulos ya identificados (del estudio de mercado):
- Catálogo de alimentos validado con productos y medidas caseras
  españolas
- Captura por foto, voz o texto con confirmación del usuario
- Registro de recetas familiares y batch cooking
- Ajuste dinámico del resto del día según lo ya registrado
- Explicación clara de cada cálculo calórico/nutricional
- Separación entre "registro" y "orientación" (nunca diagnóstico)
- Exportación limpia para nutricionista o entrenador

Apps con las que comparte motor técnico: ninguno.

Nota importante: esta app trata datos de salud. Posicionarla como
diario de seguimiento personal/wellness, nunca como herramienta
clínica o de diagnóstico.

Genera un documento "Plan Maestro" en Markdown con EXACTAMENTE
estas secciones, sin añadir ni quitar ninguna:
1. Propósito y usuario objetivo
2. Dominios de backend
3. Módulos de frontend
4. Modelo de datos inicial
5. Diferenciador frente a competencia
6. Fases del roadmap

Sé concreto y específico a esta app, no genérico. Evita relleno
y explicaciones obvias — cada frase debe aportar algo que Claude
(el asistente de IA que construirá la app) no podría deducir solo.
```

---

## App 4 — Control de Inventario B2B

```
Actúa como consultor de producto y arquitecto de software. Voy a
construir una app llamada "Control de Inventario B2B" (Comercio),
reutilizando un core técnico compartido en Laravel + Vue 3 + PWA
offline-first, dirigida a autónomos y pequeños comercios españoles.

Descripción breve: gestión de stock operativo para pequeños negocios
y autónomos, sin convertirse en un ERP completo.

Módulos ya identificados (del estudio de mercado):
- Alta de productos desde Excel, cámara o etiquetas QR imprimibles
- Funcionamiento offline con cola de sincronización
- Stock por ubicación, lotes/caducidad y cantidades mínimas
- Valoración de inventario
- Roles simples para empleados ocasionales
- Historial auditable de movimientos
- Conexión opcional con Holded/Facturae
- Precio por negocio, no por usuario

Apps con las que comparte motor técnico: ninguno.

Genera un documento "Plan Maestro" en Markdown con EXACTAMENTE
estas secciones, sin añadir ni quitar ninguna:
1. Propósito y usuario objetivo
2. Dominios de backend
3. Módulos de frontend
4. Modelo de datos inicial
5. Diferenciador frente a competencia
6. Fases del roadmap

Sé concreto y específico a esta app, no genérico. Evita relleno
y explicaciones obvias — cada frase debe aportar algo que Claude
(el asistente de IA que construirá la app) no podría deducir solo.
```

---

## App 5 — Bitácora de Vehículos / Uber

```
Actúa como consultor de producto y arquitecto de software. Voy a
construir una app llamada "Bitácora de Vehículos" (Automoción),
reutilizando un core técnico compartido en Laravel + Vue 3 + PWA
offline-first, dirigida al mercado español incluyendo conductores
de plataformas como Uber, Cabify y Bolt.

Descripción breve: seguimiento de rentabilidad real por vehículo,
incluyendo ingresos por turno y todos los costes asociados.

Módulos ya identificados (del estudio de mercado):
- Ingresos por turno e importación CSV de plataformas VTC
- Kilómetros con y sin pasajero
- Combustible/energía, peajes, lavados, mantenimiento, seguro,
  financiación y depreciación
- Beneficio neto por hora y por kilómetro
- Previsión de ITV, seguro y próxima revisión
- OCR de tickets de combustible y mantenimiento
- Exportación trimestral para gestoría española
- GPS opcional y controlable, con alternativa manual rápida

Apps con las que comparte motor técnico: ninguno. Integración de
datos con Control de Gastos Personal (vía evento asíncrono de
gastos de vehículo).

Genera un documento "Plan Maestro" en Markdown con EXACTAMENTE
estas secciones, sin añadir ni quitar ninguna:
1. Propósito y usuario objetivo
2. Dominios de backend
3. Módulos de frontend
4. Modelo de datos inicial
5. Diferenciador frente a competencia
6. Fases del roadmap

Sé concreto y específico a esta app, no genérico. Evita relleno
y explicaciones obvias — cada frase debe aportar algo que Claude
(el asistente de IA que construirá la app) no podría deducir solo.
```

---

## App 6 — Cuaderno de Salud para Mascotas

```
Actúa como consultor de producto y arquitecto de software. Voy a
construir una app llamada "Cuaderno de Salud para Mascotas"
(Veterinaria), reutilizando un core técnico compartido en Laravel
+ Vue 3 + PWA offline-first, dirigida al mercado español.

Descripción breve: pasaporte sanitario digital portable para
mascotas, compartible con veterinarios, residencias y cuidadores.

Módulos ya identificados (del estudio de mercado):
- Cronología única con vacunas, analíticas, diagnósticos, alergias,
  peso, medicación y episodios clínicos
- OCR de cartilla veterinaria y facturas
- Planes de cuidado por especie y edad
- Acceso temporal por QR para veterinario, residencia o cuidador
- Exportación PDF en español
- Modo emergencia sin conexión (offline)
- Registro de consentimiento para compartir datos

Apps con las que comparte motor técnico: ninguno. Integración de
gastos veterinarios con Control de Gastos Personal (vía evento
asíncrono).

Genera un documento "Plan Maestro" en Markdown con EXACTAMENTE
estas secciones, sin añadir ni quitar ninguna:
1. Propósito y usuario objetivo
2. Dominios de backend
3. Módulos de frontend
4. Modelo de datos inicial
5. Diferenciador frente a competencia
6. Fases del roadmap

Sé concreto y específico a esta app, no genérico. Evita relleno
y explicaciones obvias — cada frase debe aportar algo que Claude
(el asistente de IA que construirá la app) no podría deducir solo.
```

---

## App 7 — Flashcards Educativas Leitner

```
Actúa como consultor de producto y arquitecto de software. Voy a
construir una app llamada "Flashcards Educativas Leitner"
(Educación), reutilizando un core técnico compartido en Laravel +
Vue 3 + PWA offline-first, dirigida al mercado español.

Descripción breve: sistema de repaso espaciado basado en el método
Leitner, visual y comprensible, sin algoritmos opacos.

Módulos ya identificados (del estudio de mercado):
- Cajas Leitner visibles con reglas editables por el usuario
- Explicación de por qué toca cada tarjeta hoy
- Modo examen adaptado al sistema educativo español
- Sesiones de 5, 10 o 20 minutos configurables
- Objetivos de estudio por fecha (ej. examen el 15 de junio)
- Soporte de audio e imágenes en tarjetas
- Importación CSV y mazos Anki
- Funcionamiento completamente offline
- Panel docente opcional con mazos verificados (sin feed social)

Apps con las que comparte motor técnico: ninguno.

Genera un documento "Plan Maestro" en Markdown con EXACTAMENTE
estas secciones, sin añadir ni quitar ninguna:
1. Propósito y usuario objetivo
2. Dominios de backend
3. Módulos de frontend
4. Modelo de datos inicial
5. Diferenciador frente a competencia
6. Fases del roadmap

Sé concreto y específico a esta app, no genérico. Evita relleno
y explicaciones obvias — cada frase debe aportar algo que Claude
(el asistente de IA que construirá la app) no podría deducir solo.
```

---

## App 8 — Módulo de Fisioterapia Híbrida

```
Actúa como consultor de producto y arquitecto de software. Voy a
construir una app llamada "Módulo de Fisioterapia Híbrida" (Salud),
reutilizando un core técnico compartido en Laravel + Vue 3 + PWA
offline-first, dirigida al mercado español.

Descripción breve: continuidad del tratamiento presencial al
domicilio del paciente, con feedback asíncrono al fisioterapeuta.

Módulos ya identificados (del estudio de mercado):
- Plan de ejercicios versionado prescrito por fisioterapeuta
- Vídeos cortos de cada ejercicio con repeticiones y tiempo
- Registro de dolor antes/después, dificultad y adherencia
- Alertas por empeoramiento o dolor inusual
- Modo sesión persistente y offline (sin perder el punto al
  cambiar de app)
- Accesibilidad para personas mayores
- Feedback asíncrono del fisioterapeuta
- Resumen automático previo a cada consulta presencial
- Consentimiento informado y exportación clínica

Apps con las que comparte motor técnico: ninguno.

Nota importante: esta app trata datos de salud. Posicionarla como
herramienta de seguimiento/continuidad de tratamiento, nunca como
app de diagnóstico. No sustituye al criterio clínico.

Genera un documento "Plan Maestro" en Markdown con EXACTAMENTE
estas secciones, sin añadir ni quitar ninguna:
1. Propósito y usuario objetivo
2. Dominios de backend
3. Módulos de frontend
4. Modelo de datos inicial
5. Diferenciador frente a competencia
6. Fases del roadmap

Sé concreto y específico a esta app, no genérico. Evita relleno
y explicaciones obvias — cada frase debe aportar algo que Claude
(el asistente de IA que construirá la app) no podría deducir solo.
```

---

## App 9 — Nevera Vegana

```
Actúa como consultor de producto y arquitecto de software. Voy a
construir una app llamada "Nevera Vegana" (Alimentación Sostenible),
reutilizando un core técnico compartido en Laravel + Vue 3 + PWA
offline-first, dirigida al mercado español.

Descripción breve: plataforma de transición al veganismo en cuatro
módulos integrados, que elimina la necesidad de tener 4 apps
distintas para este estilo de vida.

Módulos ya identificados (del estudio de mercado):
- Módulo 1 — Transición gradual: objetivos semanales y guía de
  nutrición básica prudente
- Módulo 2 — Nevera/despensa: gestión de ingredientes, caducidades
  y recetas por ingredientes disponibles
- Módulo 3 — Escáner de productos: muestra evidencia, ingrediente
  dudoso y grado de confianza; catálogo con productos españoles;
  correcciones comunitarias moderadas
- Módulo 4 — Directorio cruelty-free: locales con fecha de última
  verificación
- Conexión del motor de despensa/recetas con el Planificador de
  Comidas (app 21)
- Perfiles vegano, omnívoro en transición y mixto

Apps con las que comparte motor técnico: motor de despensa/recetas,
compartido con Planificador de Comidas Semanal.

Genera un documento "Plan Maestro" en Markdown con EXACTAMENTE
estas secciones, sin añadir ni quitar ninguna:
1. Propósito y usuario objetivo
2. Dominios de backend
3. Módulos de frontend
4. Modelo de datos inicial
5. Diferenciador frente a competencia
6. Fases del roadmap

Sé concreto y específico a esta app, no genérico. Evita relleno
y explicaciones obvias — cada frase debe aportar algo que Claude
(el asistente de IA que construirá la app) no podría deducir solo.
```

---

## App 10 — Control de Garantías y Manuales del Hogar

```
Actúa como consultor de producto y arquitecto de software. Voy a
construir una app llamada "Control de Garantías y Manuales del
Hogar" (Hogar), reutilizando un core técnico compartido en Laravel
+ Vue 3 + PWA offline-first, dirigida al mercado español.

Descripción breve: bóveda doméstica de documentos de electrodomésticos
y equipos del hogar, con alertas de vencimiento de garantía.

Módulos ya identificados (del estudio de mercado):
- OCR de factura y placa para crear producto con vendedor, número
  de serie, garantía legal/comercial y fecha de vencimiento
- Búsqueda por habitación y por persona responsable
- Enlace a manual oficial con versión e idioma correctos
- Alerta con margen de tiempo para reclamar antes de que expire
- Generador de "paquete de incidencia" (factura + serie + problema
  + garantía)
- Privacidad de datos de facturas y bienes (cifrado local)
- Enlace con la app de Mantenimiento del Hogar para cada aparato

Apps con las que comparte motor técnico: ninguno.

Genera un documento "Plan Maestro" en Markdown con EXACTAMENTE
estas secciones, sin añadir ni quitar ninguna:
1. Propósito y usuario objetivo
2. Dominios de backend
3. Módulos de frontend
4. Modelo de datos inicial
5. Diferenciador frente a competencia
6. Fases del roadmap

Sé concreto y específico a esta app, no genérico. Evita relleno
y explicaciones obvias — cada frase debe aportar algo que Claude
(el asistente de IA que construirá la app) no podría deducir solo.
```

---

## App 11 — Diario de Sueño y Descanso

```
Actúa como consultor de producto y arquitecto de software. Voy a
construir una app llamada "Diario de Sueño y Descanso" (Salud/Hogar),
reutilizando un core técnico compartido en Laravel + Vue 3 + PWA
offline-first, dirigida al mercado español.

Descripción breve: diario manual de sueño con módulo de meditación
adaptativa generada a partir de los propios datos de sueño del
usuario, sin requerir sensores ni wearables.

Módulos ya identificados (del estudio de mercado):
- Registro manual de sueño (hora de dormir, despertar, calidad,
  interrupciones, factores del día)
- Tendencias descriptivas (no juicios ni diagnósticos)
- Módulo de meditación adaptativa: la sesión de mañana/noche se
  genera a partir de los datos de sueño registrados
- Meditaciones cortas (5-15 min) con explicación de por qué se
  propone esa sesión
- Sin wearable obligatorio: funciona 100% con entrada manual
- Exportación para profesional de salud
- Correlación con Diario de Lactancia (si el usuario lo tiene)

Apps con las que comparte motor técnico: ninguno. Integración de
datos con Diario de Lactancia y Crianza (posible correlación
sueño bebé/sueño madre).

Nota: esta app toca datos de bienestar. Posicionarla como diario
personal, nunca como diagnóstico de trastornos del sueño.

Genera un documento "Plan Maestro" en Markdown con EXACTAMENTE
estas secciones, sin añadir ni quitar ninguna:
1. Propósito y usuario objetivo
2. Dominios de backend
3. Módulos de frontend
4. Modelo de datos inicial
5. Diferenciador frente a competencia
6. Fases del roadmap

Sé concreto y específico a esta app, no genérico. Evita relleno
y explicaciones obvias — cada frase debe aportar algo que Claude
(el asistente de IA que construirá la app) no podría deducir solo.
```

---

## App 12 — Bitácora de Mantenimiento del Hogar

```
Actúa como consultor de producto y arquitecto de software. Voy a
construir una app llamada "Bitácora de Mantenimiento del Hogar"
(Hogar), reutilizando un core técnico compartido en Laravel + Vue
3 + PWA offline-first, dirigida al mercado español.

Descripción breve: registro de tareas y revisiones periódicas del
hogar, con recordatorios y historial de intervenciones.

Módulos ya identificados (del estudio de mercado):
- Tareas de mantenimiento por habitación y sistema (caldera,
  fontanería, climatización, exterior)
- Periodicidad configurable y recordatorios anticipados
- Historial fotográfico de cada intervención
- Presupuestos y facturas de profesionales
- Modo hogar compartido (varios residentes)
- Enlace con Control de Garantías (cada aparato del hogar)
- Enlace con Organizador de Mudanzas al cambiar de vivienda

Apps con las que comparte motor técnico: ninguno.

Genera un documento "Plan Maestro" en Markdown con EXACTAMENTE
estas secciones, sin añadir ni quitar ninguna:
1. Propósito y usuario objetivo
2. Dominios de backend
3. Módulos de frontend
4. Modelo de datos inicial
5. Diferenciador frente a competencia
6. Fases del roadmap

Sé concreto y específico a esta app, no genérico. Evita relleno
y explicaciones obvias — cada frase debe aportar algo que Claude
(el asistente de IA que construirá la app) no podría deducir solo.
```

---

## App 13 — Seguimiento de Ayuno Intermitente

```
Actúa como consultor de producto y arquitecto de software. Voy a
construir una app llamada "Seguimiento de Ayuno Intermitente"
(Hábitos), reutilizando un core técnico compartido en Laravel +
Vue 3 + PWA offline-first, dirigida al mercado español.

Descripción breve: control de ventanas de ayuno y progreso personal,
sin contenido médico ni diagnóstico.

Módulos ya identificados (del estudio de mercado):
- Temporizador de ventana de ayuno/alimentación configurable
  (16:8, 18:6, 5:2, personalizado)
- Registro de inicio/fin con nota de cómo fue el ayuno
- Historial y racha de ayunos completados
- Peso y medidas opcionales
- Recordatorios configurables de inicio/fin de ventana
- Sin integración forzada con caloría (app independiente, no
  duplica Diario Fitness)
- Modo silencioso para no mostrar contenido restrictivo

Apps con las que comparte motor técnico: ninguno.

Nota: posicionarla como hábito personal, nunca como protocolo
médico. No prescribir ni recomendar el ayuno.

Genera un documento "Plan Maestro" en Markdown con EXACTAMENTE
estas secciones, sin añadir ni quitar ninguna:
1. Propósito y usuario objetivo
2. Dominios de backend
3. Módulos de frontend
4. Modelo de datos inicial
5. Diferenciador frente a competencia
6. Fases del roadmap

Sé concreto y específico a esta app, no genérico. Evita relleno
y explicaciones obvias — cada frase debe aportar algo que Claude
(el asistente de IA que construirá la app) no podría deducir solo.
```

---

## App 14 — Control de Riego y Cuidado de Plantas

```
Actúa como consultor de producto y arquitecto de software. Voy a
construir una app llamada "Control de Riego y Cuidado de Plantas"
(Hogar), reutilizando un core técnico compartido en Laravel + Vue
3 + PWA offline-first, dirigida al mercado español.

Descripción breve: calendario de cuidados de plantas controlado
por el usuario, donde el algoritmo propone pero nunca ordena.

Módulos ya identificados (del estudio de mercado):
- El algoritmo propone fechas, el usuario las confirma o edita
- Calendario manual editable con clima local, interior/exterior,
  maceta/suelo, sustrato y última humedad
- Consideración de lluvia como riego
- Historial fotográfico de cada planta
- Tareas: riego, abono, poda, trasplante y plagas
- Modo hogar compartido para evitar doble riego
- Explicación de qué factores movieron la fecha propuesta

Apps con las que comparte motor técnico: ninguno.

Genera un documento "Plan Maestro" en Markdown con EXACTAMENTE
estas secciones, sin añadir ni quitar ninguna:
1. Propósito y usuario objetivo
2. Dominios de backend
3. Módulos de frontend
4. Modelo de datos inicial
5. Diferenciador frente a competencia
6. Fases del roadmap

Sé concreto y específico a esta app, no genérico. Evita relleno
y explicaciones obvias — cada frase debe aportar algo que Claude
(el asistente de IA que construirá la app) no podría deducir solo.
```

---

## App 15 — Control de Vencimientos de Documentos

```
Actúa como consultor de producto y arquitecto de software. Voy a
construir una app llamada "Control de Vencimientos de Documentos"
(Hogar), reutilizando un core técnico compartido en Laravel + Vue
3 + PWA offline-first, dirigida al mercado español.

Descripción breve: calendario documental privado con alertas
anticipadas y guía de renovación adaptada a España.

Módulos ya identificados (del estudio de mercado):
- Plantillas para: DNI, pasaporte, TIE/NIE, carnet de conducir,
  ITV, seguro del coche, certificados digitales, licencias
  profesionales y documentos de mascotas
- Avisos configurables según la antelación real necesaria para
  cada tipo de documento
- Lista de pasos y enlace a sede oficial para renovar cada
  documento
- Guardar por defecto solo metadatos (fecha, tipo, persona)
- Escaneo del documento cifrado y opcional
- Ocultación de números sensibles
- Hogar compartido con permisos por documento
- Confirmación de renovación para actualizar el vencimiento
- Integración con Organizador de Mudanzas (documentos que hay
  que actualizar al cambiar de domicilio)

Apps con las que comparte motor técnico: ninguno.

Genera un documento "Plan Maestro" en Markdown con EXACTAMENTE
estas secciones, sin añadir ni quitar ninguna:
1. Propósito y usuario objetivo
2. Dominios de backend
3. Módulos de frontend
4. Modelo de datos inicial
5. Diferenciador frente a competencia
6. Fases del roadmap

Sé concreto y específico a esta app, no genérico. Evita relleno
y explicaciones obvias — cada frase debe aportar algo que Claude
(el asistente de IA que construirá la app) no podría deducir solo.
```

---

## App 16 — Calendario de Reciclaje y Residuos Domésticos

```
Actúa como consultor de producto y arquitecto de software. Voy a
construir una app llamada "Calendario de Reciclaje y Residuos
Domésticos" (Hogar), reutilizando un core técnico compartido en
Laravel + Vue 3 + PWA offline-first, dirigida al mercado español.

Descripción breve: capa unificada de información de reciclaje
por municipio español, con buscador de materiales y mapa de
puntos de recogida especial.

Módulos ya identificados (del estudio de mercado):
- Alta por código postal o dirección (detección del municipio)
- Calendario de fracciones de recogida, festivos y voluminosos
- Buscador "qué fracción le corresponde a este objeto" con
  explicación según las reglas del municipio concreto
- Mapa de puntos limpios, aceite, pilas, textil y medicamentos
- Módulo de incidencias y avisos comunitarios moderados
- Arquitectura de fuentes con fecha de última actualización y
  ayuntamiento responsable visible
- Modo manual cuando el municipio no publique datos abiertos

Apps con las que comparte motor técnico: ninguno.

Genera un documento "Plan Maestro" en Markdown con EXACTAMENTE
estas secciones, sin añadir ni quitar ninguna:
1. Propósito y usuario objetivo
2. Dominios de backend
3. Módulos de frontend
4. Modelo de datos inicial
5. Diferenciador frente a competencia
6. Fases del roadmap

Sé concreto y específico a esta app, no genérico. Evita relleno
y explicaciones obvias — cada frase debe aportar algo que Claude
(el asistente de IA que construirá la app) no podría deducir solo.
```

---

## App 17 — Comparador de Ahorro Energético del Hogar

```
Actúa como consultor de producto y arquitecto de software. Voy a
construir una app llamada "Comparador de Ahorro Energético del
Hogar" (Hogar), reutilizando un core técnico compartido en Laravel
+ Vue 3 + PWA offline-first, dirigida al mercado español.

Descripción breve: comparador independiente de tarifas eléctricas
usando los datos reales de consumo del usuario, con total
transparencia en los cálculos.

Módulos ya identificados (del estudio de mercado):
- Importación de datos desde Datadis o desde factura PDF/CSV
- Reconstrucción del coste real: potencia, energía, impuestos
  y excedentes fotovoltaicos
- Simulador de tarifas: comparar con la misma curva horaria real
- Mostrar fórmula, fecha de vigencia y fuente de cada tarifa
- Alertas de pico de potencia, consumo fantasma y oportunidades
  de cambio de hábito
- Historial de contratos y ahorro realizado vs. prometido
- Separación visible entre ranking neutral y ofertas patrocinadas

Apps con las que comparte motor técnico: ninguno.

Genera un documento "Plan Maestro" en Markdown con EXACTAMENTE
estas secciones, sin añadir ni quitar ninguna:
1. Propósito y usuario objetivo
2. Dominios de backend
3. Módulos de frontend
4. Modelo de datos inicial
5. Diferenciador frente a competencia
6. Fases del roadmap

Sé concreto y específico a esta app, no genérico. Evita relleno
y explicaciones obvias — cada frase debe aportar algo que Claude
(el asistente de IA que construirá la app) no podría deducir solo.
```

---

## App 18 — Diario de Lactancia y Crianza

```
Actúa como consultor de producto y arquitecto de software. Voy a
construir una app llamada "Diario de Lactancia y Crianza" (Familia),
reutilizando un core técnico compartido en Laravel + Vue 3 + PWA
offline-first, dirigida al mercado español.

Descripción breve: registro compartido pensado para los momentos
nocturnos, con interfaz mínima y sin juicios sobre el estilo de
crianza.

Módulos ya identificados (del estudio de mercado):
- Botones grandes y temporizador persistente para uso nocturno
- Captura por voz y offline
- Registro de lactancia por lado, extracción/stock de leche y
  biberón
- Sueño, pañal, medicación e hitos del bebé
- Sistema de turnos entre cuidadores con resumen de relevo
- Exportación del histórico para consulta pediátrica
- Borrado y portabilidad total de los datos
- Tendencias descriptivas, nunca juicios sobre la crianza
- Modo simplificado para evitar sobrecarga informativa
- Posible correlación de datos con Diario de Sueño de la madre

Apps con las que comparte motor técnico: ninguno.

Nota importante: esta app registra datos de menores. Cumplimiento
reforzado de RGPD para datos de menores. Posicionarla como diario
de registro personal, nunca como app de diagnóstico pediátrico.

Genera un documento "Plan Maestro" en Markdown con EXACTAMENTE
estas secciones, sin añadir ni quitar ninguna:
1. Propósito y usuario objetivo
2. Dominios de backend
3. Módulos de frontend
4. Modelo de datos inicial
5. Diferenciador frente a competencia
6. Fases del roadmap

Sé concreto y específico a esta app, no genérico. Evita relleno
y explicaciones obvias — cada frase debe aportar algo que Claude
(el asistente de IA que construirá la app) no podría deducir solo.
```

---

## App 19 — Diario de Síntomas y Medicación para Crónicos

```
Actúa como consultor de producto y arquitecto de software. Voy a
construir una app llamada "Diario de Síntomas y Medicación"
(Salud), reutilizando un core técnico compartido en Laravel + Vue
3 + PWA offline-first, dirigida al mercado español.

Descripción breve: diario mínimo viable para personas con
enfermedades crónicas, adaptable al nivel de energía disponible
cada día.

Módulos ya identificados (del estudio de mercado):
- El usuario (o su médico) elige 3-5 variables esenciales a
  registrar, no un formulario exhaustivo
- Check-in adaptable según energía disponible (modo brote y
  modo normal)
- Registro de medicación programada y PRN (a demanda)
- Esquema corporal para localizar síntomas
- Registro de efectos secundarios, stock de medicación y
  adherencia
- Informe de una página para consulta médica (cambios, eventos
  relevantes, preguntas del paciente)
- Análisis que dice "asociación observada", nunca causalidad
- Cifrado local, consentimiento granular y exportación
  interoperable
- Sin paywall que limite el número de síntomas registrables

Apps con las que comparte motor técnico: ninguno.

Nota importante: datos de salud de categoría especial (RGPD).
Revisión legal puntual necesaria. Posicionarla como diario
personal de seguimiento, nunca como herramienta de diagnóstico.

Genera un documento "Plan Maestro" en Markdown con EXACTAMENTE
estas secciones, sin añadir ni quitar ninguna:
1. Propósito y usuario objetivo
2. Dominios de backend
3. Módulos de frontend
4. Modelo de datos inicial
5. Diferenciador frente a competencia
6. Fases del roadmap

Sé concreto y específico a esta app, no genérico. Evita relleno
y explicaciones obvias — cada frase debe aportar algo que Claude
(el asistente de IA que construirá la app) no podría deducir solo.
```

---

## App 20 — Organizador de Custodia Compartida

```
Actúa como consultor de producto y arquitecto de software. Voy a
construir una app llamada "Organizador de Custodia Compartida"
(Familia), reutilizando un core técnico compartido en Laravel +
Vue 3 + PWA offline-first, dirigida al mercado español.

Descripción breve: herramienta de coordinación entre progenitores
centrada en acuerdos españoles y baja confrontación, con privacidad
del menor como principio central.

Módulos ya identificados (del estudio de mercado):
- Patrón semanal, vacaciones y festivos del calendario español
- Propuestas de intercambio con aceptación y trazabilidad
- Registro de entregas y recogidas
- Gastos extraordinarios con justificante y módulo de reparto
- Información escolar y sanitaria compartida
- Contactos de emergencia del menor
- Mensajería estructurada por asunto (no chat libre)
- Tono preventivo opcional para reducir conflicto
- Exportación cronológica verificable para mediación o abogacía
- Sin geolocalización continua del menor
- Privacidad del menor garantizada

Apps con las que comparte motor técnico: ninguno.

Nota importante: esta app registra datos de menores. Revisión
legal puntual necesaria. RGPD reforzado.

Genera un documento "Plan Maestro" en Markdown con EXACTAMENTE
estas secciones, sin añadir ni quitar ninguna:
1. Propósito y usuario objetivo
2. Dominios de backend
3. Módulos de frontend
4. Modelo de datos inicial
5. Diferenciador frente a competencia
6. Fases del roadmap

Sé concreto y específico a esta app, no genérico. Evita relleno
y explicaciones obvias — cada frase debe aportar algo que Claude
(el asistente de IA que construirá la app) no podría deducir solo.
```

---

## App 21 — Planificador de Comidas Semanal

```
Actúa como consultor de producto y arquitecto de software. Voy a
construir una app llamada "Planificador de Comidas Semanal"
(Alimentación), reutilizando un core técnico compartido en Laravel
+ Vue 3 + PWA offline-first, dirigida al mercado español.

Descripción breve: planificador familiar semanal de comidas que
empieza por lo que ya hay en casa, con lista de la compra
automática adaptada a supermercados españoles.

Módulos ya identificados (del estudio de mercado):
- Importación de recetas desde URL, foto o texto
- Normalización de unidades y ajuste de raciones por persona
- Descuento automático de ingredientes que ya hay en despensa
- Agrupación de ingredientes equivalentes en la lista de la compra
- Ordenación por supermercado y sección
- Consideración de presupuesto, temporada y sobras
- Batch cooking y alergias/preferencias por miembro del hogar
- Perfiles vegano, omnívoro y mixto
- Motor de despensa/recetas compartido con Nevera Vegana

Apps con las que comparte motor técnico: motor de despensa/recetas,
compartido con Nevera Vegana.

Genera un documento "Plan Maestro" en Markdown con EXACTAMENTE
estas secciones, sin añadir ni quitar ninguna:
1. Propósito y usuario objetivo
2. Dominios de backend
3. Módulos de frontend
4. Modelo de datos inicial
5. Diferenciador frente a competencia
6. Fases del roadmap

Sé concreto y específico a esta app, no genérico. Evita relleno
y explicaciones obvias — cada frase debe aportar algo que Claude
(el asistente de IA que construirá la app) no podría deducir solo.
```

---

## App 22 — Control de Horas y Facturación para Freelancers

```
Actúa como consultor de producto y arquitecto de software. Voy a
construir una app llamada "Control de Horas y Facturación para
Freelancers" (Productividad), reutilizando un core técnico
compartido en Laravel + Vue 3 + PWA offline-first, dirigida a
autónomos españoles.

Descripción breve: de las horas trabajadas a la factura española
sin rehacer datos, con toda la fiscalidad española incluida.

Módulos ya identificados (del estudio de mercado):
- Temporizador y entrada manual de horas (offline)
- Proyectos y bolsas de horas por cliente
- Tarifas por cliente y por tipo de tarea
- Gastos asociados y rentabilidad por proyecto
- Conversión directa de horas aprobadas a presupuesto, albarán
  y factura
- Factura con IVA, IRPF, series, rectificativas, suplidos y
  vencimientos
- Compatibilidad con requisitos Veri*Factu (facturación
  electrónica obligatoria en España)
- Exportación para gestoría
- Integración de gastos con Control de Gastos Personal (vía
  API puntual)

Apps con las que comparte motor técnico: ninguno.

Nota: el módulo fiscal debe diseñarse como versión normativa
actualizable y validar requisitos vigentes antes de producción.

Genera un documento "Plan Maestro" en Markdown con EXACTAMENTE
estas secciones, sin añadir ni quitar ninguna:
1. Propósito y usuario objetivo
2. Dominios de backend
3. Módulos de frontend
4. Modelo de datos inicial
5. Diferenciador frente a competencia
6. Fases del roadmap

Sé concreto y específico a esta app, no genérico. Evita relleno
y explicaciones obvias — cada frase debe aportar algo que Claude
(el asistente de IA que construirá la app) no podría deducir solo.
```

---

## App 23 — Organizador de Mudanzas

```
Actúa como consultor de producto y arquitecto de software. Voy a
construir una app llamada "Organizador de Mudanzas" (Hogar),
reutilizando un core técnico compartido en Laravel + Vue 3 + PWA
offline-first, dirigida al mercado español.

Descripción breve: acompañamiento completo de una mudanza de
origen a destino, incluyendo los trámites administrativos
posteriores específicos de España.

Módulos ya identificados (del estudio de mercado):
- Fecha objetivo y plan retroactivo adaptado al contexto español
- Gestión de contratos: suministros, empadronamiento, colegio,
  mascotas y fianza
- Inventario por foto/voz con etiquetado de cajas por QR
  imprimible
- Asignación de cada caja a habitación de destino, frágil/valor
  y "abrir primero"
- Tareas asignadas entre convivientes
- Modo offline completo
- Actas fotográficas de entrada/salida del piso (para fianza)
- Transferencia opcional de bienes inventariados a Control de
  Garantías y Bitácora de Mantenimiento del Hogar
- Integración con Control de Vencimientos para documentos que
  hay que actualizar al cambiar de domicilio

Apps con las que comparte motor técnico: ninguno.

Genera un documento "Plan Maestro" en Markdown con EXACTAMENTE
estas secciones, sin añadir ni quitar ninguna:
1. Propósito y usuario objetivo
2. Dominios de backend
3. Módulos de frontend
4. Modelo de datos inicial
5. Diferenciador frente a competencia
6. Fases del roadmap

Sé concreto y específico a esta app, no genérico. Evita relleno
y explicaciones obvias — cada frase debe aportar algo que Claude
(el asistente de IA que construirá la app) no podría deducir solo.
```

---

## App 24 — Biblioteca Personal y Préstamos de Libros

```
Actúa como consultor de producto y arquitecto de software. Voy a
construir una app llamada "Biblioteca Personal y Préstamos"
(Hogar/Ocio), reutilizando un core técnico compartido en Laravel
+ Vue 3 + PWA offline-first, dirigida al mercado español.

Descripción breve: catálogo privado de libros físicos con gestión
de préstamos a amigos y familiares, sin convertirse en una red
social.

Módulos ya identificados (del estudio de mercado):
- Alta por ISBN, foto de portada/lomo o búsqueda manual
- Edición exacta, ubicación física, estado, dedicatoria y valor
  estimado
- Préstamo mediante enlace o QR sin obligar al receptor a
  instalar la app
- Recordatorios de devolución configurables
- Confirmación de devolución por ambas partes
- Multiusuario familiar (biblioteca compartida)
- Listas personales (leído, leyendo, por leer)
- Estadísticas de lectura
- Exportación CSV/JSON
- Sin feed social ni recomendaciones algorítmicas por defecto

Apps con las que comparte motor técnico: ninguno.

Genera un documento "Plan Maestro" en Markdown con EXACTAMENTE
estas secciones, sin añadir ni quitar ninguna:
1. Propósito y usuario objetivo
2. Dominios de backend
3. Módulos de frontend
4. Modelo de datos inicial
5. Diferenciador frente a competencia
6. Fases del roadmap

Sé concreto y específico a esta app, no genérico. Evita relleno
y explicaciones obvias — cada frase debe aportar algo que Claude
(el asistente de IA que construirá la app) no podría deducir solo.
```

---

## Nota final

La categoría número 25 (The Dev Hub — panel de control interno)
no necesita plan maestro generado por GPT, ya que fue redefinida
como herramienta interna de gestión del portfolio y su diseño
viene directamente de las decisiones técnicas del entorno de
trabajo, no de un estudio de mercado externo.
