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
