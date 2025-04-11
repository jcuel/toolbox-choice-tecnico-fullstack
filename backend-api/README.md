# Backend API - Full Stack JS Challenge

Este repositorio contiene el backend del Challenge para desarrolladores Full Stack JavaScript. Su objetivo es consumir un API externo, sanear y estructurar la información, y exponerla a través de un endpoint propio REST.

---

## 🔧 Tecnologías utilizadas

- **Node.js** 14.x
- **Express.js**
- **Axios** para HTTP requests
- **Mocha + Chai** para tests funcionales
- **Supertest** para testeo de endpoints
- **dotenv** para manejo de variables de entorno
- **nock** (solo en tests) para simular fallos del API externo
- **Docker** para ejecución en contenedor
- **Swagger** para documentación interactiva

---

## ✅ Requisitos cumplidos

- ✅ API funcional en `/files/data`
- ✅ Filtro opcional `?fileName=...`
- ✅ Endpoint adicional `/files/list`
- ✅ Manejo de archivos CSV y validación de líneas corruptas
- ✅ Ignora archivos vacíos o dañados
- ✅ JSON estructurado como se indica en el challenge
- ✅ Tolerancia a errores del API externo
- ✅ `.env` para configuración limpia
- ✅ Tests automatizados obligatorios y opcionales
- ✅ Endpoints adicionales de monitoreo: `/health` y `/selfcheck`
- ✅ Documentación Swagger interactiva en `/docs`

---

## 📃 Variables de entorno

Copia el archivo `.env.example` y renómbralo como `.env`:

```bash
cp .env.example .env
```

Contenido esperado:

```env
PORT=3000
API_URL=https://echo-serv.tbxnet.com/v1/secret
API_KEY=aSuperSecretKey
```

> Estas variables también pueden ser pasadas como argumentos al construir la imagen con Docker.

---

## 📂 Scripts disponibles

```bash
npm install     # instala dependencias
npm start       # inicia el servidor en el puerto especificado
npm test        # ejecuta todos los tests
```

---

## 📈 Endpoints disponibles

### `GET /files/data`
- Lista y descarga archivos CSV desde el API externo
- Permite filtrar por `fileName` opcional: `?fileName=file1.csv`
- Descarta líneas incompletas
- Devuelve formato JSON estructurado

### `GET /files/list`
- Devuelve directamente la lista de archivos disponibles desde el API externo

### `GET /health`
- Devuelve "ok" para monitoreo y health checks automáticos

### `GET /selfcheck`
- Página HTML que ejecuta pruebas en vivo sobre el backend y el API externo

### `GET /docs`
- Interfaz Swagger UI interactiva con todos los endpoints documentados

---

## 🤕 Tests incluidos

### Obligatorios:
- `test/app.test.js`: Verifica que `/files/data` responda correctamente con datos estructurados

### Adicionales:
- `test/app.error.test.js`: Simula un error del API externo con `nock`
- `/selfcheck`: Ejecuta pruebas en vivo desde el navegador con feedback visual

---

## 📊 Tolerancia a errores

- Si un archivo no puede descargarse: se omite
- Si una línea en el CSV no tiene los campos esperados: se descarta
- Si el API externo falla completamente: se responde con error `500`
- El servidor nunca crashea y se mantiene estable

---

## 🐳 Dockerfile

```Dockerfile
FROM node:14-alpine
WORKDIR /app

ARG PORT=3000
ARG API_URL
ARG API_KEY

ENV PORT=$PORT
ENV API_URL=$API_URL
ENV API_KEY=$API_KEY

COPY . .
RUN npm install
EXPOSE $PORT
CMD ["npm", "start"]
```

### Ejecución con Docker:

```bash
docker build -t backend-api \
  --build-arg API_URL=https://echo-serv.tbxnet.com/v1/secret \
  --build-arg API_KEY=aSuperSecretKey \
  --build-arg PORT=3000 .

docker run -p 3000:3000 backend-api
```

---

# Backend API - Full Stack JS Challenge (English)

This repository contains the backend for the Full Stack JavaScript challenge. It consumes an external API, cleans and structures the data, and exposes it through a custom REST endpoint.

---

## 🔧 Tech Stack

- **Node.js** 14.x
- **Express.js**
- **Axios** for HTTP calls
- **Mocha + Chai** for assertions
- **Supertest** for endpoint testing
- **dotenv** for environment configuration
- **nock** (test only) to mock the external API
- **Docker** ready
- **Swagger** for interactive documentation

---

## ✅ Requirements Met

- ✅ Functional `/files/data` endpoint
- ✅ Optional `?fileName=...` query param
- ✅ Extra endpoint `/files/list`
- ✅ CSV parsing and validation of lines
- ✅ Skips empty or broken files
- ✅ JSON structure matches challenge
- ✅ Resilient to external API errors
- ✅ `.env` based configuration
- ✅ Required and bonus tests included
- ✅ Health and selfcheck endpoints: `/health`, `/selfcheck`
- ✅ Interactive Swagger docs at `/docs`

---

## 📃 Environment Variables

Copy the `.env.example` and rename it:

```bash
cp .env.example .env
```

Expected content:

```env
PORT=3000
API_URL=https://echo-serv.tbxnet.com/v1/secret
API_KEY=aSuperSecretKey
```

---

## 📂 Available Scripts

```bash
npm install     # install dependencies
npm start       # start the backend
npm test        # run tests
```

---

## 📈 API Endpoints

### `GET /files/data`
- Lists and downloads files from the external API
- Optional `fileName` param
- Parses CSV, filters invalid lines
- Returns structured JSON

### `GET /files/list`
- Returns list of available filenames from the external API

### `GET /health`
- Simple `ok` response for load balancer probes

### `GET /selfcheck`
- HTML page running live system tests (internal and external)

### `GET /docs`
- Swagger UI to explore documented endpoints

---

## 🤕 Included Tests

### Required:
- `test/app.test.js`: Validates `/files/data` structure and status

### Bonus:
- `test/app.error.test.js`: Simulates API failures with `nock`
- `/selfcheck`: Live test page for real-time health check

---

## 📊 Error Handling

- Failed file downloads are skipped
- Corrupted CSV lines are ignored
- External API failure returns a 500 error
- The server stays stable at all times

---

## 🐳 Dockerfile

```Dockerfile
FROM node:14-alpine
WORKDIR /app

ARG PORT=3000
ARG API_URL
ARG API_KEY

ENV PORT=$PORT
ENV API_URL=$API_URL
ENV API_KEY=$API_KEY

COPY . .
RUN npm install
EXPOSE $PORT
CMD ["npm", "start"]
```

### Docker Usage:

```bash
docker build -t backend-api \
  --build-arg API_URL=https://echo-serv.tbxnet.com/v1/secret \
  --build-arg API_KEY=aSuperSecretKey \
  --build-arg PORT=3000 .

docker run -p 3000:3000 backend-api
```

