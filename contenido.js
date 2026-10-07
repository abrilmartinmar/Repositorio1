// Edita este archivo para cambiar las obras, proyectos y textos.
// Para añadir fotos, guárdalas en imagenes/ y escribe la ruta en "imagen".
window.portfolio = {
  obras: [
    { titulo: 'No te vayas de mi lao', categoria: 'otras-obras', datos: 'Óleo sobre lienzo', imagen: 'imagenes/mar-abril-03.png', alt: 'Figura con un vaso a contraluz en una cueva del Sacromonte.', ancho: 3177, alto: 5087, descripcion: 'Escena situada en otra cueva del Sacromonte. En esta obra trabajo el contraluz y comienzo a investigar de una manera más intuitiva la atmósfera del espacio y la relación entre figura y luz.' },
    { titulo: 'Mi reflejo', categoria: 'otras-obras', datos: 'Óleo sobre lienzo · 61 × 50 cm', imagen: 'imagenes/mar-abril-01.png', alt: 'Figura con dos trenzas y una blusa blanca, rodeada de formas oscuras y reflejos luminosos.', ancho: 2907, alto: 3533, descripcion: 'Obra realizada a partir de una fotografía tomada en la cueva de una amiga en el Sacromonte. En esta pintura intento integrar una textura nacarada dentro del reflejo, explorando cómo la materia pictórica puede transformar la luz y la imagen.', detalles: [
      { titulo: 'Detalle del rostro', imagen: 'imagenes/mi-reflejo-detalle.png', alt: 'Detalle del rostro de Mi reflejo, con la textura del lienzo, pinceladas y tonos nacarados visibles.', ancho: 6000, alto: 4000, giro: -90 }
    ] },
    { titulo: 'Sal que te cuente', categoria: 'otras-obras', datos: 'Óleo sobre lienzo', imagen: 'imagenes/sal-que-te-cuente.png', alt: 'Varias figuras en un espacio de paredes blancas, entre vegetación verde y flores amarillas.', ancho: 3698, alto: 5734, encuadre: { x: 24, y: 88, ancho: 3646, alto: 5510 }, descripcion: 'Pintura realizada a partir de un momento cotidiano con amigas en una cueva del Sacromonte. Me interesa capturar la cercanía de la escena y la sensación cálida de la primavera.' }
  ],
  revista: { titulo: 'Mi revista', archivo: '' },
  proyectos: [
    { titulo: 'Ilustración', texto: 'Una selección de proyectos y dibujos.', contenido: 'Este espacio reunirá mis proyectos de ilustración. Próximamente compartiré las imágenes y la historia de cada pieza.' }
  ],
  biografia: 'Mi acercamiento a la pintura fue natural. Siempre me había inquietado el arte y, durante mis estudios de Bachillerato de Artes, me encantaba dibujar. Por entonces tenía pocos recursos y oportunidades para aprender pintura, especialmente al óleo. Mientras estudiaba Integración Social, empecé a descubrir cuánto disfrutaba pintando.',
  formacion: ['Estudios de Bachillerato de Artes', 'Estudios de Integración Social', 'Ciclo superior de Ilustración'],
  // Añade aquí las residencias realizadas; el bloque aparece solo cuando hay datos.
  residencias: [],
  // Texto personal sobre tus intereses; se muestra dentro de Sobre mí al completarlo.
  intereses: 'Me fascina esa parte más abstracta de pintar: empezar con una mancha y ver cómo, poco a poco, se va construyendo algo. Ese proceso me recuerda a la escultura, a ir dando forma a lo que todavía no estaba definido. El color también me vuelve loca, especialmente sus tonos.'
};
