// Dane do zakładki "Wasze historie" (app/historie).
// 1. konwertujesz zdjęcia do public/foto/historie/<para>/ (patrz scripts/convert_to_webp.py)
// 2. w public/foto/historie/<para>/index.json ustalasz kolejność: nazwy plików
//    wplecione z wpisami { "podpis": "Tekst, który ma się pojawić w tym miejscu" }
// 3. dopisujesz wpis { slug: "<para>", para: "Imię i Imię" } do historie w content.js

import fs from "node:fs";
import path from "node:path";

const HISTORIE_DIR = path.join(process.cwd(), "public/foto/historie");
const DOMYSLNE_WYMIARY = [1600, 1200];

function wczytajWpisy(slug) {
  const folderPath = path.join(HISTORIE_DIR, slug);
  const wpisy = JSON.parse(fs.readFileSync(path.join(folderPath, "index.json"), "utf-8"));

  let wymiary = {};
  const wymiaryPath = path.join(folderPath, "wymiary.json");
  if (fs.existsSync(wymiaryPath)) {
    wymiary = JSON.parse(fs.readFileSync(wymiaryPath, "utf-8"));
  }

  return { wpisy, wymiary, folderPath };
}

// Grupuje kolejne zdjęcia w bloki, przerywane blokami tekstowymi (podpisami).
export function buildHistoria(slug) {
  const { wpisy, wymiary } = wczytajWpisy(slug);

  const bloki = [];
  for (const wpis of wpisy) {
    if (typeof wpis === "string") {
      const [width, height] = wymiary[wpis] ?? DOMYSLNE_WYMIARY;
      const zdjecie = { src: `/foto/historie/${slug}/${wpis}`, width, height };

      const ostatni = bloki[bloki.length - 1];
      if (ostatni?.typ === "zdjecia") {
        ostatni.zdjecia.push(zdjecie);
      } else {
        bloki.push({ typ: "zdjecia", zdjecia: [zdjecie] });
      }
    } else if (wpis.podpis) {
      bloki.push({ typ: "podpis", tekst: wpis.podpis });
    }
  }

  return bloki;
}

// Zdjęcie okładkowe dla kafelka na liście /historie: pierwsze zdjęcie z folderu,
// chyba że w content.js podano konkretny plik w polu "okladka".
export function buildOkladka(slug, plikOkladki) {
  const { wpisy, wymiary } = wczytajWpisy(slug);
  const plik = plikOkladki ?? wpisy.find((wpis) => typeof wpis === "string");
  if (!plik) return null;

  const [width, height] = wymiary[plik] ?? DOMYSLNE_WYMIARY;
  return { src: `/foto/historie/${slug}/${plik}`, width, height };
}
