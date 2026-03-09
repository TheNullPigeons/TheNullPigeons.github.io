import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    port: 5173,
  },
  build: {
    outDir: 'dist',
  },
});

