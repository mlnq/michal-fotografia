# Michał Fotografia — strona oferty

Next.js 15, bez bazy danych i bez zależności zewnętrznych. Cała treść siedzi w jednym pliku.

## Co gdzie jest

- `content.js` — wszystkie teksty, ceny, pakiety, opinie, telefon i e-mail. To jedyny plik, który zwykle będziesz ruszał.
- `public/foto/` — zdjęcia. Podmień pliki, zostawiając nazwy: `hero.jpg`, `portret.jpg`, `01.jpg`–`08.jpg`.
- `public/foto/logo.png` — logo w górnym pasku (pełna sygnatura z napisem FOTOGRAFIA).
- `public/foto/podpis.png` — sam odręczny podpis bez napisu FOTOGRAFIA. PNG z przezroczystym tłem i czarnym śladem, szerokość ok. 900 px. Wyświetla się pod tekstem „Kim jestem”. Jeśli nie chcesz podpisu, usuń linijkę `podpis:` z `content.js`.
- `app/globals.css` — kolory i typografia. Zmienne na samej górze pliku.
- `app/page.jsx` — układ sekcji.

## Podgląd na komputerze

```
npm install
npm run dev
```
Strona otworzy się pod http://localhost:3000

## Wrzucenie na Vercel

1. Załóż repozytorium na GitHubie i wgraj do niego całą zawartość tego folderu.
2. Wejdź na vercel.com, zaloguj się kontem GitHub, kliknij „Add New… → Project”.
3. Wybierz repozytorium. Vercel sam wykryje Next.js — nic nie zmieniaj, kliknij „Deploy”.
4. Po minucie dostaniesz adres typu `michal-fotografia.vercel.app`.
5. Własną domenę podepniesz w zakładce Settings → Domains.

Od tej pory każdy zapisany plik wysłany na GitHuba aktualizuje stronę automatycznie.

## Zanim pokażesz stronę klientom

- Wpisz prawdziwy numer telefonu i e-mail w `content.js` (pola `telefon`, `telefonLink`, `email`).
- Zamień `[Twoje miasto]` w opisach na nazwę miasta.
- Sprawdź ceny sesji, dodatków i zadatku — teraz są to wartości przykładowe.
- Podmień zdjęcia. Zapisuj je w dłuższym boku ok. 2000 px, jakość 80 — będą ostre i lekkie.
