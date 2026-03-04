import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

type NewsItem = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  badge: string;
};

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "Giao Ước Với Quỷ Quản Gia online - nữ cường xuyên sách dài đâu quấn gia hỏa với 97%",
    excerpt:
      "Khi không gia đình ngôn tình màu hồng thành ngôn gia đình, một tip xuyên sách và nữ phụ phản diện không còn chỉ để 'làm nền' cho nữ chính nữa.",
    image:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=80",
    date: "2026-03-03",
    author: "NetShort",
    badge: "Phim truyền hình drama",
  },
  {
    id: 2,
    title: "Giấc Mộng Hào Môn: Bông Hồng Trắng Và Cú Đâm Vào Buổi Tiệc",
    excerpt:
      "Trong không gian lộng lẫy của một buổi tiệc tư nhân, mọi thứ tưởng như hoàn hảo cho đến khi bí mật bị khui ra trước mọi ánh nhìn.",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
    date: "2026-02-28",
    author: "NetShort",
    badge: "Phim truyền hình drama",
  },
  {
    id: 3,
    title: "Giấc Mộng Hào Môn: Bông Hồng Rơi Giữa Bữa Tiệc Định Mệnh",
    excerpt:
      "Khi ánh đèn pha lê hắt xuống sảnh tiệc, một bông hồng đỏ rực bất ngờ tuột khỏi tay người phụ nữ bí ẩn khiến mọi người sững lại.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80",
    date: "2026-02-28",
    author: "NetShort",
    badge: "Phim truyền hình drama",
  },
  {
    id: 4,
    title: "Giấc Mộng Hào Môn: Chiếc Áo Choàng Và Nụ Hôn Trong Bóng Tối",
    excerpt:
      "Chiếc áo choàng đen khẽ chạm sàn, nụ hôn đến bất ngờ giữa khung cảnh xa hoa khiến trái tim người xem rung động.",
    image:
      "https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&w=1200&q=80",
    date: "2026-02-28",
    author: "NetShort",
    badge: "Phim truyền hình drama",
  },
  {
    id: 5,
    title: "Giấc Mộng Hào Môn: Bông Hồng Đỏ Và Vết Băng Dán Hình Mèo",
    excerpt:
      "Một vết xước nhỏ, một chiếc băng dán hình mèo và ánh mắt lặng đi của cô ấy tạo nên khoảnh khắc vừa ngọt vừa đau.",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80",
    date: "2026-02-28",
    author: "NetShort",
    badge: "Phim truyền hình drama",
  },
  {
    id: 6,
    title: "Giấc Mộng Hào Môn: Chiếc Vòng Cổ Và Nụ Hôn Giữa Hai Thế Giới",
    excerpt:
      "Khi chiếc vòng cổ phát sáng dưới ánh đèn, hai người tưởng xa lạ lại bị kéo vào một khoảnh khắc đầy mê hoặc.",
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1200&q=80",
    date: "2026-02-28",
    author: "NetShort",
    badge: "Phim truyền hình drama",
  },
  {
    id: 7,
    title: "Giấc Mộng Hào Môn: Chiếc Vòng Cổ Và Cú Đánh Lừa Trái Tim",
    excerpt:
      "Một buổi sáng dịu dàng, ánh sáng xuyên qua rèm cửa và sự im lặng giữa hai người làm nên cảnh phim đắt giá.",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
    date: "2026-02-28",
    author: "NetShort",
    badge: "Phim truyền hình drama",
  },
  {
    id: 8,
    title: "Giấc Mộng Hào Môn: Chiếc Đồng Hồ Vàng Và Nụ Cười Độc Ác",
    excerpt:
      "Một chiếc đồng hồ vàng, nụ cười thoáng qua và cả căn phòng chìm vào bầu không khí căng thẳng khó tả.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    date: "2026-02-28",
    author: "NetShort",
    badge: "Phim truyền hình drama",
  },
  {
    id: 9,
    title: "Giấc Mộng Hào Môn: Chiếc Đồng Hồ Trong Ly Rượu",
    excerpt:
      "Trong khoảnh khắc ly rượu va chạm, bí mật bị nhấn chìm bấy lâu bỗng nổi lên như một vệt sáng sắc lạnh.",
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80",
    date: "2026-02-28",
    author: "NetShort",
    badge: "Phim truyền hình drama",
  },
  {
    id: 10,
    title: "Giấc Mộng Hào Môn: Chiếc Vòng Cổ Bị Đánh Cắp",
    excerpt:
      "Khi ánh đèn sân khấu vụt tắt, một món trang sức biến mất và kéo theo chuỗi nghi ngờ không hồi kết.",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80",
    date: "2026-02-28",
    author: "NetShort",
    badge: "Phim truyền hình drama",
  },
  {
    id: 11,
    title: "Giấc Mộng Hào Môn: Chiếc Ghế Đinh Và Nụ Cười Bí Ẩn",
    excerpt:
      "Trong căn phòng tiếp khách xa hoa, từng chi tiết nhỏ đều như đang nói lên một âm mưu chưa có lời giải.",
    image:
      "https://images.unsplash.com/photo-1487412912498-0447578fcca8?auto=format&fit=crop&w=1200&q=80",
    date: "2026-02-28",
    author: "NetShort",
    badge: "Phim truyền hình drama",
  },
  {
    id: 12,
    title: "Giấc Mộng Hào Môn: Chiếc Đồ Trong Sức Và Ánh Mắt Dày Nỗi Sợ",
    excerpt:
      "Một ánh nhìn run rẩy trong tiếng nhạc dạ tiệc đã khiến tất cả nhận ra câu chuyện này không hề đơn giản.",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
    date: "2026-02-28",
    author: "NetShort",
    badge: "Phim truyền hình drama",
  },
];

const pageNumbers = [1, 2, 3, 4, 5, 6];

export default function TinTucPage() {
  return (
    <div className="min-h-screen bg-[#07090e] text-white">
      <Header activeCategory="Tin tức" />

      <main className="mx-auto w-full max-w-[1300px] px-4 py-8 md:px-8 lg:px-10">
        <p className="text-xs text-zinc-500">Trang chủ &gt; Thông tin</p>

        <section className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {newsItems.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-xl border border-white/5 bg-white/[0.04]"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="aspect-[16/9] w-full object-cover"
                  loading="lazy"
                />
                <span className="absolute left-3 top-3 rounded-full bg-fuchsia-500 px-2.5 py-1 text-[10px] font-semibold text-white">
                  {item.badge}
                </span>
              </div>

              <div className="p-4">
                <p className="text-xs text-zinc-400">
                  {item.date} <span className="mx-2">•</span> By {item.author}
                </p>

                <h2 className="mt-2 line-clamp-2 text-[28px] font-semibold leading-tight text-zinc-100 md:text-[22px]">
                  {item.title}
                </h2>

                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-400">
                  {item.excerpt}
                </p>
              </div>
            </article>
          ))}
        </section>

        <div className="mt-10 flex items-center justify-center gap-2 text-sm text-zinc-300">
          <button type="button" className="px-2 py-1 text-zinc-500 hover:text-white">
            &lt;
          </button>
          {pageNumbers.map((page) => (
            <button
              key={page}
              type="button"
              className={`h-8 min-w-8 rounded-md px-2 ${
                page === 1 ? "bg-white/12 text-white" : "hover:bg-white/10"
              }`}
            >
              {page}
            </button>
          ))}
          <span className="px-1 text-zinc-500">...</span>
          <button type="button" className="h-8 min-w-8 rounded-md px-2 hover:bg-white/10">
            14
          </button>
          <button type="button" className="px-2 py-1 text-zinc-500 hover:text-white">
            &gt;
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
