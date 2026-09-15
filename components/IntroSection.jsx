import Image from "next/image";

export default function IntroSection({ intro, hero, oMnie, marka }) {
  return (
    <section className="sekcja sekcja-intro" id="o-mnie">
      <div className="kolumna intro-siatka">
        <div className="intro-naglowek">
          <p className="nadtytul">{intro.nadtytul}</p>
          <h2>{intro.naglowek}</h2>
          <p className="wstep">{hero.podpis}</p>
        </div>
        <Image
          className="portret"
          src={oMnie.zdjecie}
          alt={`${marka.nazwa} ${marka.nazwisko}, fotograf ślubny`}
          width={824}
          height={1059}
          quality={90}
        />
        <div className="intro-tekst">
          <p>{oMnie.akapity[0]}</p>
          <a className="cta-tekstowe" href="/#kontakt">
            Napisz do mnie →
          </a>
        </div>
      </div>
    </section>
  );
}
