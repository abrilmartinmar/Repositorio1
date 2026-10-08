// Edita este archivo para cambiar las obras, proyectos y textos.
// Para añadir fotos, guárdalas en imagenes/ y escribe la ruta en "imagen".
window.portfolio = {
  obras: [
    { titulo: 'No te vayas de mi lao', categoria: 'otras-obras', datos: 'Óleo sobre lienzo', imagen: 'imagenes/mar-abril-03.png', alt: 'Figura con un vaso a contraluz en una cueva del Sacromonte.', ancho: 3177, alto: 5087, descripcion: 'Escena situada en otra cueva del Sacromonte. En esta obra trabajo el contraluz y comienzo a investigar de una manera más intuitiva la atmósfera del espacio y la relación entre figura y luz.' },
    { titulo: 'Mi reflejo', categoria: 'otras-obras', datos: 'Óleo sobre lienzo · 61 × 50 cm', imagen: 'imagenes/mar-abril-01.png', alt: 'Figura con dos trenzas y una blusa blanca, rodeada de formas oscuras y reflejos luminosos.', ancho: 2907, alto: 3533, descripcion: 'Obra realizada a partir de una fotografía tomada en la cueva de una amiga en el Sacromonte. En esta pintura intento integrar una textura nacarada dentro del reflejo, explorando cómo la materia pictórica puede transformar la luz y la imagen.', detalles: [
      { titulo: 'Detalle del rostro', imagen: 'imagenes/mi-reflejo-detalle.png', alt: 'Detalle del rostro de Mi reflejo, con la textura del lienzo, pinceladas y tonos nacarados visibles.', ancho: 6000, alto: 4000, giro: -90 }
    ] },
    { titulo: 'Sal que te cuente', categoria: 'otras-obras', datos: 'Óleo sobre lienzo', imagen: 'imagenes/sal-que-te-cuente.png', alt: 'Varias figuras en un espacio de paredes blancas, entre vegetación verde y flores amarillas.', ancho: 3698, alto: 5734, encuadre: { x: 24, y: 88, ancho: 3646, alto: 5510 }, descripcion: 'Pintura realizada a partir de un momento cotidiano con amigas en una cueva del Sacromonte. Me interesa capturar la cercanía de la escena y la sensación cálida de la primavera.' },
    { titulo: 'Soledad de verano', categoria: 'otras-obras', datos: 'Óleo sobre lienzo', imagen: 'imagenes/soledad-de-verano.png', alt: 'Barcas junto a edificios claros y un muro costero en La Caleta de Salobreña, bajo una luz suave.', ancho: 3725, alto: 3725, descripcion: 'Escena en La Caleta de Salobreña. La obra se centra en la quietud del verano y en la luz del paisaje.' },
    { titulo: 'Me fui a comer y acabé desayunando', categoria: 'otras-obras', datos: 'Óleo sobre madera · 70 × 90 cm', imagen: 'imagenes/me-fui-a-comer-y-acabe-desayunando.png', alt: 'Un grupo de figuras reunidas, con contrastes oscuros, blancos y rojos y pinceladas visibles.', ancho: 3325, alto: 2594, descripcion: 'Esta obra, inspirada en una fiesta flamenca, recoge la energía de la noche y el caos de la celebración.' }
  ],
  revista: { titulo: 'Mi revista', archivo: '' },
  proyectos: [
    { titulo: 'La Plazuela', tipo: 'Portada de EP', texto: 'En colaboración con David de Jacoba. El cuadro para la portada de un EP de cinco canciones.', contenido: 'Participé en la realización de la portada del EP de La Plazuela en colaboración con David de Jacoba, compuesto por cinco canciones. Mi aportación fue pintar el cuadro de la portada.' },
    { titulo: 'La Llorona', tipo: 'Proyecto de clase', texto: 'Álbum ilustrado inspirado en la interpretación de Clarissa Pinkola Estés.', contenido: 'Álbum ilustrado realizado en clase, inspirado en la interpretación de La Llorona de Clarissa Pinkola Estés.' },
    { titulo: 'Álvaro de Luna', tipo: 'Portadas musicales', texto: '¿Dónde vamos? · Me va a doler', contenido: 'Participé en la realización de las portadas de las canciones «¿Dónde vamos?» y «Me va a doler», de Álvaro de Luna.' }
  ],
  correo: 'marabrilmartin@gmail.com',
  instagram: 'mareaaada',
  biografia: `Mi práctica artística se centra principalmente en la pintura al óleo, un medio a través del cual investigo la atmósfera de los espacios, la luz y la materialidad de la propia pintura.

Mi trabajo nace de la observación de lugares cotidianos y de la intención de capturar la sensación que habita en ellos. Me interesa especialmente cómo la luz transforma el entorno y cómo la textura del óleo puede aportar presencia, profundidad y emoción a la imagen. Busco que cada pintura conserve algo vivo y sensible, tanto en la pincelada como en la construcción del ambiente.`,
  enfoqueSocial: 'La dimensión social también es importante en mi práctica artística. Está presente en mi forma de mirar y se refleja en proyectos como mi revista, donde esta inquietud encuentra otro espacio de expresión.',
  formacion: ['Estudios de Bachillerato de Artes', 'Estudios de Integración Social', 'Ciclo superior de Ilustración'],
  // Añade aquí las residencias realizadas; el bloque aparece solo cuando hay datos.
  residencias: [],
  // Texto personal sobre tus intereses; se muestra dentro de Sobre mí al completarlo.
  intereses: ''
};
