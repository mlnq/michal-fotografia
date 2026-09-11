import Image from "next/image";

export default function AboutSection({ oMnie, marka }) {
  return (
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
        <div style={{ display: "flex", justifyContent: "center" }}>
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
      </div>
    </section>
  );
}
