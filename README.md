# Invitación de Nazia ✦

Invitación estática, adaptable a celulares, hecha con HTML, CSS y JavaScript. Sin backend, sin instalación ni compilación. No reproduce música ni solicita datos en formularios.

## Abrir localmente

Abre `index.html` con tu navegador. También puedes servir esta carpeta con Python:

```sh
python -m http.server 8080
```

Luego abre `http://localhost:8080`. En Windows también puedes usar `py -m http.server 8080`.

## Personalizar

Edita `config.js`: nombre, edad, fecha, hora, dirección, número de WhatsApp y mensaje. Usa fecha `AAAA-MM-DD`, hora de 24 horas y número internacional sin `+`. `{name}` se sustituye por el nombre. Para generar Google Maps desde la dirección, deja `mapsUrl: ''`. La hora es la hora local del evento en Lima, no se convierte según el dispositivo del invitado.

Si cambias los datos, actualiza también los textos originales, enlaces y metadatos en `index.html`: son el respaldo sin JavaScript y los textos que leen servicios como WhatsApp, que no ejecutan `config.js`. La ilustración está en `assets/huntrx.jpg`.

## Publicar y compartir por WhatsApp

**Netlify:** entra a tu cuenta, elige la opción de desplegar manualmente y arrastra esta carpeta completa (la que contiene `index.html`). No necesitas comando de compilación. Netlify proporciona una URL HTTPS; copia ese enlace a WhatsApp.

**Vercel:** sube estos archivos a un repositorio e impórtalo como proyecto. Selecciona el tipo de proyecto estático/Other, deja vacío el comando de compilación y usa la raíz que contiene `index.html` como directorio público. Publica y comparte la URL HTTPS.

**GitHub Pages:** coloca el contenido de esta carpeta en la raíz de un repositorio. En Settings → Pages, elige publicar desde la rama `main`, carpeta `/ (root)`. Espera a que se publique y comparte el enlace mostrado allí. Los recursos usan rutas relativas y funcionan dentro de un subdirectorio.

Para actualizar, reemplaza los archivos o sube los cambios al repositorio. Estos servicios pueden cambiar los nombres de sus opciones. No se ha publicado automáticamente este proyecto: el enlace compartible estará disponible al desplegarlo.

## Archivos y accesibilidad

- `index.html`: contenido, estructura semántica y respaldo sin JavaScript.
- `styles.css`: diseño adaptable y respeto por movimiento reducido.
- `script.js`: apertura, configuración y estrellas temporales.
- `config.js`: datos personalizables.
- `assets/huntrx.jpg`: imagen de las protagonistas de KPop Demon Hunters.

Los enlaces de mapa y confirmación abren una nueva pestaña; la confirmación prepara un mensaje, pero el invitado decide enviarlo en WhatsApp. Todos los controles se pueden usar con teclado. El foco pasa al título al abrir. Las animaciones duran pocos segundos y se desactivan con la preferencia del sistema de reducir movimiento. Sin JavaScript se muestra directamente la invitación completa. Las fuentes de Google son opcionales: hay fuentes locales de respaldo. La página no usa analítica, almacenamiento local ni cookies propias.

## Diseño actualizado

Formato de carta vertical con marco fino, sobre de apertura y composición centrada. Imagen de Zoey, Rumi y Mira en escena, tomada de Netflix Tudum: https://www.netflix.com/tudum/articles/kpop-demon-hunters-release-date-cast-news . Personajes e imagen pertenecen a sus respectivos titulares; esta invitación no es un producto oficial.
