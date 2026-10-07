# Portfolio de Mar Abril

Plantilla estática en español, adaptable a móvil y sin dependencias externas.

## Ver la página

Abre `index.html` en tu navegador, o desde esta carpeta ejecuta:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

## Modificarla

- `contenido.js`: obras, títulos, datos, descripción, biografía, formación, residencias e intereses. Los textos iniciales son ejemplos.
- Guarda fotografías en `imagenes/` y usa, por ejemplo, `imagen: 'imagenes/mi-cuadro.jpg'`. Las imágenes vacías muestran composiciones gráficas de ejemplo.
- Añade objetos a `obras` para ampliar la galería.
- Cada obra tiene `categoria: 'paisaje-del-natural'` para paisajes pintados observando directamente el entorno, o `categoria: 'otras-obras'` para el resto. Las carpetas de Obras recientes utilizan ese campo; las obras sin categoría se muestran en Otras obras. Las categorías de las composiciones de ejemplo son demostrativas.
- En `proyectos`, añade `enlace: 'https://...'` para abrir un proyecto real. Sin enlace, se muestra su descripción en un diálogo.
- `styles.css`: colores (variables al comienzo), tipografía y distribución.
- `index.html`: estructura, nombre y textos de introducción.

Los cambios se hacen editando archivos; esta primera versión no incluye un panel de administración. No requiere cuentas, claves ni instalación de paquetes.

## Tipografía y estética

Fondo blanco y tonos rosas. Montserrat se sirve localmente desde `fuentes/` con su licencia OFL. Todos los títulos y nombres de carpetas utilizan Courier New, con Courier y monospace como alternativas del sistema. Los textos y la navegación mantienen Montserrat. Las fuentes anteriores se conservan como archivos para posibles pruebas, pero no se cargan en la web. El PDF de la revista no está incluido: se añadirá cuando se disponga de una versión accesible.

## Navegación

Pintura al óleo contiene las carpetas Toda la colección, Paisajes del natural y Otras pinturas, con descripciones y recuentos. Revista tiene una sección principal independiente; Proyectos contiene Ilustración. Sobre mí reúne biografía, formación, residencias e intereses cuando se facilitan datos. Las carpetas de proyectos muestran su descripción hasta que se añadan sus imágenes o enlaces reales.

## Portada

El inicio contiene solo el nombre, las disciplinas y el acceso a las obras, con una cuadrícula rosa suave sobre blanco. Courier New aporta el aspecto de una máquina de escribir al nombre, la portada y todos los títulos de apartados, obras y proyectos; los textos mantienen Montserrat.

La referencia de papelería se refleja en la portada como una carpeta malva con cuatro pestañas navegables (Pintura, Revista, Proyectos y Sobre mí), sobre la cuadrícula. Las carpetas de contenido incorporan textura de papel generada en CSS/SVG, sin copiar el texto ni las imágenes del ejemplo.

## Revista y lector de PDF

La página independiente `revista.html`, accesible desde el menú y su pestaña de portada, ofrece portada, hojas enfrentadas en escritorio, una página en móvil, paso de hojas animado, texto seleccionable, zoom, salto a página, pantalla completa y descarga. Las animaciones respetan la preferencia de movimiento reducido.

Mientras falta el archivo público, **Abrir mi PDF** permite leer una revista desde el ordenador: se procesa en el navegador y no se envía a ningún servidor. Ese archivo no queda publicado ni se conserva al recargar la página.

Para mostrarla automáticamente a todos los visitantes, guarda el PDF autorizado en el repositorio (por ejemplo `revistas/mar-abril.pdf`) y define `revista.archivo: 'revistas/mar-abril.pdf'` en `contenido.js`. Conserva el texto y las fuentes en el PDF al comprimirlo; reducir las imágenes a 150 ppp suele bastar para una versión de lectura web. El PDF original adjunto supera el límite de transferencia de 32 MiB y aún no se ha incorporado.

`revista.js` carga PDF.js 4.10.38 solo cuando hace falta. La distribución local de `vendor/pdfjs/` se obtuvo de npm y se verificó con su integridad SHA-512; `VERSION.txt` registra la fuente y `LICENSE` su licencia Apache 2.0. Se incluyen mapas de caracteres y fuentes estándar. Para probar el lector es necesario servir la página por HTTP, no abrir el HTML mediante `file://`.

La portada no abre el lector: el inicio está en `index.html`, y la revista se abre únicamente al navegar a `revista.html`.

## Organización de la web

La web completa funciona como portfolio personal; no hay una sección adicional llamada Portfolio.

- Pintura: núcleo de la web, con óleos y categorías Paisajes del natural y Otras pinturas.
- Revista: apartado principal con su página de lectura independiente; se abre desde el menú o la portada.
- Proyectos: ilustración y otros trabajos.
- Sobre mí: biografía y formación. Los campos `residencias` e `intereses` en `contenido.js` añaden contenido dentro de este apartado; esos bloques solo aparecen cuando tienen datos. Por ahora se muestra únicamente la formación confirmada por Mar. No se incluyen exposiciones ni residencias inventadas.

La portada prioriza «Pintura al óleo» y mantiene la cuadrícula fina de ancho completo con celdas de 52 px (40 px en móvil).

La biografía y el texto «La mancha y el color» se basan en el relato de Mar: el dibujo en Bachillerato de Artes, su acercamiento a la pintura mientras estudiaba Integración Social y su interés por la mancha, la construcción de la forma y los tonos. Bachillerato e Integración Social se describen como estudios, sin atribuir títulos completados ni fechas no confirmadas.
