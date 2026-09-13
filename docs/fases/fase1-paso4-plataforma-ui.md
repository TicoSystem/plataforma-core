# fase1-paso4-plataforma-ui.md
# Fase 1 — Paso 4: Crear `plataforma-ui`

> Documento vivo — se actualiza al completar cada tarea.

---

## Preparación previa (fuera del checklist)

| Estado | Tarea | Para qué sirve |
|---|---|---|
| ✅ | Instalar Node.js v24 + npm v11 vía nvm | Necesario para crear y gestionar el paquete npm |
| ✅ | Crear carpeta `~/proyectos/plataforma-ui` | Carpeta local del proyecto |
| ✅ | `npm init -y` | Genera el `package.json` base |
| ✅ | `npm install vue@latest` | Vue 3 como dependencia principal |
| ✅ | `npm install -D vite @vitejs/plugin-vue` | Vite para compilar los componentes |
| ✅ | `npm install -D vitest` | Framework de tests para los componentes |
| ✅ | Configurar `package.json` como paquete `@ticosystem/plataforma-ui` v0.1.0 | Nombre, versión, punto de entrada y exports del paquete |

---

## Lo que queda (del checklist.md — Paso 4)

### Configuración base
| Estado | Tarea | Para qué sirve |
|---|---|---|
| ✅ | Crear estructura de carpetas (`src/components`, `src/styles`) | Organización del código del paquete |
| ✅ | Crear `src/index.js` | Punto de entrada que exporta todos los componentes |
| ✅ | Crear `vite.config.js` en modo librería | Compilar los componentes Vue como librería instalable, no como app |

### Componentes Vue
| Estado | Tarea | Para qué sirve |
|---|---|---|
| ✅ | Crear componente `Button.vue` | Botón reutilizable con variantes (primary, secondary, danger) |
| ✅ | Crear componente `Input.vue` | Campo de texto con validación y estados de error |
| ✅ | Crear componente `Card.vue` | Contenedor de tarjeta estándar |
| ✅ | Crear componente `Modal.vue` | Ventana emergente con Teleport y cierre al hacer clic fuera |
| ✅ | Crear componente `Table.vue` | Tabla de datos con slots para personalizar columnas |
| ✅ | Crear componente `Badge.vue` | Etiqueta de estado (ej. "activo", "pendiente") |
| ✅ | Crear componente `Toast.vue` | Notificación temporal (éxito, error, aviso) |
| ✅ | Crear componente `EmptyState.vue` | Pantalla vacía con mensaje guiado (onboarding de cada app) |

### Estilos y accesibilidad
| Estado | Tarea | Para qué sirve |
|---|---|---|
| ✅ | Configurar variables CSS de tema (`--color-primary`, etc.) | Que cada app cambie solo sus colores sin tocar los componentes |
| ✅ | Incorporar WCAG AA en todos los componentes | Accesibilidad propagada a las 26 apps de una vez |

### Tests
| Estado | Tarea | Para qué sirve |
|---|---|---|
| ✅ | Instalar  +  | Entorno de test para componentes Vue (necesario para Vitest) |
| ✅ | Actualizar script  en  a  | Que  ejecute Vitest |
| ✅ | Cambiar  a  en  | Eliminar warning de CommonJS en Vitest |
| ✅ | Crear test de ejemplo con Vitest para Button.vue | Verificar que el componente más básico funciona |
| ✅ | Configurar `vitest.config.js` | Que el CI pueda correr los tests de los componentes |

### Publicación en GitHub
| Estado | Tarea | Para qué sirve |
|---|---|---|
| ✅ | Rellenar `src/index.js` con todos los exports | Punto de entrada del paquete que exporta todos los componentes |
| ✅ | Corregir `vite.config.js` con `import.meta.url` | Eliminar warning de `__dirname` en modo ESM |
| ✅ | Crear `.gitignore` (node_modules, dist) | Evitar subir dependencias y build al repo |
| ✅ | Branch protection activa en plataforma-ui | PR obligatorio + CI en verde antes de fusionar |
| ✅ | Añadir workflow CI (`.github/workflows/ci.yml`) | Tests + build automáticos en cada PR |
| ✅ | Añadir workflow Publish (`.github/workflows/publish.yml`) | Publicar en GitHub Packages al crear un tag v* |
| ✅ | Corregir nombre del paquete a `@ticosystem/plataforma-ui` | Sin el scope npm publica en npmjs.org en vez de GitHub Packages |
| ✅ | Crear repo `TicoSystem/plataforma-ui` en GitHub | Versionado y CI/CD del paquete |
| ✅ | Subir el código inicial vía PR | Primer commit siguiendo el flujo estándar |
| ✅ | Configurar GitHub Packages en el repo | Que las 26 apps lo instalen como dependencia con `npm install @ticosystem/plataforma-ui` |
| ✅ | Añadir `.npmrc` con la configuración de GitHub Packages | Apuntar npm al registro de TicoSystem en GitHub |
| ✅ | Publicar versión `0.1.1` | Primera versión instalable por las apps (0.1.0 falló por falta de scope, 0.1.1 publicada correctamente) |
