import { mkdir, copyFile, cp, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const output = resolve(root, 'dist');
await mkdir(output, { recursive: true });
for (const file of ['index.html', 'styles.css']) {
  await copyFile(resolve(root, file), resolve(output, file));
}
for (const folder of ['src', 'assets']) {
  await cp(resolve(root, folder), resolve(output, folder), { recursive: true });
}
await copyFile(resolve(root, 'index.html'), resolve(output, '404.html'));
const size = (await Promise.all(['index.html', 'styles.css', 'src/app.mjs', 'src/model.mjs', 'src/diagrams.mjs'].map(file => stat(resolve(output, file))))).reduce((sum, file) => sum + file.size, 0);
console.log(`Built static site in dist (${Math.round(size / 1024)} KB of HTML, CSS and JavaScript; no runtime dependencies).`);
