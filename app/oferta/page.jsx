import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PackageSection from "../../components/PackageSection";
import { SessionSection, AddonsSection } from "../../components/OfferSection";
import ContactSection from "../../components/ContactSection";
import OfertaChroniona from "../../components/OfertaChroniona";
import { marka, pakiety, ctaPakiet, zadatek, sesje, dodatki, kontakt } from "../../content";

export default function Oferta() {
  return (
    <>
      <Header marka={marka} />

      <main id="gora">
        <OfertaChroniona>
          <PackageSection pakiety={pakiety} zadatek={zadatek} ctaPakiet={ctaPakiet} />
          <SessionSection sesje={sesje} />
          <AddonsSection dodatki={dodatki} />
          <ContactSection marka={marka} kontakt={kontakt} />
        </OfertaChroniona>
      </main>

      <Footer marka={marka} />
    </>
  );
}
