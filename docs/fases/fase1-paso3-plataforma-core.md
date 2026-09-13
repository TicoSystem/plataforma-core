# Fase 1 — Paso 3: Crear `plataforma-core`

## ✅ Lo que ya hemos hecho

### 1. Crear el proyecto Laravel con Sail
```bash
cd ~/proyectos
curl -s "https://laravel.build/plataforma-core" | bash
cd plataforma-core
```

### 2. Cambiar MySQL por PostgreSQL
- Reemplazado el `compose.yml` completo — eliminados MySQL, Meilisearch,
  Selenium; solo quedan PostgreSQL, Redis y Mailpit
- Actualizado el `.env`:
  - `APP_URL=http://localhost`
  - `DB_CONNECTION=pgsql`
  - `DB_HOST=pgsql`
  - `DB_PORT=5432`
  - `DB_DATABASE=plataforma_core`
  - Eliminadas las variables de Meilisearch
- Levantados los contenedores y comprobado que Laravel 13 funciona
  en `http://localhost` con PostgreSQL ✅

### 3. Instalar Vue 3 + Vite
```bash
./vendor/bin/sail npm install
./vendor/bin/sail npm install vue@latest @vitejs/plugin-vue
```
- Configurado `vite.config.js` con el plugin de Vue ✅

### 4. Configurar Tailwind CSS
```bash
./vendor/bin/sail npm install -D tailwindcss @tailwindcss/vite
```
- Añadido plugin de Tailwind en `vite.config.js` ✅
- Actualizado `resources/css/app.css` con `@import "tailwindcss"` ✅

### 5. Configurar PWA (offline-first)
```bash
./vendor/bin/sail npm install -D vite-plugin-pwa
```
- Configurado `VitePWA` en `vite.config.js` con manifest.json,
  service worker (workbox) y iconos base ✅

### 6. Crear la estructura de carpetas de dominio
```bash
mkdir -p app/Domain/Ejemplo/Actions
mkdir -p app/Domain/Ejemplo/DTOs
mkdir -p app/Domain/Ejemplo/Models
mkdir -p app/Support
mkdir -p resources/js/components
mkdir -p resources/js/pages
mkdir -p resources/js/stores
```
✅

### 7. Instalar dependencias adicionales
```bash
# Backend PHP
./vendor/bin/sail composer require laravel/sanctum spatie/laravel-data

# Frontend
./vendor/bin/sail npm install pinia vue-router@4
```
- `laravel/sanctum v4.3.3` ✅
- `spatie/laravel-data v4.23.0` ✅
- `pinia` + `vue-router@4` ✅

### 8. Configurar app.js con Vue 3 + Pinia + Vue Router
- Actualizado `resources/js/app.js` con createApp, createPinia,
  createRouter ✅

### 9. Crear componentes Vue base
- Creado `resources/js/pages/App.vue` (componente raíz con
  `<router-view />`) ✅
- Creado `resources/js/pages/Home.vue` (página de inicio con
  Tailwind) ✅

---

## ⬜ Lo que nos queda

### 10. Conectar Vue con Laravel (Blade)
Actualizar `resources/views/welcome.blade.php` para que cargue
el bundle de Vue en vez de la página estática de Laravel.

### 11. Comprobar que todo funciona
```bash
./vendor/bin/sail npm run dev
```
Abrir `http://localhost` y verificar que se ve la página Vue
con Tailwind (no la página por defecto de Laravel).

### 12. Subir a GitHub como Repo Template
```bash
git init
git add .
git commit -m "feat: initial plataforma-core setup"
gh repo create TicoSystem/plataforma-core --private --source=. --push
```
Y en GitHub → Settings del repo → marcar "Template repository".

### 13. Añadir los Reusable Workflows
Crear en `.github/workflows/`:
- `ci.yml` — corre Pest + Vitest en cada PR
- `move-to-in-progress.yml` — mueve tarjeta al crear rama con
  nombre de issue
- `release-please.yml` — genera changelog y versión automática

### 14. Configurar branch protection
En GitHub → Settings del repo `plataforma-core` → Branches:
- PR obligatorio antes de fusionar a `main`
- CI en verde obligatorio
- Sin push directo a `main`

---

## Orden de ejecución
```
✅ 1. Crear proyecto Laravel + Sail
✅ 2. Cambiar MySQL por PostgreSQL
✅ 3. Instalar Vue 3 + Vite
✅ 4. Configurar Tailwind CSS
✅ 5. Configurar PWA (offline-first)
✅ 6. Crear estructura de carpetas de dominio
✅ 7. Instalar dependencias adicionales (Sanctum, Pinia, Vue Router)
✅ 8. Configurar app.js
✅ 9. Crear componentes Vue base (App.vue, Home.vue)
✅ 10. Conectar Vue con Laravel (Blade)
✅ 11. Comprobar que todo funciona (npm run dev)
✅ 12. Subir a GitHub como Repo Template
✅ 13. Reusable Workflows (CI, mover tarjetas, release-please)
✅ 14. Branch protection
```
