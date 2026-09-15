import { notFound } from "next/navigation";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import StoryGallery from "../../../components/StoryGallery";
import { marka, historie } from "../../../content";
import { buildHistoria } from "../../../historieIndex";

export function generateStaticParams() {
  return historie.map((historia) => ({ slug: historia.slug }));
}

export default async function Historia({ params }) {
  const { slug } = await params;
  const historia = historie.find((h) => h.slug === slug);
  if (!historia) notFound();

  const bloki = buildHistoria(slug);

  return (
    <>
      <Header marka={marka} />

      <main id="gora">
        <section className="sekcja sekcja-zdjecia">
          <div className="kolumna historia-glowa">
            <a className="historia-powrot" href="/historie">
              ← Wasze historie
            </a>
            <h2>{historia.para}</h2>
          </div>
          <StoryGallery bloki={bloki} />
        </section>
      </main>

      <Footer marka={marka} />
    </>
  );
}
