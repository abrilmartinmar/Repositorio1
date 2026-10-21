#!/usr/bin/env python3
"""Genera dos PDF editables desde contenido.js, sin modificar las obras originales."""
from __future__ import annotations

import json
import math
from pathlib import Path
import subprocess
import tempfile
from urllib.parse import quote
from xml.sax.saxutils import escape

import fitz
from fontTools.ttLib import TTFont as FontFile
from fontTools.varLib.instancer import instantiateVariableFont
from reportlab.graphics import renderPDF
from reportlab.graphics.barcode.qr import QrCodeWidget
from reportlab.graphics.shapes import Drawing
from reportlab.lib.colors import HexColor, white
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen.canvas import Canvas
from reportlab.platypus import Paragraph

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'documentos'
WEB = 'https://abrilmartinmar.github.io/Repositorio1/'
W, H = 595.276, 841.89
M = 44
CONTENT = W - 2 * M
INK = '#654b60'
SOFT = '#766871'
PINK = '#d8337c'
LINE = '#e5dbe2'


def load_data():
    script = "const fs=require('fs'),vm=require('vm');const c={window:{}};vm.runInNewContext(fs.readFileSync('contenido.js','utf8'),c);process.stdout.write(JSON.stringify(c.window.portfolio));"
    result = subprocess.run(['node', '-e', script], cwd=ROOT, check=True, capture_output=True, text=True)
    return json.loads(result.stdout)


def fonts(directory):
    for name, weight in [('Texto', 400), ('TextoMedio', 600)]:
        source = FontFile(ROOT / 'fuentes/Montserrat.ttf')
        instance = instantiateVariableFont(source, {'wght': weight}, inplace=True)
        path = directory / f'{name}.ttf'
        instance.save(path)
        pdfmetrics.registerFont(TTFont(name, str(path)))


def slug_image(item):
    return WEB + '?obra=' + quote(item['titulo'], safe='') + '#obras'


class Document:
    def __init__(self, data, visual, directory):
        self.data = data
        self.visual = visual
        self.raw = directory / ('visual-raw.pdf' if visual else 'dossier-raw.pdf')
        self.canvas = Canvas(str(self.raw), pagesize=(W, H), pageCompression=1)
        self.label = 'Portfolio visual' if visual else 'Dossier artístico y portfolio'
        self.canvas.setTitle(f'Mar Abril · {self.label}')
        self.canvas.setAuthor('Mar Abril')
        self.canvas.setSubject('Pintura, revista ilustrada y portadas musicales de Mar Abril')
        self.canvas.setKeywords('Mar Abril, pintura, óleo, portfolio, dossier, GRX, ilustración')
        self.canvas.setViewerPreference('DisplayDocTitle', 'true')
        self.canvas.showOutline()
        self.slots = []
        self.paragraphs = []
        self.page = 0
        self.items = {item['titulo']: item for item in data['obras']}
        other = ['Mi reflejo', 'No te vayas de mi lao', 'Sal que te cuente', 'Soledad de verano', 'Me fui a comer y acabé desayunando']
        landscapes = ['La tierra respira', 'Luz sobre la sierra', 'No infinito']
        other += [item['titulo'] for item in data['obras'] if item.get('categoria') != 'paisaje-del-natural' and item['titulo'] not in other]
        landscapes += [item['titulo'] for item in data['obras'] if item.get('categoria') == 'paisaje-del-natural' and item['titulo'] not in landscapes]
        self.other = other
        self.landscapes = landscapes
        self.specs = [('portada', 'Portada'), ('indice', 'Índice')]
        if not visual:
            self.specs += [('practica', 'Práctica artística'), ('contexto', 'Materia, formación y contexto')]
        self.specs += [(title, title) for title in other]
        if not visual:
            self.specs += [('detalle', 'Mi reflejo · detalle')]
        self.specs += [(title, title) for title in landscapes]
        self.specs += [('revista', 'Revista GRX')]
        if not visual:
            self.specs += [('revista-interiores', 'GRX · páginas interiores')]
        self.specs += [('caleta', 'La Caleta · La Plazuela')]
        self.specs += [('alvaro', 'Álvaro de Luna')] if visual else [('donde', '¿Dónde vamos?'), ('doler', 'Me va a doler')]
        self.specs += [('contacto', 'Contacto')]
        self.destinations = {key: f'pagina-{i}' for i, (key, _) in enumerate(self.specs)}
        self.numbers = {key: i + 1 for i, (key, _) in enumerate(self.specs)}

    def text(self, value, x, y, font='Texto', size=11, color=INK):
        c = self.canvas
        c.setFillColor(HexColor(color))
        c.setFont(font, size)
        c.drawString(x, y, value)

    def paragraph(self, value, x, top, width=CONTENT, size=10.5, leading=16, font='Texto', color=INK):
        style = ParagraphStyle('body', fontName=font, fontSize=size, leading=leading, textColor=HexColor(color), spaceAfter=0)
        paragraph = Paragraph(escape(value).replace('\n', '<br/>'), style)
        _, height = paragraph.wrap(width, H)
        if top - height < 81:
            raise ValueError(f'Texto fuera de la zona de lectura: página {self.page}, {value[:60]}')
        paragraph.drawOn(self.canvas, x, top - height)
        self.paragraphs.append({'page': self.page, 'bottom': top - height, 'text': value})
        return top - height

    def rule(self, x1, y, x2, color=LINE):
        self.canvas.setStrokeColor(HexColor(color))
        self.canvas.setLineWidth(.6)
        self.canvas.line(x1, y, x2, y)

    def internal(self, label, key, x, y, width=None, size=9.5):
        self.text(label, x, y, size=size, color=PINK)
        width = width or pdfmetrics.stringWidth(label, 'Texto', size)
        self.canvas.linkRect('', self.destinations[key], (x - 3, y - 5, x + width + 4, y + size + 5), relative=0, thickness=0)

    def external(self, label, url, x, y, size=10.5, width=None):
        self.text(label, x, y, size=size, color=PINK)
        width = width or pdfmetrics.stringWidth(label, 'Texto', size)
        self.rule(x, y - 3, x + width, '#e4a2c0')
        self.canvas.linkURL(url, (x - 3, y - 6, x + width + 4, y + size + 5), relative=0, thickness=0)

    def stars(self, x, y, size=22):
        c = self.canvas
        for i in range(3):
            cx = x + i * (size + 8) + size / 2
            cy = y + size / 2
            p = c.beginPath()
            for n in range(16):
                angle = math.pi / 2 + n * math.pi / 8
                r = size / 2 if n % 2 == 0 else size / 5
                a, b = cx + math.cos(angle) * r, cy + math.sin(angle) * r
                (p.moveTo if n == 0 else p.lineTo)(a, b)
            p.close()
            c.setFillColor(HexColor(PINK))
            c.drawPath(p, fill=1, stroke=0)

    def begin(self, key, title=None, eyebrow=None):
        self.page += 1
        c = self.canvas
        c.setFillColor(white)
        c.rect(0, 0, W, H, fill=1, stroke=0)
        c.bookmarkPage(self.destinations[key], fit='FitH', top=H)
        self.text('MAR ABRIL', M, H - 33, font='Courier', size=10, color=PINK)
        label_width = pdfmetrics.stringWidth(self.label, 'Texto', 8)
        self.text(self.label, W - M - label_width, H - 33, size=8, color=SOFT)
        self.rule(M, H - 44, W - M)
        # Cada página tiene su marcador, además del índice pulsable.
        c.addOutlineEntry(dict(self.specs)[key], self.destinations[key], level=0, closed=False)
        if eyebrow:
            self.text(eyebrow.upper(), M, H - 76, size=8.5, color=PINK)
        if title:
            bottom = self.paragraph(title, M, H - 96, size=25, leading=29, font='Courier')
            return bottom - 12
        return H - 78

    def finish(self):
        self.rule(M, 62, W - M)
        keys = [key for key, _ in self.specs]
        i = self.page - 1
        if i:
            self.internal('Anterior', keys[i - 1], M, 39, size=9)
        self.internal('Índice', 'indice', M + 79, 39, size=9)
        if i < len(keys) - 1:
            self.internal('Siguiente', keys[i + 1], M + 143, 39, size=9)
        self.external('Web', WEB, W - M - 103, 39, size=9)
        self.text(f'{self.page:02d} / {len(keys):02d}', W - M - 45, 39, font='Courier', size=9, color=SOFT)
        self.canvas.showPage()

    def image(self, item, x, y, width, height, url=None):
        """Recorte mediante una ventana del PDF, equivalente al encuadre CSS."""
        c = self.canvas
        iw, ih = item['ancho'], item['alto']
        crop = item.get('encuadre', {'x': 0, 'y': 0, 'ancho': iw, 'alto': ih})
        rotated = bool(item.get('giro'))
        cw, ch = (ih, iw) if rotated else (crop['ancho'], crop['alto'])
        factor = min(width / cw, height / ch)
        vw, vh = cw * factor, ch * factor
        left, bottom = x + (width - vw) / 2, y + (height - vh) / 2
        c.saveState()
        clip = c.beginPath()
        clip.rect(left, bottom, vw, vh)
        c.clipPath(clip, stroke=0, fill=0)
        if rotated:
            c.translate(left + vw / 2, bottom + vh / 2)
            c.rotate(-item['giro'])
            c.drawImage(str(ROOT / item['imagen']), -iw * factor / 2, -ih * factor / 2, width=iw * factor, height=ih * factor, mask='auto')
        else:
            c.drawImage(str(ROOT / item['imagen']), left - crop['x'] * factor, bottom - (ih - crop['y'] - crop['alto']) * factor, width=iw * factor, height=ih * factor, mask='auto')
        c.restoreState()
        if url:
            c.linkURL(url, (left, bottom, left + vw, bottom + vh), relative=0, thickness=0)
        return left, bottom, vw, vh

    def magazine(self, source_page, x, y, width, height):
        self.slots.append((self.page - 1, source_page, fitz.Rect(x, H - y - height, x + width, H - y)))
        self.canvas.linkURL(WEB + 'revista.html', (x, y, x + width, y + height), relative=0, thickness=0)

    def cover(self):
        self.begin('portada')
        c = self.canvas
        for x in range(44, 172, 24):
            self.rule(x, 192, x + .01, '#f2edf0')
            c.setStrokeColor(HexColor('#f2edf0'))
            c.line(x, 205, x, 605)
        for y in range(205, 606, 24):
            self.rule(44, y, 171, '#f2edf0')
        self.stars(M, 728, 20)
        self.text('Mar Abril', M, 682, font='Courier', size=38, color=PINK)
        self.text('Pintura al óleo · Ilustración', M, 652, size=11)
        self.paragraph('Atmósfera,\nluz y materia.', M, 592, width=124, size=17, leading=24, font='Courier')
        self.paragraph('Portfolio\nvisual' if self.visual else 'Dossier artístico\ny portfolio', M, 425, width=130, size=10, leading=16)
        item = self.items['Mi reflejo']
        self.image(item, 190, 188, W - 190 - M, 440, slug_image(item))
        self.text(item['titulo'], 190, 157, font='Courier', size=15)
        self.text(item['datos'], 190, 139, size=8.5, color=SOFT)
        self.internal('Ver el índice', 'indice', M, 130, size=10)
        self.external('Visitar la web', WEB, M, 103, size=9.5)
        self.finish()

    def contents(self):
        self.begin('indice', 'Contenido', 'Guía de lectura')
        self.paragraph('Pulsa un apartado o una obra para ir directamente a su página.', M, 692, size=10, color=SOFT)
        sections = []
        if not self.visual:
            sections += [('Práctica artística', 'practica'), ('Materia, formación y contexto', 'contexto')]
        sections += [('Pintura', 'Mi reflejo'), ('Paisajes del natural', 'La tierra respira'), ('Revista GRX', 'revista'), ('Portadas musicales', 'caleta'), ('Contacto', 'contacto')]
        y = 643
        for title, key in sections:
            self.rule(M, y - 17, W - M)
            self.text(title, M, y, font='Courier', size=15)
            self.text(f'{self.numbers[key]:02d}', W - M - 22, y, font='Courier', size=14, color=PINK)
            self.canvas.linkRect('', self.destinations[key], (M, y - 17, W - M, y + 20), thickness=0)
            y -= 45
        y -= 14
        self.text('OBRAS', M, y, size=8.5, color=PINK)
        y -= 30
        for i, title in enumerate(self.other + self.landscapes):
            col, row = i % 2, i // 2
            x = M + col * (CONTENT + 20) / 2
            label = title if len(title) < 32 else 'Me fui a comer…'
            self.internal(label, title, x, y - row * 35, size=9)
            self.text(f'{self.numbers[title]:02d}', x + 220, y - row * 35, font='Courier', size=9, color=SOFT)
        self.finish()

    def practice(self):
        self.begin('practica', 'Práctica artística', 'Sobre mí')
        y = 687
        for paragraph in self.data['biografia'].split('\n\n'):
            y = self.paragraph(paragraph, M, y, size=11, leading=18) - 23
        y -= 8
        self.rule(M, y, W - M)
        y -= 32
        self.text('La dimensión social', M, y, font='Courier', size=20)
        y -= 23
        self.paragraph(self.data['enfoqueSocial'], M, y, size=11, leading=18)
        self.external('Leer la revista GRX', WEB + 'revista.html', M, 150)
        self.finish()

    def context(self):
        self.begin('contexto', 'Materia y experimentación', 'Formación y contexto')
        self.paragraph(self.data['intereses'], M, 687, size=11, leading=18)
        self.text('Formación', M, 478, font='Courier', size=21)
        y = 443
        for item in self.data['formacion']:
            self.text(item, M, y, size=10.5)
            self.rule(M, y - 13, W - M)
            y -= 37
        self.text('Cursos y residencias', M, 298, font='Courier', size=21)
        self.paragraph('\n\n'.join(self.data['residencias']), M, 271, size=10.5, leading=17)
        self.external('Más sobre mí en la web', WEB + '#sobre-mi', M, 126)
        self.finish()

    def painting(self, title):
        item = self.items[title]
        natural = item.get('categoria') == 'paisaje-del-natural'
        title_bottom = self.begin(title, title, 'Paisajes del natural' if natural else 'Pintura')
        self.paragraph(item['datos'], M, title_bottom, size=9.5, leading=14, color=SOFT)
        # Espacio fijo para que las obras se comparen sin distorsionar su proporción.
        self.image(item, M, 244, CONTENT, min(686, title_bottom - 30) - 244, slug_image(item))
        if not self.visual:
            self.paragraph(item['descripcion'], M, 215, size=10.5, leading=16)
        self.external('Ver y ampliar en la web', slug_image(item), M, 100, size=9)
        self.finish()

    def detail(self):
        item = self.items['Mi reflejo']
        detail = item['detalles'][0]
        self.begin('detalle', 'Mi reflejo · detalle', 'Luz y materialidad')
        self.image(detail, M, 187, CONTENT, 490, slug_image(item))
        self.text('Detalle del rostro', M, 149, size=10, color=SOFT)
        self.external('Ver la obra completa', slug_image(item), M, 113, size=9.5)
        self.finish()

    def magazine_intro(self):
        self.begin('revista', 'GRX', 'Revista ilustrada')
        self.text('Ilustrado por Mar Abril · 24 páginas', M, 687, size=10, color=SOFT)
        self.magazine(0, M, 241, 270, 412)
        x, width = M + 294, CONTENT - 294
        self.paragraph('Pintura, voces y\ncontexto social.', x, 640, width=width, size=17, leading=23, font='Courier')
        self.paragraph('Una revista ilustrada sobre experiencias de creadoras en Granada: la precariedad, los espacios compartidos y el apoyo entre artistas.', x, 529, width=width, size=10, leading=16)
        self.paragraph('La dimensión social de mi práctica encuentra aquí otro espacio de expresión.', x, 365, width=width, size=10, leading=16)
        self.external('Leer la revista completa', WEB + 'revista.html', M, 167, size=11)
        self.paragraph('Acceso al lector de la web, con sus 24 páginas, zoom y paso de hojas.', M, 143, size=9, leading=14, color=SOFT)
        self.finish()

    def magazine_inside(self):
        self.begin('revista-interiores', 'GRX · Escena y comunidad', 'Páginas interiores')
        gap = 14
        width = (CONTENT - gap) / 2
        height = width * 842 / 595
        self.magazine(11, M, 305, width, height)
        self.magazine(12, M + width + gap, 305, width, height)
        self.paragraph('Páginas 12–13 de GRX. Espacios compartidos, amistades y apoyo entre creadoras en Granada.', M, 264, size=10.5, leading=17)
        self.external('Abrir la revista completa', WEB + 'revista.html', M, 166, size=11)
        self.finish()

    def caleta(self):
        item = self.data['proyectos'][0]
        self.begin('caleta', 'La Caleta', 'La Plazuela · David de Jacoba')
        # El cuadro pintado por Mar tiene el protagonismo; la portada acredita su uso.
        original = item['detalles'][0]
        self.image(original, M, 300, 348, 365, WEB + '#proyectos')
        self.text('Cuadro original para la portada', M, 280, size=9, color=SOFT)
        self.image(item, M + 365, 509, CONTENT - 365, CONTENT - 365, WEB + '#proyectos')
        self.paragraph('Portada del EP', M + 365, 487, width=CONTENT - 365, size=9, leading=14, color=SOFT)
        self.paragraph(item['contenido'], M, 223, size=10.5, leading=16)
        self.external('Ver el proyecto en la web', WEB + '#proyectos', M, 111, size=9.5)
        self.finish()

    def alvaro(self):
        item = self.data['proyectos'][1]
        second = item['detalles'][0]
        if self.visual:
            self.begin('alvaro', 'Álvaro de Luna', 'Portadas musicales')
            width = (CONTENT - 20) / 2
            self.image(item, M, 365, width, width, WEB + '#proyectos')
            self.image(second, M + width + 20, 365, width, width, WEB + '#proyectos')
            self.text('¿Dónde vamos?', M, 338, font='Courier', size=15)
            self.text('Me va a doler', M + width + 20, 338, font='Courier', size=15)
            self.paragraph(item['contenido'], M, 285, size=10.5, leading=16)
            self.external('Ver los proyectos en la web', WEB + '#proyectos', M, 153, size=10)
            self.finish()
        else:
            for key, title, view in [('donde', '¿Dónde vamos?', item), ('doler', 'Me va a doler', second)]:
                self.begin(key, title, 'Álvaro de Luna · Portadas musicales')
                self.image(view, M, 262, CONTENT, 412, WEB + '#proyectos')
                self.paragraph(item['contenido'], M, 220, size=10.5, leading=16)
                self.external('Ver el proyecto en la web', WEB + '#proyectos', M, 113, size=9.5)
                self.finish()

    def contact(self):
        self.begin('contacto', 'Contacto', 'Mar Abril')
        self.stars(M, 634, 26)
        self.text('Pintura e ilustración', M, 580, font='Courier', size=23)
        self.text('CORREO ELECTRÓNICO', M, 515, size=8.5, color=SOFT)
        self.external(self.data['correo'], 'mailto:' + self.data['correo'], M, 481, size=19)
        self.text('INSTAGRAM', M, 426, size=8.5, color=SOFT)
        self.external('@' + self.data['instagram'], 'https://www.instagram.com/' + self.data['instagram'] + '/', M, 390, size=22)
        self.text('WEB', M, 334, size=8.5, color=SOFT)
        self.external('abrilmartinmar.github.io/Repositorio1', WEB, M, 305, size=12)
        qr = QrCodeWidget(WEB)
        bounds = qr.getBounds()
        size = 104
        drawing = Drawing(size, size, transform=[size/(bounds[2]-bounds[0]), 0, 0, size/(bounds[3]-bounds[1]), 0, 0])
        drawing.add(qr)
        renderPDF.draw(drawing, self.canvas, M - 8, 145)
        self.canvas.linkURL(WEB, (M - 8, 145, M + size - 8, 145 + size), thickness=0)
        self.paragraph('Escanea para visitar la web\ny explorar las obras con más detalle.', M + 125, 218, width=CONTENT - 125, size=10, leading=16, color=SOFT)
        self.finish()

    def build(self):
        self.cover()
        self.contents()
        if not self.visual:
            self.practice()
            self.context()
        for title in self.other:
            self.painting(title)
        if not self.visual:
            self.detail()
        for title in self.landscapes:
            self.painting(title)
        self.magazine_intro()
        if not self.visual:
            self.magazine_inside()
        self.caleta()
        self.alvaro()
        self.contact()
        self.canvas.save()
        if self.page != len(self.specs):
            raise ValueError('El índice y las páginas no coinciden')
        target = OUT / ('mar-abril-portfolio-visual.pdf' if self.visual else 'mar-abril-dossier-portfolio.pdf')
        with fitz.open(self.raw) as pdf, fitz.open(ROOT / self.data['revista']['archivo']) as magazine:
            for page, source, rect in self.slots:
                pdf[page].show_pdf_page(rect, magazine, source, keep_proportion=True)
            # Optimización de la copia de lectura: las fotografías originales y GRX no se modifican.
            pdf.rewrite_images(dpi_threshold=190, dpi_target=160, quality=90, bitonal=False)
            pdf.save(target, garbage=4, deflate=True, use_objstms=1)
        print(f'{target.relative_to(ROOT)}: {self.page} páginas · {target.stat().st_size/1_000_000:.2f} MB')
        return {'file': target.name, 'pages': self.page, 'sections': self.numbers, 'text_blocks': self.paragraphs}


def main():
    data = load_data()
    OUT.mkdir(exist_ok=True)
    with tempfile.TemporaryDirectory(prefix='mar-abril-documentos-') as work:
        directory = Path(work)
        fonts(directory)
        manifests = [Document(data, visual, directory).build() for visual in (False, True)]
    # Nombre de archivo y título solicitados para enviar el portfolio como documento.
    with fitz.open(OUT / 'mar-abril-portfolio-visual.pdf') as pdf:
        metadata = pdf.metadata
        metadata['title'] = 'Mar Abril dossier'
        pdf.set_metadata(metadata)
        pdf.save(OUT / 'Mar Abril dossier.pdf', garbage=4, deflate=True, use_objstms=1)
    # Registro de comprobación fuera del contenido publicado, para revisar enlaces y páginas.
    check = Path('/workspace/outputs')
    if check.is_dir():
        (check / 'documentos-manifiesto.json').write_text(json.dumps(manifests, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
