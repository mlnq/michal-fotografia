import { formatujTelefon } from "../utils";

export default function ContactSection({ marka, kontakt }) {
  return (
    <section className="sekcja" id="kontakt">
      <div className="kolumna">
        <h2>{kontakt.naglowek}</h2>
        <p className="wstep">{kontakt.tekst}</p>
        <div style={{ marginTop: "2.5rem" }}>
          <a className="kontakt-link" href={`tel:${marka.telefon}`}>
            {formatujTelefon(marka.telefon)}
          </a>
          <a className="kontakt-link" href={`mailto:${marka.email}`}>
            {marka.email}
          </a>
        </div>
        {marka.messenger && (
          <a className="cta cta-mocne" href={marka.messenger}>
            Napisz na Messengerze
          </a>
        )}
      </div>
    </section>
  );
}
