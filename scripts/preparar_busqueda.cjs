// Ejecutar desde cualquier carpeta: node scripts/preparar_busqueda.cjs
// Cambiar la URL solo después de conectar y comprobar el nuevo dominio.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const base = new URL(process.argv[2] || 'https://abrilmartinmar.github.io/Repositorio1/');
if (base.protocol !== 'https:' || base.search || base.hash || !base.pathname.endsWith('/')) {
  throw new Error('Usa la dirección HTTPS pública terminada en /, sin consulta ni fragmento.');
}
const url = value => new URL(value, base).href;
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'contenido.js'), 'utf8'), context);
const data = context.window.portfolio;
const escape = text => text.replaceAll('&', '&amp;').replaceAll('"', '&quot;')
  .replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const person = {
  '@type': 'Person', '@id': url('#mar-abril'), name: 'Mar Abril', url: base.href,
  jobTitle: 'Pintora e ilustradora', description: data.biografia.split(/\n\s*\n/)[0],
  email: data.correo, sameAs: [`https://www.instagram.com/${data.instagram}/`],
  knowsAbout: ['Pintura al óleo', 'Ilustración', 'Pintura del natural', 'Diseño editorial']
};
const pages = [
  { file: 'index.html', location: '', title: 'Mar Abril | Pintora e ilustradora',
    description: 'Pintura al óleo de Mar Abril: luz, atmósfera y materia. Descubre sus cuadros, paisajes del natural, revista GRX y proyectos de ilustración.',
    type: 'ProfilePage', mainEntity: { '@id': person['@id'] } },
  { file: 'revista.html', location: 'revista.html', title: 'Revista GRX | Mar Abril',
    description: 'Lee la revista ilustrada GRX de Mar Abril: creación, espacios compartidos y vínculos sociales en Granada. Sus 24 páginas en un lector interactivo.',
    type: 'WebPage', about: { '@type': 'CreativeWork', name: 'GRX',
      creator: { '@id': person['@id'] }, inLanguage: 'es', encodingFormat: 'application/pdf',
      url: url('revista.html'), contentUrl: url(data.revista.archivo) } }
];
for (const page of pages) {
  const location = url(page.location);
  const schema = { '@context': 'https://schema.org', '@graph': [person,
    { '@type': 'WebSite', '@id': url('#web'), url: base.href, name: 'Mar Abril',
      inLanguage: 'es', publisher: { '@id': person['@id'] } },
    { '@type': page.type, '@id': `${location}#pagina`, url: location, name: page.title,
      description: page.description, inLanguage: 'es', isPartOf: { '@id': url('#web') },
      ...(page.mainEntity ? { mainEntity: page.mainEntity } : { about: page.about }) }
  ] };
  const meta = (name, content, property = false) =>
    `<meta ${property ? 'property' : 'name'}="${name}" content="${escape(content)}">`;
  const block = [
    '<!-- BUSCADORES: generado con scripts/preparar_busqueda.cjs -->',
    `<title>${escape(page.title)}</title>`, meta('description', page.description),
    meta('robots', 'index,follow,max-image-preview:large'),
    `<link rel="canonical" href="${escape(location)}">`,
    ...Object.entries({ 'og:type': 'website', 'og:locale': 'es_ES', 'og:site_name': 'Mar Abril',
      'og:title': page.title, 'og:description': page.description, 'og:url': location,
      'og:image': url('imagenes/mar-abril-presentacion.jpg'), 'og:image:width': '1200',
      'og:image:height': '630', 'og:image:alt': 'Mar Abril, pintura al óleo. Obra Mi reflejo.'
    }).map(([name, content]) => meta(name, content, true)),
    meta('twitter:card', 'summary_large_image'), meta('twitter:title', page.title),
    meta('twitter:description', page.description),
    meta('twitter:image', url('imagenes/mar-abril-presentacion.jpg')),
    `<script type="application/ld+json">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script>`,
    '<!-- /BUSCADORES -->'
  ].join('\n');
  const filename = path.join(root, page.file);
  let html = fs.readFileSync(filename, 'utf8');
  if (html.includes('<!-- BUSCADORES:')) {
    html = html.replace(/<!-- BUSCADORES:[\s\S]*?<!-- \/BUSCADORES -->/, () => block);
  } else {
    html = html.replace(/<meta name="description"[^>]*>/, '').replace(/<title>[\s\S]*?<\/title>/, '');
    html = html.replace('</head>', `\n${block}\n</head>`);
  }
  if (page.file === 'index.html') {
    const paragraphs = data.biografia.split(/\n\s*\n/)
      .map(text => `<p class="biografia">${escape(text)}</p>`).join('');
    html = html.replace(/<div id="biografia">[\s\S]*?<\/div>/, () => `<div id="biografia">${paragraphs}</div>`);
  }
  fs.writeFileSync(filename, html);
}
const locations = ['', 'revista.html', 'documentos/mar-abril-dossier-portfolio.pdf',
  'documentos/Mar%20Abril%20dossier.pdf'];
fs.writeFileSync(path.join(root, 'sitemap.xml'),
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  locations.map(location => `  <url><loc>${escape(url(location))}</loc></url>`).join('\n') + '\n</urlset>\n');
console.log(`Información para buscadores y sitemap preparados para ${base.href}`);
