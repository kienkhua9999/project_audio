import Link from "next/link";

import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import SidebarAd from "../components/SidebarAd";

type SeriesItem = {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string;
  views: number;
};

type SeriesResponse = {
  items: SeriesItem[];
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

type PhimBoPageProps = {
  searchParams?: Promise<{
    page?: string;
    type?: string;
  }>;
};

const filterChips = [
  "Tất cả",
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

function buildPageNumbers(current: number, total: number) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  if (current <= 4) {
    return [1, 2, 3, 4, 5, -1, total];
  }

  if (current >= total - 3) {
    return [1, -1, total - 4, total - 3, total - 2, total - 1, total];
  }

  return [1, -1, current - 1, current, current + 1, -1, total];
}

export default async function PhimBoPage({ searchParams }: PhimBoPageProps) {
  const baseUrl = process.env.BASE_URL ?? "";
  const resolvedSearchParams = await searchParams;
  const currentPage = Math.max(1, Number(resolvedSearchParams?.page ?? 1));
  const currentType = resolvedSearchParams?.type || "";


  const limit = 18;
  let phimBoItems: SeriesItem[] = [];
  let totalPages = 1;

  try {
    const typeParam = currentType ? `&type=${encodeURIComponent(currentType)}` : "";
    // Thêm tham số limit và type vào API call theo yêu cầu
    const data = await fetchJson<SeriesResponse>(`${baseUrl}/series?page=${currentPage}&limit=${limit}${typeParam}`);
    
    phimBoItems = data.items ?? [];
    
    // API đã tính toán, lấy totalPages trực tiếp hoặc tính từ total items
    // Hỗ trợ cả cấu trúc nested (meta) và flat
    const total = data.total ?? data.meta?.total ?? 0;
    totalPages = data.totalPages ?? data.meta?.totalPages ?? Math.ceil(total / limit);
    if (totalPages < 1) totalPages = 1;

  } catch (error) {
    console.error("Failed to fetch series:", error);
    // Remove redirect(referer) to prevent infinite loop if fetch fails
    phimBoItems = [];
    totalPages = 1;
  }

  const pageNumbers = buildPageNumbers(currentPage, totalPages);

  return (
    <div className="min-h-screen bg-[#07090e] text-white">
      <Header activeCategory="Phim bộ" />
      <div className="relative mx-auto flex w-full max-w-[1620px] justify-center gap-0">
        {/* Left Side Ads */}
        <SidebarAd />

        <main className="w-full max-w-[1300px] px-4 py-8 md:px-8 lg:px-10">
          <p className="text-xs text-zinc-500">Trang chủ &gt; Phim bộ</p>

          <h1 className="mt-5 text-3xl font-bold tracking-tight md:text-4xl">Tất cả các phim</h1>

          <div className="mt-5 flex flex-wrap gap-2.5">
            {filterChips.map((chip) => {
              const isAll = chip === "Tất cả";
              const isActive = isAll ? !currentType : currentType === chip;
              const chipHref = isAll ? "/phimbo" : `/phimbo?type=${encodeURIComponent(chip)}`;

              return (
                <Link
                  key={chip}
                  href={chipHref}
                  className={`rounded-lg px-3 py-2 text-sm transition ${
                    isActive
                      ? "bg-pink-500 text-white shadow-lg shadow-pink-500/20"
                      : "bg-white/8 text-zinc-200 hover:bg-white/10"
                  }`}
                >
                  {chip}
                </Link>
              );
            })}
          </div>

          <section className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {phimBoItems.map((item, index) => (
              <Link key={`${item.id}-${index}`} href={`/detail/${item.id}`} className="group">
                <div className="overflow-hidden rounded-xl bg-white/5">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="aspect-3/4 w-full object-cover transition duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <h3 className="mt-2 line-clamp-2 text-sm font-semibold text-zinc-100 group-hover:text-pink-300">
                  {item.title}
                </h3>
                <p className="mt-1 line-clamp-1 text-xs text-zinc-400">
                  {item.tags || item.description}
                </p>
              </Link>
            ))}
          </section>

          <div className="mt-10 flex items-center justify-center gap-2 text-sm text-zinc-300">
            <Link
              href={`/phimbo?page=${Math.max(1, currentPage - 1)}${currentType ? `&type=${encodeURIComponent(currentType)}` : ""}`}
              className={`flex h-8 w-8 items-center justify-center rounded-full border border-white/10 transition ${
                currentPage === 1
                  ? "pointer-events-none text-zinc-600"
                  : "text-zinc-300 hover:border-pink-500/50 hover:bg-pink-500/10 hover:text-white"
              }`}
              aria-disabled={currentPage === 1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            {pageNumbers.map((page, index) =>
              page === -1 ? (
                <span key={`ellipsis-${index}`} className="px-1 text-zinc-500">
                  ...
                </span>
              ) : (
                <Link
                  key={page}
                  href={`/phimbo?page=${page}${currentType ? `&type=${encodeURIComponent(currentType)}` : ""}`}
                  className={`h-8 min-w-8 rounded-md px-2 text-center leading-8 transition ${
                    page === currentPage
                      ? "bg-pink-500 text-white shadow-lg shadow-pink-500/20"
                      : "hover:bg-white/10 text-zinc-400 hover:text-white"
                  }`}
                >
                  {page}
                </Link>
              ),
            )}
            <Link
              href={`/phimbo?page=${Math.min(totalPages, currentPage + 1)}${currentType ? `&type=${encodeURIComponent(currentType)}` : ""}`}
              className={`flex h-8 w-8 items-center justify-center rounded-full border border-white/10 transition ${
                currentPage === totalPages
                  ? "pointer-events-none text-zinc-600"
                  : "text-zinc-300 hover:border-pink-500/50 hover:bg-pink-500/10 hover:text-white"
              }`}
              aria-disabled={currentPage === totalPages}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </main>

        {/* Right Side Ads */}
        <SidebarAd />
      </div>
      <Footer />
    </div>
  );
}
