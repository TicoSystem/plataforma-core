# memoria-proyecto.md
# Memoria completa del proyecto — TicoSystem / Plataforma de 26 apps

> **INSTRUCCIONES PARA CUALQUIER IA QUE LEA ESTE DOCUMENTO:**
> Este archivo contiene toda la información relevante del proyecto.
> Si trabajas con este proyecto, debes:
> 1. Leer este documento antes de empezar
> 2. Actualizar este documento cuando se tomen nuevas decisiones
> 3. Marcar como ✅ los puntos completados
> 4. Añadir nuevas decisiones al final de cada sección correspondiente
> 5. Mantener el formato existente para coherencia entre sesiones

---

## 1. IDENTIDAD DEL PROYECTO

- **Nombre de la organización GitHub**: TicoSystem (github.com/TicoSystem)
- **Nombre de la marca paraguas**: "Nimbus Apps" (PLACEHOLDER — pendiente decidir nombre real)
- **Propietario**: JuanBojo (bojocanales@gmail.com)
- **Ubicación**: Madrid, España
- **Sistema operativo de desarrollo**: Ubuntu (portátil)
- **Total de apps**: 26 (Libre de Humo + 25 apps nuevas)

---

## 2. STACK TÉCNICO DECIDIDO

- **Backend**: Laravel 13 + Sail (Docker)
- **Frontend**: Vue 3 + Vite + Tailwind CSS
- **PWA**: offline-first con vite-plugin-pwa + Workbox
- **Base de datos**: PostgreSQL (una BD por app, mismo servidor)
- **Cola/caché**: Redis
- **ORM**: Eloquent (Laravel)
- **Auth**: Laravel Sanctum (por app, sin SSO centralizado)
- **Testing backend**: Pest
- **Testing frontend**: Vitest
- **Testing e2e**: Playwright (solo camino feliz, un test por app)
- **Notificaciones push**: OneSignal (una "app" por cada una de las 26)
- **Analítica de producto**: PostHog (autoalojado en el VPS)
- **Feature flags**: Flagsmith (autoalojado en el VPS)
- **Errores en producción**: Sentry (gratis hasta 5000 errores/mes, un proyecto por app)
- **Monitorización de uptime**: UptimeRobot (externo, gratis, 50 monitores)
- **Publicación móvil**: Capacitor (envuelve la PWA para App Store / Google Play)
- **Pagos**: Stripe (modo test en beta, modo real en producción)
- **SMS/Verificación**: Twilio (plan con mensajes gratuitos vía WhatsApp)

---

## 3. INFRAESTRUCTURA DECIDIDA

### Hosting
- **VPS**: OVH (con Docker preinstalado, gratis)
- **Panel de gestión**: Coolify (autoalojado, gratuito — alternativa a Forge y Plesk/cPanel)
- **Práctica previa**: Coolify en portátil Ubuntu antes de contratar el VPS real
- **Límite de Coolify**: métricas por app no disponibles con Docker Compose (solo con contenedor individual)

### Monitorización (los 3 huecos de Coolify)
1. **Alertas de CPU/memoria**: Grafana conectado a Sentinel (posponer hasta uso real)
2. **Disponibilidad externa**: UptimeRobot (externo, gratis, 50 monitores, cada 5 min)
3. **Logs y errores**: Sentry (gratis hasta 5000 errores/mes, un proyecto por app)

### Base de datos
- Un servidor PostgreSQL por VPS (Coolify lo despliega como servicio)
- Una base de datos independiente por app dentro del mismo motor
- Si una app necesita más recursos: segundo servicio Postgres dedicado con límites propios

### Patrones de comunicación entre apps
1. **API interna** (consulta puntual): Bitácora Vehículos↔Gastos, Horas/Facturación↔Gastos, Mudanzas↔Vencimiento Docs
2. **Eventos asíncronos** (Redis): Mascotas→Gastos, Vehículos→Gastos, Lactancia↔Sueño
3. **Servicio propio con BD** (patrón por defecto): motores de recurrencias, motor Nevera Vegana

### Backups
- Frecuencia: semanal por defecto, revisión manual para subir a diario/hora según actividad
- Coolify respalda también su propia configuración
- Destino en producción: Google Drive (vía rclone + cuenta de servicio de Google)
- Prueba de restauración semanal mientras se trabaja en local

### Dominios
- Subdominios de un dominio principal al empezar
- Dominio propio solo para apps que despeguen (criterio de "graduar")

### Tiendas móviles
- Apple Developer Program: $99/año (una cuenta para las 26 apps)
- Google Play Console: $25 pago único (una cuenta para las 26 apps)
- Build en la nube (Codemagic/Appflow/GitHub Actions macOS) — sin Mac físico
- PWA instalable para apps menos prioritarias (sin tienda)
- Sin compras in-app (evita comisión de Apple/Google)

---

## 4. HERRAMIENTAS Y SUSCRIPCIONES

| Herramienta | Plan | Coste | Para qué |
|---|---|---|---|
| ChatGPT | Plus (~20€/mes) | Activo | Modo Work, investigación web, planes maestros |
| Cursor | Pro (~20€/mes) | Activo | Editor de código con Claude+GPT integrados |
| Claude.ai | Gratuito | Activo | Consultas, documentación, decisiones |
| GitHub | Free (TicoSystem org) | Gratis | Repos, CI/CD, Projects |
| OVH VPS | Por contratar | ~6-24€/mes | Hosting de producción |
| Apple Developer | Por contratar | $99/año | Publicación en App Store |
| Google Play | Por contratar | $25 único | Publicación en Google Play |

---

## 5. REPOSITORIOS EN TICOSYSTEM

| Repo | Estado | Descripción |
|---|---|---|
| `.github` | ✅ Creado | Plantillas de PR e Issues para toda la org |
| `plataforma-core` | ✅ Creado y público | Repo Template con Laravel+Sail+Vue3+PWA+PostgreSQL |
| `plataforma-ui` | ✅ Publicada v0.1.1 | Sistema de diseño: Button, Input, Card, Modal, Table, Badge, Toast, EmptyState |
| `plataforma-ops` | ⬜ Pendiente | Scripts gh CLI para operar sobre las 26 apps |

### Configuración de `plataforma-core`
- Laravel 13 + Sail + PostgreSQL + Redis + Mailpit
- Vue 3 + Vite + Tailwind CSS + PWA (vite-plugin-pwa)
- Pinia + Vue Router 4
- Laravel Sanctum + spatie/laravel-data
- Estructura de carpetas: `app/Domain/`, `app/Support/`, `resources/js/{components,pages,stores}/`
- Workflows: `ci.yml`, `move-to-in-progress.yml`, `release-please.yml`
- Branch protection: PR obligatorio + CI en verde + sin push directo a main
- Marcado como Template repository ✅
- Hecho público para poder usar branch protection gratis ✅

### Repo especial `.github`
- `PULL_REQUEST_TEMPLATE.md` ✅
- `ISSUE_TEMPLATE/bug_report.md` ✅
- `ISSUE_TEMPLATE/feature_request.md` ✅

---

## 6. FLUJO DE TRABAJO ESTÁNDAR (por app)

```
GPT externo (GPT-4o)
→ genera docs/plan-maestro.md (6 secciones fijas)
        ↓
Crear repo desde plataforma-core template:
gh repo create TicoSystem/{app-name} --template=TicoSystem/plataforma-core --private
        ↓
Guardar plan-maestro.md en docs/ del repo
        ↓
Claude en Cursor (con @docs/plan-maestro.md como contexto)
→ desglosa cada fase en issues concretas vía gh CLI
        ↓
Por cada issue:
  1. Crear rama: git checkout -b feature/N-nombre-issue
     → tarjeta se mueve a "En desarrollo" (automático)
  2. Claude en Cursor desarrolla el código
  3. Commit con Conventional Commits: feat/fix/docs...
  4. PR con plantilla (Closes #N)
     → tarjeta se mueve a "En revisión" (automático)
  5. CI en verde (Pest + Vitest)
  6. Merge → issue cerrada → tarjeta a "Terminada" (automático)
  7. release-please → nueva versión + changelog + tag
        ↓
Deploy en Coolify (usando el tag de la versión)
```

---

## 7. PLAN MAESTRO — ESTRUCTURA Y PROMPTS

### Estructura fija de 6 secciones (para todas las apps)
1. Propósito y usuario objetivo
2. Dominios de backend
3. Módulos de frontend
4. Modelo de datos inicial
5. Diferenciador frente a competencia
6. Fases del roadmap

### Cómo generar el plan maestro de cada app
1. Usar el archivo `prompts-plan-maestro-24-apps-rellenos.md`
2. Copiar el prompt de la app correspondiente
3. Pegarlo en ChatGPT (GPT-4o, una conversación por app)
4. Guardar el resultado como `docs/plan-maestro.md` en el repo de esa app

### Estado actual de los planes maestros
- Estudio de mercado completado: 24 apps (excluyendo The Dev Hub)
- Prompts rellenos generados: 24 prompts
- Planes maestros generados: EN CURSO (actualizar aquí cuando estén listos)

---

## 8. LAS 26 APPS

### Libre de Humo (app 0 — en desarrollo, partiendo de cero en este contexto)

### Apps de la plataforma TicoSystem (25 apps nuevas)
| # | Nombre | Categoría | Motor compartido | Notas especiales |
|---|---|---|---|---|
| 1 | Control de Gastos Personal | Finanzas | Motor de recurrencias (con #2) | Integra con #6, #7, #23 |
| 2 | Gestor de Suscripciones | Micro-SaaS | Motor de recurrencias (con #1) | Wedge product de #1 |
| 3 | The Dev Hub | Productividad interna | — | Panel de control del portfolio, resuelve punto 18 |
| 4 | Diario Fitness y Calorías | Salud | — | Revisión legal puntual, WCAG AAA candidata |
| 5 | Control de Inventario B2B | Comercio | — | |
| 6 | Bitácora de Vehículos/Uber | Automoción | — | API puntual↔#1, eventos→#1 |
| 7 | Cuaderno de Salud para Mascotas | Veterinaria | — | Evento→#1 (gasto veterinario) |
| 8 | Flashcards Educativas Leitner | Educación | — | |
| 9 | Fisioterapia Híbrida | Salud | — | Revisión legal, WCAG AAA, onboarding guiado |
| 10 | Nevera Vegana | Alimentación | Motor despensa/recetas (con #22) | 4 módulos internos |
| 11 | Control de Garantías del Hogar | Hogar | — | |
| 12 | Diario de Sueño y Descanso | Hogar/Salud | — | Módulo meditación adaptativa, correlación con #19 |
| 13 | Bitácora de Mantenimiento del Hogar | Hogar | — | |
| 14 | Seguimiento de Ayuno Intermitente | Hábitos | — | |
| 15 | Control de Riego y Plantas | Hogar | — | |
| 16 | Control de Vencimientos de Documentos | Hogar | — | API↔#24 |
| 17 | Calendario de Reciclaje | Hogar | — | |
| 18 | Comparador de Ahorro Energético | Hogar | — | |
| 19 | Diario de Lactancia y Crianza | Familia | — | Revisión legal (menores), correlación con #12 |
| 20 | Diario de Síntomas y Medicación | Salud | — | Revisión legal, WCAG AAA |
| 21 | Organizador de Custodia Compartida | Familia | — | Revisión legal (menores) |
| 22 | Planificador de Comidas Semanal | Alimentación | Motor despensa/recetas (con #10) | |
| 23 | Control de Horas y Facturación | Productividad | — | API↔#1 (gastos deducibles) |
| 24 | Organizador de Mudanzas | Hogar | — | API↔#16 |
| 25 | Biblioteca Personal y Préstamos | Hogar/Ocio | — | |

### Apps con revisión legal puntual obligatoria (abogado, no solo plantilla)
- #4 Diario Fitness y Calorías (revisar según enfoque final)
- #9 Fisioterapia Híbrida (datos de salud)
- #19 Diario de Lactancia y Crianza (datos de menores)
- #20 Diario de Síntomas y Medicación (datos de salud)
- #21 Organizador de Custodia Compartida (datos de menores)

### Apps excluidas del sistema de anuncios segmentados (datos sensibles)
Las mismas 5 de arriba — solo anuncios genéricos/contextuales en su capa gratuita.

---

## 9. DECISIONES DE PRODUCTO (TRANSVERSALES A LAS 26 APPS)

### Autenticación
- Independiente por app (Laravel Breeze/Fortify)
- Sin SSO centralizado salvo bundle futuro

### Pricing (estrategia)
- **Fase beta**: pago único de por vida — 2€ (sin anuncios) o 1€ (con anuncios)
- **Fase estable**: freemium con anuncios (capa gratuita) + suscripción sin anuncios
- **Programa de referidos**: pago al usuario que refiere por persona referida con X meses en plan de pago (X por definir)
- Verificación por teléfono (Twilio/WhatsApp) para evitar cuentas falsas en beta
- Stripe en modo test durante beta

### Sistema de diseño (`plataforma-ui`)
- Paquete npm versionado en GitHub Packages
- Componentes: Button, Input, Card, Modal, Table, Badge, Toast, EmptyState
- Identidad visual por app vía variables CSS (`--color-primary`)
- Nivel WCAG AA incorporado en los componentes base

### Onboarding
- "Empty state guiado" como mecanismo principal (componente en plataforma-ui)
- Tutorial opcional accesible desde ajustes
- Excepción: apps complejas (ej. Fisioterapia) pueden tener onboarding de 3-4 pasos

### Idioma
- Español únicamente al lanzar
- Estructura de traducción de Laravel preparada para ampliar después

### Versionado
- SemVer + Conventional Commits + release-please
- Apps nuevas empiezan en `0.x` hasta `1.0.0`
- Versión del core y de cada app son numeraciones independientes

### Gestión de secretos
- Coolify: secretos de producción (cifrados, por app)
- GitHub Organization Secrets: CI/CD
- Convención: `{APP}_{CATEGORIA}_{DETALLE}` (ej. `GASTOS_DB_PASSWORD`)
- Nunca `.env` real en el repo

### Legal
- Plantilla base común (generada con GPT externo)
- Secciones fijas RGPD + sección variable por app
- Número de teléfono como dato sensible a incluir en política de privacidad

### Soporte
- Email único centralizado (ej. soporte@nimbusapps.com)
- Formulario integrado en plataforma-ui (incluye app, versión, usuario automáticamente)
- Empezar con email + GitHub Project; escalar a Crisp/Tawk.to si el volumen crece

### Marca
- Marca propia por app (nombre, logo, color)
- Marca paraguas "Nimbus Apps" (PLACEHOLDER) — discreta, solo footer y cuenta de tiendas
- Si se vende una app: ceder lo específico de esa app, licenciar (no ceder) el core

### Gestión del tiempo
- Bloques de trabajo: construcción (L-J) + mantenimiento+soporte (V)
- No abrir app nueva sin cerrar/pausar la actual
- Apoyarse en el GitHub Project de portfolio para decidir qué app toca

---

## 10. CONVENCIONES TÉCNICAS (para Claude en Cursor)

> Este bloque es especialmente importante para Claude en Cursor,
> ya que no tiene acceso a la memoria de Claude.ai

### Estructura de carpetas por app
```
app/
├── Domain/{NombreDominio}/
│   ├── Actions/
│   ├── DTOs/
│   └── Models/
├── Http/Controllers/
├── Http/Requests/
└── Support/
resources/js/
├── components/   ← componentes Vue reutilizables (de plataforma-ui)
├── pages/        ← páginas Vue (una por ruta)
└── stores/       ← estado Pinia
```

### Convención de nombres de secretos
```
{APP}_{CATEGORIA}_{DETALLE}
Ejemplos: GASTOS_DB_PASSWORD, GASTOS_SENTRY_DSN, CORE_NPM_TOKEN
```

### Conventional Commits
```
feat: nueva funcionalidad (sube versión menor)
fix: corrección de bug (sube versión parche)
docs: solo documentación
feat!: cambio que rompe compatibilidad (sube versión mayor)
```

### Ramas
```
feature/N-nombre-de-la-issue
Ejemplo: feature/3-modelo-gasto
```

### Plan maestro
- Siempre en `docs/plan-maestro.md`
- 6 secciones fijas (ver sección 7)
- Referenciarlo con `@docs/plan-maestro.md` en Cursor al empezar

### Comunicación entre apps
- Patrón 3 (servicio propio) por defecto
- Patrón 1 (API puntual) para consultas ocasionales entre apps no relacionadas
- Patrón 2 (eventos Redis) para sincronización asíncrona

---

## 11. PENDIENTES IMPORTANTES

- [ ] Decidir el nombre real de la marca paraguas (ahora "Nimbus Apps" como placeholder)
- [ ] Definir el número exacto de meses para el programa de referidos
- [x] Instalar Pest en plataforma-core (pestphp/pest + pestphp/pest-plugin-laravel --with-all-dependencies)
- [x] CI en verde verificado con PR #1 (Pest + Vitest funcionando)
- [x] Documentación subida a plataforma-core/docs/ vía PR #1
- [x] 24 planes maestros generados con ChatGPT (GPT-4o) y subidos a plataforma-core/docs/planes-maestros/ vía PR #2
- [x] Los 5 planes divididos en 2 partes fueron fusionados antes de subir (Control de Gastos, Bitácora de Vehículos, Control de Inventario B2B, Diario Fitness y Calorías, Gestor de Suscripciones)
- [ ] Crear `plataforma-ui` (Paso 4 de la Fase 1)
- [ ] Crear `plataforma-ops` (Paso 5 de la Fase 1)
- [ ] Crear GitHub Projects en dos niveles (portfolio + por app)
- [ ] Practicar Coolify en el portátil antes de contratar VPS OVH
- [ ] Generar el documento CONVENTIONS.md para plataforma-core
- [ ] Revisión legal puntual para las 5 apps con datos sensibles
- [ ] Crear los 26 proyectos de Sentry (uno por app)
- [ ] Crear los 26 proyectos de OneSignal (uno por app)

---

## 12. HISTORIAL DE SESIONES

### Sesión 1-2 (antes de esta conversación)
- Se diseñaron las 16 apps originales y se generaron 48 documentos PDF
- Se fusionaron 4 apps de veganismo en una sola (Nevera Vegana)
- Se descartaron 3 apps (pisos compartidos, StreamTrack, currículums)
- Se amplió la lista a 25 apps nuevas

### Sesión actual
- Se definió el entorno de trabajo completo (21 puntos)
- Se instaló Cursor en Ubuntu con 32 extensiones y configuración completa
- Se creó la organización TicoSystem en GitHub
- Se creó el repo `.github` con plantillas de PR/Issues
- Se activó Dependabot en `.github`
- Se creó `plataforma-core` completo y subido a GitHub como Template público
- Se realizó estudio de mercado de 24 apps con ChatGPT
- Se generaron 24 prompts de plan maestro rellenos
- Pest instalado en plataforma-core con --with-all-dependencies
- ExampleTest.php simplificado para pasar en CI
- CI verificado en verde con PR #1
- 3 documentos de proyecto subidos a plataforma-core/docs/ vía PR #1
- 24 planes maestros generados con ChatGPT (GPT-4o) subidos a plataforma-core/docs/planes-maestros/ vía PR #2
- main local sincronizado con origin/main (HEAD en e3b6fb1)
