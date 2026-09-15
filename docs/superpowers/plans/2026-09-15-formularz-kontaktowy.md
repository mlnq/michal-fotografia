# Formularz kontaktowy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Zastąpić statyczne linki kontaktowe działającym formularzem zapytania o termin, który wysyła zgłoszenie mailem na skrzynkę właściciela przez SMTP.

**Architecture:** Klient (`FormularzKontaktowy.jsx`) wysyła `POST /api/kontakt` z JSON-em. Route handler w App Routerze waliduje dane, odrzuca boty przez honeypot, wysyła e-mail przez `nodemailer` skonfigurowany zmiennymi środowiskowymi SMTP (skrzynka OVH). Walidacja i wysyłka żyją w osobnych plikach `lib/`, żeby route handler był cienkim wiązaniem.

**Tech Stack:** Next.js 15 (App Router), React 19, nodemailer (nowa zależność). Brak frameworka testowego w projekcie — weryfikacja ręczna (`npm run dev` + curl + realna skrzynka), zgodnie z istniejącą konwencją repo (zero testów automatycznych gdzie indziej).

**Spec:** `docs/superpowers/specs/2026-09-15-formularz-kontaktowy-design.md`

## Global Constraints

- Wszystkie teksty/etykiety w `content.js`, nie hardkodowane w komponentach (konwencja repo — patrz nagłówek `content.js`).
- Zero nowych zależności UI dla kalendarza — natywny `<input type="date">`.
- Dane logowania SMTP wyłącznie przez zmienne środowiskowe, nigdy w repo.
- Pole daty, e-mail, telefon, imię i nazwisko, sala — wymagane. Wiadomość — opcjonalna.
- Honeypot jako jedyna ochrona antyspamowa (bez CAPTCHA).
- Linki `tel:`/`mailto:`/Messenger w `ContactSection` zostają widoczne jako zapasowa forma kontaktu.

---

### Task 1: Zależność nodemailer

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json` (generowany automatycznie)

**Interfaces:**
- Produces: pakiet `nodemailer` dostępny do importu w `lib/mailer.js` (Task 3).

- [ ] **Step 1: Zainstaluj pakiet**

Run: `npm install nodemailer`

- [ ] **Step 2: Zweryfikuj wpis w package.json**

Sprawdź, że `"dependencies"` zawiera `"nodemailer"` z numerem wersji (np. `"^6.9.x"` lub nowszy — cokolwiek zainstaluje npm).

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "Dodaje nodemailer jako zależność do wysyłki formularza kontaktowego"
```

---

### Task 2: Treść formularza w content.js

**Files:**
- Modify: `content.js:164-167`

**Interfaces:**
- Produces: `kontakt.formularz` — obiekt konsumowany przez `FormularzKontaktowy.jsx` (Task 5) jako prop `tresc`. Dokładny kształt:
  ```js
  {
    pola: {
      imieNazwisko: { etykieta: string, placeholder: string },
      email: { etykieta: string, placeholder: string },
      telefon: { etykieta: string, placeholder: string },
      dataWesela: { etykieta: string },
      sala: { etykieta: string, placeholder: string },
      wiadomosc: { etykieta: string, placeholder: string },
    },
    przycisk: string,
    przyciskWysylanie: string,
    sukces: string,
    blad: string,
  }
  ```

- [ ] **Step 1: Rozszerz obiekt `kontakt`**

Zamień obecny blok (`content.js:164-167`):

```js
export const kontakt = {
  naglowek: "Sprawdźmy, czy mam wolny termin",
  tekst: "Napiszcie datę i miejsce wesela, odpowiem tego samego dnia. Jeśli wolicie porozmawiać, dzwońcie śmiało.",
};
```

na:

```js
export const kontakt = {
  naglowek: "Sprawdźmy, czy mam wolny termin",
  tekst: "Napiszcie datę i miejsce wesela, odpowiem tego samego dnia. Jeśli wolicie porozmawiać, dzwońcie śmiało.",
  formularz: {
    pola: {
      imieNazwisko: { etykieta: "Imię i nazwisko", placeholder: "Ania i Paweł" },
      email: { etykieta: "E-mail", placeholder: "wy@przyklad.pl" },
      telefon: { etykieta: "Telefon", placeholder: "+48 600 000 000" },
      dataWesela: { etykieta: "Data wesela" },
      sala: { etykieta: "Sala weselna", placeholder: "Nazwa sali / miejsca" },
      wiadomosc: {
        etykieta: "Wiadomość (opcjonalnie)",
        placeholder: "Dodatkowe informacje, pytania...",
      },
    },
    przycisk: "Wyślij zapytanie",
    przyciskWysylanie: "Wysyłanie…",
    sukces: "Dziękuję! Wiadomość dotarła — odpowiem najszybciej, jak mogę.",
    blad: "Coś poszło nie tak. Spróbujcie ponownie albo napiszcie bezpośrednio na maila lub zadzwońcie.",
  },
};
```

- [ ] **Step 2: Zweryfikuj**

Run: `node -e "console.log(require('./content.js'))"` zwróci błąd (ESM) — zamiast tego uruchom `npm run dev` (patrz Task 9) i sprawdź w konsoli przeglądarki, że `import { kontakt } from ...` nie rzuca błędu (strona się renderuje). Na tym etapie żaden komponent jeszcze nie czyta `kontakt.formularz`, więc wystarczy, że `npm run build` / `next dev` kompiluje się bez błędów składni.

Run: `node --check content.js` — sprawdza tylko składnię JS (bez wykonywania importów), szybki sanity check.

- [ ] **Step 3: Commit**

```bash
git add content.js
git commit -m "Dodaje treść formularza kontaktowego do content.js"
```

---

### Task 3: Walidacja zgłoszenia i wykrywanie spamu

**Files:**
- Create: `lib/kontakt.js`

**Interfaces:**
- Produces:
  - `WYMAGANE_POLA: string[]` — lista kluczy wymaganych pól.
  - `walidujZgloszenie(dane: object): { ok: true } | { ok: false, blad: string }`
  - `jestSpamem(dane: object): boolean`
  - Używane przez `app/api/kontakt/route.js` (Task 4).

- [ ] **Step 1: Utwórz `lib/kontakt.js`**

```js
export const WYMAGANE_POLA = ["imieNazwisko", "email", "telefon", "dataWesela", "sala"];

const WZORZEC_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function walidujZgloszenie(dane) {
  const brakujace = WYMAGANE_POLA.filter((pole) => !dane?.[pole]?.toString().trim());
  if (brakujace.length > 0) {
    return { ok: false, blad: `Brakuje wymaganych pól: ${brakujace.join(", ")}` };
  }

  if (!WZORZEC_EMAIL.test(dane.email.trim())) {
    return { ok: false, blad: "Nieprawidłowy adres e-mail" };
  }

  return { ok: true };
}

export function jestSpamem(dane) {
  return Boolean(dane?.stronaWww?.toString().trim());
}
```

- [ ] **Step 2: Ręcznie zweryfikuj logikę**

Run:
```bash
node -e "
const { walidujZgloszenie, jestSpamem } = await import('./lib/kontakt.js');
console.log(walidujZgloszenie({}));
console.log(walidujZgloszenie({ imieNazwisko: 'Ania i Paweł', email: 'zle', telefon: '600000000', dataWesela: '2027-06-12', sala: 'Dwór X' }));
console.log(walidujZgloszenie({ imieNazwisko: 'Ania i Paweł', email: 'a@b.pl', telefon: '600000000', dataWesela: '2027-06-12', sala: 'Dwór X' }));
console.log(jestSpamem({ stronaWww: 'http://spam.example' }));
console.log(jestSpamem({ stronaWww: '' }));
" --input-type=module
```

Expected (w kolejności):
```
{ ok: false, blad: 'Brakuje wymaganych pól: imieNazwisko, email, telefon, dataWesela, sala' }
{ ok: false, blad: 'Nieprawidłowy adres e-mail' }
{ ok: true }
true
false
```

- [ ] **Step 3: Commit**

```bash
git add lib/kontakt.js
git commit -m "Dodaje walidację i wykrywanie spamu dla formularza kontaktowego"
```

---

### Task 4: Wysyłka e-maila (mailer) i route handler

**Files:**
- Create: `lib/mailer.js`
- Create: `app/api/kontakt/route.js`
- Create: `.env.example`

**Interfaces:**
- Consumes: `walidujZgloszenie`, `jestSpamem` z `lib/kontakt.js` (Task 3); `marka` z `content.js`.
- Produces: `POST /api/kontakt` — endpoint konsumowany przez `FormularzKontaktowy.jsx` (Task 5).
  - Request body (JSON): `{ imieNazwisko, email, telefon, dataWesela, sala, wiadomosc, stronaWww }`
  - Response `200 { ok: true }` — wysłane (albo cicho odrzucony spam).
  - Response `400 { ok: false, blad: string }` — brak/nieprawidłowe dane.
  - Response `500 { ok: false, blad: string }` — błąd wysyłki SMTP.

- [ ] **Step 1: Utwórz `lib/mailer.js`**

```js
import nodemailer from "nodemailer";
import { marka } from "../content.js";

function utworzTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function wyslijZgloszenie(dane) {
  const transporter = utworzTransporter();

  await transporter.sendMail({
    from: `"Formularz — ${marka.nazwa} ${marka.nazwisko}" <${process.env.SMTP_USER}>`,
    to: marka.email,
    replyTo: dane.email,
    subject: `Nowe zapytanie: ${dane.dataWesela} — ${dane.sala}`,
    text: [
      `Imię i nazwisko: ${dane.imieNazwisko}`,
      `E-mail: ${dane.email}`,
      `Telefon: ${dane.telefon}`,
      `Data wesela: ${dane.dataWesela}`,
      `Sala weselna: ${dane.sala}`,
      "",
      "Wiadomość:",
      dane.wiadomosc?.trim() || "(brak)",
    ].join("\n"),
  });
}
```

- [ ] **Step 2: Utwórz `app/api/kontakt/route.js`**

```js
import { NextResponse } from "next/server";
import { walidujZgloszenie, jestSpamem } from "../../../lib/kontakt.js";
import { wyslijZgloszenie } from "../../../lib/mailer.js";

export async function POST(request) {
  let dane;
  try {
    dane = await request.json();
  } catch {
    return NextResponse.json({ ok: false, blad: "Nieprawidłowe dane" }, { status: 400 });
  }

  if (jestSpamem(dane)) {
    return NextResponse.json({ ok: true });
  }

  const walidacja = walidujZgloszenie(dane);
  if (!walidacja.ok) {
    return NextResponse.json({ ok: false, blad: walidacja.blad }, { status: 400 });
  }

  try {
    await wyslijZgloszenie(dane);
    return NextResponse.json({ ok: true });
  } catch (blad) {
    console.error("Błąd wysyłki formularza kontaktowego:", blad);
    return NextResponse.json(
      { ok: false, blad: "Nie udało się wysłać wiadomości" },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 3: Utwórz `.env.example`**

```
SMTP_HOST=
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=
```

- [ ] **Step 4: Utwórz lokalny `.env.local` (nie commitować) i uruchom serwer**

Skopiuj `.env.example` do `.env.local`, wypełnij prawdziwymi danymi SMTP skrzynki OVH.

Run: `npm run dev`

- [ ] **Step 5: Ręcznie zweryfikuj walidację (bez realnej wysyłki)**

Run:
```bash
curl -s -X POST http://localhost:3000/api/kontakt \
  -H "Content-Type: application/json" \
  -d '{}'
```
Expected: `{"ok":false,"blad":"Brakuje wymaganych pól: imieNazwisko, email, telefon, dataWesela, sala"}` ze statusem 400.

- [ ] **Step 6: Ręcznie zweryfikuj honeypot**

Run:
```bash
curl -s -X POST http://localhost:3000/api/kontakt \
  -H "Content-Type: application/json" \
  -d '{"imieNazwisko":"Test","email":"a@b.pl","telefon":"600000000","dataWesela":"2027-01-01","sala":"Test","stronaWww":"http://spam.example"}'
```
Expected: `{"ok":true}`, status 200, **żaden e-mail nie przychodzi** na skrzynkę (sprawdź ręcznie po kilku minutach).

- [ ] **Step 7: Ręcznie zweryfikuj prawdziwą wysyłkę**

Run to samo co w Step 6, ale bez pola `stronaWww` i z prawdziwym własnym adresem e-mail w polu `email` (żeby sprawdzić `reply-to`):
```bash
curl -s -X POST http://localhost:3000/api/kontakt \
  -H "Content-Type: application/json" \
  -d '{"imieNazwisko":"Test Testowy","email":"TWOJ_TESTOWY_EMAIL","telefon":"600000000","dataWesela":"2027-01-01","sala":"Testowa sala","wiadomosc":"To jest test"}'
```
Expected: `{"ok":true}`, status 200, e-mail dociera na `marka.email` z tematu `Nowe zapytanie: 2027-01-01 — Testowa sala`, a "Odpowiedz" w kliencie poczty ustawia adresata na `TWOJ_TESTOWY_EMAIL`.

- [ ] **Step 8: Commit**

```bash
git add lib/mailer.js app/api/kontakt/route.js .env.example
git commit -m "Dodaje wysyłkę formularza kontaktowego przez SMTP (API route + mailer)"
```

(`.env.local` zostaje niezacommitowany — sprawdź `git status`, że go nie ma na liście.)

---

### Task 5: Komponent formularza — `FormularzKontaktowy.jsx`

**Files:**
- Create: `components/FormularzKontaktowy.jsx`

**Interfaces:**
- Consumes: prop `tresc` = `kontakt.formularz` (kształt z Task 2); wysyła `POST /api/kontakt` (kontrakt z Task 4).
- Produces: domyślny eksport `FormularzKontaktowy({ tresc })`, używany przez `ContactSection.jsx` (Task 6).

- [ ] **Step 1: Utwórz komponent**

```jsx
"use client";

import { useState } from "react";

const POCZATKOWE_DANE = {
  imieNazwisko: "",
  email: "",
  telefon: "",
  dataWesela: "",
  sala: "",
  wiadomosc: "",
  stronaWww: "",
};

export default function FormularzKontaktowy({ tresc }) {
  const [dane, setDane] = useState(POCZATKOWE_DANE);
  const [status, setStatus] = useState("gotowy");

  const zmien = (pole) => (e) => {
    setDane((poprzednie) => ({ ...poprzednie, [pole]: e.target.value }));
  };

  const wyslij = async (e) => {
    e.preventDefault();
    setStatus("wysylanie");

    try {
      const odpowiedz = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dane),
      });
      const wynik = await odpowiedz.json();
      if (!odpowiedz.ok || !wynik.ok) {
        throw new Error(wynik.blad || "Błąd wysyłki");
      }
      setStatus("sukces");
      setDane(POCZATKOWE_DANE);
    } catch {
      setStatus("blad");
    }
  };

  if (status === "sukces") {
    return <p className="formularz-status formularz-sukces">{tresc.sukces}</p>;
  }

  return (
    <form className="formularz-kontaktowy" onSubmit={wyslij} noValidate={false}>
      <div className="pole">
        <label htmlFor="imieNazwisko">{tresc.pola.imieNazwisko.etykieta}</label>
        <input
          id="imieNazwisko"
          required
          value={dane.imieNazwisko}
          onChange={zmien("imieNazwisko")}
          placeholder={tresc.pola.imieNazwisko.placeholder}
        />
      </div>

      <div className="pole">
        <label htmlFor="email">{tresc.pola.email.etykieta}</label>
        <input
          id="email"
          type="email"
          required
          value={dane.email}
          onChange={zmien("email")}
          placeholder={tresc.pola.email.placeholder}
        />
      </div>

      <div className="pole">
        <label htmlFor="telefon">{tresc.pola.telefon.etykieta}</label>
        <input
          id="telefon"
          type="tel"
          required
          value={dane.telefon}
          onChange={zmien("telefon")}
          placeholder={tresc.pola.telefon.placeholder}
        />
      </div>

      <div className="pole">
        <label htmlFor="dataWesela">{tresc.pola.dataWesela.etykieta}</label>
        <input
          id="dataWesela"
          type="date"
          required
          value={dane.dataWesela}
          onChange={zmien("dataWesela")}
        />
      </div>

      <div className="pole">
        <label htmlFor="sala">{tresc.pola.sala.etykieta}</label>
        <input
          id="sala"
          required
          value={dane.sala}
          onChange={zmien("sala")}
          placeholder={tresc.pola.sala.placeholder}
        />
      </div>

      <div className="pole">
        <label htmlFor="wiadomosc">{tresc.pola.wiadomosc.etykieta}</label>
        <textarea
          id="wiadomosc"
          value={dane.wiadomosc}
          onChange={zmien("wiadomosc")}
          placeholder={tresc.pola.wiadomosc.placeholder}
        />
      </div>

      <div className="pole-ukryte" aria-hidden="true">
        <label htmlFor="stronaWww">Strona WWW</label>
        <input
          id="stronaWww"
          name="stronaWww"
          tabIndex={-1}
          autoComplete="off"
          value={dane.stronaWww}
          onChange={zmien("stronaWww")}
        />
      </div>

      <button type="submit" className="cta cta-mocne" disabled={status === "wysylanie"}>
        {status === "wysylanie" ? tresc.przyciskWysylanie : tresc.przycisk}
      </button>

      {status === "blad" && (
        <p className="formularz-status formularz-blad">{tresc.blad}</p>
      )}
    </form>
  );
}
```

- [ ] **Step 2: Zweryfikuj brak błędów lintu/kompilacji**

Run: `node --check` nie zadziała na JSX — zamiast tego poczekaj na Task 6 (wpięcie do strony) i sprawdź `npm run dev` w przeglądarce. Na tym etapie potwierdź tylko, że plik zapisuje się bez oczywistych literówek (odczytaj go ponownie).

- [ ] **Step 3: Commit**

```bash
git add components/FormularzKontaktowy.jsx
git commit -m "Dodaje komponent formularza kontaktowego (stan, walidacja HTML5, wysyłka fetch)"
```

---

### Task 6: Wpięcie formularza do `ContactSection.jsx`

**Files:**
- Modify: `components/ContactSection.jsx`

**Interfaces:**
- Consumes: `FormularzKontaktowy` (Task 5), `kontakt.formularz` (Task 2, dociera już jako część propa `kontakt`).

- [ ] **Step 1: Zaimportuj i wyrenderuj formularz**

Zamień całą zawartość `components/ContactSection.jsx` na:

```jsx
import { formatujTelefon } from "../utils";
import FormularzKontaktowy from "./FormularzKontaktowy";

export default function ContactSection({ marka, kontakt }) {
  return (
    <section className="sekcja" id="kontakt">
      <div className="kolumna">
        <h2>{kontakt.naglowek}</h2>
        <p className="wstep">{kontakt.tekst}</p>

        <FormularzKontaktowy tresc={kontakt.formularz} />

        <div className="kontakt-zapasowy">
          <p className="wstep">Wolisz zadzwonić albo napisać bezpośrednio?</p>
          <a className="kontakt-link" href={`tel:${marka.telefon}`}>
            {formatujTelefon(marka.telefon)}
          </a>
          <a className="kontakt-link" href={`mailto:${marka.email}`}>
            {marka.email}
          </a>
          {marka.messenger && (
            <a className="cta cta-mocne" href={marka.messenger}>
              Napisz na Messengerze
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Uruchom dev server i sprawdź renderowanie**

Run: `npm run dev`

Otwórz `http://localhost:3000/#kontakt` w przeglądarce. Sprawdź:
- Formularz się renderuje ze wszystkimi polami.
- Linki telefon/e-mail/Messenger nadal widoczne pod formularzem.
- Brak błędów w konsoli przeglądarki i w terminalu (`npm run dev`).

- [ ] **Step 3: Commit**

```bash
git add components/ContactSection.jsx
git commit -m "Wpina formularz kontaktowy w sekcję kontaktową, zachowuje linki jako zapasowy kontakt"
```

---

### Task 7: Stylistyka formularza

**Files:**
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: klasy renderowane przez `FormularzKontaktowy.jsx` i `ContactSection.jsx` (Task 5, 6): `.formularz-kontaktowy`, `.pole`, `.pole-ukryte`, `.formularz-status`, `.formularz-sukces`, `.formularz-blad`, `.kontakt-zapasowy`.

- [ ] **Step 1: Dodaj sekcję stylów na końcu `app/globals.css`**

```css
/* ---------- formularz kontaktowy ---------- */

.formularz-kontaktowy {
  display: grid;
  gap: 1.1rem;
  max-width: 32rem;
  margin-top: 2.5rem;
}

.formularz-kontaktowy .pole {
  display: grid;
  gap: 0.4rem;
}

.formularz-kontaktowy label {
  font-size: 0.85rem;
  color: var(--szary);
}

.formularz-kontaktowy input,
.formularz-kontaktowy textarea {
  font: inherit;
  padding: 0.7rem 0.85rem;
  border: 1px solid var(--linia);
  border-radius: 4px;
  background: var(--papier);
  color: var(--tusz);
}

.formularz-kontaktowy input:focus-visible,
.formularz-kontaktowy textarea:focus-visible {
  outline: 2px solid var(--akcent);
  outline-offset: 1px;
}

.formularz-kontaktowy textarea {
  min-height: 6rem;
  resize: vertical;
}

.formularz-kontaktowy button {
  justify-self: start;
  border: 0;
  cursor: pointer;
}

.formularz-kontaktowy button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.pole-ukryte {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

.formularz-status {
  margin-top: 1rem;
}

.formularz-sukces {
  color: var(--akcent);
  font-family: "Fraunces", Georgia, serif;
  font-size: 1.2rem;
}

.formularz-blad {
  color: #b3261e;
}

.kontakt-zapasowy {
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid var(--linia);
}
```

- [ ] **Step 2: Ręcznie sprawdź w przeglądarce**

Run: `npm run dev`, otwórz `http://localhost:3000/#kontakt`.

Sprawdź: pola formularza mają spójny odstęp i typografię z resztą strony, focus na polu pokazuje obwódkę w kolorze `--akcent`, pole-pułapka (`stronaWww`) jest niewidoczne wizualnie, ale obecne w DOM (sprawdź w devtoolsach: element ma zerowy rozmiar, nie jest `display:none`).

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "Dodaje style formularza kontaktowego spójne z resztą strony"
```

---

### Task 8: Test end-to-end i dokumentacja zmiennych środowiskowych na Vercelu

**Files:**
- Modify: `docs/superpowers/specs/2026-09-15-formularz-kontaktowy-design.md` (opcjonalnie: dopisek "wdrożone", bez zmiany treści specu)

**Interfaces:** brak nowych — to jest task weryfikacyjny spinający Task 1-7.

- [ ] **Step 1: Pełny przebieg ręczny w przeglądarce**

Z uruchomionym `npm run dev` i wypełnionym `.env.local`:
1. Otwórz `http://localhost:3000/#kontakt`.
2. Wypełnij formularz prawdziwymi/testowymi danymi (użyj własnego adresu e-mail).
3. Wyślij — przycisk pokazuje "Wysyłanie…", potem znika formularz i pojawia się komunikat sukcesu.
4. Sprawdź skrzynkę `marka.email` — e-mail dotarł, temat zawiera datę i salę, treść zawiera wszystkie pola, "Odpowiedz" ustawia adresata na e-mail z formularza.
5. Spróbuj wysłać z pustym wymaganym polem — przeglądarka blokuje submit (walidacja HTML5 `required`).
6. Chwilowo popsuj `SMTP_PASS` w `.env.local` (błędne hasło), zrestartuj `npm run dev`, wyślij formularz ponownie — oczekuj komunikatu błędu (`tresc.blad`) zamiast cichego zawieszenia. Przywróć poprawne hasło po teście.

- [ ] **Step 2: Zanotuj instrukcję dla Vercela (do wykonania ręcznie przez właściciela repo, poza tym planem)**

W Vercel → Project Settings → Environment Variables dodaj dla środowiska Production (i Preview, jeśli formularz ma działać na podglądach PR-ów):
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`

Wartości takie same jak w lokalnym `.env.local`. Po dodaniu zmiennych zrób redeploy (Vercel wymaga redeployu, żeby nowe zmienne środowiskowe zaczęły obowiązywać).

- [ ] **Step 3: Ostateczne sprawdzenie stanu git**

Run: `git status`

Expected: brak niezacommitowanych zmian w plikach śledzonych (poza ewentualnie `.env.local`, który i tak jest ignorowany przez `.gitignore` Next.js — zweryfikuj przez `git status` że nie pojawia się on jako untracked do dodania; jeśli się pojawia, dopisz `.env.local` do `.gitignore` **przed** commitowaniem czegokolwiek innego w tym kroku).

- [ ] **Step 4: Finalny commit (jeśli Step 3 wymagał zmian w .gitignore)**

```bash
git add .gitignore
git commit -m "Upewnia się, że .env.local jest ignorowany przez git"
```

(Pomiń ten krok, jeśli `.env.local` już był ignorowany — standardowy `create-next-app` `.gitignore` zawiera `*.local`.)

---

## Self-Review Notes

- **Pokrycie specu:** pola formularza (Task 2, 5), natywny date input (Task 5), honeypot (Task 3, 4, 5), SMTP przez zmienne środowiskowe (Task 4, 8), reply-to (Task 4), treść w content.js (Task 2), stylistyka spójna z resztą strony (Task 7), linki zapasowe zostają (Task 6), poza zakresem — brak zadań dot. blokowania dat/CAPTCHA/pakietów/załączników, zgodnie ze spec.
- **Spójność nazw:** `walidujZgloszenie`/`jestSpamem` (Task 3) używane dokładnie tak samo w Task 4; `wyslijZgloszenie` (Task 4) zgodne z importem w route handlerze; `tresc` jako nazwa propa spójna między Task 2 (kształt danych), Task 5 (komponent) i Task 6 (przekazanie propa).
- **Brak placeholderów:** wszystkie kroki zawierają pełny kod lub dokładne polecenia do uruchomienia; brak "TODO"/"dodaj obsługę błędów" bez konkretu.
