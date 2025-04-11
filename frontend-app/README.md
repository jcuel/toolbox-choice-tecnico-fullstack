# React Frontend - Full Stack JS Challenge

Este repositorio contiene el frontend del desafío Full Stack JavaScript. Esta app consume un backend propio que, a su vez, procesa información desde un API externo. Se muestra una tabla con los datos estructurados y permite filtrar por nombre de archivo.

---

## ⚙️ Tecnologías utilizadas

- **React** (Vite)
- **Redux Toolkit** (con `createAsyncThunk`)
- **React Bootstrap**
- **Axios** para consumo del API
- **Vitest** + **@testing-library/react** para tests
- **Docker** para ejecución en contenedor

---

## ✅ Requisitos cumplidos

- ✅ App funcional que consume `GET /files/data`
- ✅ Uso de `useEffect`, Redux y programación funcional
- ✅ Filtro por nombre de archivo (frontend y backend opcional)
- ✅ Estructura de tabla clara y responsive
- ✅ Testing básico de componentes
- ✅ Uso opcional de `.env` (compatible con Codespaces y deploy remoto)

---

## 📁 Estructura del proyecto

```
src/
├── App.jsx
├── main.jsx
├── store/
│   ├── filesSlice.js
│   └── index.js
├── views/
│   └── Home.jsx
└── components/
    ├── FileFilter.jsx
    └── FileTable.jsx
```

---

## 🔧 Uso de variables de entorno

Se permite configurar un `.env` opcional para apuntar al backend desde entornos como Codespaces o deploys remotos:

### `.env.example`
```env
VITE_API_URL=https://3000-tuworkspaceid.githubpreview.dev
```

El código tiene fallback a `http://localhost:3000` por defecto, tal como requiere el challenge.

---

## 🧪 Testing

### Dependencias de test:
- `vitest`
- `@testing-library/react`
- `@testing-library/jest-dom`
- `jsdom`

### Ejecutar tests:
```bash
npm test
```

Actualmente se testea `FileTable` (renderiza columnas correctamente). Podés extender tests para Redux o filtros si lo deseás.

---

## 🚀 Scripts disponibles

```bash
npm install       # instala dependencias
npm run dev       # inicia frontend en http://localhost:5173
npm run build     # compila para producción (dist/)
npm run preview   # vista previa del build
npm run test      # ejecuta pruebas
```

---

## 🐳 Docker

### Dockerfile (en raíz del proyecto):
```Dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .

# Pasar la variable VITE_API_URL si está definida en build time
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm install && npm run build
RUN npm install -g serve
EXPOSE 5173
CMD ["serve", "-s", "dist", "-l", "5173"]
```

### Construir y correr la app con Docker:
```bash
docker build -t frontend-app .
docker run -p 5173:5173 frontend-app
```

---

## 🌐 Filtro por archivo

El filtro está implementado de forma dual:
- 🔍 Frontend: filtra dinámicamente por nombre parcial del archivo
- 💡 Backend opcional: si existe `/files/data?fileName=...`, puede activarse para llamar sólo al archivo deseado (ya soportado en `fetchFiles(fileName)`).

---

## 🧠 Bonus aplicados

- ✅ Redux Toolkit integrado
- ✅ Filtro por archivo
- ✅ Unit testing
- ✅ Compatible con GitHub Codespaces (via `.env`)
- ✅ Axios como cliente HTTP
- ✅ Dockerfile incluido

---

# React Frontend - Full Stack JS Challenge (English)

This repository contains the frontend app for the Full Stack JS challenge. It consumes a backend that transforms data from an external API and displays it in a structured, filterable table.

---

## ⚙️ Technologies

- **React** (Vite)
- **Redux Toolkit** (with `createAsyncThunk`)
- **React Bootstrap**
- **Axios** for API calls
- **Vitest** + **@testing-library/react**
- **Docker** for containerized builds

---

## ✅ Requirements Met

- ✅ Functional integration with `/files/data`
- ✅ Filtering by file name (frontend and backend-ready)
- ✅ Structured data table
- ✅ Functional hooks-based code
- ✅ Unit tested with Vitest
- ✅ Supports optional `.env`
- ✅ Dockerfile included

---

## 📁 Project structure

```
src/
├── App.jsx
├── main.jsx
├── store/
├── views/
└── components/
```

---

## 🔧 Environment Variables

You may define `VITE_API_URL` to override the backend endpoint:

```env
VITE_API_URL=https://3000-yourcodespaceid.githubpreview.dev
```

If not defined, it defaults to `http://localhost:3000`.

---

## 🧪 Testing

```bash
npm install
npm test
```

---

## 🐳 Docker Instructions

### Dockerfile:
```Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .

# send variable VITE_API_URL if it's defined at build time.
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm install && npm run build
RUN npm install -g serve
EXPOSE 5173
CMD ["serve", "-s", "dist", "-l", "5173"]
```

### Build & Run:
```bash
docker build -t frontend-app .
docker run -p 5173:5173 frontend