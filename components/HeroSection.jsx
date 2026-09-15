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
        quality={90}
        priority
      />
    </section>
  );
}
