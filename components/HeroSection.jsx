import Image from "next/image";

export default function HeroSection({ hero }) {
  return (
    <section className="hero">
      <Image
        className="hero-foto"
        src={hero.zdjecie}
        alt="Para młoda w dniu ślubu"
        width={1800}
        height={1200}
        priority
      />
      <div className="hero-tekst">
        <div className="kolumna">
          <h1 className="hero-zdanie">{hero.zdanie}</h1>
          <p className="hero-podpis">{hero.podpis}</p>
        </div>
      </div>
    </section>
  );
}
