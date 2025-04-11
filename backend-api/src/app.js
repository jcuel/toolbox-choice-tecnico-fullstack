// src/app.js
const express = require('express');
const axios = require('axios');
require('dotenv').config();

const cors = require('cors');
const allowedOrigin = process.env.FRONTEND_ORIGIN;

const app = express();


app.use(cors({
    origin: 'allowedOrigin',
  }));
  
//add swagger
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');




// Global vars from env
const PORT = process.env.PORT || 3000;
const API_URL = process.env.API_URL;
const AUTH_HEADER = {
    headers: {
        Authorization: `Bearer ${process.env.API_KEY}`
    }
};

if (process.env.ENABLE_SWAGGER !== 'false') {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

/**
 * @swagger
 * /files/data:
 *   get:
 *     summary: Devuelve archivos procesados con formato JSON
 *     parameters:
 *       - in: query
 *         name: fileName
 *         schema:
 *           type: string
 *         description: Nombre del archivo CSV a procesar (opcional)
 *     responses:
 *       200:
 *         description: Lista de archivos procesados
 */

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Devuelve un estado simple del sistema (para LB o probes)
 *     responses:
 *       200:
 *         description: OK
 */
app.get('/health', (_req, res) => {
  res.status(200).send('ok');
});


/**
 * @swagger
 * /selfcheck:
 *   get:
 *     summary: Página HTML de chequeo de salud del backend (tests en vivo)
 *     description: Esta página ejecuta tests automáticos contra el backend y el API externo para verificar que todo funcione correctamente.
 *     responses:
 *       200:
 *         description: Página HTML con resultados de pruebas automáticas.
 */
const path = require('path');
app.get('/selfcheck', (_req, res) => {
  res.sendFile(path.join(__dirname, '../public/selfcheck.html'));
});


app.get('/files/data', async (req, res) => {
    try {
      const { fileName } = req.query;
  
      const fetchAndFormatFile = async (filename) => {
        try {
          const fileResp = await axios.get(`${API_URL}/file/${filename}`, AUTH_HEADER);
          const lines = fileResp.data.split('\n').slice(1).filter(Boolean);
  
          const validLines = lines
            .map((line) => {
              const [file, text, number, hex] = line.split(',');
              if ([file, text, number, hex].some((val) => !val)) return null;
              return { text, number: Number(number), hex };
            })
            .filter(Boolean);
  
          return { file: filename, lines: validLines };
        } catch (err) {
          return null;
        }
      };
  
      let filesToFetch = [];
  
      if (fileName) {
        filesToFetch = [fileName];
      } else {
        const listResp = await axios.get(`${API_URL}/files`, AUTH_HEADER);
        filesToFetch = listResp.data.files || [];
      }
  
      const results = await Promise.all(filesToFetch.map(fetchAndFormatFile));
      const validResults = results.filter(Boolean);
  
      res.status(200).json(validResults);
    } catch (error) {
      res.status(500).json({ error: 'Failed to process files' });
    }
  });  

/**
 * @swagger
 * /files/list:
 *   get:
 *     summary: Devuelve la lista de archivos disponibles desde el API externo
 *     responses:
 *       200:
 *         description: Array de nombres de archivo
 */
app.get('/files/list', async (req, res) => {
    try {
      const filesResp = await axios.get(`${API_URL}/files`, AUTH_HEADER);
      const files = filesResp.data.files || [];
      res.status(200).json(files);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch file list' });
    }
  });

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`API running on http://localhost:${PORT}`);
    });
}

module.exports = app;
