import Image from "next/image";

export default function StyleSection({ styl, oMnie, marka, zdjecie }) {
  return (
    <section className="sekcja sekcja-styl">
      <div className="kolumna styl-siatka">
        <div>
          <h2>{styl.naglowek}</h2>
          <p>{oMnie.akapity[1]}</p>
          <p>{oMnie.akapity[2]}</p>
          {oMnie.podpis && (
            <Image
              className="podpis"
              src={oMnie.podpis}
              alt={`Podpis: ${marka.nazwa} ${marka.nazwisko}`}
              width={1000}
              height={246}
            />
          )}
        </div>
        {zdjecie && (
          <Image
            className="styl-zdjecie"
            src={zdjecie.src}
            alt="Zdjęcie ślubne"
            width={zdjecie.width}
            height={zdjecie.height}
            quality={90}
          />
        )}
      </div>
    </section>
  );
}
