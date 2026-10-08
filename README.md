# Portfolio de Mar Abril

Plantilla estática en español, adaptable a móvil y sin dependencias externas.

## Ver la página

GitHub Pages está configurado para publicar la rama `main` desde `/ (root)` en [abrilmartinmar.github.io/Repositorio1](https://abrilmartinmar.github.io/Repositorio1/). Los cambios subidos a esa rama se publican mediante el proceso de GitHub Pages; comprueba que haya terminado antes de revisar la nueva versión.

Abre `index.html` en tu navegador, o desde esta carpeta ejecuta:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

## Modificarla

- `contenido.js`: obras, títulos, datos, descripción, biografía, formación, residencias, intereses, correo e Instagram. Los textos y las obras actuales son los facilitados por Mar.
- Guarda fotografías en `imagenes/` y usa, por ejemplo, `imagen: 'imagenes/mi-cuadro.jpg'`. Las imágenes vacías muestran composiciones gráficas de ejemplo.
- Añade objetos a `obras` para ampliar la galería.
- Cada obra tiene `categoria: 'paisaje-del-natural'` para paisajes pintados observando directamente el entorno, o `categoria: 'otras-obras'` para el resto. Las carpetas de Obras recientes utilizan ese campo; las obras sin categoría se muestran en Otras obras. Las categorías de las composiciones de ejemplo son demostrativas.
- En `proyectos`, añade `enlace: 'https://...'` para abrir un proyecto real. Sin enlace, se muestra su descripción en un diálogo.
- `styles.css`: colores (variables al comienzo), tipografía y distribución.
- `index.html`: estructura, nombre y textos de introducción.

Los cambios se hacen editando archivos; esta primera versión no incluye un panel de administración. No requiere cuentas, claves ni instalación de paquetes.

## Tipografía y estética

Fondo blanco y tonos rosas. Montserrat se sirve localmente desde `fuentes/` con su licencia OFL. Todos los títulos y nombres de carpetas utilizan Courier New, con Courier y monospace como alternativas del sistema. Los textos y la navegación mantienen Montserrat. Las fuentes de pruebas se conservan como archivos y no se cargan. El PDF de la revista no está incluido: se añadirá cuando se disponga de una versión accesible.

## Navegación

Pintura al óleo contiene las carpetas Toda la colección, Paisajes del natural y Otras pinturas, con descripciones y recuentos. Revista tiene una sección principal independiente; Proyectos reúne La Plazuela, La Llorona y Álvaro de Luna, cada uno con su propia carpeta. Sobre mí reúne biografía, formación, residencias e intereses cuando se facilitan datos. Las carpetas de proyectos muestran su descripción y las imágenes disponibles; La Plazuela incluye la portada de La Caleta.

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
- Proyectos: álbum ilustrado y trabajos de portadas musicales por encargo.
- Sobre mí: biografía y formación. Los campos `residencias` e `intereses` en `contenido.js` añaden contenido dentro de este apartado; esos bloques solo aparecen cuando tienen datos. Se incluye el XXXIX Curso de Paisaje en Priego de Córdoba y la beca concedida por la Escuela de Arte José Val del Omar de Granada, según los datos aportados por Mar. No se inventan fechas ni exposiciones.

La portada prioriza «Pintura al óleo» y mantiene la cuadrícula fina de ancho completo con celdas de 52 px (40 px en móvil).

Sobre mí muestra el texto de Mar sobre la pintura al óleo, la atmósfera, la luz y la materialidad, junto a un párrafo sobre la dimensión social que enlaza a la revista. Los párrafos se editan en `biografia` y `enfoqueSocial` dentro de `contenido.js`. Bachillerato e Integración Social se describen como estudios, sin atribuir títulos completados ni fechas no confirmadas.

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

## Sonidos

`sonidos.js` genera un clic breve al activar botones, carpetas y enlaces, y un roce de papel al pasar páginas en el lector (también con las flechas del teclado o el salto de página). El sonido empieza solo tras una interacción, nunca al cargar la web. El control «Sonido: sí/no» permite silenciar ambos efectos y recuerda la preferencia en el navegador. No requiere archivos de audio, servicios externos ni paquetes; si Web Audio o el almacenamiento no están disponibles, la web sigue funcionando.

## Me fui a comer y acabé desayunando

Óleo sobre madera de 70 × 90 cm, con título, soporte y unidad de medida confirmados por Mar. La descripción sobre la fiesta flamenca se ha reescrito a petición suya, manteniendo la energía nocturna y el caos de la celebración. El archivo HEIF de «Cuadro fiesta recortado.zip» se conserva en `imagenes/originales/me-fui-a-comer-y-acabe-desayunando.heif`. Para los navegadores se decodificó con `heif-convert` a `imagenes/me-fui-a-comer-y-acabe-desayunando.png`, sin reducción de resolución (3325 × 2594), recorte ni retoques. Se incluye en Otras pinturas; no se inventa una fecha.


## Cabecera y contacto

La cabecera muestra tres estrellas rosas de ocho puntas que enlazan al inicio: las laterales miden 42 px y la central 50 px. Los títulos de la portada y los apartados conservan Courier New. `sitio.js` actualiza los enlaces de contacto de las dos páginas. El contacto público es `marabrilmartin@gmail.com`, editable en `contenido.js`, y abre el programa de correo mediante `mailto:`. No se envían mensajes automáticamente. El bloque de Contacto tiene más espacio, título grande y enlaces rosas de mayor tamaño para destacar correo e Instagram tanto en ordenador como en móvil.

El Instagram facilitado por Mar es `@mareaaada`. Aparece junto al correo en las dos páginas y enlaza a `https://www.instagram.com/mareaaada/` en una pestaña nueva. Se edita mediante el campo `instagram` de `contenido.js`.


## Proyectos desarrollados

Las tres carpetas son «La Plazuela», «La Llorona» y «Álvaro de Luna», en ese orden; La Plazuela ocupa el primer lugar a petición de Mar. El álbum ilustrado se realizó en clase y se inspira en la interpretación de Clarissa Pinkola Estés. Mar participó en las portadas de «¿Dónde vamos?» y «Me va a doler», de Álvaro de Luna. En el EP de La Plazuela con David de Jacoba (cinco canciones), su aportación fue pintar el cuadro para la portada; no se le atribuye la autoría íntegra del diseño. Cada carpeta incluye `tipo`, título y descripción editables en `contenido.js`. La carpeta de La Plazuela incorpora el título del EP «La Caleta», la portada y una vista del cuadro original. Las imágenes de los otros proyectos siguen pendientes. La revista mantiene su entrada principal independiente.

## Paisajes del natural en Priego de Córdoba

Las imágenes de IMG_0258 e IMG_0251 corresponden a una obra y a su detalle; IMG_0255 muestra un segundo paisaje. Mar confirma que ambos fueron pintados del natural durante el XXXIX Curso de Paisaje de Priego de Córdoba. Se muestran en Paisajes del natural. A petición de Mar, se proponen los títulos provisionales «La tierra respira» (primer paisaje, óleo sobre madera) y «Luz sobre la sierra» (segundo paisaje, óleo sobre tabla). Las técnicas fueron confirmadas por ella; año y medidas siguen pendientes.

Se conservan los HEIC recibidos en `imagenes/originales/paisaje-priego-*.heic`. Las versiones PNG para el navegador se obtuvieron con `heif-convert`, sin reducir resolución ni retocar: campo 4218 × 4229, detalle 3024 × 4032 y montañas 5191 × 3674. El detalle se abre desde la ficha del primer paisaje.

En Sobre mí, «Cursos y residencias» muestra el nombre del curso, Priego de Córdoba, las entidades mencionadas por Mar (Patronato Municipal Adolfo Lozano Sidro y Escuela Libre de Artes Plásticas de Priego de Córdoba) y la beca que ganó en la Escuela de Arte José Val del Omar de Granada para asistir. No se atribuyen cargos organizativos concretos ni un año sin confirmación.

## Portada de La Caleta

La primera carpeta de Proyectos, La Plazuela, abre la portada del EP «La Caleta», junto al texto de la participación de Mar: pintar el cuadro utilizado en la portada. `imagenes/la-plazuela-la-caleta-portada.webp` conserva la imagen recibida en su ZIP, de 1103 × 1103, sin recortes ni retoques. El enlace al original abre la misma imagen. El visor admite imágenes de proyectos y mantiene la etiqueta «Portada de EP»; las otras carpetas siguen mostrando solo sus textos hasta que se faciliten más imágenes.

La ficha de La Plazuela permite alternar entre «Portada del EP» y «Cuadro original». La fotografía de IMG_0014 se conserva en `imagenes/originales/la-caleta-cuadro-original.heic`; `imagenes/la-caleta-cuadro-original.png` es su versión decodificada de 3024 × 4032, sin reducción ni retoques. El campo `encuadre` (x 116, y 690, ancho 2770, alto 2802) oculta mediante CSS el caballete y el fondo exterior, con un pequeño margen interior para evitar que aparezcan los bordes inclinados. El enlace al original sigue abriendo la fotografía completa. `tituloVista` permite nombrar la primera vista del proyecto como «Portada del EP»; las pinturas mantienen «Obra completa».
