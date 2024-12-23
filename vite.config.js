import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    // Elimina la configuración HTTPS
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
});