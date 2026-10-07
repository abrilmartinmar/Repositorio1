const data = window.portfolio;
const modal = document.querySelector('#detalle');
function artwork(item) {
  const box = document.createElement('div');
  box.className = `pintura ${item.estilo || 'arena'}`;
  if (item.imagen) {
    const img = document.createElement('img');
    img.src = item.imagen;
    img.alt = item.titulo;
    box.append(img);
  } else {
    const label = document.createElement('span');
    label.textContent = 'Composición de ejemplo';
    box.append(label);
  }
  return box;
}
function openDetail(title, details, description, item) {
  document.querySelector('#detalle-titulo').textContent = title;
  document.querySelector('#detalle-datos').textContent = details;
  document.querySelector('#detalle-descripcion').textContent = description;
  const image = document.querySelector('#detalle-imagen');
  image.replaceChildren();
  if (item) image.append(artwork(item));
  modal.showModal();
}
const categorias = { 'paisaje-del-natural': 'Paisajes del natural', 'otras-obras': 'Otras pinturas' };
function categoriaObra(item) {
  return Object.hasOwn(categorias, item.categoria) ? item.categoria : 'otras-obras';
}
function mostrarObras(filtro = 'todas') {
const galeria = document.querySelector('#galeria');
galeria.replaceChildren();
const obras = data.obras.filter(item => filtro === 'todas' || categoriaObra(item) === filtro);
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
data.proyectos.forEach((item, i) => {
  const link = document.createElement(item.enlace ? 'a' : 'button');
  link.className = 'proyecto carpeta-proyecto';
  if (!item.enlace) link.type = 'button';
  if (item.enlace) link.href = item.enlace;
  else link.addEventListener('click', () => openDetail(item.titulo, 'Proyecto en preparación', item.contenido));
  const number = document.createElement('span');
  number.className = 'numero'; number.textContent = `0${i + 1}`;
  const text = document.createElement('div');
  const title = document.createElement('h3'); title.textContent = item.titulo;
  const description = document.createElement('p'); description.textContent = item.texto;
  text.append(title, description);
  const arrow = document.createElement('span'); arrow.textContent = 'Abrir carpeta ↗'; arrow.setAttribute('aria-hidden', 'true');
  link.append(number, text, arrow);
  document.querySelector('#lista-proyectos').append(link);
});
document.querySelector('#biografia').textContent = data.biografia;
data.curiosidades.forEach(text => {
  const li = document.createElement('li'); li.textContent = text;
  document.querySelector('#curiosidades').append(li);
});
document.querySelector('#cerrar').addEventListener('click', () => modal.close());
modal.addEventListener('click', event => { if (event.target === modal) { const r = modal.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) modal.close(); } });
