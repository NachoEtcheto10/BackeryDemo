import { cpSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

// app.js arma rutas de imágenes en tiempo de ejecución (assets/images/...), así que
// el build tiene que copiar esa carpeta tal cual además de las que detecta en el HTML.
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
  plugins: [copyRuntimeImages()]
});
