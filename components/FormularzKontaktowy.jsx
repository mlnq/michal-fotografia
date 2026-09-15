"use client";

import { useState } from "react";

const POCZATKOWE_DANE = {
  imieNazwisko: "",
  email: "",
  telefon: "",
  dataWesela: "",
  sala: "",
  wiadomosc: "",
  stronaWww: "",
};

export default function FormularzKontaktowy({ tresc }) {
  const [dane, setDane] = useState(POCZATKOWE_DANE);
  const [status, setStatus] = useState("gotowy");

  const zmien = (pole) => (e) => {
    setDane((poprzednie) => ({ ...poprzednie, [pole]: e.target.value }));
  };

  const wyslij = async (e) => {
    e.preventDefault();
    setStatus("wysylanie");

    try {
      const odpowiedz = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dane),
      });
      const wynik = await odpowiedz.json();
      if (!odpowiedz.ok || !wynik.ok) {
        throw new Error(wynik.blad || "Błąd wysyłki");
      }
      setStatus("sukces");
      setDane(POCZATKOWE_DANE);
    } catch {
      setStatus("blad");
    }
  };

  if (status === "sukces") {
    return (
      <p className="formularz-status formularz-sukces" role="status">
        {tresc.sukces}
      </p>
    );
  }

  return (
    <form className="formularz-kontaktowy" onSubmit={wyslij} noValidate={false}>
      <div className="pole">
        <label htmlFor="imieNazwisko">{tresc.pola.imieNazwisko.etykieta}</label>
        <input
          id="imieNazwisko"
          required
          value={dane.imieNazwisko}
          onChange={zmien("imieNazwisko")}
          placeholder={tresc.pola.imieNazwisko.placeholder}
        />
      </div>

      <div className="pole">
        <label htmlFor="email">{tresc.pola.email.etykieta}</label>
        <input
          id="email"
          type="email"
          required
          value={dane.email}
          onChange={zmien("email")}
          placeholder={tresc.pola.email.placeholder}
        />
      </div>

      <div className="pole">
        <label htmlFor="telefon">{tresc.pola.telefon.etykieta}</label>
        <input
          id="telefon"
          type="tel"
          required
          value={dane.telefon}
          onChange={zmien("telefon")}
          placeholder={tresc.pola.telefon.placeholder}
        />
      </div>

      <div className="pole">
        <label htmlFor="dataWesela">{tresc.pola.dataWesela.etykieta}</label>
        <input
          id="dataWesela"
          type="date"
          required
          value={dane.dataWesela}
          onChange={zmien("dataWesela")}
        />
      </div>

      <div className="pole">
        <label htmlFor="sala">{tresc.pola.sala.etykieta}</label>
        <input
          id="sala"
          required
          value={dane.sala}
          onChange={zmien("sala")}
          placeholder={tresc.pola.sala.placeholder}
        />
      </div>

      <div className="pole">
        <label htmlFor="wiadomosc">{tresc.pola.wiadomosc.etykieta}</label>
        <textarea
          id="wiadomosc"
          value={dane.wiadomosc}
          onChange={zmien("wiadomosc")}
          placeholder={tresc.pola.wiadomosc.placeholder}
        />
      </div>

      <div className="pole-ukryte" aria-hidden="true">
        <label htmlFor="stronaWww">Strona WWW</label>
        <input
          id="stronaWww"
          name="stronaWww"
          tabIndex={-1}
          autoComplete="off"
          value={dane.stronaWww}
          onChange={zmien("stronaWww")}
        />
      </div>

      <button type="submit" className="cta cta-mocne" disabled={status === "wysylanie"}>
        {status === "wysylanie" ? tresc.przyciskWysylanie : tresc.przycisk}
      </button>

      {status === "blad" && (
        <p className="formularz-status formularz-blad" role="status">{tresc.blad}</p>
      )}
    </form>
  );
}
