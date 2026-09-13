# entorno-de-trabajo.md
# Entorno de trabajo — TicoSystem / Plataforma de 26 apps

> Documento de referencia con todas las decisiones tomadas sobre el entorno
> de trabajo. Cada punto indica en qué fase y paso del `plan-de-trabajo.md`
> se ejecuta.

---

## 1. Editor de código
**→ Se ejecuta en: Fase 0, Paso 1**

- **Editor**: Cursor (fork de VS Code con Claude y GPT integrados)
- **Instalación**: Ubuntu, desde cursor.com, archivo .deb
- **Extensiones**: 32 extensiones instaladas (ver lista completa abajo)
- **Configuración**: settings.json con Prettier, Tailwind, ESLint, PHP Intelephense, Pylance, word wrap, autoguardado
- **Idioma**: español
- **Privacy Mode**: activado (código NO se usa para entrenar modelos)
- **GitHub**: conectado desde Cursor

**Suscripciones:**
- ChatGPT Plus (~20€/mes) — modo Work + investigación web + planes maestros
- Cursor Pro (~20€/mes) — Claude+GPT en el editor
- Claude.ai — plan gratuito

**Extensiones instaladas (32):**

*Generales*: Code Spell Checker, Spanish - Code Spell Checker, Spanish Language Pack, DotENV, EditorConfig, Error Lens, GitLens, GitHub Pull Requests, Dev Containers, Docker, Markdown All in One, YAML, Path Intellisense, Thunder Client

*Frontend*: Vue (Official), Tailwind CSS IntelliSense, ESLint, Prettier, Auto Rename Tag, Material Icon Theme, npm Intellisense, Pretty TypeScript Errors

*Backend*: Laravel, Laravel Blade Snippets, Laravel Extra Intellisense, Laravel Pint, PHP Debug, PHP Intelephense, Better Pest, Pylance, Python, Python Environments

---

## 2. GitHub
**→ Se ejecuta en: Fase 0 Paso 2 + Fase 1 Paso 5**

### Configuración de la organización
- **Organización**: TicoSystem (github.com/TicoSystem)
- **Tipo**: gratuita (límites: Actions 2000 min/mes, Packages 500MB + 1GB transferencia)
- **Repos**: todos bajo TicoSystem, no bajo la cuenta personal JuanBojo

### Repos de la organización
| Repo | Estado | Descripción |
|---|---|---|
| `.github` | ✅ Creado | Plantillas de PR/Issues para toda la org |
| `plataforma-core` | ✅ Creado | Repo Template con Laravel+Vue3+PWA+PostgreSQL |
| `plataforma-ui` | ⬜ Pendiente (Fase 1, Paso 4) | Sistema de diseño compartido |
| `plataforma-ops` | ⬜ Pendiente (Fase 1, Paso 5) | Scripts gh CLI para las 26 apps |

### Plantillas (repo `.github`)
- `PULL_REQUEST_TEMPLATE.md`: checklist (tests, Conventional Commits, docs)
- `ISSUE_TEMPLATE/bug_report.md`: plantilla de reporte de bugs
- `ISSUE_TEMPLATE/feature_request.md`: plantilla de solicitud de funciones

### Dependabot
- Dependabot alerts: ✅ activado en `.github`
- Dependabot security updates: ✅ activado en `.github`

### GitHub Projects (⬜ Pendiente — Fase 1, Paso 5)
- **Nivel portfolio**: un Project a nivel de organización con las 26 apps como tarjetas
- **Nivel app**: un Project por app con columnas: Por hacer / En desarrollo / En revisión / Terminada
- **Automatización nativa** (sin código): "Item added → Por hacer", "PR merged → Terminada"
- **Automatización con workflow**: crear rama `feature/N-nombre` → mover tarjeta a "En desarrollo"

### Reusable Workflows (en `plataforma-core`)
- `ci.yml`: corre Pest + Vitest en cada PR ✅
- `move-to-in-progress.yml`: mueve tarjeta al crear rama con nombre de issue ✅ (pendiente configurar IDs del Project)
- `release-please.yml`: genera changelog y versión automática ✅

### Branch protection (en `plataforma-core`)
- PR obligatorio antes de fusionar a main ✅
- CI en verde obligatorio ✅
- Sin push directo a main ✅
- Repo público para poder usar branch protection gratis ✅

### Versionado
- **Sistema**: SemVer (mayor.menor.parche)
- **Commits**: Conventional Commits (feat/fix/docs, feat! para breaking changes)
- **Herramienta**: release-please (genera versión y changelog automáticamente)
- **Apps nuevas**: empiezan en `0.x` hasta llegar a `1.0.0`
- **Rollback**: tags de Git creados en cada release para volver a versiones anteriores en Coolify

### `plataforma-ops` (⬜ Pendiente — Fase 1, Paso 5)
- Scripts gh CLI para operar sobre las 26 repos a la vez
- Script de revisión de backlog
- Script de actualización del core en todas las apps

---

## 3. Uso de modelos de IA
**→ Se ejecuta en: Fase 5, Paso 16 (planes maestros) y Paso 17 (desarrollo)**

| Modelo | Dónde | Para qué |
|---|---|---|
| Claude (Sonnet) | Cursor | Construcción real del código (arquitectura, refactors, lógica de negocio) |
| GPT-4o | ChatGPT externo | Generar el plan maestro de cada app (6 secciones fijas) |
| Gemini | Externo | Auditorías que requieran leer mucho código de golpe |
| Composer/Sonic | Cursor (automático) | Autocompletado y ediciones rápidas |

### Flujo de trabajo con los modelos
1. GPT-4o genera `docs/plan-maestro.md` (usando los prompts de `docs/prompts-plan-maestro-24-apps-rellenos.md`)
2. El plan maestro se guarda en el repo de cada app
3. Claude en Cursor lee `@docs/plan-maestro.md` como contexto antes de programar
4. Claude desglosa cada fase en issues concretas y las crea vía gh CLI

### Estructura del plan maestro (6 secciones fijas)
1. Propósito y usuario objetivo
2. Dominios de backend
3. Módulos de frontend
4. Modelo de datos inicial
5. Diferenciador frente a competencia
6. Fases del roadmap

### Estado de los planes maestros
- ✅ Estudio de mercado completado (24 apps)
- ✅ 24 prompts rellenos generados
- ✅ 24 planes maestros generados y en `plataforma-core/docs/planes-maestros/`

---

## 4. Publicación en tiendas móviles
**→ Se ejecuta en: Fase 3, Paso 14 + Fase 5, Paso 19**

- **Stack**: Laravel + Vue 3 + PWA, envuelto con **Capacitor**
- **Cuentas**: Apple Developer ($99/año) + Google Play ($25 único) — una cuenta de cada una para las 26 apps
- **Build en la nube**: Codemagic / Ionic Appflow / GitHub Actions macOS (sin Mac físico)
- **Estrategia de lanzamiento**: PWA instalable primero, graduar a tienda cuando despegue
- **Sin comisión**: no hay compras in-app (evita el 15-30% de Apple/Google)

---

## 5. Hosting y despliegue en producción
**→ Se ejecuta en: Fase 2, Pasos 6 y 7**

- **VPS**: OVH (con Docker preinstalado, gratis)
- **Panel**: Coolify (autoalojado, gratuito) — alternativa a Forge y Plesk/cPanel
- **Práctica previa**: Coolify en portátil Ubuntu antes de contratar el VPS real
- **Monitorización**: módulo Sentinel (CPU/memoria por servidor y por app)
- **Limitación de Coolify**: métricas por app no disponibles con Docker Compose — solo con contenedor individual

### Los 3 huecos de Coolify (complementos)
| Hueco | Solución | Cuándo activar |
|---|---|---|
| Alertas de CPU/memoria | Grafana conectado a Sentinel | Cuando haya uso real en producción |
| Disponibilidad externa | UptimeRobot (gratis, 50 monitores, cada 5 min) | Desde el primer despliegue |
| Logs y errores | Sentry (gratis hasta 5000 errores/mes) | Desde el principio, integrado en el core |

---

## 6. Base de datos
**→ Se ejecuta en: Fase 2, Paso 8**

- **Motor**: PostgreSQL (uno por VPS, desplegado como servicio de Coolify)
- **Aislamiento**: una base de datos independiente por app dentro del mismo motor
- **Escalado**: si una app necesita más recursos, segundo servicio Postgres dedicado

### Patrones de comunicación entre apps
| Patrón | Cuándo usarlo | Casos identificados |
|---|---|---|
| 3 — Servicio propio con BD | **Por defecto** (motores compartidos) | Motor de recurrencias (#1↔#2), motor despensa/recetas (#10↔#22) |
| 1 — API interna | Consulta puntual entre apps no relacionadas | Vehículos↔Gastos, Horas/Facturación↔Gastos, Mudanzas↔Vencimientos |
| 2 — Eventos asíncronos (Redis) | Sincronización sin bloquear | Mascotas→Gastos, Vehículos→Gastos, Lactancia↔Sueño |

---

## 7. Sistema de diseño compartido (`plataforma-ui`)
**→ Se ejecuta en: Fase 1, Paso 4**

- **Repo**: `TicoSystem/plataforma-ui` (⬜ pendiente de crear)
- **Distribución**: paquete npm versionado en GitHub Packages
- **Componentes base**: Button, Input, Card, Modal, Table, Badge, Toast, EmptyState
- **Identidad visual por app**: variables CSS (`--color-primary`, etc.) sin tocar el código
- **Accesibilidad**: WCAG AA incorporado en todos los componentes (se propaga a las 26 apps)
- **Tests**: Vitest para cada componente

---

## 8. Gestión de secretos y variables de entorno
**→ Se ejecuta en: Fase 3, Paso 11**

- **Producción**: Coolify (cifrados, inyectados al desplegar, por app)
- **CI/CD**: GitHub Organization Secrets
- **Convención de nombres**: `{APP}_{CATEGORIA}_{DETALLE}` (ej. `GASTOS_DB_PASSWORD`, `CORE_NPM_TOKEN`)
- **Política**: nunca `.env` real en el repo — solo `.env.example` sin valores
- **Rotación**: solo si se sospecha una exposición, no automática

---

## 9. Testing
**→ Se ejecuta en: Fase 1 (core) + Fase 3 Paso 12 + Fase 5 Paso 19**

| Herramienta | Para qué | Cuándo |
|---|---|---|
| Pest | Tests unitarios y de feature (backend) | En cada PR, por el CI |
| Vitest | Tests de componentes Vue (especialmente plataforma-ui) | En cada PR, por el CI |
| Playwright | E2e del "camino feliz" (un test por app) | En cada PR, por el CI |

**Prioridad de esfuerzo**: core compartido > lógica única de cada app > e2e > nada de UI trivial
**Tiempo estimado por app**: 1-2 días de testing, no semanas

---

## 10. Autenticación y pagos
**→ Se ejecuta en: Fase 3, Paso 13 + Fase 5, Paso 18**

- **Auth**: independiente por app (Laravel Breeze/Fortify) — sin SSO centralizado
- **Pagos**: Stripe (modo test en beta, real en producción) — independiente por app
- **Verificación**: número de teléfono vía Twilio/WhatsApp para evitar cuentas falsas en beta

---

## 11. Legal y cumplimiento
**→ Se ejecuta en: Fase 3, Paso 13**

- Plantilla base común de privacidad y términos (generada con GPT externo)
- Secciones fijas RGPD + sección variable por app
- Obligatorio desde el primer usuario real (no posponer)

**5 apps con revisión legal puntual obligatoria** (abogado especializado):
- App #4: Diario Fitness y Calorías
- App #9: Fisioterapia Híbrida
- App #19: Diario de Lactancia y Crianza
- App #20: Diario de Síntomas y Medicación
- App #21: Organizador de Custodia Compartida

---

## 12. Backups
**→ Se ejecuta en: Fase 2, Paso 10**

- **Frecuencia**: semanal por defecto, revisión manual para subir según actividad
- **Métrica**: nº de filas nuevas/día en las tablas principales de cada app
- **Configuración**: Coolify también respalda su propia configuración
- **Destino**: Google Drive (vía rclone + cuenta de servicio de Google)
- **Prueba de restauración**: semanal mientras se trabaja en local

---

## 13. Dominios y subdominios
**→ Se ejecuta en: Fase 2, Paso 7**

- Subdominios de un dominio principal al empezar (gratis, rápido)
- Dominio propio solo para apps que despeguen (criterio de "graduar")

---

## 14. Notificaciones push centralizadas
**→ Se ejecuta en: Fase 2, Paso 9**

- **Herramienta**: OneSignal (plan gratuito)
- **Estructura**: una "app" de OneSignal por cada una de las 26
- **Convención**: `{APP}_ONESIGNAL_ID` en secretos de Coolify

---

## 15. Analítica de uso
**→ Se ejecuta en: Fase 2, Paso 9**

- **Herramienta**: PostHog (autoalojado en el VPS)
- **Tipo**: analítica de producto (eventos, no tráfico web)
- **Configuración**: un evento clave por app al empezar (la acción principal)
- **Uso**: decidir cuándo una app "despega" y merece pasar a tienda

---

## 16. Feature flags
**→ Se ejecuta en: Fase 2, Paso 9**

- **Herramienta**: Flagsmith (autoalojado en el VPS, gratis sin límite)
- **Estructura**: un proyecto por app, panel único para las 26

---

## 17. Versionado y releases
**→ Se ejecuta en: Fase 0 Paso 2 (configuración) + Fase 5 Paso 17 (uso)**

- SemVer + Conventional Commits + release-please
- Apps en `0.x` hasta `1.0.0`
- Tags de Git para rollback en Coolify
- Versión del core y de cada app son numeraciones independientes

---

## 18. Presupuesto y control de costes
**→ Resuelto por The Dev Hub (app #3)**

The Dev Hub (panel de control del portfolio) incluye:
- Registro de gastos: VPS, tiendas, dominio, Stripe, Twilio
- Registro de ingresos por app
- Motor de recomendaciones (reglas simples)
- Backlog de mejoras de infraestructura

---

## 19. Soporte al usuario y feedback
**→ Se ejecuta en: Fase 6, Paso 21**

- Email único centralizado (ej. soporte@nimbusapps.com)
- Formulario integrado en `plataforma-ui` (incluye app, versión, usuario automáticamente)
- Distinción: "reportar problema" vs "sugerir mejora"
- Empezar con email + GitHub Project; escalar a Crisp/Tawk.to si el volumen crece
- **Aviso**: si se usa Crisp/Tawk.to, revisar límites del plan gratuito y añadir a la política de privacidad

---

## 20. Identidad de marca por app
**→ Se ejecuta en: Fase 6, Paso 22**

- Marca propia por app (nombre, logo, color independiente)
- Marca paraguas: **"Nimbus Apps"** (PLACEHOLDER — pendiente decidir nombre real)
- Titularidad legal única para las 26 apps
- Si se vende una app: ceder lo específico, licenciar (no ceder) el core y motores compartidos

---

## 21. Gestión del tiempo entre 26 proyectos
**→ Se ejecuta en: Fase 6, Paso 20**

- **Cadencia**: Lunes-Jueves construcción / Viernes mantenimiento + soporte + portfolio
- **Regla**: no abrir app nueva sin cerrar/pausar la actual
- **Herramienta**: GitHub Project de portfolio para decidir qué app toca

---

## DECISIONES "APP POR APP" (criterios por defecto)

| Decisión | Criterio por defecto | Excepción |
|---|---|---|
| Idioma | Español únicamente | Ninguna por ahora |
| Accesibilidad | WCAG AA (en plataforma-ui) | Valorar AAA en apps para mayores o con datos de salud |
| Onboarding | "Empty state guiado" (componente en plataforma-ui) | Apps complejas (ej. Fisioterapia): onboarding de 3-4 pasos |
| Pricing beta | 2€ (sin anuncios) o 1€ (con anuncios), pago único de por vida | — |
| Pricing estable | Freemium con anuncios + suscripción sin anuncios | — |
| Referidos | Pago por persona referida con X meses en plan de pago (X por definir) | — |
| Cumplimiento tienda | Lenguaje "wellness", no "médico/diagnóstico" | Solo aplica a las 5 apps con datos sensibles |
| Anuncios | Segmentados por comportamiento | Las 5 apps sensibles: solo anuncios genéricos/contextuales |
