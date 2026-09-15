# Formularz kontaktowy — projekt

Data: 2026-09-15
Status: zaakceptowany, gotowy do planu implementacji

## Cel

Sekcja kontaktowa (`components/ContactSection.jsx`) obecnie zawiera tylko
statyczne linki `tel:` / `mailto:` / Messenger. Zastępujemy ją (a właściwie
rozszerzamy — linki zostają jako zapasowa forma kontaktu) prawdziwym
formularzem zapytania o termin, który wysyła zgłoszenie mailem bezpośrednio
na skrzynkę właściciela strony.

## Pola formularza

Wszystkie pola oprócz wiadomości są wymagane.

| Pole | Typ | Uwagi |
|---|---|---|
| Imię i nazwisko | tekst | pojedyncze pole, para wpisuje siebie |
| E-mail | `email` | używany też jako `reply-to` w wysyłanym mailu |
| Telefon | `tel` | luźna walidacja formatu (samo `required`, bez sztywnego wzorca — różne formaty zapisu numerów) |
| Data wesela | natywny `input type="date"` | bez biblioteki kalendarza — zero nowych zależności UI |
| Sala weselna | tekst | nazwa miejsca |
| Wiadomość | textarea | opcjonalne, dodatkowe informacje/pytania |
| Pole-pułapka (honeypot) | tekst, ukryty CSS-em | nie wymagane przez usera — jeśli wypełnione, zgłoszenie jest po cichu odrzucane jako spam bota |

## Architektura

- **`components/FormularzKontaktowy.jsx`** (nowy, `"use client"`) — kontrolowany
  formularz React. Stan: wartości pól, status wysyłki
  (`idle | wysylanie | sukces | blad`). Walidacja HTML5 (`required`,
  `type="email"`) po stronie przeglądarki.
- Po submicie: `fetch("/api/kontakt", { method: "POST", body: JSON.stringify(...) })`.
  - `wysylanie` → przycisk disabled, tekst "Wysyłanie…".
  - `sukces` → komunikat potwierdzenia, formularz się czyści.
  - `blad` → komunikat z prośbą o kontakt telefoniczny/mailowy jako zapasową opcję (nie chowamy linków `tel:`/`mailto:` z `ContactSection` — zostają zawsze widoczne pod formularzem).
- **`app/api/kontakt/route.js`** (nowy, Next.js App Router route handler,
  `export async function POST(request)`):
  1. Parsuje JSON z body.
  2. Sprawdza honeypot — jeśli wypełniony, zwraca `200 { ok: true }` bez wysyłki (nie zdradzamy botowi, że wykryty).
  3. Waliduje wymagane pola (imię, e-mail, telefon, data, sala) — brak → `400`.
  4. Wysyła e-mail przez `nodemailer` (SMTP, konto OVH właściciela) na `marka.email` z `content.js`, z `replyTo` ustawionym na e-mail z formularza.
  5. Sukces → `200 { ok: true }`. Błąd wysyłki (np. SMTP nie odpowiada) → `500 { ok: false }`.
- **Zależność:** `nodemailer` — jedyna nowa zależność produkcyjna.

## Konfiguracja SMTP (zmienne środowiskowe)

Dane logowania do skrzynki OVH nigdy nie trafiają do repozytorium. Wymagane
zmienne środowiskowe (ustawiane w panelu Vercela dla projektu, osobno dla
Production/Preview jeśli trzeba):

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE` (`true`/`false`, zależnie od portu — 465 = true, 587 = false)
- `SMTP_USER`
- `SMTP_PASS`

Lokalnie do testów: plik `.env.local` (już objęty domyślnym `.gitignore`
Next.js) z tymi samymi zmiennymi.

## Treść i stylistyka

- Etykiety pól, placeholdery, teksty statusów (wysyłanie/sukces/błąd) i
  nagłówek dopisywane do obiektu `kontakt` w `content.js` — zgodnie z
  konwencją "cała treść strony jest w `content.js`".
- Styl formularza w `app/globals.css`: te same zmienne (`--akcent`, `--linia`,
  `--szary`), fonty Fraunces/Work Sans, spójne z resztą sekcji (`.sekcja`,
  `.kolumna`).

## Poza zakresem (świadomie pominięte)

- Blokowanie już zajętych dat w kalendarzu (brak źródła danych o
  zarezerwowanych terminach) — pole daty to zwykły wybór, bez walidacji
  dostępności.
- CAPTCHA — honeypot uznany za wystarczającą ochronę na start.
- Wybór pakietu/oferty jako pole formularza.
- Załączniki (np. inspiracje, moodboard).

## Testowanie

- Ręczne testy w `npm run dev` z realnymi zmiennymi SMTP w `.env.local`
  (wysyłka na własny testowy adres, żeby nie spamować prawdziwej skrzynki).
- Test walidacji: brak wymaganego pola → formularz nie wysyła (HTML5) /
  API zwraca 400 przy ręcznym zapytaniu z pominiętym polem.
- Test honeypota: ręczne wypełnienie ukrytego pola przez `fetch` z konsoli
  przeglądarki → API zwraca 200, ale mail nie jest wysyłany (weryfikacja po
  braku maila, nie po treści odpowiedzi).
