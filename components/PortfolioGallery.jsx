"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function PortfolioGallery({ portfolio, pelnyReportaz }) {
  const paskiRef = useRef(null);
  const [aktywneZdjecie, setAktywneZdjecie] = useState(0);

  useEffect(() => {
    const el = paskiRef.current;
    if (!el) return;

    const naScroll = () => {
      const dzieci = Array.from(el.children);
      let najblizszy = 0;
      let najmniejszaRoznica = Infinity;
      dzieci.forEach((dziecko, i) => {
        const roznica = Math.abs(dziecko.offsetLeft - el.scrollLeft);
        if (roznica < najmniejszaRoznica) {
          najmniejszaRoznica = roznica;
          najblizszy = i;
        }
      });
      setAktywneZdjecie(najblizszy);
    };

    naScroll();
    el.addEventListener("scroll", naScroll, { passive: true });
    return () => el.removeEventListener("scroll", naScroll);
  }, [portfolio.length]);

  const idzDo = (i) => {
    const el = paskiRef.current;
    const dziecko = el?.children[i];
    if (!el || !dziecko) return;
    el.scrollTo({ left: dziecko.offsetLeft, behavior: "smooth" });
  };

  return (
    <section className="sekcja-zdjecia" id="portfolio">
      <div
        ref={paskiRef}
        className="portfolio-pasek"
        tabIndex={0}
        role="group"
        aria-label="Galeria zdjęć"
      >
        {portfolio.map((foto, i) => (
          <Image
            key={foto.src}
            src={foto.src}
            alt={`Zdjęcie ślubne ${i + 1}`}
            width={foto.width}
            height={foto.height}
            sizes="300px"
            quality={90}
          />
        ))}
      </div>

      {portfolio.length > 1 && (
        <div className="pasek-kropki" role="tablist" aria-label="Zdjęcia galerii">
          {portfolio.map((foto, i) => (
            <button
              key={foto.src}
              type="button"
              className={i === aktywneZdjecie ? "kropka aktywna" : "kropka"}
              aria-label={`Zdjęcie ${i + 1}`}
              aria-selected={i === aktywneZdjecie}
              role="tab"
              onClick={() => idzDo(i)}
            />
          ))}
        </div>
      )}

      {pelnyReportaz.url && (
        <div className="kolumna pod-pasek">
          <a className="cta" href={pelnyReportaz.url}>
            {pelnyReportaz.tekst}
          </a>
        </div>
      )}
    </section>
  );
}
