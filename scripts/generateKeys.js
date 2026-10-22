import { generateKeyPairSync } from 'crypto';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve(import.meta.dirname, '..', 'keys');
const privatePath = path.join(outDir, 'private.pem');
const publicPath = path.join(outDir, 'public.pem');

if (fs.existsSync(privatePath)) {
  console.error('Keys already exists! - NOK', outDir);
  process.exit(1);
}

const { privateKey, publicKey } = generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
  });

fs.writeFileSync(privatePath, privateKey);
fs.writeFileSync(publicPath, publicKey);

console.log('Keys created - OK');