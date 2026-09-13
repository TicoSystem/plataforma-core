# fase2-paso10-backups.md
# Fase 2 — Paso 10: Backups

> Origen: Punto 12 (Backups) del entorno de trabajo

---

## ⬜ Pendiente

| Estado | Tarea | Comando / Acción | Para qué sirve |
|---|---|---|---|
| ⬜ | Configurar backups en Coolify (semanal) | Panel → App → Backups → Enable → Weekly | Copia de seguridad automática de cada app |
| ⬜ | Configurar Coolify para respaldar su propia config | Panel → Settings → Backup Coolify | Si el VPS muere, poder reconstruir sin perder la config |
| ⬜ | Instalar rclone en el VPS | `curl https://rclone.org/install.sh \| sudo bash` | Herramienta para enviar backups a Google Drive |
| ⬜ | Crear cuenta de servicio de Google | Google Cloud Console → IAM → Service Accounts → New | Autenticación automatizada entre el VPS y Google Drive |
| ⬜ | Configurar rclone con Google Drive | `rclone config` → New remote → Google Drive → usar cuenta de servicio | Conectar el VPS a Google Drive para los backups |
| ⬜ | Crear script de backup automático | Script bash que usa pg_dump + rclone | Ejecutar el backup y enviarlo a Google Drive |
| ⬜ | Programar el script con cron | `crontab -e` → añadir línea con el schedule | Que el backup se ejecute solo sin intervención manual |
| ⬜ | Probar una restauración completa | `pg_restore` desde el backup de Google Drive | Confirmar que los backups sirven de verdad |

---

## Comandos de referencia

### Instalar y configurar rclone
```bash
# Instalar rclone
curl https://rclone.org/install.sh | sudo bash

# Configurar conexión con Google Drive
rclone config
# → New remote → name: gdrive → type: drive → usar cuenta de servicio
```

### Script de backup automático
```bash
#!/bin/bash
# /home/ubuntu/scripts/backup.sh

APP_NAME=$1  # ej: control_gastos
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="/tmp/${APP_NAME}_${DATE}.sql"

# Exportar la BD
pg_dump -h localhost -U sail -d $APP_NAME > $BACKUP_FILE

# Enviar a Google Drive
rclone copy $BACKUP_FILE gdrive:backups/ticosystem/$APP_NAME/

# Limpiar archivo temporal
rm $BACKUP_FILE

echo "Backup de $APP_NAME completado: $DATE"
```

### Programar backup semanal con cron
```bash
# Editar el crontab
crontab -e

# Añadir esta línea (todos los domingos a las 3:00 AM)
0 3 * * 0 /home/ubuntu/scripts/backup.sh control_gastos >> /var/log/backups.log 2>&1
```

### Probar restauración
```bash
# Descargar backup de Google Drive
rclone copy gdrive:backups/ticosystem/control_gastos/control_gastos_20260913_030000.sql /tmp/

# Restaurar en BD de prueba
psql -h localhost -U sail -d control_gastos_test < /tmp/control_gastos_20260913_030000.sql
```

---

## Política de backups

| App | Frecuencia | Cuándo subir |
|---|---|---|
| App nueva sin usuarios | Semanal | Por defecto al desplegar |
| App con usuarios regulares | Diaria | Cuando supera ~20 filas nuevas/día sostenido |
| App con facturación activa | Cada hora | Cuando hay usuarios pagando activamente |

**Métrica para decidir subir la frecuencia**: nº de filas nuevas/día en las tablas principales (revisión manual semanal).
