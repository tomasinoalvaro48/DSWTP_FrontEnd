# Sistema de Resolución de Anomalías - Frontend

## Contenidos

- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Ejecución](#ejecución)
- [Scripts Disponibles](#scripts)

## Tecnologías

| Tecnología   | Versión |
| ------------ | ------- |
| PNPM         | 10.6.5  |
| Node.js      | 18      |
| TypeScript   | ~5.8.3  |
| React        | 19.1.0  |
| Vite         | 6.3.5   |
| React Router | 7.9.1   |
| Bootstrap    | 5.3.7   |
| Axios        | 1.11.0  |
| ESLint       | 9.33.0  |
| Prettier     | 3.6.2   |

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tomasinoalvaro48/DSWTP_FrontEnd.git
cd DSWTP_FrontEnd
```

### 2. Instalar dependencias

```bash
pnpm install
```

### 3. Configurar el endpoint del backend

Crea y edita el archivo `endpoints.config.ts`:

```typescript
const FRONTEND_PORT = 5173
const BACKEND_URL = 'http://localhost:3000'

export { FRONTEND_PORT, BACKEND_URL }
```

### 4. Ejecutar el proyecto

```bash
pnpm dev
```

La aplicación estará disponible en `http://localhost:5173`

## Ejecución

### Modo Desarrollo

```bash
pnpm dev
```

Este comando inicia el servidor de desarrollo con hot-reload en `http://localhost:5173`

### Modo Producción

```bash
pnpm build
```

## Scripts

| Script  | Comando      | Descripción                                        |
| ------- | ------------ | -------------------------------------------------- |
| `dev`   | `pnpm dev`   | Inicia el servidor de desarrollo con hot-reload    |
| `build` | `pnpm build` | Compila TypeScript y genera el build de producción |

## Ejecución de Tests

[Videos de Ejecución de Tests](https://drive.google.com/drive/folders/1NDyjkOL_AKKLR-kaGWmaDavEDl680VbS?usp=sharing)

Los tests del Frontend se encuentran disponibles en la rama:

- "tests" (para tests de integración)
