"use client";

import { useRef } from "react";
import Image from "next/image";

export default function PortfolioGallery({ portfolio, pelnyReportaz }) {
  const karuzelaRef = useRef(null);

  const przewin = (kierunek) => {
    const el = karuzelaRef.current;
    if (!el) return;
    const pierwsze = el.querySelector("img");
    const krok = pierwsze ? pierwsze.clientWidth + 8 : el.clientWidth * 0.8;
    el.scrollBy({ left: kierunek * krok, behavior: "smooth" });
  };

  return (
    <section className="sekcja sekcja-zdjecia" id="portfolio">
      <div className="karuzela-owijka">
        <button
          type="button"
          className="karuzela-strzalka karuzela-strzalka-lewo"
          aria-label="Poprzednie zdjęcia"
          onClick={() => przewin(-1)}
        >
          ‹
        </button>
        <div
          ref={karuzelaRef}
          className="karuzela"
          tabIndex={0}
          role="group"
          aria-label="Galeria zdjęć, przewijana w poziomie"
        >
          {portfolio.map((foto, i) => (
            <Image
              key={foto.src}
              src={foto.src}
              alt={`Zdjęcie ślubne ${i + 1}`}
              width={foto.width}
              height={foto.height}
              sizes="80vw"
              className={foto.width > foto.height ? "poziome" : undefined}
            />
          ))}
        </div>
        <button
          type="button"
          className="karuzela-strzalka karuzela-strzalka-prawo"
          aria-label="Następne zdjęcia"
          onClick={() => przewin(1)}
        >
          ›
        </button>
      </div>
      <div className="kolumna pod-karuzela">
        <p className="karuzela-podpowiedz">
          <span className="podpowiedz-mysz">Przewiń w bok scrollem</span>
          <span className="podpowiedz-dotyk">Przesuń palcem w bok</span>
        </p>
        {pelnyReportaz.url && (
          <a className="cta" href={pelnyReportaz.url}>
            {pelnyReportaz.tekst}
          </a>
        )}
      </div>
    </section>
  );
}
