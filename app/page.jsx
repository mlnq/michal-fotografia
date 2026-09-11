import Image from "next/image";
import {
  marka,
  hero,
  portfolio,
  pelnyReportaz,
  oMnie,
  opinie,
  pakiety,
  ctaPakiet,
  zadatek,
  sesje,
  dodatki,
  proces,
  kontakt,
} from "../content";

function Pakiet({ pakiet, poprzedni }) {
  return (
    <article className="pakiet">
      <div className="pakiet-glowa">
        <h3>{pakiet.nazwa}</h3>
        <span className="pakiet-cena">{pakiet.cena}</span>
      </div>
      {pakiet.polecany && <span className="znacznik">najczęściej wybierany</span>}
      {poprzedni && <p className="baza">Wszystko z pakietu „{poprzedni}”, a do tego:</p>}
      <ul className="lista">
        {pakiet.nowe.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
      <p className="pakiet-opis">{pakiet.opis}</p>
      <a className="cta" href="#kontakt">
        {ctaPakiet}
      </a>
    </article>
  );
}

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

export default function Strona() {
  return (
    <>
      <header className="pasek">
        <div className="pasek-wnetrze">
          <a className="pasek-marka" href="#gora" aria-label="Początek strony">
          <Image
            className="pasek-logo"
            src={marka.logo}
            alt={`${marka.nazwa} ${marka.nazwisko} Fotografia`}
            width={1000}
            height={289}
            priority
          />
        </a>
          <a className="pasek-tel" href={`tel:${marka.telefonLink}`}>
            {marka.telefon}
          </a>
        </div>
      </header>

      <main id="gora">
        <section className="hero">
          <Image
            className="hero-foto"
            src={hero.zdjecie}
            alt="Para młoda w dniu ślubu"
            width={1600}
            height={1100}
            priority
          />
          <div className="hero-tekst">
            <div className="kolumna">
              <h1 className="hero-zdanie">{hero.zdanie}</h1>
              <p className="hero-podpis">{hero.podpis}</p>
            </div>
          </div>
        </section>

        <section className="sekcja sekcja-zdjecia" id="portfolio">
          <div
            className="karuzela"
            tabIndex={0}
            role="group"
            aria-label="Galeria zdjęć, przewijana w poziomie"
          >
            {portfolio.map((src, i) => (
              <Image
                key={src}
                src={src}
                alt={`Zdjęcie ślubne ${i + 1}`}
                width={1600}
                height={1200}
                sizes="80vw"
              />
            ))}
          </div>
          <div className="kolumna pod-karuzela">
            <p className="karuzela-podpowiedz">Przesuń palcem w bok</p>
            {pelnyReportaz.url && (
              <a className="cta" href={pelnyReportaz.url}>
                {pelnyReportaz.tekst}
              </a>
            )}
          </div>
        </section>

        <section className="sekcja" id="o-mnie">
          <div className="kolumna">
            <h2>Cześć, tu Michał</h2>
            <Image
              className="portret"
              src={oMnie.zdjecie}
              alt={`${marka.nazwa} ${marka.nazwisko}, fotograf ślubny`}
              width={1200}
              height={1500}
            />
            {oMnie.akapity.map((a) => (
              <p key={a.slice(0, 24)}>{a}</p>
            ))}
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
        </section>

        <section className="sekcja" id="opinie">
          <div className="kolumna">
            <h2>Co mówią pary</h2>
            <div style={{ marginTop: "2.5rem" }}>
              {opinie.map((o) => (
                <blockquote className="opinia" key={o.autor}>
                  <p>{o.tekst}</p>
                  <footer>
                    {o.autor}
                    {o.kontekst ? ` — ${o.kontekst}` : ""}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section className="sekcja" id="cennik">
          <div className="kolumna">
            <h2>Pakiety ślubne</h2>
            <p className="wstep">
              Trzy pakiety, każdy kolejny zawiera wszystko z poprzedniego. Ceny są
              ostateczne. Dojazd do 150 km i kwadrans obsuwy w harmonogramie nie
              kosztują nic więcej.
            </p>
            <div style={{ marginTop: "2.5rem" }}>
              {pakiety.map((p, i) => (
                <Pakiet
                  key={p.nazwa}
                  pakiet={p}
                  poprzedni={i > 0 ? pakiety[i - 1].nazwa : null}
                />
              ))}
            </div>
            <p className="zadatek">{zadatek}</p>
          </div>
        </section>

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

        <section className="sekcja" id="kontakt">
          <div className="kolumna">
            <h2>{kontakt.naglowek}</h2>
            <p className="wstep">{kontakt.tekst}</p>
            <div style={{ marginTop: "2.5rem" }}>
              <a className="kontakt-link" href={`tel:${marka.telefonLink}`}>
                {marka.telefon}
              </a>
              <a className="kontakt-link" href={`mailto:${marka.email}`}>
                {marka.email}
              </a>
            </div>
            {marka.messenger && (
              <a className="cta cta-mocne" href={marka.messenger}>
                Napisz na Messengerze
              </a>
            )}
          </div>
        </section>
      </main>

      <footer className="stopka">
        {marka.nazwa} {marka.nazwisko} — fotografia ślubna, sezon {marka.rok}
      </footer>
    </>
  );
}
