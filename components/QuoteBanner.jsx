import Image from "next/image";

export default function QuoteBanner({ cytat, zdjecie }) {
  return (
    <section className="cytat-baner">
      <Image
        className="cytat-tlo"
        src={zdjecie.src}
        alt=""
        width={zdjecie.width}
        height={zdjecie.height}
        quality={90}
      />
      <div className="cytat-tresc">
        <p>{cytat}</p>
      </div>
    </section>
  );
}
