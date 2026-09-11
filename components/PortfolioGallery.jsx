import Image from "next/image";

export default function PortfolioGallery({ portfolio, pelnyReportaz }) {
  return (
    <section className="sekcja sekcja-zdjecia" id="portfolio">
      <div
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
