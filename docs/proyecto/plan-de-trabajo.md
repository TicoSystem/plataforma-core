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
