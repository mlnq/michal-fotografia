#!/usr/bin/env python3
"""Konwertuje zdjęcia z sesji ślubnej do WebP.

Zdjęcia lądują w public/foto/klienci/<nazwa-wesela>/, razem z wymiary.json
(prawdziwe wymiary każdego zdjęcia, generowane automatycznie — nie edytuj ręcznie).
Żeby pokazać zdjęcia na stronie, dopisz nazwy wybranych plików do
public/foto/klienci/<nazwa-wesela>/index.json i dopisz sam folder do
galleryFolders w galleryIndex.js.

Użycie:
    python3 scripts/convert_to_webp.py --input ./raw/kinga-mateusz --output ./public/foto/klienci/kinga-mateusz --max-width 1800 --quality 82 --limit 20

Jeśli chcesz konwertować tylko najlepsze kadry, wpisz ich nazwy w --names,
np.:
    python3 scripts/convert_to_webp.py --input ./raw/kinga-mateusz --output ./public/foto/klienci/kinga-mateusz --names IMG_001.jpg IMG_014.jpg IMG_022.jpg

Jeśli nie podasz --names, skrypt przetworzy wszystkie pliki z folderu wejściowego.
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Iterable, List

try:
    from PIL import Image
except ImportError as exc:  # pragma: no cover
    raise SystemExit(
        "Brakuje biblioteki Pillow. Zainstaluj: pip install pillow"
    ) from exc

ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".tif", ".tiff", ".bmp", ".webp"}


def list_images(folder: Path) -> List[Path]:
    if not folder.exists():
        raise FileNotFoundError(f"Folder wejściowy nie istnieje: {folder}")

    files = [
        p for p in sorted(folder.iterdir())
        if p.is_file() and p.suffix.lower() in ALLOWED_EXTENSIONS
    ]
    return files


def normalize_selection(selected: List[str], available: List[Path]) -> List[Path]:
    available_by_name = {p.name: p for p in available}
    chosen: List[Path] = []
    missing: List[str] = []

    for name in selected:
        path = available_by_name.get(name)
        if path is None:
            missing.append(name)
        else:
            chosen.append(path)

    if missing:
        raise FileNotFoundError(
            "Nie znaleziono wybranych plików: " + ", ".join(missing)
        )

    return chosen


def resize_for_web(image: Image.Image, max_width: int) -> Image.Image:
    width, height = image.size
    if max(width, height) <= max_width:
        return image

    scale = max_width / max(width, height)
    new_size = (max(1, int(width * scale)), max(1, int(height * scale)))
    return image.resize(new_size, Image.Resampling.LANCZOS)


def convert_one(src: Path, dst: Path, max_width: int, quality: int) -> tuple[int, int]:
    with Image.open(src) as img:
        if img.mode in ("RGBA", "LA", "P"):
            rgb_image = img.convert("RGBA")
        elif img.mode not in ("RGB", "L"):
            rgb_image = img.convert("RGB")
        else:
            rgb_image = img.copy()

        rgb_image = resize_for_web(rgb_image, max_width=max_width)
        dst.parent.mkdir(parents=True, exist_ok=True)
        rgb_image.save(dst, format="WEBP", quality=quality, method=6, optimize=True)
        return rgb_image.size


def zapisz_wymiary(output_dir: Path, nowe_wymiary: dict[str, list[int]]) -> None:
    plik_wymiarow = output_dir / "wymiary.json"
    istniejace = {}
    if plik_wymiarow.exists():
        istniejace = json.loads(plik_wymiarow.read_text(encoding="utf-8"))
    istniejace.update(nowe_wymiary)
    plik_wymiarow.write_text(
        json.dumps(istniejace, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )


def convert_batch(input_dir: Path, output_dir: Path, names: list[str] | None, max_width: int, quality: int, limit: int | None) -> None:
    all_files = list_images(input_dir)
    if not all_files:
        raise FileNotFoundError(f"Brak obrazów w folderze: {input_dir}")

    selected = normalize_selection(names, all_files) if names else all_files
    if limit is not None:
        selected = selected[:limit]

    if not selected:
        raise ValueError("Nie wybrano żadnych zdjęć do konwersji.")

    output_dir.mkdir(parents=True, exist_ok=True)

    nowe_wymiary: dict[str, list[int]] = {}
    for src in selected:
        dst = output_dir / f"{src.stem}.webp"
        width, height = convert_one(src, dst, max_width=max_width, quality=quality)
        nowe_wymiary[dst.name] = [width, height]
        print(f"{src.name} -> {dst.name} ({width}x{height})")

    zapisz_wymiary(output_dir, nowe_wymiary)
    print(f"Zakonczono: {len(selected)} plików przekonwertowano do WebP. Wymiary zapisane w {output_dir / 'wymiary.json'}.")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Konwertuje zdjęcia do WebP i pozwala wybrać tylko najlepsze kadry.")
    parser.add_argument("--input", type=Path, required=True, help="Folder z oryginalnymi zdjęciami")
    parser.add_argument("--output", type=Path, required=True, help="Folder docelowy z WebP")
    parser.add_argument("--names", nargs="*", default=None, help="Lista nazw najlepszych zdjęć do konwersji, np. IMG_001.jpg IMG_004.jpg")
    parser.add_argument("--max-width", type=int, default=1800, help="Maksymalna szerokość / wysokość obrazu (domyślnie 1800)")
    parser.add_argument("--quality", type=int, default=82, help="Jakość WebP od 0 do 100 (domyślnie 82)")
    parser.add_argument("--limit", type=int, default=None, help="Opcjonalny limit liczby wybranych zdjęć")
    return parser.parse_args()


if __name__ == "__main__":
    args = parse_args()
    convert_batch(
        input_dir=args.input,
        output_dir=args.output,
        names=args.names,
        max_width=args.max_width,
        quality=args.quality,
        limit=args.limit,
    )
