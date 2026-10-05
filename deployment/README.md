# Despliegue de Grafo Estudio

La guía para editar y publicar está en [`../README.md`](../README.md). El flujo de GitHub Actions compila `main` y publica la versión estática en la rama `hostinger`; el panel de Hostinger debe estar conectado a esa rama y desplegarla en `public_html`.

`npm run package:hostinger` genera el ZIP estático en `outputs/grafo-estudio-hostinger.zip` para una publicación manual. El archivo no contiene el código editable ni secretos.
