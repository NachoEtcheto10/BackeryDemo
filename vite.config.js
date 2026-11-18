import { cpSync } from 'node:fs';
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

// Copia assets/images al dist/ en build para rutas dinámicas (/assets/images/...)
function copyRuntimeImages() {
  let config;
  return {
    name: 'copy-runtime-images',
    apply: 'build',
    configResolved(resolved) {
      config = resolved;
    },
    closeBundle() {
      cpSync(
        resolve(config.root, 'assets/images'),
        resolve(config.root, config.build.outDir, 'assets/images'),
        { recursive: true }
      );
    }
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), copyRuntimeImages()]
});
