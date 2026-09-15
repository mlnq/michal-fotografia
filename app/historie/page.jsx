import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { marka, historie } from "../../content";
import { buildOkladka } from "../../historieIndex";

export default function Historie() {
  const kafelki = historie.map((historia) => ({
    ...historia,
    okladka: buildOkladka(historia.slug, historia.okladka),
  }));

  return (
    <>
      <Header marka={marka} />

      <main id="gora">
        <section className="sekcja">
          <div className="kolumna">
            <h2>Wasze historie</h2>
            <p className="wstep">Pełne reportaże z wesel, które miałem przyjemność uwiecznić.</p>
          </div>
          <div className="historie-siatka">
            {kafelki.map((historia) => (
              <a key={historia.slug} className="historia-kafelek" href={`/historie/${historia.slug}`}>
                {historia.okladka && (
                  <Image
                    src={historia.okladka.src}
                    alt={historia.para}
                    width={historia.okladka.width}
                    height={historia.okladka.height}
                    sizes="(max-width: 680px) 100vw, 50vw"
                  />
                )}
                <span className="historia-kafelek-nazwa">{historia.para}</span>
              </a>
            ))}
          </div>
        </section>
      </main>

      <Footer marka={marka} />
    </>
  );
}
