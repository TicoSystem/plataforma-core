# fase2-paso8-base-de-datos.md
# Fase 2 — Paso 8: Base de datos en producción

> Origen: Punto 6 (Base de datos) del entorno de trabajo

---

## ⬜ Pendiente

| Estado | Tarea | Comando / Acción | Para qué sirve |
|---|---|---|---|
| ⬜ | Desplegar servicio PostgreSQL en Coolify | Panel → Services → Add → PostgreSQL 17 | El motor de BD compartido por las apps del mismo VPS |
| ⬜ | Crear una BD por app | Panel PostgreSQL → Databases → New Database | Aislamiento real entre apps (una no puede ver los datos de otra) |
| ⬜ | Configurar variables de entorno de BD en Coolify | Panel → App → Environment Variables | Cada app apunta a su propia BD con sus propias credenciales |
| ⬜ | Verificar aislamiento entre apps | Intentar conectar desde app A a BD de app B → debe fallar | Confirmar que el aislamiento funciona |
| ⬜ | Configurar backups de BD | Panel → Service → Backups → Configure (semanal por defecto) | Poder recuperar datos si algo sale mal |

---

## Comandos de referencia

### Crear una nueva base de datos (desde psql)
```bash
# Conectar al servicio PostgreSQL de Coolify
psql -h localhost -U sail -d postgres

# Crear BD para una app nueva
CREATE DATABASE control_gastos;
CREATE USER gastos_user WITH PASSWORD 'password_seguro';
GRANT ALL PRIVILEGES ON DATABASE control_gastos TO gastos_user;
```

### Variables de entorno por app (en Coolify)
```env
# Para Control de Gastos
DB_CONNECTION=pgsql
DB_HOST=nombre-servicio-postgres
DB_PORT=5432
DB_DATABASE=control_gastos
DB_USERNAME=gastos_user
DB_PASSWORD=password_seguro
```

### Migrar datos si una app necesita Postgres dedicado
```bash
# Exportar de la BD compartida
pg_dump -h postgres-compartido -U gastos_user control_gastos > backup_gastos.sql

# Importar en el nuevo servicio dedicado
psql -h postgres-dedicado -U gastos_user control_gastos < backup_gastos.sql
```

---

## Patrones de comunicación entre apps

| Patrón | Cuándo usarlo | Casos identificados |
|---|---|---|
| **3 — Servicio propio con BD** | **Por defecto** — lógica estructuralmente compartida | Motor de recurrencias (#1↔#2), motor despensa/recetas (#10↔#22) |
| **1 — API interna** | Consulta puntual entre apps sin relación de diseño | Vehículos↔Gastos, Horas/Facturación↔Gastos, Mudanzas↔Vencimientos |
| **2 — Eventos asíncronos (Redis)** | Sincronización sin bloquear | Mascotas→Gastos, Vehículos→Gastos, Lactancia↔Sueño |

---

## Estrategia de backups de BD

- **Frecuencia por defecto**: semanal (apps sin usuarios reales)
- **Métrica para subir frecuencia**: nº de filas nuevas/día en las tablas principales
- **Retención**: 7 backups diarios + 4 semanales
- **Destino**: Google Drive (vía rclone + cuenta de servicio de Google)
- **Prueba de restauración**: semanal mientras se trabaja en local
