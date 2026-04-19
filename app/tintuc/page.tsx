import Link from "next/link";
import type { Metadata } from "next";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import TinTucList from "../components/TinTucList";

export const metadata: Metadata = {
  title: "Tin Tức Phim – Cập Nhật Giải Trí Mới Nhất",
  description: "Tin tức phim mới nhất, review phim hay, cập nhật giải trí Hàn Quốc, Trung Quốc tại ShortReelDrama.",
  keywords: ["tin tức phim", "review phim", "phim mới", "giải trí", "shortreeldrama"],
  openGraph: {
    title: "Tin Tức Phim – ShortReelDrama",
    description: "Tin tức phim mới nhất, review phim hay tại ShortReelDrama.",
    locale: "vi_VN",
    type: "website",
  },
};

type NewsItem = {
  id: number;
  title: string;
  description: string;
  image: string;
  views: number;
  tags: string[];
};

type NewsResponse = {
  items: NewsItem[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

type TinTucPageProps = {
  searchParams?: Promise<{
    page?: string;
  }>;
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

export default async function TinTucPage({ searchParams }: TinTucPageProps) {
  const baseUrl = process.env.BASE_URL ?? "http://localhost:3001/api";
  const resolvedSearchParams = await searchParams;
  const currentPage = Math.max(1, Number(resolvedSearchParams?.page ?? 1));
  const limit = 12;

  let newsItems: NewsItem[] = [];
  let totalPages = 1;

  try {
    const data = await fetchJson<NewsResponse>(`${baseUrl}/series/news?page=${currentPage}&limit=${limit}`);
    newsItems = data.items ?? [];
    totalPages = data.meta?.totalPages ?? 1;
  } catch (error) {
    console.error("Failed to fetch news:", error);
    newsItems = [];
    totalPages = 1;
  }

  const pageNumbers = buildPageNumbers(currentPage, totalPages);

  return (
    <div className="min-h-screen bg-[#07090e] text-white">
      <Header activeCategory="Tin tức" />

      <main className="mx-auto w-full max-w-[1300px] px-4 py-8 md:px-8 lg:px-10">
        <p className="text-xs text-zinc-500">
          <Link href="/" className="hover:text-zinc-300 transition-colors">Trang chủ</Link> &gt; Tin tức
        </p>

        <TinTucList newsItems={newsItems} />

        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2 text-sm text-zinc-300">
            <Link
              href={`/tintuc?page=${Math.max(1, currentPage - 1)}`}
              className={`flex h-8 w-8 items-center justify-center rounded-full border border-white/10 transition ${
                currentPage === 1
                  ? "pointer-events-none text-zinc-600"
                  : "text-zinc-300 hover:border-pink-500/50 hover:bg-pink-500/10 hover:text-white"
              }`}
            >
              &lt;
            </Link>
            
            {pageNumbers.map((page, index) =>
              page === -1 ? (
                <span key={`ellipsis-${index}`} className="px-1 text-zinc-500">
                  ...
                </span>
              ) : (
                <Link
                  key={page}
                  href={`/tintuc?page=${page}`}
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
              href={`/tintuc?page=${Math.min(totalPages, currentPage + 1)}`}
              className={`flex h-8 w-8 items-center justify-center rounded-full border border-white/10 transition ${
                currentPage === totalPages
                  ? "pointer-events-none text-zinc-600"
                  : "text-zinc-300 hover:border-pink-500/50 hover:bg-pink-500/10 hover:text-white"
              }`}
            >
              &gt;
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
