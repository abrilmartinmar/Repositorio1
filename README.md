# Portfolio de Mar Abril

Plantilla estática en español, adaptable a móvil y sin dependencias externas.

## Ver la página

Abre `index.html` en tu navegador, o desde esta carpeta ejecuta:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

## Modificarla

- `contenido.js`: obras, títulos, datos, descripción, biografía y curiosidades. Los textos iniciales son ejemplos.
- Guarda fotografías en `imagenes/` y usa, por ejemplo, `imagen: 'imagenes/mi-cuadro.jpg'`. Las imágenes vacías muestran composiciones gráficas de ejemplo.
- Añade objetos a `obras` para ampliar la galería.
- Cada obra tiene `categoria: 'paisaje-del-natural'` para paisajes pintados observando directamente el entorno, o `categoria: 'otras-obras'` para el resto. Las carpetas de Obras recientes utilizan ese campo; las obras sin categoría se muestran en Otras obras. Las categorías de las composiciones de ejemplo son demostrativas.
- En `proyectos`, añade `enlace: 'https://...'` para abrir un proyecto real. Sin enlace, se muestra su descripción en un diálogo.
- `styles.css`: colores (variables al comienzo), tipografía y distribución.
- `index.html`: estructura, nombre y textos de introducción.

Los cambios se hacen editando archivos; esta primera versión no incluye un panel de administración. No requiere cuentas, claves ni instalación de paquetes.

## Tipografía y estética

Fondo blanco y tonos rosas. Montserrat se sirve localmente desde `fuentes/` con su licencia OFL. Los títulos utilizan Cormorant Garamond, una tipografía serif con licencia OFL incluida en `fuentes/cormorantgaramond-OFL.txt`. Los textos mantienen Montserrat. Las fuentes anteriores se conservan como archivos para posibles pruebas, pero no se cargan en la web. El PDF de la revista no está incluido: se añadirá cuando se disponga de una versión accesible.

## Navegación

Pintura al óleo contiene las carpetas Toda la colección, Paisajes del natural y Otras pinturas, con descripciones y recuentos. Ilustración y proyectos contiene Revista, Ilustración y bocetos y Otros proyectos. Las carpetas de proyectos muestran su descripción hasta que se añadan sus imágenes o enlaces reales.

## Portada

El inicio contiene solo el nombre, las disciplinas y el acceso a las obras, con una cuadrícula rosa suave sobre blanco. Courier New, con Courier y monospace como alternativas del sistema, aporta el aspecto de una máquina de escribir al nombre y a la portada; Cormorant Garamond y Montserrat permanecen en la galería y los textos.

La referencia de papelería se refleja en la portada como una carpeta malva con tres pestañas navegables (Pintura, Proyectos y Sobre mí), sobre la cuadrícula. Las carpetas de contenido incorporan textura de papel generada en CSS/SVG, sin copiar el texto ni las imágenes del ejemplo.

## Revista y lector de PDF

La página independiente `revista.html`, accesible desde el menú y la carpeta Revista, ofrece portada, hojas enfrentadas en escritorio, una página en móvil, paso de hojas animado, texto seleccionable, zoom, salto a página, pantalla completa y descarga. Las animaciones respetan la preferencia de movimiento reducido.

Mientras falta el archivo público, **Abrir mi PDF** permite leer una revista desde el ordenador: se procesa en el navegador y no se envía a ningún servidor. Ese archivo no queda publicado ni se conserva al recargar la página.

Para mostrarla automáticamente a todos los visitantes, guarda el PDF autorizado en el repositorio (por ejemplo `revistas/mar-abril.pdf`) y define `revista.archivo: 'revistas/mar-abril.pdf'` en `contenido.js`. Conserva el texto y las fuentes en el PDF al comprimirlo; reducir las imágenes a 150 ppp suele bastar para una versión de lectura web. El PDF original adjunto supera el límite de transferencia de 32 MiB y aún no se ha incorporado.

`revista.js` carga PDF.js 4.10.38 solo cuando hace falta. La distribución local de `vendor/pdfjs/` se obtuvo de npm y se verificó con su integridad SHA-512; `VERSION.txt` registra la fuente y `LICENSE` su licencia Apache 2.0. Se incluyen mapas de caracteres y fuentes estándar. Para probar el lector es necesario servir la página por HTTP, no abrir el HTML mediante `file://`.

La portada no abre el lector: el inicio está en `index.html`, y la revista se abre únicamente al navegar a `revista.html`.
