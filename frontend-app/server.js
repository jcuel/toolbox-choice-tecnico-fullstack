const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 8080;
const API_PROXY = process.env.VITE_API_URL || 'http://localhost:3000'; // default backend fallback

// Proxy /api to the backend
app.use(
  '/api',
  createProxyMiddleware({
    target: API_PROXY,
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
  })
);

// Serve static files from dist/
app.use(express.static(path.join(__dirname, 'dist')));

// Serve /selfcheck as static test page
app.get('/selfcheck', (_req, res) => {
    res.sendFile(path.join(__dirname, '/dist/tests', 'tests.html'));
  });

// Fallback to index.html (for SPA routing)
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Frontend server running at http://0.0.0.0:${PORT}`);
});
