// Edita este archivo para cambiar las obras, proyectos y textos.
// Para añadir fotos, guárdalas en imagenes/ y escribe la ruta en "imagen".
window.portfolio = {
  obras: [
    // Títulos provisionales propuestos a petición de Mar; técnicas confirmadas por ella.
    { titulo: 'La tierra respira', categoria: 'paisaje-del-natural', datos: 'Óleo sobre madera · Priego de Córdoba', imagen: 'imagenes/paisaje-priego-campo.png', alt: 'Paisaje de un campo con árboles verdes, tierra en tonos ocres y rosados y pequeñas zonas de cielo azul.', ancho: 4218, alto: 4229, descripcion: 'Paisaje pintado del natural en un campo de Priego de Córdoba durante el XXXIX Curso de Paisaje.', detalles: [
      { titulo: 'Detalle de la pincelada', imagen: 'imagenes/paisaje-priego-campo-detalle.png', alt: 'Detalle de los árboles y el terreno del paisaje de Priego, con la pincelada y la textura del soporte visibles.', ancho: 3024, alto: 4032 }
    ] },
    { titulo: 'Luz sobre la sierra', categoria: 'paisaje-del-natural', datos: 'Óleo sobre tabla · Priego de Córdoba', imagen: 'imagenes/paisaje-priego-montanas.png', alt: 'Montañas en tonos azulados bajo un cielo amarillo y rosado, con un campo oscuro en primer plano.', ancho: 5191, alto: 3674, descripcion: 'Paisaje pintado del natural durante el XXXIX Curso de Paisaje en Priego de Córdoba.' },
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
    { titulo: 'La Plazuela', tipo: 'Portada de EP', texto: 'La Caleta · En colaboración con David de Jacoba. El cuadro para la portada de un EP de cinco canciones.', contenido: 'Participé en la realización de la portada del EP «La Caleta» de La Plazuela en colaboración con David de Jacoba, compuesto por cinco canciones. Mi aportación fue pintar el cuadro de la portada.', imagen: 'imagenes/la-plazuela-la-caleta-portada.webp', tituloVista: 'Portada del EP', alt: 'Portada de La Caleta, con un paisaje pintado de casas blancas junto al mar y elementos gráficos en rojo, azul y blanco.', ancho: 1103, alto: 1103, detalles: [
      { titulo: 'Cuadro original', imagen: 'imagenes/la-caleta-cuadro-original.png', alt: 'Cuadro original utilizado en la portada de La Caleta: casas blancas junto al mar, barcas y un cielo azul, con la textura de la pintura visible.', ancho: 3024, alto: 4032, encuadre: { x: 116, y: 690, ancho: 2770, alto: 2802 } }
    ] },
    { titulo: 'La Llorona', tipo: 'Proyecto de clase', texto: 'Álbum ilustrado inspirado en la interpretación de Clarissa Pinkola Estés.', contenido: 'Álbum ilustrado realizado en clase, inspirado en la interpretación de La Llorona de Clarissa Pinkola Estés.' },
    { titulo: 'Álvaro de Luna', tipo: 'Portadas musicales', texto: '¿Dónde vamos? · Me va a doler', contenido: 'Participé en la realización de las portadas de las canciones «¿Dónde vamos?» y «Me va a doler», de Álvaro de Luna.', imagen: 'imagenes/alvaro-de-luna-donde-vamos.png', tituloVista: '¿Dónde vamos?', alt: 'Ilustración para la portada de ¿Dónde vamos?, con un puente dentro de un círculo y un marco floral en tonos rojos y rosas sobre blanco.', ancho: 1928, alto: 1935, detalles: [
      { titulo: 'Me va a doler', imagen: 'imagenes/alvaro-de-luna-me-va-a-doler.png', alt: 'Ilustración para la portada de Me va a doler, con una cola de sirena entre las olas, un barco y un marco ornamental en tonos rojos y rosas sobre blanco.', ancho: 2058, alto: 2060 }
    ] }
  ],
  correo: 'marabrilmartin@gmail.com',
  instagram: 'mareaaada',
  biografia: `Mi práctica artística se centra principalmente en la pintura al óleo, un medio a través del cual investigo la atmósfera de los espacios, la luz y la materialidad de la propia pintura.

Mi trabajo nace de la observación de lugares cotidianos y de la intención de capturar la sensación que habita en ellos. Me interesa especialmente cómo la luz transforma el entorno y cómo la textura del óleo puede aportar presencia, profundidad y emoción a la imagen. Busco que cada pintura conserve algo vivo y sensible, tanto en la pincelada como en la construcción del ambiente.`,
  enfoqueSocial: 'La dimensión social también es importante en mi práctica artística. Está presente en mi forma de mirar y se refleja en proyectos como mi revista, donde esta inquietud encuentra otro espacio de expresión.',
  formacion: ['Estudios de Bachillerato de Artes', 'Estudios de Integración Social', 'Ciclo superior de Ilustración'],
  // Añade aquí cursos y residencias; el bloque aparece solo cuando hay datos.
  residencias: ['XXXIX Curso de Paisaje · Priego de Córdoba. Patronato Municipal Adolfo Lozano Sidro · Escuela Libre de Artes Plásticas de Priego de Córdoba. Participé gracias a una beca que gané en la Escuela de Arte José Val del Omar de Granada.'],
  // Texto personal sobre tus intereses; se muestra dentro de Sobre mí al completarlo.
  intereses: ''
};
