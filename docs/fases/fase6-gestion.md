# fase6-gestion.md
# Fase 6 — Gestión continua

> Origen: Puntos 19 (Soporte), 20 (Gestión del tiempo), 22 (Identidad de marca) del entorno de trabajo

---

## ⬜ Paso 20 — Ritmo de trabajo semanal

| Estado | Tarea | Para qué sirve |
|---|---|---|
| ⬜ | Establecer cadencia L-J/V | Lunes-Jueves: construcción. Viernes: mantenimiento+soporte+portfolio | No dispersarse entre 26 proyectos |
| ⬜ | Usar The Dev Hub como panel de decisión | Abrir The Dev Hub cada viernes para decidir qué app toca la semana siguiente | Tomar decisiones con datos, no por impulso |

### Reglas de trabajo
- **No abrir una app nueva sin cerrar o pausar deliberadamente la actual**
- El Project de portfolio (GitHub) decide qué app toca, no el estado de ánimo del día
- Viernes: revisar Sentry, backups, métricas de Coolify de todas las apps en producción

---

## ⬜ Paso 21 — Soporte al usuario

| Estado | Tarea | Comando / Acción | Para qué sirve |
|---|---|---|---|
| ⬜ | Crear email de soporte | Crear `soporte@nimbusapps.com` (o el nombre real de la marca) | Canal único centralizado para las 26 apps |
| ⬜ | Integrar formulario en plataforma-ui | Añadir componente `ContactForm.vue` a plataforma-ui | Formulario con app, versión y usuario incluidos automáticamente |
| ⬜ | Crear GitHub Project para soporte | TicoSystem → Projects → New (para gestión de tickets) | Issues de soporte etiquetadas por app |
| ⬜ | Distinguir tipos de feedback | Campos "Reportar problema" vs "Sugerir mejora" | Priorizar bugs antes que mejoras |

### Aviso Crisp/Tawk.to
Si el volumen de soporte crece y se añade Crisp o Tawk.to:
- Revisar límites del plan gratuito (nº de agentes/conversaciones)
- Añadir la herramienta a la política de privacidad de cada app
- Tienen plan gratuito pero con límites — no depender de ellos antes de confirmar que encajan

---

## ⬜ Paso 22 — Identidad de marca

| Estado | Tarea | Para qué sirve |
|---|---|---|
| ⬜ | Decidir el nombre real de la marca paraguas | Ahora es "Nimbus Apps" como placeholder — hay que decidir el definitivo |
| ⬜ | Diseñar el logo de la marca paraguas | Para el footer de las apps y la cuenta de desarrollador en las tiendas |
| ⬜ | Aplicar identidad visual por app | Nombre, logo y `--color-primary` propios para cada una de las 26 |

### Estructura de marca
- **Marca propia por app**: nombre, logo, color independiente de cara al usuario
- **Marca paraguas** (discreta): solo en footer ("Hecho por [Marca]") y cuenta de tiendas
- **Titularidad legal**: las 26 apps bajo la misma entidad sin problema
- **Al vender una app**: ceder lo específico, licenciar (no ceder) el core y motores compartidos

---

## ⬜ Paso 23 — CONVENTIONS.md y .cursorrules

| Estado | Tarea | Para qué sirve |
|---|---|---|
| ⬜ | Generar CONVENTIONS.md | Documento con todas las decisiones técnicas para que Claude en Cursor las tenga siempre disponibles |
| ⬜ | Añadir CONVENTIONS.md a plataforma-core | Que todas las apps nuevas lo hereden automáticamente |
| ⬜ | Crear .cursorrules en plataforma-core | Claude en Cursor lee las convenciones automáticamente sin que tengas que recordar pasarlas |

### Contenido mínimo del .cursorrules
```
Antes de cualquier tarea, lee @docs/CONVENTIONS.md y @docs/plan-maestro.md.

Convenciones clave:
- Ramas: feature/N-nombre-de-la-issue
- Commits: Conventional Commits (feat/fix/docs/feat!)
- Secretos: {APP}_{CATEGORIA}_{DETALLE}
- BD: PostgreSQL, una BD por app, patrón 3 por defecto
- Tests: Pest (backend) + Vitest (frontend) + Playwright (e2e camino feliz)
- Idioma: español en toda la UI
- Accesibilidad: WCAG AA base (ya en plataforma-ui)
```
