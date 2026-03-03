import Link from "next/link";
import { notFound } from "next/navigation";
import { heroSlides, sections } from "../../data";

type WatchDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function WatchDetailPage({ params }: WatchDetailPageProps) {
  const { id } = await params;
  const numericId = Number(id);

  const fromSections = sections
    .flatMap((section) => section.items)
    .find((item) => item.id === numericId);

  const fromHero = heroSlides.find((slide) => slide.id === numericId);

  const movie =
    fromSections ??
    (fromHero
      ? {
          id: fromHero.id,
          title: fromHero.title,
          subtitle: fromHero.subtitle,
          views: "1.2M lượt xem",
          duration: "01:48",
          image: fromHero.background,
          tag: fromHero.tag,
        }
      : null);

  if (!movie) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#06070b] px-5 py-10 text-white md:px-8 lg:px-10">
      <div className="mx-auto w-full max-w-[120rem]">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-sm text-zinc-200 hover:bg-white/10"
        >
          ← Quay lại trang chủ
        </Link>

        <section className="grid gap-8 lg:grid-cols-[360px_minmax(0,1fr)]">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-900">
            <img
              src={movie.image}
              alt={movie.title}
              className="aspect-[3/4] h-full w-full object-cover"
            />
          </div>

          <div className="space-y-5">
            <div className="flex items-center gap-3">
              {movie.tag ? (
                <span className="rounded-full bg-pink-500 px-3 py-1 text-xs font-semibold">
                  {movie.tag}
                </span>
              ) : null}
              <span className="text-sm text-zinc-300">{movie.views}</span>
              <span className="text-sm text-zinc-400">• {movie.duration}</span>
            </div>

            <h1 className="text-4xl font-bold leading-tight md:text-5xl">{movie.title}</h1>
            <p className="max-w-3xl text-lg text-zinc-300">{movie.subtitle}</p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button className="inline-flex items-center gap-2 rounded-2xl bg-pink-500 px-7 py-3 text-lg font-semibold text-white hover:bg-pink-400">
                ▶ Phát ngay
              </button>
              <button className="rounded-2xl border border-white/20 px-7 py-3 text-lg text-zinc-200 hover:bg-white/10">
                + Thêm vào danh sách
              </button>
            </div>

            <div className="pt-6">
              <h2 className="mb-4 text-2xl font-semibold">Danh sách tập</h2>
              <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-10">
                {Array.from({ length: 20 }).map((_, index) => (
                  <button
                    key={index}
                    className={`rounded-lg border px-3 py-2 text-sm transition ${
                      index === 0
                        ? "border-pink-500 bg-pink-500/20 text-pink-300"
                        : "border-white/15 bg-white/5 text-zinc-200 hover:border-white/30"
                    }`}
                  >
                    Tập {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
