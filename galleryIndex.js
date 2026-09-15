// Które wesela mają się pokazać w karuzeli portfolio na stronie głównej.
// Dodaj albo usuń nazwę folderu z public/foto/klienci, żeby pokazać/ukryć wesele.
export const galleryFolders = ["kinga-mateusz", "aniela-mateusz"];

// Które dokładnie zdjęcia z danego wesela i w jakiej kolejności — ustalasz
// w pliku public/foto/klienci/<folder>/index.json (lista nazw plików .webp).
// Prawdziwe wymiary każdego zdjęcia (potrzebne do ostrego wyświetlania) są
// liczone automatycznie przez scripts/convert_to_webp.py i zapisane w
// public/foto/klienci/<folder>/wymiary.json — nie edytujesz tego ręcznie.
//
// Odczyt jest w funkcji (nie w stałej), żeby w "npm run dev" zmiana w index.json
// była widoczna po odświeżeniu strony bez restartu serwera. W wersji produkcyjnej
// ("npm run build") strona jest generowana raz — zmiana zdjęć wymaga nowego builda.

import fs from "node:fs";
import path from "node:path";

const KLIENCI_DIR = path.join(process.cwd(), "public/foto/klienci");
const DOMYSLNE_WYMIARY = [1600, 1200];

export function buildPortfolio() {
  return galleryFolders.flatMap((folder) => {
    const folderPath = path.join(KLIENCI_DIR, folder);
    const zdjecia = JSON.parse(fs.readFileSync(path.join(folderPath, "index.json"), "utf-8"));

    let wymiary = {};
    const wymiaryPath = path.join(folderPath, "wymiary.json");
    if (fs.existsSync(wymiaryPath)) {
      wymiary = JSON.parse(fs.readFileSync(wymiaryPath, "utf-8"));
    }

    return zdjecia.map((plik) => {
      const [width, height] = wymiary[plik] ?? DOMYSLNE_WYMIARY;
      return { src: `/foto/klienci/${folder}/${plik}`, width, height };
    });
  });
}

// Buduje listę zdjęć z konkretnego, ręcznie wybranego zestawu (patrz
// portfolioWybrane w content.js) — zachowuje podaną kolejność, niezależnie
// od kolejności w index.json.
export function buildWybrane(wybrane) {
  const wymiaryCache = {};

  return wybrane.map(({ folder, plik }) => {
    if (!wymiaryCache[folder]) {
      const wymiaryPath = path.join(KLIENCI_DIR, folder, "wymiary.json");
      wymiaryCache[folder] = fs.existsSync(wymiaryPath)
        ? JSON.parse(fs.readFileSync(wymiaryPath, "utf-8"))
        : {};
    }

    const [width, height] = wymiaryCache[folder][plik] ?? DOMYSLNE_WYMIARY;
    return { src: `/foto/klienci/${folder}/${plik}`, width, height };
  });
}
