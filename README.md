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

## Formularz kontaktowy — dane do skrzynki e-mail

Formularz na stronie wysyła wiadomości przez e-mail, więc żeby działał, Vercel musi znać dane logowania do skrzynki SMTP. Bez tego formularz będzie pokazywał błąd przy każdej próbie wysyłki.

Potrzebne zmienne (te same, co w pliku `.env.example`):

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`

Gdzie je wpisać w Vercelu: wejdź w projekt → Settings → Environment Variables, dodaj każdą zmienną z jej wartością i zapisz. Po dodaniu lub zmianie zmiennych trzeba zrobić ponowny deploy (zakładka Deployments → wybierz najnowszy → „Redeploy”), inaczej strona dalej będzie działać na starych ustawieniach.

Adres, na który trafiają zapytania z formularza, to `marka.email` w `content.js` — nie ustawia się go w zmiennych środowiskowych.

Do testów na komputerze skopiuj plik `.env.example` do `.env.local` i uzupełnij te same wartości.

## Zanim pokażesz stronę klientom

- Wpisz prawdziwy numer telefonu i e-mail w `content.js` (pola `telefon`, `telefonLink`, `email`).
- Zamień `[Twoje miasto]` w opisach na nazwę miasta.
- Sprawdź ceny sesji, dodatków i zadatku — teraz są to wartości przykładowe.
- Podmień zdjęcia. Zapisuj je w dłuższym boku ok. 2000 px, jakość 80 — będą ostre i lekkie.
