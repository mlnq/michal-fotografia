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
