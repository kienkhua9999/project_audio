import Link from "next/link";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { WatchPlayer } from "../../components/WatchPlayer";
import SidebarAd from "../../components/SidebarAd";

type WatchPageProps = {
  params: Promise<{
    id: string;
  }>;
};

type EpisodeSummary = {
  id: number;
  episodeNumber: number;
  title: string;
  duration: number;
  thumbnailUrl: string;
};

type EpisodeDetail = {
  id: number;
  episodeNumber: number;
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: number;
  isExclusive: boolean;
  hasAds: boolean;
};

type RecommendItem = {
  id: number;
  title: string;
  image: string;
  tags: string[];
  views: number;
};

type EpisodeResponse = {
  episode: EpisodeDetail;
  series: {
    id: number;
    title: string;
    description: string;
    image: string;
    tags: string[];
    views: number;
    totalEpisodes: number;
    episodesList: EpisodeSummary[];
  };
  recommendations: RecommendItem[];
};

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) {
    const errorText = await res.text().catch(() => "No error body");
    console.error(`API Error [${res.status}]: ${url}`, errorText);
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export default async function WatchPage({ params }: WatchPageProps) {
  const { id: idParam } = await params;
  const baseUrl = process.env.BASE_URL ?? "";
  
  let data: EpisodeResponse | null = null;
  try {
    if (!baseUrl) {
      console.warn("BASE_URL is not defined in environment variables");
    }
    data = await fetchJson<EpisodeResponse>(`${baseUrl}/episodes/${idParam}`);
  } catch (error) {
    console.error("Error fetching episode detail:", error);
  }

  if (!data) {
    // Return a basic error layout instead of redirecting to avoid loops
    return (
      <div className="min-h-screen bg-[#06070b] text-white">
        <Header activeCategory="Trang chủ" />
        <main className="mx-auto flex w-full max-w-[1300px] flex-col items-center justify-center px-5 py-20">
          <h2 className="text-2xl font-bold text-pink-500">Không tìm thấy tập phim</h2>
          <p className="mt-2 text-zinc-400">Có lỗi xảy ra khi tải dữ liệu hoặc tập phim không tồn tại.</p>
          <Link href="/" className="mt-6 rounded-lg bg-white/10 px-6 py-2 hover:bg-white/20">
            Quay lại trang chủ
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const { episode, series, recommendations } = data;

  const episodes = (series.episodesList || []).map((ep) => ({
    id: ep.id,
    episodeNumber: ep.episodeNumber,
    title: `Tập ${ep.episodeNumber} - ${series.title}`,
    videoUrl: ep.id === episode.id ? episode.videoUrl : "", // Ideally the component handles fetching more or we have links
  }));

  return (
    <div className="min-h-screen bg-[#06070b] text-white">
      <Header activeCategory="Trang chủ" />

      <div className="relative mx-auto flex w-full max-w-[1620px] justify-center gap-0">
        {/* Left Side Ads */}
        <SidebarAd />

        <main className="w-full max-w-[1300px] px-5 py-8 md:px-8 lg:px-10">
          {/* Breadcrumb */}
          <nav className="mb-6 text-xs text-zinc-400 md:text-sm">
            <Link href="/" className="hover:text-white transition">
              Trang chủ
            </Link>
            <span className="mx-1.5 text-zinc-500">{">"}</span>
            <Link href="/phimbo" className="hover:text-white transition">
              Phim bộ
            </Link>
            <span className="mx-1.5 text-zinc-500">{">"}</span>
            <Link href={`/detail/${series.id}`} className="hover:text-white transition">
              {series.title}
            </Link>
            <span className="mx-1.5 text-zinc-500">{">"}</span>
            <span className="text-white">Tập {episode.episodeNumber}</span>
          </nav>

          <WatchPlayer
            title={`${series.title} Tập ${episode.episodeNumber}`}
            viewsText={`${series.views.toLocaleString()} lượt xem`}
            tags={series.tags}
            description={series.description}
            episodes={episodes}
            initialEpisodeId={episode.id}
          />

          {/* Cụm đề xuất */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-white">Đề xuất cho bạn</h2>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              {recommendations.map((item) => (
                <article
                  key={`recommend-${item.id}`}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-white/20"
                >
                  <Link href={`/detail/${item.id}`}>
                    <div className="overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="aspect-[3/4] w-full object-cover transition duration-300 group-hover:scale-110"
                      />
                    </div>

                    <div className="space-y-1 p-3">
                      <h3 className="line-clamp-2 text-sm font-semibold text-white group-hover:text-pink-300 transition">
                        {item.title}
                      </h3>
                      <p className="line-clamp-1 text-xs text-zinc-400">
                        {item.tags?.[0] || "Đang cập nhật"}
                      </p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        </main>

        {/* Right Side Ads */}
        <SidebarAd />
      </div>

      <Footer />
    </div>
  );
}

