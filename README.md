# Grafo Estudio

Landing de Grafo Estudio desarrollada con Next.js y React. El contenido visual que entregó el estudio está separado por sección en `content/landing/`; los estilos están en `content/landing.css` y las interacciones en `public/scripts/grafo-landing.js`.

## Para editar la web

Necesitás Node.js 22.13 o más reciente y Git.

1. Descargá o cloná este repositorio y abrí una terminal dentro de la carpeta.
2. Instalá dependencias una vez con `npm ci`.
3. Iniciá la vista local con `npm run dev` y abrí la dirección que muestra la terminal (normalmente `http://localhost:3000`).
4. Editá los textos y secciones en `content/landing/*.html`, los estilos en `content/landing.css`, las imágenes en `public/images/landing/` y la lógica del menú, galerías y formulario en `public/scripts/grafo-landing.js`.
5. Para preparar una carpeta de publicación y su ZIP manual, ejecutá `npm run package:hostinger`. El ZIP queda en `outputs/grafo-estudio-hostinger.zip`.

No modifiques `out/` a mano: se vuelve a generar al compilar. El ZIP de Hostinger incluye solo el sitio público ya compilado. Si usás GitHub, tampoco hace falta subir ese ZIP en cada cambio: al hacer commit y push a `main`, GitHub Actions compila el sitio y actualiza la rama `hostinger`, que Hostinger puede desplegar automáticamente.

Los bloques de la página están separados con los mismos nombres de sección en `content/landing/`. Si recibís una nueva versión del HTML completo del diseño, se puede volver a importar con `python3 scripts/import-landing-html.py /ruta/al/archivo.html`. Ese script parte el contenido, extrae las imágenes repetidas y conserva las interacciones en archivos editables.

## Publicar por GitHub

Con el repositorio conectado en Hostinger → Avanzado → GIT, el sitio debe seguir la rama `hostinger`, apuntar a `public_html` y tener activados los despliegues automáticos. Después de editar, guardá y subí los cambios desde la terminal:

```sh
git add .
git commit -m "Actualizar landing de Grafo"
git push origin main
```

GitHub Actions compila la web y Hostinger publica los archivos generados. En ese flujo no subas el ZIP manual. La cuenta que hace el push necesita permiso de escritura al repositorio.

## Publicar manualmente con el ZIP

1. Ejecutá `npm ci` si todavía no instalaste dependencias.
2. Ejecutá `npm run package:hostinger`.
3. En Hostinger → Gestor de archivos → `public_html`, guardá una copia de la versión actual antes de reemplazar archivos.
4. Subí `outputs/grafo-estudio-hostinger.zip` y extraelo en `public_html`, confirmando que se reemplacen los archivos del sitio.

Este método publica el resultado estático, no el código fuente. Para compartir el proyecto editable con otro desarrollador, compartí el repositorio o generá `outputs/grafo-estudio-codigo.zip` después de guardar en Git el commit que querés entregar, usando `npm run package:source`. El arquitecto puede devolverte sus cambios en el ZIP si todavía no tiene acceso al repositorio.
