import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // Allows access using both localhost and local network IP
    port: 5173,  // Ensures the server runs on the desired port
    proxy: {
      '/back': {
        target: 'http://localhost',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/back/, ''),
      },
    },
    hmr: {
      host: '192.168.68.14',  // Specify your local network IP for HMR
      port: 5173,            // Ensure the HMR port matches the server port
    },
  },
});