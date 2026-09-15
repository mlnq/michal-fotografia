import FormularzKontaktowy from "./FormularzKontaktowy";

export default function ContactSection({ marka, kontakt }) {
  return (
    <section className="sekcja" id="kontakt">
      <div className="kolumna">
        <h2>{kontakt.naglowek}</h2>
        <p className="wstep">{kontakt.tekst}</p>

        <FormularzKontaktowy tresc={kontakt.formularz} />

        {marka.messenger && (
          <a className="cta cta-mocne" href={marka.messenger}>
            Napisz na Messengerze
          </a>
        )}
      </div>
    </section>
  );
}
