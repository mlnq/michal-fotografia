"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function PortfolioGallery({ portfolio, pelnyReportaz }) {
  const karuzelaRef = useRef(null);

  useEffect(() => {
    const karuzela = karuzelaRef.current;
    if (!karuzela) return;

    const dotykowe = window.matchMedia("(pointer: coarse)").matches;
    const mobilnaSzerokosc = window.matchMedia("(max-width: 680px)").matches;
    const ograniczonyRuch = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!dotykowe || !mobilnaSzerokosc || ograniczonyRuch) return;

    let indeks = 0;
    let wstrzymana = false;
    let wznowTimeout;

    const nastepne = () => {
      if (wstrzymana) return;
      const dzieci = karuzela.children;
      if (dzieci.length === 0) return;
      indeks = (indeks + 1) % dzieci.length;
      dzieci[indeks].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    };

    const wstrzymaj = () => {
      wstrzymana = true;
      clearTimeout(wznowTimeout);
      wznowTimeout = setTimeout(() => {
        wstrzymana = false;
      }, 6000);
    };

    const interwal = setInterval(nastepne, 3500);
    karuzela.addEventListener("touchstart", wstrzymaj, { passive: true });
    karuzela.addEventListener("pointerdown", wstrzymaj);

    return () => {
      clearInterval(interwal);
      clearTimeout(wznowTimeout);
      karuzela.removeEventListener("touchstart", wstrzymaj);
      karuzela.removeEventListener("pointerdown", wstrzymaj);
    };
  }, []);

  return (
    <section className="sekcja sekcja-zdjecia" id="portfolio">
      <div
        className="karuzela"
        ref={karuzelaRef}
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
