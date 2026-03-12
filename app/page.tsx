import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { VideoSection } from "./components/VideoSection";
import type { HeroSlide, VideoSectionData } from "./data";

type SliderApiItem = {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string;
  isExclusive: boolean;
};

type SectionApiItem = {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string;
  views: number;
};

type SectionApiResponse = {
  sectionName: string;
  items: SectionApiItem[];
};

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  const text = await res.text();
  try {
    return JSON.parse(text) as T;
  } catch (err) {
    console.error(`Failed to parse JSON from ${url}. Content:`, text);
    throw err;
  }
}

function mapSliderItem(item: SliderApiItem): HeroSlide {
  return {
    id: item.id,
    title: item.title,
    subtitle: item.tags || item.description,
    cta: "Phát ngay",
    background: item.image,
    tag: item.isExclusive ? "ĐỘC QUYỀN" : "HOT",
  };
}

function mapSectionItem(item: SectionApiItem) {
  return {
    id: item.id,
    title: item.title,
    subtitle: item.tags || item.description,
    views: `${item.views.toLocaleString()} lượt xem`,
    duration: "",
    image: item.image,
  };
}

export default async function Home() {
  const baseUrl = process.env.BASE_URL ?? "";
  
  const headersList = await headers();
  const referer = headersList.get("referer");

  let heroSlides: HeroSlide[] = [];
  let sections: VideoSectionData[] = [];

  try {
    const [sliderData, sectionData] = await Promise.all([
      fetchJson<SliderApiItem[]>(`${baseUrl}/series/home/slider`),
      fetchJson<SectionApiResponse[]>(`${baseUrl}/series/home/sections`),
    ]);

    heroSlides = sliderData.map(mapSliderItem);
    sections = sectionData.map((section, index) => ({
      id: index + 1,
      title: section.sectionName,
      items: section.items.map(mapSectionItem),
    }));
  } catch (error) {
    console.error("Home page fetch error:", error);
    // Only redirect if we have a referer and it's not the home page itself
    if (referer && !referer.endsWith("/")) {
      redirect(referer);
    }
    heroSlides = [];
    sections = [];
  }

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
