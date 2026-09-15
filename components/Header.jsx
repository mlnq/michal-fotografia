"use client";

import { useState } from "react";
import Image from "next/image";

const LINKI = [
  { href: "/#portfolio", tekst: "Portfolio" },
  { href: "/#o-mnie", tekst: "O mnie" },
  { href: "/#opinie", tekst: "Opinie" },
];

export default function Header({ marka }) {
  const [otwarte, setOtwarte] = useState(false);

  return (
    <header className="pasek">
      <div className="pasek-wnetrze">
        <a className="pasek-marka" href="/" aria-label="Strona główna">
          <Image
            className="pasek-logo"
            src={marka.logo}
            alt={`${marka.nazwa} ${marka.nazwisko} Fotografia`}
            width={1000}
            height={289}
            priority
          />
        </a>
        <nav className="pasek-nav">
          {LINKI.map((link) => (
            <a key={link.href} href={link.href}>
              {link.tekst}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="pasek-hamburger"
          aria-label={otwarte ? "Zamknij menu" : "Otwórz menu"}
          aria-expanded={otwarte}
          onClick={() => setOtwarte((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      {otwarte && (
        <nav className="pasek-nav-mobilne" onClick={() => setOtwarte(false)}>
          {LINKI.map((link) => (
            <a key={link.href} href={link.href}>
              {link.tekst}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
