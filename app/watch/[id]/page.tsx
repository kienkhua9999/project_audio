import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { WatchPlayer, type WatchEpisode } from "../../components/WatchPlayer";
import { heroSlides, sections, type VideoItem } from "../../data";

type WatchPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const DEFAULT_EPISODE_VIDEO_URL =
  "https://public-connect-staging-assets.s3.ap-northeast-1.amazonaws.com/4006e4bd-50b3-4349-b2a0-619c2629f347.mp4";

function findVideoById(id: number): VideoItem | null {
  for (const section of sections) {
    const found = section.items.find((item) => item.id === id);
    if (found) return found;
  }

  const hero = heroSlides.find((slide) => slide.id === id);
  if (!hero) return null;

  return {
    id: hero.id,
    title: hero.title,
    subtitle: hero.subtitle,
    views: "Đang cập nhật",
    duration: "01:30",
    image: hero.background,
    tag: hero.tag,
  };
}

function generateEpisodes(title: string, total = 60): WatchEpisode[] {
  return Array.from({ length: total }).map((_, idx) => {
    const episodeId = idx + 1;
    return {
      id: episodeId,
      title: `Tập ${episodeId} - ${title}`,
      videoUrl: DEFAULT_EPISODE_VIDEO_URL,
    };
  });
}

export default async function WatchPage({ params }: WatchPageProps) {
  const { id: idParam } = await params;
  const id = Number(idParam);
  if (Number.isNaN(id)) notFound();

  const video = findVideoById(id);
  if (!video) notFound();

  const tags = video.subtitle
    ? video.subtitle
        .split("•")
        .map((p) => p.trim())
        .filter(Boolean)
    : [];

  const episodes = generateEpisodes(video.title, 60);

  return (
    <div className="min-h-screen bg-[#06070b] text-white">
      <Header activeCategory="Trang chủ" />

      <main className="mx-auto w-full max-w-[120rem] px-5 py-8 md:px-8 lg:px-10">
        {/* Breadcrumb */}
        <nav className="mb-6 text-xs text-zinc-400 md:text-sm">
          <Link href="/" className="hover:text-white">
            Trang chủ
          </Link>
          <span className="mx-1.5 text-zinc-500">{">"}</span>
          <Link href="/phimbo" className="hover:text-white">
            Phim bộ
          </Link>
          <span className="mx-1.5 text-zinc-500">{">"}</span>
          <span className="text-white">{video.title}</span>
        </nav>

        <WatchPlayer
          title={`${video.title} Tập 1`}
          viewsText={video.views}
          tags={tags}
          description="Đây là màn watch/[id] để xem video theo từng tập. Hiện đang dùng link mp4 mẫu; khi bạn có API thật, mình sẽ nối dữ liệu tập + link video theo từng tập."
          episodes={episodes}
          initialEpisodeId={1}
        />

        {/* Cụm đề xuất custom (không dùng VideoSection) */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-white">Đề xuất cho bạn</h2>

          <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {sections
              .flatMap((s) => s.items)
              .slice(0, 6)
              .map((item) => (
                <article
                  key={`recommend-${item.id}`}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5"
                >
                  <Link href={`/detail/${item.id}`}>
                    <div className="overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="aspect-[3/4] w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    </div>

                    <div className="space-y-1 p-3">
                      <h3 className="line-clamp-2 text-sm font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="line-clamp-1 text-xs text-zinc-400">{item.subtitle}</p>
                    </div>
                  </Link>
                </article>
              ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

