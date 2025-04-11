import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// read env and generate a proxy to avoid cors issues
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const API_PROXY = env.VITE_API_URL;

  return {
    plugins: [react()],
    server: API_PROXY
      ? {
          host: true,
          proxy: {
            '/api': {
              target: API_PROXY,
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api/, ''), 
            },
          },
        }
      : {
        host: true,
      },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
    },
    test: {
      globals: true,
      environment: 'jsdom',
      rollupOptions: {
        input: '/index.vite.html'
      }
    },
  };
});
