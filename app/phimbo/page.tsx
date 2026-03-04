import Link from "next/link";

import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { sections } from "../data";

const filterChips = [
  "Tất cả tình tiết",
  "Nickname ảo",
  "Tầng lớp thấp/người nhỏ bé",
  "Trưởng thành",
  "Gia đình",
  "Đô thị",
  "Con gái",
  "Hiện đại",
  "Tát vào mặt",
  "CEO",
  "Em bé dễ thương",
  "Tình một đêm",
  "Tái sinh",
  "Con gái thật giả",
  "Đoàn sủng",
  "Ngôn tình cổ đại",
  "Phụ nữ độc lập",
  "Che giấu danh tính",
  "Nữ CEO",
  "Cung điện",
];

const pageNumbers = [1, 2, 3, 4, 5, 6];

export default function PhimBoPage() {
  const phimBoItems = sections.flatMap((section) => section.items).slice(0, 30);

  return (
    <div className="min-h-screen bg-[#07090e] text-white">
      <Header activeCategory="Phim bộ" />

      <main className="mx-auto w-full max-w-[1300px] px-4 py-8 md:px-8 lg:px-10">
        <p className="text-xs text-zinc-500">Trang chủ &gt; Phim bộ</p>

        <h1 className="mt-5 text-3xl font-bold tracking-tight md:text-4xl">Tất cả các tập</h1>

        <div className="mt-5 flex flex-wrap gap-2.5">
          {filterChips.map((chip, idx) => (
            <button
              key={chip}
              type="button"
              className={`rounded-lg px-3 py-2 text-sm transition ${
                idx === 0
                  ? "bg-pink-500 text-white"
                  : "bg-white/8 text-zinc-200 hover:bg-white/15"
              }`}
            >
              {chip}
            </button>
          ))}
        </div>

        <section className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-5 xl:grid-cols-6">
          {phimBoItems.map((item, index) => (
            <Link key={`${item.id}-${item.title}-${index}`} href={`/detail/${item.id}`} className="group">
              <div className="overflow-hidden rounded-xl bg-white/5">
                <img
                  src={item.image}
                  alt={item.title}
                  className="aspect-[3/4] w-full object-cover transition duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <h3 className="mt-2 line-clamp-2 text-sm font-semibold text-zinc-100 group-hover:text-pink-300">
                {item.title}
              </h3>
              <p className="mt-1 line-clamp-1 text-xs text-zinc-400">{item.subtitle}</p>
            </Link>
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
            25
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
