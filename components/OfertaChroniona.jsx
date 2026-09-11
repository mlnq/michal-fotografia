"use client";

import { useEffect, useState } from "react";

const HASLO = "ofertaMM";
const KLUCZ_PAMIECI = "oferta-odblokowana";

export default function OfertaChroniona({ children }) {
  const [odblokowana, setOdblokowana] = useState(false);
  const [wpisane, setWpisane] = useState("");
  const [blad, setBlad] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(KLUCZ_PAMIECI) === "true") {
      setOdblokowana(true);
    }
  }, []);

  function sprawdzHaslo(event) {
    event.preventDefault();
    if (wpisane === HASLO) {
      localStorage.setItem(KLUCZ_PAMIECI, "true");
      setOdblokowana(true);
      setBlad(false);
    } else {
      setBlad(true);
    }
  }

  if (!odblokowana) {
    return (
      <section className="sekcja">
        <div className="kolumna">
          <h2>Oferta dla Was</h2>
          <p className="wstep">Podajcie hasło, które od nas dostaliście, żeby zobaczyć ofertę.</p>
          <form onSubmit={sprawdzHaslo} style={{ marginTop: "2rem" }}>
            <input
              type="password"
              value={wpisane}
              onChange={(e) => setWpisane(e.target.value)}
              placeholder="Hasło"
              className="pole-hasla"
              autoFocus
            />
            <button type="submit" className="cta" style={{ marginLeft: "0.75rem" }}>
              Wejdź
            </button>
          </form>
          {blad && <p style={{ color: "var(--akcent)", marginTop: "1rem" }}>Złe hasło, spróbujcie jeszcze raz.</p>}
        </div>
      </section>
    );
  }

  return children;
}
