# plan-de-trabajo.md
# Plan de trabajo — TicoSystem / Plataforma de 26 apps

> **Documento vivo** — actualizar cuando se complete cada paso.
> Cada fase indica de qué punto del entorno de trabajo proviene.
> Los ✅ indican pasos completados, ⬜ pendientes, 🔄 en curso.

---

## FASE 0 — Puesto de trabajo
> **Origen**: Punto 1 (Editor de código) y Punto 2 (GitHub) del entorno de trabajo

### ✅ Paso 1 — Editor de código (Cursor)
- ✅ Instalado Cursor 3.20.10 en Ubuntu desde cursor.com
- ✅ Importada configuración desde VS Code
- ✅ Instaladas 32 extensiones (lista en `docs/lista-extensiones-cursor.md`)
- ✅ Configurado `settings.json` (Prettier, Tailwind, ESLint, PHP, Python, word wrap, autoguardado)
- ✅ Idioma cambiado a español
- ✅ GitHub conectado desde Cursor
- ✅ Privacy Mode activado (código no se usa para entrenar modelos)

**Pendiente de definir/revisar** (notas de Juan, 14/09/2026):
- ⬜ Aclarar el comportamiento exacto del autoguardado (¿al ir escribiendo, al cerrar el archivo, o al perder el foco?) y decidir cuál se quiere
- ⬜ Documentar en detalle cómo se conectó GitHub desde Cursor (o cómo se debería conectar, si hay que rehacerlo)
- ⬜ Auditar las 32 extensiones instaladas: ¿todas son necesarias?, ¿falta alguna que merezca la pena?, configurarlas correctamente (PHP Intelephense está marcando error constantemente)

**Suscripciones activas**:
- ChatGPT Plus (~20€/mes) — modo Work + investigación web + planes maestros
- Cursor Pro (~20€/mes) — Claude+GPT en el editor
- Claude.ai — plan gratuito

### 🔄 Paso 2 — Organización en GitHub (TicoSystem)
- ✅ Organización TicoSystem creada en github.com/TicoSystem
- ✅ Repo `.github` creado con plantillas de PR e Issues (bug report + feature request)
- ✅ Dependabot alerts + security updates activados en `.github`
- ⬜ GitHub Projects en dos niveles (portfolio + por app)
- ⬜ Crear `plataforma-ops` con scripts gh CLI
- ⬜ Configurar automatización nativa de Projects (2 reglas: "añadido→Por hacer" y "cerrado→Terminada")

**Pendiente de definir/revisar** (nota de Juan, 14/09/2026):
- ⬜ `plataforma-ops` ya está creado (repo creado esta mañana, 14/09/2026), pero sigue marcado como pendiente aquí porque aún no se ha verificado su contenido en la reescritura de documentación desde cero

---

## FASE 1 — Núcleo técnico reutilizable
> **Origen**: Puntos 2 (GitHub), 7 (Sistema de diseño), 8 (Secretos), 9 (Testing) del entorno de trabajo

### ✅ Paso 3 — Crear `plataforma-core` (Repo Template)
Ver documento detallado: `docs/fase1-paso3-plataforma-core.md`

**Resumen de lo completado**:
- ✅ Proyecto Laravel 13 creado con Sail
- ✅ MySQL reemplazado por PostgreSQL 17
- ✅ Vue 3 + Vite configurado
- ✅ Tailwind CSS configurado
- ✅ PWA offline-first configurada (vite-plugin-pwa + Workbox)
- ✅ Estructura de carpetas de dominio creada
- ✅ Dependencias: Sanctum, spatie/laravel-data, Pinia, Vue Router 4
- ✅ Pest instalado con pestphp/pest-plugin-laravel (--with-all-dependencies)
- ✅ ExampleTest.php simplificado para pasar en CI
- ✅ Componentes base: App.vue, Home.vue
- ✅ Blade conectado con Vue (welcome.blade.php)
- ✅ Subido a GitHub como Repo Template público (github.com/TicoSystem/plataforma-core)
- ✅ Reusable Workflows: ci.yml, move-to-in-progress.yml, release-please.yml
- ✅ CI funcionando en verde (Pest + Vitest) verificado con PR #1
- ✅ Branch protection: PR obligatorio + CI en verde + sin push directo a main
- ✅ Documentación subida a docs/ (plan-de-trabajo.md, checklist.md, memoria-proyecto.md) vía PR #1

### ⬜ Paso 4 — Crear `plataforma-ui` (Sistema de diseño compartido)
> **Origen**: Punto 7 (Sistema de diseño compartido) del entorno de trabajo

- ⬜ Crear repo `TicoSystem/plataforma-ui`
- ⬜ Configurar como paquete npm privado en GitHub Packages
- ⬜ Crear componentes base: Button, Input, Card, Modal, Table, Badge, Toast, EmptyState
- ⬜ Configurar variables CSS de tema (`--color-primary`, etc.)
- ⬜ Incorporar nivel WCAG AA en todos los componentes
- ⬜ Añadir Vitest para tests de componentes
- ⬜ Publicar primera versión `0.1.0`

**Pendiente de definir/revisar** (nota de Juan, 14/09/2026):
- ⬜ El repo `plataforma-ui` ya está creado (creado ayer, 13/09/2026) y con una versión publicada según `entorno-de-trabajo.md` (v0.1.1), pero este paso sigue marcado como pendiente aquí porque aún no se ha verificado su contenido en la reescritura de documentación desde cero

### ⬜ Paso 5 — Automatización de GitHub Projects y CI/CD
> **Origen**: Punto 2 (GitHub — automatización) del entorno de trabajo

- ⬜ Crear GitHub Project de portfolio (nivel organización, 26 apps como tarjetas)
- ⬜ Configurar columnas: Por hacer / En desarrollo / En revisión / Terminada
- ⬜ Activar 2 reglas nativas: "Item added→Por hacer" y "PR merged→Terminada"
- ⬜ Configurar el workflow `move-to-in-progress.yml` con los IDs reales del Project
- ⬜ Crear `plataforma-ops` con scripts de automatización gh CLI

---

## FASE 2 — Infraestructura y hosting
> **Origen**: Puntos 3 (Hosting), 6 (Base de datos), 12 (Backups), 13 (Dominios) del entorno de trabajo

### ⬜ Paso 6 — Practicar Coolify en local (portátil Ubuntu)
- ⬜ Instalar Coolify en el portátil con Docker
- ⬜ Conectar un repo de prueba desde GitHub
- ⬜ Probar despliegue automático y Sentinel
- ⬜ Validar el problema de métricas con Docker Compose (Sail)
- ⬜ Configurar prueba de restauración de backup semanal

### ⬜ Paso 7 — Contratar el VPS de producción (OVH)
- ⬜ Contratar VPS de OVH con Docker preinstalado
- ⬜ Instalar Coolify sobre el VPS
- ⬜ Configurar subdominios de un dominio principal
- ⬜ Desplegar `plataforma-core` como primer servicio de prueba

### ⬜ Paso 8 — Base de datos en producción
- ⬜ Desplegar servicio PostgreSQL en Coolify
- ⬜ Configurar una BD por app dentro del mismo motor
- ⬜ Verificar aislamiento entre bases de datos

### ⬜ Paso 9 — Servicios de observabilidad
- ⬜ **Sentry**: crear proyecto por app (26 proyectos), integrar SDK en plataforma-core
- ⬜ **UptimeRobot**: configurar monitores externos para cada app
- ⬜ **PostHog**: instalar autoalojado, configurar evento clave por app
- ⬜ **Flagsmith**: instalar autoalojado, crear proyecto por app
- ⬜ **OneSignal**: crear cuenta, configurar una "app" por cada una de las 26
- ⬜ **Grafana**: posponer hasta que alguna app tenga uso real en producción

### ⬜ Paso 10 — Backups
- ⬜ Configurar backups automáticos en Coolify (frecuencia semanal por defecto)
- ⬜ Configurar rclone + cuenta de servicio Google para Google Drive
- ⬜ Verificar que Coolify también respalda su propia configuración
- ⬜ Probar una restauración completa

---

## FASE 3 — Convenciones transversales
> **Origen**: Puntos 8 (Secretos), 9 (Testing), 10 (Auth), 11 (Legal), 14 (Publicación tiendas) del entorno de trabajo

### ⬜ Paso 11 — Gestión de secretos
- ⬜ Configurar GitHub Organization Secrets para CI/CD
- ⬜ Crear CORE_NPM_TOKEN en Organization Secrets
- ⬜ Documentar convención de nombres en CONVENTIONS.md
- ⬜ Actualizar .env.example de plataforma-core

### ⬜ Paso 12 — Testing
- ⬜ Mejorar test de ejemplo con Pest (test real de plataforma-core)
- ⬜ Añadir scaffolding de Vitest en plataforma-ui
- ⬜ Añadir scaffolding de Playwright en plataforma-core
- ⬜ Verificar que el CI corre los 3 tipos de test correctamente

### ⬜ Paso 13 — Autenticación y legal
- ⬜ Añadir Laravel Breeze como opción de auth en plataforma-core
- ⬜ Generar plantilla base de política de privacidad con GPT externo
- ⬜ Generar plantilla base de términos de servicio con GPT externo
- ⬜ Marcar las 5 apps que necesitan revisión legal puntual (#4, #9, #19, #20, #21)

### ⬜ Paso 14 — Publicación en tiendas
- ⬜ Crear cuenta Apple Developer ($99)
- ⬜ Crear cuenta Google Play Console ($25)
- ⬜ Configurar Codemagic (o GitHub Actions macOS) para builds en la nube
- ⬜ Probar Capacitor sobre plataforma-core (build iOS + Android de prueba)

---

## FASE 4 — The Dev Hub (panel de control del portfolio)
> **Origen**: Puntos 2 (GitHub — tablero), 18 (Presupuesto) del entorno de trabajo

### ⬜ Paso 15 — Construir The Dev Hub
- ⬜ Crear repo desde plataforma-core template
- ⬜ Integrar APIs: GitHub, Coolify/Sentinel, PostHog, Sentry
- ⬜ Módulo de gastos e ingresos
- ⬜ Motor de recomendaciones (reglas simples)
- ⬜ Backlog de mejoras de infraestructura
- ⬜ Scheduler de Laravel para refrescar datos periódicamente

---

## FASE 5 — Por cada app nueva (repetir 25 veces)
> **Origen**: Puntos 3 (Uso de IAs), 4 (Publicación), 5 (Pricing), 6 (BD), 10 (Auth), 11 (Legal) del entorno de trabajo

### 🔄 Paso 16 — Generar el plan maestro con GPT
- ✅ Estudio de mercado completado (24 apps, excluyendo The Dev Hub)
- ✅ 24 prompts rellenos generados (archivo prompts-plan-maestro-24-apps-rellenos.md)
- ✅ 24 planes maestros generados con ChatGPT (GPT-4o) y subidos a plataforma-core/docs/planes-maestros/ vía PR #2

**Pendiente de definir/revisar** (notas de Juan, 14/09/2026):
- ⬜ Configurar cada modelo de IA (Claude, GPT-4o, Gemini) para que trabaje de la forma más eficaz posible en su rol asignado
- ⬜ Recuperar el estudio que hizo Gemini sobre la app de Uber (dio un mejor resultado) y revisar si se puede mejorar el prompt o la estructura del plan maestro a partir de ahí

### ⬜ Paso 17 — Crear el repo y desarrollar con Claude en Cursor
- ⬜ `gh repo create TicoSystem/{app} --template=TicoSystem/plataforma-core --private`
- ⬜ Abrir en Cursor, referenciar `@docs/plan-maestro.md`
- ⬜ Claude desglosa la Fase 1 en issues y las crea con gh CLI
- ⬜ Ciclo: rama → Claude programa → commit → PR → CI → merge

### ⬜ Paso 18 — Pricing y monetización
- ⬜ Configurar Stripe (modo test en beta)
- ⬜ Configurar Twilio/WhatsApp para verificación por teléfono
- ⬜ Implementar flujo beta y freemium en fase estable

### ⬜ Paso 19 — Testing, despliegue y publicación
- ⬜ Escribir feature tests y e2e del camino feliz
- ⬜ Desplegar en Coolify
- ⬜ Publicar como PWA instalable primero
- ⬜ Graduar a Capacitor+tienda cuando la app despegue

---

## FASE 6 — Gestión continua
> **Origen**: Puntos 19 (Soporte), 20 (Gestión del tiempo) del entorno de trabajo

### ⬜ Paso 20 — Ritmo de trabajo semanal
### ⬜ Paso 21 — Soporte al usuario
### ⬜ Paso 22 — Identidad de marca (decidir nombre real de la marca paraguas)
### ⬜ Paso 23 — Generar CONVENTIONS.md y configurar .cursorrules

---

## ESTADO GLOBAL
```
✅ Fase 0 — Puesto de trabajo (parcialmente completada)
   ✅ Paso 1: Cursor instalado y configurado
   🔄 Paso 2: GitHub Organization (en curso)

🔄 Fase 1 — Núcleo técnico reutilizable (en curso)
   ✅ Paso 3: plataforma-core completo y funcionando
   ✅ Paso 4: plataforma-ui v0.1.1 publicada en GitHub Packages
   ⬜ Paso 5: Automatización GitHub Projects

⬜ Fase 2 — Infraestructura y hosting
⬜ Fase 3 — Convenciones transversales
⬜ Fase 4 — The Dev Hub
🔄 Fase 5 — Por cada app nueva (planes maestros completados, pendiente construir apps)
⬜ Fase 6 — Gestión continua
```
NOTAS:
1.- Al comenzar cada fase se deberá presentar un documento .md que indique que fase es y cual es su origen, asi como una descripción de cual es su función. También incluirá un check list con todos los pasos que la componen. Cada paso debe describir que es lo que hace, asi como cada uno de los comandos necesarios para realizarla. Si son varios deberan ir en un check list también y detallar que es lo que hace. En el chat se deberá explicar explicar detalladamente que es lo que se está haciendo en cada momento, con el objeto de saber     exactamente lo que realizamos. Al finalizar cada paso o cada subpaso deberá actualizarse automaticamente el md. Al finalizar cada paso se generara un documento con la TRANSCRIPCIÓN LITERAL DEL CHAT, PARA QUE SEA DESCARGADO, asi como el documento del paso correspondiente. Estos dos documentos se subiran y la ia los fusionará en uno unico, que será subido al directorio fase del arbol de directorio documents de github.
Hay que tener en cuenta que cada paso se hará en uno o más chat con lo cual la ia debera dar las instrucinones precisas para continuar en otro chat si fura necesario. 
2.- Ten en cuenta que todo esto también está pensado para enseñar a usuarios de un centro de dia a realizar este proyecto (limitado a dos apps que elijan) asi como para explotarlo  yo mismo (con la creación de las apps o vendiendo el proyecto) y aprender, con lo cual puedo pedirte cualquier documento. Te lo digo para que los documentos sean lo mas profesionales y educativos posible. Si hubiera que incluir capturas de pantallas deberás avisarme para realizarlas y subirlas a una carpeta que crearás (las subidas de imágenes en el chat están limitadas). En principio no hace falta mucha calidad en los documentos, a no ser que te lo pida para el centro o para una empresa o documentar una app a la venta. Deberá incluir presentaciones también en ese caso.

3.- ESTADO GLOBAL.
- Cada paso debe ir enlazado a su documento final correspondiente.
- Al final de todos los pasos de una fase se fusionarán todos los documentos de cada paso en uno solo, dando lugar al documento de la fase.
- Cada fase debe ir enlazada a su documento.
- Al final de todas las fases se creará el documento del proyecto con la fusión de todos.

**Suscripciones activas**:
Hay que instalar chatgpt de escritorio y configurarlo para trabajar con work

Seria conveniente configurar cada ia para que trabajen lo mejor posible