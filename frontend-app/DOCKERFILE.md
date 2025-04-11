# Dockerfile para Frontend React (Vite + Redux)

Este `Dockerfile` permite construir y servir la aplicación frontend del challenge usando Vite, incluyendo la posibilidad de definir una variable `VITE_API_URL` al momento del build.

---

## 📄 Dockerfile

```Dockerfile
FROM node:18-alpine
WORKDIR /app

COPY . .

# Permitir que VITE_API_URL se defina al buildear
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm install
RUN npm run build

RUN npm install -g serve
EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]
```

---

## 🚀 Cómo usarlo

### ✅ Build estándar (localhost como backend):
```bash
docker build -t frontend-app .
docker run -p 5173:5173 frontend-app
```

### ⚙️ Build con variable VITE_API_URL
```bash
docker build -t frontend-app --build-arg VITE_API_URL=https://mi-backend.com .
docker run -p 5173:5173 frontend-app
```

> ⚠️ Nota: `VITE_API_URL` se inyecta durante el `npm run build`, así que debe pasarse en tiempo de build (no en tiempo de ejecución).

---

## 🌍 Alternativa usando `.env` (solo en desarrollo local)

Podés definir un archivo `.env` en la raíz del proyecto con:

```env
VITE_API_URL=https://3000-tuworkspaceid.githubpreview.dev
```

Esto funcionará si estás corriendo `npm run dev` o `vite preview`, pero **no será válido en entornos Docker si no se inyecta en build**.

---

## 💡 ¿Por qué no usar `window.env` o archivos JSON?

- ❌ `window.env` requiere modificar el HTML base y no es compatible con Vite por defecto.
- ❌ Archivos JSON como `config.json` deben ser cargados manualmente en cada render y complican el preload.
- ✅ Con `VITE_API_URL` vía `build-arg`, el valor se **inyecta directamente en el bundle final**, sin cambios adicionales ni lógica extra.

Esto es más simple, rápido y **100% compatible con Vite**, su filosofía y su sistema de build.

---

# Dockerfile for React Frontend (Vite + Redux)

This `Dockerfile` builds and serves the frontend app using Vite, with support for injecting `VITE_API_URL` during the Docker build.

---

## 📄 Dockerfile

```Dockerfile
FROM node:18-alpine
WORKDIR /app

COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm install
RUN npm run build

RUN npm install -g serve
EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]
```

---

## 🚀 How to use it

### ✅ Default build (assumes backend on localhost):
```bash
docker build -t frontend-app .
docker run -p 5173:5173 frontend-app
```

### ⚙️ With custom backend:
```bash
docker build -t frontend-app --build-arg VITE_API_URL=https://your-api.com .
docker run -p 5173:5173 frontend-app
```

> ⚠️ `VITE_API_URL` is injected at build time. It won’t work if passed at runtime.

---

## 🌍 Alternative using `.env` (for local dev only)

You can define a `.env` file:
```env
VITE_API_URL=https://3000-yourspaceid.githubpreview.dev
```

Works with `npm run dev` or `vite preview`, but **not inside Docker unless passed with `--build-arg`**.

---

## 💡 Why not use `window.env` or config.json?

- ❌ `window.env` requires modifying the HTML and adds complexity
- ❌ `config.json` must be fetched manually before render, adds latency and complexity
- ✅ `build-arg` injects `VITE_API_URL` directly into the final JS bundle, fully integrated with Vite

This method is faster, simpler, and production-safe — fully aligned with Vite’s static build philosophy.

---

Compatible con: Codespaces, entornos locales, producción o cualquier infraestructura basada en Node 18+ y Docker.

