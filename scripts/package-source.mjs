import { execFileSync } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const projectRoot = process.cwd();
const outputDirectory = resolve(projectRoot, 'outputs');
const archivePath = resolve(outputDirectory, 'grafo-estudio-codigo.zip');

await mkdir(outputDirectory, { recursive: true });
execFileSync('git', ['archive', '--format=zip', `--output=${archivePath}`, 'HEAD'], { cwd: projectRoot });
console.log(`Archivo listo desde el commit actual: ${archivePath}`);
