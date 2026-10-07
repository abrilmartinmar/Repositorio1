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

## Primera obra recibida

`imagenes/mar-abril-03.png` contiene la imagen original del ZIP Mar Abril-3, sin recorte, reducción ni modificación de píxeles (3177 × 5087). Sustituye las tres obras gráficas de ejemplo. La obra se titula «No te vayas de mi lao» y su técnica es óleo sobre lienzo, según los datos aportados por Mar. Su descripción recoge su investigación del contraluz, la atmósfera y la relación entre figura y luz en una cueva del Sacromonte. Año y medidas siguen pendientes y no se han inventado. Se muestra en Otras pinturas; el detalle permite abrir el original. La imagen se carga de forma diferida para que su tamaño no bloquee la portada.

## Segunda obra recibida

«Mi reflejo» es un óleo sobre lienzo de 61 × 50 cm. Mar describe su origen en una fotografía tomada en la cueva de una amiga en el Sacromonte y su exploración de una textura nacarada en el reflejo. `imagenes/mar-abril-01.png` conserva el original del ZIP Mar Abril (2907 × 3533), sin recorte ni modificación. Se incluye en Otras pinturas con su ficha y acceso al original. No se atribuye un año de realización sin confirmación.

Las descripciones de las dos obras conservan literalmente los textos proporcionados por Mar. «Mi reflejo» incluye además «Detalle del rostro» en su ficha: `imagenes/mi-reflejo-detalle.png` conserva el archivo de 6000 × 4000 del ZIP Mar Abril editada julia-3. Se orienta mediante CSS en el visor, sin alterar el archivo. Los botones permiten alternar entre la obra completa y el detalle; el enlace al original corresponde a la vista seleccionada. El detalle se carga solo al seleccionarlo.

## Sal que te cuente

Óleo sobre lienzo, con el título y la descripción aportados literalmente por Mar. `imagenes/sal-que-te-cuente.png` conserva el original de `_DSC1363-2.zip` (3698 × 5734), sin recorte ni modificación. Se muestra en Otras pinturas, con acceso al archivo original en su ficha. Año y medidas no se incluyen al no haberse facilitado.

El campo `encuadre` de esta obra define el rectángulo visible de la fotografía en píxeles del original: x 24, y 88, ancho 3646, alto 5510. La galería y la ficha ocultan el borde exterior de la foto mediante CSS, respetando las proporciones. El archivo original y el enlace de descarga siguen intactos. El ajuste es reversible desde `contenido.js`.

## Soledad de verano

Óleo sobre lienzo, con el título y la descripción de Mar sobre La Caleta de Salobreña conservados literalmente. `imagenes/soledad-de-verano.png` contiene el original del nuevo ZIP Mar Abril-3 (3725 × 3725), sin modificaciones; la ruta es distinta de la primera obra recibida, aunque los ZIP compartan nombre. No se inventan año ni medidas. Mar confirma que la pintó a partir de una fotografía, por lo que se incluye en Otras pinturas.
