import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { VideoSection } from "./components/VideoSection";
import { heroSlides, sections } from "./data";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#06070b]">
      <Header activeCategory="Trang chủ" />

      <main>
        <Hero slides={heroSlides} />

        {sections.map((section) => (
          <VideoSection key={section.id} section={section} />
        ))}
      </main>

      <Footer />
    </div>
  );
}
