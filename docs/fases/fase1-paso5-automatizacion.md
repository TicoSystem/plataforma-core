# fase1-paso5-automatizacion.md
# Fase 1 — Paso 5: Automatización de GitHub Projects y CI/CD

> Origen: Punto 2 (GitHub — automatización) del entorno de trabajo

---

## ⬜ Pendiente

| Estado | Tarea | Comando / Acción | Para qué sirve |
|---|---|---|---|
| ⬜ | Crear GitHub Project de portfolio | TicoSystem → Projects → New Project (Table) | Ver el estado de las 26 apps de un vistazo sin abrir cada repo |
| ⬜ | Añadir las 26 apps como ítems | Añadir items manualmente o vía gh CLI | Tener todas las apps representadas en el tablero |
| ⬜ | Configurar columnas y campos | Columnas: Por hacer/En desarrollo/En revisión/Terminada + campo "App" | Poder filtrar por app y ver el estado global |
| ⬜ | Activar regla "Item added → Por hacer" | Project → Workflows → "Item added to project" → set field Status = Por hacer | Toda issue nueva empieza en la columna correcta |
| ⬜ | Activar regla "PR merged → Terminada" | Project → Workflows → "Pull request merged" → set field Status = Terminada | Al fusionar un PR la tarjeta se mueve sola |
| ⬜ | Obtener PROJECT_ID y STATUS_FIELD_ID | `gh project field-list N --owner TicoSystem --format json` | Necesarios para el workflow move-to-in-progress.yml |
| ⬜ | Actualizar move-to-in-progress.yml | Editar plataforma-core con los IDs reales del Project | Que al crear rama feature/N la tarjeta se mueva a "En desarrollo" |
| ⬜ | Crear repo `plataforma-ops` | `gh repo create TicoSystem/plataforma-ops --private` | Repositorio de scripts de automatización para las 26 apps |
| ⬜ | Crear script de revisión de backlog | Script Python/bash en plataforma-ops | Ver estado del backlog de las 26 apps de golpe |
| ⬜ | Crear script de actualización del core | Script en plataforma-ops | Bumpar plataforma-core en todas las apps con un comando |

---

## Comandos de referencia

### Obtener IDs del Project
```bash
# Listar Projects de la organización
gh project list --owner TicoSystem

# Ver los campos de un Project concreto (sustituir N por el número del Project)
gh project field-list N --owner TicoSystem --format json | jq '.fields[] | {id, name}'

# Obtener las opciones de un campo de tipo Single Select (ej. columnas "Status")
gh project field-list N --owner TicoSystem --format json | \
  jq '.fields[] | select(.name=="Status") | .options'
```

### Workflow move-to-in-progress.yml (con IDs reales)
```yaml
# Una vez obtenidos los IDs, actualizar en plataforma-core:
# .github/workflows/move-to-in-progress.yml

name: Mover issue a En desarrollo
on:
  create:
jobs:
  move-card:
    if: github.ref_type == 'branch' && startsWith(github.ref_name, 'feature/')
    runs-on: ubuntu-latest
    steps:
      - name: Extraer número de issue
        id: extract
        run: |
          ISSUE_NUM=$(echo "${{ github.ref_name }}" | grep -oP '(?<=feature/)\d+')
          echo "issue=$ISSUE_NUM" >> $GITHUB_OUTPUT

      - name: Mover tarjeta a En desarrollo
        if: steps.extract.outputs.issue != ''
        run: |
          # Sustituir PROJECT_ID, FIELD_ID y OPTION_ID con los valores reales
          ITEM_ID=$(gh api graphql -f query='
            query($owner:String!, $number:Int!, $issue:Int!) {
              organization(login:$owner) {
                projectV2(number:$number) {
                  items(first:100) {
                    nodes {
                      id
                      content { ... on Issue { number } }
                    }
                  }
                }
              }
            }' -f owner=TicoSystem -F number=PROJECT_NUMBER -F issue=${{ steps.extract.outputs.issue }} \
            --jq '.data.organization.projectV2.items.nodes[] | select(.content.number==$issue) | .id')

          gh api graphql -f query='
            mutation($project:ID!, $item:ID!, $field:ID!, $value:String!) {
              updateProjectV2ItemFieldValue(input:{
                projectId:$project, itemId:$item,
                fieldId:$field, value:{singleSelectOptionId:$value}
              }) { projectV2Item { id } }
            }' \
            -f project=PROJECT_ID \
            -f item=$ITEM_ID \
            -f field=STATUS_FIELD_ID \
            -f value=EN_DESARROLLO_OPTION_ID
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Crear el repo plataforma-ops
```bash
# Crear el repo
gh repo create TicoSystem/plataforma-ops --private --description "Scripts de automatización para las 26 apps de TicoSystem"

# Clonar localmente
git clone https://github.com/TicoSystem/plataforma-ops ~/proyectos/plataforma-ops
cd ~/proyectos/plataforma-ops

# Estructura sugerida
mkdir -p scripts docs
touch scripts/verify_backlog.py
touch scripts/update_core.sh
touch README.md
```

---

## Notas importantes

- Los IDs del Project (PROJECT_ID, STATUS_FIELD_ID, EN_DESARROLLO_OPTION_ID) solo se conocen una vez creado el Project — por eso este paso viene después de crear el Project
- Las 2 reglas nativas (Item added → Por hacer, PR merged → Terminada) se configuran sin código, desde la interfaz web del Project
- La regla "En desarrollo" sí requiere el Reusable Workflow porque GitHub Projects no tiene disparador nativo para "se creó una rama"
