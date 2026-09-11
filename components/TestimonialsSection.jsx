export default function TestimonialsSection({ opinie }) {
  return (
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
  );
}
