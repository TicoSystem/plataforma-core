# Documentación — TicoSystem / Plataforma de 26 apps

Índice completo de la documentación del proyecto. Todo lo que necesitas para trabajar en cualquier fase, con cualquier IA.

---

## 📁 Estructura

```
docs/
├── README.md                                    ← este archivo (índice)
├── proyecto/                                    ← información global del proyecto
│   ├── memoria-proyecto.md                      ← info completa para cualquier IA
│   ├── memoria-interna-claude.md                ← exportación de la memoria de Claude
│   ├── entorno-de-trabajo.md                    ← los 21 puntos del entorno de trabajo
│   └── plan-de-trabajo.md                       ← plan global con 6 fases y estado
├── operativo/                                   ← documentos de trabajo del día a día
│   ├── checklist.md                             ← checklist operativo por paso
│   └── prompts-plan-maestro-24-apps-rellenos.md ← prompts para generar planes maestros
├── fases/                                       ← seguimiento detallado por fase y paso
│   ├── fase0-paso1-cursor.md                    ✅ Completado
│   ├── fase0-paso2-github.md                    🔄 En curso
│   ├── fase1-paso3-plataforma-core.md           ✅ Completado
│   ├── fase1-paso4-plataforma-ui.md             ✅ Completado
│   ├── fase1-paso5-automatizacion.md            ⬜ Pendiente
│   ├── fase2-paso6-coolify-local.md             ⬜ Pendiente
│   ├── fase2-paso7-vps-ovh.md                   ⬜ Pendiente
│   ├── fase2-paso8-base-de-datos.md             ⬜ Pendiente
│   ├── fase2-paso9-observabilidad.md            ⬜ Pendiente
│   ├── fase2-paso10-backups.md                  ⬜ Pendiente
│   ├── fase3-convenciones.md                    ⬜ Pendiente
│   ├── fase4-the-dev-hub.md                     ⬜ Pendiente
│   ├── fase5-apps.md                            🔄 Planes maestros generados
│   └── fase6-gestion.md                         ⬜ Pendiente
└── planes-maestros/                             ← 24 planes maestros generados con GPT-4o
    ├── Plan_Maestro_Control_de_Gastos_Personal.md
    ├── Plan_Maestro_Gestor_de_Suscripciones.md
    └── ... (24 archivos total)
```

---

## 🚀 Estado global

```
✅ Fase 0 — Puesto de trabajo (parcialmente completada)
   ✅ Paso 1: Cursor instalado y configurado
   🔄 Paso 2: GitHub Organization (en curso)

🔄 Fase 1 — Núcleo técnico reutilizable (en curso)
   ✅ Paso 3: plataforma-core (github.com/TicoSystem/plataforma-core)
   ✅ Paso 4: plataforma-ui v0.1.1 (github.com/TicoSystem/plataforma-ui)
   ⬜ Paso 5: Automatización GitHub Projects

⬜ Fase 2 — Infraestructura y hosting
⬜ Fase 3 — Convenciones transversales
⬜ Fase 4 — The Dev Hub
🔄 Fase 5 — Por cada app nueva (24 planes maestros generados)
⬜ Fase 6 — Gestión continua
```

---

## 🔗 Links de referencia rápida

| Recurso | URL |
|---|---|
| Organización GitHub | https://github.com/TicoSystem |
| plataforma-core | https://github.com/TicoSystem/plataforma-core |
| plataforma-ui | https://github.com/TicoSystem/plataforma-ui |
| GitHub Packages | https://github.com/orgs/TicoSystem/packages |
| Memoria del proyecto (raw) | https://raw.githubusercontent.com/TicoSystem/plataforma-core/main/docs/proyecto/memoria-proyecto.md |

---

## 📋 Para arrancar con una nueva IA

1. Lee primero [`proyecto/memoria-proyecto.md`](./proyecto/memoria-proyecto.md) — tiene todo el contexto del proyecto
2. Consulta [`proyecto/plan-de-trabajo.md`](./proyecto/plan-de-trabajo.md) para saber en qué fase estamos
3. Abre el archivo de la fase actual en `fases/` para ver el detalle de lo que queda
4. Si vas a construir una app nueva, lee el plan maestro de esa app en `planes-maestros/`

---

## ⚠️ Instrucciones para cualquier IA que trabaje en este proyecto

- Antes de empezar, lee `proyecto/memoria-proyecto.md` y el archivo de la fase actual
- Al terminar cada sesión, actualiza el archivo de la fase con el progreso (cambiar ⬜ por ✅)
- Actualiza también `proyecto/plan-de-trabajo.md` con el estado global
- Si tomas una nueva decisión técnica importante, añádela a `proyecto/memoria-proyecto.md`
- Usa siempre Conventional Commits: `feat/fix/docs/feat!`
- Nunca hagas push directo a main — siempre vía PR
