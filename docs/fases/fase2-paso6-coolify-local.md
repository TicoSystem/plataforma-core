# fase2-paso6-coolify-local.md
# Fase 2 — Paso 6: Practicar Coolify en local (portátil Ubuntu)

> Origen: Punto 3 (Hosting) del entorno de trabajo

---

## ⬜ Pendiente

| Estado | Tarea | Comando / Acción | Para qué sirve |
|---|---|---|---|
| ⬜ | Instalar Coolify en el portátil | `curl -fsSL https://cdn.coollabs.io/coolify/install.sh \| bash` | Aprender el flujo completo sin pagar nada todavía |
| ⬜ | Abrir el panel de Coolify | Ir a `http://localhost:8000` en el navegador | Panel de gestión de despliegues |
| ⬜ | Crear cuenta de administrador | Registro en la primera pantalla de Coolify | Acceso al panel |
| ⬜ | Conectar GitHub a Coolify | Panel → Sources → Add → GitHub | Para que Coolify detecte cambios en los repos y despliegue automáticamente |
| ⬜ | Desplegar plataforma-core como prueba | Panel → Projects → New → Add Service → Laravel | Verificar que el compose.yml funciona en Coolify |
| ⬜ | Activar Sentinel | Panel → Server → Sentinel → Enable | Monitorización de CPU/memoria por app |
| ⬜ | Verificar métricas por app | Panel → App → Metrics | Comprobar si las métricas funcionan con Docker Compose de Sail |
| ⬜ | Probar el problema de métricas con Compose | Desplegar con Docker Compose y ver si Sentinel muestra métricas por app | Decidir si adaptar el despliegue para producción |
| ⬜ | Configurar backup de prueba | Panel → App → Backups → Configure | Aprender el flujo de backups antes de producción |
| ⬜ | Probar restauración de backup | Restaurar el backup en un contenedor aparte | Validar que los backups funcionan ANTES de necesitarlos |

---

## Comandos de referencia

### Instalación de Coolify
```bash
# Instalar Coolify (requiere Docker activo)
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash

# Verificar que está corriendo
docker ps | grep coolify

# Ver los logs de Coolify
docker logs coolify
```

### Verificar Docker antes de instalar
```bash
sudo systemctl status docker
docker ps
```

### Parar los contenedores de Sail antes de instalar Coolify
```bash
cd ~/proyectos/plataforma-core
sail down
```

---

## Notas sobre el problema de métricas con Docker Compose

Coolify (módulo Sentinel) muestra métricas por app solo si se despliega como **contenedor individual**, no con Docker Compose. Como Sail usa Docker Compose, hay dos opciones:

**Opción A — Desplegar con Compose (más simple, sin métricas por app)**
El compose.yml de Sail funciona tal cual en Coolify, pero Sentinel solo muestra métricas globales del servidor, no por app.

**Opción B — Desplegar como contenedor individual (más complejo, con métricas)**
Separar la app Laravel (contenedor individual) de la BD (servicio de Coolify). Permite ver métricas por app en Sentinel.

La decisión de qué opción usar se toma en este paso, antes de pasar al VPS real.

---

## Los 3 huecos de Coolify y cómo resolverlos

| Hueco | Solución | Cuándo activar |
|---|---|---|
| Alertas de CPU/memoria | Grafana conectado a Sentinel | Cuando haya uso real en producción |
| Disponibilidad externa | UptimeRobot (gratis, 50 monitores, cada 5 min) | Desde el primer despliegue en producción |
| Logs y errores | Sentry (integrado en plataforma-core) | Desde el principio (ya integrado en el core) |
