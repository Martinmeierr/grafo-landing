import { execFileSync } from 'node:child_process';
import { copyFile, writeFile } from 'node:fs/promises';

await copyFile('deployment/hostinger.htaccess', 'out/.htaccess');

const revision = process.env.GITHUB_SHA
  || execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();

await writeFile('out/version.json', `${JSON.stringify({
  revision,
  builtAt: new Date().toISOString(),
}, null, 2)}\n`);
