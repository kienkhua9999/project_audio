import Link from "next/link";
import { notFound } from "next/navigation";
import { EpisodeList } from "../../components/EpisodeList";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { heroSlides, sections, type VideoItem } from "../../data";

type DetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

function findVideoById(id: number): VideoItem | null {
  for (const section of sections) {
    const found = section.items.find((item) => item.id === id);
    if (found) return found;
  }

  const hero = heroSlides.find((slide) => slide.id === id);
  if (!hero) return null;

  // Map HeroSlide -> VideoItem tối thiểu để hiển thị
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

function generateEpisodes(baseTitle: string) {
  // Tạo danh sách tập mock giống layout trong ảnh
  return Array.from({ length: 20 }).map((_, index) => {
    const episodeNumber = index + 1;
    return {
      id: episodeNumber,
      title: `Tập ${episodeNumber} - ${baseTitle}`,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Mô tả này chỉ là dữ liệu giả để minh họa giao diện.",
      duration: "23:45",
      image:
        "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=600&q=80",
    };
  });
}

export default async function DetailPage({ params }: DetailPageProps) {
  const { id: idParam } = await params;
  const id = Number(idParam);
  if (Number.isNaN(id)) {
    notFound();
  }

  const video = findVideoById(id);
  if (!video) {
    notFound();
  }

  const episodes = generateEpisodes(video.title);

  return (
    <div className="min-h-screen bg-[#06070b] text-white">
      <Header activeCategory="Trang chủ" />

      <main className="mx-auto w-full max-w-[120rem] px-5 py-8 md:px-8 lg:px-10">
        {/* Breadcrumb */}
        <nav className="mb-4 text-xs md:text-sm text-zinc-400">
          <Link href="/" className="hover:text-white">
            Trang chủ
          </Link>
          <span className="mx-1.5 text-zinc-500">{">"}</span>
          <span className="hover:text-white cursor-pointer text-zinc-300">
            Phim hấp dẫn
          </span>
          <span className="mx-1.5 text-zinc-500">{">"}</span>
          <span className="text-white">{video.title}</span>
        </nav>

        {/* Khối thông tin chính */}
        <section className="mt-6 flex flex-col gap-8 md:flex-row md:items-start">
          {/* Cột poster bên trái */}
          <div className="w-full max-w-[260px] md:w-[260px] lg:max-w-[300px]">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900">
              <img
                src={video.image}
                alt={video.title}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </div>

          {/* Khối thông tin bên phải ảnh, bố cục giống Netshort */}
          <div className="mt-4 flex flex-1 flex-col gap-5 md:mt-0 md:pl-10">
            {/* Tiêu đề lớn */}
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">
              {video.title}
            </h1>

            {/* Dòng lượt xem + thời lượng */}
            <div className="flex flex-wrap items-center gap-8 text-sm md:text-base text-zinc-300">
              <span>
                <span className="font-semibold text-white">Lượt xem: </span>
                {video.views}
              </span>
             
            </div>

            {/* Chip thể loại, lấy từ subtitle */}
            <div className="flex flex-wrap gap-3">
              {video.subtitle
                .split("•")
                .map((part) => part.trim())
                .filter(Boolean)
                .map((part) => (
                  <span
                    key={part}
                    className="rounded-full border border-white/15 px-4 py-1.5 text-xs md:text-sm font-medium text-zinc-100"
                  >
                    {part}
                  </span>
                ))}
            </div>

            {/* Nút hành động */}
            <div className="flex flex-wrap items-center gap-4">
              <button className="inline-flex w-full max-w-xs items-center justify-center gap-3 rounded-xl bg-gradient-to-r bg-pink-500 px-10 py-3.5 text-sm md:text-base font-semibold text-white shadow-[0_12px_30px_rgba(0,0,0,0.45)] hover:brightness-110 md:w-[230px] cursor-pointer">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-xs md:text-sm">
                  ▶
                </span>
                <span className="tracking-wide">Xem ngay</span>
              </button>
              <button className="inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-10 py-3.5 text-sm md:text-base font-semibold text-white hover:border-white hover:bg-white/10 md:w-[230px] cursor-pointer">
                Tải APP
              </button>
            </div>
          </div>
        </section>

        {/* Mô tả dưới cả poster + info */}
        <section className="mt-6">
          <div className="space-y-2 rounded-2xl bg-white/5 p-4 text-sm text-zinc-200 md:text-[15px]">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eget
              neque sed urna elementum ultricies. Nội dung ở đây bạn có thể thay
              bằng mô tả thật của bộ phim hoặc series, nói về bối cảnh, nhân vật
              chính và lý do vì sao nên xem.
            </p>
            <p>
              Phần này hiện tại chỉ là mô tả mẫu để tạo cảm giác giống giao diện
              Netshort trong ảnh bạn gửi. Khi kết nối API thật, bạn có thể lấy
              mô tả chi tiết từ backend và hiển thị vào đây.
            </p>
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

