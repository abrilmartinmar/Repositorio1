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

Fondo blanco y tonos rosas. Montserrat se sirve localmente desde `fuentes/` con su licencia OFL. Todos los títulos y nombres de carpetas utilizan Courier New, con Courier y monospace como alternativas del sistema. Los textos y la navegación mantienen Montserrat. Las fuentes de pruebas se conservan como archivos y no se cargan. La revista GRX se incluye con su PDF original en `revistas/mar-abril-grx.pdf`, sin recomprimir ni cambiar sus fuentes o imágenes.

## Navegación

Pintura al óleo contiene las carpetas Toda la colección, Paisajes del natural y Otras pinturas, con descripciones y recuentos. Revista tiene una sección principal independiente; Proyectos reúne La Plazuela, La Llorona y Álvaro de Luna, cada uno con su propia carpeta. Sobre mí reúne biografía, formación, residencias e intereses cuando se facilitan datos. Las carpetas de proyectos muestran su descripción y las imágenes disponibles; La Plazuela incluye la portada de La Caleta.

## Portada

El inicio contiene solo el nombre, las disciplinas y el acceso a las obras, con una cuadrícula rosa suave sobre blanco. Courier New aporta el aspecto de una máquina de escribir al nombre, la portada y todos los títulos de apartados, obras y proyectos; los textos mantienen Montserrat.

La referencia de papelería se refleja en la portada como una carpeta malva con cuatro pestañas navegables (Pintura, Revista, Proyectos y Sobre mí), sobre la cuadrícula. Las carpetas de contenido incorporan textura de papel generada en CSS/SVG, sin copiar el texto ni las imágenes del ejemplo.

## Revista y lector de PDF

La página independiente `revista.html`, accesible desde el menú y su pestaña de portada, ofrece portada, hojas enfrentadas en escritorio, una página en móvil, paso de hojas animado, texto seleccionable, zoom, salto a página, pantalla completa y descarga. Las animaciones respetan la preferencia de movimiento reducido.

El lector abre automáticamente las 24 páginas del PDF original de GRX al entrar en `revista.html`, sin cargarlo en el inicio. El botón «Descargar PDF» permite guardar el mismo archivo completo. «Leer revista original» conserva el acceso a la copia de Google Drive.

Si se deja vacío `revista.archivo`, se recupera la opción **Abrir mi PDF** para leer un archivo local: no se envía a ningún servidor ni queda publicado. Esa opción se oculta a los visitantes cuando ya hay una revista configurada.

El campo `revista.archivo` en `contenido.js` apunta a `revistas/mar-abril-grx.pdf`; `revista.titulo` es «GRX · Mar Abril». El archivo se descargó directamente del enlace de Google Drive facilitado por Mar una vez disponible el acceso de red. Contiene 24 páginas A4, sin contraseña, y mantiene las fuentes incrustadas (incluida Retrogression) y las imágenes originales. El PDF mide 48.072.135 bytes y su SHA-256 es `d3fe9e3837b1ed597b87cc9139401cbb42a198cda0b12bef7c1dee9f709887f4`. La copia del repositorio se verificó idéntica a la descargada: no se ha recomprimido, rasterizado ni reducido.

El límite de transferencia de adjuntos de 32 MiB no afecta a esta descarga directa. Los dominios `drive.google.com` y `drive.usercontent.google.com` están registrados en la configuración de red y la descarga respondió correctamente. El lector pinta únicamente las hojas que se están viendo y conserva una capa de texto seleccionable.

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

`sonidos.js` genera un sonido de tecla con crujidos y textura adhesiva de 0,28 s al activar botones, carpetas y enlaces. El paso de página utiliza un crujido de papel de 0,68 s, también con el teclado o el salto de página. Cuatro variantes y pequeñas variaciones de velocidad evitan una repetición idéntica. La intensidad es mayor que en la versión anterior; un compresor y un limitador suave controlan los picos al pulsar varias veces. El audio se prepara durante el primer contacto táctil, clic o activación con teclado, y se reanuda si el navegador lo suspende o interrumpe. La reproducción se dispara una sola vez en la activación, nunca al cargar la web ni al empezar a deslizar una carpeta. El control «Sonido: sí/no» silencia también los sonidos en curso y recuerda la preferencia. No requiere archivos de audio, servicios externos ni paquetes; si Web Audio o el almacenamiento no están disponibles, la web sigue funcionando. El volumen final depende además del volumen multimedia y de las restricciones de audio del navegador del visitante.

## Me fui a comer y acabé desayunando

Óleo sobre madera de 70 × 90 cm, con título, soporte y unidad de medida confirmados por Mar. La descripción sobre la fiesta flamenca se ha reescrito a petición suya, manteniendo la energía nocturna y el caos de la celebración. El archivo HEIF de «Cuadro fiesta recortado.zip» se conserva en `imagenes/originales/me-fui-a-comer-y-acabe-desayunando.heif`. Para los navegadores se decodificó con `heif-convert` a `imagenes/me-fui-a-comer-y-acabe-desayunando.png`, sin reducción de resolución (3325 × 2594), recorte ni retoques. Se incluye en Otras pinturas; no se inventa una fecha.


## Cabecera y contacto

La cabecera muestra tres estrellas rosas de ocho puntas que enlazan al inicio: las laterales miden 42 px y la central 50 px. Los títulos de la portada y los apartados conservan Courier New. `sitio.js` actualiza los enlaces de contacto de las dos páginas. El contacto público es `marabrilmartin@gmail.com`, editable en `contenido.js`, y abre el programa de correo mediante `mailto:`. No se envían mensajes automáticamente. El bloque de Contacto tiene más espacio, título grande y enlaces rosas de mayor tamaño para destacar correo e Instagram tanto en ordenador como en móvil.

El Instagram facilitado por Mar es `@mareaaada`. Aparece junto al correo en las dos páginas y enlaza a `https://www.instagram.com/mareaaada/` en una pestaña nueva. Se edita mediante el campo `instagram` de `contenido.js`.


## Proyectos desarrollados

Las tres carpetas son «La Plazuela», «La Llorona» y «Álvaro de Luna», en ese orden; La Plazuela ocupa el primer lugar a petición de Mar. El álbum ilustrado se realizó en clase y se inspira en la interpretación de Clarissa Pinkola Estés. Mar participó en las portadas de «¿Dónde vamos?» y «Me va a doler», de Álvaro de Luna. En el EP de La Plazuela con David de Jacoba (cinco canciones), su aportación fue pintar el cuadro para la portada; no se le atribuye la autoría íntegra del diseño. Cada carpeta incluye `tipo`, título y descripción editables en `contenido.js`. La carpeta de La Plazuela incorpora el título del EP «La Caleta», la portada y una vista del cuadro original. La carpeta de Álvaro de Luna incluye las dos portadas recibidas. La Llorona abre una página de lectura con el álbum original de 16 páginas. La revista mantiene su entrada principal independiente.

## Paisajes del natural en Priego de Córdoba

Las imágenes de IMG_0258 e IMG_0251 corresponden a una obra y a su detalle; IMG_0255 muestra un segundo paisaje. Mar confirma que ambos fueron pintados del natural durante el XXXIX Curso de Paisaje de Priego de Córdoba. Se muestran en Paisajes del natural. A petición de Mar, se proponen los títulos provisionales «La tierra respira» (primer paisaje, óleo sobre madera) y «Luz sobre la sierra» (segundo paisaje, óleo sobre tabla). Las técnicas fueron confirmadas por ella; año y medidas siguen pendientes.

Se conservan los HEIC recibidos en `imagenes/originales/paisaje-priego-*.heic`. Las versiones PNG para el navegador se obtuvieron con `heif-convert`, sin reducir resolución ni retocar: campo 4218 × 4229, detalle 3024 × 4032 y montañas 5191 × 3674. El detalle se abre desde la ficha del primer paisaje.

En Sobre mí, «Cursos y residencias» muestra el nombre del curso, Priego de Córdoba, las entidades mencionadas por Mar (Patronato Municipal Adolfo Lozano Sidro y Escuela Libre de Artes Plásticas de Priego de Córdoba) y la beca que ganó en la Escuela de Arte José Val del Omar de Granada para asistir. No se atribuyen cargos organizativos concretos ni un año sin confirmación.

## Portada de La Caleta

La primera carpeta de Proyectos, La Plazuela, abre la portada del EP «La Caleta», junto al texto de la participación de Mar: pintar el cuadro utilizado en la portada. `imagenes/la-plazuela-la-caleta-portada.webp` conserva la imagen recibida en su ZIP, de 1103 × 1103, sin recortes ni retoques. El enlace al original abre la misma imagen. El visor admite imágenes de proyectos y mantiene la etiqueta «Portada de EP»; Álvaro de Luna también incluye sus dos portadas y La Llorona abre su álbum ilustrado en una página de lectura propia.

La ficha de La Plazuela permite alternar entre «Portada del EP» y «Cuadro original». La fotografía de IMG_0014 se conserva en `imagenes/originales/la-caleta-cuadro-original.heic`; `imagenes/la-caleta-cuadro-original.png` es su versión decodificada de 3024 × 4032, sin reducción ni retoques. El campo `encuadre` (x 116, y 690, ancho 2770, alto 2802) oculta mediante CSS el caballete y el fondo exterior, con un pequeño margen interior para evitar que aparezcan los bordes inclinados. El enlace al original sigue abriendo la fotografía completa. `tituloVista` permite nombrar la primera vista del proyecto como «Portada del EP»; las pinturas mantienen «Obra completa».

## Portadas de Álvaro de Luna

La carpeta «Álvaro de Luna» abre «¿Dónde vamos?» y permite cambiar a «Me va a doler» con los botones del visor. Mar identifica la imagen de la cola de sirena como «Me va a doler»; la imagen del puente y las flores corresponde a «¿Dónde vamos?».

`imagenes/alvaro-de-luna-donde-vamos.png` conserva el PNG de mar_azulejoo.zip (1928 × 1935) y `imagenes/alvaro-de-luna-me-va-a-doler.png` conserva el de Mar Abril png.zip (2058 × 2060), sin reducción, recorte ni retoques. El enlace «Ver imagen original» abre el archivo de la vista seleccionada. Los textos mantienen la participación que Mar describió, sin añadir técnicas, fechas ni atribuciones no facilitadas. La Plazuela sigue siendo la primera carpeta de Proyectos.

«La tierra respira» se presenta con un encuadre ajustado al interior de la pintura (x 100, y 45, ancho 4080, alto 4065 en el PNG original). El recorte visual se aplica mediante CSS tanto en la galería como en la ficha para ocultar el fondo exterior y los bordes inclinados de la fotografía. La fotografía completa se conserva y sigue accesible en «Ver imagen original». La vista de detalle mantiene su encuadre propio, sin recortes añadidos.

## Uso desde móvil

La página principal y el lector incluyen `viewport` y estilos adaptables. En pantallas de hasta 700 px, el menú queda visible en dos filas, los accesos de la portada tienen 48 px de altura y las obras, proyectos y contacto se presentan en una columna. Los títulos y las fichas ajustan su tamaño al ancho disponible. En móvil y dispositivos táctiles, los controles tienen zonas de pulsación de al menos 44 px.

Las fichas dejan márgenes laterales de 16 px, usan la altura visible del navegador (`dvh`) y mantienen «Cerrar» accesible al desplazarse por su contenido. El lector conserva una página por vista en móvil; las flechas, el salto de página y el zoom se distribuyen en filas separadas. El campo de página usa texto de 16 px para evitar la ampliación automática al enfocarlo en iOS. Se mantiene el zoom nativo del navegador. Los cambios se verifican con emulación de pantallas táctiles y tamaños de móvil, tablet y escritorio; no se afirma una prueba en un teléfono físico.

## Álbum ilustrado La Llorona

La segunda carpeta de Proyectos abre `la-llorona.html`, sin añadir otro apartado al menú principal. El texto conserva la descripción de Mar sobre el proyecto de clase y la interpretación de Clarissa Pinkola Estés. `proyectos/la-llorona.pdf` contiene el PDF original recibido mediante Google Drive: 16 páginas horizontales, 55.684.300 bytes, sin contraseña. Su SHA-256 es `a20cc2b79590dd50940023e21cacee66b2c623826f7f6e2888dcfc9efbd3a71a`; la copia se ha verificado idéntica a la descargada, sin recomprimir, retocar ni reducir las imágenes o las fuentes.

El proyecto en `contenido.js` define `id`, `enlace` a su página, `archivo`, `enlaceOriginal` a Drive y `paginaUnica: true`. La página reutiliza `revista.js` y los estilos del lector; `data-proyecto` elige sus datos. Se muestra una página horizontal cada vez también en ordenador, con paso de páginas, zoom, texto seleccionable cuando existe, pantalla completa y descarga del original. La revista GRX conserva las hojas enfrentadas en ordenador y una hoja en móvil. Los PDF se cargan al entrar en sus páginas de lectura, sin descargarlos en Inicio.
