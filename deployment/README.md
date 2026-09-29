# Hostinger

La landing se publica como archivos estáticos. Mantiene los componentes React,
las galerías, el comparador y el formulario de WhatsApp sin un servidor Node.js.

## Despliegue automático desde GitHub

El código fuente vive en `main`. Cada push a esa rama ejecuta
`.github/workflows/hostinger.yml`: instala las dependencias del lockfile, revisa
el código, compila la exportación estática y publica su contenido en la rama
`hostinger` del mismo repositorio. También se puede ejecutar desde GitHub Actions
con **Run workflow** sobre `main`.

En Hostinger, conectar `Martinmeierr/grafo-landing` desde **Avanzado → GIT**,
seleccionar la rama `hostinger`, destino `public_html`, y activar los despliegues
automáticos. No conectar `main` directamente a `public_html`: contiene el código
fuente, que requiere compilación. No editar la rama generada manualmente.

GitHub Actions usa su token temporal, limitado a este repositorio. No se necesitan
contraseñas FTP ni claves SSH. Hostinger usa su propia integración con GitHub.

`https://estudiografo.com/version.json` identifica el commit de código fuente
publicado. Un build fallido no actualiza la rama de despliegue. Para revertir una
versión, revertir el cambio correspondiente en `main` y subir ese commit.

## Compilación y respaldo manual

Desde la raíz del proyecto:

```sh
GRAFO_SITE_URL=https://estudiografo.com npm run build:hostinger
mkdir -p outputs
(cd out && zip -qr ../outputs/grafo-hostinger.zip .)
```

Subir el contenido de `out/` a `public_html` en el sitio `estudiografo.com` de
Hostinger. El ZIP contiene solo archivos públicos generados, no código fuente,
credenciales ni dependencias. Guardar una copia de la versión anterior antes de
reemplazar una publicación existente.

`npm run dev` y `npm run build` conservan el flujo local de Vinext.
