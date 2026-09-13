# plataforma-core

Base técnica reutilizable para la plataforma de 26 apps de TicoSystem.

## Stack

- **Backend**: Laravel 13 + Sail + PostgreSQL + Redis
- **Frontend**: Vue 3 + Vite + Tailwind CSS + PWA (offline-first)
- **Auth**: Laravel Sanctum
- **Testing**: Pest + Vitest + Playwright
- **Deploy**: Coolify + OVH VPS

## Uso como template

```bash
gh repo create TicoSystem/{nombre-app} --template=TicoSystem/plataforma-core --private
```

## Documentación del proyecto

Toda la documentación vive en la carpeta [`docs/`](https://github.com/TicoSystem/plataforma-core/tree/main/docs):

| Documento                                                                                                                                         | Descripción                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| [plan-de-trabajo.md](https://github.com/TicoSystem/plataforma-core/blob/main/docs/plan-de-trabajo.md)                                             | Plan global con 6 fases y estado de cada paso                |
| [checklist.md](https://github.com/TicoSystem/plataforma-core/blob/main/docs/checklist.md)                                                         | Checklist operativo detallado por paso                       |
| [memoria-proyecto.md](https://github.com/TicoSystem/plataforma-core/blob/main/docs/memoria-proyecto.md)                                           | Toda la información del proyecto para cualquier IA           |
| [memoria-interna-claude.md](https://github.com/TicoSystem/plataforma-core/blob/main/docs/memoria-interna-claude.md)                               | Exportación de la memoria interna de Claude                  |
| [entorno-de-trabajo.md](https://github.com/TicoSystem/plataforma-core/blob/main/docs/entorno-de-trabajo.md)                                       | Los 21 puntos del entorno de trabajo con referencias al plan |
| [prompts-plan-maestro-24-apps-rellenos.md](https://github.com/TicoSystem/plataforma-core/blob/main/docs/prompts-plan-maestro-24-apps-rellenos.md) | Prompts de GPT-4o para generar los planes maestros           |
| [planes-maestros/](https://github.com/TicoSystem/plataforma-core/tree/main/docs/planes-maestros)                                                  | 24 planes maestros generados con ChatGPT                     |
