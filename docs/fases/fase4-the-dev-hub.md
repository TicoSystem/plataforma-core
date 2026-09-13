# fase4-the-dev-hub.md
# Fase 4 — The Dev Hub (panel de control del portfolio)

> Origen: Puntos 2 (GitHub — tablero) y 18 (Presupuesto) del entorno de trabajo
> The Dev Hub es la app #3 de las 25, construida con el mismo core

---

## ⬜ Pendiente

| Estado | Tarea | Comando / Acción | Para qué sirve |
|---|---|---|---|
| ⬜ | Crear repo desde plataforma-core template | `gh repo create TicoSystem/the-dev-hub --template=TicoSystem/plataforma-core --private` | The Dev Hub es una app más, con el mismo stack |
| ⬜ | Guardar plan maestro | Copiar `docs/planes-maestros/Plan_Maestro_The_Dev_Hub.md` al repo | Contexto de partida para Claude en Cursor |
| ⬜ | Integrar API de GitHub | `composer require github/rest-php` o llamadas directas a la API | Ver issues, minutos de Actions, estado de CI por app |
| ⬜ | Integrar API de Coolify/Sentinel | Llamadas a la API REST de Coolify | CPU/memoria por app en el propio panel |
| ⬜ | Integrar API de PostHog | `composer require posthog/posthog-php` | Usuarios activos y eventos clave por app |
| ⬜ | Integrar API de Sentry | Llamadas a la API REST de Sentry | Errores recientes por app |
| ⬜ | Módulo de gastos | Dominio Gastos con registro manual | VPS, tiendas, dominio, Stripe, Twilio |
| ⬜ | Módulo de ingresos | Dominio Ingresos por app | Ver cuánto genera cada app |
| ⬜ | Motor de recomendaciones | Reglas simples en un servicio de dominio | CPU alta→separar hosting, usuarios crecen→graduar a tienda |
| ⬜ | Backlog de infraestructura | Módulo de mejoras pendientes | Lista de decisiones de infraestructura por tomar |
| ⬜ | Scheduler de Laravel | `app/Console/Kernel.php` + comando de sincronización | Refrescar datos de todas las APIs sin acción manual |

---

## Arquitectura de dominios sugerida

```
app/Domain/
├── GitHub/
│   └── Actions/SyncGitHubDataAction.php
├── Coolify/
│   └── Actions/SyncCoolifyMetricsAction.php
├── PostHog/
│   └── Actions/SyncPostHogEventsAction.php
├── Sentry/
│   └── Actions/SyncSentryErrorsAction.php
├── Gastos/
│   ├── Models/Gasto.php
│   └── Actions/RegistrarGastoAction.php
├── Ingresos/
│   ├── Models/Ingreso.php
│   └── Actions/RegistrarIngresoAction.php
└── Recomendaciones/
    └── Services/MotorRecomendacionesService.php
```

---

## Motor de recomendaciones — reglas simples

```php
// Regla 1: CPU sostenida alta → sugerir separar hosting
if ($app->cpu_promedio_7dias > 80) {
    return "Considera separar {$app->nombre} a su propio VPS";
}

// Regla 2: Usuarios activos creciendo → graduar a tienda
if ($app->usuarios_activos_mes > $app->usuarios_activos_mes_anterior * 1.2) {
    return "Buen momento para publicar {$app->nombre} en las tiendas";
}

// Regla 3: Margen positivo → sugerir inversión
if ($app->ingresos_mes > $app->gastos_mes) {
    $margen = $app->ingresos_mes - $app->gastos_mes;
    return "Tienes {$margen}€ de margen en {$app->nombre}. ¿En qué invertir?";
}
```
