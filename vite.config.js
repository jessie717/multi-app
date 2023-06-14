import { fileURLToPath, URL } from 'node:url';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';


const npm_config_project = process.env['npm_config_project'];

if (!npm_config_project) {
  throw new Error(
    '缺少指定模块!, 如果是构建指定模块，请使用 --project=[moduleName]'
    );
  }

const input = resolve(__dirname, `src/${npm_config_project}/index.html`);

export default defineConfig({
  root: `./src/${npm_config_project}`,
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      input,
      output: {
        dir: `dist/${npm_config_project}`,
        assetFileNames: '[ext]/[name]-[hash].[ext]',
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
      },
    },
  },
});
