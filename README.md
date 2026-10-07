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
