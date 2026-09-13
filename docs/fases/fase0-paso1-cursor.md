# fase0-paso1-cursor.md
# Fase 0 — Paso 1: Editor de código (Cursor)

> Origen: Punto 1 del entorno de trabajo

---

## ✅ Completado

| Estado | Tarea | Comando / Acción | Para qué sirve |
|---|---|---|---|
| ✅ | Descargar Cursor | Descargar `cursor_3.20.10_amd64.deb` desde cursor.com | Editor de código con Claude y GPT integrados |
| ✅ | Instalar Cursor | `sudo apt install ./cursor_3.20.10_amd64.deb` | Instala Cursor como paquete nativo de Ubuntu |
| ✅ | Verificar instalación | `cursor --version` → `3.20.10` | Confirmar que la instalación fue correcta |
| ✅ | Añadir repositorio apt de Cursor | Aceptar "Yes" al instalar (añade actualizaciones automáticas) | Recibir actualizaciones de Cursor via `apt upgrade` |
| ✅ | Iniciar sesión en Cursor | Login con cuenta de GitHub (bojocanales@gmail.com) | Vincular Cursor a la cuenta para el plan Pro |
| ✅ | Desactivar Data Sharing | Settings → General → Privacy Mode activado | Que el código NO se use para entrenar modelos de IA |
| ✅ | Conectar GitHub | Settings → Integrations → Connect GitHub (All repositories) | Cursor puede ver y gestionar los repos de TicoSystem |
| ✅ | Importar configuración de VS Code | IDE view → Settings → General → "Import Settings from VS Code" → Import | Traer atajos, tema y ajustes de VS Code a Cursor |
| ✅ | Instalar 32 extensiones | Panel de Extensions (Ctrl+Shift+X en vista IDE) | Herramientas para PHP/Laravel, Vue, Git, etc. |
| ✅ | Configurar settings.json | Ctrl+Shift+P → "Preferencias: Abrir la configuración de usuario (JSON)" | Prettier, Tailwind, ESLint, word wrap, autoguardado, etc. |
| ✅ | Activar idioma español | Ctrl+Shift+P → "Configure Display Language" → es → Restart | Interfaz de Cursor en español |
| ✅ | Crear alias para Sail | `echo "alias sail='./vendor/bin/sail'" >> ~/.bashrc && source ~/.bashrc` | Escribir `sail` en vez de `./vendor/bin/sail` en cada proyecto |

---

## Configuración del settings.json

```json
{
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000,
  "cSpell.language": "en,es",
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "eslint.validate": ["javascript", "typescript", "vue"],
  "workbench.iconTheme": "material-icon-theme",
  "tailwindCSS.includeLanguages": { "blade": "html" },
  "files.associations": { "*.blade.php": "blade" },
  "[php]": { "editor.defaultFormatter": "open-southeners.laravel-pint" },
  "intelephense.files.maxSize": 3000000,
  "python.languageServer": "Pylance",
  "python.analysis.typeCheckingMode": "basic",
  "editor.wordWrap": "on"
}
```

---

## Extensiones instaladas (32)

### Generales
- `streetsidesoftware.code-spell-checker` — Corrector ortográfico para código
- `streetsidesoftware.code-spell-checker-spanish` — Diccionario español para el corrector
- `ms-ceintl.vscode-language-pack-es` — Interfaz de Cursor en español
- `mikestead.dotenv` — Soporte de sintaxis para archivos .env
- `editorconfig.editorconfig` — Respeta la configuración de .editorconfig
- `usernamehw.errorlens` — Muestra errores inline en el código
- `eamodio.gitlens` — Git supercharged (historial, blame, etc.)
- `github.vscode-pull-request-github` — Gestión de PRs e Issues desde el editor
- `ms-vscode-remote.remote-containers` — Desarrollo dentro de contenedores Docker
- `ms-azuretools.vscode-docker` — Gestión de Docker desde el editor
- `yzhang.markdown-all-in-one` — Todo para escribir Markdown
- `redhat.vscode-yaml` — Soporte de sintaxis YAML
- `christian-kohler.path-intellisense` — Autocompletado de rutas de archivos
- `rangav.vscode-thunder-client` — Cliente REST API integrado en el editor

### Frontend
- `vue.volar` — Soporte oficial de Vue 3
- `bradlc.vscode-tailwindcss` — IntelliSense de clases de Tailwind
- `dbaeumer.vscode-eslint` — Linter de JavaScript/TypeScript/Vue
- `esbenp.prettier-vscode` — Formateador de código
- `formulahendry.auto-rename-tag` — Renombra etiquetas HTML/Vue automáticamente
- `pkief.material-icon-theme` — Iconos de Material Design para el explorador
- `christian-kohler.npm-intellisense` — Autocompletado de paquetes npm
- `yoavbls.pretty-ts-errors` — Errores de TypeScript más legibles

### Backend (PHP / Laravel / Python)
- `laravel.vscode-laravel` — Extensión oficial de Laravel
- `onecentlin.laravel-blade` — Snippets de Laravel Blade
- `amiralizadeh9480.laravel-extra-intellisense` — IntelliSense extra para Laravel
- `open-southeners.laravel-pint` — Formateador PHP con Laravel Pint
- `xdebug.php-debug` — Depurador PHP con Xdebug
- `bmewburn.vscode-intelephense-client` — PHP IntelliSense
- `m1guelpf.better-pest` — Mejor experiencia para correr tests Pest (instalado vía .vsix)
- `ms-python.vscode-pylance` — Análisis de código Python
- `ms-python.python` — Soporte de Python
- `ms-python.vscode-python-envs` — Gestión de entornos virtuales Python

---

## Suscripciones activas

| Herramienta | Plan | Coste | Para qué |
|---|---|---|---|
| ChatGPT | Plus | ~20€/mes | Modo Work, investigación web, planes maestros |
| Cursor | Pro | ~20€/mes | Claude+GPT en el editor |
| Claude.ai | Gratuito | 0€ | Consultas, documentación, decisiones |
