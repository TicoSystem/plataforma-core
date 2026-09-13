# fase2-paso7-vps-ovh.md
# Fase 2 — Paso 7: VPS de producción (OVH)

> Origen: Punto 3 (Hosting) del entorno de trabajo

---

## ⬜ Pendiente

| Estado | Tarea | Comando / Acción | Para qué sirve |
|---|---|---|---|
| ⬜ | Contratar VPS de OVH | ovhcloud.com → VPS → elegir plan con Docker preinstalado | El servidor real donde vivirán las apps en producción |
| ⬜ | Conectar por SSH al VPS | `ssh ubuntu@IP_DEL_VPS` | Acceder al servidor para configurarlo |
| ⬜ | Instalar Coolify en el VPS | `curl -fsSL https://cdn.coollabs.io/coolify/install.sh \| bash` | Panel de gestión de todos los despliegues |
| ⬜ | Conectar GitHub a Coolify del VPS | Panel Coolify → Sources → Add → GitHub | Para despliegues automáticos desde los repos de TicoSystem |
| ⬜ | Configurar dominio principal | Panel Coolify → Domains + configurar DNS en el proveedor | Base para todos los subdominios de las 26 apps |
| ⬜ | Configurar subdominio por app | Panel Coolify → App → Domain → `{app}.tudominio.com` | Dirección pública de cada app |
| ⬜ | Configurar SSL automático | Coolify lo gestiona con Let's Encrypt automáticamente | HTTPS en todas las apps sin coste |
| ⬜ | Desplegar plataforma-core como primera prueba | Panel Coolify → Projects → New → Add plataforma-core | Verificar que todo funciona en producción real |

---

## Comandos de referencia

### Conexión SSH al VPS
```bash
# Primera conexión (con la clave que generaste al contratar el VPS)
ssh ubuntu@IP_DEL_VPS

# Verificar que Docker está instalado (viene preinstalado en OVH)
docker --version
docker ps
```

### Instalar Coolify en el VPS
```bash
# Una vez dentro del VPS por SSH
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash

# Coolify estará disponible en http://IP_DEL_VPS:8000
# Configurar en el panel para usar HTTPS con tu dominio
```

### Configurar DNS (en el proveedor del dominio)
```
# Ejemplo de registros DNS a crear:
# A    @              → IP_DEL_VPS     (dominio principal)
# A    *.tudominio.com → IP_DEL_VPS    (wildcard para subdominios)
```

---

## Elección del plan de OVH

- **Con Docker preinstalado** (gratuito, incluido) — evita instalar Docker manualmente
- Incluye: ancho de banda ilimitado, backups diarios, anti-DDoS
- Plan mínimo recomendado: 4 vCores, 8GB RAM (suficiente para varias apps de nicho)

## Estrategia de subdominios

Empezar con subdominios (gratuitos, rápidos):
```
control-gastos.tudominio.com
nevera-vegana.tudominio.com
diario-fitness.tudominio.com
...
```

Comprar dominio propio solo cuando una app despegue de verdad (criterio de "graduar").
