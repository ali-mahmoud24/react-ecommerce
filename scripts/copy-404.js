import { copyFile } from 'fs/promises';
import { resolve } from 'path';

const src = resolve('dist/index.html');
const dest = resolve('dist/404.html');

try {
  await copyFile(src, dest);
  console.log('✅ Copied index.html → 404.html');
} catch (err) {
  console.error('❌ Failed to copy 404.html', err);
  process.exit(1);
}
