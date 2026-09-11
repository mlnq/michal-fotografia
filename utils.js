// Formatuje numer telefonu do czytelnej postaci "+48 000 000 000"
// z jednego surowego numeru, np. "+48000000000".
export function formatujTelefon(telefon) {
  const cyfry = telefon.replace(/\D/g, "");
  const numerKrajowy = cyfry.slice(-9).match(/.{1,3}/g).join(" ");
  const kierunkowy = cyfry.slice(0, -9);
  return kierunkowy ? `+${kierunkowy} ${numerKrajowy}` : numerKrajowy;
}
