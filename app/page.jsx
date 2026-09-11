import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import PortfolioGallery from "../components/PortfolioGallery";
import AboutSection from "../components/AboutSection";
import TestimonialsSection from "../components/TestimonialsSection";
import { ProcessSection } from "../components/OfferSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import { buildPortfolio } from "../galleryIndex";
import {
  marka,
  hero,
  pelnyReportaz,
  oMnie,
  opinie,
  proces,
  kontakt,
} from "../content";

export default function Strona() {
  return (
    <>
      <Header marka={marka} />

      <main id="gora">
        <HeroSection hero={hero} />
        <PortfolioGallery portfolio={buildPortfolio()} pelnyReportaz={pelnyReportaz} />
        <AboutSection oMnie={oMnie} marka={marka} />
        <TestimonialsSection opinie={opinie} />
        {/* <ProcessSection proces={proces} /> */}
        <ContactSection marka={marka} kontakt={kontakt} />
      </main>

      <Footer marka={marka} />
    </>
  );
}
