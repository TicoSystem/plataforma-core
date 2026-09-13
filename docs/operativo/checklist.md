# checklist.md
# Checklist detallado — TicoSystem / Plataforma de 26 apps

> Checklist operativo que sale del `plan-de-trabajo.md`.
> Cada punto indica qué hace y para qué sirve.
> Actualizar junto con el plan de trabajo.

---

## FASE 0 — Puesto de trabajo

### Paso 1 — Editor de código (Cursor) ✅ COMPLETADO

| Estado | Tarea | Para qué sirve |
|---|---|---|
| ✅ | Instalar Cursor desde cursor.com | El editor donde escribirás todo el código de las 26 apps, con Claude y GPT integrados |
| ✅ | Importar configuración de VS Code | No perder los atajos de teclado y ajustes que ya tenías |
| ✅ | Instalar 32 extensiones | Herramientas específicas para PHP/Laravel, Vue, Git, corrector ortográfico, etc. |
| ✅ | Configurar settings.json | Formateo automático al guardar, Tailwind en Blade, intérprete Python, word wrap, autoguardado |
| ✅ | Cambiar idioma a español | Comodidad al trabajar |
| ✅ | Conectar GitHub desde Cursor | Para que Cursor pueda ver, clonar y gestionar tus repos directamente |
| ✅ | Activar Privacy Mode | Que tu código NO se use para entrenar modelos de IA de Cursor |

### Paso 2 — Organización en GitHub (TicoSystem) 🔄 EN CURSO

| Estado | Tarea | Para qué sirve |
|---|---|---|
| ✅ | Crear organización TicoSystem | Separar los 26 repos de tu cuenta personal; gestión centralizada |
| ✅ | Crear repo `.github` | Las plantillas que metas aquí se aplican automáticamente a todos los repos de TicoSystem |
| ✅ | Crear PULL_REQUEST_TEMPLATE.md | Que cada PR tenga un checklist estándar (tests, Conventional Commits, docs) |
| ✅ | Crear ISSUE_TEMPLATE/bug_report.md | Que los bugs se reporten con toda la info necesaria para arreglarlos |
| ✅ | Crear ISSUE_TEMPLATE/feature_request.md | Que las mejoras se propongan con contexto y justificación |
| ✅ | Activar Dependabot alerts | Que GitHub te avise si alguna dependencia tiene una vulnerabilidad de seguridad |
| ✅ | Activar Dependabot security updates | Que GitHub abra PRs automáticos para arreglar esas vulnerabilidades |
| ⬜ | Crear GitHub Project de portfolio | Ver el estado de las 26 apps de un vistazo, sin entrar en cada repo |
| ⬜ | Configurar columnas del Project | Por hacer / En desarrollo / En revisión / Terminada |
| ⬜ | Activar regla "Item added → Por hacer" | Toda issue nueva empieza en la columna correcta automáticamente |
| ⬜ | Activar regla "PR merged → Terminada" | Al fusionar un PR, la issue se cierra y la tarjeta se mueve sola |
| ⬜ | Configurar IDs del Project en move-to-in-progress.yml | Que el workflow sepa a qué Project y columna mover las tarjetas |
| ⬜ | Crear repo `plataforma-ops` | Scripts para operar sobre las 26 apps a la vez (actualizar el core, revisar backlog, etc.) |

---

## FASE 1 — Núcleo técnico reutilizable

### Paso 3 — `plataforma-core` ✅ COMPLETADO

| Estado | Tarea | Para qué sirve |
|---|---|---|
| ✅ | Crear proyecto Laravel con Sail | Base del stack técnico — sin esto, no hay nada |
| ✅ | Cambiar MySQL por PostgreSQL | BD elegida para las 26 apps — más robusta y con mejor soporte JSON |
| ✅ | Instalar Vue 3 + Vite | El framework de frontend de las 26 apps |
| ✅ | Configurar Tailwind CSS | Sistema de estilos base que usarán los componentes de plataforma-ui |
| ✅ | Configurar PWA offline-first | Que las apps funcionen sin conexión y sean instalables (sin tienda) |
| ✅ | Crear estructura de carpetas de dominio | Convención de organización del código que se replicará igual en las 26 apps |
| ✅ | Instalar Sanctum | Sistema de autenticación API para las apps |
| ✅ | Instalar spatie/laravel-data | Para tipado fuerte de datos entre capas (DTOs) |
| ✅ | Instalar Pinia | Gestión de estado en Vue 3 (equivalente a Vuex pero más simple) |
| ✅ | Instalar Vue Router 4 | Navegación entre páginas dentro de la PWA |
| ✅ | Crear App.vue y Home.vue | Componentes Vue mínimos para que el template no esté vacío |
| ✅ | Conectar Vue con Laravel (Blade) | Que Laravel sirva la PWA Vue en vez de su página por defecto |
| ✅ | Subir a GitHub como Repo Template | Crear una app nueva = un solo comando, con todo ya configurado |
| ✅ | Hacer el repo público | Necesario para usar branch protection en el plan gratuito de GitHub |
| ✅ | Añadir ci.yml | Tests automáticos en cada PR (Pest + Vitest) — la red de seguridad del código |
| ✅ | Añadir move-to-in-progress.yml | Mover tarjetas automáticamente al crear una rama con nombre de issue |
| ✅ | Añadir release-please.yml | Versión y changelog automáticos al fusionar PRs a main |
| ✅ | Configurar branch protection | PR obligatorio + CI en verde antes de poder fusionar a main |

### Paso 4 — `plataforma-ui` ✅ COMPLETADO (v0.1.1 publicada en GitHub Packages)

| Estado | Tarea | Para qué sirve |
|---|---|---|
| ✅ | Crear repo `TicoSystem/plataforma-ui` | Repo dedicado al sistema de diseño compartido |
| ⬜ | Configurar como paquete npm en GitHub Packages | Que las 26 apps lo instalen como dependencia, igual que cualquier librería |
| ⬜ | Crear componente Button.vue | Botón reutilizable con variantes (primary, secondary, danger) |
| ⬜ | Crear componente Input.vue | Campo de texto reutilizable con validación y estados de error |
| ⬜ | Crear componente Card.vue | Contenedor de tarjeta estándar para toda la UI |
| ⬜ | Crear componente Modal.vue | Ventana emergente con comportamiento estándar (Teleport, cerrar al hacer clic fuera) |
| ⬜ | Crear componente Table.vue | Tabla de datos con slots para personalizar columnas por app |
| ⬜ | Crear componente Badge.vue | Etiqueta de estado (ej. "activo", "pendiente") |
| ⬜ | Crear componente Toast.vue | Notificación temporal (éxito, error, aviso) |
| ⬜ | Crear componente EmptyState.vue | Pantalla vacía con mensaje guiado (el "onboarding" de cada app) |
| ⬜ | Configurar variables CSS de tema | `--color-primary`, `--color-secondary`, etc. para que cada app cambie solo sus colores |
| ⬜ | Incorporar WCAG AA en todos los componentes | Accesibilidad propagada a las 26 apps de una vez |
| ⬜ | Añadir tests con Vitest | Si un componente se rompe, afecta a las 26 apps — los tests lo detectan antes |
| ⬜ | Publicar versión 0.1.0 en GitHub Packages | Primera versión instalable por las apps |

### Paso 5 — Automatización de GitHub Projects y CI/CD ⬜ PENDIENTE

| Estado | Tarea | Para qué sirve |
|---|---|---|
| ⬜ | Crear GitHub Project de portfolio (organización) | Vista de pájaro de las 26 apps: en qué fase está cada una sin abrir 26 tableros |
| ⬜ | Añadir las 26 apps como ítems del Project | Ver el estado global de toda la plataforma |
| ⬜ | Configurar columnas y campos personalizados | Columnas: Por hacer/En desarrollo/En revisión/Terminada; campo "App" para filtrar |
| ⬜ | Activar regla nativa "Item added → Por hacer" | Toda issue nueva empieza en la columna correcta sin intervención manual |
| ⬜ | Activar regla nativa "PR merged → Terminada" | Al fusionar, la issue y la tarjeta se cierran/mueven solas |
| ⬜ | Obtener IDs del Project y campos | Necesarios para que move-to-in-progress.yml sepa dónde mover las tarjetas |
| ⬜ | Actualizar move-to-in-progress.yml con los IDs reales | Que la automatización de "En desarrollo" funcione de verdad |
| ⬜ | Crear repo `plataforma-ops` | Scripts que operan sobre las 26 repos a la vez |
| ⬜ | Crear script de revisión de backlog | Equivalente a verify_backlog.py pero para las 26 apps |
| ⬜ | Crear script de actualización del core | Bumpar la versión de plataforma-core en todas las apps con un solo comando |

---

## FASE 2 — Infraestructura y hosting

### Paso 6 — Practicar Coolify en local ⬜ PENDIENTE

| Estado | Tarea | Para qué sirve |
|---|---|---|
| ⬜ | Instalar Coolify en el portátil Ubuntu (curl install) | Aprender el flujo completo de despliegue sin pagar nada todavía |
| ⬜ | Conectar repo de GitHub a Coolify local | Ver cómo Coolify detecta cambios y despliega automáticamente |
| ⬜ | Desplegar plataforma-core como prueba | Verificar que el compose.yml funciona en Coolify |
| ⬜ | Activar Sentinel y revisar métricas | Comprobar si las métricas por app funcionan con Docker Compose de Sail |
| ⬜ | Probar el problema de métricas (Compose vs contenedor individual) | Decidir si adaptar el despliegue para que Sentinel funcione correctamente |
| ⬜ | Configurar prueba de restauración de backup semanal | Validar que los backups funcionan ANTES de necesitarlos de verdad |

### Paso 7 — VPS de producción (OVH) ⬜ PENDIENTE

| Estado | Tarea | Para qué sirve |
|---|---|---|
| ⬜ | Contratar VPS OVH con Docker preinstalado | El servidor real donde vivirán las apps en producción |
| ⬜ | Instalar Coolify en el VPS | Panel de gestión de todos los despliegues |
| ⬜ | Configurar dominio principal | Base para todos los subdominios de las 26 apps |
| ⬜ | Crear subdominio por app (ej. control-gastos.tudominio.com) | Dirección pública de cada app mientras no tienen dominio propio |
| ⬜ | Desplegar plataforma-core como primer servicio | Verificar que todo funciona en producción real |

### Paso 8 — Base de datos en producción ⬜ PENDIENTE

| Estado | Tarea | Para qué sirve |
|---|---|---|
| ⬜ | Desplegar servicio PostgreSQL en Coolify | El motor de BD compartido por las apps del mismo VPS |
| ⬜ | Crear una BD por app dentro del mismo motor | Aislamiento real entre apps — una no puede ver los datos de otra |
| ⬜ | Configurar variables de entorno de BD en Coolify | Cada app apunta a su propia BD con sus propias credenciales |
| ⬜ | Verificar aislamiento entre bases de datos | Confirmar que la app A no puede acceder a los datos de la app B |

### Paso 9 — Servicios de observabilidad ⬜ PENDIENTE

| Estado | Tarea | Para qué sirve |
|---|---|---|
| ⬜ | Crear 26 proyectos en Sentry | Un proyecto por app para ver errores de producción de cada una por separado |
| ⬜ | Integrar SDK de Sentry en plataforma-core | Que todas las apps hereden la integración de Sentry automáticamente |
| ⬜ | Crear 50 monitores en UptimeRobot | Comprobar desde fuera si cada app responde (lo que Coolify no puede ver) |
| ⬜ | Instalar PostHog autoalojado | Analítica de producto para saber si la gente usa de verdad las apps |
| ⬜ | Definir un evento clave por app en PostHog | La métrica que dice "esta app se está usando de verdad" |
| ⬜ | Instalar Flagsmith autoalojado | Panel de feature flags para activar/desactivar funciones sin desplegar |
| ⬜ | Crear 26 proyectos en Flagsmith | Un proyecto por app para gestionar sus flags de forma independiente |
| ⬜ | Crear cuenta OneSignal + 26 "apps" | Notificaciones push centralizadas para todas las apps |

### Paso 10 — Backups ⬜ PENDIENTE

| Estado | Tarea | Para qué sirve |
|---|---|---|
| ⬜ | Configurar backups automáticos en Coolify (semanal por defecto) | Poder recuperar datos si algo sale mal |
| ⬜ | Configurar rclone en el VPS | Herramienta que conecta el VPS con Google Drive para enviar los backups |
| ⬜ | Crear cuenta de servicio de Google para rclone | Autenticación automatizada entre el VPS y Google Drive |
| ⬜ | Verificar que Coolify también respalda su propia configuración | Si el VPS muere, poder reconstruir Coolify sin perder la configuración de apps |
| ⬜ | Probar una restauración completa | Confirmar que los backups sirven de verdad antes de necesitarlos |

---

## FASE 3 — Convenciones transversales

### Paso 11 — Gestión de secretos ⬜ PENDIENTE

| Estado | Tarea | Para qué sirve |
|---|---|---|
| ⬜ | Configurar GitHub Organization Secrets | Tokens y claves que necesita el CI/CD — disponibles para todos los repos de TicoSystem |
| ⬜ | Crear CORE_NPM_TOKEN en Organization Secrets | Para que el CI pueda publicar plataforma-ui en GitHub Packages |
| ⬜ | Documentar convención de nombres en CONVENTIONS.md | Que todos los secretos sigan el mismo patrón: `{APP}_{CATEGORIA}_{DETALLE}` |
| ⬜ | Actualizar .env.example de plataforma-core | Plantilla de variables de entorno sin valores reales para nuevas apps |

### Paso 12 — Testing ⬜ PENDIENTE

| Estado | Tarea | Para qué sirve |
|---|---|---|
| ✅ | Instalar Pest en plataforma-core (--with-all-dependencies) | Necesario para que el CI pueda correr los tests de backend |
| ⬜ | Añadir test de ejemplo con Vitest en plataforma-ui | Que los componentes compartidos tengan cobertura desde el primer día |
| ⬜ | Añadir test e2e de ejemplo con Playwright en plataforma-core | El "camino feliz" de cada app ya tiene estructura, solo hay que rellenarlo |
| ⬜ | Verificar que el CI corre los 3 tipos de test | El workflow ci.yml debe ejecutar Pest, Vitest y Playwright sin errores |

### Paso 13 — Autenticación y legal ⬜ PENDIENTE

| Estado | Tarea | Para qué sirve |
|---|---|---|
| ⬜ | Añadir Laravel Breeze a plataforma-core | Sistema de autenticación base (registro, login, reset de contraseña) |
| ⬜ | Generar plantilla base de privacidad con GPT | Documento legal reutilizable para las 26 apps (con sección variable por app) |
| ⬜ | Generar plantilla base de términos de servicio con GPT | Ídem |
| ⬜ | Marcar las 5 apps con revisión legal obligatoria | #4 Fitness, #9 Fisioterapia, #19 Lactancia, #20 Síntomas, #21 Custodia |

### Paso 14 — Publicación en tiendas ⬜ PENDIENTE

| Estado | Tarea | Para qué sirve |
|---|---|---|
| ⬜ | Crear cuenta Apple Developer ($99/año) | Poder publicar en App Store — una cuenta para las 26 apps |
| ⬜ | Crear cuenta Google Play Console ($25 único) | Poder publicar en Google Play — una cuenta para las 26 apps |
| ⬜ | Configurar Codemagic o GitHub Actions macOS | Compilar el proyecto iOS sin necesitar un Mac físico |
| ⬜ | Instalar Capacitor en plataforma-core | El puente que convierte la PWA en app nativa para las tiendas |
| ⬜ | Hacer un build de prueba iOS + Android | Verificar que Capacitor funciona con plataforma-core antes de usarlo en apps reales |

---

## FASE 4 — The Dev Hub

### Paso 15 — Construir The Dev Hub ⬜ PENDIENTE

| Estado | Tarea | Para qué sirve |
|---|---|---|
| ⬜ | Crear repo desde plataforma-core template | The Dev Hub es una app más, construida con el mismo core |
| ⬜ | Integrar API de GitHub | Ver issues abiertas, minutos de Actions usados, estado de CI por app |
| ⬜ | Integrar API de Coolify/Sentinel | Ver CPU/memoria por app desde el propio panel |
| ⬜ | Integrar API de PostHog | Ver usuarios activos y eventos clave por app |
| ⬜ | Integrar API de Sentry | Ver errores recientes por app |
| ⬜ | Módulo de gastos | Registrar VPS, tiendas, dominio, Stripe, Twilio |
| ⬜ | Módulo de ingresos por app | Ver cuánto genera cada app (cuando haya monetización real) |
| ⬜ | Motor de recomendaciones | Reglas simples: CPU alta→separar hosting, usuarios crecen→graduar a tienda |
| ⬜ | Scheduler de Laravel | Refrescar datos de todas las APIs periódicamente sin acción manual |

---

## FASE 5 — Por cada app nueva (repetir x25)

### Pasos 16-19 — Ciclo completo de una app ⬜ PENDIENTE

| Estado | Tarea | Para qué sirve |
|---|---|---|
| ✅ | Generar plan maestro con GPT (prompt ya preparado) | Documento estratégico de 6 secciones: base del desarrollo — 24 planes completados y en plataforma-core/docs/planes-maestros/ |
| ⬜ | Crear repo desde plataforma-core template | El repositorio de la app, ya con todo configurado |
| ⬜ | Guardar plan-maestro.md en docs/ | Que Claude en Cursor lo lea como contexto al programar |
| ⬜ | Claude desglosa Fase 1 en issues (gh CLI) | Convertir el plan abstracto en tareas concretas y accionables |
| ⬜ | Ciclo issue por issue (rama→código→PR→CI→merge) | El proceso de construcción real de la app |
| ⬜ | Configurar Stripe en modo test | Para la fase beta de pago único |
| ⬜ | Configurar Twilio/WhatsApp para verificación | Evitar cuentas falsas en la beta |
| ⬜ | Escribir tests de la lógica única de la app | Cobertura de lo específico de esta app (el core ya está cubierto) |
| ⬜ | Escribir test e2e del camino feliz | Que la función principal de la app funcione siempre |
| ⬜ | Desplegar en Coolify | La app disponible en producción real |
| ⬜ | Publicar como PWA instalable | Primera publicación, sin pasar por las tiendas |
| ⬜ | Graduar a Capacitor+tienda si despega | Solo cuando PostHog muestre tracción real |

---

## FASE 6 — Gestión continua

### Pasos 20-23 — Operación del portfolio ⬜ PENDIENTE

| Estado | Tarea | Para qué sirve |
|---|---|---|
| ⬜ | Establecer cadencia semanal (L-J construcción, V mantenimiento) | No dispersarte entre 26 proyectos sin avanzar ninguno |
| ⬜ | Crear email de soporte centralizado | Un solo sitio para recibir feedback de las 26 apps |
| ⬜ | Integrar formulario de contacto en plataforma-ui | Que el formulario incluya automáticamente de qué app viene |
| ⬜ | Decidir nombre real de la marca paraguas | Ahora es "Nimbus Apps" como placeholder — hay que decidir el definitivo |
| ⬜ | Generar CONVENTIONS.md | Resumen de todas las decisiones técnicas para que Claude en Cursor las tenga siempre disponibles |
| ⬜ | Configurar .cursorrules en plataforma-core | Que Claude en Cursor lea automáticamente las convenciones al abrir cualquier repo |
