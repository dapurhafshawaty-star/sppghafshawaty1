import fs from 'node:fs';
import { execSync } from 'node:child_process';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production';
}

if (!fs.existsSync('./dist/server.cjs')) {
  console.log('Folder dist/server.cjs belum ditemukan. Menjalankan npm run build...');
  execSync('npm run build', { stdio: 'inherit' });
}

require('./dist/server.cjs');
