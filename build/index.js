import { fileURLToPath, URL } from 'node:url';
import { join, dirname } from 'node:path';
import { readdirSync } from 'node:fs';
import { build } from 'vite';
import vue from '@vitejs/plugin-vue';

const __dirname = dirname(fileURLToPath(import.meta.url));

const build_all = async () => {
  const pagesDir = join(__dirname, '../src');
  const pageDirs = readdirSync(pagesDir, { withFileTypes: true })
    .filter((dir) => dir.isDirectory())
    .map((dir) => dir.name);

  for (const dir of pageDirs) {
    const entry = join(pagesDir, dir, 'index.html');
    const outDir = join(__dirname, '../dist', dir);

    await build({
      root: join(__dirname, '../src', dir),
      plugins: [vue()],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
      },
      build: {
        outDir,
        emptyOutDir: true,
      },
      rollupOptions: {
        input: entry,
        output: {
          dir: `dist/${dir}`,
          assetFileNames: '[ext]/[name]-[hash].[ext]',
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
        },
      },
    });
    console.log(`built ${dir} successfully!`);
  }
};

build_all().catch((error) => {
  console.error(error);
  process.exit(1);
});
