# Fase 0, Paso 1 — Editor de código (Cursor)

> **Origen**: Punto 1 (Editor de código) del plan de trabajo
> **Estado**: ✅ Completado

## Qué es este paso

Instalar y configurar **Cursor**, el editor de código donde se escribe todo
el código de las 26 apps de TicoSystem. Cursor es un editor basado en
Visual Studio Code, con modelos de IA (Claude, GPT, Grok) integrados
directamente en el flujo de escritura de código.

## Para qué sirve

Sin un editor configurado no se puede empezar a programar nada. Este paso
deja listo el entorno de trabajo diario: el programa instalado, sus
herramientas adicionales (extensiones), sus preferencias (idioma, guardado
automático), su configuración de privacidad, y su conexión con GitHub para
poder trabajar con los repositorios del proyecto.

---

## 1. Instalación

Cursor se instala en Ubuntu descargando un paquete `.deb` directamente
desde [cursor.com](https://cursor.com) — no hace falta añadir ningún
repositorio APT a mano, como sugieren algunas guías desactualizadas. El
propio instalador registra automáticamente el repositorio oficial de
Cursor en el sistema (`https://downloads.cursor.com/aptrepo`), así que las
actualizaciones futuras se hacen con el flujo estándar de Ubuntu:

```bash
sudo apt update && sudo apt upgrade
```

**Pasos para instalar desde cero:**

1. Entra a `https://cursor.com` y descarga el archivo `.deb` para Linux
   (ej. `cursor_3.20.10_amd64.deb` — el número de versión cambia con el
   tiempo).
2. Instálalo con:
   ```bash
   cd ~/Descargas
   sudo apt install ./cursor_3.20.10_amd64.deb -y
   ```
   El `./` delante del nombre es necesario para que `apt` entienda que es
   una ruta a un archivo local y no el nombre de un paquete de un
   repositorio. Si dice "fichero no admitido", comprueba la ruta real con
   `find ~ -iname "cursor*.deb" 2>/dev/null`.
3. Verifica que quedó instalado:
   ```bash
   cursor --version
   ```

## 2. Primer arranque

Al abrir Cursor por primera vez en una instalación limpia, aparece un
asistente de bienvenida que ofrece importar la configuración de VS Code,
elegir tema y atajos de teclado, e iniciar sesión. Si Cursor ya se usó
antes en esa máquina, este asistente no aparece — se entra directamente a
la pantalla de inicio con los proyectos recientes.

Inicia sesión con tu cuenta (GitHub, Google o email) para poder usar las
funciones de IA y sincronizar configuración.

## 3. Extensiones

Cursor hereda el ecosistema de extensiones de VS Code. Para un proyecto
Laravel + Vue como TicoSystem, las extensiones necesarias cubren estas
áreas:

- **PHP y Laravel**: Intelephense (autocompletado/análisis de PHP),
  Xdebug (depuración), Laravel Pint (formateo), Laravel Blade, Laravel
  IntelliSense, Better Pest (testing)
- **Vue**: Volar (soporte de lenguaje para archivos `.vue`), Tailwind CSS
  IntelliSense
- **Calidad de código**: ESLint, Prettier, EditorConfig, Error Lens
  (errores en línea), Code Spell Checker (con diccionario en español)
- **Git y GitHub**: GitLens, GitHub Pull Requests
- **Contenedores**: Docker, Dev Containers — necesarias porque el backend
  usa **Laravel Sail**, que funciona sobre Docker
- **Otros**: YAML, npm IntelliSense, Material Icon Theme, paquete de
  idioma español

Revisa periódicamente qué extensiones tienes instaladas
(`Ctrl+Mayús+X`) y desinstala las que no correspondan al stack del
proyecto — por ejemplo, el soporte de Python no aporta nada si el
proyecto es 100% Laravel + Vue.

**Nota sobre validación de PHP:** si el editor avisa que no encuentra una
instalación de PHP para validar sintaxis, es normal si trabajas con
Laravel Sail — el intérprete de PHP vive dentro de un contenedor Docker,
no en tu máquina. El aviso se resuelve por sí solo una vez que levantas
Sail (`./vendor/bin/sail up`) para el proyecto en cuestión.

## 4. Configuración (`settings.json`)

El archivo de configuración de usuario se abre con
`Ctrl+Mayús+P` → "Open User Settings (JSON)". Ajustes recomendados para
este stack:

```json
{
  "files.autoSave": "onFocusChange",
  "cSpell.language": "en,es",
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "eslint.validate": ["javascript", "typescript", "vue"],
  "workbench.iconTheme": "material-icon-theme",
  "tailwindCSS.includeLanguages": {
    "blade": "html"
  },
  "files.associations": {
    "*.blade.php": "blade"
  },
  "[php]": {
    "editor.defaultFormatter": "open-southeners.laravel-pint"
  },
  "intelephense.files.maxSize": 3000000,
  "editor.wordWrap": "on"
}
```

**Sobre el autoguardado (`files.autoSave`):** existen cuatro modos —
`off` (manual), `afterDelay` (guarda tras un retraso fijo mientras
escribes), `onFocusChange` (guarda al cambiar de pestaña/ventana), y
`onWindowChange`. Se recomienda `onFocusChange` en proyectos con Vite
(hot module reload), ya que `afterDelay` provoca recargas constantes del
navegador mientras se escribe código a medias.

## 5. Idioma

El paquete de idioma español (`ms-ceintl.vscode-language-pack-es`) se
activa desde `Ctrl+Mayús+P` → "Configure Display Language" → `es`.

**Limitación conocida:** al ser Cursor un fork de VS Code, las etiquetas
del menú superior (`File`, `Edit`, `Selection`, `View`, `Go`, `Help`)
permanecen en inglés incluso con el idioma español activo y correctamente
configurado — están fijadas en el propio código de Cursor y no dependen
del paquete de idioma. Es un comportamiento documentado y esperado por el
propio equipo de Cursor (forum.cursor.com), no un error de instalación.
Los submenús desplegables sí se traducen correctamente.

## 6. Privacy Mode

Se activa en `Cursor Settings > Privacy`. Con Privacy Mode activado:

- El código nunca es almacenado por los proveedores de modelos de IA ni
  usado para entrenamiento — Cursor aplica acuerdos de retención cero de
  datos (ZDR) con todos los proveedores (OpenAI, Anthropic, Google, xAI).
- Codebase Indexing sigue funcionando, almacenando solo embeddings
  cifrados y metadatos (no el código real), con rutas de archivo
  ofuscadas.
- **Matiz importante:** la garantía es "no se usa para entrenar", no
  "cero almacenamiento absoluto" — Cursor puede seguir almacenando algún
  dato de código para ofrecer funciones concretas como Background Agent.
  Además, los proveedores de modelos pueden ejecutar clasificadores de
  riesgo; si un prompt activa un detector de abuso, esos datos podrían
  almacenarse temporalmente para investigación.
- Existe una variante antigua "Privacy Mode (Legacy)" en la que
  Background Agent queda deshabilitado. Comprueba en el desplegable de
  configuración que no aparece la palabra "Legacy" para tener la versión
  actual sin esa restricción.
- Si usas una API key propia de un proveedor de modelos (en vez de la
  infraestructura de Cursor), el acuerdo ZDR no aplica a esos datos.

## 7. Conectar GitHub

En `Cursor Settings > Git & PRs`, el ajuste "Review Provider" debe estar
en **GitHub** (frente a otras opciones como Graphite). Con esto activo,
Cursor puede:

- Reconocer y trabajar con repos de tu organización de GitHub
- Marcar commits y Pull Requests como hechos con Cursor (atribución)
- Mostrar el estado de Git en el panel "Source Control"
  (`Ctrl+Mayús+G`): archivos modificados, historial de commits, ramas
  remotas sincronizadas

Si no aparece conectado, se inicia sesión con GitHub desde ese mismo
panel de ajustes.

## 8. Suscripciones a considerar

Cursor por sí solo (en su plan Pro) ya da acceso a varios modelos de IA
dentro del propio editor (Claude, GPT, Grok), lo que puede hacer
redundante mantener suscripciones independientes a otras apps de IA para
tareas de programación. Dos matices a tener en cuenta antes de
consolidar todo en Cursor:

- **Memoria entre conversaciones:** Cursor no tiene memoria automática de
  usuario entre chats — puede leer un archivo de memoria de proyecto
  (ej. `docs/proyecto/memoria-proyecto.md`) si existe y se mantiene
  actualizado, pero no recuerda nada por sí mismo sin ese archivo. Apps
  externas con memoria persistente (como Claude) sí lo hacen de forma
  automática.
- **Modo de investigación dedicado:** algunas apps de IA ofrecen un modo
  específico de investigación profunda (Deep Research), más exhaustivo
  que simplemente preguntarle al modelo dentro de Cursor.

---

## Resultado de este paso

Cursor queda instalado, actualizado, con las extensiones del stack
correctas (sin sobrantes de otros lenguajes), configurado con
autoguardado adecuado a Vite, en español (con la limitación conocida del
menú principal), con Privacy Mode activo, y conectado a GitHub —
operativo para empezar a trabajar en el resto del proyecto.
