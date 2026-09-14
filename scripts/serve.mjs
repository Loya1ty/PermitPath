import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';

const root = resolve(import.meta.dirname, '..', process.argv.includes('--dist') ? 'dist' : '.');
const port = Number(process.env.PORT || 4173);
const mime = { '.html': 'text/html', '.css': 'text/css', '.mjs': 'text/javascript', '.svg': 'image/svg+xml' };
createServer(async (request, response) => {
  try {
    let pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    // The alias exercises repository-subpath hosting without changing the build.
    if (pathname.startsWith('/PermitPath/')) pathname = pathname.slice('/PermitPath'.length);
    let path = resolve(root, '.' + pathname);
    if (path !== root && !path.startsWith(root + sep)) {
      response.writeHead(403).end('Forbidden');
      return;
    }
    if ((await stat(path)).isDirectory()) path = resolve(path, 'index.html');
    response.writeHead(200, { 'Content-Type': mime[extname(path)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    response.end(await readFile(path));
  } catch (error) {
    if (error.code === 'ENOENT' || error.code === 'ENOTDIR' || error instanceof URIError) {
      response.writeHead(404).end('Not found');
    } else {
      console.error(error);
      response.writeHead(500).end('Unable to read the requested file');
    }
  }
}).listen(port, '127.0.0.1', () => console.log(`PermitPath: http://127.0.0.1:${port} (subpath: /PermitPath/)`));
