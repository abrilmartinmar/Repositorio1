const data = window.portfolio;
const modal = document.querySelector('#detalle');
const imageViewer = document.querySelector('#detalle-imagen');
const zoomControls = document.querySelector('#controles-obra');
const zoomLabel = document.querySelector('#zoom-obra');
const zoomOut = document.querySelector('#reducir-obra');
const zoomIn = document.querySelector('#ampliar-obra');
let imageZoom = 1;
function setImageZoom(value) {
  imageZoom = Math.max(1, Math.min(3, value));
  imageViewer.style.setProperty('--zoom-obra', imageZoom);
  zoomLabel.textContent = `${Math.round(imageZoom * 100)} %`;
  zoomOut.disabled = imageZoom === 1;
  zoomIn.disabled = imageZoom === 3;
  if (imageZoom === 1) { imageViewer.scrollTop = 0; imageViewer.scrollLeft = 0; }
}
zoomOut.addEventListener('click', () => setImageZoom(imageZoom - 0.5));
zoomIn.addEventListener('click', () => setImageZoom(imageZoom + 0.5));
document.querySelector('#restablecer-obra').addEventListener('click', () => setImageZoom(1));
function artwork(item) {
  const box = document.createElement('div');
  box.className = `pintura ${item.estilo || 'arena'}`;
  if (item.imagen) {
    const img = document.createElement('img');
    img.src = item.imagen;
    img.alt = item.alt || item.titulo;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.draggable = false;
    if (item.ancho && item.alto) { img.width = item.ancho; img.height = item.alto; }
    box.classList.add('pintura-real');
    if (item.ancho && item.alto) box.style.aspectRatio = `${item.ancho} / ${item.alto}`;
    if (item.encuadre && item.ancho && item.alto) {
      const crop = item.encuadre;
      box.classList.add('pintura-encuadrada');
      box.style.aspectRatio = `${crop.ancho} / ${crop.alto}`;
      box.style.setProperty('--proporcion', crop.ancho / crop.alto);
      img.style.width = `${item.ancho / crop.ancho * 100}%`;
      img.style.height = `${item.alto / crop.alto * 100}%`;
      img.style.left = `${-crop.x / crop.ancho * 100}%`;
      img.style.top = `${-crop.y / crop.alto * 100}%`;
    }
    if (item.giro && item.ancho && item.alto) {
      box.classList.add('pintura-girada');
      box.style.aspectRatio = `${item.alto} / ${item.ancho}`;
      box.style.setProperty('--proporcion', item.alto / item.ancho);
      img.style.width = `${item.ancho / item.alto * 100}%`;
      img.style.height = `${item.alto / item.ancho * 100}%`;
      img.style.transform = `translate(-50%, -50%) rotate(${item.giro}deg)`;
    }
    box.append(img);
  } else {
    const label = document.createElement('span');
    label.textContent = 'Composición de ejemplo';
    box.append(label);
  }
  return box;
}
function openDetail(title, details, description, item) {
  document.querySelector('#detalle .etiqueta').textContent = item?.categoria ? 'Óleo / Colección' : details;
  document.querySelector('#detalle-titulo').textContent = title;
  document.querySelector('#detalle-datos').textContent = details;
  document.querySelector('#detalle-descripcion').textContent = description;
  imageViewer.replaceChildren();
  zoomControls.hidden = !item?.imagen;
  const views = document.querySelector('#vistas-obra');
  views.replaceChildren();
  views.hidden = !item?.detalles?.length;
  if (item) {
    const showView = (view, selected) => {
      const enlarged = document.createElement('div');
      enlarged.className = 'ampliacion-obra';
      enlarged.append(artwork(view));
      imageViewer.replaceChildren(enlarged);
      const ratio = view.giro ? view.alto / view.ancho
        : view.encuadre ? view.encuadre.ancho / view.encuadre.alto
        : view.ancho / view.alto;
      imageViewer.style.setProperty('--proporcion', Number.isFinite(ratio) && ratio > 0 ? ratio : 1);
      setImageZoom(1);
      views.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button === selected)));
    };
    if (item.detalles?.length) {
      [{ ...item, titulo: item.tituloVista || 'Obra completa' }, ...item.detalles].forEach((view, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = view.titulo;
        button.setAttribute('aria-controls', 'detalle-imagen');
        button.setAttribute('aria-pressed', String(index === 0));
        button.addEventListener('click', () => showView(view, button));
        views.append(button);
      });
    }
    showView(item, views.firstElementChild);
  }
  modal.showModal();
}
const categorias = { 'paisaje-del-natural': 'Paisajes del natural', 'otras-obras': 'Otras pinturas' };
function categoriaObra(item) {
  return Object.hasOwn(categorias, item.categoria) ? item.categoria : 'otras-obras';
}
function mostrarPortada() {
  const button = document.querySelector('#obra-portada');
  const item = data.obras.find(obra => obra.titulo === data.obraPortada && obra.imagen)
    || data.obras.find(obra => obra.imagen && categoriaObra(obra) === 'otras-obras')
    || data.obras.find(obra => obra.imagen);
  if (!button || !item) return;
  const image = artwork(item);
  const ratio = Number(image.style.getPropertyValue('--proporcion')) || item.ancho / item.alto;
  button.style.setProperty('--proporcion-portada', Number.isFinite(ratio) && ratio > 0 ? ratio : 1);
  const img = image.querySelector('img');
  img.loading = 'eager';
  img.fetchPriority = 'high';
  const caption = document.createElement('span');
  caption.className = 'ficha-portada';
  const title = document.createElement('span');
  title.className = 'titulo-portada';
  title.textContent = item.titulo;
  const details = document.createElement('span');
  details.className = 'datos-portada';
  details.textContent = item.datos;
  const action = document.createElement('span');
  action.className = 'abrir-obra-portada';
  action.textContent = 'Ver obra +';
  caption.append(title, details, action);
  button.replaceChildren(image, caption);
  button.setAttribute('aria-label', `Ver y ampliar ${item.titulo}`);
  button.addEventListener('click', () => openDetail(item.titulo, `${categorias[categoriaObra(item)]} · ${item.datos}`, item.descripcion, item));
  button.hidden = false;
}
mostrarPortada();
let primeraObraAnterior;
function ordenarObras(obras, filtro) {
  if (filtro === 'paisaje-del-natural' || obras.length < 2) return [...obras];
  const otras = filtro === 'todas' ? obras.filter(item => categoriaObra(item) !== 'paisaje-del-natural') : obras;
  const candidatas = otras.length ? otras : obras;
  const nuevas = candidatas.filter(item => item !== primeraObraAnterior);
  const opciones = nuevas.length ? nuevas : candidatas;
  const primera = opciones[Math.floor(Math.random() * opciones.length)];
  const restantes = [...obras];
  restantes.splice(restantes.indexOf(primera), 1);
  for (let i = restantes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [restantes[i], restantes[j]] = [restantes[j], restantes[i]];
  }
  return [primera, ...restantes];
}
function mostrarObras(filtro = 'todas') {
const galeria = document.querySelector('#galeria');
galeria.replaceChildren();
const obras = ordenarObras(data.obras.filter(item => filtro === 'todas' || categoriaObra(item) === filtro), filtro);
primeraObraAnterior = obras[0];
obras.forEach((item, index) => {
  const button = document.createElement('button');
  button.className = 'obra';
  button.type = 'button';
  button.setAttribute('aria-label', `Ver ${item.titulo}, ${categorias[categoriaObra(item)]}`);
  button.append(artwork(item));
  const ficha = document.createElement('div');
  ficha.className = 'ficha-obra';
  const numero = document.createElement('span');
  numero.className = 'numero-obra';
  numero.textContent = String(index + 1).padStart(2, '0');
  numero.setAttribute('aria-hidden', 'true');
  const title = document.createElement('h3');
  title.textContent = item.titulo;
  const info = document.createElement('p');
  info.textContent = item.datos;
  const categoria = document.createElement('span');
  categoria.className = 'categoria-obra';
  categoria.textContent = categorias[categoriaObra(item)];
  const ver = document.createElement('span');
  ver.className = 'ver-obra';
  ver.textContent = 'Ver obra ↗';
  ficha.append(numero, categoria, title, info, ver);
  button.append(ficha);
  button.addEventListener('click', () => openDetail(item.titulo, `${categorias[categoriaObra(item)]} · ${item.datos}`, item.descripcion, item));
  galeria.append(button);
});
const nombre = filtro === 'todas' ? 'Toda la colección' : categorias[filtro];
document.querySelector('#resumen-obras').textContent = obras.length
  ? `${nombre} · ${obras.length} ${obras.length === 1 ? 'obra' : 'obras'}`
  : `${nombre} · Aún no hay obras en esta categoría.`;
}
document.querySelectorAll('[data-categoria]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-categoria]').forEach(other => {
      other.setAttribute('aria-pressed', String(other === button));
    });
    mostrarObras(button.dataset.categoria);
  });
});
document.querySelectorAll('[data-conteo]').forEach(label => {
  const filtro = label.dataset.conteo;
  const count = data.obras.filter(item => filtro === 'todas' || categoriaObra(item) === filtro).length;
  label.textContent = `${count} ${count === 1 ? 'obra' : 'obras'}`;
});
mostrarObras();
function renderCarpetas(items, target, context) {
items.forEach((item, i) => {
  const link = document.createElement(item.enlace ? 'a' : 'button');
  link.className = 'proyecto carpeta-proyecto';
  if (!item.enlace) link.type = 'button';
  if (item.enlace) link.href = item.enlace;
  else link.addEventListener('click', () => openDetail(item.titulo, item.tipo || context, item.contenido, item.imagen ? item : undefined));
  const number = document.createElement('span');
  number.className = 'numero'; number.textContent = `0${i + 1}`;
  const text = document.createElement('div');
  if (item.tipo) {
    const type = document.createElement('p');
    type.className = 'tipo-proyecto';
    type.textContent = item.tipo;
    text.append(type);
  }
  const title = document.createElement('h3'); title.textContent = item.titulo;
  const description = document.createElement('p'); description.textContent = item.texto;
  text.append(title, description);
  const arrow = document.createElement('span'); arrow.textContent = 'Abrir carpeta ↗'; arrow.setAttribute('aria-hidden', 'true');
  link.append(number, text, arrow);
  document.querySelector(target).append(link);
});
}
renderCarpetas(data.proyectos, '#lista-proyectos', 'Proyectos');
document.querySelector('#biografia').replaceChildren();
data.biografia.split(/\n\s*\n/).forEach(text => {
  const paragraph = document.createElement('p');
  paragraph.className = 'biografia';
  paragraph.textContent = text;
  document.querySelector('#biografia').append(paragraph);
});
if (data.enfoqueSocial?.trim()) {
  document.querySelector('#enfoque-social').textContent = data.enfoqueSocial;
  document.querySelector('#bloque-social').hidden = false;
}
function renderLista(items, selector) {
  items.forEach(text => {
    const li = document.createElement('li');
    li.textContent = text;
    document.querySelector(selector).append(li);
  });
}
renderLista(data.formacion, '#formacion');
if (data.residencias.length) {
  renderLista(data.residencias, '#residencias');
  document.querySelector('#bloque-residencias').hidden = false;
}
if (data.intereses.trim()) {
  document.querySelector('#intereses').textContent = data.intereses;
  document.querySelector('#bloque-intereses').hidden = false;
}
document.querySelector('#cerrar').addEventListener('click', () => modal.close());
modal.addEventListener('click', event => { if (event.target === modal) { const r = modal.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) modal.close(); } });

// Los enlaces del dossier abren directamente la obra dentro de la web.
const requestedArtwork = new URLSearchParams(window.location.search).get('obra');
if (requestedArtwork) {
  const item = data.obras.find(obra => obra.titulo === requestedArtwork);
  if (item) openDetail(item.titulo, `${categorias[categoriaObra(item)]} · ${item.datos}`, item.descripcion, item);
}
