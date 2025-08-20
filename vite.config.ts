import { defineConfig } from 'vite';
import { readdirSync, statSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

function swAssetsPlugin() {
  return {
    name: 'sw-assets',
    apply: 'build',
    closeBundle() {
      const dist = path.resolve(process.cwd(), 'dist');
      const files: string[] = [];
      const walk = (dir: string) => {
        for (const f of readdirSync(path.join(dist, dir))) {
          const rel = path.join(dir, f);
          const abs = path.join(dist, rel);
          if (statSync(abs).isDirectory()) walk(rel);
          else if (rel !== 'sw.js' && !rel.endsWith('.map'))
            files.push('./' + rel.replace(/\\/g, '/'));
        }
      };
      walk('.');
      const swPath = path.join(dist, 'sw.js');
      const swSrc = readFileSync(swPath, 'utf8')
        .replace(
          'self.__CORE_ASSETS__ = self.__CORE_ASSETS__ || []',
          `self.__CORE_ASSETS__ = ${JSON.stringify(files)}`
        );
      writeFileSync(swPath, swSrc);
    }
  };
}

export default defineConfig({
  base: './',
  plugins: [swAssetsPlugin()]
});
