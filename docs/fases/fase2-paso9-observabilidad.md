# fase2-paso9-observabilidad.md
# Fase 2 — Paso 9: Servicios de observabilidad

> Origen: Puntos 14 (Notificaciones), 15 (Analítica), 16 (Feature flags) del entorno de trabajo

---

## ⬜ Pendiente

| Estado | Tarea | Comando / Acción | Para qué sirve |
|---|---|---|---|
| ⬜ | Crear 26 proyectos en Sentry | sentry.io → New Project (repetir por cada app) | Errores de producción separados por app |
| ⬜ | Integrar SDK de Sentry en plataforma-core | `./vendor/bin/sail composer require sentry/sentry-laravel` | Todas las apps heredan la integración automáticamente |
| ⬜ | Configurar variable SENTRY_DSN | Coolify → App → Environment Variables | Cada app reporta a su propio proyecto de Sentry |
| ⬜ | Crear 50 monitores en UptimeRobot | uptimerobot.com → New Monitor (HTTP, cada 5 min) | Comprobar disponibilidad desde fuera de la infraestructura |
| ⬜ | Instalar PostHog autoalojado | `docker run -d --name posthog posthog/posthog` (o via Coolify) | Analítica de producto para saber si la gente usa las apps |
| ⬜ | Definir un evento clave por app en PostHog | Integrar `posthog-php` + capturar el evento principal de cada app | La métrica que dice "esta app se está usando de verdad" |
| ⬜ | Instalar Flagsmith autoalojado | Via Coolify → Services → Flagsmith | Panel de feature flags para activar/desactivar funciones |
| ⬜ | Crear 26 proyectos en Flagsmith | Panel Flagsmith → Projects → New | Un proyecto por app para gestionar sus flags |
| ⬜ | Crear cuenta OneSignal + 26 "apps" | onesignal.com → New App (repetir por app) | Notificaciones push centralizadas |
| ⬜ | Integrar OneSignal en plataforma-core | `npm install @onesignal/onesignal-vue3` | Todas las apps heredan la integración |

---

## Comandos de referencia

### Instalar SDK de Sentry en Laravel
```bash
./vendor/bin/sail composer require sentry/sentry-laravel
./vendor/bin/sail artisan sentry:publish --dsn=TU_DSN_AQUI
```

### Configuración de Sentry en .env
```env
SENTRY_LARAVEL_DSN=https://xxx@sentry.io/xxx
```

### Instalar PostHog via Coolify
```bash
# En el panel de Coolify → Services → One-click services → PostHog
# O manualmente:
docker pull posthog/posthog:latest
```

### Capturar un evento en Laravel (PostHog)
```php
// En el controlador de la acción principal de cada app
PostHog::capture([
    'distinctId' => auth()->id(),
    'event' => 'gasto_registrado',  // el evento clave de esta app
    'properties' => [
        'categoria' => $gasto->categoria,
    ]
]);
```

### Convención de secretos para estos servicios
```
{APP}_SENTRY_DSN
{APP}_ONESIGNAL_ID
{APP}_POSTHOG_KEY
{APP}_FLAGSMITH_ENV_KEY
```

---

## Notas importantes

- **Sentry**: gratis hasta 5000 errores/mes — suficiente para apps de nicho en fase inicial
- **UptimeRobot**: gratis con 50 monitores y chequeo cada 5 min — cubre las 26 apps
- **PostHog**: autoalojado = gratis sin límite de eventos
- **Flagsmith**: autoalojado = gratis sin límite de peticiones
- **OneSignal**: gratis con límite generoso de notificaciones/mes
- **Grafana**: posponer hasta que alguna app tenga uso real en producción
