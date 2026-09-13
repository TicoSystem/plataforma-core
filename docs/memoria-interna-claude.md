# memoria-interna-claude.md
# Memoria interna de Claude — TicoSystem / Plataforma de 26 apps

> Este documento es una exportación literal de la memoria interna de Claude
> (Claude.ai) sobre este proyecto. Se diferencia de `memoria-proyecto.md`
> en que este contiene exactamente lo que Claude tiene anotado internamente,
> incluyendo el historial cronológico de decisiones.
>
> **INSTRUCCIONES PARA CUALQUIER IA:** Si lees este documento, úsalo como
> contexto de partida. Actualízalo al final de cada sesión añadiendo las
> nuevas decisiones tomadas, igual que haría Claude.

---

## HISTORIA DEL PROYECTO (cronológica)

### Origen — sesiones anteriores
- Se diseñaron 16 apps originales y se generaron 48 documentos PDF (maestro técnico, dossier de venta, plan de lanzamiento) para cada una
- Se fusionaron 4 apps de veganismo en una sola ("Nevera Vegana" con 4 módulos internos)
- Se descartaron 3 apps: Gastos de Pisos Compartidos, StreamTrack, Creador de Currículums (mercado saturado)
- Se amplió la lista a 25 apps nuevas
- El Gestor de Suscripciones y el Planificador de Comidas se definieron como "wedge products" de Control de Gastos y Nevera Vegana respectivamente

### Sesión actual — decisiones tomadas

**Lista final de 25 apps (además de Libre de Humo):**
1. Control de Gastos Personal (Finanzas) — motor recurrencias con #2
2. Gestor de Suscripciones (wedge product de #1) — motor recurrencias con #1
3. The Dev Hub (panel de control del portfolio — redefinida)
4. Diario Fitness y Calorías (Salud) — revisión legal puntual, WCAG AAA candidata
5. Control de Inventario B2B (Comercio)
6. Bitácora de Vehículos/Uber (Automoción) — API↔#1, eventos→#1
7. Cuaderno de Salud para Mascotas (Veterinaria) — evento→#1
8. Flashcards Educativas Leitner (Educación)
9. Fisioterapia Híbrida (Salud) — revisión legal, WCAG AAA, onboarding guiado
10. Nevera Vegana (4 módulos) — motor despensa/recetas con #22
11. Control de Garantías del Hogar
12. Diario de Sueño y Descanso (con módulo meditación adaptativa) — correlación con #19
13. Bitácora de Mantenimiento del Hogar
14. Seguimiento de Ayuno Intermitente
15. Control de Riego y Plantas
16. Control de Vencimientos de Documentos — API↔#24
17. Calendario de Reciclaje
18. Comparador de Ahorro Energético
19. Diario de Lactancia y Crianza — revisión legal (menores), correlación con #12
20. Diario de Síntomas y Medicación — revisión legal, WCAG AAA
21. Organizador de Custodia Compartida — revisión legal (menores)
22. Planificador de Comidas Semanal — motor despensa/recetas con #10
23. Control de Horas y Facturación Freelancers — API↔#1
24. Organizador de Mudanzas — API↔#16
25. Biblioteca Personal y Préstamos

**Decisiones del entorno de trabajo (21 puntos):**

*Punto 1 — Editor:* Cursor (Claude+GPT integrados), instalado en Ubuntu. 32 extensiones. Privacy Mode activado. Suscripciones: ChatGPT Plus + Cursor Pro (~20€/mes cada uno), Claude.ai gratuito.

*Punto 2 — GitHub:* Organización TicoSystem creada. Repo `.github` con PULL_REQUEST_TEMPLATE.md + bug_report.md + feature_request.md. Dependabot activado. Pendiente: GitHub Projects en dos niveles, plataforma-ops, automatización nativa de Projects. Automatización "En desarrollo": Reusable Workflow en plataforma-core detecta rama feature/N-nombre y mueve tarjeta. Versionado: SemVer + Conventional Commits + release-please + tags para rollback.

*Punto 3 — Uso de IAs:* Claude en Cursor (código), GPT-4o externo (planes maestros), Gemini (auditorías de código masivo), Composer/Sonic (autocompletado). Plan maestro en `docs/plan-maestro.md` de cada repo.

*Punto 4 — Publicación tiendas:* Capacitor sobre la PWA. Apple $99/año + Google $25 único. Build en la nube (Codemagic/Appflow). PWA instalable para apps menos prioritarias. Sin compras in-app (evita comisión).

*Punto 5 (hosting) — VPS OVH + Coolify:* Docker preinstalado. Coolify gratuito (alternativa a Forge/Plesk). Practicar en portátil antes del VPS real. 3 huecos de Coolify: Grafana (alertas CPU, posponer), UptimeRobot (uptime externo, desde inicio), Sentry (logs/errores, desde inicio).

*Punto 6 — Base de datos:* PostgreSQL por VPS (Coolify). Una BD por app. Patrones: 3 (servicio propio) por defecto, 1 (API puntual) para consultas ocasionales, 2 (eventos Redis) para sincronización asíncrona. Casos identificados para cada patrón documentados.

*Punto 7 — Sistema de diseño:* plataforma-ui (repo propio), paquete npm en GitHub Packages. Componentes: Button, Input, Card, Modal, Table, Badge, Toast, EmptyState. Variables CSS (`--color-primary`). WCAG AA incorporado. Vitest para tests.

*Punto 8 — Secretos:* Coolify (producción por app) + GitHub Org Secrets (CI/CD). Convención: `{APP}_{CATEGORIA}_{DETALLE}`. Nunca `.env` real en repo. Sin rotación programada.

*Punto 9 — Testing:* Pest (backend) + Vitest (frontend, especialmente plataforma-ui) + Playwright (e2e camino feliz, un test por app). ~1-2 días de testing por app.

*Punto 10 — Auth/pagos:* Independiente por app (Breeze/Fortify). Sin SSO centralizado. Stripe por app.

*Punto 11 — Legal:* Plantilla base con GPT externo. Secciones fijas RGPD + variable por app. 5 apps con revisión legal puntual: #4, #9, #19, #20, #21.

*Punto 12 — Backups:* Semanal por defecto, manual según actividad (métrica: filas nuevas/día). Coolify también respalda su config. Google Drive vía rclone. Prueba semanal en local.

*Punto 13 — Dominios:* Subdominios al empezar, dominio propio al "graduar".

*Punto 14 — Notificaciones push:* OneSignal (gratuito), una "app" por cada una de las 26.

*Punto 15 — Analítica:* PostHog autoalojado. Un evento clave por app.

*Punto 16 — Feature flags:* Flagsmith autoalojado.

*Punto 17 — Versionado:* SemVer + Conventional Commits + release-please. 0.x hasta 1.0.0. Tags para rollback en Coolify.

*Punto 18 — Presupuesto:* Resuelto por The Dev Hub (app #3).

*Punto 19 — Soporte:* Email único centralizado + formulario en plataforma-ui. Email + GitHub Project para empezar. Aviso Crisp/Tawk.to: revisar límites y añadir a política de privacidad.

*Punto 20 — Identidad marca:* Marca propia por app + paraguas "Nimbus Apps" (PLACEHOLDER). Titularidad legal única. Al vender: ceder lo específico, licenciar el core.

*Punto 21 — Gestión del tiempo:* L-J construcción, V mantenimiento+soporte. No abrir app nueva sin cerrar la actual.

**Decisiones "app por app":**
- Idioma: español únicamente
- Accesibilidad: WCAG AA base (en plataforma-ui), valorar AAA en apps sensibles
- Onboarding: empty state guiado (componente plataforma-ui)
- Pricing beta: 2€ (sin anuncios) o 1€ (con anuncios), pago único de por vida, verificación por teléfono (Twilio/WhatsApp), Stripe modo test
- Pricing estable: freemium con anuncios + suscripción sin anuncios
- Referidos: pago por persona referida con X meses en plan de pago (X por definir)
- Cumplimiento tienda: lenguaje "wellness" para las 5 apps sensibles, anuncios genéricos solo para ellas

---

## ESTADO ACTUAL (última actualización: sesión del 12-13 septiembre 2026)

**Completado:**
- ✅ Cursor instalado y configurado (32 extensiones, settings.json, idioma español)
- ✅ GitHub Organization TicoSystem creada
- ✅ Repo `.github` con plantillas de PR/Issues
- ✅ Dependabot activado en `.github`
- ✅ plataforma-core creado completo (Laravel 13 + PostgreSQL + Vue 3 + Tailwind + PWA + Pinia + Sanctum)
- ✅ Pest instalado (pestphp/pest + pestphp/pest-plugin-laravel --with-all-dependencies)
- ✅ CI en verde verificado (PR #1)
- ✅ Branch protection activa en plataforma-core
- ✅ 3 Reusable Workflows: ci.yml, move-to-in-progress.yml, release-please.yml
- ✅ plataforma-core marcado como Repo Template público en GitHub
- ✅ Documentación en plataforma-core/docs/: plan-de-trabajo.md, checklist.md, memoria-proyecto.md, entorno-de-trabajo.md, prompts-plan-maestro-24-apps-rellenos.md
- ✅ 24 planes maestros generados con ChatGPT (GPT-4o) en plataforma-core/docs/planes-maestros/
- ✅ Estudio de mercado de 24 apps completado

**Pendiente inmediato:**
- ⬜ Paso 4 (Fase 1): crear plataforma-ui
- ⬜ Paso 5 (Fase 1): GitHub Projects en dos niveles + plataforma-ops
- ⬜ Fase 2 completa: Coolify en local → VPS OVH → observabilidad → backups
- ⬜ CONVENTIONS.md (pendiente desde el principio)
- ⬜ Decidir nombre real de la marca paraguas (ahora "Nimbus Apps" como placeholder)
- ⬜ Definir el número exacto de meses para el programa de referidos

---

## REPOSITORIOS CREADOS EN TICOSYSTEM

| Repo | URL | Descripción |
|---|---|---|
| `.github` | github.com/TicoSystem/.github | Plantillas PR/Issues |
| `plataforma-core` | github.com/TicoSystem/plataforma-core | Repo Template (público) |

## ARCHIVOS CLAVE EN PLATAFORMA-CORE

```
plataforma-core/
├── docs/
│   ├── plan-de-trabajo.md
│   ├── checklist.md
│   ├── memoria-proyecto.md
│   ├── memoria-interna-claude.md  ← este archivo
│   ├── entorno-de-trabajo.md
│   ├── prompts-plan-maestro-24-apps-rellenos.md
│   └── planes-maestros/
│       ├── Plan_Maestro_Control_de_Gastos_Personal.md
│       ├── Plan_Maestro_Gestor_de_Suscripciones.md
│       └── ... (24 archivos total)
├── .github/workflows/
│   ├── ci.yml
│   ├── move-to-in-progress.yml
│   └── release-please.yml
├── app/
│   ├── Domain/Ejemplo/{Actions,DTOs,Models}/
│   ├── Http/Controllers/
│   └── Support/
├── resources/js/
│   ├── components/
│   ├── pages/{App.vue,Home.vue}
│   └── stores/
└── ...
```
