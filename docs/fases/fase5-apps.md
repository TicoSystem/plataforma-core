# fase5-apps.md
# Fase 5 — Por cada app nueva (repetir 25 veces)

> Origen: Puntos 3 (Uso de IAs), 4 (Publicación), 5 (Pricing), 6 (BD), 10 (Auth), 11 (Legal) del entorno de trabajo

---

## Estado de los planes maestros

| # | App | Plan maestro | Repo | Estado |
|---|---|---|---|---|
| 1 | Control de Gastos Personal | ✅ Generado | ⬜ Por crear | ⬜ Por iniciar |
| 2 | Gestor de Suscripciones | ✅ Generado | ⬜ Por crear | ⬜ Por iniciar |
| 3 | The Dev Hub | — (interna) | ⬜ Por crear | ⬜ Por iniciar |
| 4 | Diario Fitness y Calorías | ✅ Generado | ⬜ Por crear | ⬜ Por iniciar |
| 5 | Control de Inventario B2B | ✅ Generado | ⬜ Por crear | ⬜ Por iniciar |
| 6 | Bitácora de Vehículos/Uber | ✅ Generado | ⬜ Por crear | ⬜ Por iniciar |
| 7 | Cuaderno de Salud para Mascotas | ✅ Generado | ⬜ Por crear | ⬜ Por iniciar |
| 8 | Flashcards Educativas Leitner | ✅ Generado | ⬜ Por crear | ⬜ Por iniciar |
| 9 | Fisioterapia Híbrida | ✅ Generado | ⬜ Por crear | ⬜ Por iniciar |
| 10 | Nevera Vegana | ✅ Generado | ⬜ Por crear | ⬜ Por iniciar |
| 11 | Control de Garantías del Hogar | ✅ Generado | ⬜ Por crear | ⬜ Por iniciar |
| 12 | Diario de Sueño y Descanso | ✅ Generado | ⬜ Por crear | ⬜ Por iniciar |
| 13 | Bitácora de Mantenimiento del Hogar | ✅ Generado | ⬜ Por crear | ⬜ Por iniciar |
| 14 | Seguimiento de Ayuno Intermitente | ✅ Generado | ⬜ Por crear | ⬜ Por iniciar |
| 15 | Control de Riego y Plantas | ✅ Generado | ⬜ Por crear | ⬜ Por iniciar |
| 16 | Control de Vencimientos de Documentos | ✅ Generado | ⬜ Por crear | ⬜ Por iniciar |
| 17 | Calendario de Reciclaje | ✅ Generado | ⬜ Por crear | ⬜ Por iniciar |
| 18 | Comparador de Ahorro Energético | ✅ Generado | ⬜ Por crear | ⬜ Por iniciar |
| 19 | Diario de Lactancia y Crianza | ✅ Generado | ⬜ Por crear | ⬜ Por iniciar |
| 20 | Diario de Síntomas y Medicación | ✅ Generado | ⬜ Por crear | ⬜ Por iniciar |
| 21 | Organizador de Custodia Compartida | ✅ Generado | ⬜ Por crear | ⬜ Por iniciar |
| 22 | Planificador de Comidas Semanal | ✅ Generado | ⬜ Por crear | ⬜ Por iniciar |
| 23 | Control de Horas y Facturación | ✅ Generado | ⬜ Por crear | ⬜ Por iniciar |
| 24 | Organizador de Mudanzas | ✅ Generado | ⬜ Por crear | ⬜ Por iniciar |
| 25 | Biblioteca Personal y Préstamos | ✅ Generado | ⬜ Por crear | ⬜ Por iniciar |

---

## Ciclo completo por app — comandos

### 1. Crear el repo desde el template
```bash
# Sustituir {nombre-app} por el nombre real (ej: control-gastos)
gh repo create TicoSystem/{nombre-app} --template=TicoSystem/plataforma-core --private
git clone https://github.com/TicoSystem/{nombre-app} ~/proyectos/{nombre-app}
cd ~/proyectos/{nombre-app}
```

### 2. Copiar el plan maestro al repo
```bash
cp ~/proyectos/plataforma-core/docs/planes-maestros/Plan_Maestro_{NombreApp}.md docs/plan-maestro.md
git add docs/plan-maestro.md
git commit -m "docs: añadir plan maestro de {nombre-app}"
git push
```

### 3. Abrir en Cursor y pedir a Claude que desglose las issues
```
@docs/plan-maestro.md

Lee este plan maestro. Desglosa la Fase 1 en issues concretas
y accionables y créalas en GitHub con gh CLI para el repo
TicoSystem/{nombre-app}.
```

### 4. Ciclo de desarrollo (por cada issue)
```bash
# Crear rama
git checkout -b feature/N-nombre-issue

# Desarrollar con Claude en Cursor...

# Commit con Conventional Commits
git add .
git commit -m "feat: descripción del cambio"

# Subir y abrir PR
git push --set-upstream origin feature/N-nombre-issue
gh pr create --title "feat: descripción" --body "Closes #N"

# Esperar CI verde → Squash and merge desde GitHub
# La tarjeta se mueve sola a "Terminada"

# Sincronizar main
git checkout main
git fetch origin
git reset --hard origin/main
```

### 5. Desplegar en Coolify
```bash
# En el panel de Coolify:
# New Project → Add Application → conectar repo TicoSystem/{nombre-app}
# Configurar variables de entorno (DB, Sentry, OneSignal, etc.)
# Deploy
```

---

## Criterios transversales por app

| Criterio | Por defecto | Excepción |
|---|---|---|
| Idioma | Español únicamente | Ninguna por ahora |
| Accesibilidad | WCAG AA (en plataforma-ui) | AAA en apps para mayores o con datos de salud |
| Onboarding | Empty state guiado (componente plataforma-ui) | Apps complejas: onboarding de 3-4 pasos |
| Pricing beta | 2€ (sin anuncios) o 1€ (con anuncios), pago único | — |
| Pricing estable | Freemium con anuncios + suscripción sin anuncios | — |
| Cumplimiento tienda | Lenguaje "wellness", no "médico/diagnóstico" | Solo las 5 apps con datos sensibles |
| Anuncios | Segmentados por comportamiento | Las 5 apps sensibles: solo anuncios genéricos |
