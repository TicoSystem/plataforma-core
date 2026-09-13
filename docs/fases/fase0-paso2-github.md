# fase0-paso2-github.md
# Fase 0 — Paso 2: Organización en GitHub (TicoSystem)

> Origen: Punto 2 del entorno de trabajo

---

## ✅ Completado

| Estado | Tarea | Comando / Acción | Para qué sirve |
|---|---|---|---|
| ✅ | Crear GitHub Organization | github.com → "+" → New organization → Free → nombre: TicoSystem | Separar los 26 repos de la cuenta personal JuanBojo |
| ✅ | Crear repo `.github` | `gh repo create TicoSystem/.github` o desde la web | Plantillas que se aplican automáticamente a todos los repos de TicoSystem |
| ✅ | Crear PULL_REQUEST_TEMPLATE.md | Crear `.github/PULL_REQUEST_TEMPLATE.md` en el repo `.github` | Checklist estándar en cada PR (tests, Conventional Commits, docs) |
| ✅ | Crear bug_report.md | Crear `.github/ISSUE_TEMPLATE/bug_report.md` | Plantilla para reportar bugs con todos los datos necesarios |
| ✅ | Crear feature_request.md | Crear `.github/ISSUE_TEMPLATE/feature_request.md` | Plantilla para proponer nuevas funciones |
| ✅ | Activar Dependabot alerts | Settings repo `.github` → Advanced Security → Dependabot alerts → Enable | Avisos de vulnerabilidades en dependencias |
| ✅ | Activar Dependabot security updates | Settings repo `.github` → Advanced Security → Dependabot security updates → Enable | PRs automáticos para arreglar vulnerabilidades |

## ⬜ Pendiente

| Estado | Tarea | Comando / Acción | Para qué sirve |
|---|---|---|---|
| ⬜ | Crear GitHub Project de portfolio | TicoSystem → Projects → New Project | Ver el estado de las 26 apps de un vistazo |
| ⬜ | Configurar columnas del Project | Por hacer / En desarrollo / En revisión / Terminada | Flujo estándar de trabajo para todas las apps |
| ⬜ | Activar regla "Item added → Por hacer" | Project → Workflows → Item added to project | Toda issue nueva empieza en la columna correcta |
| ⬜ | Activar regla "PR merged → Terminada" | Project → Workflows → Pull request merged | Al fusionar un PR la tarjeta se mueve sola |
| ⬜ | Obtener IDs del Project para el workflow | `gh project field-list PROJECT_NUMBER --owner TicoSystem` | Necesarios para configurar move-to-in-progress.yml |
| ⬜ | Actualizar move-to-in-progress.yml con IDs | Editar `plataforma-core/.github/workflows/move-to-in-progress.yml` | Que la automatización "En desarrollo" funcione de verdad |
| ⬜ | Crear repo `plataforma-ops` | `gh repo create TicoSystem/plataforma-ops --private` | Scripts que operan sobre las 26 repos a la vez |
| ⬜ | Crear script de revisión de backlog | Crear `scripts/verify_backlog.py` en plataforma-ops | Ver el estado del backlog de todas las apps de golpe |
| ⬜ | Crear script de actualización del core | Crear `scripts/update_core.sh` en plataforma-ops | Bumpar plataforma-core en todas las apps con un comando |

---

## Contenido de las plantillas

### PULL_REQUEST_TEMPLATE.md
```markdown
## Qué hace este cambio


## Checklist
- [ ] Los tests pasan en local
- [ ] He seguido la convención de Conventional Commits
- [ ] He actualizado la documentación si aplica
```

### ISSUE_TEMPLATE/bug_report.md
```markdown
---
name: Bug report
about: Reportar un fallo o comportamiento inesperado
labels: bug
---

## Descripción del problema

## Pasos para reproducirlo
1.
2.
3.

## Comportamiento esperado

## Comportamiento actual
```

### ISSUE_TEMPLATE/feature_request.md
```markdown
---
name: Feature request
about: Proponer una función nueva o una mejora
labels: enhancement
---

## Qué se necesita

## Por qué es útil

## Posible solución (opcional)
```

---

## Automatización de tarjetas en GitHub Projects

### Cómo funciona el flujo completo
```
Issue creada           → columna "Por hacer"     (regla nativa)
Rama feature/N creada  → columna "En desarrollo" (Reusable Workflow)
PR abierto             → columna "En revisión"   (regla nativa)
PR mergeado            → columna "Terminada"      (regla nativa)
```

### Convención de nombre de ramas
```
feature/N-nombre-de-la-issue
Ejemplo: feature/42-modelo-gasto
```

---

## Comandos útiles de gh CLI

```bash
# Ver todos los repos de la organización
gh repo list TicoSystem

# Crear un repo nuevo desde el template
gh repo create TicoSystem/{nombre-app} --template=TicoSystem/plataforma-core --private

# Ver el estado de los workflows de un repo
gh run list --repo TicoSystem/{nombre-app}

# Crear un PR
gh pr create --title "feat: descripción" --body "Closes #N"

# Fusionar un PR
gh pr merge N --squash

# Ver campos de un Project
gh project field-list PROJECT_NUMBER --owner TicoSystem
```

---

## Límites gratuitos de GitHub (confirmados)

| Recurso | Límite gratuito | Uso actual |
|---|---|---|
| API REST/GraphQL | Sin coste (solo rate limits) | Dentro del límite |
| GitHub Actions | 2000 min/mes en repos privados | Dentro del límite |
| GitHub Packages | 500MB almacenamiento + 1GB transferencia/mes | Dentro del límite |
