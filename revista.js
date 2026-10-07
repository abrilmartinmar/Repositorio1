const reader = document.querySelector('#lector-revista');
const book = document.querySelector('#libro');
const scrollArea = document.querySelector('#zona-libro');
const status = document.querySelector('#estado-revista');
const previous = document.querySelector('#pagina-anterior');
const next = document.querySelector('#pagina-siguiente');
const jump = document.querySelector('#ir-pagina');
const smaller = document.querySelector('#menos-zoom');
const larger = document.querySelector('#mas-zoom');
const fileInput = document.querySelector('#archivo-revista');
const download = document.querySelector('#descargar-revista');
const mobile = matchMedia('(max-width: 700px)');
let pdfLibrary;
let documentPdf;
let currentPage = 1;
let zoom = 1;
let busy = false;
let localUrl;
let resizeTimer;

async function library() {
  if (!pdfLibrary) {
    pdfLibrary = await import('./vendor/pdfjs/pdf.mjs');
    pdfLibrary.GlobalWorkerOptions.workerSrc = new URL('./vendor/pdfjs/pdf.worker.mjs', import.meta.url).href;
  }
  return pdfLibrary;
}
function numbers() {
  if (mobile.matches) return [currentPage];
  if (currentPage === 1) return [null, 1];
  return [currentPage, currentPage + 1 <= documentPdf.numPages ? currentPage + 1 : null];
}
function updateControls() {
  const loaded = Boolean(documentPdf);
  previous.disabled = !loaded || busy || currentPage === 1;
  const shown = loaded ? numbers().filter(Boolean) : [];
  next.disabled = !loaded || busy || Math.max(...shown) >= documentPdf?.numPages;
  jump.disabled = !loaded || busy;
  fileInput.disabled = busy;
  smaller.disabled = !loaded || busy || zoom <= 0.75;
  larger.disabled = !loaded || busy || zoom >= 2;
  book.setAttribute('aria-busy', String(busy));
  document.querySelector('#valor-zoom').textContent = `${Math.round(zoom * 100)} %`;
  if (loaded) {
    jump.max = documentPdf.numPages;
    jump.value = currentPage;
    document.querySelector('#pagina-actual').textContent = shown.length === 1
      ? `Página ${shown[0]} de ${documentPdf.numPages}`
      : `Páginas ${shown[0]}–${shown[1]} de ${documentPdf.numPages}`;
  }
}
function reportError(error) {
  if (error.name === 'PasswordException') status.textContent = 'Este PDF tiene contraseña. Abre una copia sin protección para leerla aquí.';
  else status.textContent = 'No se pudo abrir o mostrar este PDF. Prueba con una copia válida del archivo.';
}
async function makePage(number, width) {
  const leaf = document.createElement('div');
  leaf.className = 'hoja';
  leaf.style.width = `${width}px`;
  if (!number) {
    leaf.classList.add('hoja-vacia');
    leaf.setAttribute('aria-hidden', 'true');
    return leaf;
  }
  const pdfPage = await documentPdf.getPage(number);
  const base = pdfPage.getViewport({ scale: 1 });
  const scale = width / base.width;
  const viewport = pdfPage.getViewport({ scale });
  const pixelRatio = Math.min(devicePixelRatio || 1, 2);
  const pixels = pdfPage.getViewport({ scale: scale * pixelRatio });
  leaf.style.height = `${viewport.height}px`;
  leaf.style.setProperty('--scale-factor', scale);
  leaf.dataset.page = number;
  leaf.setAttribute('role', 'group');
  leaf.setAttribute('aria-label', `Página ${number}`);
  const canvas = document.createElement('canvas');
  canvas.width = Math.ceil(pixels.width);
  canvas.height = Math.ceil(pixels.height);
  canvas.style.width = `${viewport.width}px`;
  canvas.style.height = `${viewport.height}px`;
  canvas.setAttribute('aria-hidden', 'true');
  leaf.append(canvas);
  await pdfPage.render({ canvasContext: canvas.getContext('2d'), viewport: pixels }).promise;
  const text = document.createElement('div');
  text.className = 'textLayer';
  leaf.append(text);
  const layer = new pdfLibrary.TextLayer({ textContentSource: await pdfPage.getTextContent(), container: text, viewport });
  await layer.render();
  return leaf;
}
async function turnAnimation(oldLeaf, direction) {
  if (!oldLeaf || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const turning = oldLeaf.cloneNode(true);
  const source = oldLeaf.querySelector('canvas');
  if (source) turning.querySelector('canvas').getContext('2d').drawImage(source, 0, 0);
  turning.querySelector('.textLayer')?.remove();
  turning.classList.add('hoja-girando');
  turning.setAttribute('aria-hidden', 'true');
  turning.removeAttribute('role');
  turning.removeAttribute('aria-label');
  turning.style.transformOrigin = direction > 0 ? 'left center' : 'right center';
  turning.style.left = direction > 0 ? 'auto' : '0';
  turning.style.right = direction > 0 ? '0' : 'auto';
  book.append(turning);
  try {
    await turning.animate([
      { transform: 'rotateY(0deg)', opacity: 1 },
      { transform: `rotateY(${direction > 0 ? -85 : 85}deg)`, opacity: 0.8, offset: 0.6 },
      { transform: `rotateY(${direction > 0 ? -165 : 165}deg)`, opacity: 0 }
    ], { duration: 650, easing: 'cubic-bezier(.4,0,.2,1)' }).finished;
  } finally { turning.remove(); }
}
async function render(direction = 0) {
  if (!documentPdf) return;
  busy = true;
  updateControls();
  const oldLeaves = [...book.querySelectorAll('.hoja')];
  const oldLeaf = direction > 0 ? oldLeaves.at(-1) : oldLeaves[0];
  try {
    if (!mobile.matches && currentPage > 1 && currentPage % 2) currentPage--;
    const baseWidth = Math.min(960, Math.max(200, scrollArea.clientWidth - 32));
    const width = baseWidth * zoom;
    const shown = numbers();
    const leaves = await Promise.all(shown.map(number => makePage(number, width / shown.length)));
    const height = Math.max(...leaves.map(leaf => Number.parseFloat(leaf.style.height) || 0));
    leaves.forEach(leaf => { leaf.style.height = `${height}px`; });
    book.style.width = `${width}px`;
    book.replaceChildren(...leaves);
    scrollArea.scrollTop = 0;
    scrollArea.scrollLeft = Math.max(0, (width - scrollArea.clientWidth) / 2);
    updateControls();
    if (direction) await turnAnimation(oldLeaf, direction);
  } catch (error) {
    reportError(error);
    throw error;
  } finally {
    busy = false;
    updateControls();
  }
}
async function loadPdf(source, name, href) {
  if (busy) return;
  busy = true;
  updateControls();
  status.textContent = 'Abriendo la revista…';
  let task;
  try {
    const lib = await library();
    const options = typeof source === 'string' ? { url: source } : { data: source };
    task = lib.getDocument({ ...options,
      cMapUrl: new URL('./vendor/pdfjs/cmaps/', import.meta.url).href,
      cMapPacked: true,
      standardFontDataUrl: new URL('./vendor/pdfjs/standard_fonts/', import.meta.url).href,
      isEvalSupported: false,
      useSystemFonts: true
    });
    task.onPassword = () => { status.textContent = 'Este PDF tiene contraseña. Utiliza una copia sin protección.'; task.destroy(); };
    const loaded = await task.promise;
    const old = documentPdf;
    documentPdf = loaded;
    currentPage = 1;
    zoom = 1;
    await render();
    if (old) await old.destroy();
    document.querySelector('#nombre-revista').textContent = name;
    download.href = href;
    download.download = name;
    download.hidden = false;
    status.textContent = `${loaded.numPages} ${loaded.numPages === 1 ? 'página lista' : 'páginas listas'} para leer. ${typeof source === 'string' ? '' : 'El PDF permanece en tu navegador.'}`;
  } catch (error) {
    reportError(error);
    if (task && (!documentPdf || task.docId !== documentPdf.loadingTask?.docId)) await task.destroy().catch(() => {});
  } finally {
    busy = false;
    updateControls();
  }
}
fileInput.addEventListener('change', async () => {
  const file = fileInput.files[0];
  if (!file) return;
  if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
    status.textContent = 'Selecciona un archivo PDF.';
    fileInput.value = '';
    return;
  }
  try {
    const bytes = new Uint8Array(await file.arrayBuffer());
    const href = URL.createObjectURL(file);
    await loadPdf(bytes, file.name, href);
    if (download.href === href) {
      if (localUrl) URL.revokeObjectURL(localUrl);
      localUrl = href;
    } else URL.revokeObjectURL(href);
  } catch (error) { reportError(error); }
  fileInput.value = '';
});
async function go(direction) {
  if (busy || !documentPdf || (direction > 0 ? next.disabled : previous.disabled)) return;
  const oldPage = currentPage;
  currentPage = mobile.matches ? currentPage + direction
    : direction > 0 ? currentPage === 1 ? 2 : currentPage + 2
      : currentPage <= 2 ? 1 : currentPage - 2;
  try { await render(direction); }
  catch { currentPage = oldPage; updateControls(); }
}
previous.addEventListener('click', () => go(-1));
next.addEventListener('click', () => go(1));
jump.addEventListener('change', async () => {
  if (busy || !documentPdf) return;
  const page = Number(jump.value);
  if (!Number.isInteger(page) || page < 1 || page > documentPdf.numPages) { jump.value = currentPage; return; }
  const oldPage = currentPage;
  currentPage = page;
  try { await render(); } catch { currentPage = oldPage; updateControls(); }
});
async function changeZoom(delta) {
  if (busy || !documentPdf) return;
  zoom = Math.max(0.75, Math.min(2, zoom + delta));
  try { await render(); } catch { /* El estado del lector muestra el error. */ }
}
smaller.addEventListener('click', () => changeZoom(-0.25));
larger.addEventListener('click', () => changeZoom(0.25));
reader.addEventListener('keydown', event => {
  if (['INPUT', 'SELECT', 'TEXTAREA'].includes(event.target.tagName)) return;
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault();
    go(event.key === 'ArrowRight' ? 1 : -1);
  }
});
const fullscreen = document.querySelector('#pantalla-revista');
fullscreen.hidden = !document.fullscreenEnabled;
fullscreen.addEventListener('click', async () => {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await reader.requestFullscreen();
  } catch { status.textContent = 'No se pudo abrir la pantalla completa. Puedes ampliar con los botones de zoom.'; }
});
document.addEventListener('fullscreenchange', () => { fullscreen.textContent = document.fullscreenElement ? 'Salir de pantalla completa' : 'Pantalla completa'; });
function queueResize() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(async () => {
    if (busy) { queueResize(); return; }
    if (documentPdf) try { await render(); } catch { /* El lector ya muestra el error. */ }
  }, 200);
}
window.addEventListener('resize', queueResize);
updateControls();
const configured = window.portfolio?.revista;
if (configured?.archivo) loadPdf(configured.archivo, configured.titulo || 'Revista', configured.archivo);
