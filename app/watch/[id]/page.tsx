import Link from "next/link";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { WatchPlayer } from "../../components/WatchPlayer";
import SidebarAd from "../../components/SidebarAd";
import AdSense from "../../components/AdSense";

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
    episodesList?: EpisodeSummary[];
    episodes?: EpisodeSummary[];
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
  const allEpisodes = series.episodesList || series.episodes || [];
  const episodes = allEpisodes.map((ep) => ({
    id: ep.id,
    episodeNumber: ep.episodeNumber,
    title: `Tập ${ep.episodeNumber} - ${series.title}`,
    videoUrl: ep.id === episode.id ? episode.videoUrl : "",
  }));

  return (
    <div className="min-h-screen bg-[#06070b] text-white">
      <Header activeCategory="Trang chủ" />

      <div className="relative mx-auto flex w-full max-w-[1620px] justify-center gap-0">
        <SidebarAd />

        <main className="w-full max-w-[1300px] px-5 py-8 md:px-8 lg:px-10">
          <nav className="mb-6 text-xs text-zinc-400 md:text-sm">
            <Link href="/" className="hover:text-white transition">Trang chủ</Link>
            <span className="mx-1.5 text-zinc-500">{">"}</span>
            <Link href="/phimbo" className="hover:text-white transition">Phim bộ</Link>
            <span className="mx-1.5 text-zinc-500">{">"}</span>
            <Link href={`/detail/${series.id}`} className="hover:text-white transition">{series.title}</Link>
            <span className="mx-1.5 text-zinc-500">{">"}</span>
            <span className="text-white">Tập {episode.episodeNumber}</span>
          </nav>

          <WatchPlayer
            title={`${series.title} Tập ${episode.episodeNumber}`}
            viewsText={`${(series.views || 0).toLocaleString()} lượt xem`}
            tags={series.tags || []}
            description={series.description}
            episodes={episodes}
            initialEpisodeId={episode.id}
          />

          {/* VỊ TRÍ VÀNG 1: Ngay dưới Player */}
          <div className="mt-8 flex justify-center">
            <div className="w-full max-w-[970px] overflow-hidden rounded-xl border border-white/5 bg-white/5 p-4 flex flex-col items-center">
              <span className="mb-2 text-[10px] uppercase tracking-widest text-zinc-500">Quảng cáo đề xuất</span>
              <AdSense slot="YOUR_BELOW_PLAYER_SLOT_ID" format="horizontal" />
            </div>
          </div>

          <section className="mt-12">
            <h2 className="text-2xl font-bold text-white">Đề xuất cho bạn</h2>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
              {recommendations.map((item, index) => (
                <div key={`recommend-wrapper-${item.id}`}>
                  {/* IN-FEED ADS: Xuất hiện ở vị trí thứ 6 trong danh sách trên desktop */}
                  {index === 6 && (
                    <div className="col-span-full my-6 overflow-hidden rounded-xl border border-white/5 bg-white/5 p-4 flex flex-col items-center">
                       <AdSense slot="YOUR_IN_FEED_SLOT_ID" format="fluid" />
                    </div>
                  )}
                  <article className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-white/20 h-full">
                    <Link href={`/detail/${item.id}`}>
                      <div className="overflow-hidden">
                        <img src={item.image} alt={item.title} className="aspect-[16/9] w-full object-cover transition duration-300 group-hover:scale-110" />
                      </div>
                      <div className="space-y-1 p-3">
                        <h3 className="line-clamp-2 text-sm font-semibold text-white group-hover:text-pink-300 transition">{item.title}</h3>
                        <div className="flex items-center justify-between text-[11px] text-zinc-400">
                          <span className="line-clamp-1 flex-1">{item.tags?.[0] || "Đang cập nhật"}</span>
                          <span className="ml-2 whitespace-nowrap">{(item.views || 0).toLocaleString()} views</span>
                        </div>
                      </div>
                    </Link>
                  </article>
                </div>
              ))}
            </div>
          </section>
        </main>

        <SidebarAd />
      </div>

      <Footer />
    </div>
  );
}
