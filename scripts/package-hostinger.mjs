import { execFileSync } from 'node:child_process';
import { mkdir, rm } from 'node:fs/promises';
import { resolve } from 'node:path';

const projectRoot = process.cwd();
const outputDirectory = resolve(projectRoot, 'outputs');
const archivePath = resolve(outputDirectory, 'grafo-estudio-hostinger.zip');

await mkdir(outputDirectory, { recursive: true });
await rm(archivePath, { force: true });
execFileSync('zip', ['-qr', archivePath, '.'], { cwd: resolve(projectRoot, 'out') });
console.log(`Archivo listo: ${archivePath}`);
