# checklist.md — TicoSystem

> Documento de trabajo/consulta (no es el documento técnico oficial de cada
> paso, que vive en `docs/fases/`). Formato mínimo: `[x]`/`[ ]` con lo
> esencial — comandos, IDs, resultados.

---

## FASE 0 — Puesto de trabajo

### Paso 1 — Editor de código (Cursor) ✅ COMPLETO
> Documento final: `docs/fases/fase0-paso1-cursor.md`

- [x] Instalación: `.deb` desde cursor.com, versión 3.20.10, repo APT
  autoconfigurado (`downloads.cursor.com/aptrepo`)
- [x] Primer arranque: sesión iniciada, `plataforma-core` abre correctamente
- [x] Extensiones: 33 auditadas → 28 finales (desinstaladas 5 de Python sin
  uso: `anysphere.cursorpy`, `ms-python.python`, `ms-python.debugpy`,
  `ms-python.vscode-python-envs`, `anysphere.cursorpyright`)
- [x] `settings.json`: `files.autoSave` → `onFocusChange`; limpiados
  residuos de Python
- [x] Idioma español activo (limitación conocida: menú superior parcial en
  inglés, confirmado en forum.cursor.com, no es error)
- [x] Privacy Mode activo y verificado (ZDR con proveedores; matices de
  Background Agent documentados; no es variante Legacy)
- [x] GitHub conectado (Review Provider: GitHub; Source Control operativo)
- [x] Suscripciones registradas: Claude Pro (no se renueva), Cursor Free
  (activar Pro al caducar Claude Pro), ChatGPT Plus (en revisión)

### Paso 2 — Organización en GitHub (TicoSystem) 🔄 EN CURSO
> Documento final: `docs/fases/fase0-paso2-github.md` (pendiente de crear)

- [ ] Comprobar organización TicoSystem ya creada en github.com/TicoSystem
- [ ] Comprobar repo `.github` con plantillas de PR e Issues
- [ ] Comprobar Dependabot alerts + security updates
- [ ] GitHub Projects en dos niveles (portfolio + por app)
- [ ] `plataforma-ops` — verificar contenido real (ya creado, sin auditar)
- [ ] Automatización nativa de Projects (2 reglas: añadido→Por hacer,
  cerrado→Terminada)

---

*(El resto de fases y pasos se documentan según se retomen, siguiendo el
mismo formato: checklist mínimo aquí, documento técnico completo en
`docs/fases/`.)*
