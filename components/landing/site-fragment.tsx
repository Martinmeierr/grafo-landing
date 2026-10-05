import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const landingContent = join(process.cwd(), 'content', 'landing');

export function SiteFragment({ name }: { name: string }) {
  if (!/^[a-z]+(?:-[a-z]+)*$/.test(name)) {
    throw new Error(`Nombre de fragmento no válido: ${name}`);
  }
  const html = readFileSync(join(landingContent, `${name}.html`), 'utf8');
  return <div className="landing-fragment" dangerouslySetInnerHTML={{ __html: html }}/>;
}
