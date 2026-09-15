import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import IntroSection from "../components/IntroSection";
import StyleSection from "../components/StyleSection";
import QuoteBanner from "../components/QuoteBanner";
import PortfolioGallery from "../components/PortfolioGallery";
import TestimonialsSection from "../components/TestimonialsSection";
import { ProcessSection } from "../components/OfferSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import { buildPortfolio, buildWybrane } from "../galleryIndex";
import {
  marka,
  hero,
  intro,
  styl,
  portfolioWybrane,
  pelnyReportaz,
  oMnie,
  opinie,
  proces,
  kontakt,
} from "../content";

export default function Strona() {
  const portfolio = buildPortfolio();
  const portfolioKompakt = buildWybrane(portfolioWybrane);
  const zdjecieStylu = portfolio[0];
  const zdjecieCytatu = portfolio[1] ?? portfolio[0];

  return (
    <>
      <Header marka={marka} />

      <main id="gora">
        <HeroSection hero={hero} />
        <IntroSection intro={intro} hero={hero} oMnie={oMnie} marka={marka} />
        <StyleSection styl={styl} oMnie={oMnie} marka={marka} zdjecie={zdjecieStylu} />
        <QuoteBanner cytat={hero.zdanie} zdjecie={zdjecieCytatu} />
        <TestimonialsSection opinie={opinie} />
        {/* <ProcessSection proces={proces} /> */}
        <PortfolioGallery portfolio={portfolioKompakt} pelnyReportaz={pelnyReportaz} />
        <ContactSection marka={marka} kontakt={kontakt} />
      </main>

      <Footer marka={marka} />
    </>
  );
}
