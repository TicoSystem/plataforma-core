# metodologia-documentacion-1.md
# Metodología de documentación — TicoSystem (consolidado)

> Documento único con **todos** los acuerdos de proceso tomados en la sesión
> de reescritura de la documentación (14-15/09/2026), para no depender de
> recordar la conversación. Sustituye y amplía a `metodologia-documentacion.md`.

---

## 1. Alcance de "empezar desde cero"

- **El trabajo técnico ya hecho NO se toca ni se rehace**: Cursor, la organización
  TicoSystem, `plataforma-core`, `plataforma-ui` (v0.1.1 publicada), Coolify local.
  No se desinstala ni se borra nada de esto.
- Lo que se rehace **desde cero es la documentación**: se re-verifica cada cosa
  en vivo (con comando ejecutado o captura real) antes de darla por escrita,
  en vez de arrastrar contenido antiguo sin comprobar.
- **"100% real" significa verificado con evidencia**, no repetido físicamente.
  Ejemplo aplicado: para Cursor no se reinstala nada; se ejecutan comandos
  (`dpkg -l | grep cursor`, ver `settings.json` real, etc.) y el documento
  se escribe con lo que esos comandos devuelven de verdad.
- **Nivel de redacción**: cada paso se escribe en modo "cero conocimiento
  previo" — como si el lector (ej. un usuario del centro de día) no tuviera
  nada instalado y no supiera nada del proceso. El detalle es tutorial completo,
  aunque la verificación se apoye en el entorno ya existente de Juan.

## 2. Dónde vive el trabajo

- **Ubicación en el portátil**: `/home/proyecto/` (antes `~/proyectos/`), con
  `sudo mkdir` + `chown` para que Juan sea propietario sin depender de `sudo`
  en el día a día. Ahí viven `plataforma-core`, `plataforma-ui`, `plataforma-ops`.
- **Repo**: se sigue usando `TicoSystem/plataforma-core` en GitHub, no un repo
  nuevo ni una carpeta aparte fuera de Git.
- **Rama de trabajo**: `docs/reescritura-completa`, creada desde `main`. Todo
  lo que se reescribe se acumula ahí antes de tocar `main`.
- **`main` tiene branch protection**: no se puede hacer push directo. El único
  camino para que algo llegue a `https://github.com/TicoSystem/plataforma-core/tree/main/docs`
  es: rama → commits → `git push` → Pull Request → merge.
- **Ritmo de PRs**: se trabaja tranquilos acumulando cambios en la rama; el PR
  a `main` se hace cuando haya un bloque completo y revisado (no un PR por
  cada archivo suelto), salvo que se decida lo contrario más adelante.

## 3. Qué puede leer Claude y qué no

- Claude puede leer directamente (clonando o vía GitHub) cualquier cosa que
  ya esté subida a GitHub, en `main` o en cualquier rama empujada con
  `git push`.
- Claude **no** puede leer lo que solo existe en el portátil de Juan y no se
  ha subido todavía — para eso Juan debe pegarlo/subirlo en el chat, o hacer
  `git push` de la rama primero.
- Claude no tiene credenciales para hacer `git push`, crear Pull Requests, ni
  escribir directamente en el repo de Juan — todo lo que Claude genera se
  entrega como archivo descargable, y es Juan quien lo coloca en su carpeta
  local y hace el commit/push.

## 4. Estructura de documentación por Fase y por Paso

**Documento de Fase**: qué fase es, de qué punto del entorno de trabajo viene
(`> Origen: ...`), descripción de su función, checklist de los pasos que la
componen.

**Documento de Paso**: qué hace, cada comando explicado (en checklist si son
varios), redactado en modo "cero conocimiento previo" (ver punto 1). El `.md`
se actualiza al completar cada tarea o subtarea, no solo al final. En el chat
se explica en detalle qué se está haciendo en cada momento.

## 5. Los 3 documentos al cerrar un paso

1. **Checklist** (trabajo/consulta, no va al repo): tareas `[x]`/`[ ]` con lo
   mínimo — comandos, IDs, resultados.
2. **Checklist con explicaciones** (trabajo/consulta, no va al repo): el mismo
   checklist con la explicación completa debajo de cada tarea (qué es, por qué
   así, cómo se hizo, resultado). Es la fusión entre el documento técnico y la
   transcripción del chat — no la transcripción pegada literal.
3. **Documento final del paso** (el único que sube a `docs/fases/`): versión
   pulida en prosa estructurada, destilada del documento #2. Es el único
   documento técnico — lo usan tanto Juan como los usuarios del centro de día,
   sin versión paralela simplificada.

**Transcripción del chat**: al cerrar el paso, Claude genera un `.md` con la
transcripción **completa** (no resumen) del chat de esa sesión. Juan la
descarga junto con el documento técnico del paso y se la vuelve a pasar a
Claude para generar el documento #2.

## 6. Continuidad entre chats

Si un paso abarca más de un chat, al cambiar de chat Claude entrega:
- **Estado**: qué está confirmado/hecho hasta ese momento
- **Próximo paso**: el siguiente comando o acción concreta a dar

## 7. Capturas de pantalla

Van a la carpeta de Google Drive **`TicoSystem-capturas`**
(https://drive.google.com/drive/folders/1JZd5aDIcemc0cccO1TCjS_UOPYc4KD2A),
no al chat (limitación de subida) ni al repo de Git (para no pesar el
historial). Claude accede a ellas vía el conector de Google Drive ya
verificado y operativo en esta cuenta.

## 8. Nivel de calidad de los documentos

Por defecto, calidad estándar. Se sube el nivel de detalle/presentación (y se
añaden presentaciones si aplica) solo cuando Juan lo pide explícitamente
porque el documento es para el centro de día, para una empresa, o para
documentar una app de cara a la venta.

## 9. Doble propósito del proyecto

- **Uso propio de Juan**: explotar el proyecto (construir/vender las 26 apps)
  y aprender el proceso.
- **Enseñanza**: usuarios de un centro de día, limitados a 2 apps que ellos
  elijan, usando el **mismo** documento técnico — sin versión paralela.

## 10. Fusión en cascada (Paso → Fase → Proyecto)

- Cada paso enlaza a su documento final (#3 de la sección 5).
- Al cerrar todos los pasos de una fase, esos documentos se fusionan en el
  documento de la fase.
- Cada fase enlaza a su documento.
- Al cerrar todas las fases, se crea el documento del proyecto completo,
  fusión de todas las fases.

## 11. Orden de trabajo

Se sigue el orden de `plan-de-trabajo.md`, Fase por Fase, Paso por Paso, sin
saltar adelante. En esta sesión se retomó por **Fase 0, Paso 1 (Cursor)**, sin
avanzar a otros pasos hasta cerrarlo.
