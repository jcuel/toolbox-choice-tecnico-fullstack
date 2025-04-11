# Ejecutar el proyecto completo con Docker Compose

Este documento explica cómo levantar **todo el proyecto Full Stack (frontend + backend)** usando `docker-compose`. El objetivo es facilitar la ejecución local de la solución completa en una laptop o entorno de desarrollo.

---

## 📁 Estructura esperada del proyecto

```
project-root/
├── backend-api/
│   ├── Dockerfile
│   └── (código fuente backend)
├── frontend-app/
│   ├── Dockerfile
│   └── (código fuente frontend)
├── docker-compose.yml
└── README.md / SWAGGER.md / RUN_WITH_DOCKER-COMPOSE.md
```

---

## 📅 Requisitos

- Docker 20+
- Docker Compose 1.29+ o `docker compose` (plugin moderno)

---

## 🚣 Archivo `docker-compose.yml`

```yaml
version: '3.8'

services:
  backend:
    build:
      context: ./backend-api
      args:
        API_URL: https://echo-serv.tbxnet.com/v1/secret
        API_KEY: aSuperSecretKey
        PORT: 3000
    ports:
      - "3000:3000"
    environment:
      - PORT=3000
    networks:
      - app-network

  frontend:
    build:
      context: ./frontend-app
      args:
        VITE_API_URL: http://backend:3000
    ports:
      - "8080:8080"
    depends_on:
      - backend
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

---

## 🚀 ¿Cómo ejecutarlo?

Desde la carpeta raíz del proyecto:

```bash
docker-compose up --build
```

Esto levantará:
- El backend accesible en: `http://localhost:3000`
- El frontend accesible en: `http://localhost:8080`

El frontend usa `http://backend:3000` como origen de datos gracias a la red interna compartida.

---

## 🔍 Accesos rápidos desde el navegador

- UI Frontend: [http://localhost:8080](http://localhost:8080)
- API Backend: [http://localhost:3000/files/data](http://localhost:3000/files/data)
- Health check: [http://localhost:3000/health](http://localhost:3000/health)
- Selfcheck HTML: [http://localhost:3000/selfcheck](http://localhost:3000/selfcheck)
- Swagger UI: [http://localhost:3000/docs](http://localhost:3000/docs)

---

## 💭 Notas adicionales

- Se utiliza una red virtual (`app-network`) para que los contenedores puedan resolverse por nombre (`backend`).
- Se pasan variables sensibles (como `API_KEY`) en tiempo de build usando `build.args`.
- Para entornos reales, podrías usar `.env` + `secrets` en vez de ARGs para mayor seguridad.

---

# Run the Full Project with Docker Compose (English)

This document explains how to run the full Full Stack solution (frontend + backend) using `docker-compose`. Ideal for local development and testing.

---

## 📁 Expected Project Structure

```
project-root/
├── backend-api/
│   ├── Dockerfile
│   └── (backend source code)
├── frontend-app/
│   ├── Dockerfile
│   └── (frontend source code)
├── docker-compose.yml
└── README.md / SWAGGER.md / RUN_WITH_DOCKER-COMPOSE.md
```

---

## 📊 Requirements

- Docker 20+
- Docker Compose 1.29+ or `docker compose` (plugin)

---

## 🌊 `docker-compose.yml`

```yaml
version: '3.8'

services:
  backend:
    build:
      context: ./backend-api
      args:
        API_URL: https://echo-serv.tbxnet.com/v1/secret
        API_KEY: aSuperSecretKey
        PORT: 3000
    ports:
      - "3000:3000"
    environment:
      - PORT=3000
    networks:
      - app-network

  frontend:
    build:
      context: ./frontend-app
      args:
        VITE_API_URL: http://backend:3000
    ports:
      - "8080:8080"
    depends_on:
      - backend
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

---

## 🚀 How to run it

From the project root:

```bash
docker-compose up --build
```

This will:
- Expose the backend at: `http://localhost:3000`
- Expose the frontend at: `http://localhost:8080`

Frontend uses `http://backend:3000` via internal Docker networking.

---

## 🔍 Quick Access (Browser)

- Frontend UI: [http://localhost:8080](http://localhost:8080)
- Backend API: [http://localhost:3000/files/data](http://localhost:3000/files/data)
- Health check: [http://localhost:3000/health](http://localhost:3000/health)
- Selfcheck: [http://localhost:3000/selfcheck](http://localhost:3000/selfcheck)
- Swagger UI: [http://localhost:3000/docs](http://localhost:3000/docs)

---

## 💭 Extra Notes

- The containers share a Docker network called `app-network`, allowing name-based resolution.
- Sensitive info like `API_KEY` is passed using build-time ARGs.
- For real-world deployment, consider using `.env` or Docker Secrets instead of build args.

