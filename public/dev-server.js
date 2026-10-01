// Local preview server for /public (no dependencies). Run with:  npm run dev
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(root, 'public');
const PORT = process.env.PORT || 3000;

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon', '.pdf': 'application/pdf',
};

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  try {
    // Static files (clean URLs: /about -> /about.html)
    let rel = decodeURIComponent(url.pathname);
    if (rel.endsWith('/')) rel += 'index.html';
    let file = path.join(publicDir, path.normalize(rel));
    if (!file.startsWith(publicDir)) { res.statusCode = 403; return res.end(); }
    if (!existsSync(file) && existsSync(file + '.html')) file += '.html';
    const info = await stat(file).catch(() => null);
    if (!info || !info.isFile()) {
      res.statusCode = 404;
      res.setHeader('Content-Type', TYPES['.html']);
      return res.end(await readFile(path.join(publicDir, '404.html')).catch(() => 'Not found'));
    }
    res.setHeader('Content-Type', TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream');
    res.end(await readFile(file));
  } catch (err) {
    console.error(err);
    if (!res.headersSent) res.statusCode = 500;
    res.end('Server error');
  }
});

server.listen(PORT, () => {
  console.log(`\n  Portfolio running at http://localhost:${PORT}\n`);

});
