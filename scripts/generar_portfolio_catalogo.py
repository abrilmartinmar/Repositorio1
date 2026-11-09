#!/usr/bin/env python3
"""Portfolio de lectura continua: páginas estáticas, sin interfaz de navegación."""
from pathlib import Path
import argparse
import shutil
import tempfile

import fitz
from reportlab.lib.colors import HexColor, white
from generar_documentos import Document, ROOT, OUT, WEB, W, H, M, CONTENT, INK, SOFT, PINK, fonts, load_data


class Catalogo(Document):
    def __init__(self, data, directory):
        super().__init__(data, True, directory)
        self.label = 'Portfolio'
        self.specs = [('portada', 'Mar Abril'), ('presentacion', 'Práctica artística')]
        order = ['Mi reflejo', 'No te vayas de mi lao', 'Sal que te cuente',
                 'Me fui a comer y acabé desayunando', 'Soledad de verano',
                 'La tierra respira', 'Luz sobre la sierra', 'No infinito']
        order += [title for title in self.items if title not in order]
        self.order = order
        self.specs += [(title, title) for title in order]
        self.specs += [('revista', 'GRX'), ('revista-interiores', 'GRX · páginas interiores'),
                       ('caleta', 'La Caleta'), ('donde', '¿Dónde vamos?'),
                       ('doler', 'Me va a doler'), ('contacto', 'Contacto')]
        self.destinations = {key: f'pagina-{i}' for i, (key, _) in enumerate(self.specs)}
        self.canvas.setTitle('Mar Abril · Portfolio')
        self.canvas.setSubject('Portfolio de pintura e ilustración de Mar Abril')

    def begin(self, key, category=''):
        self.page += 1
        c = self.canvas
        c.setFillColor(white)
        c.rect(0, 0, W, H, fill=1, stroke=0)
        c.bookmarkPage(self.destinations[key], fit='FitH', top=H)
        c.addOutlineEntry(dict(self.specs)[key], self.destinations[key], level=0, closed=False)
        self.text('Mar Abril', M, H - 38, font='Courier', size=10, color=INK)
        if category:
            self.text(category.upper(), M, H - 65, size=8, color=PINK)

    def finish(self):
        self.text(f'{self.page:02d}', W - M - 12, 35, font='Courier', size=9, color=SOFT)
        self.canvas.showPage()

    def magazine(self, source_page, x, y, width, height):
        self.slots.append((self.page - 1, source_page, fitz.Rect(x, H - y - height, x + width, H - y)))

    def cover(self):
        self.begin('portada')
        self.text('Mar Abril', M, 723, font='Courier', size=43, color=PINK)
        self.text('Pintura e ilustración', M + 2, 694, size=12)
        self.image(self.items['Mi reflejo'], M, 155, CONTENT, 485)
        self.text('Portfolio', M, 99, font='Courier', size=21)
        self.text('Mi reflejo · Óleo sobre lienzo · 61 × 50 cm', M, 75, size=8.5, color=SOFT)
        self.finish()

    def presentation(self):
        self.begin('presentacion', 'Práctica artística')
        self.text('Luz, atmósfera y materia', M, 727, font='Courier', size=25)
        y = 689
        for paragraph in self.data['biografia'].split('\n\n'):
            y = self.paragraph(paragraph, M, y, size=10.5, leading=16) - 15
        y = self.paragraph(self.data['enfoqueSocial'], M, y, size=10.5, leading=16) - 24
        self.text('Materia y experimentación', M, y, font='Courier', size=17)
        y = self.paragraph(self.data['intereses'], M, y - 20, size=10, leading=15) - 24
        self.text('Formación y contexto', M, y, font='Courier', size=17)
        y = self.paragraph(' · '.join(self.data['formacion']), M, y - 20, size=9, leading=14) - 12
        self.paragraph('\n\n'.join(self.data['residencias']), M, y, size=9, leading=14, color=SOFT)
        self.finish()

    def painting(self, title):
        item = self.items[title]
        self.begin(title, 'Paisajes del natural' if item.get('categoria') == 'paisaje-del-natural' else 'Pintura al óleo')
        self.image(item, M, 273, CONTENT, 477)
        y = self.paragraph(title, M, 241, size=23, leading=27, font='Courier')
        y = self.paragraph(item['datos'], M, y - 12, size=9, leading=14, color=SOFT)
        self.paragraph(item['descripcion'], M, y - 17, size=10, leading=15)
        self.finish()

    def magazine_intro(self):
        self.begin('revista', 'Revista ilustrada')
        self.text('GRX', M, 722, font='Courier', size=32)
        photos = self.data['revista'].get('fotografias', [])
        if photos:
            gap = 18
            cover_width = 211
            photo_x = M + cover_width + gap
            photo_width = CONTENT - cover_width - gap
            self.magazine(0, M, 297, cover_width, 366)
            self.image(photos[0], photo_x, 478, photo_width, 204)
            if len(photos) > 1:
                self.image(photos[1], photo_x, 260, photo_width, 204)
            self.text('Ejemplar impreso', photo_x, 242, size=8, color=SOFT)
        else:
            self.magazine(0, M, 246, CONTENT, 438)
        y = self.paragraph('Ilustrado por Mar Abril · 24 páginas', M, 214, size=10, leading=15)
        y = self.paragraph('Una revista ilustrada sobre experiencias de creadoras en Granada: la precariedad, los espacios compartidos y el apoyo entre artistas.', M, y - 15, size=10, leading=15)
        self.paragraph(self.data['enfoqueSocial'], M, y - 12, size=10, leading=15)
        self.finish()

    def magazine_inside(self):
        self.begin('revista-interiores', 'GRX · Páginas interiores')
        self.text('Escena y comunidad', M, 722, font='Courier', size=25)
        gap = 10
        width = (CONTENT - gap) / 2
        height = width * 842 / 595
        self.magazine(11, M, 310, width, height)
        self.magazine(12, M + width + gap, 310, width, height)
        self.paragraph('Páginas 12–13 de GRX. Espacios compartidos, amistades y apoyo entre creadoras en Granada.', M, 265, size=10, leading=16)
        self.external('Revista completa · 24 páginas', WEB + 'revista.html', M, 129, size=10)
        self.finish()

    def caleta(self):
        item = self.data['proyectos'][0]
        self.begin('caleta', 'La Plazuela · David de Jacoba')
        self.text('La Caleta', M, 722, font='Courier', size=29)
        self.image(item['detalles'][0], M, 283, CONTENT - 137, 379)
        self.image(item, W - M - 119, 522, 119, 119)
        self.paragraph('Portada del EP', W - M - 119, 502, width=119, size=8.5, leading=13, color=SOFT)
        self.text('Cuadro original para la portada', M, 263, size=9, color=SOFT)
        self.paragraph(item['contenido'], M, 223, size=10.5, leading=17)
        self.finish()

    def alvaro(self):
        project = self.data['proyectos'][1]
        for key, title, item in [('donde', '¿Dónde vamos?', project),
                                 ('doler', 'Me va a doler', project['detalles'][0])]:
            self.begin(key, 'Álvaro de Luna · Portadas musicales')
            self.image(item, M, 281, CONTENT, 459)
            y = self.paragraph(title, M, 244, size=25, leading=29, font='Courier')
            self.paragraph(project['contenido'], M, y - 21, size=10.5, leading=17)
            self.finish()

    def contact(self):
        self.begin('contacto', 'Contacto')
        self.text('Mar Abril', M, 687, font='Courier', size=42, color=PINK)
        self.text('Pintura e ilustración', M, 651, size=12)
        self.text('CORREO ELECTRÓNICO', M, 527, size=8.5, color=SOFT)
        self.external(self.data['correo'], 'mailto:' + self.data['correo'], M, 495, size=18)
        self.text('INSTAGRAM', M, 421, size=8.5, color=SOFT)
        self.external('@' + self.data['instagram'], 'https://www.instagram.com/' + self.data['instagram'] + '/', M, 388, size=22)
        self.text('WEB', M, 314, size=8.5, color=SOFT)
        self.external('Mar Abril · Pintura e ilustración', WEB, M, 282, size=12)
        self.finish()

    def build(self):
        self.cover()
        self.presentation()
        for title in self.order:
            self.painting(title)
        self.magazine_intro()
        self.magazine_inside()
        self.caleta()
        self.alvaro()
        self.contact()
        self.canvas.save()
        assert self.page == len(self.specs)
        target = OUT / 'Mar Abril portfolio.pdf'
        with fitz.open(self.raw) as pdf, fitz.open(ROOT / self.data['revista']['archivo']) as magazine:
            for page, source, rect in self.slots:
                pdf[page].show_pdf_page(rect, magazine, source, keep_proportion=True)
            pdf.rewrite_images(dpi_threshold=190, dpi_target=160, quality=90, bitonal=False)
            metadata = pdf.metadata
            metadata['title'] = 'Mar Abril · Portfolio'
            pdf.set_metadata(metadata)
            pdf.set_pagemode('UseNone')
            pdf.save(target, garbage=4, deflate=True, use_objstms=1)
        output = Path('/workspace/outputs')
        output.mkdir(exist_ok=True)
        shutil.copy2(target, output / target.name)
        print(f'{target.name}: {self.page} páginas · {target.stat().st_size / 1_000_000:.2f} MB')

    def update_magazine(self):
        """Renueva solo la presentación de GRX conservando las demás páginas."""
        target = OUT / 'Mar Abril portfolio.pdf'
        with fitz.open(target) as current:
            toc = current.get_toc()
            entries = [entry for entry in toc if entry[1] == 'GRX']
            if len(entries) != 1 or len(current) != len(self.specs):
                raise ValueError('El portfolio ha cambiado de estructura: usa la generación completa.')
            page_index = entries[0][2] - 1
            self.page = page_index
            self.magazine_intro()
            self.canvas.save()
            with fitz.open(self.raw) as replacement, fitz.open(ROOT / self.data['revista']['archivo']) as magazine:
                for _, source, rect in self.slots:
                    replacement[0].show_pdf_page(rect, magazine, source, keep_proportion=True)
                replacement.rewrite_images(dpi_threshold=190, dpi_target=160, quality=90, bitonal=False)
                current.delete_page(page_index)
                current.insert_pdf(replacement, start_at=page_index)
            current.set_toc(toc)
            current.set_pagemode('UseNone')
            updated = self.raw.parent / 'portfolio-actualizado.pdf'
            current.save(updated, garbage=4, deflate=True, use_objstms=1)
        shutil.copy2(updated, target)
        output = Path('/workspace/outputs')
        output.mkdir(exist_ok=True)
        shutil.copy2(target, output / target.name)
        print(f'{target.name}: revista actualizada en la página {page_index + 1} · {target.stat().st_size / 1_000_000:.2f} MB')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--solo-revista', action='store_true', help='Actualizar solo la página de presentación de GRX del PDF existente.')
    args = parser.parse_args()
    OUT.mkdir(exist_ok=True)
    with tempfile.TemporaryDirectory(prefix='mar-abril-catalogo-') as directory:
        directory = Path(directory)
        fonts(directory)
        catalog = Catalogo(load_data(), directory)
        if args.solo_revista:
            catalog.update_magazine()
        else:
            catalog.build()


if __name__ == '__main__':
    main()
