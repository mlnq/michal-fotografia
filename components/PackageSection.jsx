function Pakiet({ pakiet, poprzedni }) {
  return (
    <article className="pakiet">
      <div className="pakiet-glowa">
        <h3>{pakiet.nazwa}</h3>
        <span className="pakiet-cena">{pakiet.cena}</span>
      </div>
      {pakiet.polecany && <span className="znacznik">najczęściej wybierany</span>}
      {poprzedni && <p className="baza">Wszystko z pakietu „{poprzedni}”, a do tego:</p>}
      <ul className="lista">
        {pakiet.nowe.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
      <p className="pakiet-opis">{pakiet.opis}</p>
      <a className="cta" href="#kontakt">
        Sprawdź termin na ten pakiet
      </a>
    </article>
  );
}

export default function PackageSection({ pakiety, zadatek, ctaPakiet }) {
  return (
    <section className="sekcja" id="cennik">
      <div className="kolumna">
        <h2>Pakiety ślubne</h2>
        <p className="wstep">
          Trzy pakiety, każdy kolejny zawiera wszystko z poprzedniego. Ceny są
          ostateczne. Dojazd do 150 km i kwadrans obsuwy w harmonogramie nie kosztują nic więcej.
        </p>
        <div style={{ marginTop: "2.5rem" }}>
          {pakiety.map((p, i) => (
            <Pakiet
              key={p.nazwa}
              pakiet={p}
              poprzedni={i > 0 ? pakiety[i - 1].nazwa : null}
            />
          ))}
        </div>
        <p className="zadatek">{zadatek}</p>
        <a className="cta" href="#kontakt" style={{ marginTop: "1.5rem" }}>
          {ctaPakiet}
        </a>
      </div>
    </section>
  );
}
