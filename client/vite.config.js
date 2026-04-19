import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://portfolio-tracker-api-4fsi.onrender.com',
        changeOrigin: true,
      },
    },
  },
});