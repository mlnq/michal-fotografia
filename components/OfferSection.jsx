function Pozycja({ nazwa, cena, opis }) {
  return (
    <div className="pozycja">
      <div className="pozycja-glowa">
        <h3>{nazwa}</h3>
        <span className="pozycja-cena">{cena}</span>
      </div>
      <p>{opis}</p>
    </div>
  );
}

export function SessionSection({ sesje }) {
  return (
    <section className="sekcja" id="sesje">
      <div className="kolumna">
        <h2>Sesje osobno</h2>
        <p className="wstep">
          Bez wesela, bez pakietu. Jeśli później dojdzie do rezerwacji terminu ślubu,
          odliczam połowę ceny sesji.
        </p>
        <div style={{ marginTop: "2rem" }}>
          {sesje.map((s) => (
            <Pozycja key={s.nazwa} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function AddonsSection({ dodatki }) {
  return (
    <section className="sekcja" id="dodatki">
      <div className="kolumna">
        <h2>Dodatki</h2>
        <p className="wstep">
          Wszystko można dobrać do dowolnego pakietu, także po weselu.
        </p>
        <div style={{ marginTop: "2rem" }}>
          {dodatki.map((d) => (
            <Pozycja key={d.nazwa} {...d} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessSection({ proces }) {
  return (
    <section className="sekcja" id="proces">
      <div className="kolumna">
        <h2>Jak to wygląda w praktyce</h2>
        <dl className="proces">
          {proces.map((p) => (
            <div key={p.pytanie}>
              <dt>{p.pytanie}</dt>
              <dd>{p.odpowiedz}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
