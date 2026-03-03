import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { VideoCard } from "../components/VideoCard";
import { sections } from "../data";

const episodes = Array.from({ length: 30 }, (_, i) => i + 1);

const comments = [
  {
    title: "Xa Hoa vs Cô Độc: Cặp Đôi Bất Đồng",
    content:
      "Chàng trai tóc bạc cười tươi bên thẻ vàng, cô gái tóc trắng dịu dàng nhưng ánh mắt đầy toan tính — họ là cặp đôi hoàn hảo trong thế giới này, nhưng dường như chỉ là ‘đối tác chiến lược’.",
  },
  {
    title: "Ký Ức Thư Viện: Màu Xám Của Tình Bạn",
    content:
      "Cảnh đen trắng trong thư viện — có ấy làm đổ sách, anh cúi xuống nhặt, rồi hai người nắm tay nhau dưới ánh nắng — đẹp đến mức khiến người xem muốn dừng video lại.",
  },
  {
    title: "Lion Baby: Linh Thú Dở Khóc Dở Cười",
    content:
      "Con sư tử nhỏ giảt rống bỗng bỗng từng bị đánh giá là ‘không nên nuôi’, nhưng chính nó lại là chìa khóa mở ra giấc ngộ cho Lâm Mạc.",
  },
  {
    title: "Con sâu xanh ngốc nghếch hóa rồng vàng",
    content:
      "Một con sâu non vô hại trong hộp giấy bỗng ngủ nổ thành rồng vàng huyền thoại — cú lật bản ngoạn mục của Hệ Thống Ngự Thú Mạnh Nhất.",
  },
];

export default function DetailPage() {
  const recommendedItems = sections[0]?.items.slice(0, 6) ?? [];

  return (
    <div className="min-h-screen bg-[#090b12]">
      <Header activeCategory="Phim bộ" />

      <main className="mx-auto w-full max-w-[120rem] px-5 pb-14 pt-5 md:px-8 lg:px-10">
        <p className="mb-4 text-xs text-zinc-400">Trang chủ &gt; Phim bộ &gt; Hệ thống ngự thú mạnh nhất</p>

        <section className="grid gap-4 lg:grid-cols-[1fr_360px]">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
            <div className="relative aspect-video w-full bg-black">
              <video
                className="h-full w-full"
                controls
                poster="https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1600&q=80"
              >
                <source
                  src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>

          <aside className="rounded-2xl border border-white/10 bg-zinc-900/80 p-5">
            <h1 className="text-2xl font-bold text-white">Hệ Thống Ngự Thú Mạnh Nhất Tập 1</h1>

            <div className="mt-3 flex items-center gap-5 text-sm text-zinc-300">
              <span>♡ 6.8K</span>
              <span>💬 35.5K</span>
            </div>

            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              {[
                "Tái sinh",
                "Hệ thống",
                "Hiện đại",
              ].map((tag) => (
                <span key={tag} className="rounded-md bg-zinc-800 px-2 py-1 text-zinc-200">
                  {tag}
                </span>
              ))}
            </div>

            <p className="mt-4 line-clamp-3 text-sm text-zinc-300">
              Lâm Mạc - con riêng bị nhà họ Lâm ruồng bỏ - thức tỉnh năng lực ngự thú toàn hệ hiếm có. Những vì nghi ngờ,
              ngay cả thú cấp thấp nhất cũng chê hắn, người an toàn nhất lại trở thành người nguy hiểm nhất.
            </p>

            <div className="mt-6 flex items-center justify-between text-sm text-zinc-300">
              <div className="flex items-center gap-5">
                <button className="text-pink-500">1 - 30</button>
                <button>31 - 60</button>
                <button>61 - 70</button>
              </div>
              <button>Toàn tập &gt;</button>
            </div>

            <div className="mt-4 grid grid-cols-6 gap-2">
              {episodes.map((ep) => (
                <button
                  key={ep}
                  className={`rounded-md border py-2 text-sm font-semibold transition ${
                    ep === 1
                      ? "border-pink-500 bg-pink-500 text-white"
                      : "border-white/10 bg-zinc-800/70 text-zinc-200 hover:bg-zinc-700"
                  }`}
                >
                  {ep}
                </button>
              ))}
            </div>
          </aside>
        </section>

        <section className="mt-8">
          <h2 className="mb-4 text-5xl font-extrabold tracking-tight text-white md:text-4xl">Đề xuất cho bạn</h2>
          <div className="flex flex-wrap gap-4">
            {recommendedItems.map((item) => (
              <VideoCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="mb-4 text-5xl font-extrabold tracking-tight text-white md:text-4xl">Đánh giá tập này.</h2>

          <div className="space-y-3">
            {comments.map((comment) => (
              <article key={comment.title} className="rounded-2xl border border-white/10 bg-zinc-900/80 p-4">
                <h3 className="text-lg font-semibold text-white">{comment.title}</h3>
                <p className="mt-1 text-sm text-zinc-300">{comment.content}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
