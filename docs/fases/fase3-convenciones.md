# fase3-convenciones.md
# Fase 3 — Convenciones transversales

> Origen: Puntos 8 (Secretos), 9 (Testing), 10 (Auth), 11 (Legal), 14 (Tiendas) del entorno de trabajo

---

## ⬜ Paso 11 — Gestión de secretos

| Estado | Tarea | Comando / Acción | Para qué sirve |
|---|---|---|---|
| ⬜ | Configurar GitHub Organization Secrets | TicoSystem → Settings → Secrets and variables → Actions | Tokens que necesita CI/CD disponibles para todos los repos |
| ⬜ | Crear CORE_NPM_TOKEN | Organization Secrets → New secret → CORE_NPM_TOKEN | Para que el CI publique paquetes en GitHub Packages |
| ⬜ | Generar CONVENTIONS.md | Crear `docs/CONVENTIONS.md` en plataforma-core | Todas las decisiones técnicas accesibles para Claude en Cursor |
| ⬜ | Configurar .cursorrules | Crear `.cursorrules` en plataforma-core | Claude en Cursor lee las convenciones automáticamente al abrir el proyecto |
| ⬜ | Actualizar .env.example | Añadir todas las variables necesarias con comentarios | Plantilla para configurar una app nueva |

### Convención de nombres de secretos
```
{APP}_{CATEGORIA}_{DETALLE}

Ejemplos:
GASTOS_DB_PASSWORD
GASTOS_SENTRY_DSN
GASTOS_ONESIGNAL_ID
CORE_NPM_TOKEN
```

### Contenido de CONVENTIONS.md (resumen)
```markdown
# Convenciones técnicas — TicoSystem

## Secretos
- Convención: {APP}_{CATEGORIA}_{DETALLE}
- Nunca .env real en el repo
- Coolify gestiona los secretos de producción

## Base de datos
- PostgreSQL, una BD por app
- Patrón 3 (servicio propio) por defecto

## Ramas
- feature/N-nombre-de-la-issue

## Commits
- Conventional Commits: feat/fix/docs/feat!

## Accesibilidad
- WCAG AA base en todos los componentes de plataforma-ui
```

---

## ⬜ Paso 12 — Testing

| Estado | Tarea | Comando / Acción | Para qué sirve |
|---|---|---|---|
| ⬜ | Mejorar ExampleTest.php en plataforma-core | Escribir un test real de la app base | Test de referencia para las 26 apps |
| ⬜ | Añadir scaffolding de Playwright | `npm install -D @playwright/test` + `playwright.config.js` | E2e del camino feliz listo para cada app nueva |
| ⬜ | Verificar CI completo (Pest + Vitest + Playwright) | Abrir un PR de prueba y comprobar que corren los 3 | Red de seguridad completa funcionando |

### Comandos de testing
```bash
# Correr tests de Pest
./vendor/bin/sail artisan test
# o
./vendor/bin/sail vendor/bin/pest

# Correr tests de Vitest
npm run test

# Correr tests de Playwright
npx playwright test
```

---

## ⬜ Paso 13 — Autenticación y legal

| Estado | Tarea | Comando / Acción | Para qué sirve |
|---|---|---|---|
| ⬜ | Añadir Laravel Breeze a plataforma-core | `./vendor/bin/sail composer require laravel/breeze --dev` + `sail artisan breeze:install vue` | Sistema de auth base (registro, login, reset) |
| ⬜ | Generar plantilla de privacidad con GPT | Usar el prompt estándar con GPT-4o externo | Base legal reutilizable para las 26 apps |
| ⬜ | Generar plantilla de términos con GPT | Usar el prompt estándar con GPT-4o externo | Términos de servicio reutilizables |

### 5 apps con revisión legal puntual obligatoria (abogado)
- App #4: Diario Fitness y Calorías
- App #9: Fisioterapia Híbrida
- App #19: Diario de Lactancia y Crianza
- App #20: Diario de Síntomas y Medicación
- App #21: Organizador de Custodia Compartida

---

## ⬜ Paso 14 — Publicación en tiendas

| Estado | Tarea | Comando / Acción | Para qué sirve |
|---|---|---|---|
| ⬜ | Crear cuenta Apple Developer | developer.apple.com → Enroll ($99/año) | Publicar en App Store — una cuenta para las 26 apps |
| ⬜ | Crear cuenta Google Play Console | play.google.com/console → Register ($25 único) | Publicar en Google Play — una cuenta para las 26 apps |
| ⬜ | Instalar Capacitor en plataforma-core | `npm install @capacitor/core @capacitor/cli` | El puente que convierte la PWA en app nativa |
| ⬜ | Inicializar Capacitor | `npx cap init` → nombre y bundle ID | Configuración base de Capacitor |
| ⬜ | Añadir plataformas | `npx cap add ios && npx cap add android` | Genera los proyectos nativos iOS y Android |
| ⬜ | Configurar Codemagic | codemagic.io → New app → conectar repo | Build en la nube sin necesitar Mac físico |
| ⬜ | Hacer build de prueba | `npx cap sync && codemagic build` | Verificar que Capacitor funciona antes de usarlo en apps reales |
