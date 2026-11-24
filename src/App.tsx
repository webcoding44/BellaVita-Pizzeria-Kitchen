import Navbar from "../components/Navbar";
import HeroScroll from "../components/HeroScroll";
import IntroSection from "../components/IntroSection";
import FeaturesSection from "../components/FeaturesSection";
import GallerySection from "../components/GallerySection";
import ExperienceSection from "../components/ExperienceSection";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";

export default function App() {
  return (
    <>
      <Navbar />

      <main>
        <HeroScroll />

        <IntroSection />

        <FeaturesSection />

        <GallerySection />

        <ExperienceSection />

        <CTASection />
      </main>

      <Footer />
    </>
  );
}