# Documentación interactiva Swagger - Backend API

Esta aplicación incluye una interfaz Swagger UI en `/docs` que permite explorar y probar los endpoints del backend directamente desde el navegador. Es útil para desarrolladores, testers o evaluadores técnicos.

---

## 📍 Acceso rápido

Una vez que el backend esté corriendo:

```
http://localhost:3000/docs
```

---

## 📄 Endpoints documentados

### `GET /files/data`
- Devuelve todos los archivos procesados desde el API externo
- Permite filtro opcional `?fileName=...`
- Descarta líneas corruptas o incompletas

### `GET /files/list`
- Devuelve un array con los nombres de archivo disponibles

### `GET /health`
- Devuelve un simple `ok` como respuesta
- Útil para health checks automáticos (balanceadores, app gateways, etc.)

### `GET /selfcheck`
- Devuelve una página HTML con tests en vivo del backend
- Valida conectividad con el API externo y estado del sistema

---

## 🔄 Agrupación por tags en Swagger

Los endpoints están agrupados bajo tags para facilitar la navegación:

- **Default**: Endpoints funcionales del challenge (`/files/data`, `/files/list`)
- **Monitoring**: Endpoints informativos para estado y chequeo del sistema (`/health`, `/selfcheck`)

---

## ⚙️ Tecnología

- Se utiliza `swagger-jsdoc` para generar el schema OpenAPI 3.0
- Se monta la interfaz Swagger con `swagger-ui-express`
- Los comentarios están documentados en el archivo `src/app.js`
- El schema se genera al iniciar la app, de forma automática

---

## 🤔 Ventajas

- Permite probar la API sin Postman ni herramientas externas
- Visibilidad clara de todos los endpoints
- Práctico para evaluadores o devs que revisan el backend

---

## 🔐 Seguridad

- Todos los endpoints son de solo lectura
- No se exponen credenciales ni datos sensibles
- Swagger se puede desactivar en producción usando:

```env
ENABLE_SWAGGER=false
```

---

# Swagger Interactive Docs - Backend API (English)

This app includes a Swagger UI interface at `/docs` allowing developers and testers to explore and test API endpoints directly from the browser.

---

## 📍 Quick Access

Once the backend is running:

```
http://localhost:3000/docs
```

---

## 📄 Documented Endpoints

### `GET /files/data`
- Returns all processed files from the external API
- Supports optional `?fileName=...` param
- Filters out corrupted lines

### `GET /files/list`
- Returns the list of available filenames from the external API

### `GET /health`
- Returns simple `ok` response
- Useful for automated probes (LBs, gateways, etc.)

### `GET /selfcheck`
- HTML page that runs live system tests
- Confirms API availability and system readiness

---

## 🔄 Tags Grouping in Swagger

Endpoints are grouped using Swagger tags:

- **Default**: Functional endpoints (`/files/data`, `/files/list`)
- **Monitoring**: Health-related and diagnostic endpoints (`/health`, `/selfcheck`)

---

## ⚙️ Tech Notes

- Uses `swagger-jsdoc` to generate OpenAPI 3.0 schema
- Mounted via `swagger-ui-express`
- Comments are documented directly in `src/app.js`
- Schema is generated automatically at runtime

---

## 🤔 Benefits

- No Postman required to test
- Clear visibility of backend interface
- Great for developers, reviewers, and evaluators

---

## 🔐 Security

- All endpoints are read-only
- No sensitive data exposed
- Disable Swagger for production with:

```env
ENABLE_SWAGGER=false
```

