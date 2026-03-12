import Link from "next/link";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { EpisodeList } from "../../components/EpisodeList";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";

type DetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

type Episode = {
  id: number;
  episodeNumber: number;
  title: string;
  duration: number;
  videoUrl: string;
  thumbnailUrl: string;
};

type SeriesDetail = {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  type: string;
  views: number;
  status: string;
  isExclusive: boolean;
  hasAds: boolean;
  createdAt: string;
  updatedAt: string;
  episodes: Episode[];
  totalEpisodes: number;
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

export default async function DetailPage({ params }: DetailPageProps) {
  const { id: idParam } = await params;
  const baseUrl = process.env.BASE_URL ?? "";
  
  const headersList = await headers();
  const referer = headersList.get("referer") || "/";

  let series: SeriesDetail;
  try {
    series = await fetchJson<SeriesDetail>(`${baseUrl}/series/${idParam}`);
  } catch (error) {
    console.error("Error fetching series detail:", error);
    redirect(referer);
  }

  const episodes = series.episodes.map((ep) => ({
    id: ep.id,
    seriesId: series.id,
    episodeNumber: ep.episodeNumber,
    title: `Tập ${ep.episodeNumber} - ${series.title}`,
    description: series.description, // API response sample shows episodes have no description, so we use series description or a default
    duration: `${ep.duration}:00`,
    image: ep.thumbnailUrl || series.image,
  }));

  if (episodes.length === 0) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-[#06070b] text-white">
      <Header activeCategory="Trang chủ" />

      <main className="mx-auto w-full max-w-[120rem] px-5 py-8 md:px-8 lg:px-10">
        {/* Breadcrumb */}
        <nav className="mb-4 text-xs md:text-sm text-zinc-400">
          <Link href="/" className="hover:text-white transition">
            Trang chủ
          </Link>
          <span className="mx-1.5 text-zinc-500">{">"}</span>
          <span className="hover:text-white cursor-pointer text-zinc-300 transition">
            Phim hấp dẫn
          </span>
          <span className="mx-1.5 text-zinc-500">{">"}</span>
          <span className="text-white">{series.title}</span>
        </nav>

        {/* Phần poster + Info giới thiệu */}
        <section className="flex flex-col items-center gap-y-8 md:flex-row md:items-start">
          <div className="w-full max-w-[260px] flex-shrink-0 md:w-[260px] lg:max-w-[300px]">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl">
              <img
                src={series.image}
                alt={series.title}
                className="aspect-[4/5] w-full object-cover transition duration-500 hover:scale-105"
              />
            </div>
          </div>

          {/* Khối thông tin bên phải ảnh, bố cục giống Netshort */}
          <div className="mt-6 flex flex-1 flex-col items-center gap-5 text-center md:mt-0 md:items-start md:pl-10 md:text-left">
            {/* Tiêu đề lớn */}
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">
              {series.title}
            </h1>

            {/* Dòng lượt xem + thời lượng */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm md:justify-start md:text-base text-zinc-300">
              <span>
                <span className="font-semibold text-white">Lượt xem: </span>
                {series.views.toLocaleString()}
              </span>
            </div>

            {/* Chip thể loại, lấy từ subtitle */}
            <div className="flex flex-wrap justify-center gap-3 md:justify-start">
              {series.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full border border-pink-500/30 bg-pink-500/5 px-4 py-1.5 text-xs md:text-sm font-medium text-pink-300 transition hover:bg-pink-500/10"
                >
                  {tag}
                </span>
              ))}
              {series.type && (
                <span className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs md:text-sm font-medium text-zinc-100">
                  {series.type}
                </span>
              )}
            </div>

            {/* Nút hành động */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={`/watch/${episodes[0].id}`}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-pink-500 px-10 py-3.5 text-sm md:text-base font-semibold text-white shadow-lg shadow-pink-500/25 transition hover:brightness-110 active:scale-[0.98] md:w-auto"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3">
                    <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.522-2.333 2.727-1.617l12.18 7.32c1.18.706 1.18 2.405 0 3.111l-12.18 7.32c-1.205.716-2.727-.19-2.727-1.617V5.653Z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Xem ngay</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Mô tả dưới cả poster + info */}
        <section className="mt-6">
          <div className="rounded-2xl bg-white/5 p-6 text-[15px] leading-relaxed text-zinc-300">
            {series.description}
          </div>
        </section>

        {/* Danh sách tập */}
        <section className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white md:text-xl">
              Toàn bộ tập
            </h2>
            <span className="text-sm text-zinc-400">
              Tổng {episodes.length} tập
            </span>
          </div>

          <EpisodeList episodes={episodes} itemsPerPage={10} />
        </section>
      </main>

      <Footer />
    </div>
  );
}

