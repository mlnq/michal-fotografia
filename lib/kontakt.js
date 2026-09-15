export const WYMAGANE_POLA = ["imieNazwisko", "email", "telefon", "dataWesela", "sala"];

const WZORZEC_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_DLUGOSC_KROTKICH_POL = 200;
const MAX_DLUGOSC_WIADOMOSCI = 5000;

const KROTKIE_POLA = ["imieNazwisko", "email", "telefon", "dataWesela", "sala"];

export function walidujZgloszenie(dane) {
  const brakujace = WYMAGANE_POLA.filter((pole) => !dane?.[pole]?.toString().trim());
  if (brakujace.length > 0) {
    return { ok: false, blad: `Brakuje wymaganych pól: ${brakujace.join(", ")}` };
  }

  if (!WZORZEC_EMAIL.test(dane.email.trim())) {
    return { ok: false, blad: "Nieprawidłowy adres e-mail" };
  }

  const zaDlugiePole = KROTKIE_POLA.find(
    (pole) => dane?.[pole]?.toString().trim().length > MAX_DLUGOSC_KROTKICH_POL
  );
  if (zaDlugiePole) {
    return { ok: false, blad: `Pole ${zaDlugiePole} jest za długie` };
  }

  if (dane?.wiadomosc?.toString().trim().length > MAX_DLUGOSC_WIADOMOSCI) {
    return { ok: false, blad: "Pole wiadomosc jest za długie" };
  }

  return { ok: true };
}

export function jestSpamem(dane) {
  return Boolean(dane?.stronaWww?.toString().trim());
}
