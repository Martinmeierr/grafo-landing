#!/usr/bin/env python3
"""Import the architect-supplied standalone Grafo HTML into maintainable site files."""

from __future__ import annotations

import base64
import bisect
import hashlib
import re
import sys
from html.parser import HTMLParser
from pathlib import Path


FRAGMENT_NAMES = [
    "header",
    "hero",
    "services",
    "situations",
    "projects",
    "lightbox",
    "process",
    "municipal-cta",
    "studio",
    "press",
    "contact",
    "contact-details",
    "footer",
    "whatsapp-button",
    "whatsapp-welcome",
]
VOID_TAGS = {
    "area", "base", "br", "col", "embed", "hr", "img", "input", "link",
    "meta", "param", "source", "track", "wbr",
}
DATA_IMAGE = re.compile(r"data:image/([^;]+);base64,([A-Za-z0-9+/=]+)")


class BodyFragments(HTMLParser):
    def __init__(self, source: str):
        super().__init__(convert_charrefs=False)
        self.source = source
        self.line_starts = [0]
        self.line_starts.extend(i + 1 for i, char in enumerate(source) if char == "\n")
        self.in_body = False
        self.depth = 0
        self.fragment_start: int | None = None
        self.fragments: list[str] = []

    def current_offset(self) -> int:
        line, column = self.getpos()
        return self.line_starts[line - 1] + column

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag == "body":
            self.in_body = True
            return
        if not self.in_body:
            return
        if self.depth == 0:
            self.fragment_start = self.current_offset()
        if tag not in VOID_TAGS:
            self.depth += 1

    def handle_startendtag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if self.in_body and self.depth == 0:
            start = self.current_offset()
            self.fragments.append(self.source[start : self.getpos()[1] + 1])

    def handle_endtag(self, tag: str) -> None:
        if tag == "body":
            self.in_body = False
            return
        if not self.in_body or self.depth == 0:
            return
        self.depth -= 1
        if self.depth == 0 and self.fragment_start is not None:
            start = self.fragment_start
            end = self.current_offset()
            closing = re.match(r"</[^>]+>", self.source[end:])
            if closing:
                end += len(closing.group(0))
            self.fragments.append(self.source[start:end])
            self.fragment_start = None


def main() -> None:
    if len(sys.argv) != 2:
        raise SystemExit("Uso: python3 scripts/import-landing-html.py /ruta/al/landing.html")

    source_path = Path(sys.argv[1]).expanduser()
    source = source_path.read_text(encoding="utf-8")
    css_match = re.search(r"<style\b[^>]*>(.*?)</style>", source, re.I | re.S)
    if not css_match:
        raise SystemExit("No se encontró el bloque CSS del HTML.")

    parser = BodyFragments(source)
    parser.feed(source)
    raw_fragments = parser.fragments
    if len(raw_fragments) != len(FRAGMENT_NAMES) + 1:
        raise SystemExit(
            f"Se esperaban {len(FRAGMENT_NAMES) + 1} bloques del body, se encontraron {len(raw_fragments)}."
        )

    script_match = re.fullmatch(r"\s*<script\b[^>]*>(.*?)</script>\s*", raw_fragments[-1], re.I | re.S)
    if not script_match:
        raise SystemExit("El último bloque del body no es el script interactivo esperado.")
    fragments = raw_fragments[:-1]
    image_dir = Path("public/images/landing")
    html_dir = Path("content/landing")
    image_dir.mkdir(parents=True, exist_ok=True)
    html_dir.mkdir(parents=True, exist_ok=True)
    Path("public/scripts").mkdir(parents=True, exist_ok=True)

    replacements: dict[str, str] = {}
    for match in DATA_IMAGE.finditer(source):
        data_url = match.group(0)
        if data_url in replacements:
            continue
        image_bytes = base64.b64decode(match.group(2))
        digest = hashlib.sha256(image_bytes).hexdigest()[:12]
        extension = "jpg" if match.group(1).lower() in ("jpeg", "jpg") else match.group(1).lower()
        filename = f"landing-{digest}.{extension}"
        (image_dir / filename).write_bytes(image_bytes)
        replacements[data_url] = f"/images/landing/{filename}"

    def replace_images(text: str) -> str:
        for original, local_path in replacements.items():
            text = text.replace(original, local_path)
        return text

    def defer_fragment_images(fragment: str) -> str:
        def defer(match: re.Match[str]) -> str:
            tag = match.group(0)
            if re.search(r"\bloading\s*=", tag, re.I):
                return tag
            return tag[:-1] + ' loading="lazy" decoding="async">'

        return re.sub(r"<img\b[^>]*>", defer, fragment, flags=re.I)

    if len(fragments) != len(FRAGMENT_NAMES):
        raise SystemExit("El documento tiene una cantidad inesperada de fragmentos.")
    for name, fragment in zip(FRAGMENT_NAMES, fragments):
        fragment = defer_fragment_images(replace_images(fragment))
        if name == "footer":
            fragment = fragment.replace(
                "<span>Desarrollado por WindStudies</span>",
                '<a class="desarrollado" href="https://windstudies.com" target="_blank" '
                'rel="noopener noreferrer" aria-label="Desarrollado por WindStudies">'
                '<span>Desarrollado por</span><img src="/images/windstudies.png" width="432" '
                'height="66" alt="WindStudies" loading="lazy"></a>',
            )
        (html_dir / f"{name}.html").write_text(fragment.strip() + "\n", encoding="utf-8")
    Path("content/landing.css").write_text(replace_images(css_match.group(1)).strip() + "\n", encoding="utf-8")
    Path("public/scripts/grafo-landing.js").write_text(
        replace_images(script_match.group(1)).strip() + "\n", encoding="utf-8"
    )

    print(f"Importados {len(fragments)} fragmentos HTML y {len(replacements)} imágenes a {image_dir}.")


if __name__ == "__main__":
    main()
