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
